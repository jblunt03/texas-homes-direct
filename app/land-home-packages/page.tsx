import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FaqAccordion from '@/components/FaqAccordion'
import GoogleReviewLinks from '@/components/GoogleReviewLinks'
import PriceModeToggle from '@/components/PriceModeToggle'
import { LandHomeDelivery, LandHomeFinancing, LandHomeLinkRow } from '@/components/landHome/LandHomeExtras'
import PackageCtas from '@/components/landHome/PackageCtas'
import PackageGrid from '@/components/landHome/PackageGrid'
import { LAND_HOME_PACKAGES } from '@/lib/features'
import {
  ANALYSIS_CTA,
  CREDIT_DOWN,
  DELIVERY_ANSWER,
  LAND_STANDS_IN,
  withFaqHtml,
} from '@/lib/flaggedCopy'
import {
  LAND_HOME_DATE_MODIFIED,
  LAND_HOME_HUB_PATH,
  LAND_HOME_KEYWORDS,
  PACKAGES,
  SITE_URL,
  packageName,
  packagePath,
} from '@/lib/packages'

// Land-Home Packages pillar page (CLAUDE.md "Land-Home Packages"). Statewide:
// Floresville appears only as current inventory (cards, location labels), in
// the comparison's example column, and in one FAQ about the current packages.
// Order: H1 → strip → Current Inventory → definition → how it works → FAQ →
// CTAs → comparison (last). No prices or payments in the FAQ, title,
// description or schema.
const PAGE_URL = `${SITE_URL}${LAND_HOME_HUB_PATH}`
const TITLE = 'Land and Home Packages in Texas | Texas Homes Direct'
const DESCRIPTION =
  'Texas Homes Direct sells land-home packages across Texas: a home and its lot sold together, turnkey. Financing is available, including a free mortgage analysis. See the current inventory and how to get started.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: LAND_HOME_KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Texas Homes Direct',
    locale: 'en_US',
    type: 'website',
  },
  // Own twitter block: the layout's says "manufactured homes", which these pages must not.
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
  alternates: { canonical: PAGE_URL },
}

const FAQ = [
  {
    q: 'What is a land-home package?',
    a: 'A land-home package is a home and its lot sold together as one turnkey purchase, so you aren’t shopping for land and a home separately. Texas Homes Direct sells land-home packages across Texas, and each package in our current inventory includes all utilities.',
  },
  {
    q: 'What comes with each Floresville land-home package?',
    a: 'Each one is a single lot and a home, sold turnkey with all utilities. The three lots measure 1.3, 1.2 and 0.75 acres. Every package shows a 4-bedroom, 2-bathroom double wide of 1,493 square feet, and the buyer has the option to choose their own home instead.',
  },
  {
    q: 'Where in Texas does Texas Homes Direct offer land-home packages?',
    a: 'Across Texas. Texas Homes Direct sells land-home packages statewide, and every package available right now is listed in the current inventory on this page. If you’re looking in another part of the state, call (830) 381-1309 or request a free quote and tell us where you’d like to be.',
  },
  {
    q: 'Can I pick my own home instead of the one shown?',
    a: 'Yes. Each package shows a 4-bedroom, 2-bathroom home, and you have the option to choose your own home instead. To talk through which home you have in mind, call Texas Homes Direct at (830) 381-1309 or request a free quote, and we’ll go over it with you.',
  },
  {
    q: 'How do I get started on a land-home package?',
    a: 'Pick whichever is easiest: request a free quote with our short form, start a finance application online, or call Texas Homes Direct at (830) 381-1309. Let us know which package in our current inventory caught your eye, or where in Texas you’d like a land-home package, and we’ll take it from there.',
  },
  {
    q: 'How is a land-home package different from buying a home for my own land?',
    a: 'When you buy a home alone, you provide the land, and utilities are estimated by phone, then bid exactly after our contractor visits your property. With a package from our current inventory, the lot comes with the home, turnkey, with all utilities. Texas Homes Direct sells both ways of buying.',
  },
  {
    q: 'How do I finance a land-home package?',
    a: `${CREDIT_DOWN} ${LAND_STANDS_IN} — that is more often relevant when you bring the land. On a package, the lot is part of the purchase. ${ANALYSIS_CTA}`,
    flagged: [
      CREDIT_DOWN,
      `${LAND_STANDS_IN} — that is more often relevant when you bring the land.`,
    ],
  },
  {
    q: 'How is delivery priced, and how long does it take?',
    a: DELIVERY_ANSWER,
  },
]

const FAQ_ITEMS = withFaqHtml(FAQ)

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

