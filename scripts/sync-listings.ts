/**
 * Sync home listings from Notion into lib/sampleListings.ts.
 *
 * Production has no NOTION_TOKEN, so the live site serves lib/sampleListings.ts
 * as-is. Edits made in Notion only reach the site when this script regenerates
 * that file and the result is committed and deployed.
 *
 * What it updates, per listing:
 *   - title       ← Notion "Name"
 *   - beds/baths/sqft/wideType/model ← the matching Notion properties (only
 *     when Notion has a value; a blank Notion field never wipes the code value)
 *   - matterportUrl ← Notion "3D Tour URL" (blank or "NONE" removes the tour)
 *   - images      ← the image blocks in the Notion page body (see below)
 *   - description: if the title changed and the description names the old
 *     title, that mention is renamed too
 *
 * What it never touches on an existing listing: slug (the page URL), id,
 * price, features, status, floorplanUrl, or anything else not listed above.
 *
 * New listings: a Notion page listed in NEW_LISTINGS (with a hand-chosen
 * slug) that isn't in the file yet is created first, from Notion's name,
 * specs, model, year and status plus NEW_LISTING_DEFAULTS, with its floorplan
 * downloaded from Notion's "Floorplan URLs" into /homes/floorplans/
 * <slug>-FloorPlan.<ext>. Photos for a new listing go in /homes/<slug>/.
 * Notion pages not in NEW_LISTINGS are only reported, never added.
 *
 * Matching: each listing carries a `notionId` (the Notion page ID). Fleetwood
 * pages have no Slug in Notion, and their Notion names differ from the old
 * site names, so matching by slug or title doesn't work for them. A listing
 * with no notionId falls back to matching on the Notion "Slug" property.
 *
 * Images:
 *   - A Notion image that's already on the site keeps its existing file
 *     (looked up in scripts/sync-listings.image-map.json, which maps Notion
 *     block IDs to files under public/), so nothing is re-downloaded or renamed.
 *   - A new Notion image is downloaded into the folder that listing already
 *     reads from, named <blockId>.<ext>. Anything over 800KB is converted to
 *     JPEG (quality 82, max 1600px wide) with macOS `sips`.
 *   - Order: photos already on the site keep their current order; a new photo
 *     is inserted right after the photo that precedes it in Notion (or first,
 *     if it's first in Notion). Photos removed from Notion are removed from
 *     the listing (the file stays on disk).
 *   - A listing whose Notion page has no image blocks keeps its images.
 *   - IMAGE_LOCK listings keep their images untouched; PINNED_IMAGES are kept
 *     even though they aren't in Notion (at the front; KEEP_IMAGES keeps them
 *     in place instead); SKIPPED_IMAGE_BLOCKS are Notion
 *     photos deliberately left off the site. All explained inline below.
 *
 * Usage:
 *   npm run sync:listings            # sync, then run the image-path validator
 *   npm run sync:listings -- --dry-run   # show what would change, write nothing
 *   npm run sync:listings -- --only=slug1,slug2   # limit the run to those listings
 *
 * Requires NOTION_TOKEN (and optionally NOTION_DATA_SOURCE_ID) in .env.local.
 * The token is only read from the environment and is never printed.
 */

