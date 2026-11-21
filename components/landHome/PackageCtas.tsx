import { CIRRUS_URL } from '@/components/SiteBlocks'
import TrackedLink from '@/components/landHome/TrackedLink'

/**
 * The three Land-Home Packages CTAs: quote form, the finance application
 * (CIRRUS_URL, the same link the rest of the site uses) and the phone. Each
 * fires the GA4 event "land_home_cta" with { cta, page }.
 */
export default function PackageCtas({ page, center = false }: { page: string; center?: boolean }) {
  return (
    <div className={`bmh-city-cta-row${center ? ' bmh-city-cta-row-center' : ''}`}>
      <div className="bmh-city-cta-item">
        <TrackedLink
          href="/contact"
          event="land_home_cta"
          params={{ cta: 'quote', page }}
          className="bmh-btn bmh-btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Get a Free Quote →
        </TrackedLink>
      </div>
      <div className="bmh-city-cta-item">
        <TrackedLink
          href={CIRRUS_URL}
          external
          event="land_home_cta"
          params={{ cta: 'finance', page }}
          className="bmh-btn bmh-btn-secondary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Apply for Financing →
        </TrackedLink>
      </div>
      <div className="bmh-city-cta-item bmh-city-cta-phone">
        <TrackedLink
          href="tel:+18303811309"
          event="land_home_cta"
          params={{ cta: 'phone', page }}
          style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', fontSize: 15 }}
        >
          Or call (830) 381-1309
        </TrackedLink>
      </div>
    </div>
  )
}
