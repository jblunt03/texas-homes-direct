import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'

/**
 * The retail inventory card's markup, shared by the homes' ListingCard
 * (/browse, /tiny-homes) and the Land-Home Packages' PackageCard, so both
 * look and behave the same: photo on top in a fixed 3:2 box (no layout
 * shift), tags in the photo's top-left corner, a stretched title link
 * (.bmh-card-link::after covers the card) so the payment (i) <button> sits
 * above it without being nested in <a>, a spec row, and the price footer.
 * ListingCard's rendered HTML is unchanged by this extraction.
 */
export interface InventorySpec {
  /** Bold figure, e.g. 3 or "1,493". Omit for a plain-text spec. */
  value?: ReactNode
  label: string
}

export default function InventoryCard({
  href,
  title,
  image,
  placeholderLabel,
  priority = false,
  tags,
  mediaExtra,
  sub,
  specs,
  price,
  cardAttrs,
}: {
  href: string
  title: string
  image?: { src: string; alt: string; contain?: boolean } | null
  /** Text inside the striped placeholder when there's no photo. */
  placeholderLabel: ReactNode
  priority?: boolean
  /** Badges in the photo's top-left corner. */
  tags?: ReactNode
  /** Anything else over the photo (video chip, "Example home" tag). */
  mediaExtra?: ReactNode
  sub: ReactNode
  specs: InventorySpec[]
  price: ReactNode
  /** Extra data-* attributes on the card root (e.g. data-package-card). */
  cardAttrs?: Record<`data-${string}`, string>
}) {
  return (
    <div className="bmh-inv-card bmh-inv-card-stretch" {...cardAttrs}>
      {image ? (
        <div className="bmh-ratio-3x2 bmh-inv-card-media" style={{ position: 'relative' }}>
          {tags}
          {mediaExtra}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            style={image.contain ? { objectFit: 'contain', background: '#fff', padding: 12 } : { objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, (min-width: 1600px) 25vw, 33vw"
          />
        </div>
      ) : (
        <div className="bmh-ph bmh-ratio-3x2 bmh-inv-card-media">
          {tags}
          <span className="bmh-ph-label">{placeholderLabel}</span>
        </div>
      )}
      <div className="bmh-inv-card-body">
        <h3 className="bmh-inv-card-title bmh-listing-card-title">
          <Link href={href} className="bmh-card-link">
            {title}
          </Link>
        </h3>
        <p className="bmh-inv-card-sub">{sub}</p>
        <div className="bmh-inv-card-specs">
          {specs.map((s) => (
            <span key={s.label} className="bmh-spec">
              {s.value !== undefined ? (
                <>
                  <strong>{s.value}</strong>
                  {' ' + s.label}
                </>
              ) : (
                s.label
              )}
            </span>
          ))}
        </div>
        <div className="bmh-inv-card-footer">
          <span className="bmh-inv-card-price">{price}</span>
          <span className="bmh-inv-card-link">View →</span>
        </div>
      </div>
    </div>
  )
}
