import { CLEARANCE_LABEL, isClearance } from '@/lib/badges'

/**
 * The tag in a home card's photo corner (/browse, /tiny-homes, related
 * homes). "Clearance" for homes in CLEARANCE (lib/badges.ts), "Featured" for
 * featured homes, and nothing otherwise — "In stock" was retired on
 * 2026-11-20. Server-rendered; no client code.
 */
export default function CardTag({ slug, featured }: { slug: string; featured?: boolean }) {
  if (isClearance(slug)) {
    return (
      <span className="bmh-clearance-badge bmh-inv-card-tag" data-clearance="">
        {CLEARANCE_LABEL}
      </span>
    )
  }
  if (featured) {
    return <span className="bmh-badge-caps bmh-badge-coral bmh-inv-card-tag">Featured</span>
  }
  return null
}
