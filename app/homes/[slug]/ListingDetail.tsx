'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Listing } from '@/lib/sampleListings'

function fmt(n: number) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

/* ── Sidebar lead form ───────────────────────────────────── */
function SidebarForm({ slug }: { slug: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          firstName: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          source: `Listing Inquiry — ${slug}`,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
    } catch (_) {
      setSubmitting(false)
      setError('Something went wrong — please try again or call us at (830) 381-1309.')
      return
    }
    form.reset()
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div
        style={{
          background: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-lg)',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <span className="bmh-badge-caps bmh-badge-coral" style={{ alignSelf: 'flex-start' }}>
          Sent
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 28,
            letterSpacing: '-0.5px',
            color: 'var(--color-ink)',
            margin: 0,
          }}
        >
          Got it. Thanks.
        </h3>
        <p style={{ color: 'var(--color-body)', lineHeight: 1.6, margin: 0 }}>
          We&rsquo;ll be in touch within one business day — usually sooner. Or call us now at{' '}
          <a href="tel:+18303811309" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
            (830) 381-1309
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: 28,
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 26,
          fontWeight: 400,
          letterSpacing: '-0.4px',
          color: 'var(--color-ink)',
          margin: '0 0 4px',
        }}
      >
        Ask about this home
      </h3>
      <p className="bmh-caption bmh-muted" style={{ margin: '0 0 24px' }}>
        No obligation — we&rsquo;ll answer every question.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="bmh-field">
          <label htmlFor="sf-name">Your name</label>
          <input id="sf-name" name="name" type="text" placeholder="Jordan Hernandez" required />
        </div>
        <div className="bmh-field">
          <label htmlFor="sf-email">Email</label>
          <input id="sf-email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="bmh-field">
          <label htmlFor="sf-phone">Phone</label>
          <input id="sf-phone" name="phone" type="tel" placeholder="(210) 555-0142" />
        </div>
        <div className="bmh-field">
          <label htmlFor="sf-msg">Message</label>
          <textarea
            id="sf-msg"
            name="message"
            placeholder="Questions about this home, availability, financing…"
            style={{ minHeight: 100 }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bmh-btn bmh-btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>
        {error && (
          <p style={{ color: 'var(--color-error, #c0392b)', fontSize: 14, margin: 0 }}>
            {error}
          </p>
        )}
        <p className="bmh-caption bmh-muted" style={{ textAlign: 'center', margin: 0 }}>
          Or call{' '}
          <a href="tel:+18303811309" style={{ color: 'var(--color-primary)' }}>
            (830) 381-1309
          </a>
        </p>
      </form>
    </div>
  )
}

/* ── Related listing card (matches browse page) ──────────── */
function RelatedCard({ listing }: { listing: Listing }) {
  const isDouble = listing.wideType === 'Double Wide'
  const badgeCls = listing.featured ? 'bmh-badge-coral' : 'bmh-badge-caps'
  const badgeLabel = listing.featured ? 'Featured' : 'In stock'
  const subText = [
    listing.wideType ?? 'Singlewide',
    listing.year.toString(),
    listing.manufacturer ?? '',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <Link href={`/homes/${listing.slug}`} className="bmh-inv-card" style={{ textDecoration: 'none' }}>
      {listing.images[0] ? (
        <div className="bmh-ratio-3x2 bmh-inv-card-media" style={{ position: 'relative' }}>
          <span className={`bmh-badge-caps ${badgeCls} bmh-inv-card-tag`}>{badgeLabel}</span>
          <Image
            src={listing.images[0]}
            alt={`${listing.title} exterior`}
            fill
            style={
              listing.floorplanUrl && listing.images[0] === listing.floorplanUrl
                ? { objectFit: 'contain', background: '#fff', padding: 12 }
                : { objectFit: 'cover' }
            }
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="bmh-ph bmh-ratio-3x2 bmh-inv-card-media">
          <span className={`bmh-badge-caps ${badgeCls} bmh-inv-card-tag`}>{badgeLabel}</span>
          <span className="bmh-ph-label">{listing.title} · exterior</span>
        </div>
      )}
      <div className="bmh-inv-card-body">
        <h3 className="bmh-inv-card-title" style={{ fontSize: 20 }}>
          {listing.title}
        </h3>
        <p className="bmh-inv-card-sub">{subText}</p>
        <div className="bmh-inv-card-specs">
          <span className="bmh-spec"><strong>{listing.beds}</strong> bd</span>
          <span className="bmh-spec"><strong>{listing.baths}</strong> ba</span>
          <span className="bmh-spec"><strong>{listing.sqft.toLocaleString()}</strong> sqft</span>
        </div>
        <div className="bmh-inv-card-footer">
          <span className="bmh-inv-card-price">
            {listing.price > 0
              ? `$${listing.price.toLocaleString()}`
              : listing.monthlyPayment > 0
              ? `$${listing.monthlyPayment.toLocaleString()}/mo`
              : 'Call for price'}
          </span>
          <span className="bmh-inv-card-link">View →</span>
        </div>
      </div>
    </Link>
  )
}

