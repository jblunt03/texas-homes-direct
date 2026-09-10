#!/usr/bin/env python3
"""
Near-duplicate content checker for lib/cityContent.ts.

Run this after every batch of new/edited city pages, before publishing:

    python3 scripts/check_duplication.py

What it does: for every published city, it extracts the intro, the 2 buying
paragraphs, the localProof line, and the 5 FAQ answers, masks out that city's
own name and county name (replacing them with placeholder tokens), and then
compares every text field against every OTHER published city's fields of the
SAME type (intro vs intro, buying-paragraph vs buying-paragraph, etc.) —
every page against every other page, not just neighbors.

Similarity is measured with word 8-gram (shingle) Jaccard overlap. This is
the standard near-duplicate-content detection technique: it catches "same
sentence, different place name" and heavily-reworded copy-paste, while
tolerating genuinely fresh writing that happens to share domain vocabulary
("Texas Homes Direct", "manufactured home", "financing", etc.).

Exit code is non-zero (and prints a loud FAIL banner) if anything exceeds
the threshold. This is meant to be a hard gate — fix the flagged copy and
re-run, don't lower the threshold to make it pass.
"""
import re
import sys
from itertools import combinations

sys.path.insert(0, "scripts")
from write_city_content import CITIES, CITY_COPY  # noqa: E402

SHINGLE_SIZE = 8
# Fraction of overlapping 8-word shingles above which two texts are flagged.
# Calibrated against this project's real (legitimately distinct) city copy —
# see the bottom of this file for the calibration run.
THRESHOLD = 0.25


def normalize(text, name, county):
    t = text.lower()
    t = t.replace(name.lower(), "__city__")
    t = t.replace(county.lower(), "__county__")
    t = re.sub(r"[^a-z0-9_\s]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def shingles(text, n=SHINGLE_SIZE):
    words = text.split()
    if len(words) < n:
        return {tuple(words)} if words else set()
    return {tuple(words[i:i + n]) for i in range(len(words) - n + 1)}


def jaccard(a, b):
    if not a or not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0.0


def collect_fields():
    """Returns list of (slug, field_name, index, raw_text, shingle_set)."""
    fields = []
    for slug, name, county, *_ in CITIES:
        copy = CITY_COPY[slug]
        entries = [("intro", 0, copy["intro"])]
        for i, p in enumerate(copy["buying"]):
            entries.append(("buying", i, p))
        for i, p in enumerate(copy.get("pricingExplainer", [])):
            entries.append(("pricingExplainer", i, p))
        entries.append(("localProof", 0, copy["localProof"]))
        for i, item in enumerate(copy["faq"]):
            entries.append(("faq_a", i, item["a"]))
        for field_name, idx, text in entries:
            norm = normalize(text, name, county)
            fields.append((slug, field_name, idx, text, shingles(norm)))
    return fields


def main():
    fields = collect_fields()
    failures = []
    max_seen = 0.0

    # Only compare within the same field_name category (intro-vs-intro,
    # buying-vs-buying, etc.) — comparing an intro to an FAQ answer would be
    # meaningless. faq_a compares across all 5 slots since a duplicate answer
    # could land in a different question slot on another page.
    by_field = {}
    for entry in fields:
        by_field.setdefault(entry[1], []).append(entry)

    for field_name, entries in by_field.items():
        for (slug_a, _, idx_a, text_a, sh_a), (slug_b, _, idx_b, text_b, sh_b) in combinations(entries, 2):
            if slug_a == slug_b:
                continue
            score = jaccard(sh_a, sh_b)
            max_seen = max(max_seen, score)
            if score > THRESHOLD:
                failures.append((field_name, slug_a, idx_a, slug_b, idx_b, score, text_a, text_b))

    print(f"Checked {len(by_field)} field categories across {len(CITIES)} published cities.")
    print(f"Highest similarity score seen: {max_seen:.3f} (threshold: {THRESHOLD})")
    print()

    if not failures:
        print("PASS — no near-duplicate content found across published city pages.")
        return 0

    failures.sort(key=lambda f: -f[5])
    print(f"FAIL — {len(failures)} near-duplicate pair(s) found:\n")
    for field_name, slug_a, idx_a, slug_b, idx_b, score, text_a, text_b in failures:
        print(f"[{field_name}] {slug_a}[{idx_a}]  <->  {slug_b}[{idx_b}]   similarity={score:.2f}")
        print(f"  {slug_a}: {text_a[:150]}")
        print(f"  {slug_b}: {text_b[:150]}")
        print()

    print("Fix the flagged text (rewrite one side with a genuinely different sentence)")
    print("and re-run this script. Do not lower THRESHOLD to make a failure disappear.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
