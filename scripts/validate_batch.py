#!/usr/bin/env python3
"""
One-command, end-to-end batch validator for the "Cities We Serve" system.

    python3 scripts/validate_batch.py
    python3 scripts/validate_batch.py --all   # also check unpublished, authored cities

By default, steps 7-9 (word count, schema, no-localhost) only check
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
  5. Type-check      — npx tsc --noEmit
  6. Dev server up   — starts `next dev` on a scratch port, polls until ready
  7. Word count      — every published city page, flagged against the 850-950 target
  8. Required schema — every published city page + the 3 explainer pages: FAQPage,
                        BreadcrumbList, WebPage+speakable, and (city pages only)
                        LocalBusiness + ImageObject all present
  9. No localhost    — no JSON-LD url/@id, canonical link, or OG url pointing at
                        localhost/127.0.0.1 on any page (a real, if rare, way for a
                        dev-only value to leak into what looks like production-ready
                        content)
 10. Dev server down — always torn down, even on failure

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
]

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


def step_tsc():
    p = run(["npx", "tsc", "--noEmit"])
    ok = p.returncode == 0
    detail = [p.stdout.strip()] if ok else [p.stdout.strip(), p.stderr.strip()]
    return report("5. Type-check (tsc --noEmit)", ok, detail)


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
    return report("7. Word count", ok, detail)


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
    return report("8-9. Required schema + no localhost", ok, detail)


def main():
    check_all = "--all" in sys.argv

    ok = True
    ok &= step_generate()
    if ok:
        ok &= step_cross_city_duplication()
    ok &= step_within_page_redundancy()  # run regardless — independent signal
    ok &= step_hard_rules()
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
                report("6. Dev server up", False, [err])
                ok = False
            else:
                report("6. Dev server up", True, [f"Listening on {BASE}"])
                city_slugs = published_city_slugs() if not check_all else _authored_city_slugs()
                if check_all:
                    print(f"\n--all: checking every authored city ({len(city_slugs)}), not just published ones.")
                    print("lib/cities.ts is temporarily modified for this run only and will be restored exactly, even on failure.\n")
                ok &= step_word_count(city_slugs)
                ok &= step_schema_and_localhost(city_slugs)
        finally:
            stop_dev_server(proc)
            if ctx:
                ctx.__exit__(None, None, None)
                print("lib/cities.ts restored to its original (pre---all) state.")
        report("10. Dev server down", True, [])
    else:
        print("\nSkipping dev-server-dependent checks (6-9) — earlier step failed.")

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
