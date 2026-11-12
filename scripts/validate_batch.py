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
        if t:
            types.add(t)
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
        for block in PAY_BLOCK_RE.findall(body):
            wrapped_total += 1
            if ">est.<" not in block or PAY_INFO_LABEL not in block or 'type="button"' not in block:
                problems.append(f"  {path}: payment wrapper missing 'est.' or the info button")
        bare = PAY_AMOUNT_RE.findall(PAY_BLOCK_RE.sub("", body))
        for amt in bare:
            problems.append(f"  {path}: payment {re.sub('<[^>]*>', '', amt)!r} rendered without 'est.' and the info button")
    if wrapped_total == 0:
        problems.append("  Found zero wrapped payments on any page — the check's patterns no longer match the markup.")
    ok = not problems
    detail = problems[:40] or [f"{wrapped_total} payment figures across {len(pages)} pages, every one with 'est.' and the info button."]
    return report("11b. Every payment shows 'est.' + info button", ok, detail)


# ─── Archived sections (lib/archived.json + lib/archived.ts) ─────────────
# While a section's flag is true, its route must not appear in the header
# nav, footer, sitemap or llms.txt, and must answer with a TEMPORARY (307)
# redirect to "/". See CLAUDE.md "Archived sections".
def archived_routes():
    flags = json.loads((REPO_ROOT / "lib" / "archived.json").read_text())
    routes = dict(re.findall(r"(\w+): '(/[^']+)'", (REPO_ROOT / "lib" / "archived.ts").read_text()))
    return {key: routes.get(key) for key, on in flags.items() if on}


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
    llms = (REPO_ROOT / "public" / "llms.txt").read_text()
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
            problems.append(f"  {route} is archived but mentioned in public/llms.txt")
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


def step_youtube_rendered():
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


def main():
    check_all = "--all" in sys.argv

    ok = True
    ok &= step_generate()
    if ok:
        ok &= step_cross_city_duplication()
    ok &= step_within_page_redundancy()  # run regardless — independent signal
    ok &= step_hard_rules()
    ok &= step_payment_disclosure_source()
    ok &= step_model_year_static()
    ok &= step_listing_slugs_static()
    ok &= step_youtube_ids_static()
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
                ok &= step_youtube_rendered()
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
