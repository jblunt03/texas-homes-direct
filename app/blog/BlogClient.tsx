'use client'
import { useState } from 'react'
import Link from 'next/link'

export type BlogCat = 'all' | 'financing' | 'floorplans' | 'land' | 'delivery' | 'buying'

export interface BlogPostItem {
  slug: string
  title: string
  excerpt: string
  readTime: string
  cat: BlogCat
  catLabel: string
  phLabel: string
}

const FILTERS: { key: BlogCat; label: string }[] = [
  { key: 'all',       label: 'All posts' },
  { key: 'financing', label: 'Financing' },
  { key: 'floorplans',label: 'Floor plans' },
  { key: 'land',      label: 'Land & permits' },
  { key: 'delivery',  label: 'Delivery & setup' },
  { key: 'buying',    label: 'First-time buyers' },
]

const FEATURED = {
  slug: 'how-to-finance-mobile-home-on-family-land-texas',
  catLabel: 'Financing',
  readTime: '9 min',
  title: 'How to finance a manufactured home in Texas — without getting taken for a ride.',
  excerpt:
    "A plain-English walkthrough of chattel loans, land-in-lieu, FHA Title I, conventional manufactured-home loans, and what a \"good\" rate actually looks like in 2026. We'll show you the questions to ask your lender before you sign anything.",
  phLabel: 'Featured post — financing guide cover',
}

export default function BlogClient({ posts }: { posts: BlogPostItem[] }) {
  const [activeFilter, setActiveFilter] = useState<BlogCat>('all')
  const [subscribed, setSubscribed] = useState(false)
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false)
  const [newsletterError, setNewsletterError] = useState<string | null>(null)
  const [email, setEmail] = useState('')

  const filtered = activeFilter === 'all' ? posts : posts.filter((p) => p.cat === activeFilter)

  return (
    <>
      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Buyer&rsquo;s blog</span>
          <h1>
            Straight answers on
            <br />
            buying a <em>manufactured home.</em>
          </h1>
          <p className="bmh-lead">
            Plain-language guides on financing, choosing a floor plan, prepping your land, and what
            to expect on delivery day. Written by the people who actually sell and set these homes.
          </p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <div
        style={{
          padding: '32px 0',
          borderBottom: '1px solid var(--color-hairline)',
          background: 'var(--color-canvas)',
        }}
      >
        <div className="bmh-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                className={`bmh-pill${activeFilter === key ? ' bmh-is-active' : ''}`}
                onClick={() => setActiveFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED POST */}
      <section className="bmh-section-sm" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-post-feature">
            <div className="bmh-ph bmh-ratio-4x3">
              <span className="bmh-ph-label">{FEATURED.phLabel}</span>
            </div>
            <div className="bmh-post-feature-body">
              <span className="bmh-badge-caps bmh-badge-coral">Featured</span>
              <div className="bmh-spacer-sm" />
              <h2
                style={{
                  fontSize: 'clamp(28px,3.6vw,40px)',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  margin: 0,
                }}
              >
                {FEATURED.title}
              </h2>
              <div className="bmh-spacer-md" />
              <p className="bmh-lead">{FEATURED.excerpt}</p>
              <div className="bmh-spacer-md" />
              <div className="bmh-post-meta">
                <span>By the Texas Homes Direct team</span>
                <span className="bmh-post-dot" />
                <span>{FEATURED.readTime} read</span>
                <span className="bmh-post-dot" />
                <span>{FEATURED.catLabel}</span>
              </div>
              <div className="bmh-spacer-md" />
              <Link href={`/blog/${FEATURED.slug}`} className="bmh-btn bmh-btn-primary">
                Read the guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POST GRID */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          {filtered.length > 0 ? (
            <div className="bmh-blog-grid">
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bmh-post"
                >
                  <div className="bmh-ph bmh-ratio-3x2">
                    <span className="bmh-ph-label">{post.phLabel}</span>
                  </div>
                  <div className="bmh-post-meta">
                    <span>{post.catLabel}</span>
                    <span className="bmh-post-dot" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="bmh-post-title">{post.title}</h3>
                  <p className="bmh-post-excerpt">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="bmh-lead bmh-muted" style={{ textAlign: 'center', padding: '48px 0' }}>
              No posts in this category yet — check back soon.
            </p>
          )}

          <div className="bmh-spacer-lg" />
          <div style={{ textAlign: 'center' }}>
            <button className="bmh-btn bmh-btn-secondary">Load more posts</button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container-narrow" style={{ textAlign: 'center' }}>
          <span className="bmh-eyebrow">Newsletter</span>
          <div className="bmh-spacer-sm" />
          <h2>
            One short email a month,
            <br />
            <em>nothing but useful.</em>
          </h2>
          <div className="bmh-spacer-md" />
          <p className="bmh-lead">
            New floor plans, market updates, and the occasional first-time-buyer tip. No spam, no
            sales pitches — and you can opt out in one click.
          </p>
          <div className="bmh-spacer-lg" />

          {subscribed ? (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                color: 'var(--color-ink)',
                letterSpacing: '-0.3px',
              }}
            >
              Thanks — you&rsquo;re in.
            </p>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setNewsletterSubmitting(true)
                setNewsletterError(null)
                try {
                  const res = await fetch('/api/lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, source: 'Blog Newsletter' }),
                  })
                  if (!res.ok) throw new Error('Failed')
                  setSubscribed(true)
                } catch {
                  setNewsletterError('Something went wrong — please try again.')
                } finally {
                  setNewsletterSubmitting(false)
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                maxWidth: 480,
                margin: '0 auto',
              }}
            >
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="email"
                  className="bmh-newsletter-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bmh-btn bmh-btn-primary bmh-btn-lg"
                  disabled={newsletterSubmitting}
                >
                  {newsletterSubmitting ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
              {newsletterError && (
                <p style={{ color: 'var(--color-error, #c0392b)', fontSize: 14, margin: 0 }}>
                  {newsletterError}
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  )
}
