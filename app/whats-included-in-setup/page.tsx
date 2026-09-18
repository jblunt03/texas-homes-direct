import Link from 'next/link'
import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'
import { TURNKEY_ITEMS } from '@/lib/setupItems'

const SITE_URL = 'https://www.texashomesdirect.com'
const PAGE_URL = `${SITE_URL}/whats-included-in-setup`
const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'

export const metadata: Metadata = {
  title: 'What’s Included in Setup? Full Site-Work Checklist',
  description:
    'Everything that happens on your property between delivery and move-in — base pad, block, tie-down, underpinning, skirting, trim out, and AC — explained item by item.',
  alternates: {
    canonical: PAGE_URL,
  },
}

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ITEM_DETAILS: Record<string, string> = {
  Water: 'Your home is connected to your existing water line if you have one, or to a well if that’s how your property is set up.',
  Septic: 'If your property needs one, a full septic system is installed as part of setup — not treated as a separate project you have to manage.',
  Electric: 'Electrical service is run from your existing connection point to the home and fully connected before move-in.',
  'Base pad': 'A level foundation pad is prepped and set first — everything else in setup builds on top of this.',
  Block: 'The home is leveled and blocked in place on the pad, which is what keeps the floor level and stable long-term.',
  'Tie Down': 'An anchoring system is installed per code, securing the home to the ground beneath it.',
  Underpinning: 'Structural support is installed beneath the home, closing the gap between the floor and the ground.',
  Skirting: 'A finished exterior enclosure goes around the base of the home, covering the underpinning and giving it a finished look.',
  'Trim Out': 'For multi-section homes, this is the interior and exterior finish work that joins the sections into one seamless home — trim, seams, and transitions.',
  AC: 'Central air conditioning is installed on-site as part of setup, not left for you to arrange separately.',
}

const FAQ = [
  {
    q: 'What exactly happens during setup, step by step?',
    a: 'Generally: the base pad is prepped and set first, then the home is leveled and blocked in place, then tied down per code. From there, underpinning and skirting close in the base, trim out finishes any seams on a multi-section home, AC is installed, and utility connections are completed once the exact bid has been approved.',
  },
  {
    q: 'Do I need to be present for setup?',
    a: 'That’s something we coordinate with you directly based on your property and schedule — reach out and we can talk through what makes sense for your situation.',
  },
  {
    q: 'Is setup included in the home price, or is it extra?',
    a: 'The setup work itself — base pad, block, tie-down, underpinning, skirting, trim out, and AC — is already included in your out-the-door home price. The one variable piece is the utility hookup cost, which depends on your property and is estimated by phone, then bid exactly once a contractor has seen the site. See our full pricing breakdown for how that works.',
  },
  {
    q: 'What’s the difference between underpinning and skirting?',
    a: 'Underpinning is the structural support installed beneath the home — it’s doing the structural work. Skirting is the finished exterior enclosure that goes around the base afterward, covering the underpinning and giving the home a finished look from the outside. Underpinning is function; skirting is function plus finish.',
  },
  {
    q: 'Does every home get the same setup?',
    a: 'Every property is different, so the specific work involved varies by site — a lot with an existing well and electrical service needs less done than raw land. But the checklist above is what setup covers no matter what your land looks like going in.',
  },
]

export default function WhatsIncludedInSetupPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'What’s Included in Setup', item: PAGE_URL },
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
    name: 'What’s Included in Setup? Full Site-Work Checklist',
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
          <span>What&rsquo;s Included in Setup</span>
        </div>
      </nav>

      {/* ── H1 + INTRO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 32px' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Buyer&rsquo;s Guide</span>
          <h1 className="bmh-city-h1">
            What&rsquo;s Included in <em>Setup</em>
          </h1>
          <p className="bmh-lead bmh-explainer-lead">
            &ldquo;Setup&rdquo; covers everything that happens on your property between delivery and move-in
            day. It&rsquo;s rolled into your out-the-door home price, not billed separately, and it&rsquo;s more
            involved than just placing the home on the lot. Here&rsquo;s exactly what it includes.
          </p>
        </div>
      </section>

      {/* ── CHECKLIST ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-checklist">
            <h2 className="bmh-city-h2">The Full Setup Checklist</h2>
            <p className="bmh-caption" style={{ margin: '8px 0 16px' }}>
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

      {/* ── ITEM-BY-ITEM DETAIL ──────────────────────────────────── */}
      <section className="bmh-surface-card" style={{ padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">Each Step, Explained</h2>
            <div className="bmh-spacer-md" />
            {TURNKEY_ITEMS.map((item) => (
              <div key={item.title} style={{ marginBottom: 20 }}>
                <h3 className="bmh-city-h4" style={{ marginBottom: 4 }}>{item.title}</h3>
                <p className="bmh-lead">{ITEM_DETAILS[item.title]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IS IT INCLUDED ───────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">Is Setup Included in the Price?</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              Yes — the setup work itself is already rolled into your fixed, out-the-door home price. The
              one piece that isn&rsquo;t fixed upfront is the utility hookup cost, because that depends on your
              specific property (soil, distance to power, depth to water) in a way the rest of setup
              doesn&rsquo;t. We give a phone estimate first, then send a contractor to your property for an
              exact bid you approve before it&rsquo;s final. See the full breakdown of how pricing works for
              the details.
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
