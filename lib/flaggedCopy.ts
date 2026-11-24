/**
 * Financing sentences Justin still has to approve are rendered as normal
 * text, with an HTML comment immediately before each one. FAQPage JSON-LD
 * uses the plain sentence, without the comment.
 */
export const WORDING_CHECK_COMMENT = "<!-- NEEDS JUSTIN'S WORDING CHECK -->"

export const CREDIT_DOWN =
  'Buyers with 680+ credit may qualify for 0 down; in the mid-500s, the down payment is about 5%.'

/** Confirmed fact: land can stand in for a down payment. No trailing period, so it can finish a longer sentence. */
export const LAND_STANDS_IN = 'Land you already own can stand in for a down payment'

export const LAND_DOWN = `${LAND_STANDS_IN}.`

export const DELIVERY_TIMING = 'In Texas, delivery and setup usually take 1–2 days.'

export const DELIVERY_ANSWER =
  'Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew. Delivery is priced per mile. We do not publish a per-mile rate. ' +
  DELIVERY_TIMING

export const ANALYSIS_CTA =
  'Start it on the free mortgage analysis page, or call (830) 381-1309.'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const LINKS: { label: string; href: string }[] = [
  { label: 'land-home packages in Floresville', href: '/land-home-packages-floresville-tx' },
  { label: 'Floresville land-home packages', href: '/land-home-packages-floresville-tx' },
  { label: 'free mortgage analysis', href: '/calculator' },
]

export function faqAnswerHtml(plain: string, flagged: string[]): string {
  let html = escapeHtml(plain)
  const ordered = [...flagged].sort((a, b) => b.length - a.length)
  for (const sentence of ordered) {
    const escaped = escapeHtml(sentence)
    if (!html.includes(escaped)) continue
    html = html.replace(escaped, `${WORDING_CHECK_COMMENT}${escaped}`)
  }
  for (const link of LINKS) {
    const escaped = escapeHtml(link.label)
    html = html.replace(
      escaped,
      `<a href="${link.href}" style="color:var(--color-primary);font-weight:500">${escaped}</a>`,
    )
  }
  html = html.replace(
    escapeHtml('(830) 381-1309'),
    '<a href="tel:+18303811309" style="color:var(--color-primary);font-weight:500">(830) 381-1309</a>',
  )
  return html
}

export function withFaqHtml<T extends { q: string; a: string; flagged?: string[] }>(items: T[]) {
  return items.map((item) => ({
    q: item.q,
    a: item.a,
    html: item.flagged && item.flagged.length ? faqAnswerHtml(item.a, item.flagged) : undefined,
  }))
}
