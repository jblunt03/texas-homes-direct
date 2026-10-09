# Texas Homes Direct — Working Notes

This file governs how Claude Code should work in this repo, specifically for
the "Cities We Serve" SEO city-page system (`/cities` hub +
`/mobile-homes-[slug]-tx` pages). Read this before touching anything under
`lib/cityContent.ts`, `lib/cities.ts`, `scripts/write_city_content.py`,
`scripts/check_duplication.py`, `scripts/check_redundancy.py`,
`scripts/assign_popular_homes.py`, `scripts/validate_batch.py`, or
`components/CityPageContentV2.tsx`.

**Validating a batch is one command:** `python3 scripts/validate_batch.py`
— generates content, runs every check below in order, starts a scratch dev
server to verify word count/schema/no-localhost, tears it down, and prints
PUBLISHABLE or NOT PUBLISHABLE with specifics. See "One-command batch
validation" further down for what each step checks and how to read a
failure. Run this before every review with the user — don't run the
individual checks by hand unless you're iterating on a fix for one specific
failure it already told you about.

## Hard rules for all generated city-page content

These apply to every city, every batch, no exceptions. Violating any of
these is a launch blocker, not a style note.

- **No delivery times, timelines, or turnaround windows anywhere.** Delivery
  varies day to day and isn't something this business controls. No
  "typically a few weeks," no "within X days," no "much shorter timeline."
- **No invented customers, testimonials, or specific transactions.** Only
  aggregate statements ("we've worked with families across X County") are
  allowed — never a named buyer or a specific sale.
- **No county-specific regulations, statistics, market claims, or soil
  conditions that weren't explicitly provided.** Don't invent permitting
  comparisons between counties, market-size/ranking claims, wind-zone or
  soil/well-depth engineering claims, or specific fee amounts for a specific
  county. If the topic comes up, say requirements vary by county and that
  Texas Homes Direct helps buyers sort it out — never state what a specific
  county's rules are.
- **No competitor names or competitor pricing.** Never mention South Texas
  Home Center, Best Mobile Homes, Hill Country Manufactured Homes, Clayton
  Homes, or any other named competitor — and never invent a competitor's
  rate or a dollar-savings comparison against one.
- **Never state or imply whether Texas Homes Direct has a physical
  location.** No "visit our showroom," no "come by our lot," but also no
  "we don't have a location." Just don't address the topic — frame
  everything around delivery, contact, and financing instead.
- **Always "Texas Homes Direct" — never the abbreviation "THD".**
- **No land sales or land-home packages — homes only.** It's fine to
  describe a buyer's own land options (family land / land they already own
  / a lot they're purchasing separately), since that's about where the
  buyer places a home, not something Texas Homes Direct sells.
