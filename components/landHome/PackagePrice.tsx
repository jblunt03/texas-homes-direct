import PaymentEstimate from '@/components/PaymentEstimate'
import { formatCash } from '@/components/ListingPrice'
import { PACKAGE_PAYMENT_DISCLOSURE } from '@/lib/disclaimers'

/**
 * A land-home package's price in both modes, on the same switch and the same
 * two-line box as the homes (components/ListingPrice.tsx), so it follows the
 * visitor's saved cash/payment choice with no layout shift. Cash (the
 * default): "Cash price $249,000". Payment: "$2,200/mo est. (i)" with the
 * package disclosure (lib/disclaimers.ts PACKAGE_PAYMENT_DISCLOSURE). No
 * "with insurance" line — what the estimate includes is unknown.
 */
export default function PackagePrice({
  price,
  monthlyPayment,
  variant = 'card',
}: {
  price: number
  monthlyPayment: number
  variant?: 'card' | 'detail'
}) {
  const detail = variant === 'detail'
  return (
    <span className={`bmh-price bmh-price-${variant}`}>
      <span className="bmh-price-mode bmh-pm-cash" data-pm="cash">
        {detail && <span className="bmh-price-label bmh-price-label-top">Cash price</span>}
        <span className="bmh-price-figure">{formatCash(price)}</span>
        {detail ? (
          <span className="bmh-price-label" aria-hidden="true">&nbsp;</span>
        ) : (
          <span className="bmh-price-label">Cash price</span>
        )}
      </span>
      <span className="bmh-price-mode bmh-pm-pay" data-pm="pay">
        {detail && <span className="bmh-price-label bmh-price-label-top">Est. monthly payment</span>}
        <span className="bmh-price-figure">
          <PaymentEstimate amount={monthlyPayment} disclosure={PACKAGE_PAYMENT_DISCLOSURE} />
        </span>
        {detail ? (
          <span className="bmh-price-label" aria-hidden="true">&nbsp;</span>
        ) : (
          <span className="bmh-price-label">Est. monthly payment</span>
        )}
      </span>
    </span>
  )
}
