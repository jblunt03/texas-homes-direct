import flags from './archived.json'

/**
 * Archived sections of the site. The on/off switches live in
 * lib/archived.json (one boolean per section) because next.config.mjs reads
 * the same file to add the redirect, and it can't import TypeScript.
 *
 * While a section is archived (true):
 *   - its links are hidden from the header nav (desktop + mobile), the footer
 *     and the sitemap
 *   - its route temporarily redirects (307) to the homepage
 *   - its page, components and content stay in the repo untouched
 * Set it to false and redeploy to restore everything.
 * validate_batch.py fails if an archived route still appears in the nav,
 * footer, sitemap or llms.txt. See CLAUDE.md "Archived sections".
 */
export const ARCHIVED_ROUTES = {
  commercial: '/commercial',
} as const satisfies Partial<Record<keyof typeof flags, string>>

/**
 * Listing videos (YouTube Shorts) — a feature flag, not a route, so it has no
 * entry in ARCHIVED_ROUTES and no redirect. While "videos" is true:
 *   - no Video chip on any card and no player on listing pages; the video
 *     component is only loaded through next/dynamic, so its code isn't fetched
 *   - no VideoObject schema, and listings reach pages without `youtubeId`
 *     (lib/notion.ts), so no YouTube URL or ID is in the HTML
 * The code, the youtubeId data, lib/youtube.ts, lib/videoMeta.ts and the
 * sync's "YouTube URL" reading all stay. Restore with "videos": false.
 * See CLAUDE.md "Listing videos".
 */
export const VIDEOS_ARCHIVED: boolean = flags.videos === true

export function isArchivedPath(href: string): boolean {
  return (Object.keys(ARCHIVED_ROUTES) as (keyof typeof ARCHIVED_ROUTES)[]).some(
    (key) => flags[key] && (href === ARCHIVED_ROUTES[key] || href.startsWith(`${ARCHIVED_ROUTES[key]}/`))
  )
}
