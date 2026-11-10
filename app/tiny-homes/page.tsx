import Link from 'next/link'
import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'
import ListingCard from '@/components/ListingCard'
import { CIRRUS_URL } from '@/components/SiteBlocks'
import { fetchAllListings } from '@/lib/notion'
import { isPromoActive } from '@/lib/promo'
import { isTinyHome } from '@/lib/tinyHomes'

// Content limits for this page (see CLAUDE.md "Tiny homes"): call these
// "tiny homes" or "homes" only — never "manufactured homes" or "HUD-code" —
// and make no financing, setup, delivery or placement claims (several are
// park models, and those can't be verified for every listing). No payment
// amounts: no estimated-payment disclaimer is deployed.

export const revalidate = 3000

const SITE_URL = 'https://www.texashomesdirect.com'
const PAGE_URL = `${SITE_URL}/tiny-homes`
const TITLE = 'Tiny Homes for Sale in Texas'
const DESCRIPTION =
  'Browse one-bedroom tiny homes from Texas Homes Direct. Every listing shows its exact square footage, floor plan, and photos or a 3D tour where available.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
}

const FAQ = [
  {
    q: 'What does Texas Homes Direct mean by a tiny home?',
    a: 'A tiny home is any home we offer with exactly one bedroom, including the ones listed as park models. Definitions of “tiny home” vary, so each listing shows its exact square footage instead of relying on the label.',
  },
  {
    q: 'How can I see a tiny home’s size and layout?',
    a: 'Open the home’s listing. It shows the square footage, the bedroom and bathroom count, and the floor plan.',
  },
  {
    q: 'Do your tiny homes have photos and 3D tours?',
    a: 'Each listing has a floor plan, and most also have photos. Where a home has a 3D tour, you’ll find it on that home’s listing page, so you can walk through it online.',
  },
  {
    q: 'Are park models included on this page?',
    a: 'Yes. Every one-bedroom home we list appears here, including the homes described as park models.',
  },
  {
    q: 'How do I request a quote or the free mortgage analysis?',
    a: 'Call (830) 381-1309, send a request through our contact form, or start the free 3-minute mortgage analysis, which doesn’t pull your credit.',
  },
]

export default async function TinyHomesPage() {
  const all = await fetchAllListings()
  const homes = all
    .filter((l) => (l.status === 'Active' || l.status === 'Repo Deal') && isTinyHome(l))
    .sort((a, b) => a.sqft - b.sqft)

  const minSqft = homes.length ? homes[0].sqft : 0
  const maxSqft = homes.length ? homes[homes.length - 1].sqft : 0
  const rangeLine =
    homes.length === 0
      ? null
      : minSqft === maxSqft
      ? `Our tiny homes are ${minSqft.toLocaleString()} square feet.`
      : `Our tiny homes range from ${minSqft.toLocaleString()} to ${maxSqft.toLocaleString()} square feet.`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Browse', item: `${SITE_URL}/browse` },
      { '@type': 'ListItem', position: 3, name: 'Tiny Homes', item: PAGE_URL },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': PAGE_URL,
    url: PAGE_URL,
    name: TITLE,
    description: DESCRIPTION,
    dateModified: '2026-11-10',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.bmh-faq-speakable', '.bmh-explainer-lead'],
    },
  }

  // Name, URL and image only — no offers, price or ratings.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tiny homes',
    numberOfItems: homes.length,
    itemListElement: homes.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: l.title,
      url: `${SITE_URL}/homes/${l.slug}`,
      ...(l.images[0] ? { image: `${SITE_URL}${l.images[0]}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* BREADCRUMBS */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-canvas)', padding: '16px 0 0' }}>
        <div className="bmh-container" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-muted, #6b7280)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/browse" style={{ color: 'inherit', textDecoration: 'none' }}>Browse</Link>
          <span aria-hidden="true">/</span>
          <span>Tiny Homes</span>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Tiny homes</span>
          <h1>
            Tiny homes for sale
            <br />
            <em>in Texas.</em>
          </h1>
          <p className="bmh-lead bmh-explainer-lead">
            At Texas Homes Direct, a tiny home is any home with one bedroom. Definitions of &ldquo;tiny
            home&rdquo; vary, so we don&rsquo;t lean on the label: every listing below shows its exact
            square footage and floor plan, so you can compare the real size of each home before you
            reach out.
          </p>
          {rangeLine && (
            <p className="bmh-caption" style={{ marginTop: 12 }}>
              {rangeLine}
            </p>
          )}
        </div>
      </section>

      {/* GRID */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)' }}>
        <div className="bmh-container">
          {homes.length > 0 ? (
            <div className="bmh-inv-grid">
              {homes.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  promoActiveAtRender={isPromoActive()}
                  showPayment={false}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p className="bmh-lead" style={{ marginBottom: 20 }}>
                We don&rsquo;t have any one-bedroom homes listed right now.
              </p>
              <Link href="/browse" className="bmh-btn bmh-btn-primary">
                Browse all homes →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bmh-surface-card" style={{ padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose bmh-faq-speakable">
            <h2 className="bmh-city-h2">Frequently Asked Questions</h2>
            <div className="bmh-spacer-sm" />
            <FaqAccordion items={FAQ} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--color-canvas)', padding: '48px 0' }}>
        <div className="bmh-container" style={{ textAlign: 'center' }}>
          <h2 className="bmh-city-h2" style={{ maxWidth: 700, margin: '0 auto' }}>
            Found a tiny home you like?
          </h2>
          <div className="bmh-spacer-lg" />
          <div className="bmh-city-cta-row bmh-city-cta-row-center">
            <div className="bmh-city-cta-item">
              <Link href="/contact" className="bmh-btn bmh-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Request a Quote →
              </Link>
            </div>
            <div className="bmh-city-cta-item">
              <a href={CIRRUS_URL} target="_blank" rel="noopener noreferrer" className="bmh-btn bmh-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Free 3-Minute Mortgage Analysis →
              </a>
              <p className="bmh-caption" style={{ marginTop: 8 }}>No credit pull.</p>
            </div>
            <div className="bmh-city-cta-item bmh-city-cta-phone">
              <a href="tel:+18303811309" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', fontSize: 15 }}>
                Or call (830) 381-1309
              </a>
            </div>
          </div>
          <div className="bmh-spacer-lg" />
          <Link href="/browse" className="bmh-pill bmh-pill-static">
            Browse all homes →
          </Link>
        </div>
      </section>
    </>
  )
}
