import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PriceModeToggle from '@/components/PriceModeToggle'
import PaymentFootnote from '@/components/PaymentFootnote'
import PackagePrice from '@/components/landHome/PackagePrice'
import PackageCtas from '@/components/landHome/PackageCtas'
import PhotosComingSoon from '@/components/landHome/PhotosComingSoon'
import TrackedLink from '@/components/landHome/TrackedLink'
import { PACKAGE_PAYMENT_DISCLOSURE } from '@/lib/disclaimers'
import { LAND_HOME_PACKAGES } from '@/lib/features'
import {
  FLORESVILLE_PACKAGES_PATH,
  LAND_HOME_DATE_MODIFIED,
  LAND_HOME_HUB_PATH,
  LAND_HOME_KEYWORDS,
  PACKAGES,
  PACKAGE_HOME_SPECS,
  SITE_URL,
  type LandHomePackage,
  findPackage,
  packageName,
  packagePath,
} from '@/lib/packages'

// One Floresville land-home package (CLAUDE.md "Land-Home Packages"). Short on
// purpose: the shared detail lives on the Floresville page. Each page's title
// and first sentence differ by acreage.
const INTRO: Record<string, string> = {
  '1.3':
    'The largest of our three Floresville lots, this 1.3-acre land-home package comes turnkey with all utilities.',
  '1.2':
    'This 1.2-acre land-home package in Floresville, Texas is sold turnkey and includes all utilities.',
  '0.75':
    'At 0.75 acres, this is the most compact of the three Floresville land-home packages, sold turnkey with all utilities.',
}

const DESCRIPTION: Record<string, string> = {
  '1.3': 'The largest Floresville land-home package: a 1.3-acre lot and a home, turnkey with all utilities. The home shown is a 4-bed, 2-bath double wide, or choose your own.',
  '1.2': 'A 1.2-acre Floresville, Texas lot sold together with a home, turnkey and with all utilities. The home shown is a 4-bed, 2-bath double wide; you can choose your own.',
  '0.75': 'The most compact Floresville land-home package: 0.75 acres plus a home, turnkey with all utilities. Shown with a 4-bed, 2-bath double wide, or pick your own home.',
}

export function generateStaticParams() {
  return LAND_HOME_PACKAGES ? PACKAGES.map((p) => ({ slug: p.slug })) : []
}

export const dynamicParams = false

function pageUrl(p: LandHomePackage) {
  return `${SITE_URL}${packagePath(p)}`
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = findPackage(params.slug)
  if (!LAND_HOME_PACKAGES || !p) return {}
  const title = `${packageName(p)} | Texas Homes Direct`
  return {
    title: { absolute: title },
    description: DESCRIPTION[p.acres],
    keywords: LAND_HOME_KEYWORDS,
    openGraph: {
      title,
      description: DESCRIPTION[p.acres],
      url: pageUrl(p),
      siteName: 'Texas Homes Direct',
      locale: 'en_US',
      type: 'website',
    },
    // Own twitter block: the layout's says "manufactured homes", which these pages must not.
    twitter: { card: 'summary', title, description: DESCRIPTION[p.acres] },
    alternates: { canonical: pageUrl(p) },
  }
}

export default function PackagePage({ params }: { params: { slug: string } }) {
  const p = findPackage(params.slug)
  if (!LAND_HOME_PACKAGES || !p) notFound()
  const S = PACKAGE_HOME_SPECS
  const others = PACKAGES.filter((o) => o.slug !== p.slug)
  const page = `package-${p.acres}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Land-Home Packages', item: `${SITE_URL}${LAND_HOME_HUB_PATH}` },
      { '@type': 'ListItem', position: 3, name: 'Floresville, TX', item: `${SITE_URL}${FLORESVILLE_PACKAGES_PATH}` },
      { '@type': 'ListItem', position: 4, name: packageName(p), item: pageUrl(p) },
    ],
  }
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl(p),
    url: pageUrl(p),
    name: `${packageName(p)} | Texas Homes Direct`,
    description: DESCRIPTION[p.acres],
    dateModified: LAND_HOME_DATE_MODIFIED,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.bmh-explainer-lead'],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-canvas)', padding: '16px 0 0' }}>
        <div className="bmh-container bmh-crumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={LAND_HOME_HUB_PATH}>Land-Home Packages</Link>
          <span aria-hidden="true">/</span>
          <Link href={FLORESVILLE_PACKAGES_PATH}>Floresville, TX</Link>
          <span aria-hidden="true">/</span>
          <span>{p.acres} Acres</span>
        </div>
      </nav>

      <section style={{ background: 'var(--color-canvas)', padding: '24px 0 40px' }}>
        <div className="bmh-container">
          <div className="bmh-lh-detail">
            <div>
              <PhotosComingSoon />
            </div>
            <div>
              <span className="bmh-eyebrow">Floresville, Texas · Land-Home Package</span>
              <h1 className="bmh-city-h1 bmh-lh-h1">{packageName(p)}</h1>
              <p className="bmh-lead bmh-explainer-lead">{INTRO[p.acres]}</p>

              <dl className="bmh-lh-specs">
                <div><dt>Lot</dt><dd>{p.acres} acres</dd></div>
                <div><dt>Bedrooms</dt><dd>{S.beds}</dd></div>
                <div><dt>Bathrooms</dt><dd>{S.baths}</dd></div>
                <div><dt>Square feet</dt><dd>{S.sqft.toLocaleString('en-US')}</dd></div>
                <div><dt>Home</dt><dd>{S.wideType}</dd></div>
                <div><dt>Sold</dt><dd>Turnkey, with all utilities</dd></div>
              </dl>

              <div className="bmh-lh-price">
                <PriceModeToggle placement="land-home" />
                <div className="bmh-spacer-sm" />
                <PackagePrice price={p.price} monthlyPayment={p.monthlyPayment} variant="detail" />
                <PaymentFootnote disclosure={PACKAGE_PAYMENT_DISCLOSURE} style={{ marginTop: 12 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bmh-surface-card" style={{ padding: '32px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <h2 className="bmh-city-h2">Choose your own home</h2>
            <p className="bmh-lead" style={{ marginTop: 12 }}>
              The package shown has a 4-bed, 2-bath home. You can choose your own home instead.
            </p>
            <div className="bmh-spacer-sm" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <TrackedLink href="/browse" event="land_home_cta" params={{ cta: 'browse_homes', page }} className="bmh-pill bmh-pill-static">
                Browse homes →
              </TrackedLink>
              <TrackedLink href="tel:+18303811309" event="land_home_cta" params={{ cta: 'phone_choose_home', page }} className="bmh-pill bmh-pill-static">
                Call (830) 381-1309
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '40px 0' }}>
        <div className="bmh-container" style={{ textAlign: 'center' }}>
          <h2 className="bmh-city-h2" style={{ maxWidth: 700, margin: '0 auto' }}>
            Talk to us about the {p.acres}-acre package
          </h2>
          <div className="bmh-spacer-lg" />
          <PackageCtas page={page} center />
        </div>
      </section>

      <section style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '32px 0' }}>
        <div className="bmh-container">
          <div className="bmh-city-prose">
            <Link href={FLORESVILLE_PACKAGES_PATH} className="bmh-btn bmh-btn-secondary">
              ← All three Floresville packages
            </Link>
            <div className="bmh-spacer-md" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {others.map((o) => (
                <Link key={o.slug} href={packagePath(o)} className="bmh-pill bmh-pill-static">
                  {packageName(o)} →
                </Link>
              ))}
              <Link href={LAND_HOME_HUB_PATH} className="bmh-pill bmh-pill-static">Land-Home Packages in Texas →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
