#!/usr/bin/env python3
"""
One-command, end-to-end batch validator for the "Cities We Serve" system.

    python3 scripts/validate_batch.py
    python3 scripts/validate_batch.py --all   # also check unpublished, authored cities

By default, steps 9-11 (word count, schema, no-localhost) only check
currently *published* pages — a new batch isn't published yet, so its
pages would just 404 and those checks would silently skip them. Pass
--all to check every city that has a CITY_COPY entry, published or not —
this is what you want while reviewing a new batch before publish. It
works by temporarily flipping every authored-but-unpublished city to
published:true in lib/cities.ts for the duration of the dev-server
checks, then restoring the file exactly (even on failure/exception) —
the batch is never left actually published just because you validated
it; that still requires a separate, explicit step.

Runs every check CLAUDE.md's batch workflow requires, in order, and stops
at the first hard failure (each step's output tells you exactly what to
fix and how to re-run just that step while iterating). A clean run means
the batch is publishable — flip `published: true` for the cities you
approved and follow the rest of the batch workflow (commit/deploy only on
fresh, explicit instruction, per CLAUDE.md).

Steps:
  1. Generate       — scripts/write_city_content.py (regenerates lib/cityContent.ts)
  2. Cross-city dup  — scripts/check_duplication.py (a field vs. the same field, other cities)
  3. Within-page dup — scripts/check_redundancy.py (a field vs. other fields, same city)
  4. Hard-rule sweep — grep for timelines, THD, competitor names, Spanish, false-precision
                        utility claims, land-sale language (see CLAUDE.md's hard rules)
  5. Image paths     — every /homes/... path in lib/cityContent.ts and
                        lib/sampleListings.ts resolves to a real file under public/.
                        Static check, no dev server needed. Added after batch 4 shipped
                        35 pages with a broken image path (missing /homes/ prefix) that
                        nothing caught before publish.
  6. Unique images   — no two cities share the same (heroImage, secondaryImage) pair in
                        lib/cityContent.ts. Identical image pairs across pages are one of
                        the signals Google can use to cluster near-duplicate pages.
  7. Type-check      — npx tsc --noEmit
  8. Dev server up   — starts `next dev` on a scratch port, polls until ready
  9. Word count      — every published city page, flagged against the 850-950 target
 10. Required schema — every published city page + the 3 explainer pages: FAQPage,
                        BreadcrumbList, WebPage+speakable, and (city pages only)
                        LocalBusiness + ImageObject all present
 11. No localhost    — no JSON-LD url/@id, canonical link, or OG url pointing at
                        localhost/127.0.0.1 on any page (a real, if rare, way for a
                        dev-only value to leak into what looks like production-ready
                        content)
 12. Dev server down — always torn down, even on failure

Exit code 0 only if every step passes. Anything else means: do not publish
this batch yet.
"""
import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PORT = 3099
BASE = f"http://localhost:{PORT}"
WORD_COUNT_TARGET = (850, 950)
WORD_COUNT_HARD_MIN = 600  # below this, something is badly broken, not just short

EXPLAINER_PAGES = [
    "manufactured-vs-mobile-home",
    "how-pricing-works",
    "whats-included-in-setup",
    # Not explainers, but they carry the same required schema
    # (BreadcrumbList, FAQPage, WebPage + speakable) and are checked the same way.
    "testimonials",
    "tiny-homes",
]

# Rating markup is never allowed anywhere (the Google reviews widget is a
# third-party embed; its stars must not become our structured data), and the
# reviews page must not carry hard-coded review stats. See CLAUDE.md
# "Reviews page".
FORBIDDEN_SCHEMA_TYPES = {"Review", "AggregateRating", "Rating"}
REVIEWS_PAGE_FORBIDDEN_TEXT = re.compile(r"\b4\.9\b|\b487\b|1,200|verified buyer", re.I)

results = []  # (step_name, ok, detail_lines)


def report(step_name, ok, detail_lines=None):
    results.append((step_name, ok, detail_lines or []))
    status = "PASS" if ok else "FAIL"
    print(f"\n{'=' * 76}\n[{status}] {step_name}\n{'=' * 76}")
    for line in detail_lines or []:
        print(line)
    return ok


def run(cmd, **kwargs):
    return subprocess.run(cmd, cwd=REPO_ROOT, capture_output=True, text=True, **kwargs)


def step_generate():
    p = run(["python3", "scripts/write_city_content.py"])
    ok = p.returncode == 0 and "Wrote lib/cityContent.ts" in p.stdout
    return report("1. Generate (write_city_content.py)", ok, [p.stdout.strip(), p.stderr.strip()])


def step_cross_city_duplication():
    p = run(["python3", "scripts/check_duplication.py"])
    ok = p.returncode == 0
    return report("2. Cross-city duplication (check_duplication.py)", ok, [p.stdout.strip()])


def step_within_page_redundancy():
    p = run(["python3", "scripts/check_redundancy.py"])
    ok = p.returncode == 0
    return report("3. Within-page redundancy (check_redundancy.py)", ok, [p.stdout.strip()])


def step_hard_rules():
    src = (REPO_ROOT / "scripts" / "write_city_content.py").read_text()
    # Strip line comments and the module docstring so rule *descriptions*
    # (e.g. this file's own header explaining "never say a utility number
    # is known upfront") don't self-flag. The docstring is the first
    # triple-quoted block in the file — strip it, not every line starting
    # with whitespace, since a Python docstring's body lines don't start
    # with "#" or "*" the way the header's bulleted prose does.
    src_no_shebang = re.sub(r"^#!.*\n", "", src, count=1)
    src_no_docstring = re.sub(r'^""".*?"""\n', "", src_no_shebang, count=1, flags=re.DOTALL)
    # Also strip Python "#" comments and " * "-style JSDoc continuation
    # lines — the latter appear inside a Python string literal further
    # down (the block this script writes as lib/cityContent.ts's own
    # header comment), which repeats several hard-rule descriptions.
    code_lines = [
        line for line in src_no_docstring.splitlines() if not re.match(r"^\s*#|^\s*\*", line)
    ]
    code = "\n".join(code_lines)

    checks = [
        ("THD abbreviation", re.compile(r"\bTHD\b")),
        (
            "delivery timeline / turnaround claim",
            re.compile(r"within \d+ (days|weeks)|typically (a|takes)|few weeks|short(er)? timeline", re.I),
        ),
        (
            "named competitor",
            re.compile(r"south texas home center|best mobile homes|hill country manufactured|clayton homes", re.I),
        ),
        ("Spanish-language content", re.compile(r"[áéíóúñÁÉÍÓÚÑ]")),
    ]

    problems = []
    for label, pattern in checks:
        m = pattern.search(code)
        if m:
            line_no = code[: m.start()].count("\n") + 1
            problems.append(f"  {label}: matched {m.group(0)!r} near line {line_no}")

    # Utility-upfront false-precision claim: flag "utility ... upfront/from
    # the start/from day one" ONLY when the surrounding clause doesn't also
    # negate it. Almost every real hit in this corpus is the honest idiom
    # "we're upfront that utility costs CAN'T be known upfront" — a plain
    # proximity match on "utility" + "upfront" flags that too, so a
    # negation word in the same clause is required to clear the match
    # (a real violation asserts the number positively, with no negation).
    negation = r"can't|cannot|can not|won't|isn't|aren't|never|not\b|no way to|nothing.{0,20}exact"
    utility_upfront = re.compile(
        r"[^.]*\butilit[a-z]*\b[^.]{0,80}\b(upfront|from the start|from day one)\b[^.]*", re.I
    )
    for m in utility_upfront.finditer(code):
        clause = m.group(0)
        if not re.search(negation, clause, re.I):
            line_no = code[: m.start()].count("\n") + 1
            problems.append(
                f"  utility cost claimed upfront (no negation found in clause) near line {line_no}: {clause.strip()[:150]!r}"
            )

    ok = not problems
    detail = problems if problems else ["No hard-rule violations found in scripts/write_city_content.py."]
    return report("4. Hard-rule sweep", ok, detail)


# Any local image path found in these two generated/source files must
# resolve to a real file under public/. Added 2026-09-29 after batch 4
# shipped 35 city pages with a secondary-image path missing its /homes/
# prefix (a splice-script bug) -- every one of those images 404'd in
# production and nothing caught it before publish.
#
# Deliberately does NOT anchor on a literal "/homes/" prefix -- an earlier
# version of this check did, which meant it silently ignored exactly the
# malformed path it exists to catch (a path missing that prefix doesn't
# match a pattern requiring that prefix). Verified by re-injecting the
# batch-4 bug against each regex version before settling on this one: the
# /homes/-anchored version reported PASS on the known-broken input; this
# broader one (any leading "/", not specifically "/homes/") correctly
# fails on it. Matches on a leading "/" alone, so it also catches a path
# broken in some other way that still isn't "/homes/...". This is a static
# check (no dev server needed), so it runs early and fails fast.
IMAGE_PATH_RE = re.compile(r"['\"](/[^'\"]+\.(?:jpe?g|png|webp))['\"]", re.I)


def step_image_paths():
    sources = {
        "lib/cityContent.ts": REPO_ROOT / "lib" / "cityContent.ts",
        "lib/sampleListings.ts": REPO_ROOT / "lib" / "sampleListings.ts",
    }
    problems = []
    checked = 0
    seen = set()
    for label, path in sources.items():
        text = path.read_text()
        for m in IMAGE_PATH_RE.finditer(text):
            img_path = m.group(1)
            if img_path in seen:
                continue
            seen.add(img_path)
            checked += 1
            on_disk = REPO_ROOT / "public" / img_path.lstrip("/")
            if not on_disk.is_file():
                line_no = text[: m.start()].count("\n") + 1
                problems.append(f"  {label}:{line_no}: {img_path} -- no file at public{img_path}")

    ok = not problems
    detail = [f"Checked {checked} distinct image path(s) across {len(sources)} file(s)."]
    if problems:
        detail.append(f"\n{len(problems)} path(s) don't resolve to a real file:")
        detail.extend(problems)
    else:
        detail.append("All image paths resolve to real files.")
    return report("5. Image paths resolve to real files", ok, detail)


CITY_BLOCK_RE = re.compile(r"\n  (?:'([a-z-]+)'|\"([a-z-]+)\"|([a-z-]+)): \{\n")
HERO_RE = re.compile(r"heroImage:\s*['\"]([^'\"]+)['\"]")
SECONDARY_RE = re.compile(r"secondaryImage:\s*['\"]([^'\"]+)['\"]")


