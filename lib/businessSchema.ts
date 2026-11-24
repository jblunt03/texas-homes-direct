/**
 * Upgraded Organization / HomeAndConstructionBusiness block for the SEO
 * batch-1 page types (city, land-home, blog, guides, testimonials).
 *
 * The root layout emits this block instead of the original LocalBusiness
 * on those routes only, same `@id`. Every other route, including `/`,
 * keeps the original block. areaServed lists Texas first, then Oklahoma,
 * New Mexico, and Louisiana. Hours match the layout block.
 */

const UPGRADED_EXACT = new Set([
  '/land-home-packages',
  '/land-home-packages-floresville-tx',
  '/blog',
  '/whats-included-in-setup',
  '/how-pricing-works',
  '/manufactured-vs-mobile-home',
  '/tiny-homes',
  '/testimonials',
])

export function usesUpgradedBusinessSchema(pathname: string): boolean {
  const path = (pathname.split('?')[0] || '/').replace(/\/+$/, '') || '/'
  if (UPGRADED_EXACT.has(path)) return true
  if (path.startsWith('/mobile-homes-') && path.endsWith('-tx')) return true
  if (path.startsWith('/land-home-packages/')) return true
  if (path.startsWith('/blog/')) return true
  return false
}
export const UPGRADED_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'HomeAndConstructionBusiness'],
  '@id': 'https://www.texashomesdirect.com/#business',
  name: 'Texas Homes Direct',
  description:
    "Texas's most transparent manufactured home marketplace. Owned and operated by Justin.",
  url: 'https://www.texashomesdirect.com',
  telephone: '+1-830-381-1309',
  priceRange: '$$',
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'Oklahoma' },
    { '@type': 'State', name: 'New Mexico' },
    { '@type': 'State', name: 'Louisiana' },
  ],
  founder: {
    '@type': 'Person',
    name: 'Justin',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61593330354434',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '20:00',
    },
  ],
} as const
