import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchAllListings, fetchListingBySlug } from '@/lib/notion'
import { CITY_CONTENT } from '@/lib/cityContent'
import { publishedCities } from '@/lib/cities'
import ListingDetail from './ListingDetail'
import { isPromoActive } from '@/lib/promo'
import { isTinyHome } from '@/lib/tinyHomes'
import { currentListingSlug } from '@/lib/listingLookup'
import { VIDEO_META } from '@/lib/videoMeta'

const SITE_URL = 'https://www.texashomesdirect.com'

export const revalidate = 3000

/** Published city pages whose "Homes to Get You Started" block features this listing. */
function citiesFeaturing(slug: string) {
  return publishedCities()
    // popularHomes may hold legacy slugs (lib/cityContent.ts isn't edited) —
    // compare by the current slug they resolve to.
    .filter((c) => CITY_CONTENT[c.slug]?.popularHomes.some((p) => currentListingSlug(p) === slug))
    .map((c) => ({ name: c.name, slug: c.slug }))
}

export async function generateStaticParams() {
  const listings = await fetchAllListings()
  return listings.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const listing = await fetchListingBySlug(params.slug)
  if (!listing) return { title: 'Home Not Found' }
  const wideType = listing.wideType ?? 'Manufactured'
  const title = isTinyHome(listing)
    ? `${listing.title} — ${listing.beds} Bed ${listing.baths} Bath Tiny Home`
    : `${listing.title} — ${listing.beds} Bed ${wideType} Manufactured Home`
  const description = `${listing.beds} bed / ${listing.baths} bath ${wideType.toLowerCase()} manufactured home, ${listing.sqft.toLocaleString()} sqft. Delivered and set up anywhere in Texas. ${listing.description.slice(0, 100)}`
  const url = `${SITE_URL}/homes/${listing.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      ...(listing.images[0] ? { images: [{ url: listing.images[0] }] } : {}),
    },
  }
}

export default async function HomeListingPage({
  params,
}: {
  params: { slug: string }
}) {
  const [listing, allListings] = await Promise.all([
    fetchListingBySlug(params.slug),
    fetchAllListings(),
  ])

  if (!listing) notFound()

  // Related: same region first, fill up to 3 from any region
  const sameRegion = allListings
    .filter((l) => l.slug !== listing.slug && l.region === listing.region)
    .slice(0, 3)
  const related =
    sameRegion.length >= 3
      ? sameRegion
      : [
          ...sameRegion,
          ...allListings
            .filter(
              (l) =>
                l.slug !== listing.slug &&
                !sameRegion.find((r) => r.slug === l.slug),
            )
            .slice(0, 3 - sameRegion.length),
        ]

  // No `offers` sub-schema: Google's Product/Merchant-listing validator expects
  // shippingDetails, hasMerchantReturnPolicy, review, and aggregateRating whenever
  // `offers` is present, and none of those apply honestly to a financed,
  // site-delivered home with no retail return policy. Dropping `offers` keeps the
  // (still accurate) product description without inviting warnings for fields we
  // won't fabricate. See CLAUDE.md-style reasoning: never invent structured data.
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: listing.description,
    image: listing.images,
    brand: { '@type': 'Brand', name: 'Texas Homes Direct' },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Inventory', item: `${SITE_URL}/browse` },
      { '@type': 'ListItem', position: 3, name: listing.title, item: `${SITE_URL}/homes/${listing.slug}` },
    ],
  }

  const featuredInCities = citiesFeaturing(listing.slug)

  // VideoObject only when the title, thumbnail and uploadDate were read from
  // the video's own page (lib/videoMeta.ts). Never on /browse.
  const video = listing.youtubeId ? VIDEO_META[listing.youtubeId] : undefined
  const videoJsonLd = video && {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${listing.youtubeId}`,
    url: `https://www.youtube.com/shorts/${listing.youtubeId}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {videoJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      )}
      <ListingDetail
        listing={listing}
        related={related}
        featuredInCities={featuredInCities}
        promoActiveAtRender={isPromoActive()}
      />
    </>
  )
}
