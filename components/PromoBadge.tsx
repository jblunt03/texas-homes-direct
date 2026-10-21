'use client'
import { useEffect, useState, type CSSProperties } from 'react'
import { PROMO, isPromoActive } from '@/lib/promo'

/**
 * The promo label for a listing in PROMO.slugs. `activeAtRender` is the
 * server's answer at build/revalidate time (so the badge is in the HTML with
 * no layout shift); the client then re-checks its own clock on mount and every
 * minute, so the badge disappears at PROMO.endsAt without a redeploy.
 */
export default function PromoBadge({
  activeAtRender,
  style,
}: {
  activeAtRender: boolean
  style?: CSSProperties
}) {
  const [active, setActive] = useState(activeAtRender)

  useEffect(() => {
    const check = () => setActive(isPromoActive(Date.now()))
    check()
    const timer = setInterval(check, 60_000)
    document.addEventListener('visibilitychange', check)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', check)
    }
  }, [])

  if (!active) return null
  return (
    <span className="bmh-promo-badge" style={style}>
      {PROMO.label}
    </span>
  )
}
