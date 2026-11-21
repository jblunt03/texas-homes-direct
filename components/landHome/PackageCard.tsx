import InventoryCard from '@/components/InventoryCard'
import PackagePrice from '@/components/landHome/PackagePrice'
import { type LandHomePackage, PACKAGE_HOME_SPECS, packageName, packagePath } from '@/lib/packages'

/**
 * One land-home package as a retail inventory card (components/InventoryCard
 * — the same card as /browse): photo with a "Land-Home Package" badge and,
 * while the photo is a stand-in, an "Example home" tag; the title; the
 * location label (so packages from any city share one grid); a spec row;
 * the cash/payment price.
 */
export default function PackageCard({ pkg, priority = false }: { pkg: LandHomePackage; priority?: boolean }) {
  const s = PACKAGE_HOME_SPECS
  return (
    <InventoryCard
      href={packagePath(pkg)}
      title={packageName(pkg)}
      image={{ src: pkg.image.src, alt: pkg.image.alt }}
      placeholderLabel={packageName(pkg)}
      priority={priority}
      tags={<span className="bmh-listing-badge bmh-inv-card-tag">Land-Home Package</span>}
      mediaExtra={pkg.image.example ? <span className="bmh-example-tag">Example home</span> : null}
      sub={
        <>
          <span className="bmh-location-label" data-location-label="">{pkg.locationLabel}</span>
          {' · Turnkey · All utilities'}
        </>
      }
      specs={[
        { value: s.beds, label: 'bd' },
        { value: s.baths, label: 'ba' },
        { value: s.sqft.toLocaleString('en-US'), label: 'sqft' },
        { label: s.wideType },
        { value: pkg.acres, label: 'acres' },
      ]}
      price={<PackagePrice price={pkg.price} monthlyPayment={pkg.monthlyPayment} />}
      cardAttrs={{ 'data-package-card': '' }}
    />
  )
}
