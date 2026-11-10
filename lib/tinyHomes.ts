import type { Listing } from '@/lib/sampleListings'

/**
 * A tiny home is any listing with exactly one bedroom — computed from the
 * data, never a hand-kept list, so a new 1-bedroom home shows up on
 * /tiny-homes (and gets the "Tiny Home" label) as soon as a sync adds it.
 * Park models with one bedroom count. See CLAUDE.md "Tiny homes".
 */
export function isTinyHome(listing: Pick<Listing, 'beds'>): boolean {
  return listing.beds === 1
}
