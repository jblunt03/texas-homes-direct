import { CLEARANCE_LABEL, isClearance } from '@/lib/badges'
import { isFeatured } from '@/lib/featured'

/**
 * The tag in a home card's photo corner (/browse, /tiny-homes, related
 * homes). "Clearance" for homes in CLEARANCE (lib/badges.ts), "Featured" for
 * homes in FEATURED (lib/featured.ts), and nothing otherwise — "In stock" was retired on
 * 2026-11-20. Server-rendered; no client code.
 */
export default function CardTag({ slug }: { slug: string }) {
  if (isClearance(slug)) {
    return (
      <span className="bmh-clearance-badge bmh-inv-card-tag" data-clearance="">
        {CLEARANCE_LABEL}
      </span>
    )
  }
  if (isFeatured(slug)) {
    return <span className="bmh-badge-caps bmh-badge-coral bmh-inv-card-tag">Featured</span>
  }
  return null
}