import { Client, isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const DRY_RUN = process.argv.includes('--dry-run')
/** --only=slug1,slug2 limits a run to those listings (everything else is left untouched). */
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice('--only='.length).split(',').filter(Boolean)
const DATA_SOURCE_ID =
  process.env.NOTION_DATA_SOURCE_ID ?? '34f1b269-5e7f-4cbc-8cee-464089b17143'
const REPO_ROOT = path.join(import.meta.dirname, '..')
const LISTINGS_PATH = path.join(REPO_ROOT, 'lib', 'sampleListings.ts')
const IMAGE_MAP_PATH = path.join(import.meta.dirname, 'sync-listings.image-map.json')
const PUBLIC_ROOT = path.join(REPO_ROOT, 'public')
const MAX_IMAGE_BYTES = 800 * 1024

/**
 * Listings whose photos are not synced from Notion. Names, specs and tours
 * still sync.
 */
const IMAGE_LOCK: Record<string, string> = {
  // Notion's page body only has floorplan images for this home; the site's
  // real photos aren't in Notion.
  'marathon-katy-3bed-2bath-single-wide': 'Notion only has floorplans',
  // As of 2026-10-09 Notion and the site disagree on which photo set belongs
  // to which model for these two (Notion's Daniel page mixes two different
  // homes). Held until the owner confirms which is right — remove these
  // entries once Notion is corrected. (Wood Duck/Coleman were held too until
  // the owner confirmed Notion is right for both on 2026-10-09.)
  'marathon-daniel-1bed-1bath-park-model': 'photo sets disputed (Daniel/Chapman)',
  'marathon-chapman-1bed-1bath-park-model': 'photo sets disputed (Daniel/Chapman)',
  // Its only Notion image is the floorplan itself; the listing shows the
  // floorplan once (as both its single image and floorplanUrl), not twice.
  '2876-5bed-3bath-double-wide': 'floorplan only',
}

/** Notion image blocks deliberately left off the site, by block ID. */
const SKIPPED_IMAGE_BLOCKS: Record<string, string> = {
  // The Seguin's two 600x350 bathroom photos — too low-resolution for the gallery.
  '3f9875ae-20d8-80ef-83b7-e8dd89499356': 'The Seguin bathroom, 600x350',
  '3f9875ae-20d8-809a-a0ac-e532ecca575b': 'The Seguin bathroom, 600x350',
  // The Quitman's five small photos added in Notion in October 2026 (360-482px wide).
  '3fe875ae-20d8-8098-8f83-fa17c536ab5e': 'The Quitman empty room, 360x466',
  '3fe875ae-20d8-8006-9410-ccaa77f7e1b2': 'The Quitman empty room, 360x478',
  '3fe875ae-20d8-8070-a4ff-fcc922e80138': 'The Quitman empty room, 360x480',
  '3fe875ae-20d8-8044-aef8-e1d5b6092711': 'The Quitman hallway, 360x474',
  '3fe875ae-20d8-80e9-b861-c82df851ee4f': 'The Quitman living room, 482x360',
}

/**
 * Notion pages to add to the site as new listings, keyed by Notion page ID.
 * The slug is chosen by hand (it's the page URL and never changes after
 * this). Convention: <model>-<beds>bed-<baths>bath-<single-wide|double-wide>,
 * no manufacturer name, no city name (city names belong to the
 * /mobile-homes-<city>-tx pages). A listing on this list that isn't in
 * lib/sampleListings.ts yet is created from Notion with NEW_LISTING_DEFAULTS,
 * its floorplan is downloaded, and then the normal sync fills in its tour and
 * photos. Entries already in the file are just synced like any other listing.
 */
const NEW_LISTINGS: Record<string, { slug: string }> = {
  '3f9875ae-20d8-805c-98ce-cb9717b4e27b': { slug: 'jade-3bed-2bath-single-wide' }, // The Seguin (Cavco)
  '3f9875ae-20d8-807c-881a-c7a2dab7084c': { slug: 'jasper-4bed-2bath-double-wide' }, // The Austin (Cavco)
  '3fa875ae-20d8-8070-ab7f-f578fd97a8dc': { slug: '2876-5bed-3bath-double-wide' }, // The Lampasas (Cavco)
}

/**
 * Values a new listing gets regardless of what Notion says: every listing on
 * the site is "Call for price" with no monthly estimate, and the cards show
 * "Texas Homes Direct" as the maker (as Marathon listings do).
 */
const NEW_LISTING_DEFAULTS = {
  manufacturer: 'Texas Homes Direct',
  region: 'South TX',
  status: 'Active', // used when Notion's Status is blank
}

/**
 * Site-only lead photos kept at the front of the gallery even though they
 * aren't in Notion (hero exteriors added directly to the site).
 */
const PINNED_IMAGES: Record<string, string[]> = {
  'marathon-gadwall-3bed-2bath-double-wide': ['/homes/the-gadwall/Gadwall-Hero.jpg'],
  'marathon-spoonbill-3bed-2bath-single-wide': ['/homes/the-spoonbill/Spoonbill-Hero.jpg'],
  'marathon-terra-2bed-1bath-park-model': ['/homes/the-terra/Terra-Hero.jpg'],
}

/**
 * Site-only photos kept where they are in the gallery even though Notion no
 * longer has them (unlike PINNED_IMAGES, they aren't forced to the front).
 */
const KEEP_IMAGES: Record<string, string[]> = {
  // Owner kept these when Notion replaced them in October 2026: the old main
  // exterior, the bedroom, and the two delivered-exterior shots.
  'marathon-brewster-3bed-2bath-double-wide': [
    '/homes/the-brewster/Brewster-Body-1.jpg',
    '/homes/the-brewster/Brewster-Body-2.png',
    '/homes/the-brewster/Brewster-Body-3.webp',
    '/homes/the-brewster/Brewster-Body-6.webp',
  ],
}

const WIDE_TYPES = ['Single Wide', 'Double Wide', 'Triple Wide']

if (!process.env.NOTION_TOKEN) {
  console.error('NOTION_TOKEN is not set. Add it to .env.local (see scripts/sync-notion-images.ts for setup).')
  process.exit(1)
}
const notion = new Client({ auth: process.env.NOTION_TOKEN })

// ---------------------------------------------------------------------------
// Notion helpers
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProp = any

function propText(page: PageObjectResponse, name: string): string {
  const p: AnyProp = (page.properties as Record<string, AnyProp>)[name]
  if (!p) return ''
  if (p.type === 'title') return p.title.map((t: AnyProp) => t.plain_text).join('').trim()
  if (p.type === 'rich_text') return p.rich_text.map((t: AnyProp) => t.plain_text).join('').trim()
  if (p.type === 'select') return (p.select?.name ?? '').trim()
  if (p.type === 'url') return (p.url ?? '').trim()
  if (p.type === 'unique_id' && p.unique_id.number != null)
    return `${p.unique_id.prefix ? p.unique_id.prefix + '-' : ''}${p.unique_id.number}`
  return ''
}

function propNum(page: PageObjectResponse, name: string): number | null {
  const p: AnyProp = (page.properties as Record<string, AnyProp>)[name]
  return p?.type === 'number' && typeof p.number === 'number' ? p.number : null
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if ((err as { status?: number }).status === 429 && attempt <= 5) {
        await new Promise((r) => setTimeout(r, attempt * 1000))
        continue
      }
      throw err
    }
  }
}

