import Link from 'next/link'
import type { Metadata } from 'next'
import { teamMembers } from '@/lib/teamMembers'
import TexasServiceMap from '@/components/TexasServiceMap'

export const metadata: Metadata = {
  title: 'About Us — Texas Homes Direct',
  description:
    'Texas Homes Direct is family-owned and faith-based. We work directly with the factory for real pricing — no markup, no hidden fees, and a real person who answers the phone.',
}

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
                Texas Homes Direct serves buyers across Texas. Call us with your
                property&rsquo;s location and we&rsquo;ll talk through your options.
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
                first, give us a call.
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
