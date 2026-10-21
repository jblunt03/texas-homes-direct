/**
 * Site promo: a badge on specific listings (on /browse cards and on the
 * listing's own page) plus a pinned order for the top of /browse.
 *
 * To end the promo early: set `endsAt` to a past time (or empty `slugs`).
 * To renew it: change `label`/`slugs` as needed and move `endsAt` forward.
 * Either way, commit and deploy.
 *
 * Expiry doesn't wait for a deploy. The server only renders the badge while
 * the promo is active (/browse and listing pages revalidate every 50 minutes),
 * and the badge itself re-checks the visitor's clock on load and every
 * minute, so it disappears at `endsAt` even on a page built earlier.
 *
 * Never put a price or dollar amount in `label`, never compute or show a
 * sale/"was"/strikethrough price (the badge applies to the list price as
 * shown), and never add the promo or a price to any schema (no
 * offers/price/discount). Pinning (`pinned`) is independent of
 * the badge and of `endsAt`: it keeps applying until the list is changed.
 */
export const PROMO = {
  label: '15% Off This Month',
  slugs: [
    'jade-3bed-2bath-single-wide', // The Seguin
    'jasper-4bed-2bath-double-wide', // The Austin
    'fleetwood-armadillo-3bed-2bath', // The Livingston
    'fleetwood-jackrabbit-3bed-2bath-double-wide', // The Porter
    'fleetwood-axis-3bed-2bath-double-wide', // The Dayton
  ],
  /**
   * End of day 2026-10-31, Central time. Central is still on daylight time
   * (UTC-5) on Oct 31, 2026, so the promo is active until midnight CDT.
   */
  endsAt: '2026-11-01T00:00:00-05:00',
  /** Shown first on /browse, in this order (after filters are applied). */
  pinned: ['jade-3bed-2bath-single-wide', 'jasper-4bed-2bath-double-wide'],
}

export function isPromoActive(now: number = Date.now()): boolean {
  return now < new Date(PROMO.endsAt).getTime()
}

export function isPromoListing(slug: string): boolean {
  return PROMO.slugs.includes(slug)
}

/** Sort key for /browse: pinned listings first in config order, everything else after. */
export function pinRank(slug: string): number {
  const i = PROMO.pinned.indexOf(slug)
  return i === -1 ? PROMO.pinned.length : i
}