async function fetchPages(): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined
  do {
    const resp = await withRetry(() =>
      notion.dataSources.query({ data_source_id: DATA_SOURCE_ID, start_cursor: cursor, page_size: 100 })
    )
    for (const p of resp.results) if (isFullPage(p)) pages.push(p)
    cursor = resp.has_more ? resp.next_cursor ?? undefined : undefined
  } while (cursor)
  return pages
}

interface NotionImage {
  blockId: string
  url: string
}

/** Image blocks in page-body order, including ones nested in columns/toggles. */
async function imageBlocks(blockId: string, out: NotionImage[] = []): Promise<NotionImage[]> {
  let cursor: string | undefined
  do {
    const resp: AnyProp = await withRetry(() =>
      notion.blocks.children.list({ block_id: blockId, start_cursor: cursor, page_size: 100 })
    )
    for (const b of resp.results) {
      if (b.type === 'image') {
        const url = b.image.type === 'file' ? b.image.file.url : b.image.external.url
        out.push({ blockId: b.id, url })
      }
      if (b.has_children) await imageBlocks(b.id, out)
    }
    cursor = resp.has_more ? resp.next_cursor : undefined
  } while (cursor)
  return out
}

// ---------------------------------------------------------------------------
// Image download + compression
// ---------------------------------------------------------------------------

function findExistingBlockFile(dirAbs: string, blockId: string): string | null {
  if (!fs.existsSync(dirAbs)) return null
  const hit = fs.readdirSync(dirAbs).find((f) => path.parse(f).name === blockId)
  return hit ? path.join(dirAbs, hit) : null
}

/**
 * Downloads one Notion image into dirAbs as <blockId>.<ext>. Notion's file
 * URLs are presigned and expire in minutes, so this runs immediately for
 * each block rather than collecting URLs to download later.
 */
