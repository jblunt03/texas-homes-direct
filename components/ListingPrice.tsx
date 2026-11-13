import PaymentEstimate from '@/components/PaymentEstimate'

/**
 * A home's price, in both display modes — see CLAUDE.md "Cash price".
 *
 * Both versions are in the server HTML; CSS shows one, keyed on
 * <html data-price-mode> (set before first paint from the visitor's saved
 * choice). With no saved choice the cash price shows, so crawlers and
 * first-time visitors see the real price. Both versions use the same two-line
 * box (figure, then label) so switching modes never moves the card.
 *
 * cashOnly: render the cash price and nothing else (/tiny-homes, where
 * financing for park models hasn't been confirmed).
 *
 * No hooks here, so server components (city pages, the homepage) can use it.
 */
export const PAYMENT_AVERAGE_LINE = 'Average estimate, with insurance'

export function formatCash(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

export default function ListingPrice({
  price,
  monthlyPayment,
  variant = 'card',
  cashOnly = false,
}: {
  price: number
  monthlyPayment: number
  variant?: 'card' | 'detail'
  cashOnly?: boolean
}) {
  const cash = (
    <span className={cashOnly ? 'bmh-price-mode bmh-pm-cash-fixed' : 'bmh-price-mode bmh-pm-cash'} data-pm="cash">
      {variant === 'detail' && <span className="bmh-price-label bmh-price-label-top">Cash price</span>}
      <span className="bmh-price-figure">{formatCash(price)}</span>
      {variant === 'card' ? (
        <span className="bmh-price-label">Cash price</span>
      ) : (
        !cashOnly && <span className="bmh-price-label" aria-hidden="true">&nbsp;</span>
      )}
    </span>
  )
  if (cashOnly) return <span className={`bmh-price bmh-price-${variant}`}>{cash}</span>

  return (
    <span className={`bmh-price bmh-price-${variant}`}>
      {cash}
      <span className="bmh-price-mode bmh-pm-pay" data-pm="pay">
        {variant === 'detail' && <span className="bmh-price-label bmh-price-label-top">Est. monthly payment</span>}
        {monthlyPayment > 0 ? (
          <>
            <span className="bmh-price-figure">
              <PaymentEstimate amount={monthlyPayment} />
            </span>
            <span className="bmh-price-label">{PAYMENT_AVERAGE_LINE}</span>
          </>
        ) : (
          <>
            <span className="bmh-price-figure">
              <span className="bmh-price-request">Payment on request</span>
            </span>
            <span className="bmh-price-label" aria-hidden="true">&nbsp;</span>
          </>
        )}
      </span>
    </span>
  )
}
