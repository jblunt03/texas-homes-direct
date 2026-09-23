#!/usr/bin/env python3
"""
Within-page redundancy checker for lib/cityContent.ts.

Run this after every batch of new/edited city pages, alongside
check_duplication.py:

    python3 scripts/check_redundancy.py

What it does, and why it's a separate script from check_duplication.py:
check_duplication.py compares a field (say, intro) against the SAME field
on every OTHER city — it structurally cannot see a city's own intro next
to its own gettingStarted paragraph, because that's a different field on
the same page, not the same field on two different pages. That gap was
real: the first draft of the "Getting Started" section (2026-09-18) mostly
passed check_duplication.py cleanly while about half the cities' section
just restated their own intro's hook one section later on the same page —
literal repetition a reader hits scrolling down, that the cross-city
checker cannot catch by design.

This script instead compares every prose field on a city's page against
every OTHER prose field on that SAME city's page (intro vs. buying[0],
gettingStarted[1] vs. buying[1], etc.) — never across cities. Same
word-shingle Jaccard technique as check_duplication.py, but with a
6-word shingle (vs. 8) and lower threshold, calibrated against this
batch's real findings: genuine restatement (the Bastrop/Burnet case,
where gettingStarted[1] was a near copy of buying[1]) scored 0.24-0.83;
ordinary shared domain vocabulary ("Texas Homes Direct", "manufactured
home", "financing", the county name) stayed under 0.15 even between
genuinely distinct sentences on the same page. That's not as sharp a
separation as check_duplication.py gets with 8-grams across many pages,
so treat anything this flags as worth a human read, not an automatic
rewrite — a deliberate callback between two sections (e.g. an FAQ answer
that intentionally references something the intro already promised) can
be fine; a fully restated sentence is not.

Exit code is non-zero (and prints a loud FAIL banner) if anything exceeds
the threshold — meant to be a hard gate in scripts/validate_batch.py,
same as check_duplication.py. Fix flagged text by rewriting the later
field to add something new, not by restating the earlier field in
different words.
"""
import re
import sys
from itertools import combinations

sys.path.insert(0, "scripts")
from write_city_content import CITIES, CITY_COPY  # noqa: E402

SHINGLE_SIZE = 6
# Calibrated against this project's real findings from the 2026-09-18
# "Getting Started" rollout — see the module docstring above.
THRESHOLD = 0.15


def normalize(text):
    t = text.lower()
    t = re.sub(r"[^a-z0-9\s]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def shingles(text, n=SHINGLE_SIZE):
    words = text.split()
    if len(words) < n:
        return {tuple(words)} if words else set()
    return {tuple(words[i : i + n]) for i in range(len(words) - n + 1)}


def jaccard(a, b):
    if not a or not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0.0


def collect_city_fields(copy):
    """Returns list of (field_name, text) for one city's prose fields."""
    fields = [("intro", copy["intro"])]
    for i, p in enumerate(copy["buying"]):
        fields.append((f"buying[{i}]", p))
    for i, p in enumerate(copy.get("pricingExplainer", [])):
        fields.append((f"pricingExplainer[{i}]", p))
    for i, p in enumerate(copy.get("gettingStarted", [])):
        fields.append((f"gettingStarted[{i}]", p))
    fields.append(("localProof", copy["localProof"]))
    for i, item in enumerate(copy["faq"]):
        fields.append((f"faq_a[{i}]", item["a"]))
    return fields


def main():
    failures = []
    max_seen = 0.0
    checked_cities = 0

    for slug, name, county, *_ in CITIES:
        copy = CITY_COPY.get(slug)
        if not copy:
            continue
        checked_cities += 1
        fields = collect_city_fields(copy)
        shingle_sets = [(fname, text, shingles(normalize(text))) for fname, text in fields]

        for (name_a, text_a, sh_a), (name_b, text_b, sh_b) in combinations(shingle_sets, 2):
            score = jaccard(sh_a, sh_b)
            max_seen = max(max_seen, score)
            if score > THRESHOLD:
                failures.append((slug, name_a, name_b, score, text_a, text_b))

    print(f"Checked {checked_cities} cities' pages for within-page field redundancy.")
    print(f"Highest similarity score seen: {max_seen:.3f} (threshold: {THRESHOLD})")
    print()

    if not failures:
        print("PASS — no field on any city's page restates another field on the same page.")
        return 0

    failures.sort(key=lambda f: -f[3])
    print(f"FAIL — {len(failures)} within-page redundant pair(s) found:\n")
    for slug, name_a, name_b, score, text_a, text_b in failures:
        print(f"[{slug}] {name_a}  <->  {name_b}   similarity={score:.2f}")
        print(f"  {name_a}: {text_a[:150]}")
        print(f"  {name_b}: {text_b[:150]}")
        print()

    print("Fix by rewriting the later field to add something new, not by restating")
    print("the earlier field in different words. Re-run this script after editing.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
