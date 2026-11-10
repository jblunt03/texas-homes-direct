'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

const WIDGET_ID = 'featurable-163c5a55-bd6d-48aa-8d2f-134ff3b6a26f'

// Tallest rendered height seen for the widget (desktop and 375px, 2026-11-10).
// Lazy mode reserves this much space so the page doesn't shift when it loads.
const RESERVED_HEIGHT = 460

declare global {
  interface Window {
    initializeFeaturableWidget?: (el: Element) => void
  }
}

/**
 * Google reviews widget (Featurable). The bundle renders the widget into the
 * div on its first load, but Next only runs a script once per session, so
 * coming back to a page with the widget through client-side navigation would
 * leave the div empty. onReady fires on every mount, and re-initializes only
 * when the bundle hasn't already filled the div.
 *
 * `lazy` (used below the fold on the homepage): the script isn't requested
 * until the widget is within 600px of the viewport, and the container keeps a
 * fixed minimum height so nothing below it moves when the reviews appear.
 */
export default function FeaturableReviews({ lazy = false }: { lazy?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(!lazy)

  useEffect(() => {
    if (load || !ref.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [load])

  // Featurable re-lays out its cards right after it first renders (measured
  // as a ~0.33 layout shift on 2026-11-10). Lazy mode keeps the widget
  // invisible until its height has held steady for a second, so that
  // internal reflow happens while hidden and never counts as a visible shift.
  const [revealed, setRevealed] = useState(!lazy)
  useEffect(() => {
    if (!lazy || !load || revealed) return
    let last = -1
    let stableTicks = 0
    const tick = setInterval(() => {
      const h = document.getElementById(WIDGET_ID)?.offsetHeight ?? 0
      if (h > 0 && h === last) {
        if (++stableTicks >= 4) setRevealed(true)
      } else {
        stableTicks = 0
        last = h
      }
    }, 250)
    const cap = setTimeout(() => setRevealed(true), 8000)
    return () => {
      clearInterval(tick)
      clearTimeout(cap)
    }
  }, [lazy, load, revealed])

  return (
    <div ref={ref} style={lazy ? { minHeight: RESERVED_HEIGHT } : undefined}>
      <div id={WIDGET_ID} data-featurable-async="" style={revealed ? undefined : { visibility: 'hidden' }} />
      {load && (
        <Script
          src="https://featurable.com/assets/bundle.js"
          strategy="afterInteractive"
          charSet="UTF-8"
          onReady={() => {
            const el = document.getElementById(WIDGET_ID)
            if (el && el.childElementCount === 0) window.initializeFeaturableWidget?.(el)
          }}
        />
      )}
    </div>
  )
}