def step_unique_image_pairs():
    text = (REPO_ROOT / "lib" / "cityContent.ts").read_text()
    matches = list(CITY_BLOCK_RE.finditer(text))
    by_pair = {}
    parsed = 0
    for i, m in enumerate(matches):
        slug = m.group(1) or m.group(2) or m.group(3)
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        block = text[m.end():end]
        hero = HERO_RE.search(block)
        sec = SECONDARY_RE.search(block)
        if not (hero and sec):
            continue
        parsed += 1
        by_pair.setdefault((hero.group(1), sec.group(1)), []).append(slug)
    shared = {pair: slugs for pair, slugs in by_pair.items() if len(slugs) > 1}
    ok = parsed > 0 and not shared
    detail = [f"Parsed hero+secondary image pairs for {parsed} cities in lib/cityContent.ts."]
    if parsed == 0:
        detail.append("Parsed ZERO cities — the block/field regexes no longer match the file's format; fix this check.")
    elif shared:
        detail.append(f"\n{len(shared)} image pair(s) used by more than one city:")
        for (hero, sec), slugs in shared.items():
            detail.append(f"  hero={hero}  secondary={sec}")
            detail.append(f"    shared by: {', '.join(slugs)}")
    else:
        detail.append("Every city has its own distinct (hero, secondary) pair.")
    return report("6. Unique hero+secondary image pairs", ok, detail)


def step_tsc():
    p = run(["npx", "tsc", "--noEmit"])
    ok = p.returncode == 0
    detail = [p.stdout.strip()] if ok else [p.stdout.strip(), p.stderr.strip()]
    return report("7. Type-check (tsc --noEmit)", ok, detail)


