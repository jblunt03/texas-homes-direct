'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/lib/sampleListings'

type Filter = 'all' | 'single' | 'double'

function tagForListing(listing: Listing): Filter {
  if (listing.wideType === 'Double Wide') return 'double'
  return 'single'
}

/** True when the listing has no real photos — its only "image" is the floor plan. */
function isFloorplanOnly(listing: Listing): boolean {
  return Boolean(
    listing.floorplanUrl &&
      listing.images.length === 1 &&
      listing.images[0] === listing.floorplanUrl
  )
}

export default function BrowseClient({
  initialType,
  listings,
}: {
  initialType: string
  listings: Listing[]
}) {
  const validFilters: Filter[] = ['all', 'single', 'double']
  const init = validFilters.includes(initialType as Filter) ? (initialType as Filter) : 'all'
  const [activeFilter, setActiveFilter] = useState<Filter>(init)

  const filtered = (
    activeFilter === 'all'
      ? listings
      : listings.filter((l) => tagForListing(l) === activeFilter)
  )
    .slice()
    .sort((a, b) => Number(isFloorplanOnly(a)) - Number(isFloorplanOnly(b)))

  const counts = {
    all: listings.length,
    single: listings.filter((l) => tagForListing(l) === 'single').length,
    double: listings.filter((l) => tagForListing(l) === 'double').length,
  }

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: `All homes` },
    { key: 'single', label: 'Singlewide' },
    { key: 'double', label: 'Doublewide' },
  ]

  return (
    <>
      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">{counts.all} homes available</span>
          <h1>
            Browse the <em>lot.</em>
          </h1>
          <p className="bmh-lead">
            Every home on our lot is priced to give Texas families more for their money.
            Filter by type, walk through the specs, and call us when you find the one —
            we&rsquo;ll handle delivery and setup from there.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div
        style={{
          padding: '32px 0',
          borderBottom: '1px solid var(--color-hairline)',
          background: 'var(--color-canvas)',
        }}
      >
        <div className="bmh-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  className={`bmh-pill${activeFilter === key ? ' bmh-is-active' : ''}`}
                  onClick={() => setActiveFilter(key)}
                >
                  {label}
                  {key === 'all' && (
                    <span className="bmh-muted" style={{ marginLeft: 4 }}>
                      {counts.all}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="bmh-caption bmh-muted">Sort by</span>
              <select
                className="bmh-field"
                style={{
                  height: 38,
                  padding: '0 12px',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-canvas)',
                  font: 'var(--type-body-sm)',
                  color: 'var(--color-ink)',
                  cursor: 'pointer',
                }}
                defaultValue="Featured"
              >
                <option>Featured</option>
                <option>Price (low to high)</option>
                <option>Price (high to low)</option>
                <option>Size (largest first)</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* INVENTORY GRID */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-inv-grid">
            {filtered.map((listing) => {
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
                <Link
                  key={listing.id}
                  href={`/homes/${listing.slug}`}
                  className="bmh-inv-card"
                  style={{ textDecoration: 'none' }}
                >
                  {listing.images[0] ? (
                    <div
                      className="bmh-ratio-3x2 bmh-inv-card-media"
                      style={{ position: 'relative' }}
                    >
                      <span className={`bmh-badge-caps ${badgeCls} bmh-inv-card-tag`}>
                        {badgeLabel}
                      </span>
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
                      <span className={`bmh-badge-caps ${badgeCls} bmh-inv-card-tag`}>
                        {badgeLabel}
                      </span>
                      <span className="bmh-ph-label">{listing.title} · exterior</span>
                    </div>
                  )}
                  <div className="bmh-inv-card-body">
                    <h3 className="bmh-inv-card-title" style={{ fontSize: 22 }}>
                      {listing.title}
                    </h3>
                    <p className="bmh-inv-card-sub">{subText}</p>
                    <div className="bmh-inv-card-specs">
                      <span className="bmh-spec">
                        <strong>{listing.beds}</strong> bd
                      </span>
                      <span className="bmh-spec">
                        <strong>{listing.baths}</strong> ba
                      </span>
                      <span className="bmh-spec">
                        <strong>{listing.sqft.toLocaleString()}</strong> sqft
                      </span>
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
            })}
          </div>

          <div className="bmh-spacer-lg" />
          <div
            style={{
              textAlign: 'center',
              padding: '32px 0',
              borderTop: '1px solid var(--color-hairline)',
            }}
          >
            <p className="bmh-lead" style={{ marginBottom: 20 }}>
              Don&rsquo;t see what you&rsquo;re looking for?
              <br />
              We can order any factory floor plan, in any size.
            </p>
            <Link href="/contact" className="bmh-btn bmh-btn-primary bmh-btn-lg">
              Talk to us about a custom order →
            </Link>
          </div>
        </div>
      </section>

      {/* CORAL CALLOUT */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-callout-coral">
            <div>
              <span className="bmh-caps" style={{ color: 'rgba(255,255,255,0.8)' }}>
                We don&rsquo;t pull credit
              </span>
              <div className="bmh-spacer-sm" />
              <h2>
                Know what you can afford{' '}
                <em>before you fall in love</em> with a floor plan.
              </h2>
            </div>
            <div>
              <p>
                No credit pull, no obligation. We&rsquo;ll show you which homes on the lot
                fit your budget — and what your monthly payment looks like.
              </p>
              <div className="bmh-spacer-md" />
              <Link href="/calculator" className="bmh-btn bmh-btn-cream-on-dark bmh-btn-lg">
                Start your free analysis →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
