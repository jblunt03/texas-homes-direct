import Link from 'next/link'
import PhotosComingSoon from '@/components/landHome/PhotosComingSoon'
import PackagePrice from '@/components/landHome/PackagePrice'
import { type LandHomePackage, packageName, packagePath, packageSpecLine } from '@/lib/packages'

/** Card for one package (stretched title link, like the homes' cards, so the (i) button isn't inside <a>). */
export default function PackageCard({ pkg }: { pkg: LandHomePackage }) {
  return (
    <div className="bmh-inv-card bmh-inv-card-stretch" data-package-card="">
      <div className="bmh-inv-card-media">
        <PhotosComingSoon compact />
      </div>
      <div className="bmh-inv-card-body">
        <h3 className="bmh-inv-card-title bmh-listing-card-title">
          <Link href={packagePath(pkg)} className="bmh-card-link">
            {packageName(pkg)}
          </Link>
        </h3>
        <p className="bmh-inv-card-sub">{pkg.acres} acres · turnkey · all utilities</p>
        <p className="bmh-inv-card-sub" style={{ marginTop: 4 }}>Home shown: {packageSpecLine()}</p>
        <div className="bmh-inv-card-footer">
          <span className="bmh-inv-card-price">
            <PackagePrice price={pkg.price} monthlyPayment={pkg.monthlyPayment} />
          </span>
          <span className="bmh-inv-card-link">View →</span>
        </div>
      </div>
    </div>
  )
}
