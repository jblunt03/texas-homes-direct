#!/usr/bin/env python3
"""
Recomputes each city's `popularHomes` (the 3 listings shown in the
"Homes to Get You Started" block — see CLAUDE.md's "Popular Homes
selection" note for the full rationale) from lib/sampleListings.ts and
CITIES in write_city_content.py, then splices the result back into
write_city_content.py.

Selection rule:
  - New Braunfels: the only city whose copy makes an explicit range claim
    ("compact single-section homes to larger four-bedroom double wides")
    — hand-picked to span that literal range: smallest single wide,
    a mid-size double wide, the largest 4-bed double wide.
  - Every other city: least-used-first rotation across all listings in
    lib/sampleListings.ts, with a light nudge toward including both a
    single-wide-family and a double-wide-family listing per city (a
    reasonable range to show, not a claim about that county's lot sizes
    or household needs — no per-city fit signal actually exists in the
    copy; see CLAUDE.md). Deterministic: same inputs always produce the
    same assignment, so re-running this after adding a new city or a new
    listing only changes the cities/slots actually affected.

Fill-only (since batch 5, 2026-10-26): only cities whose popularHomes list
is EMPTY get picks. Cities that already have a list keep it byte-for-byte —
re-running this never changes a live page's cards. Their existing picks
still count toward usage, so new cities get the least-used listings across
the whole site, not just within the new batch. To deliberately re-pick a
city, empty its list in CITIES first.

Namesake rule: a listing titled "The <City>" is never assigned to that
city's page (e.g. The Brownwood is never a pick for Brownwood), so a city
page doesn't show a home that reads like a page about itself.

Run after adding new cities to CITIES (with an empty popular list),
then regenerate as usual:
    python3 scripts/assign_popular_homes.py
    python3 scripts/write_city_content.py
    python3 scripts/check_duplication.py
"""
import re
import sys

sys.path.insert(0, "scripts")
from write_city_content import CITIES  # noqa: E402


def parse_listings():
    with open("lib/sampleListings.ts") as f:
        content = f.read()
    entries = re.split(r"\n  \{\n", content)[1:]
    listings = []
    for e in entries:
        slug_m = re.search(r"slug: '([^']+)'", e)
        title_m = re.search(r"title: '([^']+)'", e)
        legacy_m = re.search(r"legacySlugs: \[([^\]]*)\]", e)
        wide_m = re.search(r"wideType: '([^']+)'", e)
        beds_m = re.search(r"beds: (\d+)", e)
        sqft_m = re.search(r"sqft: (\d+)", e)
        avail_m = re.search(r"available: (true|false)", e)
        if not slug_m:
            continue
        if avail_m and avail_m.group(1) != "true":
            continue
        listings.append(
            {
                "slug": slug_m.group(1),
                "title": title_m.group(1) if title_m else "",
                "legacy": re.findall(r"'([^']+)'", legacy_m.group(1)) if legacy_m else [],
                "wideType": wide_m.group(1) if wide_m else "Single Wide",
                "beds": int(beds_m.group(1)) if beds_m else 0,
                "sqft": int(sqft_m.group(1)) if sqft_m else 0,
            }
        )
    return listings


def namesake_slugs(listings, city_name):
    """Listings titled "The <City>" — never shown on that city's own page."""
    return {L["slug"] for L in listings if L["title"].lower() == f"the {city_name}".lower()}