- **No Spanish-language content** in city-page copy (this is separate from
  the `/api/chat` advisor, which does support Spanish per its own system
  prompt — don't conflate the two).
- **Never claim to know the exact utility cost upfront.** Utility hookups
  (well, septic, electric) can't be priced sight-unseen — land conditions
  (soil, depth to water, distance to power) vary too much. The accurate,
  required framing, used everywhere pricing comes up:
  - **Out-the-door home pricing is firm and complete.** AC, setup, delivery,
    appliances, trim out, wood steps, tax, title, and license are all
    included in the quoted price. Nothing gets added later. This list is
    rendered by the shared `OUT_THE_DOOR_ITEMS` checklist in
    `CityPageContentV2.tsx` — don't re-list it verbatim in prose per city
    (doing that once caused 27 duplicate-checker failures across the batch,
    since the 13-word item list alone exceeds the shingle threshold every
    time it repeats). In prose, refer to it generally ("everything listed
    above") and vary the sentence around that reference per city.
  - **Utilities are estimated by phone, then bid exactly on-site.** We give
    a solid phone estimate first, then send our own contractor to the
    property to produce an exact bid, which the buyer sees and approves
    before anything is final. Never say a utility number is known "upfront,"
    "from day one," or "from the start" — that's the specific false-
    precision claim this rule exists to prevent. It's fine to say setup
    costs (pad/underpinning/skirting — the fixed parts) get quoted
    immediately; the variable part is the utility hookup itself.
  - Both paragraphs live in `CityContent.pricingExplainer: [string, string]`
    (declared optional in the type, but every one of the 104 authored
    cities has it). The component renders the "Your Price, Explained"
    section only when this field is present, so new cities need it too.
- **What "setup" actually includes** (the `TURNKEY_ITEMS` checklist in
  `CityPageContentV2.tsx`, rendered under "We Handle It All"): water,
  septic, electric, base pad, block, tie down, underpinning, skirting,
  trim out, and AC. As of 2026-09-18 this is the full, correct list — block
  and tie down were missing entirely until then, and trim out/AC were only
  listed in `OUT_THE_DOOR_ITEMS` (the price checklist), not here. AC and
  trim out intentionally appear in *both* checklists — `TURNKEY_ITEMS`
  describes the physical on-site work, `OUT_THE_DOOR_ITEMS` describes price
  inclusions — and that's fine, they read as two different sections on the
  page, not a duplicate. When writing per-city prose that references "what's
  included in setup" (e.g. FAQ answers), draw from this full 10-item list
  rather than just "pad, underpinning, skirting, utility hookups" — the
  narrower phrasing was a repeated source of near-duplicate FAQ answers
  across cities, and the fuller vocabulary gives more room for genuinely
  distinct sentences per city.

Also still in force from earlier rounds, enforced by `scripts/write_city_content.py`'s doc comment:
- Facts not given to you don't get invented, period — descriptive local
  color is fine, factual claims are not.

## Content approach: fresh-written per city, not template pools

**Do not use fixed rotation pools (a small set of intro/body variants
reused across many cities).** This repo already made that mistake once: an
early version cycled 6 intro variants and 8 body blocks across 16 cities,
and Waco and Dallas ended up with word-for-word identical intro paragraphs
except for the city and county name. At 16 cities that's already a
duplicate-content problem; at the ~300 cities `lib/cities.ts` has room for,
a small fixed pool guarantees dozens of exact duplicates.

Instead: **every city's intro, buying-section paragraphs, local-proof line,
and FAQ answers are hand-written fresh, per city**, in
`scripts/write_city_content.py`. The page *structure* (section order, H1
treatment, checklist, financing grid, FAQ format, JSON-LD) stays identical
across every city — only the prose is unique each time. See that file's
module docstring for the exact authoring workflow.

## Required batch workflow

Follow this every time you add or edit a batch of city pages:

1. **Get the raw inputs.** For each new city: name, slug, county, region,
   hero/secondary image paths + alt text, and nearby real (geographically
   accurate) neighbor slugs. Don't hand-pick `popularHomes` — leave it as
   an empty list (or any placeholder) and run
   `python3 scripts/assign_popular_homes.py` after step 3 below; it
   recomputes every authored city's `popularHomes`, including the ones
   already published, from `lib/sampleListings.ts`. See "Popular Homes
   selection" further down for why this is scripted rather than picked by
   hand.
2. **Add structural entries** to `CITIES` in `lib/cities.ts` (published:
   false until content is ready) and to `CITIES` in
   `scripts/write_city_content.py`.
3. **Write fresh copy** for each new city in `CITY_COPY` in
   `scripts/write_city_content.py`: 1 intro paragraph, exactly 2 buying
   paragraphs, exactly 2 `pricingExplainer` paragraphs (firm out-the-door
   price, then how utility costs are actually estimated — see the hard rule
   above), exactly 2 `gettingStarted` paragraphs (see below), 1 local-proof
   line, and 3–5 FAQ items covering only genuinely city-specific topics
   (permitting-varies, delivery coverage, land ownership, sizing, financing
   accessibility, or the city's own assigned differentiator concept). **Do
   not write a definition, setup-scope, price-lock, or utility-pricing FAQ
   per city** — see "Explainer pages" below; those four topics live on
   shared pages now, linked from every city page's FAQ section, not
   repeated per city. Follow the hard rules above. Do not copy an existing
   city's paragraph and reword it — start from that city's actual county
   name and write new sentences. Target **850–950 words** of real substance
   per page (check with the word-count snippet in the Page speed section
   below) — thin pages underperform; don't pad, add another genuinely
   useful section or FAQ instead. This target was lowered from 900–1,100 on
   2026-09-18: after retiring the four rotated FAQ topics (below) and
   adding the `gettingStarted` section, most pages land around 700–820
   words. That's the honest number for this page structure — a second
   invented section just to clear 950 was explicitly rejected in favor of
   real substance. If a future addition closes the remaining gap
   genuinely, raise the target again; don't pad existing sections to hit
   it.
   **`gettingStarted` must add genuinely new content, not restate the
   intro/buying concept in different words.** The first version of this
   section (2026-09-18) mostly echoed each city's own intro hook one
   section later on the same page — passed the cross-city duplication
   checker fine, but was still repetition on a single page, which that
   checker structurally can't catch (it only compares a field against the
   *same* field on *other* cities, not against *other fields on the same
   page*). `scripts/check_redundancy.py` exists specifically to catch this
   class of problem now — see "One-command batch validation" below. The
   fix, when it flags something: reorient toward the *mechanics* of
   starting (what determines the next step — land status, lot size, what
   the first call actually covers) rather than restating *why* the city's
   differentiator matters, which the intro/buying section already covers.
   **Audit concepts, not just wording, before moving on** — read all the
   new intros (or whichever field you just wrote) back to back and check
   each one leads on a genuinely different idea (cost, turnkey setup,
   permitting handled, financing flexibility, no-pressure, land you already
   own, single vs. double wide, what's included, HUD quality, verifiable
   pricing, monthly payment, credit-approval accessibility, delivery
   coverage, brand values, etc.). Neither checker below measures this —
   two intros can pass both and still open on the same idea in different
   words, which reads as the same page twice to a human. Rewrite until no
   two pages in the batch share a lead concept.
4. **Validate:** `python3 scripts/validate_batch.py` — one command runs
   everything below and tells you PUBLISHABLE or NOT PUBLISHABLE with
   specifics. See "One-command batch validation" for what it checks. Don't
   run the individual scripts by hand except while iterating on a fix for
   one specific failure it already reported.
5. **Review with the user.** Show real output, not a description of it (see
   the Evidence rule below). Flip `published: true` in `lib/cities.ts` only
   for cities the user has approved.
6. **Re-validate** (`python3 scripts/validate_batch.py` again) since
   flipping `published` changes which pages the duplication checker and
   the schema/word-count checks cover.
7. **Do not commit or deploy without explicit, fresh instruction** — this
   holds every session, not just once.

## One-command batch validation

`python3 scripts/validate_batch.py` (added 2026-09-18) is the single
command that tells you whether a batch is publishable. Run it instead of
the individual scripts, except while actively iterating on a fix for one
step it already flagged. It stops at the first hard failure and always
prints a final summary table plus PUBLISHABLE / NOT PUBLISHABLE. Steps, in
order:

1. **Generate** — `write_city_content.py`, regenerates `lib/cityContent.ts`.
2. **Cross-city duplication** — `check_duplication.py`. A field (intro,
   buying, FAQ answer, FAQ question, etc.) against the *same* field on
   *every other* published city, word-8-gram Jaccard, **threshold 0.22 —
   that is the publish bar.** It was 0.25 originally, but batches 2, 3 and
   4 were each hand-tightened to roughly 0.19–0.21 before publishing (batch
   2 at 0.206, batch 3 at 0.188), so on 2026-10-06 the script's
   `THRESHOLD` was lowered to 0.22 to enforce what was already the real
   practice. A score sitting just under the old 0.25 line is not "passing"
   — tighten the worst pairs until the max is 0.22 or below. The current
   corpus's max is 0.217.

   **FAQ question text (`faq_q`) is checked as well as answers (`faq_a`).**
   Search Console flagged Hondo, Gonzales, Floresville and Pleasanton as
   "Duplicate without user-selected canonical" even though every prose field
   scored under threshold. Investigation found 67 of 104 pages shared the
   literal question "Do I need to already own land in [County]?" and 68
   shared "Do you deliver throughout [County]?" — Google doesn't know a
   repeated question is allowed by design, it just sees identical text on
   the page. The questions were rewritten with real variety (135 of them,
   across 9 templates) and `faq_q` was added to `collect_fields()` so the
   same discipline now applies to questions as to answers and it can't
   recur silently.
3. **Within-page redundancy** — `check_redundancy.py`. Every prose field on
   a city's page against every *other* field on that *same* city's page
   (does `gettingStarted` just restate `intro`? does an FAQ answer copy
   `buying[1]`?). Word-6-gram Jaccard, threshold 0.15. This is the check
   that catches what #2 structurally cannot — see the `gettingStarted` note
   above for the real incident that motivated it.
4. **Hard-rule sweep** — greps the generated source (with comments and the
   module docstring stripped, so the rules' own descriptions don't
   self-flag) for: the "THD" abbreviation, delivery-timeline language,
   named competitors, Spanish-language characters, and a utility-cost
   claimed positively "upfront" (a negation word like "can't" or "isn't" in
   the same clause clears it — that's the honest, required framing; only a
   clause *without* one is a real violation).
5. **Image paths resolve** — every local image path (`heroImage`,
   `secondaryImage` in `lib/cityContent.ts`; `images[]`, `floorplanUrl` in
   `lib/sampleListings.ts`) is checked against the filesystem under
   `public/`. Static check, no dev server needed. Added 2026-09-29 after
   batch 4 shipped 35 city pages with a secondary-image path missing its
   `/homes/` prefix — a splice-script bug that 404'd on every one of those
   pages, undetected until Search Console flagged the pages as
   duplicate/low-value. The regex deliberately does **not** anchor on a
   literal `/homes/` prefix — an earlier version of this check did, which
   meant it silently passed on exactly the malformed path it exists to
   catch (a path missing that prefix can't match a pattern requiring it).
   Verified by re-injecting the batch-4 bug and confirming this version
   fails on it before trusting a clean run.
6. **Unique hero + secondary image pairs** — no two cities may share the
   same ordered `(heroImage, secondaryImage)` pair in `lib/cityContent.ts`.
   See "Hero and secondary images" below for why. The check fails loudly if
   it parses zero cities (i.e. if the file's format changes and its regexes
   silently stop matching) rather than passing on nothing.
7. **Type-check** — `npx tsc --noEmit`.
8. **Dev server up** — starts `next dev` on a scratch port (3099, chosen to
   avoid colliding with a preview already running on the usual port),
   polls until it responds, tears it down at the end (step 12) no matter
   what happens in between.
9. **Word count** — every currently-published city page, against the
   850–950 target. A page outside that range is a *warning* (printed, not
   blocking) — the target is aspirational per the note above, and matching
   it exactly isn't a launch requirement. A page under 600 words *is*
   blocking — that's not "a bit short," that's a sign a field is missing
   or empty.
10–11. **Required schema + no localhost** — for every published city page
   and the three explainer pages: fetches the rendered HTML, parses every
   `<script type="application/ld+json">` block, and confirms the required
   `@type`s are present (`FAQPage`, `BreadcrumbList`, `WebPage`, and for
   city pages only, `LocalBusiness` + `ImageObject`), that `WebPage`'s
   `speakable.cssSelector` includes `.bmh-faq-speakable`, and that no
   JSON-LD `url`/`@id`, canonical `<link>`, or `og:url` on the page points
   at `localhost`/`127.0.0.1` — a real (if easy to miss) way a dev-only
   value could ship as if it were the production URL.
12. **Dev server down** — always runs, including after a failure in 9–11.

If you add a new required field, JSON-LD type, or hard rule, add the check
to `validate_batch.py` in the same pass — don't leave it as something only
caught by manual review. That's the whole point of this script existing.

## Variant pools — for repeated concepts across many cities at once

At small batch sizes, every FAQ answer and sentence gets written fully
fresh per city (see "Content approach" above). At larger batch sizes
(20+ cities in one pass), a handful of concepts genuinely repeat across
every city on purpose — "do you need to already own land," "do you
deliver countywide" — because they're legitimate, allowed per-city FAQ
topics (see "Explainer pages" below for which topics are *not* allowed to
repeat). Writing these by hand as a rotation of template sentences with
the county name swapped in is normal and fine — **but the rotation pool
must have at least as many distinct entries as the number of cities
using it.**

**The incident this guards against:** batch 4 (2026-09-28, 35 cities)
wrote 12-entry pools for the land-ownership and county-delivery FAQ
answers and indexed into them with `pool[i % len(pool)]`. With 35 cities
and a 12-entry pool, the index wrapped around every 12th city and handed
out byte-identical (after city/county masking) text — real duplicate
content, not a false positive. Nothing caught it until the full
`check_duplication.py` run printed 722 failures. The bug was silent
exactly where it was introduced and only visible much later, expensively.

**The fix, two layers:**

1. **Author with `scripts/batch_utils.assign_variants(pool, items, label)`**,
   not raw `pool[i % len(pool)]` indexing. It raises immediately if
   `len(pool) < len(items)`, naming exactly how many more entries are
   needed — fails at the point the bug would be introduced, not dozens of
   steps later.
2. **`check_duplication.py` also detects it after the fact**, as a second,
   independent layer: any field where 3+ cities share byte-identical text
   after city/county masking gets reported separately as a
   `VARIANT-POOL WRAPAROUND` failure, named as a distinct cluster (not
   buried in a long list of ordinary pairwise near-duplicate scores). Two
   cities converging on similar phrasing independently is a normal thing
   pairwise similarity scoring catches; three or more cities landing on
   *identical* text is specifically the wraparound signature and gets its
   own loud, specific message. This runs as part of the normal
   `check_duplication.py` / `validate_batch.py` pipeline — no separate
   command needed.

Prefer catching it with layer 1 — don't rely on layer 2 as the primary
defense, since fixing 20+ collapsed pairwise failures after the fact
(batch 4's actual experience) costs far more than sizing the pool
correctly before splicing content in.

## Popular Homes selection

The "Homes to Get You Started" block (renamed from "Popular Homes to
Consider" on 2026-09-18 — see below) shows 3 of the 54 real listings in
`lib/sampleListings.ts` on every city page. Selection is computed by
`scripts/assign_popular_homes.py`, not picked by hand per city — run it
after adding a new city or new inventory to `lib/sampleListings.ts`:

```
python3 scripts/assign_popular_homes.py
python3 scripts/write_city_content.py
python3 scripts/validate_batch.py
```

**Why this exists:** before 2026-09-18, `popularHomes` was hand-picked per
city (or copy-pasted from a similar city) with no rule behind it. The
result: 1 of 54 listings (`marathon-katy-3bed-2bath-single-wide`) appeared
on 39 of 44 pages (44 was the published count at that time — see
`lib/cities.ts` for the current number), and 36 of the 54 real listings never appeared on any
city page at all. Both numbers were arbitrary, not evidence of anything —
there's no per-city sales or inquiry data behind which homes are actually
popular where, so a literal "popularity" ranking was never real to begin
with.

**Selection rule:** least-used-listing-first rotation across all 54,
deterministic (same inputs always produce the same assignment — a
city-slug-seeded tiebreak keeps cities from converging on identical
triples when their usage counts happen to tie, which a naive least-used
sort does constantly). Each city's 3 picks are nudged toward including
both a single-wide-family and a double-wide-family listing — a reasonable
range to show, not a claim about that county's typical lot size or
household needs (no such per-city signal exists in the copy — seriously
considered and rejected; see below). One exception: **New Braunfels** is
hand-picked (smallest single wide → mid double wide → largest 4-bed double
wide) because its copy makes an explicit, literal range claim ("compact
single-section homes...to larger four-bedroom double wides") that the
selection should actually match.

**What was considered and rejected:** the original ask was "pages leaning
smaller budget/tighter lot get single wides, pages leaning more space get
double wides" — fit-based on what each city's own copy already says. On
inspection, that signal doesn't actually exist: every city that discusses
single-wide-vs-double-wide sizing at all (15 of the 44 cities then published;
see `lib/cities.ts` for the current count) presents it as a
*balanced*, household-dependent choice ("depends on your lot and your
family's needs"), never a lean specific to that city. The few cities that
looked like they leaned one way on a keyword scan ("smaller number,"
"lower price point") were all talking about manufactured-vs-site-built
cost comparison — a universal claim, not a per-city size signal — not
home square footage. Inventing a per-city lean where the copy doesn't
support one would be the same class of fabrication the "typical lot sizes"
idea was rejected for earlier (see the word-count discussion history) —
so the rotation is coverage- and range-based, honestly, rather than
fit-based where "fit" isn't real.

**Heading:** "Popular Homes to Consider" implied a popularity ranking the
site was never actually running. Renamed to **"Homes to Get You
Started"** — accurate to what the section does (a representative range to
look at, not a leaderboard) and echoes the "Getting Started" section
already on the page. `<h2>` text lives in
`components/CityPageContentV2.tsx`.

## Explainer pages — topics that don't belong in per-city FAQ rotation

As of batch 2 (2026-09-18), some FAQ topics were fundamentally the same
question on every page, just paraphrased — they aren't city-specific facts,
so hand-writing 40+ near-identical answers was both busywork and a
duplication-checker liability (see the batch-2 review: three topics
repeatedly collided across cities no matter how the sentences were
reworded). These now live on three standalone pages instead, and every
city page links to them from its FAQ section (a short "Want the fuller
picture?" link row, not a Q&A item):

- **`/manufactured-vs-mobile-home`** — the mobile-home-vs-manufactured-home
  legal definition (the June 1976 HUD Code cutoff). Never write this as a
  per-city FAQ again.
- **`/how-pricing-works`** — out-the-door home pricing (what's included,
  why the quoted price doesn't change) *and* the utility
  estimate-then-contractor-bid process. Never write a per-city FAQ asking
  whether the quoted price is final, what's included in the price, or how
  utility costs are determined — link here instead.
- **`/whats-included-in-setup`** — the full setup checklist
  (`lib/setupItems.ts` → `TURNKEY_ITEMS`), item by item. Never write a
  per-city FAQ asking what setup includes, whether Texas Homes Direct
  handles setup vs. just delivery, or whether setup costs can be financed —
  link here instead.

Each of these three pages is a real, complete page (own H1, body sections,
FAQPage/BreadcrumbList/WebPage+speakable JSON-LD, its own FAQ accordion) —
not a stub. If a topic needs updating (e.g. the setup item list changes
again), edit the shared source (`lib/setupItems.ts` for the two
checklists) and the relevant explainer page, not 40 city entries.

A city's FAQ can still ask about setup or pricing *from a genuinely
city-specific angle* that isn't just restating the shared topic — e.g.
Lockhart's "what paperwork do you handle" or La Grange's "what does the
on-site inspection check" are fine, because they're actually about that
city's process, not a rehash of the generic checklist. The line: would this
exact question and answer, with the city name swapped out, work verbatim
on any other city's page? If yes, it belongs on an explainer page, not in
`CITY_COPY`.

## Evidence rule — show, don't tell

When reporting that something works, **show the actual live output**, not a
description of it:
- Claiming a page renders correctly → `curl` the dev server and show the
  extracted HTML, or a screenshot.
- Claiming JSON-LD is correct → pretty-print the actual `<script
  type="application/ld+json">` block from page source.
- Claiming FAQ answers are server-rendered → `curl` the raw HTML (not a
  browser-executed fetch) and show the answer text is present in the
  response before any JS runs.
- Claiming the duplication checker passes → show its actual printed output
  and exit code, and — when it matters — prove it *can* fail by
  temporarily injecting a known duplicate and showing it gets caught, then
  reverting.
- Claiming no forbidden pattern exists (timelines, competitor names, THD,
  Spanish, etc.) → show the `grep` command and its output.
- Claiming a sitemap or redirect works → fetch it live and show the actual
  URLs / status codes.

Don't report a fix as "done" from memory of having written the code. Verify
against the running dev server or the generated file every time, even if
you're confident.

## SEO / GEO requirements for every city page

- **Primary keyword "mobile home"** in the title tag, H1, URL slug
  (`/mobile-homes-[slug]-tx`), and meta description; "manufactured home" as
  the secondary term used naturally in body copy.
- **County targeted alongside city** — every page names both the city and
  its county (in the H1 eyebrow, intro, and `LocalBusiness` schema).
- **Answer-first writing** for FAQ content: the first sentence of each
  answer directly answers the question; elaboration comes after.
- **Structured data on every city page** (all emitted by
  `CityPageContentV2.tsx` — component-level, so every page that uses it
  gets these automatically):
  - `FAQPage` — `mainEntity` array matching the visible FAQ exactly (3–5
    items per city as of batch 2 — see "Explainer pages" above for why the
    count varies and isn't fixed at 5/7 anymore).
  - `LocalBusiness` (page-level) — `areaServed` set to the city, with
    `containedInPlace` naming the county and state.
  - `BreadcrumbList` — Home → Cities → `[City], TX`, matching the visible
    breadcrumb nav rendered just above the H1.
  - `WebPage` — carries `dateModified` (from `CityContent.lastModified`,
    falls back to a hardcoded date if absent — keep that fallback current)
    and a `speakable.cssSelector` pointing at `.bmh-faq-speakable` (the FAQ
    section wrapper) for voice-search assistants.
  - `ImageObject` — one per hero/secondary image, with real alt text.
  - Site-wide (`app/layout.tsx`): `LocalBusiness` carries a `sameAs` array
    for entity disambiguation (AI tools have confused Texas Homes Direct
    with "Homes Direct Texas" and "Mobile Homes Direct 4 Less"). **Only put
    real, verified URLs in `sameAs`** — Google Business Profile, Facebook,
    directory listings. Never guess a plausible-looking URL. The array now
    holds the real Facebook page and Google Business Profile (Google Maps)
    URLs; add others only once they're verified.
- **FAQ answers must be server-rendered**, not injected by client JS on
  accordion open. `components/FaqAccordion.tsx` renders all answers into
  the DOM unconditionally; only CSS (`.bmh-faq-a { display: none }` /
  `.bmh-faq-item.bmh-is-open .bmh-faq-a { display: block }`) hides the
  collapsed ones. Don't change this to a conditional render.
- **Visible breadcrumbs** (Home / Cities / `[City], TX`) render just above
  the H1 on every city page, matching the `BreadcrumbList` schema above.
- **Internal links:** every city page links to 3–4 real, geographically
  accurate neighboring cities (as plain `<span>` if unpublished, as
  `<Link>` if published — never a dead link) plus a link back to `/cities`.
- **`/sitemap.xml` is generated from `publishedCities()`** in
  `app/sitemap.ts` — never hardcode a city list in the sitemap. Publishing
  a city is exactly: flip `published: true` in `lib/cities.ts`; the
  sitemap, the `/cities` hub, and internal "nearby" links all pick it up
  automatically.
- **Word count target: 850–950 words** of real substance per page (intro +
  buying + pricingExplainer + gettingStarted + localProof + FAQ + nav/CTA
  chrome, measured on the full rendered DOM including the collapsed FAQ
  answers — they're server-rendered, see above, so they count). Thin pages
  underperform; comprehensive pages that answer every decision-making
  question do
  better. Don't pad — if a page is short, that means it's missing a real
  section or FAQ, not that existing sentences need padding.
- **Page speed:** hero/secondary images are served via
  `next/image`, but `next.config.mjs` sets `images.unoptimized: true`
  (Vercel's Image Optimization API is metered and the account hit its
  quota — see the comment in that file). That means **there is no
  request-time resizing or compression** — whatever's in `public/homes/`
  ships as-is. Consequences:
  - Never reference a source image over ~800KB for a hero/secondary slot.
    Check with `du -h` before wiring up a new image.
  - Photographic images belong in JPEG, not PNG — PNG is lossless and runs
    3–5× larger for the same photo. On 2026-09-10 six oversized PNGs used
    across many city pages (`the-gadwall`, `the-javelina`, `the-mesquite`,
    `the-pearland`, `the-terra`, `the-wood-duck`) were converted to JPEG
    (quality 82), cutting 13.8MB combined down to ~3.6MB, and two more
    (`the-katy/Katy-Hero.png` at 2640px wide, `the-spoonbill/Spoonbill-
    Hero.png` at 2522px wide) were downsampled to 1600px width. If you add
    a new image, convert/resize it *before* wiring it into `CITY_COPY` —
    `sips -s format jpeg -s formatOptions 82 in.png --out out.jpg` and
    `sips --resampleWidth 1600 file.png` both work from the CLI with no
    extra tooling. Renaming a file that's already referenced elsewhere
    (check with `grep -rn <filename>` first) means updating every
    reference, not just the one you're adding.
  - Target first contentful paint under ~1.1s; pages that clear that get
    roughly 3× more AI-assistant citations than slower ones.

## Hero and secondary images — one unique pair per city page

No two city pages may share the same hero + secondary image pair.
`validate_batch.py` step 6 enforces it (ordered pair, so `(A, B)` and
`(B, A)` count as different). The same photo pair repeated across many pages
is a duplicate-content signal Google can see: when Hondo's pair turned out to
be identical to Cuero's, Caldwell's and Harker Heights's, it was one more
reason those pages were being clustered as duplicates.

There are 18 usable images, which gives 18 × 17 = 306 possible ordered pairs
— comfortably more than the 104 pages (well over 3× headroom), so uniqueness
is always achievable. If the page count ever approaches ~306, more images are
needed, not repeats. To assign pairs for new cities, build
`all_pairs = [(a, b) for a in IMAGES for b in IMAGES if a != b]` and take
unused pairs from it; uniqueness then holds by construction.

## Home listings — syncing from Notion

**Production serves `lib/sampleListings.ts`, not Notion.** Vercel has no
`NOTION_TOKEN`, so `lib/notion.ts` falls back to the static file. A Notion edit
(name, photos, 3D tour) only reaches the live site once that file is
regenerated, committed and deployed. To regenerate it:

```
npm run sync:listings -- --dry-run   # show what would change, write nothing
npm run sync:listings                # apply, then run the image-path validator
```

`scripts/sync-listings.ts` reads `NOTION_TOKEN` from `.env.local` and never
prints it. Per listing it updates the name (`title`), `beds`/`baths`/`sqft`/
`wideType`/`model`, `matterportUrl` (from "3D Tour URL"; blank or "NONE"
removes the tour) and `images`. It also renames the old name where it appears
in the description. **It never touches `slug`** (the page URL) or price,
features, status or `floorplanUrl`. A blank Notion field never wipes a code
value. Run it twice: the second dry run should report no listing changes. If
it doesn't, something isn't idempotent.

- **Matching is by `notionId`**, stored on each listing. Fleetwood pages have
  no Slug in Notion and their Notion names differ from the old site names, so
  slug or title matching can't work for them. The 13 Fleetwood listings were
  matched once by model + beds/baths/sq ft on 2026-10-09. Notion pages with no
  site listing (e.g. "28483u", "Pathfinder") are reported, never auto-added. A
  new listing needs a slug chosen by hand first.
- **Images:** the Notion page body's image blocks are the source. Photos
  already on the site keep their existing files and order.
  `scripts/sync-listings.image-map.json` maps Notion block IDs to those files,
  so nothing is re-downloaded or renamed. New photos download into the folder
  the listing already uses as `<blockId>.<ext>`. Anything over 800KB is
  converted with `sips` to JPEG q82, max 1600px wide. Photos removed from
  Notion drop out of the gallery, but the file stays on disk. A listing whose
  Notion page has no photos keeps its images.
- **`IMAGE_LOCK`** (in the script) skips photo sync for:
  - **Katy/Forney:** Notion only has floorplans for it.
  - **Wood Duck, Coleman, Daniel and Chapman:** as of 2026-10-09 Notion and the
    site disagree on which photo set belongs to which model. Notion has the
    Wood Duck and Coleman sets swapped relative to the site, and Notion's
    Daniel page mixes two different homes.

  Remove those four entries once the owner confirms Notion is right.
  `PINNED_IMAGES` keeps three site-only hero exteriors (Gadwall, Spoonbill,
  Terra) that aren't in Notion.
- **Marathon-only vs Fleetwood:** `scripts/sync-notion-images.ts` (the older
  `npm run sync:images`) still says Texas Homes Direct only sells Marathon and
  skips Fleetwood, but 13 Fleetwood listings are live. `sync:listings` syncs
  both. Also note that if `NOTION_TOKEN` were ever added to production,
  `lib/notion.ts` would drop every Fleetwood page, because it filters out pages
  with no Slug. Don't add the token to Vercel without fixing that first.

After a sync, re-run `python3 scripts/validate_batch.py` before committing. The
listing names feed the city pages' "Homes to Get You Started" cards.

## Analytics

Google Analytics 4 (`G-TEY2WEP5QP`) is installed **once**, in
`app/layout.tsx`, via `<GoogleAnalytics gaId="..." />` from
`@next/third-parties/google`. Never add a second GA/gtag tag — not per page,
not as a raw `<script>` snippet, not through another component — duplicate
tags double-count pageviews. The official component is used instead of the
raw snippet specifically because the App Router navigates client-side and a
plain gtag snippet misses those pageviews; the component fires a `page_view`
on each route change. It loads via an `afterInteractive` script, so it
doesn't block rendering. Verified live on 2026-10-06: a `page_view` hit to
`google-analytics.com/g/collect` on initial load and another on client-side
navigation to `/browse`, with exactly one `gtag/js` tag on the page.

## Deploys and infrastructure

- **Deploy = push to `main`.** The repo is connected to Vercel, which
  auto-deploys every push to `main` to production. There is no separate
  deploy command. Per the batch workflow, still only push on fresh,
  explicit instruction.
- **Deploy time varies from about 20 seconds to several minutes** (it has
  occasionally run longer). Don't conclude a deploy failed because the
  first check shows the old version — poll the live URL for something that
  changed (e.g. a loop with a 20s sleep) until it appears.
- **The apex-to-www redirect is a Vercel dashboard setting, not repo
  code.** `texashomesdirect.com` → `www.texashomesdirect.com` (and the
  http→https upgrade) are handled by Vercel's domain configuration, not
  `next.config.mjs`. Search Console showed homepage impressions split
  across `http://texashomesdirect.com/` and `https://www.texashomesdirect.com/`
  because of how that chain behaves. **Don't try to fix this in the
  repo** — a code-level redirect wouldn't apply to it. Its current status
  is for the owner to confirm in the Vercel dashboard.

## Shell gotchas (this environment)

- **There is no `timeout` command** (macOS doesn't ship GNU `timeout`). For
  a bounded wait, use a `for` loop with `sleep`, or the Bash tool's own
  `timeout` parameter.
- **The shell is zsh, not bash.** Differences that have bitten real
  commands here: an unmatched glob (e.g. `grep --include=*.ts`) is a hard
  error in zsh ("no matches found") instead of passing the literal through
  — quote globs; `declare -A` associative arrays and some `${...}`
  expansions behave differently or fail with "bad substitution"; and an
  array-in-a-loop pattern once caused commands like `curl` to report "command
  not found". When in doubt, avoid arrays — use plain separate commands, a
  `while read` loop, or write a small Python script instead.

## Known repo history worth knowing

- `app/locations/[city]/*` (an older, separate city-page system with
  fabricated county-regulation and market-ranking claims) was deleted and
  301-redirected (via `next.config.mjs` → `permanent: true`, which Next
  emits as 308, equivalent for SEO purposes) to the corresponding
  `/mobile-homes-[slug]-tx` pages. Don't recreate anything under
  `/locations`.
- `lib/blogPosts.ts` had the same class of issues (invented county lists,
  a real bill number — SB 785 — misattributed to the wrong law). If you
  touch blog content, apply the same hard rules above.
- `app/api/chat/route.ts` (the AI sales chatbot) previously instructed the
  model to fabricate a competitor price comparison and county-inventory
  scarcity claims. That's fixed; if this file is touched again, the same
  hard rules apply to its system prompt.
