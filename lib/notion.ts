/**
 * Notion API integration for Texas Homes Direct listings.
 *
 * When NOTION_TOKEN is set, all data comes from the live database.
 * When it is not set (local dev without credentials), falls back to sampleListings.
 *
 * ISR note: pages should use `export const revalidate = 3000` (50 min) so that
 * Notion S3 image URLs (which expire after 3600 s) are refreshed before they expire.
 */

import { Client, isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { sampleListings, type Listing } from './sampleListings'
import listingImageManifest from './generated/listingImages.json'

const DATABASE_ID =
  process.env.NOTION_DATABASE_ID ?? '27653b36-31bf-4424-87d2-117ed420bd77'

type ImageManifest = Record<string, { images: string[] }>
const IMAGE_MANIFEST = listingImageManifest as ImageManifest

let _client: Client | null = null

function getClient(): Client | null {
  if (!process.env.NOTION_TOKEN) return null
  if (!_client) {
    _client = new Client({ auth: process.env.NOTION_TOKEN })
  }
  return _client
}

// ---------------------------------------------------------------------------
// Property accessors (all defensive — never throw on missing / wrong type)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>

function prop(page: PageObjectResponse, name: string) {
  return (page.properties as Props)[name]
}

/** Plain-text from a title or rich_text property */
function rt(page: PageObjectResponse, name: string): string {
  const p = prop(page, name)
  if (!p) return ''
  if (p.type === 'title') return (p.title ?? []).map((b: { plain_text: string }) => b.plain_text).join('')
  if (p.type === 'rich_text') return (p.rich_text ?? []).map((b: { plain_text: string }) => b.plain_text).join('')
  return ''
}

/** Number property value */
function num(page: PageObjectResponse, name: string, fallback = 0): number {
  const p = prop(page, name)
  if (!p || p.type !== 'number') return fallback
  return p.number ?? fallback
}

/** Select property name */
function sel(page: PageObjectResponse, name: string): string {
  const p = prop(page, name)
  if (!p) return ''
  if (p.type === 'select') return p.select?.name ?? ''
  return ''
}

/**
 * Boolean from either a checkbox property OR a select whose option is "__YES__".
 * The Notion database stores Featured and Is Repo as select options.
 */
function chk(page: PageObjectResponse, name: string): boolean {
  const p = prop(page, name)
  if (!p) return false
  if (p.type === 'checkbox') return p.checkbox === true
  if (p.type === 'select') return p.select?.name === '__YES__'
  return false
}

/** URL property value */
function urlProp(page: PageObjectResponse, name: string): string | undefined {
  const p = prop(page, name)
  if (!p) return undefined
  if (p.type === 'url') return p.url ?? undefined
  // some fields are stored as rich_text
  if (p.type === 'rich_text') {
    const text = (p.rich_text ?? []).map((b: { plain_text: string }) => b.plain_text).join('')
    return text || undefined
  }
  return undefined
}

/** Image URLs — prefer the `Image URLs` text field (permanent), then Notion S3 attachments */
function images(page: PageObjectResponse, slug: string): string[] {
  const synced = IMAGE_MANIFEST[slug]?.images
  if (synced && synced.length > 0) return synced

  const permanent = rt(page, 'Image URLs')
  if (permanent) {
    return permanent.split('\n').map((s: string) => s.trim()).filter(Boolean)
  }

  const filesProp = prop(page, 'Images')
  if (!filesProp || filesProp.type !== 'files') return []

  return (filesProp.files as Array<{ type: string; external?: { url: string }; file?: { url: string } }>)
    .map(f => {
      if (f.type === 'external') return f.external?.url ?? null
      if (f.type === 'file') return f.file?.url ?? null // signed S3 URL
      return null
    })
    .filter(Boolean) as string[]
}

// ---------------------------------------------------------------------------
// Region mapping
// ---------------------------------------------------------------------------

const REGION_MAP: Record<string, Listing['region']> = {
  'South Texas':   'South TX',
  'South TX':      'South TX',
  'Central Texas': 'Central TX',
  'Central TX':    'Central TX',
  'West Texas':    'West TX',
  'West TX':       'West TX',
  'North Texas':   'North TX',
  'North TX':      'North TX',
  'East Texas':    'East TX',
  'East TX':       'East TX',
  'Houston Area':  'East TX',
  'Houston':       'East TX',
  'Dallas Area':   'North TX',
  'Dallas':        'North TX',
  'Fort Worth':    'North TX',
  'El Paso':       'West TX',
  'Panhandle':     'West TX',
  'Midland':       'West TX',
  'Odessa':        'West TX',
  'Lubbock':       'West TX',
  'Amarillo':      'West TX',
}

function mapRegion(raw: string): Listing['region'] {
  return REGION_MAP[raw] ?? 'South TX'
}

// ---------------------------------------------------------------------------
// Page → Listing mapper
// ---------------------------------------------------------------------------

export function mapPage(page: PageObjectResponse): Listing {
  const title = rt(page, 'Name') || 'Unnamed Listing'
  const slug = rt(page, 'Slug')
  const listingId = rt(page, 'Listing ID') || page.id

  const statusRaw = sel(page, 'Status') as Listing['status'] | ''
  const isRepo = chk(page, 'Is Repo')
  const newOrUsed = sel(page, 'New or Used')
  const type: Listing['type'] = isRepo || newOrUsed === 'Used' ? 'repo' : 'new'

  const available = statusRaw === 'Active' || statusRaw === 'Repo Deal'

  const wideTypeRaw = sel(page, 'Type')
  let wideType: Listing['wideType'] | undefined
  if (wideTypeRaw === 'Single Wide') wideType = 'Single Wide'
  else if (wideTypeRaw === 'Double Wide') wideType = 'Double Wide'
  else if (wideTypeRaw === 'Triple Wide') wideType = 'Triple Wide'

  const regionRaw = sel(page, 'Region') || rt(page, 'Region')
  const region = mapRegion(regionRaw)

  const price = num(page, 'Price', 0)
  const monthlyPayment = num(page, 'Monthly Payment', Math.round(price * 0.012))
  const downPayment = Math.round(price * 0.1)
  const sqft = num(page, 'Square Feet', 0)
  const beds = num(page, 'Bedrooms', 0)
  const baths = num(page, 'Bathrooms', 0)
  const yearRaw = num(page, 'Year Built', 0)
  const year = yearRaw || new Date().getFullYear()

  const featuresRaw = rt(page, 'Key Features EN')
  const features = featuresRaw
    ? featuresRaw.split(',').map((f: string) => f.trim()).filter(Boolean)
    : []

  const description =
    rt(page, 'Description EN') ||
    rt(page, 'Description') ||
    ''

  const city = rt(page, 'Location City') || 'San Antonio'

  // Manufacturer can be a select or rich_text property
  const manufacturerSel = sel(page, 'Manufacturer')
  const manufacturerRt = rt(page, 'Manufacturer')
  const manufacturer = manufacturerSel || manufacturerRt || undefined

  const model = rt(page, 'Model') || undefined
  const dimensions = rt(page, 'Dimensions') || undefined
  const matterportUrl = urlProp(page, '3D Tour URL')
  const featured = chk(page, 'Featured')

  return {
    id: listingId,
    notionId: page.id,
    slug,
    title,
    price,
    beds,
    baths,
    sqft,
    year,
    type,
    wideType,
    region,
    city,
    images: images(page, slug),
    features,
    description,
    monthlyPayment,
    downPayment,
    available,
    hudCertified: true,
    featured,
    manufacturer,
    model,
    dimensions,
    matterportUrl,
    status: (statusRaw || 'Active') as Listing['status'],
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Fetch all listings from Notion, paginating automatically. Falls back to sample data. */
export async function fetchAllListings(): Promise<Listing[]> {
  const client = getClient()
  if (!client) return sampleListings.filter(l => l.type !== 'repo')

  const results: PageObjectResponse[] = []
  let cursor: string | undefined

  do {
    // @notionhq/client v5 uses dataSources.query() instead of databases.query()
    const resp = await client.dataSources.query({
      data_source_id: DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
    })
    for (const page of resp.results) {
      if (isFullPage(page)) results.push(page)
    }
    cursor = resp.has_more ? (resp.next_cursor ?? undefined) : undefined
  } while (cursor)

  // Only return pages that have a valid slug — used/pre-owned homes are not offered
  return results.map(mapPage).filter(l => Boolean(l.slug) && l.type !== 'repo')
}

/** Returns just the slugs — used by generateStaticParams. Falls back to sample data. */
export async function fetchAllSlugs(): Promise<string[]> {
  const listings = await fetchAllListings()
  return listings.map(l => l.slug).filter(Boolean)
}

/** Fetch a single listing by slug. Falls back to sample data match. */
export async function fetchListingBySlug(slug: string): Promise<Listing | null> {
  const client = getClient()
  if (!client) {
    const listing = sampleListings.find(l => l.slug === slug) ?? null
    return listing && listing.type !== 'repo' ? listing : null
  }

  try {
    // @notionhq/client v5 uses dataSources.query() instead of databases.query()
    const resp = await client.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
    })
    const page = resp.results[0]
    if (!page || !isFullPage(page)) return null
    const listing = mapPage(page)
    // Used/pre-owned homes are not offered
    return listing.type !== 'repo' ? listing : null
  } catch {
    // Fallback to sample data if Notion query fails
    const listing = sampleListings.find(l => l.slug === slug) ?? null
    return listing && listing.type !== 'repo' ? listing : null
  }
}
