import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { fetchAllListings } from '@/lib/notion'
import SpinToWinPopup from '@/components/SpinToWinPopup'

export const revalidate = 3000

export const metadata: Metadata = {
  title:
    'Texas Homes Direct — Quality manufactured homes at the best prices in Texas',
  description:
    'The best prices on manufactured homes in Texas. Singlewides and doublewides — delivered and set up anywhere we serve. Family-owned & faith-based.',
}

export default async function HomePage() {
  const allListings = await fetchAllListings()
  const featured = allListings
    .filter((l) => l.featured && l.status === 'Active')
    .slice(0, 3)

  return (
    <>
      <SpinToWinPopup />

      {/* ============ HERO ============ */}
      <section className="bmh-hero">
        <div className="bmh-container">
          <div className="bmh-hero-inner">
            <Image
              src="/hero-pearl.jpg"
              alt="Doublewide manufactured home with wraparound porch at sunset in Texas"
              fill
              className="bmh-hero-bg"
              priority
              sizes="100vw"
            />

            <div className="bmh-hero-content">
              <h1>
                The Dealership We Refused to Become.
              </h1>
              <p className="bmh-hero-sub">
                We&rsquo;re faith-based, family-owned, and built this company
                to bring honest, factory-direct pricing to Texas families —
                without the games other dealerships play.
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
                <span className="bmh-hero-card-link">Get my monthly payment →</span>
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
                What Makes
                <br />
                <em style={{ color: 'var(--color-primary)' }}>
                  Texas Homes Direct Different?
                </em>
              </h2>
            </div>
            <div>
              <p className="bmh-lead">
                We&rsquo;re real people, not salesmen trying to max out your budget. So why
                are we so inexpensive? We sell homes directly from our factory to your lot —
                no middleman, no markup stacked on markup, no games. Just real
                pricing, financing built into the process from day one, and delivery and
                setup handled for you. Same quality home you&rsquo;d find at a dealership.
                Just the price it should actually be.
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
                src="/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg"
                alt="Texas Homes Direct The Mallard — black board-and-batten doublewide with cedar shutters on a Texas lot"
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
                pad, utilities — we make it turnkey and stress-free.
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
                Most folks finish in under three minutes. We can even roll
                utilities and other land improvements right into your loan —
                one payment, no separate bills to juggle.
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
                right floor plan, and had the home set on my land in Abilene six
                weeks later. Couldn&rsquo;t ask for more.&rdquo;
              </p>
              <div className="bmh-testi-foot">
                <div className="bmh-testi-avatar">JG</div>
                <div>
                  <div className="bmh-testi-name">Javier G.</div>
                  <div className="bmh-testi-meta">
                    Abilene, TX · 2BR singlewide
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
                    Waco, TX · Singlewide
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
