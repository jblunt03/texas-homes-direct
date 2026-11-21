import PackageCard from '@/components/landHome/PackageCard'
import PaymentFootnote from '@/components/PaymentFootnote'
import { PACKAGE_PAYMENT_DISCLOSURE } from '@/lib/disclaimers'
import type { LandHomePackage } from '@/lib/packages'

/**
 * The package grid, sized like /browse (wrap the page in .bmh-wide-inventory):
 * 1 column on phones, 2 on tablets, 3 from 961px, enlarged cards from 1280px.
 * /browse goes to 4 columns at 1600px; with 3 or fewer packages this grid
 * stays at 3 (.bmh-inv-grid-max3) and grows when more packages exist.
 * The first row's photos load eagerly, the rest lazily.
 */
export default function PackageGrid({ packages }: { packages: LandHomePackage[] }) {
  const columnsAtWidest = packages.length <= 3 ? 3 : 4
  return (
    <>
      <div className={`bmh-inv-grid${packages.length <= 3 ? ' bmh-inv-grid-max3' : ''}`} data-package-grid="">
        {packages.map((p, i) => (
          <PackageCard key={p.slug} pkg={p} priority={i < columnsAtWidest} />
        ))}
      </div>
      <PaymentFootnote disclosure={PACKAGE_PAYMENT_DISCLOSURE} />
    </>
  )
}
