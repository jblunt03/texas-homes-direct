/**
 * Google Business Profile Place ID for the write-a-review link.
 * Leave the constant empty until the owner supplies the ID.
 * NEXT_PUBLIC_GBP_PLACE_ID overrides it when set at build time.
 * An empty ID must not render a review button or a review URL.
 */
export const GBP_PLACE_ID_CONSTANT = ''

export function gbpPlaceId(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_GBP_PLACE_ID ?? '').trim()
  if (fromEnv) return fromEnv
  return GBP_PLACE_ID_CONSTANT.trim()
}

export function googleReviewUrl(): string | null {
  const id = gbpPlaceId()
  if (!id) return null
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id)}`
}
