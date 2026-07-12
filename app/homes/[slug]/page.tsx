import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchAllListings, fetchListingBySlug } from '@/lib/notion'
import ListingDetail from './ListingDetail'

export const revalidate = 3000

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
  const title = `${listing.title} — ${listing.city}, TX`
  const description = `${listing.beds} bed / ${listing.baths} bath manufactured home in ${listing.city}, Texas. ${listing.sqft.toLocaleString()} sqft.${listing.price ? ` Priced at $${listing.price.toLocaleString()}.` : ''} ${listing.description.slice(0, 120)}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: listing.description,
    image: listing.images,
    brand: { '@type': 'Brand', name: 'Texas Homes Direct' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: listing.price,
      availability: listing.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://texashomesdirect.com/homes/${listing.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ListingDetail listing={listing} related={related} />
    </>
  )
}