async function downloadImage(img: NotionImage, dirAbs: string, baseName = img.blockId): Promise<string> {
  const res = await fetch(img.url)
  if (!res.ok) throw new Error(`download failed (${res.status}) for block ${img.blockId}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const ext = (new URL(img.url).pathname.match(/\.(jpe?g|png|webp|gif)$/i)?.[1] ?? 'jpg').toLowerCase()
  fs.mkdirSync(dirAbs, { recursive: true })
  let fileAbs = path.join(dirAbs, `${baseName}.${ext}`)
  fs.writeFileSync(fileAbs, buf)

  if (buf.length > MAX_IMAGE_BYTES) {
    const jpgAbs = path.join(dirAbs, `${baseName}.jpg`)
    const width = Number(
      execFileSync('sips', ['-g', 'pixelWidth', fileAbs]).toString().match(/pixelWidth: (\d+)/)?.[1] ?? 0
    )
    const args = ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82']
    if (width > 1600) args.push('--resampleWidth', '1600')
    execFileSync('sips', [...args, fileAbs, '--out', jpgAbs], { stdio: 'ignore' })
    if (jpgAbs !== fileAbs) fs.unlinkSync(fileAbs)
    fileAbs = jpgAbs
    // Still too big (rare): step quality down until it fits.
    for (let q = 72; fs.statSync(fileAbs).size > MAX_IMAGE_BYTES && q >= 42; q -= 10) {
      execFileSync('sips', ['-s', 'formatOptions', String(q), fileAbs], { stdio: 'ignore' })
    }
  }
  return '/' + path.relative(PUBLIC_ROOT, fileAbs).split(path.sep).join('/')
}

// ---------------------------------------------------------------------------
// sampleListings.ts editing (surgical — only the fields this script owns)
// ---------------------------------------------------------------------------

interface Block {
  start: number
  end: number
  text: string
}

function findBlock(src: string, slug: string): Block | null {
  const at = src.indexOf(`    slug: '${slug}',`)
  if (at < 0) return null
  const start = src.lastIndexOf('\n  {\n', at) + 1
  const end = src.indexOf('\n  },', at) + '\n  },'.length
  return { start, end, text: src.slice(start, end) }
}

const q = (s: string) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const unq = (s: string) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\')

function getStr(block: string, field: string): string | undefined {
  const m = block.match(new RegExp(`\\n    ${field}: '((?:[^'\\\\]|\\\\.)*)',`))
  return m ? unq(m[1]) : undefined
}

function getNum(block: string, field: string): number | undefined {
  const m = block.match(new RegExp(`\\n    ${field}: (\\d+(?:\\.\\d+)?),`))
  return m ? Number(m[1]) : undefined
}

function getImages(block: string): string[] {
  const m = block.match(/\n {4}images: \[([\s\S]*?)\],/)
  return m ? Array.from(m[1].matchAll(/'([^']+)'/g), (x) => x[1]) : []
}

/** Replace a `    field: value,` line, or insert it after `afterField` if missing. */
function setLine(block: string, field: string, value: string, afterField: string): string {
  const re = new RegExp(`\\n    ${field}: (?:'(?:[^'\\\\]|\\\\.)*'|[^\\n]*),`)
  const line = `\n    ${field}: ${value},`
  if (re.test(block)) return block.replace(re, () => line)
  const after = new RegExp(`(\\n    ${afterField}: [^\\n]*)`)
  return block.replace(after, (m) => m + line)
}

function removeLine(block: string, field: string): string {
  return block.replace(new RegExp(`\\n    ${field}: [^\\n]*,`), '')
}

function setImages(block: string, images: string[]): string {
  const body = images.map((i) => `      ${q(i)},`).join('\n')
  return block.replace(/\n {4}images: \[[\s\S]*?\],/, () => `\n    images: [\n${body}\n    ],`)
}

// ---------------------------------------------------------------------------
// Creating new listings (NEW_LISTINGS)
// ---------------------------------------------------------------------------

/** First file in Notion's "Floorplan URLs" files property, if any. */
function floorplanFile(page: PageObjectResponse): NotionImage | null {
  const p: AnyProp = (page.properties as Record<string, AnyProp>)['Floorplan URLs']
  const f = p?.type === 'files' ? p.files[0] : undefined
  if (!f) return null
  return { blockId: `floorplan-${page.id}`, url: f.type === 'file' ? f.file.url : f.external.url }
}

/**
 * Builds the source text for a brand-new listing. Only facts Notion states
 * (name, specs, model, year, status) plus NEW_LISTING_DEFAULTS; the
 * description and features are generated from the specs alone. Title, specs,
 * tour and photos are then kept current by the normal sync pass.
 */
