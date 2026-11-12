import { readFileSync } from 'node:fs'

// Old /locations/[city] pages were retired in favor of /mobile-homes-[slug]-tx
// (same 16 cities). Redirect each one by name rather than a wildcard so a
// request for a city that never had an old page 404s normally instead of
// redirecting to a page that doesn't exist.
const RETIRED_LOCATION_SLUGS = [
  'san-antonio',
  'houston',
  'dallas',
  'austin',
  'laredo',
  'mcallen',
  'corpus-christi',
  'el-paso',
  'lubbock',
  'amarillo',
  'tyler',
  'waco',
  'victoria',
  'alice',
  'pleasanton',
  'seguin',
]

// Archived sections (lib/archived.json): while a flag is true, its route
// redirects TEMPORARILY (307) to the homepage. Flip the flag to false to
// restore the page. See lib/archived.ts and CLAUDE.md "Archived sections".
const ARCHIVED = JSON.parse(readFileSync(new URL('./lib/archived.json', import.meta.url), 'utf8'))
const ARCHIVED_ROUTES = { commercial: '/commercial' }

// Listing URLs (CLAUDE.md "Listing URLs"): every slug in a listing's
// legacySlugs 308-redirects straight to its current slug. Read from
// lib/sampleListings.ts itself so the redirects can't drift from the data.
// Exact paths only, so photo files under /homes/<old-slug>/ are unaffected.
// Next keeps the query string on redirects.
const LISTING_REDIRECTS = (() => {
  const src = readFileSync(new URL('./lib/sampleListings.ts', import.meta.url), 'utf8')
  const out = []
  for (const m of src.matchAll(/\n {4}slug: '([^']+)',\n {4}legacySlugs: \[([^\]]*)\],/g)) {
    for (const old of m[2].matchAll(/'([^']+)'/g)) {
      out.push({ source: `/homes/${old[1]}`, destination: `/homes/${m[1]}`, permanent: true })
    }
  }
  return out
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...Object.entries(ARCHIVED_ROUTES)
        .filter(([key]) => ARCHIVED[key])
        .map(([, route]) => ({ source: route, destination: '/', permanent: false })),
      ...LISTING_REDIRECTS,
      { source: '/locations', destination: '/cities', permanent: true },
      ...RETIRED_LOCATION_SLUGS.map((slug) => ({
        source: `/locations/${slug}`,
        destination: `/mobile-homes-${slug}-tx`,
        permanent: true,
      })),
    ]
  },
  images: {
    // Disabled: Vercel's Image Optimization API is metered per source image and
    // the account hit its plan quota (402 Payment Required on every image).
    // Serving originals as-is avoids that billing limit entirely.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'southtexashc.com' },
      // Notion S3 signed image URLs (expire after ~1 hour — use ISR revalidate: 3000)
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      // Notion CDN for externally-hosted images
      { protocol: 'https', hostname: '*.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
    ],
  },
}

export default nextConfig
