/**
 * Sync listing photos out of Notion and into /public/homes/<slug>/.
 *
 * Notion stores most listing photos as native image blocks pasted directly
 * into the page body (not in the "Image URLs" property), and the file URLs
 * Notion hands back for those blocks are presigned S3 links that expire in
 * about 5 minutes. This script walks each listing page's block tree and
 * downloads every image it finds immediately, in the same pass, before that
 * signature can expire — it never collects a batch of URLs to download later.
 *
 * Re-run this any time you add photos in Notion. Each image block keeps its
 * own stable Notion block ID for its whole life, so this script uses that ID
 * as the local filename: already-downloaded blocks are detected on disk and
 * skipped, and only newly added blocks get downloaded. Nothing is ever
 * downloaded twice, and nothing already on disk is touched or renamed.
 *
 * Texas Homes Direct only sells Marathon Homes inventory, so this only
 * processes pages where the Manufacturer property is "Marathon Homes" —
 * other manufacturers in the shared BMH database are skipped entirely and
 * never get a folder created for them.
 *
 * Usage:
 *   node --env-file=.env.local scripts/sync-notion-images.ts
 *
 * Requires NOTION_TOKEN in .env.local (an internal integration token from
 * https://www.notion.so/my-integrations, shared with the "BMH — Home
 * Listings" database).
 */

import { Client, isFullPage } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import fs from 'node:fs/promises'
import path from 'node:path'

const NOTION_TOKEN = process.env.NOTION_TOKEN
const DATA_SOURCE_ID =
  process.env.NOTION_DATA_SOURCE_ID ?? '34f1b269-5e7f-4cbc-8cee-464089b17143'

if (!NOTION_TOKEN) {
  console.error(
    [
      'NOTION_TOKEN is not set.',
      '',
      'This script needs its own Notion internal integration token (separate from',
      'any chat/assistant Notion connection) so it can be re-run on its own or on',
      'a schedule. To fix:',
      '  1. Go to https://www.notion.so/my-integrations and create (or reuse) an',
      '     internal integration. Give it "Read content" access.',
      '  2. Open the "BMH — Home Listings" database in Notion, click "..." → ',
      '     "Connections", and add that integration.',
      '  3. Copy the integration\'s "Internal Integration Secret" into this',
      '     project\'s .env.local as NOTION_TOKEN=secret_xxx...',
      '  4. Re-run: node --env-file=.env.local scripts/sync-notion-images.ts',
    ].join('\n')
  )
  process.exit(1)
}

const notion = new Client({ auth: NOTION_TOKEN })

const REPO_ROOT = path.join(import.meta.dirname, '..')
const HOMES_ROOT = path.join(REPO_ROOT, 'public', 'homes')
const MANIFEST_PATH = path.join(REPO_ROOT, 'lib', 'generated', 'listingImages.json')

interface ManifestEntry {
  slug: string
  name: string
  images: string[]
  syncedAt: string
}
type Manifest = Record<string, ManifestEntry>

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Retry Notion API calls on 429 (rate limit), honoring Retry-After when present. */
async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  let attempt = 0
  for (;;) {
    try {
      return await fn()
    } catch (err) {
      const status = (err as { status?: number })?.status
      attempt++
      if (status === 429 && attempt <= 5) {
        const retryAfter = (err as { headers?: Record<string, string> })?.headers?.[
          'retry-after'
        ]
        const waitMs = retryAfter ? Number(retryAfter) * 1000 : attempt * 1000
        console.warn(`  ! rate limited on ${label}, waiting ${waitMs}ms (attempt ${attempt})`)
        await sleep(waitMs)
        continue
      }
      throw err
    }
  }
}

function plainText(name: string, page: PageObjectResponse): string {
  const p = (page.properties as Record<string, unknown>)[name] as
    | { type: string; title?: Array<{ plain_text: string }>; rich_text?: Array<{ plain_text: string }> }
    | undefined
  if (!p) return ''
  if (p.type === 'title') return (p.title ?? []).map((t) => t.plain_text).join('')
  if (p.type === 'rich_text') return (p.rich_text ?? []).map((t) => t.plain_text).join('')
  return ''
}

function selectValue(name: string, page: PageObjectResponse): string {
  const p = (page.properties as Record<string, unknown>)[name] as
    | { type: string; select?: { name?: string } }
    | undefined
  if (!p || p.type !== 'select') return ''
  return p.select?.name ?? ''
}

function extFromResponse(url: string, contentType: string | null): string {
  try {
    const base = new URL(url).pathname.split('/').pop() ?? ''
    const m = base.match(/\.([a-zA-Z0-9]+)$/)
    if (m) return m[1].toLowerCase()
  } catch {
    // ignore — fall through to content-type sniffing
  }
  if (contentType?.includes('webp')) return 'webp'
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('gif')) return 'gif'
  if (contentType?.includes('jpeg') || contentType?.includes('jpg')) return 'jpg'
  return 'jpg'
}

/** Find any existing local file for this block ID, regardless of extension. */
async function findExisting(dirAbs: string, blockId: string): Promise<string | null> {
  let entries: string[]
  try {
    entries = await fs.readdir(dirAbs)
  } catch {
    return null
  }
  return entries.find((f) => f.startsWith(`${blockId}.`)) ?? null
}

/**
 * Download one image block's bytes RIGHT NOW (same pass the URL was fetched
 * in) and write it to disk keyed by the block's own stable ID. If a file for
 * this block ID already exists, skip the network call entirely — that block
 * was already synced on a previous run.
 */