function newListingSource(page: PageObjectResponse, slug: string, floorplanUrl: string | undefined): string {
  const title = propText(page, 'Name')
  const beds = propNum(page, 'Bedrooms') ?? 0
  const baths = propNum(page, 'Bathrooms') ?? 0
  const sqft = propNum(page, 'Square Feet') ?? 0
  const wide = WIDE_TYPES.includes(propText(page, 'Type')) ? propText(page, 'Type') : ''
  const statuses = ['Active', 'Pending', 'Sold', 'Coming Soon']
  const status = statuses.includes(propText(page, 'Status')) ? propText(page, 'Status') : NEW_LISTING_DEFAULTS.status
  const id = propText(page, 'Listing ID') || page.id
  const model = propText(page, 'Model')
  const year = propNum(page, 'Year Built') ?? new Date().getFullYear()
  const sqftText = sqft.toLocaleString('en-US')
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
  const wideWord = wide === 'Single Wide' ? 'singlewide' : wide === 'Double Wide' ? 'doublewide' : 'manufactured home'
  const description = `${title} is a ${sqftText} square foot ${wideWord} with ${plural(beds, 'bed')} and ${plural(baths, 'bath')}.`
  const features = [`${beds} Bed / ${baths} Bath`, `${sqftText} Sq Ft`, 'Delivery', 'Setup', 'AC', 'Trim Out', 'Wood Steps', 'Tax', 'Title']
  const images = IMAGE_LOCK[slug] === 'floorplan only' && floorplanUrl ? [floorplanUrl] : []

  const lines = [
    `  // ─── ${id} · ${title} ─────────────────────────────────────────────`,
    `  {`,
    `    id: ${q(id)},`,
    `    slug: ${q(slug)},`,
    `    notionId: ${q(page.id)},`,
    `    title: ${q(title)},`,
    `    manufacturer: ${q(NEW_LISTING_DEFAULTS.manufacturer)},`,
    ...(model ? [`    model: ${q(model)},`] : []),
    `    price: 0,`,
    `    beds: ${beds},`,
    `    baths: ${baths},`,
    `    sqft: ${sqft},`,
    `    year: ${year},`,
    `    type: 'new',`,
    ...(wide ? [`    wideType: ${q(wide)},`] : []),
    `    region: ${q(NEW_LISTING_DEFAULTS.region)},`,
    `    city: '',`,
    `    images: [`,
    ...images.map((i) => `      ${q(i)},`),
    `    ],`,
    `    features: [${features.map(q).join(', ')}],`,
    `    description:`,
    `      ${q(description)},`,
    `    monthlyPayment: 0,`,
    `    downPayment: 0,`,
    `    available: true,`,
    `    hudCertified: true,`,
    `    featured: false,`,
    `    status: ${q(status)},`,
    ...(floorplanUrl ? [`    floorplanUrl: ${q(floorplanUrl)},`] : []),
    `  },`,
  ]
  return lines.join('\n')
}

