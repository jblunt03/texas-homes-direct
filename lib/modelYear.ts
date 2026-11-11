/**
 * The model year every listing shows (see CLAUDE.md "Model year"). Used as
 * the fallback when Notion's "Year Built" is blank — it's blank on every
 * Notion page as of 2026-11-11 — instead of the calendar year, which would
 * have stamped new listings 2026. scripts/sync-listings.ts mirrors this value
 * (it runs under plain Node and can't import from lib/); keep them in step.
 */
export const MODEL_YEAR = 2027
