import type { CSSProperties } from 'react'
import { PAYMENT_DISCLOSURE, type PaymentDisclosure } from '@/lib/disclaimers'

/**
 * The full estimated-payment disclosure as visible text, so it's never only
 * behind a click. Rendered under every card grid that can show a monthly
 * payment, and under the payment on a listing page.
 *
 * It's payment-mode only (CLAUDE.md "Cash price"): always in the HTML, shown
 * by CSS only while <html data-price-mode="payment">, i.e. only when a
 * payment is actually on screen.
 */
export default function PaymentFootnote({
  style,
  disclosure = PAYMENT_DISCLOSURE,
}: {
  style?: CSSProperties
  /** Land-Home Packages pass PACKAGE_PAYMENT_DISCLOSURE; homes use the default. */
  disclosure?: PaymentDisclosure
}) {
  return (
    <p className="bmh-pay-footnote bmh-pm-pay-block" data-pm="pay" style={style}>
      <strong>{disclosure.title}:</strong> {disclosure.body}
    </p>
  )
}

/** True when a card can show a monthly payment (in payment mode). */
export function showsMonthlyPayment(listing: { monthlyPayment: number }): boolean {
  return listing.monthlyPayment > 0
}