/** Appends any NEW_LISTINGS entry that isn't in the file yet. Returns the new source. */
async function addNewListings(src: string, byId: Map<string, PageObjectResponse>, log: string[]): Promise<string> {
  for (const [notionId, { slug }] of Object.entries(NEW_LISTINGS)) {
    if (ONLY && !ONLY.includes(slug)) continue
    const hasId = src.includes(`    notionId: '${notionId}',`)
    const hasSlug = src.includes(`    slug: '${slug}',`)
    if (hasId && hasSlug) continue
    if (hasId || hasSlug) throw new Error(`NEW_LISTINGS ${slug}: slug or notionId already used by another listing`)
    const page = byId.get(notionId)
    if (!page) throw new Error(`NEW_LISTINGS ${slug}: Notion page ${notionId} not found`)

    let floorplanUrl: string | undefined
    const fp = floorplanFile(page)
    if (fp) {
      floorplanUrl = DRY_RUN
        ? `/homes/floorplans/${slug}-FloorPlan.(new)`
        : await downloadImage(fp, path.join(PUBLIC_ROOT, 'homes', 'floorplans'), `${slug}-FloorPlan`)
    }
    const entry = newListingSource(page, slug, floorplanUrl)
    const end = src.indexOf('\n]\n\nexport const featuredListings')
    if (end < 0) throw new Error('could not find the end of the sampleListings array')
    src = src.slice(0, end) + '\n' + entry + src.slice(end)
    log.push(`- ${slug}\n    NEW listing: ${propText(page, 'Name')} (${notionId})\n    floorplan: ${floorplanUrl ?? '(none in Notion)'}`)
  }
  return src
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

/** New gallery: keep existing order, insert new Notion photos after their Notion predecessor. */
function mergeImages(current: string[], notionPaths: string[], pinned: string[], keep: string[] = []): string[] {
  const inNotion = new Set(notionPaths)
  const merged = current.filter((p) => inNotion.has(p) || pinned.includes(p) || keep.includes(p))
  notionPaths.forEach((p, i) => {
    if (merged.includes(p)) return
    const prev = notionPaths.slice(0, i).reverse().find((x) => merged.includes(x))
    const pinnedLead = merged.filter((x) => pinned.includes(x)).length
    const at = prev ? merged.indexOf(prev) + 1 : i === 0 ? pinnedLead : merged.length
    merged.splice(at, 0, p)
  })
  return merged
}

async function main() {
  const imageMap: Record<string, string> = JSON.parse(fs.readFileSync(IMAGE_MAP_PATH, 'utf8'))
  let src = fs.readFileSync(LISTINGS_PATH, 'utf8')
  const pages = await fetchPages()
  const byId = new Map(pages.map((p) => [p.id, p]))
  const bySlug = new Map(pages.filter((p) => propText(p, 'Slug')).map((p) => [propText(p, 'Slug'), p]))
  const created: string[] = []
  src = await addNewListings(src, byId, created)

  const slugs = Array.from(src.matchAll(/\n {4}slug: '([^']+)',/g), (m) => m[1])
  const matchedPageIds = new Set<string>()
  const changes: string[] = []
  const unmatched: string[] = []
  let downloaded = 0

  if (ONLY) console.log(`--only: syncing just ${ONLY.join(', ')}; every other listing is left as-is.`)
  console.log(`${DRY_RUN ? '[dry run] ' : ''}Syncing ${slugs.length} listings from Notion (${pages.length} pages)...\n`)

  for (const slug of slugs) {
    const blk = findBlock(src, slug)!
    let b = blk.text
    const notionId = getStr(b, 'notionId')
    const page = (notionId && byId.get(notionId)) || bySlug.get(slug)
    if (!page) {
      unmatched.push(slug)
      continue
    }
    matchedPageIds.add(page.id)
    if (ONLY && !ONLY.includes(slug)) continue
    const log: string[] = []

    if (notionId !== page.id) {
      b = setLine(b, 'notionId', q(page.id), 'slug')
      log.push(`notionId → ${page.id}`)
    }

    // Name (and the old name inside the description)
    const oldTitle = getStr(b, 'title')
    const newTitle = propText(page, 'Name')
    if (newTitle && oldTitle && newTitle !== oldTitle) {
      b = setLine(b, 'title', q(newTitle), 'slug')
      const descRe = /(\n {4}description:\n? *')((?:[^'\\]|\\.)*)(')/
      b = b.replace(descRe, (_m, a: string, body: string, c: string) =>
        a + q(unq(body).split(oldTitle).join(newTitle)).slice(1, -1) + c
      )
      log.push(`name: ${oldTitle} → ${newTitle}`)
    }

    // Specs
    for (const [field, prop] of [['beds', 'Bedrooms'], ['baths', 'Bathrooms'], ['sqft', 'Square Feet']] as const) {
      const v = propNum(page, prop)
      if (v !== null && v !== getNum(b, field)) {
        log.push(`${field}: ${getNum(b, field)} → ${v}`)
        b = setLine(b, field, String(v), 'slug')
      }
    }
    const wide = propText(page, 'Type')
    if (WIDE_TYPES.includes(wide) && wide !== getStr(b, 'wideType')) {
      log.push(`wideType: ${getStr(b, 'wideType')} → ${wide}`)
      b = setLine(b, 'wideType', q(wide), 'type')
    }
    const model = propText(page, 'Model')
    if (model && model !== getStr(b, 'model')) {
      log.push(`model: ${getStr(b, 'model') ?? '(none)'} → ${model}`)
      b = setLine(b, 'model', q(model), 'manufacturer')
    }

    // 3D tour
    const tourRaw = propText(page, '3D Tour URL')
    const tour = /^https?:\/\//i.test(tourRaw) ? tourRaw : ''
    const oldTour = getStr(b, 'matterportUrl') ?? ''
    if (tour !== oldTour) {
      b = tour ? setLine(b, 'matterportUrl', q(tour), 'status') : removeLine(b, 'matterportUrl')
      log.push(`tour: ${oldTour || '(none)'} → ${tour || '(none)'}`)
    }

    // Images
    if (IMAGE_LOCK[slug]) {
      log.push(`images: locked (${IMAGE_LOCK[slug]})`)
    } else {
      const blocks = await imageBlocks(page.id)
      const current = getImages(b)
      if (blocks.length > 0) {
        const photoDir =
          current.map((p) => path.posix.dirname(p)).find((d) => d !== '/homes/floorplans') ?? `/homes/${slug}`
        const dirAbs = path.join(PUBLIC_ROOT, photoDir)
        const notionPaths: string[] = []
        for (const img of blocks) {
          if (SKIPPED_IMAGE_BLOCKS[img.blockId]) continue
          let p = imageMap[img.blockId]
          if (!p) {
            const existing = findExistingBlockFile(dirAbs, img.blockId)
            if (existing) p = '/' + path.relative(PUBLIC_ROOT, existing).split(path.sep).join('/')
          }
          if (!p) {
            if (DRY_RUN) p = `${photoDir}/${img.blockId}.(new)`
            else {
              p = await downloadImage(img, dirAbs)
              downloaded++
            }
          }
          if (!DRY_RUN) imageMap[img.blockId] = p
          if (!notionPaths.includes(p)) notionPaths.push(p) // Notion sometimes repeats a block's image
        }
        const merged = mergeImages(current, notionPaths, PINNED_IMAGES[slug] ?? [], KEEP_IMAGES[slug] ?? [])
        if (JSON.stringify(merged) !== JSON.stringify(current)) {
          const added = merged.filter((p) => !current.includes(p))
          const removed = current.filter((p) => !merged.includes(p))
          b = setImages(b, merged)
          log.push(`images: ${current.length} → ${merged.length} (+${added.length} added, −${removed.length} no longer in Notion)`)
          if (merged[0] !== current[0]) log.push(`  main photo: ${current[0] ?? '(none)'} → ${merged[0]}`)
          for (const p of added) log.push(`  + ${p}`)
          for (const p of removed) log.push(`  − ${p}`)
        }
      }
    }

    if (b !== blk.text) src = src.slice(0, blk.start) + b + src.slice(blk.end)
    if (log.length) changes.push(`- ${slug}\n    ${log.join('\n    ')}`)
  }

  if (created.length) console.log(created.join('\n') + '\n')
  console.log(changes.length ? changes.join('\n') : 'Everything already matches Notion.')
  if (unmatched.length) console.log(`\nListings with no matching Notion page (left as-is):\n  ${unmatched.join('\n  ')}`)
  const orphans = pages.filter((p) => !matchedPageIds.has(p.id))
  if (orphans.length) {
    console.log(`\nNotion pages not on the site (not added — new listings need a slug chosen by hand):`)
    for (const p of orphans) console.log(`  - ${propText(p, 'Name') || '(untitled)'} [${propText(p, 'Manufacturer') || 'no manufacturer'}] ${p.id}`)
  }

  if (DRY_RUN) {
    console.log('\n[dry run] nothing written.')
    return
  }
  fs.writeFileSync(LISTINGS_PATH, src)
  fs.writeFileSync(IMAGE_MAP_PATH, JSON.stringify(imageMap, null, 2) + '\n')
  console.log(`\nWrote lib/sampleListings.ts (${changes.length} listing(s) changed, ${downloaded} image(s) downloaded).`)

  // Same check validate_batch.py runs as step 5.
  console.log('\nRunning the image-path validator...')
  execFileSync(
    'python3',
    ['-c', 'import sys; sys.path.insert(0, "scripts"); import validate_batch as v; sys.exit(0 if v.step_image_paths() else 1)'],
    { cwd: REPO_ROOT, stdio: 'inherit' }
  )
}

main().catch((err) => {
  console.error('\nSync failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
