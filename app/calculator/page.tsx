import Link from 'next/link'
import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Free Mortgage Analysis — Texas Homes Direct',
  description:
    "A 10-minute pre-qualification tells you exactly what kind of home is in reach. We don't pull your credit. Voted best financing in Texas.",
}

const CIRRUS_URL =
  'https://creditapp.cirrussolutions.com/GeneratedLink/Index/ae6a6bcb-8358-f111-a334-005056b4717b'

const FAQ_ITEMS = [
  {
    q: 'Will running the analysis hurt my credit?',
    a: "No. We don't pull your credit at all during pre-qualification — we use the info you share with us to match you with the right lenders. A hard pull only happens at the actual loan-application stage, and we never run one without your written permission.",
  },
  {
    q: "What's the lowest credit score you can work with?",
    a: "400 is our typical floor for chattel loans, but we've gotten buyers approved with a co-signer or larger down payment. The free analysis is the fastest way to know your real options.",
  },
  {
    q: 'Do I need a down payment?',
    a: "Most chattel loans can go as low as 0% down. Land & lieu loans use your land equity as your down payment. The analysis will show you which is realistic for your situation.",
  },
  {
    q: "What if I'm self-employed or don't have W-2 income?",
    a: "No problem. Several of the lenders we work with specialize in self-employed buyers — they'll look at tax returns, bank statements, and 1099 income. Mention it in the analysis and we'll route you to the right people.",
  },
  {
    q: 'Can I finance the land too?',
    a: "Yes. A land-and-home package combines the lot purchase and the home into one loan with one payment. We can help you scope out land too if you haven't picked a piece yet.",
  },
]

