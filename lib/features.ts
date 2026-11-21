import flags from './features.json'

/**
 * Feature flags (lib/features.json). Unlike lib/archived.json (sections that
 * existed and were hidden), these gate sections that aren't live yet.
 *
 * "landHomePackages" — the Land-Home Packages section (CLAUDE.md
 * "Land-Home Packages"). While false:
 *   - no "Land-Home Packages" tab in the header (desktop + mobile) or footer
 *   - /land-home-packages, /land-home-packages-floresville-tx and the three
 *     package pages 404 (each page calls notFound())
 *   - nothing in the sitemap or llms.txt
 * Turn it on only for local review until the owner says to ship it.
 * validate_batch.py checks both states (steps 13a–13h).
 */
export const LAND_HOME_PACKAGES: boolean = flags.landHomePackages === true
