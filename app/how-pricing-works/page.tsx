import Link from 'next/link'
import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'
import { OUT_THE_DOOR_ITEMS } from '@/lib/setupItems'

const SITE_URL = 'https://www.texashomesdirect.com'
const PAGE_URL = `${SITE_URL}/how-pricing-works`
const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'

export const metadata: Metadata = {
  title: 'How Pricing Works: Out-The-Door Home Pricing & Utility Costs',
  description:
    'Two numbers make up what you pay for a manufactured home: a firm, all-in home price, and a utility hookup cost that depends on your land. Here’s exactly how each one works.',
  alternates: {
    canonical: PAGE_URL,
  },
}

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const FAQ = [
  {
    q: 'Does the out-the-door home price ever change after I’ve committed to a home?',
    a: 'No. Once you have a quote on a specific home, that price is locked — AC, setup, delivery, appliances, trim out, wood steps, tax, title, and license are all already included. Nothing gets added between quote and closing.',
  },
  {
    q: 'Why can’t you just give me one number that includes utilities?',
    a: 'Because an honest utility number depends on your specific property — soil conditions, distance to power, whether you’re on well and septic or existing service, and depth to water all vary from lot to lot, even within the same county. A flat number quoted sight-unseen would just be a guess, and we’d rather give you a real one.',
  },
  {
    q: 'How long does it take to get the exact utility bid?',
    a: 'It depends on scheduling with our contractor and where your property is located, so we won’t promise a fixed turnaround — but we’ll keep you updated throughout, and you’ll see the exact number and approve it before it’s treated as final.',
  },
  {
    q: 'Is the phone estimate for utilities binding?',
    a: 'No — it’s a starting point to help you budget early on, not a quote. The number that actually matters is the one our contractor gives you after visiting the property.',
  },
  {
    q: 'What if the utility bid comes in higher than I expected?',
    a: 'You review and approve the exact bid before it becomes part of your total — it’s never added without your sign-off. If the number doesn’t work for your budget, we’ll talk through what options you have.',
  },
  {
    q: 'Is setup part of the home price, or a separate cost?',
    a: 'Setup is already included in your out-the-door home price. See our full breakdown of everything setup covers.',
  },
]

export default function HowPricingWorksPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'How Pricing Works', item: PAGE_URL },
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
    name: 'How Pricing Works: Out-The-Door Home Pricing & Utility Costs',
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
          <span>How Pricing Works</span>
        </div>
      </nav>

      {/* ── H1 + INTRO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 32px' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Buyer&rsquo;s Guide</span>
          <h1 className="bmh-city-h1">
            How Pricing <em>Works</em>
          </h1>
          <p className="bmh-lead bmh-explainer-lead">
            Two different numbers make up what you&rsquo;ll actually pay for a manufactured home: the price of
            the home itself, which we quote firm and complete, and utility hookup costs, which depend on your
            specific property and can&rsquo;t be known until someone&rsquo;s actually seen it. Here&rsquo;s
            exactly how each one works, and why we won&rsquo;t pretend to know your utility number over the
            phone.
          </p>
        </div>
      </section>

      {/* ── OUT-THE-DOOR PRICING ─────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">Out-The-Door Home Pricing</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              When we quote a home, that number is firm and complete — not a starting point that grows once
              you&rsquo;re a few steps into the process. Every quote already includes the items below, so the
              number you budget around is the number you actually pay.
            </p>
          </div>

          <div className="bmh-spacer-md" />

          <div className="bmh-city-checklist">
            <h3 className="bmh-city-h3">What&rsquo;s Included</h3>
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
            <p className="bmh-lead">
              &ldquo;Setup&rdquo; above covers the physical site work — base pad, blocking, tie-down,
              underpinning, skirting, and more. See the full setup checklist for what each part actually
              involves.
            </p>
          </div>
        </div>
      </section>

      {/* ── UTILITY PROCESS ─────────────────────────────────────── */}
      <section className="bmh-surface-card" style={{ padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">Why We Can&rsquo;t Quote Utility Costs Over the Phone</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              Utility hookups — water, septic, and electric — depend entirely on the property they&rsquo;re
              going on. Soil conditions, how far the site is from existing power, whether you&rsquo;re drilling
              a well or connecting to a line already there, and how deep the water table sits all change the
              cost, sometimes significantly, from one lot to the next. A number given over the phone, before
              anyone has seen the land, can only ever be a guess. We&rsquo;d rather tell you that upfront than
              hand you a number we can&rsquo;t stand behind.
            </p>
          </div>

          <div className="bmh-spacer-md" />

          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">The Two-Step Process</h3>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              <strong>1. Phone estimate.</strong> Based on general information you give us about your property,
              we&rsquo;ll give you a starting estimate — useful for early budgeting, but not a final number.
            </p>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              <strong>2. On-site contractor bid.</strong> Our own contractor visits the property and produces
              an exact bid based on what&rsquo;s actually there. You see that number and approve it before it
              becomes part of your total — nothing is added without your sign-off.
            </p>
          </div>

          <div className="bmh-spacer-md" />

          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">Putting It Together</h3>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              Your full total is the fixed, out-the-door home price plus the exact utility bid once it&rsquo;s
              been approved — both numbers you&rsquo;ve seen before you sign anything. Nothing shows up
              afterward that isn&rsquo;t already accounted for in one of those two figures.
            </p>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ──────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '32px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">Related Guides</h3>
            <div className="bmh-spacer-sm" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href="/whats-included-in-setup" className="bmh-pill bmh-pill-static">
                What&rsquo;s Included in Setup →
              </Link>
              <Link href="/manufactured-vs-mobile-home" className="bmh-pill bmh-pill-static">
                Mobile Home vs. Manufactured Home →
              </Link>
              <Link href="/cities" className="bmh-pill bmh-pill-static">
                Find Your City →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
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
