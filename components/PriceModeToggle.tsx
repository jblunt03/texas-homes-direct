'use client'

import { useId } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { setPriceMode, usePriceMode } from '@/lib/priceModeClient'
import type { PriceMode } from '@/lib/priceMode'

/**
 * "Cash price | Est. monthly payment" — a segmented control built from a
 * native radio group, so arrow keys, Space and screen readers work as a
 * radio group with no extra code. Shown only on /browse and listing pages
 * (CLAUDE.md "Cash price"); every price on the site follows the choice.
 *
 * The selected segment is styled from <html data-price-mode>, not from React
 * state, so it's right on first paint even before hydration.
 */
const OPTIONS: { value: PriceMode; label: string }[] = [
  { value: 'cash', label: 'Cash price' },
  { value: 'payment', label: 'Est. monthly payment' },
]

export default function PriceModeToggle({ placement }: { placement: 'browse' | 'listing' | 'land-home' }) {
  const mode = usePriceMode()
  const name = useId()

  return (
    <div className="bmh-pm-toggle" role="radiogroup" aria-label="Show prices as">
      {OPTIONS.map((o) => (
        <label key={o.value} className="bmh-pm-opt" data-pm-opt={o.value}>
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={mode === o.value}
            onChange={() => {
              if (mode === o.value) return
              setPriceMode(o.value)
              try {
                sendGAEvent('event', 'price_view_mode', { mode: o.value, placement })
              } catch {
                /* analytics must never block the toggle */
              }
            }}
          />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  )
}