export default function LandHomePackagesPage() {
  if (!LAND_HOME_PACKAGES) notFound()

  // Unique locations in the current inventory, for the "browse by location" links.
  const locations = Array.from(new Map(PACKAGES.map((p) => [p.locationPath, p.locationLabel])).entries())

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Land-Home Packages', item: PAGE_URL },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': PAGE_URL,
    url: PAGE_URL,
    name: TITLE,
    description: DESCRIPTION,
    dateModified: LAND_HOME_DATE_MODIFIED,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.bmh-faq-speakable', '.bmh-explainer-lead'],
    },
  }
  // Name + url only: no image, even though cards show a stand-in photo.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Current land-home packages',
    itemListElement: PACKAGES.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: packageName(p),
      url: `${SITE_URL}${packagePath(p)}`,
    })),
  }

  return (
    <div className="bmh-wide-inventory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-canvas)', padding: '16px 0 0' }}>
        <div className="bmh-container bmh-crumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Land-Home Packages</span>
        </div>
      </nav>

      {/* 1. H1 + subline */}
      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 8px' }} data-section="intro">
        <div className="bmh-container">
          <span className="bmh-eyebrow">Land-Home Packages</span>
          <h1 className="bmh-city-h1">
            Land and Home Packages in <em>Texas</em>
          </h1>
          <p className="bmh-lead" style={{ maxWidth: '70ch' }}>
            Texas Homes Direct sells land-home packages across Texas. Our current inventory is in Floresville,
            Texas.
          </p>

          {/* 2. Strip */}
          <ul className="bmh-lh-strip" data-section="strip">
            <li>
              <Icon>
                <circle cx="8" cy="15" r="4" />
                <path d="M10.8 12.2 20 3" />
                <path d="m16 7 3 3" />
              </Icon>
              Turnkey
            </li>
            <li>
              <Icon>
                <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
              </Icon>
              All utilities
            </li>
            <li>
              <Icon>
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
                <path d="M10 21v-6h4v6" />
              </Icon>
              Choose your own home
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Current Inventory */}
      <section style={{ background: 'var(--color-canvas)', padding: '32px 0 40px' }} data-section="inventory">
        <div className="bmh-container">
          <div className="bmh-lh-toolbar">
            <h2 className="bmh-city-h2" style={{ margin: 0 }}>Current Inventory</h2>
            <PriceModeToggle placement="land-home" />
          </div>
          <div className="bmh-spacer-md" />
          <PackageGrid packages={PACKAGES} />
          <div className="bmh-spacer-md" />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            <span className="bmh-caption">Browse by location:</span>
            {locations.map(([path, label]) => (
              <Link key={path} href={path} className="bmh-pill bmh-pill-static">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Definition, how it works, FAQ, CTAs */}
      <section className="bmh-surface-card" style={{ padding: '40px 0' }} data-section="definition">
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">What Is a Land-Home Package?</h2>
            <p className="bmh-lead bmh-explainer-lead" style={{ marginTop: 12 }}>
              A land-home package is a home and its lot sold together as one turnkey purchase. Texas Homes Direct
              sells land-home packages across Texas. Every package in our current inventory includes all utilities
              and shows a 4-bedroom, 2-bathroom home, and you can choose your own home instead.
            </p>
            <div className="bmh-spacer-md" />
            <h3 className="bmh-city-h3">How It Works</h3>
            <ol className="bmh-lh-steps bmh-lead">
              <li>Look through the current inventory above, or tell us where in Texas you&rsquo;d like a land-home package.</li>
              <li>Keep the home shown, or choose your own home instead.</li>
              <li>Request a free quote, apply for financing, or call (830) 381-1309.</li>
            </ol>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose bmh-faq-speakable">
            <h2 className="bmh-city-h2">Land-Home Package Questions</h2>
            <div className="bmh-spacer-sm" />
            <FaqAccordion items={FAQ_ITEMS} defaultOpen={0} />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '48px 0' }}>
        <div className="bmh-container" style={{ textAlign: 'center' }}>
          <h2 className="bmh-city-h2" style={{ maxWidth: 700, margin: '0 auto' }}>
            Ready to talk about a land-home package?
          </h2>
          <div className="bmh-spacer-lg" />
          <PackageCtas page="hub" center />
          <div className="bmh-spacer-md" />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            <Link href="/browse" className="bmh-pill bmh-pill-static">Browse Homes →</Link>
            <Link href="/cities" className="bmh-pill bmh-pill-static">Cities We Serve →</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <LandHomeFinancing />
          <div className="bmh-spacer-lg" />
          <LandHomeDelivery />
          <div className="bmh-spacer-lg" />
          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">More to read</h3>
            <div className="bmh-spacer-sm" />
            <LandHomeLinkRow
              links={[
                { href: '/land-home-packages-floresville-tx', label: 'Floresville land-home packages →' },
                { href: '/mobile-homes-floresville-tx', label: 'Floresville city page →' },
                { href: '/cities', label: 'Cities we serve →' },
                { href: '/calculator', label: 'Free mortgage analysis →' },
                { href: '/contact', label: 'Contact →' },
                { href: '/whats-included-in-setup', label: 'What’s included in setup →' },
                { href: '/how-pricing-works', label: 'How pricing works →' },
                { href: '/blog/how-manufactured-home-delivery-is-priced-in-texas', label: 'How delivery is priced →' },
                { href: '/blog/how-long-manufactured-home-delivery-and-setup-take-in-texas', label: 'How long delivery and setup take →' },
              ]}
            />
          </div>
        </div>
      </section>

      <GoogleReviewLinks />

      {/* 5. Comparison — always last */}
      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0 56px' }} data-section="comparison">
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">A Home Alone vs. a Land-Home Package</h2>
          </div>
          <div className="bmh-spacer-md" />
          <div className="bmh-lh-compare-wrap">
            <table className="bmh-lh-compare">
              <thead>
                <tr>
                  <th scope="col"><span className="bmh-visually-hidden">Topic</span></th>
                  <th scope="col">Buying a home alone</th>
                  <th scope="col">Floresville land-home packages</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Land</th>
                  <td>You provide it</td>
                  <td>Included, from 0.75 to 1.3 acres</td>
                </tr>
                <tr>
                  <th scope="row">Utilities</th>
                  <td>Estimated by phone, then bid exactly after our contractor visits</td>
                  <td>All utilities</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
