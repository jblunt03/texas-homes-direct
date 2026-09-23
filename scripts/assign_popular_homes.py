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

Run after editing CITIES (new cities) or sampleListings.ts (new
inventory), then regenerate as usual:
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
                "wideType": wide_m.group(1) if wide_m else "Single Wide",
                "beds": int(beds_m.group(1)) if beds_m else 0,
                "sqft": int(sqft_m.group(1)) if sqft_m else 0,
            }
        )
    return listings


def assign(listings, city_slugs):
    usage = {L["slug"]: 0 for L in listings}
    assignments = {}

    by_sqft = sorted(listings, key=lambda L: L["sqft"])
    smallest_single = next(L for L in by_sqft if L["wideType"] == "Single Wide")
    largest_double_4bed = max(
        (L for L in listings if L["wideType"] == "Double Wide" and L["beds"] == 4),
        key=lambda L: L["sqft"],
    )
    mid_double = sorted(
        (L for L in listings if L["wideType"] == "Double Wide" and L["beds"] == 3),
        key=lambda L: L["sqft"],
    )[len([L for L in listings if L["wideType"] == "Double Wide" and L["beds"] == 3]) // 2]
    new_braunfels_pick = [smallest_single["slug"], mid_double["slug"], largest_double_4bed["slug"]]
    for slug in new_braunfels_pick:
        usage[slug] += 1

    import hashlib

    def tie_break(city_slug, listing_slug):
        # Deterministic per-(city, listing) tiebreak, so cities that reach
        # the same usage counts at the same point don't all pick the same
        # least-used listing in the same order — without this, the least-
        # used-first rule alone produces identical triples for many cities
        # every time the usage counters realign (~every 18 cities).
        h = hashlib.sha1(f"{city_slug}:{listing_slug}".encode()).hexdigest()
        return h

    def pick_least_used(city_slug, exclude, prefer_type=None):
        candidates = [L for L in listings if L["slug"] not in exclude]
        if prefer_type:
            typed = [L for L in candidates if L["wideType"] == prefer_type]
            if typed:
                candidates = typed
        candidates.sort(key=lambda L: (usage[L["slug"]], tie_break(city_slug, L["slug"])))
        chosen = candidates[0]
        usage[chosen["slug"]] += 1
        return chosen["slug"]

    for slug in city_slugs:
        if slug == "new-braunfels":
            assignments[slug] = new_braunfels_pick
            continue
        picks = []
        picks.append(pick_least_used(slug, set(picks)))
        first_type = next(L["wideType"] for L in listings if L["slug"] == picks[0])
        other_type = "Double Wide" if first_type == "Single Wide" else "Single Wide"
        picks.append(pick_least_used(slug, set(picks), prefer_type=other_type))
        picks.append(pick_least_used(slug, set(picks)))
        assignments[slug] = picks

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
    city_slugs = [c[0] for c in CITIES if c[0]]
    # Only reassign for cities that actually have CITY_COPY entries (the 44
    # authored cities) — leave stub cities' placeholder lists untouched.
    from write_city_content import CITY_COPY

    authored = [s for s in city_slugs if s in CITY_COPY]
    assignments, usage = assign(listings, authored)

    print(f"Listings available: {len(listings)}")
    print(f"Cities reassigned: {len(assignments)}")
    used = sum(1 for v in usage.values() if v > 0)
    print(f"Listings used at least once: {used}/{len(listings)}")
    counts = sorted(usage.values(), reverse=True)
    print(f"Max uses of a single listing: {counts[0]}")
    print(f"Min uses among used listings: {min(v for v in usage.values() if v > 0)}")

    splice_into_source(assignments)
    print("Spliced popularHomes assignments into scripts/write_city_content.py")


if __name__ == "__main__":
    main()
