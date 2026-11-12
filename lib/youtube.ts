/**
 * YouTube helpers — see CLAUDE.md "Listing videos". A listing stores only
 * the 11-character video ID (`youtubeId`), never a URL or tracking params.
 * scripts/sync-listings.ts mirrors youtubeIdFromUrl() (it can't import lib/).
 */
export const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/

/** youtube.com/shorts/ID, youtu.be/ID, watch?v=ID or embed/ID → ID (query/tracking dropped). */
export function youtubeIdFromUrl(url: string): string | null {
  const m =
    /(?:youtube(?:-nocookie)?\.com\/(?:shorts\/|embed\/|watch\?(?:[^#]*&)?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/.exec(url)
  return m ? m[1] : null
}

/** Privacy-enhanced embed, loaded only after the visitor taps play. */
export function youtubeEmbedSrc(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/shorts/${id}`
}
