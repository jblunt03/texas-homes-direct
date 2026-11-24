import Link from 'next/link'
import Image from 'next/image'
import type { CityEntry } from '@/lib/cities'
import type { CityContent } from '@/lib/cityContent'
import { cityDeliveryParagraph, cityFact, cityFactsLine } from '@/lib/cityFacts'
import { cityDeepening } from '@/lib/cityDeepening'
import { faqAnswerHtml, withFaqHtml } from '@/lib/flaggedCopy'
import { inScopeImageAlt } from '@/lib/inScopeImageAlt'
import { nearbyFor } from '@/lib/nearbyCities'
import { findListingByAnySlug } from '@/lib/listingLookup'
import GoogleReviewLinks from '@/components/GoogleReviewLinks'
import {
  TURNKEY_ITEMS,
  CASH_PRICE_ITEMS,
  CASH_PRICE_HEADING,
  PRICE_RULE_STATEMENT,
  SETUP_FINANCE_CAPTION,
} from '@/lib/setupItems'
import FaqAccordion from '@/components/FaqAccordion'
import ListingPrice from '@/components/ListingPrice'
import PaymentFootnote from '@/components/PaymentFootnote'

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
  const heroAlt = inScopeImageAlt(content.heroImage, content.heroAlt)
  const secondaryAlt = inScopeImageAlt(content.secondaryImage, content.secondaryAlt)
  const fact = cityFact(city.slug)
  const deepening = cityDeepening(city.slug)
  const faqItems = deepening ? withFaqHtml(deepening.faq) : content.faq
  // Six linked city pages from the batch file. No unlinked names.
  const nearbyCities = nearbyFor(city.slug)

  const popular = content.popularHomes
    // popularHomes in lib/cityContent.ts may hold legacy slugs; resolve each
    // to its listing so cards always link to the current URL.
    .map((slug) => findListingByAnySlug(slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const imageJsonLd = [
    { '@context': 'https://schema.org', '@type': 'ImageObject', contentUrl: heroUrl, description: heroAlt },
    { '@context': 'https://schema.org', '@type': 'ImageObject', contentUrl: secondaryUrl, description: secondaryAlt },
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
    dateModified: deepening ? '2026-11-24' : (content.lastModified ?? '2026-09-10'),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.bmh-faq-speakable'],
    },
  }

  return (
    <>
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
            <Image src={content.heroImage} alt={heroAlt} fill style={{ objectFit: 'cover' }} priority />
          </div>
        </div>
      </section>

      {/* ── GETTING STARTED ──────────────────────────────────────── */}
      {content.gettingStarted && (
        <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
          <div className="bmh-container">
            <div className="bmh-city-prose">
              <h2 className="bmh-city-h2">Getting Started in {content.county} County</h2>
              {content.gettingStarted.map((paragraph, i) => (
                <p key={i} className="bmh-lead" style={{ marginTop: 12 }}>{paragraph}</p>
              ))}
              {fact && (
                <p className="bmh-caption" style={{ marginTop: 12 }}>{cityFactsLine(fact)}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {deepening ? (
        <>
          <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
            <div className="bmh-container">
              <div className="bmh-city-prose">
                <h2 className="bmh-city-h2">{`Getting a home delivered to ${city.name}`}</h2>
                {deepening.delivery.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="bmh-lead" style={{ marginTop: 12 }}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
          <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
            <div className="bmh-container">
              <div className="bmh-city-prose">
                <h2 className="bmh-city-h2">{`Land and placement in ${city.name}`}</h2>
                <p
                  className="bmh-lead"
                  style={{ marginTop: 12 }}
                  dangerouslySetInnerHTML={{ __html: faqAnswerHtml(deepening.placement, []) }}
                />
              </div>
            </div>
          </section>
        </>
      ) : fact ? (
        <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
          <div className="bmh-container">
            <div className="bmh-city-prose">
              <h2 className="bmh-city-h2">{`Getting a home delivered to ${city.name}`}</h2>
              <p className="bmh-lead" style={{ marginTop: 12 }}>{cityDeliveryParagraph(fact)}</p>
            </div>
          </div>
        </section>
      ) : null}

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
              {SETUP_FINANCE_CAPTION}
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

      {/* ── CASH PRICE + UTILITIES ───────────────────────────────── */}
      {content.pricingExplainer && (
        <section className="bmh-surface-card" style={{ padding: '40px 0' }}>
          <div className="bmh-container">
            <div className="bmh-city-prose">
              <h2 className="bmh-city-h2">Your Price, Explained</h2>
              <p className="bmh-lead" style={{ marginTop: 12 }}>{content.pricingExplainer[0]}</p>
            </div>

            <div className="bmh-spacer-md" />

            <div className="bmh-city-checklist">
              <h3 className="bmh-city-h3">{CASH_PRICE_HEADING}</h3>
              <p className="bmh-caption" style={{ marginBottom: 16 }}>
                {PRICE_RULE_STATEMENT}
              </p>
              <div className="bmh-city-checklist-grid">
                {CASH_PRICE_ITEMS.map((item) => (
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

      {/* ── HOMES TO GET YOU STARTED (fit-based selection, not */}
      {/* popularity — see scripts/assign_popular_homes.py) ───────── */}
      {popular.length > 0 && (
        <section style={{ background: 'var(--color-canvas)', padding: '40px 0' }}>
          <div className="bmh-container">
            <div className="bmh-section-head" style={{ marginBottom: 0 }}>
              <h2 className="bmh-city-h2" style={{ margin: 0 }}>
                Homes to <em>Get You Started</em>
              </h2>
              <Link href="/browse" className="bmh-btn bmh-btn-secondary">
                View our full inventory →
              </Link>
            </div>
            <div className="bmh-spacer-md" />
            <div className="bmh-inv-grid">
              {popular.map((listing) => (
                <div key={listing.slug} className="bmh-inv-card bmh-inv-card-stretch">
                  <div className="bmh-ratio-3x2 bmh-inv-card-media" style={{ position: 'relative' }}>
                    {listing.images[0] && (
                      <Image
                        src={listing.images[0]}
                        alt={inScopeImageAlt(listing.images[0], `${listing.title} exterior`)}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="bmh-inv-card-body">
                    <h3 className="bmh-inv-card-title" style={{ fontSize: 22 }}>
                      <Link href={`/homes/${listing.slug}`} className="bmh-card-link">
                        {listing.title}
                      </Link>
                    </h3>
                    <p className="bmh-inv-card-sub">
                      {listing.wideType ?? 'Singlewide'} · {listing.beds} bd · {listing.baths} ba · {listing.sqft.toLocaleString()} sqft
                    </p>
                    <div className="bmh-inv-card-footer">
                      <span className="bmh-inv-card-price">
                        <ListingPrice price={listing.price} monthlyPayment={listing.monthlyPayment} />
                      </span>
                      <span className="bmh-inv-card-link">View →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {popular.some((l) => l.monthlyPayment > 0) && <PaymentFootnote />}
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
            <FaqAccordion items={faqItems} defaultOpen={0} />
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

      <GoogleReviewLinks />

      {/* ── NEARBY AREAS ─────────────────────────────────────────── */}
      <section className="bmh-surface-card" style={{ padding: '32px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">Also Serving Nearby Areas</h3>
            <div className="bmh-spacer-sm" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {nearbyCities.map((c) => (
                <Link key={c.slug} href={c.url} className="bmh-pill bmh-pill-static">
                  {c.name}
                </Link>
              ))}
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
