import InventoryCard from '@/components/InventoryCard'
import type { Listing } from '@/lib/sampleListings'
import PromoBadge from '@/components/PromoBadge'
import { isPromoListing } from '@/lib/promo'
import { listingBadge } from '@/lib/badges'
import CardTag from '@/components/CardTag'
import ListingPrice from '@/components/ListingPrice'
import dynamic from 'next/dynamic'
import { VIDEOS_ARCHIVED } from '@/lib/archived'

// Listing videos can be archived (lib/archived.json "videos"). The chip is
// loaded through next/dynamic only while they're on, so with the flag set no
// chip, dialog or player code is rendered or fetched.
const VideoChip = VIDEOS_ARCHIVED
  ? null
  : dynamic(() => import('@/components/ListingVideo').then((m) => m.VideoChip))

/**
 * Inventory card used on /browse and /tiny-homes. The price follows the
 * visitor's cash/payment choice (CLAUDE.md "Cash price");
 * `showPayment={false}` shows the cash price only (/tiny-homes).
 *
 * Markup lives in components/InventoryCard.tsx (shared with the Land-Home
 * Packages' PackageCard): a <div> with a stretched title link, so the
 * payment info <button> isn't nested inside <a>.
 */
export default function ListingCard({
  listing,
  promoActiveAtRender,
  showPayment = true,
  priority = false,
}: {
  listing: Listing
  promoActiveAtRender: boolean
  showPayment?: boolean
  /** Load this card's photo eagerly (first row of a grid); the rest stay lazy. */
  priority?: boolean
}) {
  const subText = [
    listing.wideType ?? 'Singlewide',
    listing.year.toString(),
    listing.manufacturer ?? '',
  ]
    .filter(Boolean)
    .join(' · ')
  // Clearance / Featured / nothing (lib/badges.ts) — "In stock" was retired 2026-11-20.
  const tag = <CardTag slug={listing.slug} />
  const isPromo = isPromoListing(listing.slug)
  const badge = listingBadge(listing.slug)
  const cardTags =
    isPromo || badge ? (
      <div className="bmh-inv-card-tags">
        {isPromo && <PromoBadge activeAtRender={promoActiveAtRender} />}
        {badge && <span className="bmh-listing-badge">{badge}</span>}
        {tag}
      </div>
    ) : (
      tag
    )

  return (
    <InventoryCard
      href={`/homes/${listing.slug}`}
      title={listing.title}
      image={
        listing.images[0]
          ? {
              src: listing.images[0],
              alt: `${listing.title} exterior`,
              contain: Boolean(listing.floorplanUrl && listing.images[0] === listing.floorplanUrl),
            }
          : null
      }
      placeholderLabel={<>{listing.title} · exterior</>}
      priority={priority}
      tags={cardTags}
      mediaExtra={
        VideoChip && listing.youtubeId ? (
          <VideoChip home={{ title: listing.title, slug: listing.slug, id: listing.id, youtubeId: listing.youtubeId }} />
        ) : null
      }
      sub={subText}
      specs={[
        { value: listing.beds, label: 'bd' },
        { value: listing.baths, label: 'ba' },
        { value: listing.sqft.toLocaleString(), label: 'sqft' },
      ]}
      price={<ListingPrice price={listing.price} monthlyPayment={listing.monthlyPayment} cashOnly={!showPayment} />}
    />
  )
}
