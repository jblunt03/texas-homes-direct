/**
 * What's included with a home's price depends on the price mode
 * (CLAUDE.md "What's included by price mode"):
 *   - payment mode: everything in the listing's `features` list, including
 *     delivery and setup (they're part of the estimated monthly payment)
 *   - cash mode (the default): the same list minus delivery and setup, which
 *     are quoted separately from the cash price
 *
 * The stored `features` data is never changed; only what shows in cash mode.
 * validate_batch.py step 11h uses the same wording rule.
 */
export const CASH_EXCLUDED_RE = /\bdeliver(y|ed|ies)?\b|\bset[\s-]?up\b|\bturnkey\b/i

/** True for a features item that only belongs to the payment-mode list (Delivery, Setup, …). */
export function isDeliveryOrSetup(item: string): boolean {
  return CASH_EXCLUDED_RE.test(item)
}

export const INCLUDED_HEADING = {
  cash: 'Included in the cash price',
  payment: 'Included in the estimated monthly payment',
} as const

/** Owner's addition (2026-11-18): shown under the list in cash mode only. */
export const CASH_DELIVERY_NOTE = 'Delivery and setup are quoted separately.'
