import Link from 'next/link'
import Image from 'next/image'
import type { CityEntry } from '@/lib/cities'
import { TEXAS_CITIES } from '@/lib/cities'
import type { CityContent } from '@/lib/cityContent'
import { sampleListings } from '@/lib/sampleListings'
import { TURNKEY_ITEMS, OUT_THE_DOOR_ITEMS } from '@/lib/setupItems'
import FaqAccordion from '@/components/FaqAccordion'

const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'
const SITE_URL = 'https://www.texashomesdirect.com'

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function CtaRow({ center = false }: { center?: boolean }) {
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

export default function CityPageContentV2({
  city,
  content,
}: {
  city: CityEntry
  content: CityContent
}) {
  const pageUrl = `${SITE_URL}/mobile-homes-${city.slug}-tx`
  const heroUrl = `${SITE_URL}${content.heroImage}`
  const secondaryUrl = `${SITE_URL}${content.secondaryImage}`

  // Nearby cities render as real links only when a page exists for them —
  // otherwise as a plain (unlinked) label, so we never ship a dead link.
  const nearbyCities = content.nearby
    .map((slug) => TEXAS_CITIES.find((c) => c.slug === slug))
    .filter((c): c is CityEntry => Boolean(c))

  const popular = content.popularHomes
    .map((slug) => sampleListings.find((l) => l.slug === slug))
    .filter((l): l is (typeof sampleListings)[number] => Boolean(l))

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Texas Homes Direct — ${city.name}, TX`,
    url: pageUrl,
    telephone: '+1-830-381-1309',
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: [
        { '@type': 'AdministrativeArea', name: `${content.county} County` },
        { '@type': 'State', name: 'Texas' },
      ],
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const imageJsonLd = [
    { '@context': 'https://schema.org', '@type': 'ImageObject', contentUrl: heroUrl, description: content.heroAlt },
    { '@context': 'https://schema.org', '@type': 'ImageObject', contentUrl: secondaryUrl, description: content.secondaryAlt },
  ]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Cities', item: `${SITE_URL}/cities` },
      { '@type': 'ListItem', position: 3, name: `${city.name}, TX`, item: pageUrl },
    ],
  }

  // Speakable targets the FAQ section (class added below) for voice-search
  // assistants. dateModified falls back to today if a city hasn't been
  // given a lastModified value yet — see lib/cityContent.ts.
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: `Mobile Homes for Sale in ${city.name}, TX`,
    dateModified: content.lastModified ?? '2026-09-10',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.bmh-faq-speakable'],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      {imageJsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      {/* ── BREADCRUMBS ──────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-canvas)', padding: '16px 0 0' }}>
        <div className="bmh-container" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-muted, #6b7280)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cities" style={{ color: 'inherit', textDecoration: 'none' }}>Cities</Link>
          <span aria-hidden="true">/</span>
          <span>{city.name}, TX</span>
        </div>
      </nav>

      {/* ── H1 + INTRO ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 32px' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">{content.county} County, Texas</span>
          <h1 className="bmh-city-h1">
            Mobile Homes for Sale in
            <br />
            <em>{city.name}, TX</em>
          </h1>
          <p className="bmh-lead bmh-city-prose">{content.intro}</p>
        </div>
      </section>

      {/* ── HERO IMAGE ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', paddingBottom: 40 }}>
        <div className="bmh-container">
          <div className="bmh-ratio-16x9" style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Image src={content.heroImage} alt={content.heroAlt} fill style={{ objectFit: 'cover' }} priority />
          </div>
        </div>
      </section>

      {/* ── BUYING SECTION + CHECKLIST ───────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">{content.buyingHeading}</h2>
            {content.buying.map((paragraph, i) => (
              <p key={i} className="bmh-lead" style={{ marginTop: 12 }}>{paragraph}</p>
            ))}
          </div>

          <div className="bmh-spacer-md" />

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
          </div>
        </div>
      </section>

      {/* ── OUT-THE-DOOR PRICING + UTILITIES ─────────────────────── */}
      {content.pricingExplainer && (
        <section className="bmh-surface-card" style={{ padding: '40px 0' }}>
          <div className="bmh-container">
            <div className="bmh-city-prose">
              <h2 className="bmh-city-h2">Your Price, Explained</h2>
              <p className="bmh-lead" style={{ marginTop: 12 }}>{content.pricingExplainer[0]}</p>
            </div>

            <div className="bmh-spacer-md" />

            <div className="bmh-city-checklist">
              <h3 className="bmh-city-h3">Out-The-Door Pricing</h3>
              <p className="bmh-caption" style={{ marginBottom: 16 }}>
                Firm and complete — nothing gets added later.
              </p>
              <div className="bmh-city-checklist-grid">
                {OUT_THE_DOOR_ITEMS.map((item) => (
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
            </div>

            <div className="bmh-spacer-md" />

            <div className="bmh-city-prose">
              <h3 className="bmh-city-h3">How Utility Costs Work</h3>
              <p className="bmh-lead" style={{ marginTop: 12 }}>{content.pricingExplainer[1]}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── FINANCING + CTAs ─────────────────────────────────────── */}
      <section style={{ padding: '40px 0' }}>
        <div className="bmh-container">
          <h2 className="bmh-city-h2">Financing Made Simple</h2>
          <div className="bmh-spacer-md" />
          <div className="bmh-city-financing-grid">
            <div className="bmh-city-financing-item">
              <h4 className="bmh-city-h4">In-House Financing</h4>
              <p className="bmh-body-sm">Texas Homes Direct finances directly — one point of contact, start to finish.</p>
            </div>
            <div className="bmh-city-financing-item">
              <h4 className="bmh-city-h4">Public Lenders</h4>
              <p className="bmh-body-sm">We also work with several public lending programs to fit different budgets.</p>
            </div>
            <div className="bmh-city-financing-item">
              <h4 className="bmh-city-h4">Private Lending</h4>
              <p className="bmh-body-sm">A handful of private lending partners for buyers who don&rsquo;t fit a standard loan profile.</p>
            </div>
          </div>
          <div className="bmh-spacer-lg" />
          <CtaRow />
        </div>
      </section>

      {/* ── POPULAR HOMES ────────────────────────────────────────── */}
      {popular.length > 0 && (
        <section style={{ background: 'var(--color-canvas)', padding: '40px 0' }}>
          <div className="bmh-container">
            <div className="bmh-section-head" style={{ marginBottom: 0 }}>
              <h2 className="bmh-city-h2" style={{ margin: 0 }}>
                Popular Homes to <em>Consider</em>
              </h2>
              <Link href="/browse" className="bmh-btn bmh-btn-secondary">
                View our full inventory →
              </Link>
            </div>
            <div className="bmh-spacer-md" />
            <div className="bmh-inv-grid">
              {popular.map((listing) => (
                <Link key={listing.slug} href={`/homes/${listing.slug}`} className="bmh-inv-card" style={{ textDecoration: 'none' }}>
                  <div className="bmh-ratio-3x2 bmh-inv-card-media" style={{ position: 'relative' }}>
                    {listing.images[0] && (
                      <Image
                        src={listing.images[0]}
                        alt={`${listing.title} exterior`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="bmh-inv-card-body">
                    <h3 className="bmh-inv-card-title" style={{ fontSize: 22 }}>
                      {listing.title}
                    </h3>
                    <p className="bmh-inv-card-sub">
                      {listing.wideType ?? 'Singlewide'} · {listing.beds} bd · {listing.baths} ba · {listing.sqft.toLocaleString()} sqft
                    </p>
                    <div className="bmh-inv-card-footer">
                      <span className="bmh-inv-card-price">
                        {listing.monthlyPayment > 0 ? `$${listing.monthlyPayment.toLocaleString()}/mo` : 'Call for price'}
                      </span>
                      <span className="bmh-inv-card-link">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LOCAL PROOF ──────────────────────────────────────────── */}
      <section className="bmh-surface-card" style={{ padding: '32px 0' }}>
        <div className="bmh-container">
          <p className="bmh-lead bmh-city-prose" style={{ margin: 0 }}>{content.localProof}</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose bmh-faq-speakable">
            <h2 className="bmh-city-h2">Frequently Asked Questions</h2>
            <div className="bmh-spacer-sm" />
            <FaqAccordion items={content.faq} defaultOpen={0} />
          </div>

          <div className="bmh-spacer-md" />

          <div className="bmh-city-prose">
            <p className="bmh-caption" style={{ marginBottom: 10 }}>Want the fuller picture?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href="/manufactured-vs-mobile-home" className="bmh-pill bmh-pill-static">
                Mobile Home vs. Manufactured Home →
              </Link>
              <Link href="/how-pricing-works" className="bmh-pill bmh-pill-static">
                How Pricing Works →
              </Link>
              <Link href="/whats-included-in-setup" className="bmh-pill bmh-pill-static">
                What&rsquo;s Included in Setup →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEARBY AREAS ─────────────────────────────────────────── */}
      <section className="bmh-surface-card" style={{ padding: '32px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">Also Serving Nearby Areas</h3>
            <div className="bmh-spacer-sm" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {nearbyCities.map((c) =>
                c.published ? (
                  <Link key={c.slug} href={`/mobile-homes-${c.slug}-tx`} className="bmh-pill bmh-pill-static">
                    {c.name}
                  </Link>
                ) : (
                  <span key={c.slug} className="bmh-pill bmh-pill-static" style={{ opacity: 0.6, cursor: 'default' }}>
                    {c.name}
                  </span>
                )
              )}
              <Link href="/cities" className="bmh-pill bmh-pill-static">
                See all cities we serve →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTAs ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '48px 0' }}>
        <div className="bmh-container" style={{ textAlign: 'center' }}>
          <h2 className="bmh-city-h2" style={{ maxWidth: 700, margin: '0 auto' }}>
            Ready to see what fits your budget in {city.name}?
          </h2>
          <div className="bmh-spacer-lg" />
          <CtaRow center />
        </div>
      </section>
    </>
  )
}