/* ── Main component ──────────────────────────────────────── */
export default function ListingDetail({
  listing,
  related,
}: {
  listing: Listing
  related: Listing[]
}) {
  const [mainImg, setMainImg] = useState(0)

  return (
    <div style={{ background: 'var(--color-canvas)' }}>

      {/* ── HEADER ────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-canvas)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: '40px 0 32px',
        }}
      >
        <div className="bmh-container">
          {/* badge row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span className="bmh-badge-caps bmh-badge-coral">New</span>
            {listing.hudCertified && (
              <span className="bmh-badge-caps">HUD Certified</span>
            )}
            <span className="bmh-badge-caps">{listing.region}</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(28px,4vw,52px)',
              letterSpacing: '-1px',
              lineHeight: 1.05,
              color: 'var(--color-ink)',
              margin: '0 0 10px',
            }}
          >
            {listing.title}
          </h1>
          <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)', fontSize: 15, margin: 0 }}>
            {listing.city}, Texas &middot; {listing.year}
          </p>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <section style={{ background: 'var(--color-canvas)', padding: '32px 0' }}>
        <div className="bmh-container">
          {/* Main image */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '16 / 10',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'var(--color-surface-card)',
            }}
          >
            {listing.images[mainImg] ? (
              <Image
                src={listing.images[mainImg]}
                alt={`${listing.title} photo ${mainImg + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                style={
                  listing.floorplanUrl && listing.images[mainImg] === listing.floorplanUrl
                    ? { objectFit: 'contain', background: '#fff', padding: 24 }
                    : { objectFit: 'cover' }
                }
              />
            ) : (
              <div
                className="bmh-ph"
                style={{ width: '100%', height: '100%', aspectRatio: 'unset' }}
              >
                <span className="bmh-ph-label">{listing.title} · exterior</span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {listing.images.length > 1 && (
            <div className="bmh-gallery-thumbs">
              {listing.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`bmh-gallery-thumb${i === mainImg ? ' bmh-is-active' : ''}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="112px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3D WALK THROUGH ───────────────────────────────── */}
      {(listing.matterportUrl || listing.floorplanUrl) && (
        <section
          style={{
            background: 'var(--color-surface-card)',
            borderTop: '1px solid var(--color-hairline)',
            borderBottom: '1px solid var(--color-hairline)',
            padding: '48px 0',
          }}
        >
          <div className="bmh-container">
            {/* heading */}
            <div style={{ marginBottom: 32 }}>
              <span className="bmh-eyebrow">Interactive</span>
              <div className="bmh-spacer-sm" />
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(26px,3.2vw,38px)',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                  color: 'var(--color-ink)',
                  margin: 0,
                }}
              >
                3D Walk Through
              </h2>
            </div>

            {/* content: tour + floorplan side-by-side when both exist */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: listing.floorplanUrl
                  ? 'minmax(0,1.6fr) minmax(0,1fr)'
                  : '1fr',
                gap: 24,
                alignItems: 'start',
              }}
            >
              {/* Matterport iframe (or a "coming soon" placeholder when no tour exists yet) */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 13,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-muted)',
                    marginBottom: 12,
                  }}
                >
                  Virtual tour
                </p>
                {listing.matterportUrl ? (
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: '#0f1117',
                    }}
                  >
                    <iframe
                      src={listing.matterportUrl}
                      title={`${listing.title} — 3D virtual tour`}
                      allow="xr-spatial-tracking"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: 'var(--color-canvas)',
                      border: '1px dashed var(--color-hairline)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                        fontSize: 14,
                        color: 'var(--color-muted)',
                        margin: 0,
                      }}
                    >
                      Coming soon
                    </p>
                  </div>
                )}
              </div>

              {/* Floor plan image */}
              {listing.floorplanUrl && (
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: 13,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-muted)',
                      marginBottom: 12,
                    }}
                  >
                    Floor plan
                  </p>
                  <div
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: '#fff',
                      border: '1px solid var(--color-hairline)',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={listing.floorplanUrl}
                      alt={`${listing.title} floor plan`}
                      width={800}
                      height={600}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* If only floorplan (no Matterport), offer a link to open in new tab */}
            {!listing.matterportUrl && listing.floorplanUrl && (
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <a
                  href={listing.floorplanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bmh-btn bmh-btn-secondary"
                >
                  View full-size floor plan →
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── DETAIL GRID ───────────────────────────────────── */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-listing-grid">

            {/* ── LEFT COLUMN ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Price + stats */}
              <div className="bmh-card">
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 20,
                  }}
                >
                  <div>
                    {listing.price > 0 ? (
                      <>
                        <p className="bmh-caption bmh-muted" style={{ marginBottom: 4 }}>
                          List price
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(32px,4vw,48px)',
                            letterSpacing: '-1px',
                            lineHeight: 1,
                            color: 'var(--color-ink)',
                            margin: 0,
                          }}
                        >
                          {fmt(listing.price)}
                        </p>
                        {listing.monthlyPayment > 0 && (
                          <p className="bmh-caption" style={{ color: 'var(--color-muted)', marginTop: 6 }}>
                            Est. {fmt(listing.monthlyPayment)}/mo
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        {listing.monthlyPayment > 0 ? (
                          <>
                            <p className="bmh-caption bmh-muted" style={{ marginBottom: 4 }}>
                              Est. monthly payment
                            </p>
                            <p
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(32px,4vw,48px)',
                                letterSpacing: '-1px',
                                lineHeight: 1,
                                color: 'var(--color-ink)',
                                margin: 0,
                              }}
                            >
                              {fmt(listing.monthlyPayment)}<span style={{ fontSize: '0.45em', color: 'var(--color-muted)', marginLeft: 4 }}>/mo</span>
                            </p>
                            <p className="bmh-caption" style={{ color: 'var(--color-muted)', marginTop: 6 }}>
                              Call us for purchase price
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="bmh-caption bmh-muted" style={{ marginBottom: 4 }}>
                              Pricing
                            </p>
                            <p
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(24px,3vw,36px)',
                                letterSpacing: '-0.5px',
                                lineHeight: 1.1,
                                color: 'var(--color-ink)',
                                margin: 0,
                              }}
                            >
                              Contact for pricing
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <div className="bmh-listing-stat">
                      <div className="bmh-listing-stat-val">{listing.beds}</div>
                      <div className="bmh-listing-stat-label">Bed</div>
                    </div>
                    <div className="bmh-listing-stat">
                      <div className="bmh-listing-stat-val">{listing.baths}</div>
                      <div className="bmh-listing-stat-label">Bath</div>
                    </div>
                    <div className="bmh-listing-stat">
                      <div className="bmh-listing-stat-val">{listing.sqft.toLocaleString()}</div>
                      <div className="bmh-listing-stat-label">Sqft</div>
                    </div>
                    <div className="bmh-listing-stat">
                      <div className="bmh-listing-stat-val">{listing.year}</div>
                      <div className="bmh-listing-stat-label">Year</div>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    marginTop: 24,
                    color: 'var(--color-body)',
                    lineHeight: 1.65,
                    fontSize: 16,
                  }}
                >
                  {listing.description}
                </p>
              </div>

              {/* Features */}
              <div className="bmh-card">
                <h2
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 18,
                    color: 'var(--color-ink)',
                    margin: '0 0 20px',
                  }}
                >
                  What&rsquo;s included
                </h2>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '12px 24px',
                  }}
                >
                  {listing.features.map((f, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        fontSize: 14,
                        color: 'var(--color-body)',
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{
                          width: 16,
                          height: 16,
                          flexShrink: 0,
                          marginTop: 2,
                          color: 'var(--color-primary)',
                        }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── RIGHT COLUMN (sticky sidebar) ── */}
            <aside style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
              <SidebarForm slug={listing.slug} />
            </aside>
          </div>
        </div>
      </section>

      {/* ── RELATED HOMES ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bmh-section bmh-surface-card">
          <div className="bmh-container">
            <div className="bmh-section-head">
              <h2>
                More homes
                <br />
                <em>like this one.</em>
              </h2>
            </div>
            <div className="bmh-inv-grid">
              {related.map((l) => (
                <RelatedCard key={l.id} listing={l} />
              ))}
            </div>
            <div className="bmh-spacer-lg" />
            <div style={{ textAlign: 'center' }}>
              <Link href="/browse" className="bmh-btn bmh-btn-secondary bmh-btn-lg">
                Browse all inventory →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CORAL CTA ─────────────────────────────────────── */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-callout-coral">
            <div>
              <span className="bmh-caps" style={{ color: 'rgba(255,255,255,0.8)' }}>
                We don&rsquo;t pull credit
              </span>
              <div className="bmh-spacer-sm" />
              <h2>
                Know what you can afford
                <br />
                <em>before you fall in love.</em>
              </h2>
            </div>
            <div>
              <p>
                A free 3-minute pre-qualification shows you which homes fit your budget and what
                your monthly payment looks like — no credit pull, no obligation.
              </p>
              <div className="bmh-spacer-md" />
              <Link href="/calculator" className="bmh-btn bmh-btn-cream-on-dark bmh-btn-lg">
                Start your free analysis →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
