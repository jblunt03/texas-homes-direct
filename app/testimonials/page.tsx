import Link from 'next/link'
import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'
import FeaturableReviews from '@/components/FeaturableReviews'
import { CtaRow, RelatedLinks, TurnkeyChecklist } from '@/components/SiteBlocks'

// Reviews page rules (see CLAUDE.md "Reviews page"): the Google widget is the
// only source of reviews here. No hard-coded reviews, customer names or
// quotes, no star averages or review counts, and no Review/AggregateRating
// schema.

const SITE_URL = 'https://www.texashomesdirect.com'
const PAGE_URL = `${SITE_URL}/testimonials`
const GOOGLE_REVIEW_URL = 'https://g.page/r/texashomesdirect/review'
const TITLE = 'Customer Reviews from Google'
const DESCRIPTION =
  'Read Texas Homes Direct reviews from our Google Business Profile, learn how to leave your own, and get a free 3-minute mortgage analysis with no credit pull.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
}

const STEPS = [
  'Open our Google review page with the button below.',
  'Sign in to your Google account and choose a star rating.',
  'Write a few words about your experience and post it.',
]

const FAQ = [
  {
    q: 'Where do the reviews on this page come from?',
    a: 'They come from the Texas Homes Direct Google Business Profile. The widget on this page loads them from Google, so they read the way customers posted them there.',
  },
  {
    q: 'How do I leave a review for Texas Homes Direct?',
    a: 'Use the “Leave a Google review” button on this page. It opens our Google review form, where you sign in to a Google account, pick a star rating and write about your experience.',
  },
  {
    q: 'Where can I see your homes?',
    a: 'Every home we offer is on our Browse page. Each listing has photos or a floor plan, its exact square footage, and a 3D tour where one is available.',
  },
  {
    q: 'How do I get a quote or the free mortgage analysis?',
    a: 'Request a delivery quote through our contact form, start the free 3-minute mortgage analysis (no credit pull), or call (830) 381-1309.',
  },
]

export default function TestimonialsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Reviews', item: PAGE_URL },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      {/* BREADCRUMBS */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-canvas)', padding: '16px 0 0' }}>
        <div className="bmh-container" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-muted, #6b7280)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">/</span>
          <span>Reviews</span>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Reviews</span>
          <h1>
            What Texas families
            <br />
            <em>are saying.</em>
          </h1>
          <p className="bmh-lead bmh-explainer-lead">
            The reviews below come straight from the Texas Homes Direct Google Business Profile, shown
            the way customers posted them on Google.
          </p>
        </div>
      </section>

      {/* GOOGLE REVIEWS (Featurable widget) */}
      <div style={{ padding: '32px 0', borderBottom: '1px solid var(--color-hairline)', background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <FeaturableReviews />
        </div>
      </div>

      {/* HOW TO LEAVE A REVIEW */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container-narrow">
          <span className="bmh-eyebrow">Already a customer?</span>
          <div className="bmh-spacer-sm" />
          <h2 className="bmh-city-h2">How to Leave a Review</h2>
          <div className="bmh-spacer-md" />
          <ol className="bmh-lead" style={{ paddingLeft: 22, display: 'grid', gap: 8, listStyle: 'decimal' }}>
            {STEPS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <div className="bmh-spacer-lg" />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bmh-btn bmh-btn-primary bmh-btn-lg"
            >
              Leave a Google review →
            </a>
            <Link href="/contact" className="bmh-btn bmh-btn-secondary bmh-btn-lg">
              Send us a note
            </Link>
          </div>
        </div>
      </section>

      {/* WE HANDLE IT ALL */}
      <section style={{ background: 'var(--color-canvas)', padding: '40px 0' }}>
        <div className="bmh-container">
          <TurnkeyChecklist />
        </div>
      </section>

      {/* CTA */}
      <section className="bmh-surface-card" style={{ padding: '48px 0' }}>
        <div className="bmh-container" style={{ textAlign: 'center' }}>
          <h2 className="bmh-city-h2" style={{ maxWidth: 700, margin: '0 auto' }}>
            Ready to see what fits your budget?
          </h2>
          <div className="bmh-spacer-lg" />
          <CtaRow center />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--color-canvas)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose bmh-faq-speakable">
            <h2 className="bmh-city-h2">Frequently Asked Questions</h2>
            <div className="bmh-spacer-sm" />
            <FaqAccordion items={FAQ} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* RELATED LINKS */}
      <section className="bmh-surface-card" style={{ padding: '32px 0' }}>
        <div className="bmh-container">
          <RelatedLinks />
        </div>
      </section>
    </>
  )
}
