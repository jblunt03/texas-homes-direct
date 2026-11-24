import { sendGAEvent } from '@next/third-parties/google'

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

export function trackEvent(name: string, params: Record<string, string>) {
  try {
    sendGAEvent('event', name, params)
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
