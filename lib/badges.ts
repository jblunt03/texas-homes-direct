/**
 * Permanent listing badges (no end date), e.g. "Porch Model".
 *
 * One line per listing: slug → label. To add a badge to another home, add a
 * line; to remove one, delete its line. No other code changes are needed.
 * Badges show on the listing's /browse card image (top-left, stacked with any
 * promo tag and the Clearance/Featured tag) and in the badge row above the
 * listing page's title. They don't appear on city pages.
 *
 * Time-limited promos belong in lib/promo.ts instead, which handles expiry.
 * Never put a price or dollar amount in a badge label.
 */
export const LISTING_BADGES: Record<string, string> = {
  'willis-texas-3-bed-2-bath-double-wide': 'Porch Model', // The Willis
}

export function listingBadge(slug: string): string | undefined {
  return LISTING_BADGES[slug]
}

/**
 * Clearance homes (owner, 2026-11-20). One line per home: slug → the home's
 * display name and Notion Listing ID (homes are chosen by name + Listing ID,
 * never by slug). To add or remove a home, add or delete its line.
 *
 * The "Clearance" label takes the card tag slot that used to say "In stock"
 * (top-left on the photo, stacked under any promo/permanent badge) and sits
 * in the badge row above the listing page's title. Homes not listed here get
 * no label in that slot ("In stock" was retired the same day; "Featured"
 * still shows for featured homes). Not on city pages' Popular Homes cards.
 * Never add a price, "was" price, discount or the word to titles, meta,
 * schema or llms.txt. validate_batch.py step 11i checks it.
 */
export const CLEARANCE_LABEL = 'Clearance'

export const CLEARANCE: Record<string, string> = {
  'seguin-texas-3-bed-2-bath-single-wide': 'The Seguin (BMH-92)',
  'austin-texas-4-bed-2-bath-double-wide': 'The Austin (BMH-93)',
  'lampasas-texas-5-bed-3-bath-double-wide': 'The Lampasas (BMH-94)',
  'porter-texas-3-bed-2-bath-double-wide': 'The Porter (BMH-77)',
  'willis-texas-3-bed-2-bath-double-wide': 'The Willis (BMH-80)',
  'sealy-texas-3-bed-2-bath-double-wide': 'The Sealy (BMH-19)',
  'lockhart-texas-3-bed-2-bath-double-wide': 'The Lockhart (BMH-1)',
  'woodville-texas-1-bed-1-bath-tiny-home': 'The Woodville (BMH-42)',
  'new-caney-texas-3-bed-2-bath-single-wide': 'The New Caney (BMH-76)',
}

export function isClearance(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(CLEARANCE, slug)
}
