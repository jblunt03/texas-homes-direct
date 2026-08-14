import Link from 'next/link'
import type { Metadata } from 'next'
import { teamMembers } from '@/lib/teamMembers'
import TexasServiceMap from '@/components/TexasServiceMap'

export const metadata: Metadata = {
  title: 'About Us — Texas Homes Direct',
  description:
    'Texas Homes Direct is family-owned and faith-based. We work directly with the factory for real pricing — no markup, no hidden fees, and a real person who answers the phone.',
}

const VALUES = [
  {
    title: 'The best price in Texas.',
    body: "If you find a comparable home from another dealer at a lower price, bring us the quote. We'll match it or tell you to take the other deal. Either way, you win.",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    title: 'No hidden fees, ever.',
    body: "Delivery, setup, skirting, tie-down, and standard permits are quoted up front. If the price changes after the contract is signed, that's on us — not you.",
    icon: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    title: "We're here after delivery.",
    body: "Most dealers stop calling the day the truck leaves. We don't. Our service team handles warranty claims and follow-ups for the life of your home.",
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
]

const STATS = [
  { value: '15+ yrs', label: 'Combined team experience' },
  { value: '3',      label: 'States served' },
  { value: '4.9★',  label: 'Average review rating', dark: true },
  { value: '100+',  label: 'Floor plans available' },
]

export default function AboutPage() {
  return (
    <>
      {/* TEAM */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-section-head bmh-section-head-center">
            <span className="bmh-eyebrow">Meet the team</span>
            <div className="bmh-spacer-sm" />
            <h2>
              Real people, real answers,
              <br />
              real phone numbers.
            </h2>
          </div>

          <div className="bmh-inv-grid">
            {teamMembers.map((member) => (
              <div
                key={member.slug}
                className="bmh-card-canvas"
                style={{ textAlign: 'center', padding: '32px 24px' }}
              >
                <div
                  className="bmh-ph bmh-ratio-1x1"
                  style={{ borderRadius: '50%', maxWidth: 160, margin: '0 auto 20px' }}
                >
                  <span className="bmh-ph-label" style={{ fontSize: 11 }}>Headshot</span>
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: 22,
                    color: 'var(--color-ink)',
                    margin: 0,
                  }}
                >
                  {member.name}
                </h4>
                <p
                  className="bmh-caption bmh-muted"
                  style={{ marginTop: 4 }}
                >
                  {member.role}
                </p>
                <div className="bmh-spacer-sm" />
                <Link
                  href={`/about/${member.slug}`}
                  className="bmh-caption"
                  style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                >
                  Meet {member.name.split(' ')[0]} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container">
          <div className="bmh-section-head bmh-section-head-center">
            <span className="bmh-eyebrow">What we stand for</span>
            <div className="bmh-spacer-sm" />
            <h2>
              Three promises that
              <br />
              shape every sale.
            </h2>
          </div>

          <div className="bmh-feature-grid-3">
            {VALUES.map((v, i) => (
              <div key={i} className="bmh-feature">
                <span className="bmh-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {v.icon}
                  </svg>
                </span>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-section-head">
            <h2>
              The numbers
              <br />
              <em>since day one.</em>
            </h2>
            <p className="bmh-lead">
              We&rsquo;re not the biggest dealer in Texas. We&rsquo;re the one that earns the next
              sale by treating the last one right.
            </p>
          </div>

          <div className="bmh-stat-grid">
            {STATS.map((s) => (
              <div key={s.label} className={`bmh-stat${s.dark ? ' bmh-stat-dark' : ''}`}>
                <div className="bmh-stat-value">{s.value}</div>
                <div className="bmh-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container">
          <div className="bmh-split">
            <div>
              <span className="bmh-eyebrow">Service area</span>
              <div className="bmh-spacer-sm" />
              <h2>
                Wherever your
                <br />
                land is, <em>we deliver.</em>
              </h2>
              <div className="bmh-spacer-md" />
              <p className="bmh-lead">
                We deliver, set, and service manufactured homes across all of Texas.
                Whether you&rsquo;re outside Lubbock, halfway to Abilene, or down in
                Corpus Christi — we&rsquo;ve been there, and we can be there for you.
              </p>
              <div className="bmh-spacer-md" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span className="bmh-pill bmh-pill-static">Texas</span>
              </div>
            </div>
            <TexasServiceMap />
          </div>
        </div>
      </section>

      {/* CORAL CALLOUT */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-callout-coral">
            <div>
              <span className="bmh-caps" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Not sure where to start?
              </span>
              <div className="bmh-spacer-sm" />
              <h2>
                Don&rsquo;t know your budget
                <br />
                <em>or your down payment?</em>
              </h2>
            </div>
            <div>
              <p>
                That&rsquo;s exactly what our free pre-approval is for. No credit pull, no
                pressure — in about three minutes you&rsquo;ll know your real number before you
                fall in love with a home you can&rsquo;t afford. Or if you&rsquo;d rather talk
                first, call the same number that reaches the owner.
              </p>
              <div className="bmh-spacer-md" />
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/calculator" className="bmh-btn bmh-btn-cream-on-dark bmh-btn-lg">
                  Get my free pre-approval →
                </Link>
                <a
                  href="tel:+18303811309"
                  className="bmh-btn bmh-btn-lg"
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.5)',
                  }}
                >
                  Call (830) 381-1309
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
