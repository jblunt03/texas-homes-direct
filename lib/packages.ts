/**
 * Land-Home Packages (CLAUDE.md "Land-Home Packages"). Behind the
 * "landHomePackages" flag in lib/features.json.
 *
 * These are NOT listings: they're not in lib/sampleListings.ts, /browse or
 * the homes' filters, and nothing here is read from a listing at runtime.
 *
 * Use only the owner's facts. Unknown — never state or infer anywhere on the
 * package pages: builder, model, manufacturer or HUD status; what "turnkey"
 * or "all utilities" covers beyond those words; what the monthly estimate
 * includes or assumes; what changes if the buyer chooses a different home;
 * which homes fit which lot; addresses, dimensions or lot features; financing
 * types; delivery or move-in timing; county facts.
 */

/**
 * The home shown in every package. FIXED VALUES copied on 2026-11-21 from
 * The Austin (BMH-93) in lib/sampleListings.ts: beds 4, baths 2, sqft 1493,
 * wideType 'Double Wide'. Deliberately NOT imported from that listing, so
 * later edits to it can't change the packages. Its name, price, payment,
 * photos, tour, features, description, year and manufacturer are not used,
 * and package pages never name or link to it.
 */
export const PACKAGE_HOME_SPECS = {
  beds: 4,
  baths: 2,
  sqft: 1493,
  wideType: 'Double Wide',
} as const

export const LAND_HOME_HUB_PATH = '/land-home-packages'
export const FLORESVILLE_PACKAGES_PATH = '/land-home-packages-floresville-tx'

export interface LandHomePackage {
  /** Frozen once live — never change. */
  slug: string
  /** Display form of the acreage, exactly as the owner gave it. */
  acres: string
  price: number
  monthlyPayment: number
}

/** In the owner's order. */
export const PACKAGES: LandHomePackage[] = [
  { slug: 'floresville-texas-4-bed-2-bath-1-3-acres-land-home-package', acres: '1.3', price: 249000, monthlyPayment: 2200 },
  { slug: 'floresville-texas-4-bed-2-bath-1-2-acres-land-home-package', acres: '1.2', price: 229000, monthlyPayment: 2000 },
  { slug: 'floresville-texas-4-bed-2-bath-0-75-acres-land-home-package', acres: '0.75', price: 219000, monthlyPayment: 2000 },
]

export function packagePath(p: LandHomePackage): string {
  return `${LAND_HOME_HUB_PATH}/${p.slug}`
}

export function packageName(p: LandHomePackage): string {
  return `Floresville Land-Home Package: ${p.acres} Acres`
}

export function packageSpecLine(): string {
  const s = PACKAGE_HOME_SPECS
  return `${s.beds} bed · ${s.baths} bath · ${s.sqft.toLocaleString('en-US')} sq ft · ${s.wideType.toLowerCase()}`
}

export function findPackage(slug: string): LandHomePackage | undefined {
  return PACKAGES.find((p) => p.slug === slug)
}

export const SITE_URL = 'https://www.texashomesdirect.com'
export const LAND_HOME_DATE_MODIFIED = '2026-11-21'

/**
 * Replaces the layout's site-wide keywords on Land-Home pages (those name
 * product types these pages must not use).
 */
export const LAND_HOME_KEYWORDS = ['land and home packages Texas', 'land-home packages', 'Floresville land and home packages']