async function downloadImageBlock(
  block: Extract<BlockObjectResponse, { type: 'image' }>,
  dirAbs: string
): Promise<{ filename: string; wasNew: boolean } | null> {
  const existing = await findExisting(dirAbs, block.id)
  if (existing) return { filename: existing, wasNew: false }

  const url = block.image.type === 'file' ? block.image.file.url : block.image.external.url
  if (!url) return null

  const res = await fetch(url)
  if (!res.ok) {
    console.warn(`    ! image block ${block.id}: download failed (HTTP ${res.status})`)
    return null
  }
  const buf = Buffer.from(await res.arrayBuffer())
  const ext = extFromResponse(url, res.headers.get('content-type'))
  const filename = `${block.id}.${ext}`

  await fs.mkdir(dirAbs, { recursive: true })
  await fs.writeFile(path.join(dirAbs, filename), buf)
  return { filename, wasNew: true }
}

/**
 * Walk a block's children recursively (columns, column_lists, toggles, etc.
 * can all nest image blocks), downloading every image block found along the
 * way in page order. Returns the local /homes/<slug>/... paths in order.
 */
async function walkAndDownload(
  blockId: string,
  slug: string,
  dirAbs: string,
  stats: { downloaded: number; skipped: number }
): Promise<string[]> {
  const paths: string[] = []
  let cursor: string | undefined

  do {
    const resp = await withRetry(
      () =>
        notion.blocks.children.list({
          block_id: blockId,
          start_cursor: cursor,
          page_size: 100,
        }),
      `blocks.children.list(${blockId})`
    )

    for (const raw of resp.results as Array<BlockObjectResponse | PartialBlockObjectResponse>) {
      if (!('type' in raw)) continue
      const block = raw as BlockObjectResponse

      if (block.type === 'image') {
        const result = await downloadImageBlock(
          block as Extract<BlockObjectResponse, { type: 'image' }>,
          dirAbs
        )
        if (result) {
          paths.push(`/homes/${slug}/${result.filename}`)
          if (result.wasNew) stats.downloaded++
          else stats.skipped++
        }
      }

      if (block.has_children) {
        const nested = await walkAndDownload(block.id, slug, dirAbs, stats)
        paths.push(...nested)
      }
    }

    cursor = resp.has_more ? resp.next_cursor ?? undefined : undefined
  } while (cursor)

  return paths
}

async function loadManifest(): Promise<Manifest> {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'))
  } catch {
    return {}
  }
}

async function saveManifest(manifest: Manifest): Promise<void> {
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true })
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)
}

async function fetchAllPages(): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined
  do {
    const resp = await withRetry(
      () =>
        notion.dataSources.query({
          data_source_id: DATA_SOURCE_ID,
          start_cursor: cursor,
          page_size: 100,
        }),
      'dataSources.query'
    )
    for (const p of resp.results) if (isFullPage(p)) pages.push(p)
    cursor = resp.has_more ? resp.next_cursor ?? undefined : undefined
  } while (cursor)
  return pages
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`Querying BMH — Home Listings (data source ${DATA_SOURCE_ID})...`)
  const pages = await fetchAllPages()
  console.log(`Found ${pages.length} listing pages.\n`)

  const manifest = await loadManifest()
  const zeroImageListings: string[] = []
  const skippedNoSlug: string[] = []
  const totals = { downloaded: 0, skipped: 0 }
  let marathonCount = 0

  for (const page of pages) {
    const slug = plainText('Slug', page).trim()
    const name = plainText('Name', page).trim() || slug || page.id
    const status = selectValue('Status', page)
    const manufacturer = selectValue('Manufacturer', page) || plainText('Manufacturer', page)

    if (manufacturer !== 'Marathon Homes') {
      continue // Texas Homes Direct only sells Marathon Homes inventory
    }
    marathonCount++

    if (!slug) {
      skippedNoSlug.push(name)
      console.log(`- "${name}": no Slug property set, skipping.`)
      continue
    }

    const dirAbs = path.join(HOMES_ROOT, slug)
    const stats = { downloaded: 0, skipped: 0 }
    const images = await walkAndDownload(page.id, slug, dirAbs, stats)
    totals.downloaded += stats.downloaded
    totals.skipped += stats.skipped

    if (images.length === 0) {
      zeroImageListings.push(`${name} (${slug})`)
      console.log(`- ${slug}: 0 images found${status ? ` [${status}]` : ''}`)
    } else {
      console.log(
        `- ${slug}: ${images.length} image(s) total, ${stats.downloaded} new, ${stats.skipped} already synced`
      )
      manifest[slug] = { slug, name, images, syncedAt: new Date().toISOString() }
    }
  }

  await saveManifest(manifest)

  console.log('\n=== Sync complete ===')
  console.log(`Marathon Homes listings: ${marathonCount} (of ${pages.length} total in the shared database)`)
  console.log(`Listings with images:    ${Object.keys(manifest).length}`)
  console.log(`New images downloaded:   ${totals.downloaded}`)
  console.log(`Already-synced (skipped):${' '.repeat(1)}${totals.skipped}`)
  console.log(`Manifest written to:     ${path.relative(REPO_ROOT, MANIFEST_PATH)}`)

  if (skippedNoSlug.length) {
    console.log(`\nListings with no Slug property (skipped entirely):`)
    for (const n of skippedNoSlug) console.log(`  - ${n}`)
  }

  console.log(`\nListings with ZERO image blocks in Notion (need photos added):`)
  if (zeroImageListings.length === 0) {
    console.log('  (none — every listing has at least one photo)')
  } else {
    for (const n of zeroImageListings) console.log(`  - ${n}`)
  }
}

main().catch((err) => {
  console.error('\nSync failed:', err)
  process.exit(1)
})