export default function CalculatorPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Voted best financing in Texas · No obligation</span>
          <h1>
            Know your budget
            <br />
            <em>before you fall in love.</em>
          </h1>
          <p className="bmh-lead">
            A 10-minute pre-qualification tells you exactly what kind of home is in reach,
            what your monthly payment will look like, and which lenders are ready to work
            with you — and we don&rsquo;t pull your credit.
          </p>
          <div className="bmh-spacer-lg" />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={CIRRUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bmh-btn bmh-btn-primary bmh-btn-lg"
            >
              Start your free analysis →
            </a>
            <a
              href="tel:+18303811309"
              className="bmh-btn bmh-btn-secondary bmh-btn-lg"
            >
              Or call (830) 381-1309
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-section-head bmh-section-head-center">
            <span className="bmh-eyebrow">Voted best financing in Texas</span>
            <div className="bmh-spacer-sm" />
            <h2>
              Three steps. Ten minutes.
              <br />
              <em>No surprises.</em>
            </h2>
          </div>

          <div className="bmh-steps-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="bmh-step">
              <span className="bmh-step-num">01</span>
              <h4>Fill out the secure form</h4>
              <p>
                Basic info: name, address, income, employment. Takes about ten minutes.
                The form is run by Cirrus Solutions, a licensed lender platform — your data
                is encrypted end-to-end.
              </p>
            </div>
            <div className="bmh-step">
              <span className="bmh-step-num">02</span>
              <h4>We DON&rsquo;T pull credit</h4>
              <p>
                You&rsquo;ll see what lenders see, with none of the dings to your credit
                history. We just kindly ask what your credit score is based off your mobile
                app, or guesstimate.
              </p>
            </div>
            <div className="bmh-step">
              <span className="bmh-step-num">03</span>
              <h4>We call you with options</h4>
              <p>
                Within one business day a real person from our team calls you back with the
                lenders that match, your estimated terms, and which homes on the lot fit
                your number.
              </p>
            </div>
          </div>

          <div className="bmh-spacer-lg" />
          <div style={{ textAlign: 'center' }}>
            <a
              href={CIRRUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bmh-btn bmh-btn-primary bmh-btn-lg"
            >
              Start the analysis →
            </a>
            <div className="bmh-spacer-sm" />
            <p className="bmh-caption bmh-muted">
              Opens in a new tab. Hosted by Cirrus Solutions &amp; South Texas Home Center
            </p>
          </div>
        </div>
      </section>

      {/* WHY DO THIS */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container">
          <div className="bmh-split">
            <div>
              <span className="bmh-eyebrow">Why it&rsquo;s worth ten minutes</span>
              <div className="bmh-spacer-sm" />
              <h2
                style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 400,
                  fontSize: 'clamp(34px,4.4vw,52px)', letterSpacing: '-1px',
                  lineHeight: 1.05, color: 'var(--color-ink)', margin: 0,
                }}
              >
                Shop with a number
                <br />in your pocket.
              </h2>
              <div className="bmh-spacer-md" />
              <p className="bmh-lead">
                Most buyers walk a dozen homes before they realize the one they love is
                $20,000 outside their budget. The credit analysis flips that around — you
                know your number first, so every home you walk is a real possibility.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  {
                    icon: <path d="M20 6L9 17l-5-5" />,
                    title: 'No pull — credit unaffected',
                    body: 'No ding to your score. You can shop dealers all day without consequence.',
                  },
                  {
                    icon: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
                    title: 'Encrypted, never sold',
                    body: 'Your info goes to our lenders — and nowhere else. No spam calls, no resold leads.',
                  },
                  {
                    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
                    title: 'One business day turnaround',
                    body: "You'll hear from a real person on our team — most of the time within hours.",
                  },
                  {
                    icon: <><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></>,
                    title: 'No obligation to buy',
                    body: 'Use the number anywhere. Many of our buyers use the analysis to negotiate at other dealers too.',
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span
                      className="bmh-feature-icon"
                      style={{ flexShrink: 0, width: 48, height: 48 }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </svg>
                    </span>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-sans)', fontWeight: 500,
                          fontSize: 18, color: 'var(--color-ink)', margin: '0 0 4px',
                        }}
                      >
                        {item.title}
                      </h4>
                      <p style={{ color: 'var(--color-body)', margin: 0, lineHeight: 1.55 }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOAN TYPES */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-section-head">
            <h2>
              Loan types we
              <br />
              <em>work with.</em>
            </h2>
            <p className="bmh-lead">
              Manufactured-home financing isn&rsquo;t the same as a regular mortgage. We
              work with lenders who specialize in this market — so the terms make sense for
              the kind of home you&rsquo;re buying.
            </p>
          </div>

          <div className="bmh-feature-grid-3">
            {[
              {
                badge: 'Most common',
                badgeCls: '',
                title: 'Chattel loan',
                desc: "For homes on leased land or land you don't own yet. Faster to close than a real-estate mortgage, with slightly higher rates.",
                terms: ['15–25 year terms', 'Min credit ~400', 'Down payment 0–20%'],
              },
              {
                badge: 'Lowest rates',
                badgeCls: 'bmh-badge-coral',
                title: 'Land & lieu',
                desc: 'Own land already? Use it as your down payment instead of cash. Your dirt = your down payment.',
                terms: ['Up to 25-year terms', 'No min credit', 'Down payment from 0%'],
              },
              {
                badge: 'Land-and-home',
                badgeCls: '',
                title: 'Conventional',
                desc: "For buyers with stronger credit who want a traditional mortgage. We can roll land purchase into a single loan.",
                terms: ['15–30 year terms', 'Min credit ~660', 'Down payment 10–20%'],
              },
            ].map((loan, i) => (
              <div key={i} className="bmh-card-canvas">
                <span className={`bmh-badge-caps${loan.badgeCls ? ' ' + loan.badgeCls : ''}`}>
                  {loan.badge}
                </span>
                <div className="bmh-spacer-sm" />
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)', fontWeight: 400,
                    fontSize: 28, letterSpacing: '-0.3px', color: 'var(--color-ink)', margin: 0,
                  }}
                >
                  {loan.title}
                </h3>
                <div className="bmh-spacer-sm" />
                <p style={{ color: 'var(--color-body)', lineHeight: 1.55, margin: 0 }}>
                  {loan.desc}
                </p>
                <div className="bmh-spacer-md" />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {loan.terms.map((t) => (
                    <li key={t} className="bmh-caption" style={{ color: 'var(--color-muted)' }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container">
          <div className="bmh-section-head bmh-section-head-center">
            <span className="bmh-eyebrow">Trusted by Texas families</span>
            <div className="bmh-spacer-sm" />
            <h2>
              4.9 stars across
              <br />
              487 reviews.
            </h2>
          </div>

          <div className="bmh-testi-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {[
              {
                init: 'AM',
                name: 'Andre M.',
                loc: 'Killeen, TX',
                quote:
                  '"They worked with three lenders until one came back with a number I could actually live with. The free analysis was a game-changer for me."',
              },
              {
                init: 'CR',
                name: 'Carla R.',
                loc: 'Midland, TX',
                quote:
                  '"I had no idea what I could afford until I ran their analysis. Walked into the lot the next week knowing exactly which homes to look at."',
              },
            ].map((r) => (
              <div key={r.init} className="bmh-testi">
                <div className="bmh-stars">★★★★★</div>
                <p className="bmh-testi-quote">{r.quote}</p>
                <div className="bmh-testi-foot">
                  <div className="bmh-testi-avatar">{r.init}</div>
                  <div>
                    <div className="bmh-testi-name">{r.name}</div>
                    <div className="bmh-testi-meta">{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container-narrow">
          <div className="bmh-section-head" style={{ marginBottom: 32 }}>
            <h2>
              Financing <em>questions.</em>
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} defaultOpen={0} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-callout-coral">
            <div>
              <span className="bmh-caps" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Ready when you are
              </span>
              <div className="bmh-spacer-sm" />
              <h2>
                Ten minutes today,{' '}
                <em>your home this season.</em>
              </h2>
            </div>
            <div>
              <p>
                The analysis is free, we don&rsquo;t pull your credit, and you&rsquo;ll
                know more about your real options in ten minutes than most buyers learn in a
                month of dealer-shopping.
              </p>
              <div className="bmh-spacer-md" />
              <a
                href={CIRRUS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bmh-btn bmh-btn-cream-on-dark bmh-btn-lg"
              >
                Start your free analysis →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
