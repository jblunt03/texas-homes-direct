'use client'
import { useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import type { Listing } from '@/lib/sampleListings'
import ListingCard from '@/components/ListingCard'
import PaymentFootnote, { showsMonthlyPayment } from '@/components/PaymentFootnote'
import { pinRank } from '@/lib/promo'
import PriceModeToggle from '@/components/PriceModeToggle'
import { usePriceMode } from '@/lib/priceModeClient'
import type { PriceMode } from '@/lib/priceMode'

type Filter = 'all' | 'single' | 'double'

// The widest grid has 4 columns, so the first 4 card photos load eagerly
// (the first row at any width); the rest stay lazy.
const EAGER_CARDS = 4

// Budget bands follow the price mode (CLAUDE.md "Cash price"). Payment bands
// are the original ones. Cash bands were chosen from the 57 prices on
// 2026-11-13 ($49k–$164k): 10 / 19 / 11 / 17 homes per band (11 / 18 / 11 / 17
// since The Mineola went to $77,000 on 2026-11-18).
const PAYMENT_BUDGET_OPTIONS = [
  { value: '', label: 'Any budget' },
  { value: '750-1000', label: '$750–$1,000/mo' },
  { value: '1000-1500', label: '$1,000–$1,500/mo' },
  { value: '1500-plus', label: '$1,500/mo+' },
]
const CASH_BUDGET_OPTIONS = [
  { value: '', label: 'Any budget' },
  { value: 'under-80k', label: 'Under $80,000' },
  { value: '80k-100k', label: '$80,000–$99,999' },
  { value: '100k-130k', label: '$100,000–$129,999' },
  { value: '130k-plus', label: '$130,000+' },
]
const budgetOptions = (mode: PriceMode) => (mode === 'payment' ? PAYMENT_BUDGET_OPTIONS : CASH_BUDGET_OPTIONS)

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'size-desc'
const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Lowest price' },
  { value: 'price-desc', label: 'Highest price' },
  { value: 'size-desc', label: 'Size (largest first)' },
]

const BEDS_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1 bedroom' },
  { value: '2', label: '2 bedrooms' },
  { value: '3', label: '3 bedrooms' },
  { value: '4', label: '4+ bedrooms' },
]

const BATHS_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1 bathroom' },
  { value: '2', label: '2+ bathrooms' },
]

const selectStyle: CSSProperties = {
  height: 38,
  padding: '0 12px',
  border: '1px solid var(--color-hairline)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-canvas)',
  font: 'var(--type-body-sm)',
  color: 'var(--color-ink)',
  cursor: 'pointer',
}

function matchesBudget(listing: Listing, budget: string): boolean {
  if (!budget) return true
  const price = listing.price
  if (budget === 'under-80k') return price > 0 && price < 80000
  if (budget === '80k-100k') return price >= 80000 && price < 100000
  if (budget === '100k-130k') return price >= 100000 && price < 130000
  if (budget === '130k-plus') return price >= 130000
  const payment = listing.monthlyPayment
  if (!payment) return false
  if (budget === '750-1000') return payment >= 750 && payment <= 1000
  if (budget === '1000-1500') return payment > 1000 && payment <= 1500
  if (budget === '1500-plus') return payment > 1500
  return true
}

function matchesBeds(listing: Listing, beds: string): boolean {
  if (!beds) return true
  const min = Number(beds)
  return min >= 4 ? listing.beds >= 4 : listing.beds === min
}

function matchesBaths(listing: Listing, baths: string): boolean {
  if (!baths) return true
  const min = Number(baths)
  return min >= 2 ? listing.baths >= 2 : listing.baths === min
}

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
  initialBudget = '',
  initialBeds = '',
  initialBaths = '',
  listings,
  promoActiveAtRender,
}: {
  initialType: string
  initialBudget?: string
  initialBeds?: string
  initialBaths?: string
  listings: Listing[]
  promoActiveAtRender: boolean
}) {
  const validFilters: Filter[] = ['all', 'single', 'double']
  const init = validFilters.includes(initialType as Filter) ? (initialType as Filter) : 'all'
  const [activeFilter, setActiveFilter] = useState<Filter>(init)
  const mode = usePriceMode()
  const [budget, setBudget] = useState(
    // The server renders cash mode, so only cash bands are valid on first render.
    CASH_BUDGET_OPTIONS.some((o) => o.value === initialBudget) ? initialBudget : ''
  )
  const [sort, setSort] = useState<Sort>('featured')
  // Switching modes swaps the budget bands, so drop a band from the other mode.
  useEffect(() => {
    setBudget((b) => (budgetOptions(mode).some((o) => o.value === b) ? b : ''))
  }, [mode])
  const [beds, setBeds] = useState(
    BEDS_OPTIONS.some((o) => o.value === initialBeds) ? initialBeds : ''
  )
  const [baths, setBaths] = useState(
    BATHS_OPTIONS.some((o) => o.value === initialBaths) ? initialBaths : ''
  )

  const filtered = listings
    .filter((l) => activeFilter === 'all' || tagForListing(l) === activeFilter)
    .filter((l) => matchesBudget(l, budget))
    .filter((l) => matchesBeds(l, beds))
    .filter((l) => matchesBaths(l, baths))
    .slice()
    .sort((a, b) => {
      if (sort === 'featured') {
        // Default order: pinned homes (PROMO.pinned in lib/promo.ts) first, in
        // config order; then homes with photos before floorplan-only ones;
        // otherwise the existing order. The same in both modes, so nothing
        // reorders when a saved "payment" choice loads.
        return (
          pinRank(a.slug) - pinRank(b.slug) ||
          Number(isFloorplanOnly(a)) - Number(isFloorplanOnly(b))
        )
      }
      if (sort === 'size-desc') return b.sqft - a.sqft
      // Price sorts use what's on screen: cash price, or the monthly payment.
      // In payment mode, homes with no payment ("Payment on request") go last
      // in both directions. Pins don't apply after a sort.
      const val = (l: Listing) => (mode === 'payment' ? l.monthlyPayment : l.price)
      const va = val(a), vb = val(b)
      if (!va || !vb) return Number(!va) - Number(!vb)
      return sort === 'price-asc' ? va - vb : vb - va
    })

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
    <div className="bmh-wide-inventory">
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
          <div className="bmh-spacer-md" />
          <PriceModeToggle placement="browse" />
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
              <Link href="/tiny-homes" className="bmh-pill">
                Tiny Homes
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                style={{ ...selectStyle, width: 190 }}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                aria-label="Budget"
              >
                {budgetOptions(mode).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <select
                style={selectStyle}
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                aria-label="Bedrooms"
              >
                {BEDS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.value === '' ? 'Any bedrooms' : o.label}
                  </option>
                ))}
              </select>
              <select
                style={selectStyle}
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                aria-label="Bathrooms"
              >
                {BATHS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.value === '' ? 'Any bathrooms' : o.label}
                  </option>
                ))}
              </select>
              <span className="bmh-caption bmh-muted">Sort by</span>
              <select
                style={selectStyle}
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort by"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* INVENTORY GRID */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-inv-grid">
            {filtered.map((listing, i) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                promoActiveAtRender={promoActiveAtRender}
                priority={i < EAGER_CARDS}
              />
            ))}
          </div>
          {filtered.some(showsMonthlyPayment) && <PaymentFootnote />}

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
    </div>
  )
}
