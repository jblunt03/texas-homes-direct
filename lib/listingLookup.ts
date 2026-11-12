import { sampleListings, type Listing } from '@/lib/sampleListings'

/**
 * Resolves a listing by its current slug or any of its legacySlugs. Used
 * where old slugs are stored and can't be edited — the Popular Homes lists
 * in lib/cityContent.ts — so they render with the current URL. Page routes
 * do NOT use this: an old URL 308-redirects instead of rendering twice.
 */
const BY_ANY_SLUG = new Map<string, Listing>()
for (const l of sampleListings) {
  BY_ANY_SLUG.set(l.slug, l)
  for (const old of l.legacySlugs ?? []) BY_ANY_SLUG.set(old, l)
}

export function findListingByAnySlug(slug: string): Listing | undefined {
  return BY_ANY_SLUG.get(slug)
}

export function currentListingSlug(slug: string): string | undefined {
  return BY_ANY_SLUG.get(slug)?.slug
}

/** The site's slug for a Notion page, matched by notionId (never Notion's own Slug field). */
const BY_NOTION_ID = new Map(sampleListings.filter((l) => l.notionId).map((l) => [l.notionId!, l]))

export function listingForNotionPage(notionId: string): Listing | undefined {
  return BY_NOTION_ID.get(notionId)
}
