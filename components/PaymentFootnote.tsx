import type { CSSProperties } from 'react'
import { PAYMENT_DISCLOSURE } from '@/lib/disclaimers'

/**
 * The full estimated-payment disclosure as visible text, so it's never only
 * behind a click. Shown once under every card grid that contains a monthly
 * payment, and directly under the payment on a listing page.
 */
export default function PaymentFootnote({ style }: { style?: CSSProperties }) {
  return (
    <p className="bmh-pay-footnote" style={style}>
      <strong>{PAYMENT_DISCLOSURE.title}:</strong> {PAYMENT_DISCLOSURE.body}
    </p>
  )
}

/** True when a card shows a monthly payment rather than a list price or "Call for price". */
export function showsMonthlyPayment(listing: { price: number; monthlyPayment: number }): boolean {
  return !(listing.price > 0) && listing.monthlyPayment > 0
}
