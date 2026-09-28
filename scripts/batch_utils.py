"""
Shared helpers for batch-authoring city content at scale.

assign_variants() exists because of a real incident: batch 4 (2026-09-28)
wrote 12-entry variant pools for two repeated FAQ answers (land-ownership,
county-delivery) and indexed into them with `pool[i % len(pool)]` across 35
cities. Since 35 > 12, the index wrapped around every 12th city, and those
cities got byte-identical (after city/county masking) text. Nothing caught
this until the full cross-city duplication check ran and printed 722
failures — the bug was silent at the point it was introduced.

assign_variants() replaces the raw modulo pattern and raises immediately if
the pool is too small, at authoring time, before any content is spliced into
write_city_content.py. See CLAUDE.md's "Variant pools" section.
"""


def assign_variants(pool, items, label="variant pool"):
    """Assigns one distinct entry of `pool` to each of `items`, in order.

    Raises ValueError immediately if len(pool) < len(items) — this is the
    exact condition that caused the batch-4 incident (a 12-entry pool used
    across 35 cities). Fix by writing more pool entries, not by wrapping
    around; a wrapped-around index gives two different cities the same
    template sentence, which is real, hard-to-notice duplicate content, not
    a cosmetic issue.

    `items` can be any sequence (e.g. the CITIES tuples for a batch) — only
    its length is used for the check; the assignment itself is positional
    (items[i] gets pool[i]).

    Returns a list of (item, variant) pairs, same order as `items`.
    """
    if len(pool) < len(items):
        raise ValueError(
            f"{label} has {len(pool)} entries but {len(items)} items need a "
            f"distinct one each. Add at least {len(items) - len(pool)} more "
            f"entries before assigning — do not index with `% len(pool)`, "
            f"it will silently repeat text across cities (see batch 4's "
            f"722-failure incident, scripts/batch_utils.py's module "
            f"docstring)."
        )
    return list(zip(items, pool[: len(items)]))
