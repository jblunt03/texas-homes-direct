import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

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

const TEAM = [
  { role: 'Owner / Founder',    bio: 'General manager · 15+ years in manufactured homes' },
  { role: 'Sales Lead',         bio: 'Singlewide & doublewide specialist' },
  { role: 'Delivery Manager',   bio: 'Coordinates transport & setup crews' },
]

const TIMELINE = [
  {
    year: 'Years prior',
    title: 'Learning the business in Seguin.',
    body: 'Our founders spent years running a traditional manufactured home dealership in Seguin, Texas — watching buyers get bounced between salespeople and slow-walked on straight pricing.',
  },
  {
    year: 'Early 2026',
    title: 'We went factory direct.',
    body: 'Texas Homes Direct launched with one mission: cut the markup out of buying a manufactured home. No lot rent, no inflated overhead — just factory-direct pricing, every time.',
  },
  {
    year: 'Mid 2026',
    title: 'Serving Texas, New Mexico, and Oklahoma.',
    body: "Because we work by phone and online first, we didn't need years to expand — we deliver, set, and service homes across all three states from day one.",
  },
  {
    year: 'Today',
    title: 'Still answering the phone.',
    body: 'Small enough that the founders pick up the phone themselves. Big enough to get you a real, factory-direct number on your next home.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">About us · Family-owned · Faith-based</span>
          <h1>
            Texas families
            <br />
            deserve <em>an honest deal.</em>
          </h1>
          <p className="bmh-lead">
            Texas Homes Direct is family-owned and faith-based. We work directly with the factory
            to get you real pricing, not inflated dealership numbers. You can see and walk through
            homes at a few select partner locations, or handle everything right here — either way,
            our only job is getting you the best real number on your next home.
          </p>
        </div>
      </section>

      {/* FOUNDER LETTER SPLIT */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-split-6-5">
            <div className="bmh-ph bmh-ratio-5x7" style={{ maxWidth: 480 }}>
              <span className="bmh-ph-label">Photo — owner / team at a partner location</span>
            </div>
            <div>
              <span className="bmh-eyebrow">A letter from our family</span>
              <div className="bmh-spacer-sm" />
              <h2>
                We treat every buyer like
                <br />
                <em>they&rsquo;re family.</em>
              </h2>
              <div className="bmh-spacer-md" />
              <p className="bmh-lead">
                Texas Homes Direct was founded in early 2026 by a group of guys who spent years
                running a manufactured home dealership in Seguin, Texas. We watched buyers shift
                more and more toward doing everything online and over the phone, and we saw a way
                to bring that same convenience to manufactured homes — without the fees that come
                with a traditional lot.
              </p>
              <div className="bmh-spacer-sm" />
              <p className="bmh-lead">
                We started this company with one thing in mind: bringing back the word affordable
                housing. Most dealerships bump their prices thirty to forty percent over invoice
                to cover lot rent, overhead, and inflated rates. We don&rsquo;t bump anything — you
                get factory-direct quotes, plain and simple.
              </p>
              <div className="bmh-spacer-sm" />
              <p className="bmh-lead">
                We&rsquo;re a small, faith-based, family-owned company without the millions of
                dollars in overhead a big dealership carries. That means we can bring you honest,
                earnest pricing on homes that are genuinely well built — no runaround.
              </p>
              <div className="bmh-spacer-md" />
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--color-ink)' }}>
                — The Texas Homes Direct team
              </p>
            </div>
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
                We deliver, set, and service manufactured homes across all of Texas, New Mexico, and
                Oklahoma. Whether you&rsquo;re outside Lubbock, halfway to Roswell, or up in Tulsa
                — we&rsquo;ve been there, and we can be there for you.
              </p>
              <div className="bmh-spacer-md" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span className="bmh-pill bmh-pill-static">Texas</span>
                <span className="bmh-pill bmh-pill-static">New Mexico</span>
                <span className="bmh-pill bmh-pill-static">Oklahoma</span>
              </div>
            </div>
            <div className="bmh-ph bmh-ratio-4x3">
              <span className="bmh-ph-label">Map — Texas / NM / OK service area highlighted</span>
            </div>
          </div>
        </div>
      </section>

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
            {TEAM.map((member) => (
              <div
                key={member.role}
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
                  {member.role}
                </h4>
                <p
                  className="bmh-caption bmh-muted"
                  style={{ marginTop: 4 }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container">
          <div className="bmh-section-head">
            <h2>
              The story
              <br />
              <em>so far.</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr',
              gap: '32px 32px',
              rowGap: 48,
              maxWidth: 720,
            }}
          >
            {TIMELINE.map((entry, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 36,
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.5px',
                    lineHeight: 1.1,
                  }}
                >
                  {entry.year}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: 18,
                      color: 'var(--color-ink)',
                      marginBottom: 8,
                    }}
                  >
                    {entry.title}
                  </h4>
                  <p style={{ color: 'var(--color-body)', lineHeight: 1.6, margin: 0 }}>
                    {entry.body}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CORAL CALLOUT */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-callout-coral">
            <div>
              <span className="bmh-caps" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Come see for yourself
              </span>
              <div className="bmh-spacer-sm" />
              <h2>
                Walk a home at a partner location,
                <br />
                <em>ask hard questions.</em>
              </h2>
            </div>
            <div>
              <p>
                We&rsquo;re happy to set up a walkthrough at one of our partner locations — no
                pressure, no hassle. Or if you&rsquo;d rather talk first, call the same number
                that reaches the owner.
              </p>
              <div className="bmh-spacer-md" />
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="bmh-btn bmh-btn-cream-on-dark bmh-btn-lg">
                  Plan a visit →
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
