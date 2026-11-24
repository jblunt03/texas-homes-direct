/** Existing GA4 measurement ID. Do not add a second tag. */
export const GA_MEASUREMENT_ID = 'G-TEY2WEP5QP'

/** Public business number already printed on the site. */
export const BUSINESS_PHONE = '+18303811309'

export const CHAT_WIDGET_ID = '6a357d115dcabc40b57cbf34'

export const CIRRUS_HOST = 'creditapp.cirrussolutions.com'

export function pageContext(): { page_path: string; page_location: string } {
  const { origin, pathname, search } = window.location
  return {
    page_path: pathname,
    // Query is included only when it has no email or phone. Form bodies never land here.
    page_location: origin + pathname + safeSearch(search),
  }
}

function safeSearch(search: string): string {
  if (!search) return ''
  if (/[@]|tel:|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/i.test(search)) return ''
  return search
}

function clientId(): string {
  const match = document.cookie.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/)
  if (match) return match[1]
  const key = 'thd-ga-cid'
  try {
    const existing = localStorage.getItem(key)
    if (existing) return existing
    const created = `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`
    localStorage.setItem(key, created)
    return created
  } catch {
    return `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`
  }
}

/**
 * Sends one hit to the existing G-TEY2WEP5QP collect endpoint.
 * gtag's dataLayer push was not flushing custom events on some pages
 * (verified on /contact), so the hit is a beacon instead of a second tag.
 */
export function trackEvent(name: string, params: Record<string, string>) {
  try {
    const query = new URLSearchParams({
      v: '2',
      tid: GA_MEASUREMENT_ID,
      cid: clientId(),
      en: name,
      dl: params.page_location || window.location.href,
      dp: params.page_path || window.location.pathname,
    })
    for (const [key, value] of Object.entries(params)) {
      if (key === 'page_path' || key === 'page_location') continue
      query.set(`ep.${key}`, value)
    }
    const url = `https://www.google-analytics.com/g/collect?${query.toString()}`
    if (typeof navigator.sendBeacon === 'function') navigator.sendBeacon(url)
    else fetch(url, { method: 'POST', keepalive: true, mode: 'no-cors' })
  } catch {
    /* analytics must never block the page */
  }
}

export function trackLeadFormSubmit(input: {
  form_id: string
  form_name: string
  lead_type?: string
}) {
  const params: Record<string, string> = {
    form_id: input.form_id,
    form_name: input.form_name,
    ...pageContext(),
  }
  if (input.lead_type) params.lead_type = input.lead_type
  trackEvent('lead_form_submit', params)
}
