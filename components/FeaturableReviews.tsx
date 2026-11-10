'use client'

import Script from 'next/script'

const WIDGET_ID = 'featurable-163c5a55-bd6d-48aa-8d2f-134ff3b6a26f'

declare global {
  interface Window {
    initializeFeaturableWidget?: (el: Element) => void
  }
}

/**
 * Google reviews widget (Featurable). The bundle renders the widget into the
 * div on its first load, but Next only runs a script once per session, so
 * coming back to /testimonials through client-side navigation would leave the
 * div empty. onReady fires on every mount, and re-initializes only when the
 * bundle hasn't already filled the div.
 */
export default function FeaturableReviews() {
  return (
    <>
      <div id={WIDGET_ID} data-featurable-async="" />
      <Script
        src="https://featurable.com/assets/bundle.js"
        strategy="afterInteractive"
        charSet="UTF-8"
        onReady={() => {
          const el = document.getElementById(WIDGET_ID)
          if (el && el.childElementCount === 0) window.initializeFeaturableWidget?.(el)
        }}
      />
    </>
  )
}
