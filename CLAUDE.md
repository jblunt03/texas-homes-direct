# Texas Homes Direct — Working Notes

This file governs how Claude Code should work in this repo, specifically for
the "Cities We Serve" SEO city-page system (`/cities` hub +
`/mobile-homes-[slug]-tx` pages). Read this before touching anything under
`lib/cityContent.ts`, `lib/cities.ts`, `scripts/write_city_content.py`,
`scripts/check_duplication.py`, or `components/CityPageContentV2.tsx`.

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
    (optional field — only the batch-1 15 cities have it as of 2026-09-10;
    the original 16 still need this pass). The component renders the
    "Your Price, Explained" section only when this field is present.
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
   hero/secondary image paths + alt text, nearby real (geographically
   accurate) neighbor slugs, and 3 popular-home slugs from
   `lib/sampleListings.ts`.
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
   checker can't catch (it only compares a field against the *same* field
   on *other* cities, not against *other fields on the same page*). Fixed
   by checking `gettingStarted` against that city's own `intro`/`buying`
   text directly — a quick 6-gram shingle comparison, not part of
   `check_duplication.py` but worth running by hand (or scripting again)
   any time this field is edited. The fix itself: reorient toward the
   *mechanics* of starting (what determines the next step — land status,
   lot size, what the first call actually covers) rather than restating
   *why* the city's differentiator matters, which the intro/buying section
   already covers.
   **Audit concepts, not just wording, before moving on** — read all the
   new intros (or whichever field you just wrote) back to back and check
   each one leads on a genuinely different idea (cost, turnkey setup,
   permitting handled, financing flexibility, no-pressure, land you already
   own, single vs. double wide, what's included, HUD quality, verifiable
   pricing, monthly payment, credit-approval accessibility, delivery
   coverage, brand values, etc.). The duplication checker only measures
   word overlap — two intros can pass it and still open on the same idea
   in different words, which reads as the same page twice to a human.
   Rewrite until no two pages in the batch share a lead concept.
4. **Generate:** `python3 scripts/write_city_content.py` — regenerates
   `lib/cityContent.ts`.
5. **Duplication check:** `python3 scripts/check_duplication.py` — compares
   every published city's intro/buying/localProof/FAQ text against every
   *other* published city (not just neighbors), after masking out city/
   county names, using word-8-gram Jaccard similarity. Non-zero exit code
   and a printed report if anything is too close (default threshold 0.25).
   **Fix flagged text by rewriting one side with genuinely different
   sentence structure — never by lowering the threshold.**
6. **Type-check:** `npx tsc --noEmit`.
7. **Review with the user.** Show real output, not a description of it (see
   next section). Flip `published: true` in `lib/cities.ts` only for cities
   the user has approved.
8. **Regenerate and re-check** (`write_city_content.py` then
   `check_duplication.py`) since flipping `published` changes which pages
   the checker compares.
9. **Do not commit or deploy without explicit, fresh instruction** — this
   holds every session, not just once.

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
    directory listings. Never guess a plausible-looking URL. As of
    2026-09-10 this array is empty pending those URLs from the user.
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
