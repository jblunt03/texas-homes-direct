import InventoryCard from '@/components/InventoryCard'
import PackagePrice from '@/components/landHome/PackagePrice'
import { type LandHomePackage, packageName, packagePath } from '@/lib/packages'

/**
 * One land-home package as a retail inventory card (components/InventoryCard
 * — the same card as /browse): photo with a "Land-Home Package" badge, an "Example home" tag
 * and, on a render, an "Illustration" badge (validator step 13j); the title; the
 * location label (so packages from any city share one grid); a spec row;
 * the cash/payment price.
 */
export default function PackageCard({ pkg, priority = false }: { pkg: LandHomePackage; priority?: boolean }) {
  const s = pkg.home
  return (
    <InventoryCard
      href={packagePath(pkg)}
      title={packageName(pkg)}
      image={{ src: pkg.image.src, alt: pkg.image.alt }}
      placeholderLabel={packageName(pkg)}
      priority={priority}
      tags={<span className="bmh-listing-badge bmh-inv-card-tag">Land-Home Package</span>}
      mediaExtra={
        <>
          <span className="bmh-example-tag">Example home</span>
          {pkg.image.kind === 'render' && (
            <span className="bmh-lh-illustration-badge bmh-lh-illustration-badge-card" data-lh-badge="">Illustration</span>
          )}
        </>
      }
      sub={
        <>
          <span className="bmh-location-label" data-location-label="">{pkg.locationLabel}</span>
          {' · All utilities'}
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
