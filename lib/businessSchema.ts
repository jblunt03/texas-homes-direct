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
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4580 FM 2438',
    addressLocality: 'Seguin',
    addressRegion: 'TX',
    postalCode: '78155',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.612136009988,
    longitude: -97.834249908605,
  },
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
    'https://www.google.com/maps/place/Texas+Homes+Direct/@30.998505,-110.7156328,5z/data=!4m7!3m6!1s0x4e3ba62879afeaf7:0x6eddce7a32c31cdf!8m2!3d31.4197143!4d-100.0768425!16s%2Fg%2F11zdf35szd',
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

export const GOOGLE_MAPS_PROFILE_URL = UPGRADED_BUSINESS_JSON_LD.sameAs[1]
export const GOOGLE_REVIEW_URL = 'https://g.page/r/texashomesdirect/review'
