/**
 * Listing URL slugs — see CLAUDE.md "Listing URLs".
 *
 *   /homes/<name>-texas-<beds>-bed-<baths>-bath[-<single-wide|double-wide|tiny-home>]
 *
 * <name> is the home's display name when the slug was first assigned:
 * lowercase, "The" dropped, spaces as hyphens ("The Sulphur Springs" →
 * sulphur-springs). The type word comes from Notion: tiny-home for a
 * 1-bedroom park model, single-wide/double-wide from Notion's Type, and none
 * when Notion records no type (or for a park model with 2+ bedrooms). It is
 * never inferred from size. No manufacturer name, ever.
 *
 * Slugs are FROZEN once assigned: a later rename or re-spec never changes
 * a URL, and sync-listings never rewrites an existing slug. Old URLs live on
 * in `legacySlugs` and 308-redirect to the current slug. New listings get
 * their slug from newListingSlug() in scripts/sync-listings.ts, which stops
 * rather than adding a suffix if two homes would collide.
 */
export const LISTING_SLUG_RE =
  /^[a-z0-9]+(?:-[a-z0-9]+)*-texas-\d+-bed-\d+-bath(?:-(?:single-wide|double-wide|tiny-home))?$/

