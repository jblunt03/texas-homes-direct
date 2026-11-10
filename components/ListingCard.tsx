import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/lib/sampleListings'
import PromoBadge from '@/components/PromoBadge'
import { isPromoListing } from '@/lib/promo'
import { listingBadge } from '@/lib/badges'
import PaymentEstimate from '@/components/PaymentEstimate'

/**
 * Inventory card used on /browse and /tiny-homes. Moved out of BrowseClient
 * unchanged; `showPayment={false}` hides the estimated monthly payment.
 *
 * The card is a <div> with a stretched title link (.bmh-card-link::after
 * covers the card), so the payment info <button> isn't nested inside <a>.
 */
export default function ListingCard({
  listing,
  promoActiveAtRender,
  showPayment = true,
}: {
  listing: Listing
  promoActiveAtRender: boolean
  showPayment?: boolean
}) {
  const badgeCls = listing.featured ? 'bmh-badge-coral' : 'bmh-badge-caps'
  const badgeLabel = listing.featured ? 'Featured' : 'In stock'
  const subText = [
    listing.wideType ?? 'Singlewide',
    listing.year.toString(),
    listing.manufacturer ?? '',
  ]
    .filter(Boolean)
    .join(' · ')
  const tag = (
    <span className={`bmh-badge-caps ${badgeCls} bmh-inv-card-tag`}>
      {badgeLabel}
    </span>
  )
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
    <div className="bmh-inv-card bmh-inv-card-stretch">
      {listing.images[0] ? (
        <div
          className="bmh-ratio-3x2 bmh-inv-card-media"
          style={{ position: 'relative' }}
        >
          {cardTags}
          <Image
            src={listing.images[0]}
            alt={`${listing.title} exterior`}
            fill
            style={
              listing.floorplanUrl && listing.images[0] === listing.floorplanUrl
                ? { objectFit: 'contain', background: '#fff', padding: 12 }
                : { objectFit: 'cover' }
            }
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="bmh-ph bmh-ratio-3x2 bmh-inv-card-media">
          {cardTags}
          <span className="bmh-ph-label">{listing.title} · exterior</span>
        </div>
      )}
      <div className="bmh-inv-card-body">
        <h3 className="bmh-inv-card-title" style={{ fontSize: 22 }}>
          <Link href={`/homes/${listing.slug}`} className="bmh-card-link">
            {listing.title}
          </Link>
        </h3>
        <p className="bmh-inv-card-sub">{subText}</p>
        <div className="bmh-inv-card-specs">
          <span className="bmh-spec">
            <strong>{listing.beds}</strong> bd
          </span>
          <span className="bmh-spec">
            <strong>{listing.baths}</strong> ba
          </span>
          <span className="bmh-spec">
            <strong>{listing.sqft.toLocaleString()}</strong> sqft
          </span>
        </div>
        <div className="bmh-inv-card-footer">
          <span className="bmh-inv-card-price">
            {listing.price > 0
              ? `$${listing.price.toLocaleString()}`
              : showPayment && listing.monthlyPayment > 0
              ? <PaymentEstimate amount={listing.monthlyPayment} />
              : 'Call for price'}
          </span>
          <span className="bmh-inv-card-link">View →</span>
        </div>
      </div>
    </div>
  )
}
