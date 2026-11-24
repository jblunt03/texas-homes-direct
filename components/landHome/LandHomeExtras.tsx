import Link from 'next/link'
import {
  FLORESVILLE_COUNTY,
  PER_MILE_NO_RATE,
  STATEWIDE_DELIVERY,
} from '@/lib/cityFacts'
import { DELIVERY_TIMING } from '@/lib/flaggedCopy'

export function LandHomeFinancing() {
  return (
    <div className="bmh-city-prose">
      <h2 className="bmh-city-h2">Financing</h2>
      <p className="bmh-lead" style={{ marginTop: 12 }}>
        Lenders Texas Homes Direct works with are 21st Mortgage, Cascade, Triad, and Porch Pass.
        Land you already own can serve as collateral in place of a down payment. That is more
        often relevant when the buyer brings the land. On a package, the lot is part of the purchase.
        0 down at 680+ credit. About 5% down in the mid-500s. The mortgage analysis is free,
        normally $75, with no credit pull.
      </p>
      <div className="bmh-spacer-sm" />
      <Link href="/calculator" className="bmh-pill bmh-pill-static">
        Free mortgage analysis →
      </Link>
    </div>
  )
}

export function LandHomeDelivery({ floresville = false }: { floresville?: boolean }) {
  return (
    <div className="bmh-city-prose">
      <h2 className="bmh-city-h2">Delivery</h2>
      <p className="bmh-lead" style={{ marginTop: 12 }}>
        {STATEWIDE_DELIVERY} {PER_MILE_NO_RATE} {DELIVERY_TIMING}
        {floresville ? ` For permits, check with ${FLORESVILLE_COUNTY}.` : ''}
      </p>
      <div className="bmh-spacer-sm" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Link href="/whats-included-in-setup" className="bmh-pill bmh-pill-static">
          What&rsquo;s Included in Setup →
        </Link>
        <Link href="/how-pricing-works" className="bmh-pill bmh-pill-static">
          How Pricing Works →
        </Link>
      </div>
    </div>
  )
}

export function LandHomeLinkRow({
  links,
}: {
  links: { href: string; label: string }[]
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {links.map((link) => (
        <Link key={link.href + link.label} href={link.href} className="bmh-pill bmh-pill-static">
          {link.label}
        </Link>
      ))}
    </div>
  )
}
