import Link from 'next/link'
import { TURNKEY_ITEMS } from '@/lib/setupItems'

/**
 * Shared page blocks for non-city pages (reviews, tiny homes, ...). The markup
 * and class names match the CTA row and "We Handle It All" checklist in
 * CityPageContentV2.tsx exactly, so they look identical. City pages keep
 * their own copy — they weren't refactored onto this file, to keep their
 * rendered HTML byte-for-byte unchanged.
 */

export const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export function CtaRow({ center = false }: { center?: boolean }) {
  return (
    <div className={`bmh-city-cta-row${center ? ' bmh-city-cta-row-center' : ''}`}>
      <div className="bmh-city-cta-item">
        <a href={CIRRUS_URL} target="_blank" rel="noopener noreferrer" className="bmh-btn bmh-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          Get My Free 3-Minute Mortgage Analysis →
        </a>
        <p className="bmh-caption" style={{ marginTop: 8 }}>
          No credit pull — see your estimated payment, down payment, and rate.
        </p>
      </div>
      <div className="bmh-city-cta-item">
        <Link href="/contact" className="bmh-btn bmh-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
          Get My Delivery Quote →
        </Link>
        <p className="bmh-caption" style={{ marginTop: 8 }}>
          Quick form — tell us what you&rsquo;re looking for.
        </p>
      </div>
      <div className="bmh-city-cta-item bmh-city-cta-phone">
        <a href="tel:+18303811309" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', fontSize: 15 }}>
          Or call (830) 381-1309
        </a>
      </div>
    </div>
  )
}

export function TurnkeyChecklist() {
  return (
    <div className="bmh-city-checklist">
      <h3 className="bmh-city-h3">We Handle It All</h3>
      <p className="bmh-caption" style={{ marginBottom: 16 }}>
        Full turnkey setup, rolled into your loan instead of paid out of pocket.
      </p>
      <div className="bmh-city-checklist-grid">
        {TURNKEY_ITEMS.map((item) => (
          <div key={item.title} className="bmh-city-checklist-item">
            <span className="bmh-city-check">
              <CheckIcon />
            </span>
            <div>
              <p className="bmh-city-checklist-item-title">{item.title}</p>
              <p className="bmh-city-checklist-item-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="bmh-caption" style={{ marginTop: 16 }}>
        <Link href="/whats-included-in-setup" style={{ color: 'var(--color-primary)' }}>
          See what each setup step includes →
        </Link>
      </p>
    </div>
  )
}

export function RelatedLinks({ heading = 'Keep Exploring' }: { heading?: string }) {
  const links = [
    { href: '/browse', label: 'Browse Homes' },
    { href: '/cities', label: 'Find Your City' },
    { href: '/how-pricing-works', label: 'How Pricing Works' },
    { href: '/whats-included-in-setup', label: 'What’s Included in Setup' },
    { href: '/manufactured-vs-mobile-home', label: 'Mobile Home vs. Manufactured Home' },
  ]
  return (
    <div className="bmh-city-prose">
      <h3 className="bmh-city-h3">{heading}</h3>
      <div className="bmh-spacer-sm" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="bmh-pill bmh-pill-static">
            {l.label} →
          </Link>
        ))}
      </div>
    </div>
  )
}
