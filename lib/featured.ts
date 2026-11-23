/**
 * Featured homes: one ordered list, site-owned like slug and price.
 *
 * It drives, in this order:
 * - the homepage's "Featured homes" cards (app/page.tsx; Active homes only,
 *   first three);
 * - the default ("Featured") order on /browse: these homes first, in list
 *   order, after filters run. A price or size sort ignores it;
 * - the "Featured" card tag (components/CardTag.tsx). Clearance keeps
 *   precedence, so a featured home on the Clearance list shows "Clearance".
 *
 * Nothing else decides it. `npm run sync:listings` never writes this file or
 * an existing listing's `featured` field, and Notion's Featured property is
 * not read for display. To change the featured homes, edit this list, then
 * commit and deploy.
 */
export const FEATURED: readonly string[] = [
  'woodville-texas-1-bed-1-bath-tiny-home', // The Woodville (Notion BMH-42)
  'austin-texas-4-bed-2-bath-double-wide', // The Austin (Notion BMH-93)
  'willis-texas-3-bed-2-bath-double-wide', // The Willis (Notion BMH-80)
]

export function isFeatured(slug: string): boolean {
  return FEATURED.includes(slug)
}

/** Sort key: featured homes first in list order, everything else after. */
export function featuredRank(slug: string): number {
  const i = FEATURED.indexOf(slug)
  return i === -1 ? FEATURED.length : i
}
