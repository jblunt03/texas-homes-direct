import Link from 'next/link'
import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'

const SITE_URL = 'https://www.texashomesdirect.com'
const PAGE_URL = `${SITE_URL}/manufactured-vs-mobile-home`
const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'

export const metadata: Metadata = {
  title: 'Mobile Home vs. Manufactured Home: What’s Actually Different',
  description:
    'Mobile home or manufactured home — same thing? Not legally. The real difference comes down to a single date, June 1976, and what it changed about how these homes are built.',
  alternates: {
    canonical: PAGE_URL,
  },
}

const FAQ = [
  {
    q: 'Is a manufactured home the same thing as a mobile home?',
    a: 'Not technically. Both are factory-built homes moved to a site, but they’re governed by different construction standards depending on when they were built. A home built before June 15, 1976 is classified as a mobile home. A home built on or after that date, to the federal HUD Code, is a manufactured home. In everyday conversation people use the terms interchangeably, but the classification itself is tied to that date, not to preference.',
  },
  {
    q: 'Does Texas Homes Direct sell mobile homes or manufactured homes?',
    a: 'Manufactured homes — every home we sell is new and built to current HUD Code. We don’t carry older, pre-1976 mobile home stock.',
  },
  {
    q: 'Does it matter which term I use when I’m shopping?',
    a: 'Not for the purpose of finding a home — most listings, lenders, and county offices will understand either term. It matters more when you’re reading fine print: a used "mobile home" for sale privately could legally be pre-1976 stock, built to a different (older) standard than anything currently manufactured. New inventory, like what we sell, doesn’t have that ambiguity.',
  },
  {
    q: 'What’s the difference between a single wide and a double wide?',
    a: 'That’s a separate question from mobile vs. manufactured — it’s about how many sections the home is built in, not when it was built or what code it meets. A single wide ships as one complete section. A double wide ships as two sections that are joined and finished on-site, which is why it offers more total square footage.',
  },
  {
    q: 'Where can I see exactly what’s included in the price of a manufactured home?',
    a: 'See our full breakdown of out-the-door pricing and how utility costs are estimated, and a separate page covering everything included in on-site setup.',
  },
]

export default function ManufacturedVsMobileHomePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Mobile Home vs. Manufactured Home', item: PAGE_URL },
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
    name: 'Mobile Home vs. Manufactured Home: What’s Actually Different',
    dateModified: '2026-09-18',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.bmh-faq-speakable', '.bmh-explainer-lead'],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      {/* ── BREADCRUMBS ─────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-canvas)', padding: '16px 0 0' }}>
        <div className="bmh-container" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-muted, #6b7280)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">/</span>
          <span>Mobile Home vs. Manufactured Home</span>
        </div>
      </nav>

      {/* ── H1 + INTRO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 32px' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Buyer&rsquo;s Guide</span>
          <h1 className="bmh-city-h1">
            Mobile Home vs. Manufactured Home:
            <br />
            <em>What&rsquo;s Actually Different</em>
          </h1>
          <p className="bmh-lead bmh-explainer-lead">
            Most people use &ldquo;mobile home&rdquo; and &ldquo;manufactured home&rdquo; as if they mean the same
            thing, and in casual conversation, that&rsquo;s fine. Legally and structurally, though, they&rsquo;re
            not interchangeable — the difference comes down to a single date that changed how these homes are
            built, and it&rsquo;s worth knowing before you buy.
          </p>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">The June 1976 Line</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              In June of 1976, the U.S. Department of Housing and Urban Development (HUD) put a new federal
              building code into effect for factory-built homes — covering things like structural design,
              fire safety, and construction quality. That code is what most people mean today when they talk
              about a home being &ldquo;up to code&rdquo; in the manufactured housing world.
            </p>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              The classification follows that date directly: a home built before June 15, 1976 is a mobile
              home. A home built on or after that date, to the HUD Code, is a manufactured home. Both are
              built in a factory and transported to a site — the difference is the construction standard
              they were built to, not the general concept of the home.
            </p>
          </div>

          <div className="bmh-spacer-lg" />

          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">Why the Term &ldquo;Mobile Home&rdquo; Never Went Away</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              If the construction code changed in 1976, why does everyone still say &ldquo;mobile home&rdquo;
              almost fifty years later? Mostly habit — the term was already in everyday use before the code
              existed, and it stuck around in casual conversation, in classified ads, and even on some older
              signage, long after the underlying construction standard moved on. That&rsquo;s harmless in most
              contexts. It matters more if you&rsquo;re evaluating a specific home rather than the general
              concept: a home marketed informally as a &ldquo;mobile home&rdquo; for sale could, in theory, still
              be older pre-1976 stock built to a different, less rigorous standard than anything built today.
            </p>
          </div>

          <div className="bmh-spacer-lg" />

          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">What This Means When You&rsquo;re Buying New</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              Every home Texas Homes Direct sells is new and built to current HUD Code — we don&rsquo;t carry
              older mobile home inventory. Each home is factory-inspected before it ships, and the code itself
              is federal, so it applies the same way regardless of which Texas county you&rsquo;re building in.
              When you&rsquo;re comparing a new manufactured home to anything described as a &ldquo;mobile
              home,&rdquo; that build-date distinction is the one thing worth actually confirming.
            </p>
          </div>

          <div className="bmh-spacer-lg" />

          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">A Different Question: Single Wide vs. Double Wide</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              This one trips people up alongside the mobile-vs-manufactured question, but it&rsquo;s unrelated.
              Single wide and double wide describe how many sections a home ships in — not when it was built
              or what code it meets. A single wide arrives as one complete section. A double wide ships as two
              sections that are joined and finished on your property, which is what gives it meaningfully more
              square footage. Both are manufactured homes when built to current code; the section count is
              simply a sizing decision.
            </p>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ──────────────────────────────────────── */}
      <section className="bmh-surface-card" style={{ padding: '32px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">Related Guides</h3>
            <div className="bmh-spacer-sm" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href="/how-pricing-works" className="bmh-pill bmh-pill-static">
                How Pricing Works →
              </Link>
              <Link href="/whats-included-in-setup" className="bmh-pill bmh-pill-static">
                What&rsquo;s Included in Setup →
              </Link>
              <Link href="/cities" className="bmh-pill bmh-pill-static">
                Find Your City →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose bmh-faq-speakable">
            <h2 className="bmh-city-h2">Frequently Asked Questions</h2>
            <div className="bmh-spacer-sm" />
            <FaqAccordion items={FAQ} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '48px 0' }}>
        <div className="bmh-container" style={{ textAlign: 'center' }}>
          <h2 className="bmh-city-h2" style={{ maxWidth: 700, margin: '0 auto' }}>
            Ready to see what fits your budget?
          </h2>
          <div className="bmh-spacer-lg" />
          <div className="bmh-city-cta-row bmh-city-cta-row-center">
            <div className="bmh-city-cta-item">
              <a href={CIRRUS_URL} target="_blank" rel="noopener noreferrer" className="bmh-btn bmh-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Get My Free 3-Minute Mortgage Analysis →
              </a>
            </div>
            <div className="bmh-city-cta-item">
              <Link href="/contact" className="bmh-btn bmh-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Get My Delivery Quote →
              </Link>
            </div>
            <div className="bmh-city-cta-item bmh-city-cta-phone">
              <a href="tel:+18303811309" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', fontSize: 15 }}>
                Or call (830) 381-1309
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
