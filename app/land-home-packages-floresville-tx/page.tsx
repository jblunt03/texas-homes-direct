import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FaqAccordion from '@/components/FaqAccordion'
import GoogleReviewLinks from '@/components/GoogleReviewLinks'
import PriceModeToggle from '@/components/PriceModeToggle'
import { LandHomeDelivery, LandHomeFinancing, LandHomeLinkRow } from '@/components/landHome/LandHomeExtras'
import PackageGrid from '@/components/landHome/PackageGrid'
import PackageCtas from '@/components/landHome/PackageCtas'
import { ParcelAerials } from '@/components/landHome/LandHomeGallery'
import PackageDescription from '@/components/landHome/PackageDescription'
import { LAND_HOME_PACKAGES } from '@/lib/features'
import {
  FLORESVILLE_PACKAGES_PATH,
  LAND_HOME_DATE_MODIFIED,
  LAND_HOME_HUB_PATH,
  LAND_HOME_KEYWORDS,
  SITE_URL,
  packageName,
  packagePath,
  packagesIn,
} from '@/lib/packages'

// The Floresville land-home packages (CLAUDE.md "Land-Home Packages"). The
// detail shared by all three packages lives here, so the package pages stay
// short and distinct. No county (lib/cities.ts doesn't record one).
const PAGE_URL = `${SITE_URL}${FLORESVILLE_PACKAGES_PATH}`
const TITLE = 'Land and Home Packages in Floresville, TX | Texas Homes Direct'
const DESCRIPTION =
  'Three land-home packages in Floresville, Texas, on lots from 0.75 to 1.20 acres, each with all utilities and a 3- or 4-bed, 2-bath home shown. From Texas Homes Direct.'

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

const FLORESVILLE = packagesIn('Floresville')

const FAQ = [
  {
    q: 'How many land-home packages does Texas Homes Direct have in Floresville?',
    a: 'Three, one per lot: 1.20 acres, 1.05 acres and 0.75 acres. Each comes with a brand new 3 or 4 bed, 2 bath home and all utilities connected to the house. The cards above show each one’s cash price by default, or its estimated monthly payment if you switch views.',
  },
  {
    q: 'Which homes are shown with the Floresville packages?',
    a: 'Each lot shows its own home, all 2-bathroom double wides: 4 bedrooms and 2,280 square feet on 1.20 acres, 3 bedrooms and 1,680 square feet on 1.05 acres, and 4 bedrooms and 1,493 square feet on 0.75 acres. The buyer can choose their own home instead, or call (830) 381-1309.',
  },
  {
    q: 'Do the Floresville packages come with utilities?',
    a: 'Yes. Each Floresville land-home package comes with all utilities connected to the house. If you have questions about the utilities on a particular lot, call Texas Homes Direct at (830) 381-1309 or request a free quote, tell us which package you’re looking at, and we’ll go over it with you.',
  },
  {
    q: 'Where can I compare cash prices and monthly estimates for these packages?',
    a: 'Right on this page. Each package card shows its cash price by default; switch the view to Est. monthly payment to see the estimate instead, and tap the (i) beside any estimate to read what it means. Your choice carries over to the rest of the Texas Homes Direct site.',
  },
]

export default function FloresvillePackagesPage() {
  if (!LAND_HOME_PACKAGES) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Land-Home Packages', item: `${SITE_URL}${LAND_HOME_HUB_PATH}` },
      { '@type': 'ListItem', position: 3, name: 'Floresville, TX', item: PAGE_URL },
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
    name: 'Land-home packages in Floresville, Texas',
    itemListElement: FLORESVILLE.map((p, i) => ({
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
          <Link href={LAND_HOME_HUB_PATH}>Land-Home Packages</Link>
          <span aria-hidden="true">/</span>
          <span>Floresville, TX</span>
        </div>
      </nav>

      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 32px' }}>
        <div className="bmh-container">
          <span className="bmh-eyebrow">Floresville, Texas</span>
          <h1 className="bmh-city-h1">
            Land and Home Packages in <em>Floresville, TX</em>
          </h1>
          <p className="bmh-lead bmh-explainer-lead">
            Texas Homes Direct has three land-home packages in Floresville, Texas, each a home and its lot
            sold together, with all utilities. The lots are 1.20, 1.05 and 0.75 acres. Each package
            shows a 2-bathroom double wide with 3 or 4 bedrooms and 1,493 to 2,280 square feet, and you can choose your own home
            instead.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '32px 0 40px' }} data-section="parcels">
        <div className="bmh-container">
          <h2 className="bmh-city-h2" style={{ margin: 0 }}>The Parcels</h2>
          <div className="bmh-spacer-md" />
          <ParcelAerials />
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '32px 0 40px' }}>
        <div className="bmh-container">
          <div className="bmh-lh-toolbar">
            <h2 className="bmh-city-h2" style={{ margin: 0 }}>The Three Packages</h2>
            <PriceModeToggle placement="land-home" />
          </div>
          <div className="bmh-spacer-md" />
          <PackageGrid packages={FLORESVILLE} />
        </div>
      </section>

      <section className="bmh-surface-card" style={{ padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">What Every Floresville Package Has in Common</h2>
            <PackageDescription facts={FLORESVILLE[0].facts} lots={FLORESVILLE.map((p) => ({ acres: p.acres, home: p.home }))} />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <LandHomeFinancing />
          <div className="bmh-spacer-lg" />
          <LandHomeDelivery floresville />
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose bmh-faq-speakable">
            <h2 className="bmh-city-h2">Floresville Package Questions</h2>
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
            <LandHomeLinkRow
              links={[
                { href: LAND_HOME_HUB_PATH, label: 'Land-Home Packages in Texas →' },
                { href: '/mobile-homes-floresville-tx', label: 'A home for your own land in Floresville →' },
                { href: '/calculator', label: 'Free mortgage analysis →' },
                ...FLORESVILLE.map((p) => ({ href: packagePath(p), label: `${packageName(p)} →` })),
              ]}
            />
          </div>
        </div>
      </section>

      <GoogleReviewLinks />

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '48px 0' }}>
        <div className="bmh-container" style={{ textAlign: 'center' }}>
          <h2 className="bmh-city-h2" style={{ maxWidth: 700, margin: '0 auto' }}>
            Interested in a Floresville package?
          </h2>
          <div className="bmh-spacer-lg" />
          <PackageCtas page="floresville" center />
        </div>
      </section>
    </div>
  )
}