def start_dev_server():
    proc = subprocess.Popen(
        ["npx", "next", "dev", "-p", str(PORT)],
        cwd=REPO_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    deadline = time.time() + 60
    while time.time() < deadline:
        try:
            urllib.request.urlopen(BASE, timeout=2)
            return proc, True, None
        except Exception:
            if proc.poll() is not None:
                out = proc.stdout.read() if proc.stdout else ""
                return proc, False, f"Dev server exited early:\n{out[-2000:]}"
            time.sleep(1)
    return proc, False, "Dev server did not become ready within 60s."


def stop_dev_server(proc):
    if proc is None:
        return
    proc.terminate()
    try:
        proc.wait(timeout=10)
    except subprocess.TimeoutExpired:
        proc.kill()


def fetch(path):
    with urllib.request.urlopen(f"{BASE}{path}", timeout=15) as resp:
        return resp.status, resp.read().decode("utf-8")


def published_city_slugs():
    src = (REPO_ROOT / "lib" / "cities.ts").read_text()
    entries = re.findall(
        r"city\(\s*'([^']+)'\s*,\s*'[^']+'\s*(?:,\s*(true|false))?\s*\)",
        src,
    )
    slugs = []
    for name, published in entries:
        if published == "true":
            slugs.append(slugify(name))
    return slugs


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


class TemporaryPublishAllAuthored:
    """Context manager for --all: flips every city that has a CITY_COPY
    entry to published:true in lib/cities.ts for the duration of the
    dev-server checks (so unpublished, not-yet-approved batches can still
    be schema/word-count checked before publish), then ALWAYS restores the
    original file — even on an exception — so a batch review never
    accidentally leaves cities live that the user hasn't approved."""

    def __init__(self):
        self.path = REPO_ROOT / "lib" / "cities.ts"
        self.original = None

    def __enter__(self):
        self.original = self.path.read_text()
        sys.path.insert(0, str(REPO_ROOT / "scripts"))
        from write_city_content import CITY_COPY  # noqa: E402

        authored_names = set()
        for m in re.finditer(r"city\(\s*'([^']+)'", self.original):
            if slugify(m.group(1)) in CITY_COPY:
                authored_names.add(m.group(1))

        def flip(match):
            name = match.group(1)
            if name not in authored_names:
                return match.group(0)
            # Rewrite to the 3-arg form with published:true, whatever the
            # original arity was (2-arg calls default to published:false).
            return f"city('{name}', {match.group(2)}, true)"

        modified = re.sub(
            r"city\(\s*'([^']+)'\s*,\s*('[^']+')\s*(?:,\s*(?:true|false)\s*)?\)",
            flip,
            self.original,
        )
        self.path.write_text(modified)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.path.write_text(self.original)
        return False


def extract_word_count(html):
    m = re.search(r"<main[^>]*>(.*)</main>", html, re.DOTALL)
    content = m.group(1) if m else html
    content = re.sub(r"<script[^>]*>.*?</script>", " ", content, flags=re.DOTALL)
    content = re.sub(r"<style[^>]*>.*?</style>", " ", content, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", content)
    text = re.sub(r"&[a-z]+;|&#\d+;", " ", text)
    return len(text.split())


def step_word_count(city_slugs):
    lo, hi = WORD_COUNT_TARGET
    below_hard_min = []
    outside_target = []
    ok_count = 0
    for slug in city_slugs:
        try:
            status, html = fetch(f"/mobile-homes-{slug}-tx")
        except Exception as e:
            below_hard_min.append(f"  {slug}: request failed ({e})")
            continue
        count = extract_word_count(html)
        if count < WORD_COUNT_HARD_MIN:
            below_hard_min.append(f"  {slug}: {count} words (below hard minimum {WORD_COUNT_HARD_MIN})")
        elif not (lo <= count <= hi):
            outside_target.append(f"  {slug}: {count} words (target {lo}-{hi})")
        else:
            ok_count += 1

    ok = not below_hard_min  # outside soft target is a warning, not a hard failure
    detail = [f"{ok_count}/{len(city_slugs)} pages within the {lo}-{hi} word target."]
    if outside_target:
        detail.append(f"\n{len(outside_target)} page(s) outside the target (warning, not blocking):")
        detail.extend(outside_target)
    if below_hard_min:
        detail.append(f"\n{len(below_hard_min)} page(s) below the hard minimum ({WORD_COUNT_HARD_MIN} words) — blocking:")
        detail.extend(below_hard_min)
    return report("9. Word count", ok, detail)


CITY_REQUIRED_TYPES = {"FAQPage", "BreadcrumbList", "WebPage", "LocalBusiness", "ImageObject"}
EXPLAINER_REQUIRED_TYPES = {"FAQPage", "BreadcrumbList", "WebPage"}


def extract_jsonld_types_and_urls(html):
    blocks = re.findall(
        r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL
    )
    types = set()
    urls = []
    speakable_ok = False
    for b in blocks:
        try:
            obj = json.loads(b)
        except json.JSONDecodeError:
            continue
        t = obj.get("@type")
        if isinstance(t, str):
            types.add(t)
        elif isinstance(t, list):
            types.update(x for x in t if isinstance(x, str))
        # Nested rating markup (e.g. aggregateRating inside a Product) counts too.
        for nested in re.findall(r'"@type":\s*"([A-Za-z]+)"', b):
            types.add(nested)
        for key in ("url", "@id"):
            if key in obj and isinstance(obj[key], str):
                urls.append(obj[key])
        if t == "WebPage" and isinstance(obj.get("speakable"), dict):
            sel = obj["speakable"].get("cssSelector", [])
            if any("bmh-faq-speakable" in s for s in sel):
                speakable_ok = True
    return types, urls, speakable_ok


def step_schema_and_localhost(city_slugs):
    problems = []
    checked = 0

    for slug, path, required in (
        [(s, f"/mobile-homes-{s}-tx", CITY_REQUIRED_TYPES) for s in city_slugs]
        + [(s, f"/{s}", EXPLAINER_REQUIRED_TYPES) for s in EXPLAINER_PAGES]
    ):
        try:
            status, html = fetch(path)
        except Exception as e:
            problems.append(f"  {path}: request failed ({e})")
            continue
        checked += 1
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue

        types, urls, speakable_ok = extract_jsonld_types_and_urls(html)
        missing = required - types
        if missing:
            problems.append(f"  {path}: missing schema type(s) {sorted(missing)}")
        rating = types & FORBIDDEN_SCHEMA_TYPES
        if rating:
            problems.append(f"  {path}: rating markup not allowed: {sorted(rating)}")
        if path == "/testimonials":
            visible = re.sub(r"<script.*?</script>|<[^>]+>", " ", html, flags=re.S)
            m = REVIEWS_PAGE_FORBIDDEN_TEXT.search(visible)
            if m:
                problems.append(f"  {path}: hard-coded review stat on page: {m.group(0)!r}")
        if not speakable_ok:
            problems.append(f"  {path}: WebPage speakable.cssSelector missing .bmh-faq-speakable")

        for u in urls:
            if "localhost" in u or "127.0.0.1" in u:
                problems.append(f"  {path}: JSON-LD url/@id points at localhost: {u!r}")

        # canonical + OG url checks (plain string search is enough here —
        # these aren't JSON, just <link>/<meta> tags in <head>).
        if re.search(r'rel="canonical"[^>]*href="[^"]*localhost', html) or re.search(
            r'href="[^"]*localhost[^"]*"[^>]*rel="canonical"', html
        ):
            problems.append(f"  {path}: canonical link points at localhost")
        if re.search(r'property="og:url"[^>]*content="[^"]*localhost', html):
            problems.append(f"  {path}: og:url meta tag points at localhost")

    ok = not problems
    detail = [f"Checked {checked} page(s) (city pages + explainer pages)."]
    if problems:
        detail.append("")
        detail.extend(problems)
    else:
        detail.append("All required schema present; no localhost leaks found.")
    return report("10-11. Required schema + no localhost", ok, detail)


# ─── Estimated-payment disclosure (see CLAUDE.md "Estimated payment disclosure")
# Every "$N/mo" a page renders must sit inside components/PaymentEstimate.tsx's
# wrapper (<span class="bmh-pay" data-pay>), which carries the "est." label and
# the info <button>. Budget-filter <option>s ("$750–$1,000/mo") are search
# ranges, not a home's payment, so <select> blocks are stripped first.
PAY_BLOCK_RE = re.compile(r'<span class="bmh-pay[^"]*" data-pay="">(.*?)</button></span>', re.S)
PAY_AMOUNT_RE = re.compile(r"\$[\d,]+\s*(?:<[^>]*>\s*)*/mo\b")
PAY_INFO_LABEL = 'aria-label="About this estimated payment"'
DISCLOSURE_SOURCE = REPO_ROOT / "lib" / "disclaimers.ts"


def disclosure_sentences():
    """The disclosure body's sentences, read from lib/disclaimers.ts itself
    (so this script never holds its own copy of the text)."""
    src = DISCLOSURE_SOURCE.read_text()
    m = re.search(r"body:\s*'((?:[^'\\]|\\.)*)'", src, re.S)
    if not m:
        return []
    return [x.strip() for x in re.split(r"(?<=\.)\s+", m.group(1)) if len(x.split()) >= 6]


def step_payment_disclosure_source():
    problems = []
    sentences = disclosure_sentences()
    if not sentences:
        problems.append("  Could not read PAYMENT_DISCLOSURE.body from lib/disclaimers.ts")
    for folder in ("app", "components", "lib", "public", "scripts"):
        for path in (REPO_ROOT / folder).rglob("*"):
            if not path.is_file() or path == DISCLOSURE_SOURCE or path.suffix not in {
                ".ts", ".tsx", ".js", ".mjs", ".py", ".txt", ".md", ".json", ".html"
            }:
                continue
            try:
                text = path.read_text()
            except UnicodeDecodeError:
                continue
            for sent in sentences:
                if sent[:60] in text:
                    problems.append(f"  {path.relative_to(REPO_ROOT)}: contains disclosure text — import it from lib/disclaimers.ts instead")
                    break
    ok = not problems
    detail = problems or [f"Disclosure text ({len(sentences)} sentences) appears only in lib/disclaimers.ts."]
    return report("4b. Payment disclosure has one source", ok, detail)


def listing_slugs():
    src = (REPO_ROOT / "lib" / "sampleListings.ts").read_text()
    return re.findall(r"\n    slug: '([^']+)'", src)


def step_payment_disclosure_rendered(city_slugs):
    pages = ["/", "/browse", "/tiny-homes", "/calculator"]
    pages += [f"/homes/{s}" for s in listing_slugs()]
    pages += [f"/mobile-homes-{s}-tx" for s in city_slugs]
    problems = []
    wrapped_total = 0
    for path in pages:
        try:
            status, html = fetch(path)
        except Exception as e:
            problems.append(f"  {path}: request failed ({e})")
            continue
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        body = re.sub(r"<script.*?</script>|<select.*?</select>|<!-- -->", "", html, flags=re.S)
        for m in PAY_BLOCK_RE.finditer(body):
            block = m.group(1)
            wrapped_total += 1
            if ">est.<" not in block or PAY_INFO_LABEL not in block or 'type="button"' not in block:
                problems.append(f"  {path}: payment wrapper missing 'est.' or the info button")
            # Cash price is the default view (CLAUDE.md "Cash price"): every
            # payment must sit inside a payment-only container (data-pm="pay"),
            # which CSS hides until the visitor picks "Est. monthly payment".
            before = body[max(0, m.start() - 400):m.start()]
            if 'data-pm="pay"' not in before:
                problems.append(f"  {path}: payment shown outside the payment-only container (cash is the default view)")
        bare = PAY_AMOUNT_RE.findall(PAY_BLOCK_RE.sub("", body))
        for amt in bare:
            problems.append(f"  {path}: payment {re.sub('<[^>]*>', '', amt)!r} rendered without 'est.' and the info button")
    if wrapped_total == 0:
        problems.append("  Found zero wrapped payments on any page — the check's patterns no longer match the markup.")
    ok = not problems
    detail = problems[:40] or [f"{wrapped_total} payment figures across {len(pages)} pages, every one with 'est.' and the info button."]
    return report("11b. Every payment shows 'est.' + info button", ok, detail)


# ─── Cash price (CLAUDE.md "Cash price") ────────────────────────────────
# Every listing has a cash price; the default view everywhere is that price.
# "Call for price"-style text means a card fell back to the old display.
NO_PRICE_TEXT = ("Call for price", "Contact for pricing", "Call us for purchase price")
CASH_BLOCK_RE = re.compile(r'<span class="bmh-price-mode bmh-pm-cash(?:-fixed)?" data-pm="cash">(.*?)</span></span>', re.S)
PRICE_CARD_RE = re.compile(r'<span class="bmh-price bmh-price-(?:card|detail)">')


def step_listing_prices_static():
    src = (REPO_ROOT / "lib" / "sampleListings.ts").read_text()
    problems = []
    for blk in re.split(r"\n  \{\n", src)[1:]:
        title = re.search(r"\n    title: '([^']+)'", "\n" + blk)
        if not title:
            continue
        price = re.search(r"\n    price: (\d+),", "\n" + blk)
        if not price or int(price.group(1)) <= 0:
            problems.append(f"  {title.group(1)}: no cash price (price must be > 0)")
    n = len(re.findall(r"\n    title: '", src))
    ok = not problems and n > 0
    return report("4g. Every listing has a cash price", ok, problems or [f"{n} listings, every one with a cash price."])


def step_cash_price_rendered(city_slugs):
    pages = ["/", "/browse", "/tiny-homes"] + [f"/homes/{s}" for s in listing_slugs()]
    pages += [f"/mobile-homes-{s}-tx" for s in city_slugs]
    problems, cards = [], 0
    for path in pages:
        try:
            status, html = fetch(path)
        except Exception as e:
            problems.append(f"  {path}: request failed ({e})")
            continue
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        body = re.sub(r"<script.*?</script>|<!-- -->", "", html, flags=re.S)
        for t in NO_PRICE_TEXT:
            if t in body:
                problems.append(f"  {path}: shows {t!r}")
        n_cards = len(PRICE_CARD_RE.findall(body))
        cash = CASH_BLOCK_RE.findall(body)
        cards += n_cards
        if n_cards != len(cash):
            problems.append(f"  {path}: {n_cards} price blocks but {len(cash)} default-visible cash prices")
        for c in cash:
            if not re.search(r'class="bmh-price-figure">\$\d{1,3}(?:,\d{3})+<', c):
                problems.append(f"  {path}: a cash price block has no $N,NNN figure")
        if path == "/tiny-homes" and ('data-pm="pay"' in body or "data-pay=" in body):
            problems.append("  /tiny-homes: renders payment markup (cash price only there)")
        head = re.search(r"<head.*?</head>", html, re.S)
        for tag in re.findall(r'<title>(.*?)</title>|<meta (?:name="description"|property="og:description") content="([^"]*)"', head.group(0) if head else ""):
            if re.search(r"\$\d", " ".join(tag)):
                problems.append(f"  {path}: price or payment in the title/meta description")
        for ld in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
            if re.search(r'"(offers|price|priceCurrency|discount)"', ld):
                problems.append(f"  {path}: price/offers/discount in JSON-LD")
    llms = llms_text()
    if re.search(r"\$\d", llms):
        problems.append("  /llms.txt: contains a price or payment")
    if cards == 0:
        problems.append("  Found zero price blocks on any page — the check's patterns no longer match the markup.")
    ok = not problems
    detail = problems[:40] or [f"{cards} price blocks across {len(pages)} pages all show a cash price by default; no 'Call for price'; no price in titles, meta, schema or llms.txt; /tiny-homes is cash-only."]
    return report("11g. Cash price shown by default", ok, detail)


# ─── What's included by price mode (CLAUDE.md) ────────────────────────────
# Cash mode (the server-rendered default) lists everything except delivery and
# setup; payment mode keeps the full list. Same wording rule as
# CASH_EXCLUDED_RE in lib/includedItems.ts.
CASH_EXCLUDED_RE_PY = re.compile(r"\bdeliver(y|ed|ies)?\b|\bset[\s-]?up\b|\bturnkey\b", re.I)
INCLUDED_LIST_RE = re.compile(r'<ul data-included-list=""[^>]*>(.*?)</ul>', re.S)


def listing_features():
    src = (REPO_ROOT / "lib" / "sampleListings.ts").read_text()
    out = {}
    for blk in re.split(r"\n  \{\n", src)[1:]:
        slug = re.search(r"\n    slug: '([^']+)'", "\n" + blk)
        feats = re.search(r"\n    features: \[(.*?)\]", "\n" + blk, re.S)
        if slug and feats:
            out[slug.group(1)] = [a or b for a, b in re.findall(r"'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\"", feats.group(1))]
    return out


def step_included_by_mode():
    problems = []
    feats = listing_features()
    for slug, items in feats.items():
        status, html = fetch(f"/homes/{slug}")
        if status != 200:
            problems.append(f"  /homes/{slug}: HTTP {status}")
            continue
        m = INCLUDED_LIST_RE.search(html)
        if not m:
            problems.append(f"  /homes/{slug}: no included list (data-included-list) found")
            continue
        cash, pay = [], []
        for open_tag, inner in re.findall(r"(<li[^>]*>)(.*?)</li>", m.group(1), re.S):
            text = re.sub(r"<[^>]+>|<!-- -->", "", inner).strip()
            pay.append(text)
            if 'data-pm="pay"' not in open_tag:
                cash.append(text)
        bad = [t for t in cash if CASH_EXCLUDED_RE_PY.search(t)]
        if bad:
            problems.append(f"  /homes/{slug}: cash-mode list (server default) shows {bad}")
        lost = [t for t in items if CASH_EXCLUDED_RE_PY.search(t) and t not in pay]
        if lost:
            problems.append(f"  /homes/{slug}: payment-mode list is missing {lost}")
        if not re.search(r'class="bmh-pm-cash-inline" data-pm="cash">Included in the cash price<', html):
            problems.append(f"  /homes/{slug}: cash heading 'Included in the cash price' missing")
        if not re.search(r'class="bmh-pm-pay-inline" data-pm="pay">Included in the estimated monthly payment<', html):
            problems.append(f"  /homes/{slug}: payment heading 'Included in the estimated monthly payment' missing")
    ok = not problems and bool(feats)
    detail = problems[:40] or [f"{len(feats)} listing pages: cash list (default) has no delivery/setup; payment list keeps every delivery/setup item; both headings present."]
    return report("11h. What's included follows the price mode", ok, detail)


# ─── Clearance label (lib/badges.ts CLEARANCE) ────────────────────────────
# Exactly the configured homes carry "Clearance" on their cards and listing
# pages; "In stock" is retired everywhere.
CARD_SPLIT = '<div class="bmh-inv-card bmh-inv-card-stretch">'


def clearance_slugs():
    src = (REPO_ROOT / "lib" / "badges.ts").read_text()
    block = re.search(r"export const CLEARANCE: Record<string, string> = \{(.*?)\n\}", src, re.S)
    return set(re.findall(r"'([a-z0-9-]+)':", block.group(1))) if block else set()


def step_clearance_labels():
    problems = []
    expected = clearance_slugs()
    if not expected:
        problems.append("  Couldn't read CLEARANCE from lib/badges.ts")
    seen_cards = 0
    for path in ["/browse", "/tiny-homes"] + [f"/homes/{s}" for s in listing_slugs()]:
        status, html = fetch(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        body = re.sub(r"<script.*?</script>", "", html, flags=re.S)
        if re.search(r"in stock", body, re.I):
            problems.append(f"  {path}: shows 'In stock'")
        for card in body.split(CARD_SPLIT)[1:]:
            m = re.search(r'href="/homes/([a-z0-9-]+)"', card)
            if not m:
                continue
            seen_cards += 1
            # The tag sits at the very start of a card (in its photo); look only
            # there, so the last card's segment can't run into later markup.
            slug, has = m.group(1), "data-clearance" in card[:1500]
            if has and slug not in expected:
                problems.append(f"  {path}: card for {slug} shows Clearance but isn't in CLEARANCE")
            if slug in expected and not has:
                problems.append(f"  {path}: card for {slug} is missing its Clearance label")
        if path.startswith("/homes/"):
            slug = path.split("/")[-1]
            h1 = body.find("<h1")
            row = body[max(0, h1 - 2500):h1]
            has = "data-clearance" in row
            if has and slug not in expected:
                problems.append(f"  {path}: title badge row shows Clearance but the home isn't in CLEARANCE")
            if slug in expected and not has:
                problems.append(f"  {path}: title badge row is missing Clearance")
    ok = not problems and seen_cards > 0
    detail = problems[:40] or [f"Clearance on exactly the {len(expected)} configured homes across {seen_cards} cards and every listing page; no 'In stock' anywhere."]
    return report("11i. Clearance labels match lib/badges.ts", ok, detail)


# ─── Archived sections (lib/archived.json + lib/archived.ts) ─────────────
# While a section's flag is true, its route must not appear in the header
# nav, footer, sitemap or llms.txt, and must answer with a TEMPORARY (307)
# redirect to "/". See CLAUDE.md "Archived sections".
# Flags in lib/archived.json that switch off a feature rather than a page
# route: they have no route, no redirect and no nav entry to check here.
ARCHIVED_FEATURES = {"videos"}


def archived_flags():
    return json.loads((REPO_ROOT / "lib" / "archived.json").read_text())


def archived_routes():
    flags = archived_flags()
    routes = dict(re.findall(r"(\w+): '(/[^']+)'", (REPO_ROOT / "lib" / "archived.ts").read_text()))
    return {key: routes.get(key) for key, on in flags.items() if on and key not in ARCHIVED_FEATURES}


def fetch_no_redirect(path):
    import http.client
    conn = http.client.HTTPConnection("localhost", PORT, timeout=60)
    conn.request("GET", path)
    resp = conn.getresponse()
    return resp.status, resp.getheader("Location")


def step_archived_routes():
    problems = []
    active = archived_routes()
    if not active:
        return report("11c. Archived sections hidden", True, ["No section is archived."])
    status, home = fetch("/")
    _, sitemap = fetch("/sitemap.xml")
    llms = llms_text()
    header = "".join(re.findall(r"<header.*?</header>", home, re.S))
    footer = "".join(re.findall(r"<footer.*?</footer>", home, re.S))
    # The mobile menu renders outside <header> on some layouts; check it too.
    mobile = "".join(re.findall(r'<div class="bmh-mobile-menu.*?</div>\s*</div>', home, re.S))
    if not header or not footer:
        problems.append("  Couldn't find <header> or <footer> on / — the check's patterns no longer match.")
    for key, route in active.items():
        if not route:
            problems.append(f"  '{key}' is archived in lib/archived.json but has no route in lib/archived.ts")
            continue
        for label, html in (("header nav", header), ("mobile menu", mobile), ("footer", footer)):
            if re.search(rf'href="{re.escape(route)}(?:/[^"]*)?"', html):
                problems.append(f"  {route} is archived but linked in the {label}")
        if re.search(rf"<loc>[^<]*{re.escape(route)}(?:/[^<]*)?</loc>", sitemap):
            problems.append(f"  {route} is archived but listed in /sitemap.xml")
        if re.search(rf"{re.escape(route)}\b", llms):
            problems.append(f"  {route} is archived but mentioned in /llms.txt")
        rstatus, location = fetch_no_redirect(route)
        if rstatus != 307 or (location or "").rstrip("/") not in ("", "http://localhost:%d" % PORT):
            problems.append(f"  {route} should 307-redirect to / while archived, got {rstatus} -> {location!r}")
    ok = not problems
    detail = problems or [f"Archived and hidden: {', '.join(r for r in active.values())} (307 to /, absent from nav, footer, sitemap, llms.txt)."]
    return report("11c. Archived sections hidden", ok, detail)


# ─── Model year (see CLAUDE.md "Model year") ─────────────────────────────
# Static: no listing in lib/sampleListings.ts may carry an outdated model year
# (2026). Rendered: every card and listing page must show the listing's own
# year — the card subtitle/spec on /, /browse, /tiny-homes and related-home
# cards, and the "Year" stat on each listing page.
OUTDATED_MODEL_YEARS = {2026}


def listing_years():
    src = (REPO_ROOT / "lib" / "sampleListings.ts").read_text()
    out = {}
    for block in re.split(r"\n  \{\n", src)[1:]:
        slug = re.search(r"\n    slug: '([^']+)'", "\n" + block)
        year = re.search(r"\n    year: (\d+),", "\n" + block)
        if slug and year:
            out[slug.group(1)] = int(year.group(1))
    return out


def step_model_year_static():
    years = listing_years()
    bad = sorted(s for s, y in years.items() if y in OUTDATED_MODEL_YEARS)
    problems = [f"  {s}: year {years[s]} (outdated model year)" for s in bad]
    if not years:
        problems.append("  Parsed zero listing years from lib/sampleListings.ts — the pattern no longer matches.")
    counts = {}
    for y in years.values():
        counts[y] = counts.get(y, 0) + 1
    ok = not problems
    detail = problems or [f"{len(years)} listings by year: {dict(sorted(counts.items()))}."]
    return report("4c. Listing model years current", ok, detail)


CARD_SPLIT_RE = re.compile(r'(?=<div class="bmh-inv-card)')
YEAR_IN_CARD_RE = re.compile(r'<(?:p class="bmh-inv-card-sub"|span class="bmh-spec")[^>]*>(.*?)</(?:p|span)>', re.S)


def step_model_year_rendered():
    years = listing_years()
    pages = ["/", "/browse", "/tiny-homes"] + [f"/homes/{s}" for s in years]
    problems = []
    cards_checked = 0
    for path in pages:
        try:
            status, html = fetch(path)
        except Exception as e:
            problems.append(f"  {path}: request failed ({e})")
            continue
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        html = html.replace("<!-- -->", "")
        for chunk in CARD_SPLIT_RE.split(html)[1:]:
            m = re.search(r'href="/homes/([^"]+)"', chunk)
            if not m or m.group(1) not in years:
                continue
            chunk = chunk[: chunk.find('class="bmh-inv-card-footer"')] if 'bmh-inv-card-footer' in chunk else chunk[:4000]
            shown = {int(y) for txt in YEAR_IN_CARD_RE.findall(chunk) for y in re.findall(r"\b(20[2-3]\d)\b", re.sub(r"<[^>]+>", "", txt))}
            cards_checked += 1
            want = years[m.group(1)]
            if shown and shown != {want}:
                problems.append(f"  {path}: card for {m.group(1)} shows {sorted(shown)}, listing year is {want}")
        if path.startswith("/homes/"):
            slug = path.split("/")[-1]
            stat = re.search(r'bmh-listing-stat-val">(\d{4})</div>\s*<div[^>]*>\s*Year', html, re.I)
            if not stat:
                problems.append(f"  {path}: couldn't find the Year stat")
            elif int(stat.group(1)) != years[slug]:
                problems.append(f"  {path}: Year stat shows {stat.group(1)}, listing year is {years[slug]}")
    if cards_checked == 0:
        problems.append("  Checked zero cards — the card pattern no longer matches the markup.")
    ok = not problems
    detail = problems[:40] or [f"{cards_checked} cards and {len(years)} listing pages all show each listing's own year."]
    return report("11d. Model year shown matches listing", ok, detail)


# ─── Listing URLs (see CLAUDE.md "Listing URLs") ─────────────────────────
# Static (4e): every slug matches LISTING_SLUG_RE from lib/listingSlugs.ts
# (<name>-texas-<beds>-bed-<baths>-bath[-single-wide|-double-wide|-tiny-home]),
# carries no manufacturer name, and no slug (current or legacy) is reused.
# Popular Homes slugs stored in lib/cityContent.ts must still resolve.
# City and display names are ALLOWED (homes are named after towns), and a
# slug is deliberately NOT compared with the current display name: slugs
# stay frozen after a rename.
# Rendered (11e): every legacy slug answers one 308 to its current URL, the
# current URL is 200 with a self-referencing canonical and og:url, and no
# page link or sitemap entry points at a legacy slug.
MANUFACTURERS = {"marathon", "fleetwood", "cavco", "clayton", "champion", "palm", "harbor"}


def listing_slug_rows():
    src = (REPO_ROOT / "lib" / "sampleListings.ts").read_text()
    rows = []
    for block in re.split(r"\n  \{\n", src)[1:]:
        slug = re.search(r"\n    slug: '([^']+)'", "\n" + block)
        if not slug:
            continue
        legacy = re.search(r"\n    legacySlugs: \[([^\]]*)\]", "\n" + block)
        title = re.search(r"\n    title: '((?:[^'\\]|\\.)*)'", "\n" + block)
        rows.append({
            "slug": slug.group(1),
            "legacy": re.findall(r"'([^']+)'", legacy.group(1)) if legacy else [],
            "title": title.group(1) if title else "",
        })
    return rows


def listing_slug_regex():
    src = (REPO_ROOT / "lib" / "listingSlugs.ts").read_text()
    m = re.search(r"LISTING_SLUG_RE =\s*/(.+)/\s*$", src, re.M)
    return re.compile(m.group(1)) if m else None


def step_listing_slugs_static():
    problems = []
    rows = listing_slug_rows()
    rx = listing_slug_regex()
    if not rows or rx is None:
        problems.append("  Couldn't parse listings or LISTING_SLUG_RE — the check's patterns no longer match.")
        return report("4e. Listing slugs: format, manufacturer, uniqueness", False, problems)
    seen = {}
    for r in rows:
        slug = r["slug"]
        if not rx.match(slug):
            problems.append(f"  {slug}: doesn't match <name>-texas-<beds>-bed-<baths>-bath[-single-wide|-double-wide|-tiny-home]")
        hits = sorted(set(slug.split("-")) & MANUFACTURERS)
        if hits:
            problems.append(f"  {slug}: contains a manufacturer name ({', '.join(hits)})")
        for s_ in [slug] + r["legacy"]:
            if s_ in seen:
                problems.append(f"  '{s_}' is used by both {seen[s_]} and {r['title'] or slug}")
            seen[s_] = r["title"] or slug
    stored = re.findall(r"popularHomes: \[([^\]]*)\]", (REPO_ROOT / "lib" / "cityContent.ts").read_text())
    unresolved = sorted({p for block in stored for p in re.findall(r"'([^']+)'", block)} - set(seen))
    for p_ in unresolved:
        problems.append(f"  lib/cityContent.ts popularHomes '{p_}' doesn't resolve to any listing (current or legacy)")
    ok = not problems
    detail = problems or [f"{len(rows)} slugs match the format with no manufacturer name; "
                          f"{sum(len(r['legacy']) for r in rows)} legacy slugs; nothing reused; all Popular Homes references resolve."]
    return report("4e. Listing slugs: format, manufacturer, uniqueness", ok, detail)


def step_listing_urls_rendered(city_slugs):
    problems = []
    rows = listing_slug_rows()
    legacy = {old: r["slug"] for r in rows for old in r["legacy"]}
    for old, new in legacy.items():
        status, location = fetch_no_redirect(f"/homes/{old}?ref=check")
        loc_path = re.sub(r"^https?://[^/]+", "", location or "")
        if status != 308 or loc_path != f"/homes/{new}?ref=check":
            problems.append(f"  /homes/{old}: expected one 308 to /homes/{new}?ref=check, got {status} -> {location!r}")
    pages = ["/", "/browse", "/tiny-homes"] + [f"/mobile-homes-{s}-tx" for s in city_slugs]
    for r in rows:
        path = f"/homes/{r['slug']}"
        pages.append(path)
        status, html = fetch(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        canon = re.search(r'<link rel="canonical" href="([^"]+)"', html)
        og = re.search(r'<meta property="og:url" content="([^"]+)"', html)
        for label, m in (("canonical", canon), ("og:url", og)):
            got = re.sub(r"^https?://[^/]+", "", m.group(1)) if m else None
            if got != path:
                problems.append(f"  {path}: {label} is {m.group(1) if m else 'missing'}, should point at {path}")
    for path in pages:
        try:
            status, html = fetch(path)
        except Exception as e:
            problems.append(f"  {path}: request failed ({e})")
            continue
        # Page links only: /homes/<slug> optionally followed by ?query or #hash.
        # Photo files like /homes/<old-slug-folder>/x.jpg are files, not links.
        for old in set(re.findall(r'href="/homes/([^"/?#]+)(?:[?#][^"]*)?"', html)) & set(legacy):
            problems.append(f"  {path}: links to legacy /homes/{old} (should be /homes/{legacy[old]})")
    _, sitemap = fetch("/sitemap.xml")
    listed = set(re.findall(r"<loc>[^<]*/homes/([^<]+)</loc>", sitemap))
    for old in listed & set(legacy):
        problems.append(f"  sitemap lists legacy /homes/{old}")
    for r in rows:
        if r["slug"] not in listed:
            problems.append(f"  sitemap is missing /homes/{r['slug']}")
    ok = not problems
    detail = problems[:40] or [f"{len(legacy)} legacy URLs each 308 once to the new URL (query kept); "
                               f"{len(rows)} listing pages 200 with self canonical + og:url; "
                               f"no legacy links on {len(pages)} pages or in the sitemap."]
    return report("11e. Listing URLs: redirects, canonicals, links", ok, detail)


# ─── Listing videos (see CLAUDE.md "Listing videos") ─────────────────────
# Static (4f): every youtubeId is exactly 11 valid characters — no URL, no
# ?si= or other tracking parameter stored.
# Rendered (11f): /browse, /tiny-homes and every listing page ship NO
# YouTube iframe in server HTML (the player loads only after a tap); every
# card video chip has its "Watch video of …" aria-label; /browse carries no
# VideoObject schema.
YOUTUBE_ID_RE = re.compile(r"^[A-Za-z0-9_-]{11}$")


def listing_youtube_ids():
    src = (REPO_ROOT / "lib" / "sampleListings.ts").read_text()
    out = {}
    for block in re.split(r"\n  \{\n", src)[1:]:
        slug = re.search(r"\n    slug: '([^']+)'", "\n" + block)
        yt = re.search(r"\n    youtubeId: '([^']*)'", "\n" + block)
        if slug and yt:
            out[slug.group(1)] = yt.group(1)
    return out


def step_youtube_ids_static():
    ids = listing_youtube_ids()
    problems = [f"  {s}: youtubeId {v!r} must be exactly the 11-character video ID (no URL or tracking parameters)"
                for s, v in ids.items() if not YOUTUBE_ID_RE.match(v)]
    ok = not problems
    return report("4f. Listing video IDs", ok, problems or [f"{len(ids)} listings have a valid 11-character youtubeId."])


YT_IFRAME_RE = re.compile(r"<iframe[^>]+(?:youtube\.com|youtube-nocookie\.com|youtu\.be)", re.I)


# While lib/archived.json has "videos": true, no rendered page may carry any
# trace of a listing video (CLAUDE.md "Listing videos").
VIDEO_TRACE_RES = [
    ("a Video chip", re.compile(r"data-video-chip")),
    ("a 'Watch video' label", re.compile(r"Watch video")),
    ("a YouTube iframe", YT_IFRAME_RE),
    ("VideoObject schema", re.compile(r"VideoObject")),
    ("an embedUrl", re.compile(r"embedUrl")),
    ("a YouTube URL or ID field", re.compile(r"youtube|youtu\.be", re.I)),
]


def step_youtube_rendered(city_slugs=()):
    if archived_flags().get("videos"):
        return step_youtube_archived(city_slugs)
    problems = []
    ids = listing_youtube_ids()
    pages = ["/browse", "/tiny-homes"] + [f"/homes/{s}" for s in listing_slugs()]
    chips_on_browse = 0
    for path in pages:
        status, html = fetch(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        if YT_IFRAME_RE.search(html):
            problems.append(f"  {path}: server HTML contains a YouTube iframe before any tap")
        for chip in re.findall(r"<button[^>]*data-video-chip[^>]*>", html):
            if not re.search(r'aria-label="Watch video of [^"]+"', chip):
                problems.append(f"  {path}: video chip without its 'Watch video of …' aria-label")
            if path == "/browse":
                chips_on_browse += 1
        if path == "/browse" and '"VideoObject"' in html:
            problems.append("  /browse: carries VideoObject schema (only listing pages may)")
    if chips_on_browse != len(ids):
        problems.append(f"  /browse: {chips_on_browse} video chips for {len(ids)} listings with a youtubeId")
    ok = not problems
    detail = problems or [f"No YouTube iframe in server HTML on {len(pages)} pages; {chips_on_browse} labeled video chips on /browse; no VideoObject on /browse."]
    return report("11f. Listing videos load only on tap", ok, detail)


def step_youtube_archived(city_slugs):
    pages = ["/", "/browse", "/tiny-homes", "/sitemap.xml"] + [f"/homes/{s}" for s in listing_slugs()]
    pages += [f"/mobile-homes-{s}-tx" for s in city_slugs]
    problems = []
    for path in pages:
        status, html = fetch(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        for label, rx in VIDEO_TRACE_RES:
            if rx.search(html):
                problems.append(f"  {path}: contains {label} while videos are archived")
    llms = llms_text()
    if re.search(r"youtube|youtu\.be", llms, re.I):
        problems.append("  /llms.txt: mentions YouTube while videos are archived")
    ok = not problems
    detail = problems[:40] or [f"Videos archived: no Video chip, YouTube iframe, VideoObject, embedUrl or YouTube URL on {len(pages)} pages or in llms.txt."]
    return report("11f. Listing videos archived (lib/archived.json)", ok, detail)



# ─── Cash-price claims (CLAUDE.md "The cash price covers the home") ───────
# The cash price covers the home; delivery and setup are quoted separately;
# if you finance, they're in the estimated monthly payment. Fail on any
# "out-the-door" / "all-in" / "delivered-and-set" wording, or any sentence
# saying delivery or setup is included in the (home/cash) price — except in
# payment-mode text: elements marked data-pm="pay", and sentences about the
# monthly payment / financing / loan. A sentence that says it's quoted
# separately or not included is fine, and so is a question asking whether
# it's included (the banned terms still fail in a question).
BANNED_PRICE_TERMS_RE = re.compile(
    r"\bout[- ]the[- ]door\b|\ball-in\b|\bdelivered[- ]and[- ]set\b(?![- ]up anywhere)|\bdelivery included\b", re.I
)
DS = r"(?:delivery|setup|set-up|set up)"
INCLUDED_IN_PRICE_RE = re.compile(
    rf"\b{DS}\b[^.;:]{{0,60}}\b(?:included|includes?|part of|rolled into|built into|built in|covered)\b[^.;:]{{0,40}}\bprice\b"
    rf"|\bprice\b[^.;:]{{0,60}}\b(?:includes?|including|covers?|built in|rolled into)\b[^.;:]{{0,60}}\b{DS}\b",
    re.I,
)
PAYMENT_CONTEXT_RE = re.compile(r"monthly payment|\bif you finance|\bfinanc|\bloan\b", re.I)
NEGATED_RE = re.compile(r"quoted separately|\bnot\b|n't\b|\bnever\b|\bseparate\b", re.I)


def price_claim_problems(text):
    """Sentences in `text` that break the cash-price rule (see above)."""
    found = []
    for sentence in re.split(r"(?<=[.!?])\s+", re.sub(r"\s+", " ", text)):
        if PAYMENT_CONTEXT_RE.search(sentence):
            continue
        m = BANNED_PRICE_TERMS_RE.search(sentence)
        if not m:
            m = INCLUDED_IN_PRICE_RE.search(sentence)
            # A question ("Is setup included in the price?") asks, it doesn't
            # claim; the answer sentence is checked on its own.
            if m and (NEGATED_RE.search(sentence) or sentence.rstrip().endswith("?")):
                m = None
        if m:
            found.append((m.group(0), sentence.strip()[:200]))
    return found


def _city_copy_strings(value, path):
    if isinstance(value, str):
        yield path, value
    elif isinstance(value, dict):
        for k, v in value.items():
            yield from _city_copy_strings(v, f"{path}.{k}")
    elif isinstance(value, (list, tuple)):
        for i, v in enumerate(value):
            yield from _city_copy_strings(v, f"{path}[{i}]")


def step_price_claims_static():
    sys.path.insert(0, str(REPO_ROOT / "scripts"))
    import write_city_content  # noqa: E402

    problems = []
    count = 0
    sources = list(write_city_content.CITY_COPY.items())
    sources += [(f"CITIES[{entry[0]}]", entry) for entry in write_city_content.CITIES]
    for slug, copy in sources:
        for path, text in _city_copy_strings(copy, slug):
            count += 1
            for term, sentence in price_claim_problems(text):
                problems.append(f"  {path}: {term!r} in {sentence!r}")
    ok = not problems
    detail = problems[:60] + ([f"  ... {len(problems) - 60} more"] if len(problems) > 60 else [])
    if ok:
        detail = [f"{len(write_city_content.CITY_COPY)} cities (CITY_COPY + CITIES metadata), {count} stored strings: no out-the-door / all-in / delivered-and-set wording and no 'delivery or setup included in the price'."]
    return report("4h. Cash-price claims (stored city copy)", ok, detail)


PAY_ELEMENT_RE = re.compile(r'<(\w+)\b[^>]*\bdata-pm="pay"[^>]*>.*?</\1>', re.S)


def rendered_text(html):
    """Visible text + meta/title/JSON-LD, without payment-mode elements."""
    html = PAY_ELEMENT_RE.sub(" ", html)
    metas = re.findall(r'<meta[^>]+content="([^"]*)"', html)
    ld = re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S)
    body = re.sub(r"<script\b.*?</script>|<style\b.*?</style>", " ", html, flags=re.S)
    body = re.sub(r"<!-- -->", "", body)
    body = re.sub(r"<[^>]+>", " . ", body)  # element boundaries end a sentence
    parts = [body] + metas
    for block in ld:
        try:
            parts += [s for _, s in _json_strings(json.loads(block))]
        except ValueError:
            parts.append(block)
    import html as _html

    return _html.unescape("\n. ".join(parts))


def _json_strings(value, path=""):
    if isinstance(value, str):
        yield path, value
    elif isinstance(value, dict):
        for k, v in value.items():
            yield from _json_strings(v, f"{path}.{k}")
    elif isinstance(value, list):
        for i, v in enumerate(value):
            yield from _json_strings(v, f"{path}[{i}]")


def sitemap_paths():
    status, xml = fetch("/sitemap.xml")
    return [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>([^<]+)</loc>", xml)]


def step_price_claims_rendered():
    paths = sitemap_paths()
    problems = []
    for path in paths:
        try:
            status, html = fetch(path)
        except urllib.error.HTTPError as e:
            problems.append(f"  {path}: HTTP {e.code}")
            continue
        seen = set()
        for term, sentence in price_claim_problems(rendered_text(html)):
            if sentence not in seen:
                seen.add(sentence)
                problems.append(f"  {path}: {term!r} in {sentence!r}")
    llms = llms_text()
    for term, sentence in price_claim_problems(llms):
        problems.append(f"  /llms.txt: {term!r} in {sentence!r}")
    ok = not problems and bool(paths)
    detail = problems[:60] + ([f"  ... {len(problems) - 60} more"] if len(problems) > 60 else [])
    if ok:
        detail = [f"{len(paths)} sitemap pages + llms.txt: no out-the-door / all-in / delivered-and-set wording and no 'delivery or setup included in the price' outside payment-mode text."]
    return report("11j. Cash-price claims (rendered pages)", ok, detail)



# ─── Land-Home Packages (CLAUDE.md "Land-Home Packages") ──────────────────
# Behind lib/features.json "landHomePackages". Steps 13a–13h check the
# flag-off state, then switch the flag on for the run (restored exactly
# afterwards, even on failure) and check the new pages.
FEATURES_FILE = REPO_ROOT / "lib" / "features.json"
LAND_HOME_HUB = "/land-home-packages"
LAND_HOME_FLORESVILLE = "/land-home-packages-floresville-tx"
LAND_HOME_NAV_LABEL = "Land-Home Packages"


def land_home_package_paths():
    src = (REPO_ROOT / "lib" / "packages.ts").read_text()
    return [f"{LAND_HOME_HUB}/{s}" for s in re.findall(r"slug: '([a-z0-9-]+-land-home-package)'", src)]


def land_home_paths():
    return [LAND_HOME_HUB, LAND_HOME_FLORESVILLE] + land_home_package_paths()


def fetch_status(path):
    """(status, body) without raising on 4xx/5xx."""
    try:
        return fetch(path)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def llms_text():
    """/llms.txt as served (app/llms.txt/route.ts builds it from lib/llmsTxt.ts)."""
    status, body = fetch_status("/llms.txt")
    return body if status == 200 else ""


class LandHomeFlag:
    """Temporarily set lib/features.json "landHomePackages", then wait for the
    dev server to pick it up (the hub answers 200 when on, 404 when off).
    The file is restored byte-for-byte on exit."""

    def __init__(self, value):
        self.value = value
        self.original = None

    def _wait(self, want):
        deadline = time.time() + 120
        while time.time() < deadline:
            if fetch_status(LAND_HOME_HUB)[0] == want and (fetch_status("/sitemap.xml")[1].count(LAND_HOME_HUB) > 0) == (want == 200):
                return True
            time.sleep(2)
        return False

    def __enter__(self):
        self.original = FEATURES_FILE.read_text()
        data = json.loads(self.original)
        data["landHomePackages"] = self.value
        FEATURES_FILE.write_text(json.dumps(data, indent=2) + "\n")
        self.ready = self._wait(200 if self.value else 404)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        FEATURES_FILE.write_text(self.original)
        self._wait(200 if json.loads(self.original).get("landHomePackages") else 404)
        return False


def main_content(html):
    m = re.search(r"<main[^>]*>(.*)</main>", html, re.S)
    return m.group(1) if m else html


def page_meta_text(html):
    head = html.split("<body", 1)[0]
    parts = re.findall(r"<title>(.*?)</title>", head, re.S)
    parts += re.findall(r'<meta[^>]+(?:name|property)="(?:description|keywords|og:[a-z:_]+|twitter:[a-z:_]+)"[^>]+content="([^"]*)"', head)
    return "\n".join(parts)


def main_jsonld(html):
    out = []
    for b in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', main_content(html), re.S):
        try:
            out.append(json.loads(b))
        except ValueError:
            pass
    return out


def visible_main_text(html):
    import html as _html

    body = re.sub(r"<script\b.*?</script>|<style\b.*?</style>|<!-- -->", " ", main_content(html), flags=re.S)
    return _html.unescape(re.sub(r"<[^>]+>", " ", body))


# 13a — flag off: no tab, no footer link, 404s, nothing in the sitemap or llms.txt.
def step_land_home_flag_off():
    problems = []
    for path in ["/", "/browse", "/cities", "/mobile-homes-floresville-tx", "/how-pricing-works"]:
        status, html = fetch_status(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        if LAND_HOME_NAV_LABEL in html or f'href="{LAND_HOME_HUB}' in html:
            problems.append(f"  {path}: shows the {LAND_HOME_NAV_LABEL!r} tab/link while the flag is off")
    for path in land_home_paths():
        status, _ = fetch_status(path)
        if status != 404:
            problems.append(f"  {path}: HTTP {status} (expected 404 while the flag is off)")
    if LAND_HOME_HUB in fetch_status("/sitemap.xml")[1]:
        problems.append("  /sitemap.xml lists land-home pages while the flag is off")
    if re.search(r"land[- ]home", llms_text(), re.I):
        problems.append("  /llms.txt mentions land-home packages while the flag is off")
    ok = not problems
    detail = problems or [f"Flag off: no tab or footer link on 5 pages, {len(land_home_paths())} routes 404, absent from the sitemap and llms.txt."]
    return report("13a. Land-Home flag off is clean", ok, detail)


# 13b — land-sale wording only in the new routes, the nav/footer label and
# llms.txt. These pre-existing lines are reported to the owner (2026-11-21)
# and left unchanged on purpose; anything else fails.
LAND_SALE_RE = re.compile(r"land[- ]home|land[- ]and[- ]home|home[- ]and[- ]land|\bland packages?\b|home and its lot|\blot sold together", re.I)
LAND_WORDING_KNOWN = {
    # /contact, /calculator and Schulenburg were fixed on 2026-11-21 (d10b170);
    # they must not regain land-home wording.
    "/mobile-homes-fairfield-tx": ["the land and home you choose fit the same budget"],
    "/blog/how-to-finance-mobile-home-on-family-land-texas": ["The home and land must be in an acceptable area per lender guidelines"],
}


def step_land_wording_scope(sitemap):
    problems = []
    new = set(land_home_paths())
    checked = 0
    for path in sitemap:
        if path in new:
            continue
        status, html = fetch_status(path)
        if status != 200:
            continue
        checked += 1
        text = rendered_text(html)
        text = text.replace(f"{LAND_HOME_NAV_LABEL}", " ")  # the nav/footer label itself
        for known in LAND_WORDING_KNOWN.get(path, []):
            text = text.replace(known, " ").replace(known.replace("'", "’"), " ")
        for m in LAND_SALE_RE.finditer(text):
            ctx = text[max(0, m.start() - 70): m.end() + 70].replace("\n", " ")
            problems.append(f"  {path}: {m.group(0)!r} in …{ctx.strip()}…")
    ok = not problems
    detail = problems[:40] or [f"{checked} other sitemap pages: no land-home wording outside the new routes and the nav/footer label (2 pre-existing pages allowlisted by exact text: Fairfield and one blog post)."]
    return report("13b. Land-home wording only in the new section", ok, detail)


# 13c — schema on the new pages.
LH_FORBIDDEN_TYPES = {"Product", "Offer", "AggregateOffer", "AggregateRating", "Review", "Rating", "Place", "PostalAddress", "GeoCoordinates", "ImageObject"}
LH_FORBIDDEN_KEYS = {"price", "priceCurrency", "offers", "image", "address", "geo", "aggregateRating", "review", "lowPrice", "highPrice"}


def _walk(obj):
    if isinstance(obj, dict):
        yield obj
        for v in obj.values():
            yield from _walk(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from _walk(v)


def step_land_home_schema():
    problems = []
    titles = {}
    pkgs = land_home_package_paths()
    for path in land_home_paths():
        status, html = fetch_status(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        blocks = main_jsonld(html)
        types = {b.get("@type") for b in blocks}
        required = {"BreadcrumbList", "WebPage"} | ({"FAQPage", "ItemList"} if path not in pkgs else set())
        if required - types:
            problems.append(f"  {path}: missing schema {sorted(required - types)}")
        for node in _walk(blocks):
            t = node.get("@type")
            if t in LH_FORBIDDEN_TYPES:
                problems.append(f"  {path}: forbidden schema type {t}")
            bad = LH_FORBIDDEN_KEYS & set(node)
            if bad:
                problems.append(f"  {path}: forbidden schema key(s) {sorted(bad)}")
        for b in blocks:
            if b.get("@type") == "WebPage":
                if not b.get("dateModified"):
                    problems.append(f"  {path}: WebPage without dateModified")
                if not (isinstance(b.get("speakable"), dict) and b["speakable"].get("cssSelector")):
                    problems.append(f"  {path}: WebPage without speakable")
            if b.get("@type") == "ItemList":
                for item in b.get("itemListElement", []):
                    extra = set(item) - {"@type", "position", "name", "url"}
                    if extra or not item.get("url", "").startswith("https://www.texashomesdirect.com/land-home-packages/"):
                        problems.append(f"  {path}: ItemList item must be name + url only, got {sorted(item)}")
        if re.search(r"localhost|127\.0\.0\.1", json.dumps(blocks)):
            problems.append(f"  {path}: schema points at localhost")
        canon = re.search(r'<link rel="canonical" href="([^"]+)"', html)
        if not canon or canon.group(1) != f"https://www.texashomesdirect.com{path}":
            problems.append(f"  {path}: canonical is {canon.group(1) if canon else None!r}, not self-referencing")
        ogurl = re.search(r'<meta property="og:url" content="([^"]+)"', html)
        if not ogurl or ogurl.group(1) != f"https://www.texashomesdirect.com{path}":
            problems.append(f"  {path}: og:url isn't the page's own URL")
        if re.search(r'property="og:image"|name="twitter:image"', html):
            problems.append(f"  {path}: has an og:image/twitter:image (packages use the site default until real photos exist)")
        h1s = re.findall(r"<h1\b", main_content(html))
        if len(h1s) != 1:
            problems.append(f"  {path}: {len(h1s)} H1s")
        title = re.search(r"<title>(.*?)</title>", html, re.S)
        title = title.group(1) if title else ""
        if title in titles:
            problems.append(f"  {path}: same <title> as {titles[title]}")
        titles[title] = path
        if re.search(r"\$\d", page_meta_text(html) + json.dumps(blocks)):
            problems.append(f"  {path}: price or payment in the title, meta or schema")
        faq = [b for b in blocks if b.get("@type") == "FAQPage"]
        for b in faq:
            for q in b.get("mainEntity", []):
                a = q.get("acceptedAnswer", {}).get("text", "")
                if re.search(r"\$\d", a):
                    problems.append(f"  {path}: price in FAQ answer {q.get('name')!r}")
                if not 40 <= len(a.split()) <= 60:
                    problems.append(f"  {path}: FAQ answer {q.get('name')!r} is {len(a.split())} words (40–60)")
    expect = {
        LAND_HOME_HUB: "Land and Home Packages in Texas | Texas Homes Direct",
        LAND_HOME_FLORESVILLE: "Land and Home Packages in Floresville, TX | Texas Homes Direct",
    }
    for path, want in expect.items():
        if titles.get(want) != path:
            problems.append(f"  {path}: title isn't {want!r}")
    ok = not problems
    detail = problems[:40] or [f"{len(land_home_paths())} pages: required schema, no Product/Offer/price/image/address/geo, ItemList is name+url, self canonicals and og:url, one H1, unique titles, no og:image, no prices in titles/meta/schema/FAQ."]
    return report("13c. Land-Home pages: schema, canonicals, titles", ok, detail)


# 13d — no new FAQ question repeats any other question on the site.
def _norm_q(q):
    return re.sub(r"[^a-z0-9 ]", "", q.lower().replace("’", "'")).strip()


def step_land_home_faq_unique(sitemap):
    from difflib import SequenceMatcher

    new = set(land_home_paths())
    import html as _html

    questions = []  # (path, question)
    # Stored city FAQ questions (incl. unpublished cities).
    import write_city_content  # noqa: E402

    for slug, copy in write_city_content.CITY_COPY.items():
        for item in copy.get("faq", []):
            if isinstance(item, dict) and item.get("q"):
                questions.append((f"/mobile-homes-{slug}-tx", item["q"]))
    for path in sitemap:
        status, html = fetch_status(path)
        if status != 200:
            continue
        # Visible FAQ questions (pages without FAQPage schema, e.g. /contact).
        for q in re.findall(r'<div class="bmh-faq-q"[^>]*>(.*?)<span', html, re.S):
            questions.append((path, _html.unescape(re.sub(r"<[^>]+>|<!-- -->", "", q)).strip()))
        for b in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S):
            try:
                obj = json.loads(b)
            except ValueError:
                continue
            for node in _walk(obj):
                if node.get("@type") == "Question" and node.get("name"):
                    questions.append((path, node["name"]))
    problems = []
    questions = list(dict.fromkeys(questions))  # schema + visible copies of the same question
    mine = [(p, q) for p, q in questions if p in new]
    for i, (p, q) in enumerate(mine):
        for p2, q2 in questions:
            if (p2, q2) == (p, q):
                continue
            a, b = _norm_q(q), _norm_q(q2)
            r = 1.0 if a == b else SequenceMatcher(None, a, b).ratio()
            if r >= 0.8:
                problems.append(f"  {p}: {q!r} repeats {p2}: {q2!r} (similarity {r:.2f})")
    ok = not problems and bool(mine)
    detail = problems[:40] or [f"{len(mine)} new FAQ questions checked against {len(questions)} questions site-wide: none repeats (similarity < 0.80)."]
    return report("13d. Land-Home FAQ questions are unique", ok, detail)


# 13e — none of the UNKNOWN facts or banned terms on the new pages.
LH_BANNED = [
    ("the source home's name", r"\bthe austin\b|austin-texas-4-bed"),
    ("manufacturer", r"\bcavco\b|\bmanufacturer\b|\bbuilder\b|\bmodel\b|\bclayton\b"),
    ("product type", r"\bmobile homes?\b|\bmanufactured\b|\bHUD\b"),
    ("delivery/setup claim", r"\bincludes? delivery\b|\bexcludes? delivery\b|\bdeliver|\bset[- ]?up\b"),
    ("timing", r"\bmove[- ]in\b|\bweeks?\b|\bdays?\b|\btimeline\b|\bmonths?\b"),
    ("payment assumption", r"\binsurance\b|\d+(\.\d+)?\s*%|\bAPR\b|\d+[- ]years?\b|\bterm of\b"),
    ("financing type", r"\bmortgage\b|\bFHA\b|\bVA loan|\bUSDA\b|\bchattel\b|\bin-house financing\b|\bowner financ"),
    ("what's-included list", r"what['’]s included|\bincluded in the\b"),
    ("lot detail", r"\baddress(es)?\b|\bdimensions?\b|\bfrontage\b|\bwell\b|\bseptic\b|\bcounty\b|\bwilson\b"),
    ("office/showroom", r"\bshowroom\b|\boffice\b|\bour lot\b|\bvisit us\b|\bheadquartered\b"),
    ("testimonial/review", r"\btestimonial|\breviews?\b|\bstars?\b|\brated\b"),
]
# The hub's comparison row and its "how is this different" FAQ describe
# buying a home ALONE (owner-specified), so the utility bid is allowed there only.
LH_NOT_ON_PACKAGE_PAGES = ("utility bid", r"\bbid\b|\bcontractor\b|site visit|visits your property")


# SEO batch 1 keeps this exact Texas window, and links to the two home-only
# explainers, on the land-home pages that already have them. They are not
# unknown facts. Strip them before the banned-term scan, and require them.
LH_TEXAS_WINDOW = re.compile(
    r"In Texas, delivery and setup usually take 1[\u2013-]2 days\.?",
    re.I,
)
LH_EXPLAINER_HREFS = ("/whats-included-in-setup", "/how-pricing-works")
LH_EXPLAINER_LABELS = re.compile(
    r"/whats-included-in-setup|/how-pricing-works|What['’]s Included in Setup|How Pricing Works|What['’]s included in setup",
    re.I,
)


def lh_without_approved(text):
    text = LH_TEXAS_WINDOW.sub(" ", text)
    return LH_EXPLAINER_LABELS.sub(" ", text)


def step_land_home_unknowns():
    problems = []
    for path in land_home_paths():
        status, html = fetch_status(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        visible = visible_main_text(html)
        if not LH_TEXAS_WINDOW.search(visible):
            problems.append(f"  {path}: missing the Texas 1–2 day delivery line")
        for href in LH_EXPLAINER_HREFS:
            if f'href="{href}"' not in html:
                problems.append(f"  {path}: missing link {href}")
        text = "\n".join([
            lh_without_approved(visible),
            lh_without_approved(page_meta_text(html)),
            lh_without_approved(json.dumps(main_jsonld(html), ensure_ascii=False)),
        ])
        rules = list(LH_BANNED)
        if path != LAND_HOME_HUB:
            rules.append(LH_NOT_ON_PACKAGE_PAGES)
        for label, rx in rules:
            m = re.search(rx, text, re.I)
            if m:
                ctx = text[max(0, m.start() - 60): m.end() + 60].replace("\n", " ")
                problems.append(f"  {path}: {label}: {m.group(0)!r} in …{ctx.strip()}…")
    ok = not problems
    detail = problems[:40] or [f"{len(land_home_paths())} pages (main content, title/meta/keywords, schema): none of the unknown or banned terms."]
    return report("13e. Land-Home pages state no unknowns", ok, detail)


# 13f — every package payment: est. + (i) + package footnote; package
# disclosure only (no insurance or site-work sentence).
def step_land_home_payments():
    problems = []
    src = (REPO_ROOT / "lib" / "disclaimers.ts").read_text()
    m = re.search(r"PACKAGE_PAYMENT_DISCLOSURE = \{.*?body:\s*'((?:[^'\\]|\\.)*)'", src, re.S)
    if not m:
        return report("13f. Package payments: est. + (i) + footnote", False, ["  PACKAGE_PAYMENT_DISCLOSURE.body not found in lib/disclaimers.ts"])
    pkg_body = m.group(1)
    if re.search(r"insurance|deliver|set[- ]?up|site work|\d+(\.\d+)?\s*%|\d+[- ]year", pkg_body, re.I):
        problems.append("  PACKAGE_PAYMENT_DISCLOSURE.body states insurance, delivery/setup, site work, a rate or a term")
    if "NEEDS LENDER/COMPLIANCE APPROVAL" not in src:
        problems.append("  PACKAGE_PAYMENT_DISCLOSURE isn't marked [NEEDS LENDER/COMPLIANCE APPROVAL]")
    home_only = ["The estimate includes insurance.", "Site work your land requires"]
    n_pkgs = len(land_home_package_paths())
    expected = {LAND_HOME_FLORESVILLE: n_pkgs, LAND_HOME_HUB: n_pkgs}
    total = 0
    for path in land_home_paths():
        status, html = fetch_status(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        body = re.sub(r"<script.*?</script>|<select.*?</select>|<!-- -->", "", html, flags=re.S)
        blocks = list(PAY_BLOCK_RE.finditer(body))
        want = expected.get(path, 1)
        if len(blocks) != want:
            problems.append(f"  {path}: {len(blocks)} payment figures, expected {want}")
        for mm in blocks:
            total += 1
            blk = mm.group(1)
            if ">est.<" not in blk or PAY_INFO_LABEL not in blk or 'type="button"' not in blk:
                problems.append(f"  {path}: payment missing 'est.' or the (i) button")
            if 'data-disclosure="package"' not in blk:
                problems.append(f"  {path}: payment's (i) dialog isn't the package disclosure (no data-disclosure=\"package\")")
            if 'data-pm="pay"' not in body[max(0, mm.start() - 400): mm.start()]:
                problems.append(f"  {path}: payment outside the payment-only container")
        bare = PAY_AMOUNT_RE.findall(PAY_BLOCK_RE.sub("", body))
        if bare:
            problems.append(f"  {path}: bare payment(s) {bare[:3]}")
        if want:
            foot = re.search(r'<p class="bmh-pay-footnote bmh-pm-pay-block" data-pm="pay"[^>]*>(.*?)</p>', body, re.S)
            if not foot or pkg_body[:80] not in re.sub(r"<[^>]+>", "", foot.group(1)).replace("&#x27;", "'"):
                problems.append(f"  {path}: package footnote missing or not the package disclosure")
        for s in home_only:
            if s in html:
                problems.append(f"  {path}: contains the homes-only disclosure sentence {s!r}")
    ok = not problems and total > 0
    detail = problems[:40] or [f"{total} package payments: each with 'est.', the (i) button, inside payment mode, and the package footnote; no insurance or site-work sentence; disclosure marked for approval."]
    return report("13f. Package payments: est. + (i) + footnote", ok, detail)


# 13g — photos on the new pages: only the approved image path(s) from
# lib/packages.ts (today the one example image under /land-home/); no
# filename, alt text or markup that names a home or manufacturer; no
# "coming soon" text; no og:image.
def approved_package_images():
    src = (REPO_ROOT / "lib" / "packages.ts").read_text()
    return set(re.findall(r"src: '(/land-home/[^']+)'", src))


def home_and_maker_names():
    """Names that must never appear in land-home image markup: each home's
    title word ("The Austin" -> "austin"), its photo folder's first word
    (e.g. "jasper"), and every manufacturer in lib/sampleListings.ts."""
    src = (REPO_ROOT / "lib" / "sampleListings.ts").read_text()
    names = set()
    for t in re.findall(r"\n    title: '([^']+)'", src):
        names.add(re.sub(r"^the\s+", "", t.lower()).strip())
    for m in re.findall(r"\n    manufacturer: '([^']+)'", src):
        names.add(m.lower().strip())
    for folder in re.findall(r"'/homes/([a-z0-9-]+)/", src):
        names.add(folder.split("-")[0])
    names.update({"cavco", "fleetwood", "palm harbor", "clayton", "champion", "jasper", "marathon"})
    return {n for n in names if len(n) >= 4}


def step_land_home_images():
    problems = []
    approved = approved_package_images()
    names = home_and_maker_names()
    for img in approved:
        f = REPO_ROOT / "public" / img.lstrip("/")
        if not f.exists():
            problems.append(f"  {img}: approved image file is missing")
        elif f.stat().st_size > 800 * 1024:
            problems.append(f"  {img}: {f.stat().st_size // 1024}KB (max 800KB)")
    if not approved:
        problems.append("  lib/packages.ts has no approved /land-home/ image")
    for path in land_home_paths():
        status, html = fetch_status(path)
        if status != 200:
            problems.append(f"  {path}: HTTP {status}")
            continue
        main = main_content(html)
        tags = re.findall(r"<(?:img|source)\b[^>]*>", main, re.I)
        if path != LAND_HOME_HUB and path != LAND_HOME_FLORESVILLE and not tags:
            problems.append(f"  {path}: no photo on the package page")
        for tag in tags:
            for attr in ("src", "srcset", "srcSet"):
                for val in re.findall(rf'\b{attr}="([^"]*)"', tag):
                    for url in re.split(r",\s*", val):
                        u = url.split(" ")[0]
                        u = re.sub(r"^/_next/image\?url=([^&]+).*$", lambda m: urllib.request.unquote(m.group(1)), u)
                        if u and u not in approved:
                            problems.append(f"  {path}: image {u!r} isn't an approved land-home image")
            low = tag.lower()
            for n in names:
                if re.search(rf"\b{re.escape(n)}\b", low):
                    problems.append(f"  {path}: image markup names {n!r}: {tag[:120]}")
        if re.search(r"<video\b|background-image", main, re.I):
            problems.append(f"  {path}: video or background image in the page content")
        if re.search(r"coming\s+soon", visible_main_text(html) + main, re.I):
            problems.append(f"  {path}: 'coming soon' text")
        if re.search(r'property="og:image"|name="twitter:image"', html):
            problems.append(f"  {path}: has an og:image/twitter:image (the photo is a stand-in)")
    ok = not problems
    detail = problems[:40] or [f"{len(land_home_paths())} pages: photos use only {sorted(approved)} (≤800KB); no image file, alt or markup names a home or manufacturer ({len(names)} names checked); no 'coming soon'; no og:image."]
    return report("13g. Land-Home photos: approved image only, no names", ok, detail)


# 13i — hub layout: inventory before the definition, comparison last; hub
# title/meta/H1 statewide; packages never on /browse.
def step_land_home_hub_order():
    problems = []
    status, html = fetch_status(LAND_HOME_HUB)
    main = main_content(html)
    pos = {k: main.find(f'data-section="{k}"') for k in ("intro", "strip", "inventory", "definition", "comparison")}
    for k, v in pos.items():
        if v < 0:
            problems.append(f"  {LAND_HOME_HUB}: section {k!r} not found")
    if all(v >= 0 for v in pos.values()):
        if not (pos["intro"] < pos["strip"] < pos["inventory"] < pos["definition"] < pos["comparison"]):
            problems.append(f"  {LAND_HOME_HUB}: order is wrong (intro < strip < inventory < definition < comparison): {pos}")
        inv = main[pos["inventory"]:pos["definition"]]
        if inv.count("data-package-card") != len(land_home_package_paths()):
            problems.append(f"  {LAND_HOME_HUB}: inventory section has {inv.count('data-package-card')} package cards, expected {len(land_home_package_paths())}")
        if "bmh-explainer-lead" not in main[pos["definition"]:pos["comparison"]]:
            problems.append(f"  {LAND_HOME_HUB}: the definition isn't between the inventory and the comparison")
        if re.search(r"<section\b", main[pos["comparison"]:]):
            problems.append(f"  {LAND_HOME_HUB}: another section follows the comparison (it must be last)")
        strip = main[pos["strip"]:pos["inventory"]]
        for label in ("Turnkey", "All utilities", "Choose your own home"):
            if label not in strip:
                problems.append(f"  {LAND_HOME_HUB}: strip is missing {label!r}")
        if re.search(r"<svg(?![^>]*aria-hidden=\"true\")", strip):
            problems.append(f"  {LAND_HOME_HUB}: strip icon without aria-hidden")
    head = html.split("<body", 1)[0]
    title = re.search(r"<title>(.*?)</title>", head, re.S)
    desc = re.search(r'<meta name="description" content="([^"]*)"', head)
    h1 = re.search(r"<h1\b.*?</h1>", main, re.S)
    for label, val in (("title", title and title.group(1)), ("meta description", desc and desc.group(1)), ("H1", h1 and h1.group(0))):
        if val and "floresville" in val.lower():
            problems.append(f"  {LAND_HOME_HUB}: {label} contains 'Floresville'")
    for b in main_jsonld(html):
        if b.get("@type") == "ItemList" and "image" in json.dumps(b):
            problems.append(f"  {LAND_HOME_HUB}: ItemList has an image")
    status, browse = fetch_status("/browse")
    if "data-package-card" in browse or "Land-Home Package" in main_content(browse):
        problems.append("  /browse: shows a land-home package")
    ok = not problems
    detail = problems[:40] or ["Hub: intro → strip → Current Inventory (all package cards) → definition → … → comparison last; title, meta and H1 have no 'Floresville'; ItemList has no image; no package on /browse."]
    return report("13i. Land-Home hub order and statewide head", ok, detail)


# 13h — flag on: tab in header (desktop + mobile) and footer, pages in the
# sitemap and llms.txt.
def step_land_home_flag_on():
    problems = []
    status, html = fetch_status("/")
    header = re.search(r"<header.*?</header>", html, re.S)
    footer = re.search(r"<footer.*?</footer>", html, re.S)
    n_header = len(re.findall(rf'href="{LAND_HOME_HUB}"[^>]*>{LAND_HOME_NAV_LABEL}<', header.group(0) if header else ""))
    if n_header != 2:
        problems.append(f"  /: {n_header} header links (expected desktop + mobile = 2)")
    if not footer or not re.search(rf'href="{LAND_HOME_HUB}"[^>]*>{LAND_HOME_NAV_LABEL}<', footer.group(0)):
        problems.append("  /: no footer link")
    sm = fetch_status("/sitemap.xml")[1]
    for path in land_home_paths():
        if f"<loc>https://www.texashomesdirect.com{path}</loc>" not in sm:
            problems.append(f"  sitemap missing {path}")
    llms = llms_text()
    if f"https://www.texashomesdirect.com{LAND_HOME_HUB}" not in llms:
        problems.append("  /llms.txt doesn't list the land-home hub under Key Offerings")
    if re.search(r"\$\d", llms):
        problems.append("  /llms.txt has a price")
    ok = not problems
    detail = problems or [f"Flag on: tab in header (desktop + mobile) and footer; {len(land_home_paths())} pages in the sitemap; hub in llms.txt."]
    return report("13h. Land-Home flag on: nav, footer, sitemap, llms.txt", ok, detail)


def run_land_home_steps():
    """Flag-off checks in the repo's committed state, then the flag-on checks."""
    ok = True
    committed_on = json.loads(FEATURES_FILE.read_text()).get("landHomePackages") is True
    with LandHomeFlag(False) as off:
        if not off.ready:
            return report("13. Land-Home flag switch", False, ["  dev server didn't pick up landHomePackages=false within 120s"])
        ok &= step_land_home_flag_off()
    with LandHomeFlag(True) as on:
        if not on.ready:
            return report("13. Land-Home flag switch", False, ["  dev server didn't pick up landHomePackages=true within 120s"])
        sitemap = sitemap_paths()
        ok &= step_land_home_flag_on()
        ok &= step_land_wording_scope(sitemap)
        ok &= step_land_home_schema()
        ok &= step_land_home_faq_unique(sitemap)
        ok &= step_land_home_unknowns()
        ok &= step_land_home_payments()
        ok &= step_land_home_images()
        ok &= step_land_home_hub_order()
        ok &= step_price_claims_on_pages(land_home_paths())
    print(f"lib/features.json restored (landHomePackages={'true' if committed_on else 'false'}).")
    return ok


def step_price_claims_on_pages(paths):
    problems = []
    for path in paths:
        status, html = fetch_status(path)
        for term, sentence in price_claim_problems(rendered_text(html)):
            problems.append(f"  {path}: {term!r} in {sentence!r}")
    ok = not problems
    return report("11j+. Cash-price claims on the Land-Home pages", ok, problems or [f"{len(paths)} Land-Home pages: no out-the-door / all-in / delivered-and-set wording."])


def main():
    check_all = "--all" in sys.argv

    ok = True
    ok &= step_generate()
    if ok:
        ok &= step_cross_city_duplication()
    ok &= step_within_page_redundancy()  # run regardless — independent signal
    ok &= step_hard_rules()
    ok &= step_price_claims_static()
    ok &= step_payment_disclosure_source()
    ok &= step_model_year_static()
    ok &= step_listing_slugs_static()
    ok &= step_youtube_ids_static()
    ok &= step_listing_prices_static()
    ok &= step_image_paths()
    ok &= step_unique_image_pairs()
    ok &= step_tsc()

    server_ok = False
    proc = None
    if ok:
        ctx = TemporaryPublishAllAuthored() if check_all else None
        try:
            if ctx:
                ctx.__enter__()
            proc, server_ok, err = start_dev_server()
            if not server_ok:
                report("8. Dev server up", False, [err])
                ok = False
            else:
                report("8. Dev server up", True, [f"Listening on {BASE}"])
                city_slugs = published_city_slugs() if not check_all else _authored_city_slugs()
                if check_all:
                    print(f"\n--all: checking every authored city ({len(city_slugs)}), not just published ones.")
                    print("lib/cities.ts is temporarily modified for this run only and will be restored exactly, even on failure.\n")
                ok &= step_word_count(city_slugs)
                ok &= step_schema_and_localhost(city_slugs)
                ok &= step_archived_routes()
                ok &= step_payment_disclosure_rendered(city_slugs)
                ok &= step_model_year_rendered()
                ok &= step_listing_urls_rendered(city_slugs)
                ok &= step_youtube_rendered(city_slugs)
                ok &= step_cash_price_rendered(city_slugs)
                ok &= step_included_by_mode()
                ok &= step_clearance_labels()
                ok &= step_price_claims_rendered()
                ok &= run_land_home_steps()
        finally:
            stop_dev_server(proc)
            if ctx:
                ctx.__exit__(None, None, None)
                print("lib/cities.ts restored to its original (pre---all) state.")
        report("12. Dev server down", True, [])
    else:
        print("\nSkipping dev-server-dependent checks (8-11) — earlier step failed.")

    print(f"\n{'#' * 76}")
    print("BATCH VALIDATION SUMMARY")
    print(f"{'#' * 76}")
    for name, step_ok, _ in results:
        print(f"  [{'PASS' if step_ok else 'FAIL'}] {name}")
    print()
    if ok:
        print("PUBLISHABLE — every check passed. Review with the user, then flip")
        print("published:true for approved cities and follow the rest of the batch")
        print("workflow (regenerate, re-check, commit/deploy only on fresh instruction).")
    else:
        print("NOT PUBLISHABLE — fix the failing step(s) above and re-run.")
    return 0 if ok else 1


def _authored_city_slugs():
    sys.path.insert(0, str(REPO_ROOT / "scripts"))
    from write_city_content import CITY_COPY  # noqa: E402

    return list(CITY_COPY.keys())


if __name__ == "__main__":
    sys.exit(main())
