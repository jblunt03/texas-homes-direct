import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FaqAccordion from '@/components/FaqAccordion'
import PackageCtas from '@/components/landHome/PackageCtas'
import { LAND_HOME_PACKAGES } from '@/lib/features'
import {
  FLORESVILLE_PACKAGES_PATH,
  LAND_HOME_DATE_MODIFIED,
  LAND_HOME_HUB_PATH,
  LAND_HOME_KEYWORDS,
  PACKAGES,
  SITE_URL,
  packageName,
  packagePath,
  packageSpecLine,
} from '@/lib/packages'

// Land-Home Packages pillar page (CLAUDE.md "Land-Home Packages"). Facts only:
// no prices or payments in the FAQ, title, description or schema.
const PAGE_URL = `${SITE_URL}${LAND_HOME_HUB_PATH}`
const TITLE = 'Land and Home Packages in Texas | Texas Homes Direct'
const DESCRIPTION =
  'Texas Homes Direct sells land-home packages across Texas: a home and its lot sold together, turnkey. See our three Floresville packages and how to get started.'

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
    a: 'A land-home package is a home and its lot sold together as one turnkey purchase, so you aren’t shopping for land and a home separately. Texas Homes Direct sells land-home packages across Texas, and each package in our current Floresville inventory includes all utilities.',
  },
  {
    q: 'What comes with each Floresville land-home package?',
    a: 'Each one is a single lot and a home, sold turnkey with all utilities. The three lots measure 1.3, 1.2 and 0.75 acres. Every package shows a 4-bedroom, 2-bathroom double wide of 1,493 square feet, and the buyer has the option to choose their own home instead.',
  },
  {
    q: 'Where in Texas does Texas Homes Direct offer land-home packages?',
    a: 'Across Texas. Texas Homes Direct sells land-home packages statewide, and our current inventory is three packages on three lots in Floresville, Texas. If you’re looking in another part of the state, call (830) 381-1309 or request a free quote and tell us where you’d like to be.',
  },
  {
    q: 'Can I pick my own home instead of the one shown?',
    a: 'Yes. Each package shows a 4-bedroom, 2-bathroom home, and you have the option to choose your own home instead. To talk through which home you have in mind, call Texas Homes Direct at (830) 381-1309 or request a free quote, and we’ll go over it with you.',
  },
  {
    q: 'How do I get started on a land-home package?',
    a: 'Pick whichever is easiest: request a free quote with our short form, start a finance application online, or call Texas Homes Direct at (830) 381-1309. Let us know which Floresville package caught your eye, or where in Texas you’d like a land-home package, and we’ll take it from there.',
  },
  {
    q: 'How is a land-home package different from buying a home for my own land?',
    a: 'When you buy a home alone, you provide the land, and utilities are estimated by phone, then bid exactly after our contractor visits your property. With a Floresville land-home package, the lot comes with the home, turnkey, with all utilities. Texas Homes Direct sells both ways of buying.',
  },
]

export default function LandHomePackagesPage() {
  if (!LAND_HOME_PACKAGES) notFound()

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
    mainEntity: FAQ.map((item) => ({
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
    <>
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

      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 32px' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Land-Home Packages</span>
          <h1 className="bmh-city-h1">
            Land and Home Packages in <em>Texas</em>
          </h1>
          <p className="bmh-lead bmh-explainer-lead">
            A land-home package is a home and its lot sold together as one turnkey purchase. Texas Homes
            Direct sells land-home packages across Texas. Our current inventory is three packages in
            Floresville, Texas, each on its own lot with all utilities and a 4-bedroom, 2-bathroom home
            shown. You can choose your own home instead.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
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

      <section className="bmh-surface-card" style={{ padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">Current Inventory: Floresville, Texas</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              Three packages, one per lot. Each is turnkey with all utilities.
            </p>
          </div>
          <div className="bmh-spacer-md" />
          <ul className="bmh-lh-inventory">
            {PACKAGES.map((p) => (
              <li key={p.slug}>
                <Link href={packagePath(p)} className="bmh-lh-inventory-link">
                  {packageName(p)} →
                </Link>
                <span className="bmh-caption">Home shown: {packageSpecLine()}</span>
              </li>
            ))}
          </ul>
          <div className="bmh-spacer-md" />
          <Link href={FLORESVILLE_PACKAGES_PATH} className="bmh-btn bmh-btn-secondary">
            See the Floresville packages side by side →
          </Link>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose bmh-faq-speakable">
            <h2 className="bmh-city-h2">Land-Home Package Questions</h2>
            <div className="bmh-spacer-sm" />
            <FaqAccordion items={FAQ} defaultOpen={0} />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '32px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h3 className="bmh-city-h3">Keep Exploring</h3>
            <div className="bmh-spacer-sm" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href={FLORESVILLE_PACKAGES_PATH} className="bmh-pill bmh-pill-static">Floresville Land-Home Packages →</Link>
              <Link href="/browse" className="bmh-pill bmh-pill-static">Browse Homes →</Link>
              <Link href="/mobile-homes-floresville-tx" className="bmh-pill bmh-pill-static">A Home for Your Own Land in Floresville →</Link>
              <Link href="/cities" className="bmh-pill bmh-pill-static">Cities We Serve →</Link>
            </div>
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
        </div>
      </section>
    </>
  )
}
