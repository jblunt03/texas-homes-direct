import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews — Texas Homes Direct',
  description:
    'See what Texas families are saying about Texas Homes Direct. 4.9 stars across 487 verified reviews.',
}

const REVIEWS = [
  {
    init: 'RH',
    name: 'Rachel & Mike H.',
    meta: 'Lubbock, TX · 3BR doublewide · Aug 2025',
    quote:
      'We shopped six dealers and Texas Homes Direct beat every single one of them on price — and they were the only ones who didn\'t try to upsell us into something we couldn\'t afford.',
  },
  {
    init: 'JG',
    name: 'Javier G.',
    meta: 'Abilene, TX · 2BR singlewide · Jul 2025',
    quote:
      'They walked me through the credit analysis, picked the right floor plan, and had the home set on my land in Abilene six weeks later. Couldn\'t ask for more.',
  },
  {
    init: 'EM',
    name: 'Emily M.',
    meta: 'Waco, TX · Singlewide · Jun 2025',
    quote:
      'As first-time buyers we were nervous. They explained every line of the contract, helped us understand the permits, and never made us feel like we were asking dumb questions.',
  },
  {
    init: 'DB',
    name: 'Daniel B.',
    meta: 'Amarillo, TX · 4BR doublewide · May 2025',
    quote:
      'The price they quoted me on the phone in March was the price I paid in May. After three other dealers ran the number up on us, that meant a lot.',
  },
  {
    init: 'CR',
    name: 'Carla R.',
    meta: 'Midland, TX · Doublewide · Apr 2025',
    quote:
      'I called five other places about a new doublewide and got run-arounds. Texas Homes Direct had a factory order confirmed and on schedule the next morning. Done deal in two weeks.',
  },
  {
    init: 'PK',
    name: 'Pete & Karen V.',
    meta: 'Hondo, TX · Singlewide · Mar 2025',
    quote:
      'Bought a new singlewide for our property outside Hondo. Delivery was on schedule, leveling was perfect, and the crew picked up every scrap of trash before they left.',
  },
  {
    init: 'AM',
    name: 'Andre M.',
    meta: 'Killeen, TX · Singlewide · Feb 2025',
    quote:
      'My credit isn\'t great. They worked with three lenders until one came back with a number I could actually live with. That\'s effort you don\'t see from the big lots.',
  },
  {
    init: 'SO',
    name: 'Sandra O.',
    meta: 'San Angelo, TX · 3BR doublewide · Jan 2025',
    quote:
      'The owner called me back personally after I left a question on the website. Six months in, I\'m still glad I picked them. No regrets, no surprises.',
  },
]

const RATING_BARS = [
  { label: '5 ★', pct: '92%', count: 448 },
  { label: '4 ★', pct: '6%',  count: 31 },
  { label: '3 ★', pct: '1%',  count: 6 },
  { label: '2 ★', pct: '0.4%', count: 2 },
  { label: '1 ★', pct: '0.1%', count: 0 },
]

export default function TestimonialsPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Reviews</span>
          <h1>
            1,200 Texas families.
            <br />
            <em>4.9 stars on average.</em>
          </h1>
          <p className="bmh-lead">
            Every review on this page comes from a verified buyer. We don&rsquo;t curate, we
            don&rsquo;t pay for placement, and we don&rsquo;t edit anyone&rsquo;s words.
          </p>
        </div>
      </section>

      {/* RATING SNAPSHOT */}
      <div style={{ padding: '32px 0', borderBottom: '1px solid var(--color-hairline)', background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Big number */}
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(56px,7vw,80px)', letterSpacing: '-1px', lineHeight: 1, color: 'var(--color-ink)' }}>
                4.9
              </div>
              <div className="bmh-stars" style={{ fontSize: 18, marginTop: 4 }}>★★★★★</div>
              <div className="bmh-caption bmh-muted" style={{ marginTop: 4 }}>Across 487 reviews</div>
            </div>

            {/* Rating bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 480, minWidth: 280 }}>
              {RATING_BARS.map(({ label, pct, count }) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 40px', gap: 12, alignItems: 'center' }}>
                  <span className="bmh-caption">{label}</span>
                  <div style={{ height: 6, background: 'var(--color-surface-card)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: pct, height: '100%', background: 'var(--color-primary)' }} />
                  </div>
                  <span className="bmh-caption bmh-muted">{count}</span>
                </div>
              ))}
            </div>

            {/* Verified on pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
              <span className="bmh-caption bmh-muted">Verified on</span>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span className="bmh-pill bmh-pill-static">Google</span>
                <span className="bmh-pill bmh-pill-static">BBB</span>
                <span className="bmh-pill bmh-pill-static">Facebook</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED LARGE QUOTE */}
      <section className="bmh-section-sm" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-callout-coral">
            <div>
              <span className="bmh-caps" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Customer story
              </span>
              <div className="bmh-spacer-sm" />
              <h2 style={{ fontSize: 'clamp(28px,3.6vw,44px)', letterSpacing: '-0.5px' }}>
                &ldquo;They gave us the real out-the-door price up front. No hidden fees, no bait-and-switch — nothing like the other lots.&rdquo;
              </h2>
            </div>
            <div>
              <p>
                The Hernandez family bought a 3-bedroom doublewide in Lubbock after shopping six dealers.
                They moved in 47 days after signing.
              </p>
              <div className="bmh-spacer-md" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  className="bmh-testi-avatar"
                  style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 18 }}
                >
                  RH
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 500 }}>Rachel &amp; Mike Hernandez</div>
                  <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13 }}>
                    Lubbock, TX &middot; The Hill Country
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-testi-grid">
            {REVIEWS.map((r) => (
              <div key={r.init} className="bmh-testi">
                <div className="bmh-stars">★★★★★</div>
                <p className="bmh-testi-quote">&ldquo;{r.quote}&rdquo;</p>
                <div className="bmh-testi-foot">
                  <div className="bmh-testi-avatar">{r.init}</div>
                  <div>
                    <div className="bmh-testi-name">{r.name}</div>
                    <div className="bmh-testi-meta">{r.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bmh-spacer-lg" />
          <div style={{ textAlign: 'center' }}>
            <button className="bmh-btn bmh-btn-secondary">Load more reviews</button>
          </div>
        </div>
      </section>

      {/* LEAVE A REVIEW */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container-narrow" style={{ textAlign: 'center' }}>
          <span className="bmh-eyebrow">Already a customer?</span>
          <div className="bmh-spacer-sm" />
          <h2>Tell us how we did.</h2>
          <div className="bmh-spacer-md" />
          <p className="bmh-lead">
            Honest reviews — good or bad — help us get better and help the next family pick the
            right dealer. Leave one on Google or send us a note directly.
          </p>
          <div className="bmh-spacer-lg" />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://g.page/r/texashomesdirect/review"
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
    </>
  )
}
