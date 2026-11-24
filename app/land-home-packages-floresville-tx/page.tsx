import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FaqAccordion from '@/components/FaqAccordion'
import GoogleReviewLinks from '@/components/GoogleReviewLinks'
import PriceModeToggle from '@/components/PriceModeToggle'
import { LandHomeDelivery, LandHomeFinancing, LandHomeLinkRow } from '@/components/landHome/LandHomeExtras'
import PackageGrid from '@/components/landHome/PackageGrid'
import PackageCtas from '@/components/landHome/PackageCtas'
import { LAND_HOME_PACKAGES } from '@/lib/features'
import {
  ANALYSIS_CTA,
  CREDIT_DOWN,
  DELIVERY_ANSWER,
  LAND_STANDS_IN,
  withFaqHtml,
} from '@/lib/flaggedCopy'
import {
  FLORESVILLE_PACKAGES_PATH,
  LAND_HOME_DATE_MODIFIED,
  LAND_HOME_HUB_PATH,
  LAND_HOME_KEYWORDS,
  PACKAGE_HOME_SPECS,
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
  'Three turnkey land-home packages in Floresville, Texas, on lots from 0.75 to 1.3 acres, each with all utilities and a 4-bed, 2-bath home shown. From Texas Homes Direct.'

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

const S = PACKAGE_HOME_SPECS
const FLORESVILLE = packagesIn('Floresville')

const FAQ = [
  {
    q: 'How many land-home packages does Texas Homes Direct have in Floresville?',
    a: 'Three, one per lot: 1.3 acres, 1.2 acres and 0.75 acres. Texas Homes Direct sells each Floresville package turnkey with all utilities. The cards above show each one’s cash price by default, or its estimated monthly payment if you switch views.',
  },
  {
    q: 'Which home is shown with the Floresville packages?',
    a: 'All three show the same home: a 4-bedroom, 2-bathroom double wide with 1,493 square feet. It’s the home shown, not the only option, because the buyer can choose their own home instead. Browse our homes, or call (830) 381-1309 to talk through what you have in mind.',
  },
  {
    q: 'Do the Floresville packages come with utilities?',
    a: 'Yes. Each Floresville land-home package is turnkey and includes all utilities. If you have questions about the utilities on a particular lot, call Texas Homes Direct at (830) 381-1309 or request a free quote, tell us which package you’re looking at, and we’ll go over it with you.',
  },
  {
    q: 'Where can I compare cash prices and monthly estimates for these packages?',
    a: 'Right on this page. Each package card shows its cash price by default; switch the view to Est. monthly payment to see the estimate instead, and tap the (i) beside any estimate to read what it means. Your choice carries over to the rest of the Texas Homes Direct site.',
  },
  {
    q: 'How do I finance a Floresville land-home package?',
    a: `${CREDIT_DOWN} ${LAND_STANDS_IN} if you buy a home for your own land instead of one of these packages. On a Floresville package, the lot is part of the purchase. ${ANALYSIS_CTA}`,
    flagged: [
      CREDIT_DOWN,
      `${LAND_STANDS_IN} if you buy a home for your own land instead of one of these packages.`,
    ],
  },
  {
    q: 'How is delivery priced for the Floresville packages, and how long does it take?',
    a: DELIVERY_ANSWER,
  },
]

const FAQ_ITEMS = withFaqHtml(FAQ)

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
            sold together, turnkey, with all utilities. The lots are 1.3, 1.2 and 0.75 acres. Each package
            shows a 4-bedroom, 2-bathroom double wide with 1,493 square feet, and you can choose your own home
            instead.
          </p>
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
            <ul className="bmh-lh-facts">
              <li><strong>One lot, one home.</strong> Each package is a single Floresville lot sold together with a home.</li>
              <li><strong>Turnkey, with all utilities.</strong> All three are sold turnkey and include all utilities.</li>
              <li>
                <strong>The home shown.</strong> A {S.beds}-bedroom, {S.baths}-bathroom {S.wideType.toLowerCase()} with{' '}
                {S.sqft.toLocaleString('en-US')} square feet.
              </li>
              <li><strong>Your choice of home.</strong> The buyer has the option to choose their own home instead of the one shown.</li>
            </ul>
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
            <FaqAccordion items={FAQ_ITEMS} defaultOpen={0} />
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
