import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { fetchAllListings } from '@/lib/notion'

export const revalidate = 3000

export const metadata: Metadata = {
  title:
    'Texas Homes Direct — Quality manufactured homes at the best prices in Texas',
  description:
    'The best prices on manufactured homes in Texas, New Mexico, and Oklahoma. Singlewides and doublewides — delivered and set up anywhere we serve. Family-owned & faith-based.',
}

export default async function HomePage() {
  const allListings = await fetchAllListings()
  const featured = allListings
    .filter((l) => l.featured && l.status === 'Active')
    .slice(0, 3)

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bmh-hero">
        <div className="bmh-container">
          <div className="bmh-hero-inner">
            <Image
              src="/hero-pearl.jpg"
              alt="Doublewide manufactured home on Texas land at sunset"
              fill
              className="bmh-hero-bg"
              priority
              sizes="100vw"
            />

            <div className="bmh-hero-content">
              <span
                className="bmh-eyebrow"
                style={{ color: 'var(--color-primary)' }}
              >
                Factory Direct Pricing. No Markup.
              </span>
              <div className="bmh-spacer-sm" />
              <h1>
                Real Homes. Real Numbers.
                <br />
                No Runaround.
              </h1>
              <p className="bmh-hero-sub">
                We work directly with the factory to bring you real pricing —
                no games, no inflated numbers. See homes in person at select
                partner locations, or start right here.
              </p>

              <form action="/browse" method="get" className="bmh-hero-search">
                <div className="bmh-field">
                  <label htmlFor="h-type">Home type</label>
                  <select id="h-type" name="type" defaultValue="">
                    <option value="">Any type</option>
                    <option value="single">Singlewide</option>
                    <option value="double">Doublewide</option>
                  </select>
                </div>
                <div className="bmh-field">
                  <label htmlFor="h-budget">Budget</label>
                  <select id="h-budget" name="budget" defaultValue="">
                    <option value="">Any budget</option>
                    <option value="750">Under $750/mo</option>
                    <option value="1000">$750–$1,000/mo</option>
                    <option value="1500">$1,000–$1,500/mo</option>
                    <option value="1501">$1,500/mo+</option>
                  </select>
                </div>
                <div className="bmh-field">
                  <label htmlFor="h-bed">Bedrooms</label>
                  <select id="h-bed" name="beds" defaultValue="">
                    <option value="">Any</option>
                    <option value="1">1 bedroom</option>
                    <option value="2">2 bedrooms</option>
                    <option value="3">3 bedrooms</option>
                    <option value="4">4+ bedrooms</option>
                  </select>
                </div>
                <button type="submit" className="bmh-btn bmh-btn-primary">
                  Search homes
                </button>
              </form>
            </div>

            <div className="bmh-hero-bottom">
              <div className="bmh-hero-pills">
                <span className="bmh-pill bmh-pill-static">Singlewide</span>
                <span className="bmh-pill bmh-pill-static">Doublewide</span>
              </div>
              <Link href="/calculator" className="bmh-hero-card">
                <span
                  className="bmh-caps"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Voted best financing in TX
                </span>
                <span className="bmh-hero-card-title bmh-serif-italic">
                  Find a home that suits your budget.
                </span>
                <span className="bmh-hero-card-link">Apply now →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST / STATS ============ */}
      <section
        className="bmh-section-sm"
        style={{ background: 'var(--color-canvas)' }}
      >
        <div className="bmh-container">
          <div className="bmh-split">
            <div>
              <span className="bmh-eyebrow">Family-owned · Faith-based</span>
              <div className="bmh-spacer-sm" />
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(34px,4.4vw,52px)',
                  letterSpacing: '-1px',
                  lineHeight: 1.05,
                  margin: 0,
                  color: 'var(--color-ink)',
                }}
              >
                Your trusted Texas
                <br />
                <em style={{ color: 'var(--color-primary)' }}>
                  manufactured-home dealer.
                </em>
              </h2>
            </div>
            <div>
              <p className="bmh-lead">
                We&rsquo;re a small, family-owned, faith-based business. Since
                2024 we&rsquo;ve been changing the manufactured-home industry in
                Texas, Oklahoma, and New Mexico — helping families find quality
                homes at honest prices, with no high-pressure sales, no hidden
                fees, just the best price and a clear path to move-in day.
              </p>
            </div>
          </div>

          <div className="bmh-spacer-lg" />

          <div className="bmh-split-6-5">
            <div
              className="bmh-lifestyle-photo bmh-ratio-4x3"
              style={{ position: 'relative' }}
            >
              <Image
                src="/lifestyle-hillcountry.jpg"
                alt="Black board-and-batten doublewide with cedar shutters on a Texas Hill Country lot"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 960px) 100vw, 55vw"
              />
            </div>
            <div className="bmh-stat-grid">
              <div className="bmh-stat">
                <div className="bmh-stat-value">523+</div>
                <div className="bmh-stat-label">Families moved in</div>
              </div>
              <div className="bmh-stat bmh-stat-dark">
                <div className="bmh-stat-value">3</div>
                <div className="bmh-stat-label">States we deliver to</div>
              </div>
              <div className="bmh-stat">
                <div className="bmh-stat-value">$49k</div>
                <div className="bmh-stat-label">Starting price</div>
              </div>
              <div className="bmh-stat">
                <div className="bmh-stat-value">50+</div>
                <div className="bmh-stat-label">Floor plans available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BROWSE BY TYPE ============ */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container">
          <div className="bmh-section-head">
            <h2>
              Shop the kind of home
              <br />
              that fits <em>your life.</em>
            </h2>
            <p className="bmh-lead">
              From a starter singlewide to a four-bedroom doublewide, every home
              on our lot is priced to give Texas families more for their money.
            </p>
          </div>

          <div className="bmh-inv-grid">
            <Link href="/browse?type=single" className="bmh-inv-card">
              <div className="bmh-ratio-4x3 bmh-inv-card-media" style={{overflow:'hidden'}}>
                <span className="bmh-badge-caps bmh-badge-coral bmh-inv-card-tag">
                  From $48k
                </span>
                <Image
                  src="/homes/the-skipjack/6-Jackson.jpg.jpeg"
                  alt="Singlewide manufactured home exterior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bmh-inv-card-body">
                <h3 className="bmh-inv-card-title">Singlewides</h3>
                <p className="bmh-inv-card-sub">
                  Compact, efficient, and the most affordable way into
                  homeownership.
                </p>
                <div className="bmh-inv-card-footer">
                  <span className="bmh-caption bmh-muted">
                    1–4 bedrooms · 600–1,200 sq ft
                  </span>
                  <span className="bmh-inv-card-link">Browse →</span>
                </div>
              </div>
            </Link>

            <Link href="/browse?type=double" className="bmh-inv-card">
              <div className="bmh-ratio-4x3 bmh-inv-card-media" style={{overflow:'hidden'}}>
                <span className="bmh-badge-caps bmh-badge-coral bmh-inv-card-tag">
                  Most popular
                </span>
                <Image
                  src="/homes/the-ranch/OakCreek-Ranch-1.jpeg"
                  alt="Doublewide manufactured home exterior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bmh-inv-card-body">
                <h3 className="bmh-inv-card-title">Doublewides</h3>
                <p className="bmh-inv-card-sub">
                  Two halves joined on site — full kitchens, larger bedrooms,
                  real family-home feel.
                </p>
                <div className="bmh-inv-card-footer">
                  <span className="bmh-caption bmh-muted">
                    3–6 bedrooms · 1,200–2,400 sq ft
                  </span>
                  <span className="bmh-inv-card-link">Browse →</span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section
        className="bmh-section"
        style={{ background: 'var(--color-canvas)' }}
      >
        <div className="bmh-container">
          <div className="bmh-section-head bmh-section-head-center">
            <span className="bmh-eyebrow">Why Texas Homes Direct</span>
            <div className="bmh-spacer-sm" />
            <h2>
              The best price in Texas —
              <br />
              and that&rsquo;s just the start.
            </h2>
          </div>

          <div className="bmh-feature-grid-3">
            <div className="bmh-feature">
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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </span>
              <h4>Honest, lowest pricing</h4>
              <p>
                We price homes lower than the big-box dealers and we keep it
                transparent — no high-pressure quotes, no hidden delivery fees,
                no last-minute add-ons.
              </p>
            </div>

            <div className="bmh-feature">
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
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.4 6.5 11.4 7.4 12.2.3.3.9.3 1.2 0 .9-.8 7.4-6.8 7.4-12.2a8 8 0 0 0-8-8z" />
                </svg>
              </span>
              <h4>Delivered everywhere we serve</h4>
              <p>
                Texas, New Mexico, and Oklahoma — we coordinate transport,
                setup, and skirting. You sign one contract, we handle the rest
                until you&rsquo;re holding keys.
              </p>
            </div>

            <div className="bmh-feature">
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
                  <path d="M20 7L9 18l-5-5" />
                </svg>
              </span>
              <h4>Financing for real people</h4>
              <p>
                Voted best financing in Texas. Less-than-perfect credit? We work
                with lenders who specialize in manufactured-home loans — get
                pre-qualified in minutes and we never pull your credit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container">
          <div className="bmh-section-head">
            <h2>
              Four steps from
              <br />
              <em>here to home.</em>
            </h2>
            <p className="bmh-lead">
              No surprises. We walk Texas families through every step from first
              conversation to the day your home is set on its foundation.
            </p>
          </div>

          <div className="bmh-steps-grid">
            <div className="bmh-step">
              <span className="bmh-step-num">01</span>
              <h4>Get pre-qualified</h4>
              <p>
                Tell us about your situation and we&rsquo;ll match you with the
                right lenders — we don&rsquo;t pull your credit. Takes about 10
                minutes.
              </p>
            </div>
            <div className="bmh-step">
              <span className="bmh-step-num">02</span>
              <h4>Pick your home</h4>
              <p>
                Browse our lot or order from the factory. Walk a model, see the
                floor plan, choose your colors and features.
              </p>
            </div>
            <div className="bmh-step">
              <span className="bmh-step-num">03</span>
              <h4>Prep the land</h4>
              <p>
                We&rsquo;ll review your land or help you find a lot. Permits,
                pad, utilities — we keep a checklist and a timeline.
              </p>
            </div>
            <div className="bmh-step">
              <span className="bmh-step-num">04</span>
              <h4>Delivery &amp; set-up</h4>
              <p>
                Transport, blocking, leveling, tie-down, skirting, and final
                walk-through. Then it&rsquo;s keys-and-coffee day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED LISTINGS ============ */}
      <section
        className="bmh-section"
        style={{ background: 'var(--color-canvas)' }}
      >
        <div className="bmh-container">
          <div className="bmh-section-head">
            <h2>
              Featured homes
              <br />
              this week.
            </h2>
            <Link href="/browse" className="bmh-btn bmh-btn-secondary">
              View all inventory →
            </Link>
          </div>

          <div className="bmh-inv-grid">
            {featured.map((listing) => {
              const badge = { label: 'New', cls: 'bmh-badge-coral' }
              const subLabel = [listing.wideType ?? 'Singlewide']
                .filter(Boolean)
                .join(' · ')

              return (
                <Link
                  key={listing.id}
                  href={`/homes/${listing.slug}`}
                  className="bmh-inv-card"
                >
                  {listing.images[0] ? (
                    <div
                      className="bmh-ratio-3x2 bmh-inv-card-media"
                      style={{ position: 'relative' }}
                    >
                      <span
                        className={`bmh-badge-caps ${badge.cls} bmh-inv-card-tag`}
                      >
                        {badge.label}
                      </span>
                      <Image
                        src={listing.images[0]}
                        alt={`${listing.title} exterior`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="bmh-ph bmh-ratio-3x2 bmh-inv-card-media">
                      <span
                        className={`bmh-badge-caps ${badge.cls} bmh-inv-card-tag`}
                      >
                        {badge.label}
                      </span>
                      <span className="bmh-ph-label">
                        {listing.title} exterior
                      </span>
                    </div>
                  )}

                  <div className="bmh-inv-card-body">
                    <h3 className="bmh-inv-card-title">{listing.title}</h3>
                    <p className="bmh-inv-card-sub">
                      {listing.beds} bed · {listing.baths} bath ·{' '}
                      {listing.sqft.toLocaleString()} sq ft · {subLabel}
                    </p>
                    <div className="bmh-inv-card-specs">
                      <span className="bmh-spec">
                        <strong>{listing.beds}</strong> bed
                      </span>
                      <span className="bmh-spec">
                        <strong>{listing.baths}</strong> bath
                      </span>
                      <span className="bmh-spec">
                        <strong>{listing.sqft.toLocaleString()}</strong> sqft
                      </span>
                      <span className="bmh-spec">{listing.year}</span>
                    </div>
                    <div className="bmh-inv-card-footer">
                      <span className="bmh-inv-card-price">
                        {listing.price > 0
                          ? <>${listing.price.toLocaleString()} <small>· starting</small></>
                          : listing.monthlyPayment > 0
                          ? <>${listing.monthlyPayment.toLocaleString()}<small>/mo</small></>
                          : <>Contact for pricing</>
                        }
                      </span>
                      <span className="bmh-inv-card-link">Details →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ CORAL CALLOUT ============ */}
      <section
        className="bmh-section"
        style={{ background: 'var(--color-canvas)' }}
      >
        <div className="bmh-container">
          <div className="bmh-callout-coral">
            <div>
              <span
                className="bmh-caps"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                We don&rsquo;t pull credit
              </span>
              <div className="bmh-spacer-sm" />
              <h2>
                Find a home that{' '}
                <em>fits your budget</em> — before you fall in love with it.
              </h2>
            </div>
            <div>
              <p>
                No credit pull, no obligation. You&rsquo;ll walk away knowing
                your budget, your monthly, and what kind of home is in reach.
                Most folks finish in under ten minutes.
              </p>
              <div className="bmh-spacer-md" />
              <Link
                href="/calculator"
                className="bmh-btn bmh-btn-cream-on-dark bmh-btn-lg"
              >
                Start your free analysis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section
        className="bmh-section"
        style={{ background: 'var(--color-canvas)' }}
      >
        <div className="bmh-container">
          <div className="bmh-section-head bmh-section-head-center">
            <h2>
              What our Texas
              <br />
              families <em>are saying.</em>
            </h2>
          </div>

          <div className="bmh-testi-grid">
            <div className="bmh-testi">
              <div className="bmh-stars">★★★★★</div>
              <p className="bmh-testi-quote">
                &ldquo;We shopped six dealers and Texas Homes Direct beat every
                single one of them on price — and they were the only ones that
                didn&rsquo;t try to upsell us into something we
                couldn&rsquo;t afford.&rdquo;
              </p>
              <div className="bmh-testi-foot">
                <div className="bmh-testi-avatar">RH</div>
                <div>
                  <div className="bmh-testi-name">Rachel &amp; Mike H.</div>
                  <div className="bmh-testi-meta">
                    Lubbock, TX · 3BR doublewide
                  </div>
                </div>
              </div>
            </div>

            <div className="bmh-testi">
              <div className="bmh-stars">★★★★★</div>
              <p className="bmh-testi-quote">
                &ldquo;They walked me through the credit analysis, picked the
                right floor plan, and had the home set on my land in Roswell six
                weeks later. Couldn&rsquo;t ask for more.&rdquo;
              </p>
              <div className="bmh-testi-foot">
                <div className="bmh-testi-avatar">JG</div>
                <div>
                  <div className="bmh-testi-name">Javier G.</div>
                  <div className="bmh-testi-meta">
                    Roswell, NM · 2BR singlewide
                  </div>
                </div>
              </div>
            </div>

            <div className="bmh-testi">
              <div className="bmh-stars">★★★★★</div>
              <p className="bmh-testi-quote">
                &ldquo;As first-time buyers we were nervous. They explained
                every line of the contract, helped us understand the permits,
                and never once made us feel like we were asking dumb
                questions.&rdquo;
              </p>
              <div className="bmh-testi-foot">
                <div className="bmh-testi-avatar">EM</div>
                <div>
                  <div className="bmh-testi-name">Emily M.</div>
                  <div className="bmh-testi-meta">
                    Tulsa, OK · Singlewide
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bmh-spacer-lg" />
          <div style={{ textAlign: 'center' }}>
            <Link href="/testimonials" className="bmh-btn bmh-btn-secondary">
              Read more reviews →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
