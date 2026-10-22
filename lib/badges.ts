/**
 * Permanent listing badges (no end date), e.g. "Porch Model".
 *
 * One line per listing: slug → label. To add a badge to another home, add a
 * line; to remove one, delete its line. No other code changes are needed.
 * Badges show on the listing's /browse card image (top-left, stacked with any
 * promo tag and the In stock/Featured tag) and in the badge row above the
 * listing page's title. They don't appear on city pages.
 *
 * Time-limited promos belong in lib/promo.ts instead, which handles expiry.
 * Never put a price or dollar amount in a badge label.
 */
export const LISTING_BADGES: Record<string, string> = {
  'fleetwood-peredavid-3bed-2bath-double-wide': 'Porch Model', // The Willis
}

export function listingBadge(slug: string): string | undefined {
  return LISTING_BADGES[slug]
}
