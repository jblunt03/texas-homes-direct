import Link from 'next/link'
import type { Metadata } from 'next'
import { REGION_ORDER, citiesByRegion } from '@/lib/cities'

export const metadata: Metadata = {
  title: 'Mobile Homes for Sale Across Texas | Cities We Serve',
  description:
    'Texas Homes Direct delivers new, HUD-certified manufactured and mobile homes to families all across Texas. Find your city and get a free, no-pressure quote.',
  alternates: {
    canonical: 'https://www.texashomesdirect.com/cities',
  },
}

const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'

function CtaRow() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
      }}
    >
      <a
        href={CIRRUS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bmh-btn bmh-btn-primary bmh-btn-lg"
      >
        Get My Free 3-Minute Mortgage Analysis →
      </a>
      <Link href="/contact" className="bmh-btn bmh-btn-secondary bmh-btn-lg">
        Get My Delivery Quote →
      </Link>
      <a
        href="tel:+18303811309"
        style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}
      >
        Or call (830) 381-1309
      </a>
    </div>
  )
}

export default function CitiesPage() {
  const grouped = citiesByRegion()
  const regionsWithCities = REGION_ORDER.filter((region) => (grouped[region]?.length ?? 0) > 0)

  const allPublished = REGION_ORDER.flatMap((region) => grouped[region] ?? [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mobile Homes for Sale Across Texas | Cities We Serve',
    description:
      'Texas Homes Direct delivers new, HUD-certified manufactured and mobile homes to families all across Texas.',
    url: 'https://www.texashomesdirect.com/cities',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allPublished.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://www.texashomesdirect.com/mobile-homes-${c.slug}-tx`,
        name: `Mobile Homes for Sale in ${c.name}, TX`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Cities we serve</span>
          <h1>Mobile Homes for Sale Across Texas</h1>
          <p className="bmh-lead">
            Texas is a big state, and we don&rsquo;t think that should stand between you and a
            home you can actually afford. Texas Homes Direct delivers new, HUD-certified
            manufactured and mobile homes to families all across Texas — from the Panhandle
            down to the Rio Grande Valley, out to El Paso and back to the Piney Woods of East
            Texas. We&rsquo;re a faith-based, family-owned business, and we run things a
            little different than the typical dealership: no pushy sales tactics, no games
            with pricing, just honest answers and financing that actually makes sense for
            your budget. Whether you&rsquo;ve got land ready to go or you&rsquo;re still
            figuring out where to put your new home, we&rsquo;ll walk you through it step by
            step — same as we would for our own family. Find your city below and let&rsquo;s
            get started.
          </p>
        </div>
      </section>

      {/* ── CTAs ─────────────────────────────────────────────────── */}
      <section className="bmh-section-sm" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <CtaRow />
        </div>
      </section>

      {/* ── CITY DIRECTORY ──────────────────────────────────────── */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)' }}>
        <div className="bmh-container">
          <div className="bmh-section-head">
            <h2>
              Find your <em>city.</em>
            </h2>
          </div>
          <div className="bmh-spacer-lg" />

          {regionsWithCities.length === 0 ? (
            <p className="bmh-lead bmh-muted">
              We&rsquo;re actively publishing city pages — check back soon, or call us and
              we&rsquo;ll tell you right now whether we deliver to your area.
            </p>
          ) : (
            regionsWithCities.map((region) => (
              <div key={region} className="bmh-city-region">
                <h3 className="bmh-city-region-title">{region}</h3>
                <div className="bmh-city-grid">
                  {grouped[region]!.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/mobile-homes-${c.slug}-tx`}
                      className="bmh-city-link"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)' }}>
        <div className="bmh-container-narrow" style={{ textAlign: 'center' }}>
          <h2>
            Don&rsquo;t see your city yet? <em>Call us anyway.</em>
          </h2>
          <div className="bmh-spacer-md" />
          <p className="bmh-lead">
            We&rsquo;re adding new cities all the time, and there&rsquo;s a good chance we
            already deliver to your area even if it&rsquo;s not listed above.
          </p>
          <div className="bmh-spacer-lg" />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CtaRow />
          </div>
        </div>
      </section>
    </>
  )
}
