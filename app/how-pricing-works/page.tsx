import Link from 'next/link'
import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'
import { CASH_PRICE_ITEMS, CASH_PRICE_HEADING, PRICE_RULE_STATEMENT } from '@/lib/setupItems'

const SITE_URL = 'https://www.texashomesdirect.com'
const PAGE_URL = `${SITE_URL}/how-pricing-works`
const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'

export const metadata: Metadata = {
  title: 'How Pricing Works: Cash Price, Monthly Payment & Utility Costs',
  description:
    'How the cash price and the estimated monthly payment work, what each covers, and how utility hookup costs are bid after a site visit.',
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
    q: 'Does the cash price ever change after I’ve committed to a home?',
    a: 'No. The cash price is locked — AC, appliances, trim out, wood steps, tax, title, and license are included. Delivery and setup are quoted separately, or included in your estimated monthly payment if you finance.',
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
    a: 'It depends on how you buy: with the cash price it’s quoted separately; if you finance, it’s included in your estimated monthly payment. See our full breakdown of everything setup covers.',
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
    name: 'How Pricing Works: Cash Price, Monthly Payment & Utility Costs',
    dateModified: '2026-11-20',
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
            The cash price covers the home. Delivery and setup are quoted separately. If you finance,
            they&rsquo;re included in your estimated monthly payment. Utility hookup costs depend on your
            property and can&rsquo;t be known until someone&rsquo;s seen it. Here&rsquo;s exactly how each
            one works, and why we won&rsquo;t pretend to know your utility number over the phone.
          </p>
        </div>
      </section>

      {/* ── CASH PRICE ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">What the Cash Price Covers</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              The cash price is firm and includes every item below — not a starting point that grows once
              you&rsquo;re a few steps into the process. Delivery and setup are quoted separately, or included
              in your estimated monthly payment if you finance.
            </p>
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
            <p className="bmh-lead">
              Setup covers the physical site work — base pad, blocking, tie-down,
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
              Your full total is the cash price, plus delivery and setup (quoted separately, or in your
              estimated monthly payment if you finance), plus the exact utility bid once it&rsquo;s been
              approved — numbers you&rsquo;ve seen before you sign anything. Nothing shows up afterward that
              isn&rsquo;t already accounted for in one of them.
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