def assign(listings, targets, existing):
    """targets: [(city_slug, city_name)] needing picks.
    existing: {city_slug: [listing slugs]} already assigned — kept as-is,
    but counted toward usage so the rotation stays least-used site-wide."""
    known = {L["slug"] for L in listings}
    # Existing cities store whatever slug was current when they were filled —
    # often a legacy one (lib/cityContent.ts is never rewritten for a URL
    # change; see CLAUDE.md "Listing URLs"). Count each as its current listing
    # so usage and the overlap guard see the real picks.
    current = {old: L["slug"] for L in listings for old in L["legacy"]}
    existing = {c: [current.get(p, p) for p in picks] for c, picks in existing.items()}
    usage = {L["slug"]: 0 for L in listings}
    for picks in existing.values():
        for p in picks:
            if p in known:
                usage[p] += 1
    assignments = {}

    import hashlib

    def tie_break(city_slug, listing_slug):
        # Deterministic per-(city, listing) tiebreak, so cities that reach
        # the same usage counts at the same point don't all pick the same
        # least-used listing in the same order — without this, the least-
        # used-first rule alone produces identical triples for many cities
        # every time the usage counters realign (~every 18 cities).
        h = hashlib.sha1(f"{city_slug}:{listing_slug}".encode()).hexdigest()
        return h

    # Every triple assigned so far (existing cities + new ones as they're
    # filled). A new city may share at most one listing with any of them —
    # otherwise listings that start far below the others in usage (new
    # inventory nobody shows yet) all land together on the same few pages.
    # Batch 5's first run did exactly that: the three Cavco homes, unused
    # anywhere, became the identical card set on its first five cities.
    triples = [set(p) for p in existing.values()]

    def overlaps_too_much(picks, candidate):
        trial = set(picks) | {candidate}
        return len(trial) >= 2 and any(len(trial & t) >= 2 for t in triples)

    def pick_least_used(city_slug, exclude, prefer_type=None, picks=()):
        candidates = [
            L for L in listings
            if L["slug"] not in exclude and not overlaps_too_much(picks, L["slug"])
        ]
        if prefer_type:
            typed = [L for L in candidates if L["wideType"] == prefer_type]
            if typed:
                candidates = typed
        candidates.sort(key=lambda L: (usage[L["slug"]], tie_break(city_slug, L["slug"])))
        chosen = candidates[0]
        usage[chosen["slug"]] += 1
        return chosen["slug"]

    for slug, name in targets:
        if slug == "new-braunfels":
            # Hand-picked range (see module docstring): smallest single wide,
            # a mid-size 3-bed double wide, the largest 4-bed double wide.
            by_sqft = sorted(listings, key=lambda L: L["sqft"])
            smallest_single = next(L for L in by_sqft if L["wideType"] == "Single Wide")
            mids = sorted(
                (L for L in listings if L["wideType"] == "Double Wide" and L["beds"] == 3),
                key=lambda L: L["sqft"],
            )
            largest = max(
                (L for L in listings if L["wideType"] == "Double Wide" and L["beds"] == 4),
                key=lambda L: L["sqft"],
            )
            picks = [smallest_single["slug"], mids[len(mids) // 2]["slug"], largest["slug"]]
            for p in picks:
                usage[p] += 1
            assignments[slug] = picks
            continue
        blocked = namesake_slugs(listings, name)
        picks = []
        picks.append(pick_least_used(slug, blocked | set(picks)))
        first_type = next(L["wideType"] for L in listings if L["slug"] == picks[0])
        other_type = "Double Wide" if first_type == "Single Wide" else "Single Wide"
        picks.append(pick_least_used(slug, blocked | set(picks), prefer_type=other_type, picks=picks))
        picks.append(pick_least_used(slug, blocked | set(picks), picks=picks))
        assignments[slug] = picks
        triples.append(set(picks))

    return assignments, usage


def splice_into_source(assignments):
    with open("scripts/write_city_content.py") as f:
        text = f.read()

    for slug, popular in assignments.items():
        # popularHomes is the list immediately followed by the tuple's
        # closing "),") — nearby (the other list in the tuple) is instead
        # followed by ",\n     [", so this anchor picks the right one.
        pattern = re.compile(
            r'(\("' + re.escape(slug) + r'",.*?)(\[[^\]]*\])(\),)',
            re.DOTALL,
        )
        m = pattern.search(text)
        if not m:
            print(f"WARN: could not find popularHomes list for {slug}")
            continue
        new_list = "[" + ", ".join(f'"{p}"' for p in popular) + "]"
        text = text[: m.start(2)] + new_list + text[m.end(2) :]

    with open("scripts/write_city_content.py", "w") as f:
        f.write(text)


def main():
    listings = parse_listings()
    # Only cities that have CITY_COPY entries are considered — stub cities'
    # placeholder lists are left untouched.
    from write_city_content import CITY_COPY

    authored = [c for c in CITIES if c[0] in CITY_COPY]
    existing = {c[0]: list(c[-1]) for c in authored if c[-1]}
    targets = [(c[0], c[1]) for c in authored if not c[-1]]
    assignments, usage = assign(listings, targets, existing)

    print(f"Listings available: {len(listings)}")
    print(f"Cities kept as-is (already had picks): {len(existing)}")
    print(f"Cities filled (empty list): {len(assignments)}")
    used = sum(1 for v in usage.values() if v > 0)
    print(f"Listings used at least once (site-wide): {used}/{len(listings)}")
    counts = sorted(usage.values(), reverse=True)
    print(f"Max uses of a single listing: {counts[0]}")
    print(f"Min uses of a listing: {min(usage.values())}")
    for slug, name in targets:
        blocked = namesake_slugs(listings, name)
        if blocked:
            print(f"  {slug}: excluded namesake listing(s) {sorted(blocked)}")

    if assignments:
        splice_into_source(assignments)
        print("Spliced popularHomes assignments into scripts/write_city_content.py")
    else:
        print("Nothing to fill — no city has an empty popularHomes list.")


if __name__ == "__main__":
    main()
