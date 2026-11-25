/**
 * Land-Home Packages (CLAUDE.md "Land-Home Packages"). Behind the
 * "landHomePackages" flag in lib/features.json.
 *
 * These are NOT listings: they're not in lib/sampleListings.ts, /browse or
 * the homes' filters, and nothing here is read from a listing at runtime.
 *
 * Use only the owner's facts. Unknown — never state or infer anywhere on the
 * package pages: builder, model, manufacturer or HUD status; what "all
 * utilities" covers beyond "all utilities connected to the house"; what the monthly estimate
 * includes or assumes; what changes if the buyer chooses a different home;
 * which homes fit which lot; addresses, dimensions or lot features beyond the owner's
 * facts below; financing
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

export interface PackageImage {
  src: string
  width: number
  height: number
  alt: string
  /** 'render': an illustration of an example home on the lot (a package's
   *  head image). Always shows a visible "Illustration" badge, on cards too,
   *  and on the package page RENDER_CAPTION directly beneath it.
   *  'interior' / 'floorplan': an example home's photo or the example floor
   *  plan, captioned EXAMPLE_PHOTO_CAPTION. Never shown larger than its
   *  natural size. */
  kind: 'render' | 'interior' | 'floorplan'
}

/**
 * Example images (owner, 2026-11-24). Copies under neutral names in
 * public/land-home/: no filename, alt text or caption may name a home or
 * manufacturer, and land-home pages never link to the homes they came from
 * (validator steps 13g and 13j). Every file is at most 800KB.
 *
 * Renders: the owner's illustrations (originals 2752x1536, copied at 2000px
 * wide, JPEG at the highest quality under 800KB; never cropped or retouched).
 * NOT CLEARED TO SHIP: the owner is checking the image rights.
 */
const RENDER_1: PackageImage = { src: '/land-home/example-render-1.jpg', width: 2000, height: 1116, alt: 'Illustration of an example home on the lot', kind: 'render' }
const RENDER_2: PackageImage = { src: '/land-home/example-render-2.jpg', width: 2000, height: 1116, alt: 'Illustration of an example home on the lot', kind: 'render' }
const RENDER_3: PackageImage = { src: '/land-home/example-render-3.jpg', width: 2000, height: 1116, alt: 'Illustration of an example home on the lot', kind: 'render' }

/** Interiors from three example homes, three each (living room, kitchen,
 *  primary bedroom or bath), in the owner's order. At least 900px wide. */
export const EXAMPLE_INTERIORS: PackageImage[] = [
  { src: '/land-home/example-interior-1.jpg', width: 961, height: 645, alt: 'Example home living room', kind: 'interior' },
  { src: '/land-home/example-interior-2.jpg', width: 964, height: 645, alt: 'Example home kitchen', kind: 'interior' },
  { src: '/land-home/example-interior-3.jpg', width: 962, height: 644, alt: 'Example home primary bedroom', kind: 'interior' },
  { src: '/land-home/example-interior-4.jpg', width: 2560, height: 1920, alt: 'Example home living room', kind: 'interior' },
  { src: '/land-home/example-interior-5.jpg', width: 2560, height: 1920, alt: 'Example home kitchen', kind: 'interior' },
  { src: '/land-home/example-interior-6.jpg', width: 2560, height: 1920, alt: 'Example home primary bathroom', kind: 'interior' },
  { src: '/land-home/example-interior-7.jpg', width: 1084, height: 1451, alt: 'Example home living room', kind: 'interior' },
  { src: '/land-home/example-interior-8.jpg', width: 1086, height: 1448, alt: 'Example home kitchen', kind: 'interior' },
  { src: '/land-home/example-interior-9.jpg', width: 1084, height: 1451, alt: 'Example home primary bedroom', kind: 'interior' },
]

/** The one floor plan: a 4 bed, 2 bath example (matches the package's home). */
export const EXAMPLE_FLOOR_PLAN: PackageImage = { src: '/land-home/example-floor-plan-4-bed-2-bath.png', width: 1548, height: 772, alt: 'Example floor plan, 4 bed, 2 bath', kind: 'floorplan' }

/** Caption under each render on the package page. */
export const RENDER_CAPTION = 'Illustration. Home shown is an example. Not the actual property.'

/** Caption under every interior and the floor plan, wherever they render. */
export const EXAMPLE_PHOTO_CAPTION = 'Example homes shown. You can choose your own home.'

export interface AerialImage {
  src: string
  width: number
  height: number
  alt: string
  /** 'empty': the parcels alone, with the disclaimer baked into the image.
   *  Always shown uncropped (object-fit: contain), full width, with nothing
   *  overlaid, and AERIAL_EMPTY_CAPTION directly beneath it.
   *  'homes': the parcels with example homes. Always shown with a visible
   *  "Illustration" badge and AERIAL_HOMES_CAPTION directly beneath it. */
  kind: 'empty' | 'homes'
}

export const AERIAL_ALT = 'Aerial illustration of the three Floresville parcels'

/** The owner's file, unedited (native 1024x572; exempt from the 1,200px minimum). */
export const AERIAL_EMPTY: AerialImage = { src: '/land-home/parcels-aerial-empty.jpg', width: 1024, height: 572, alt: AERIAL_ALT, kind: 'empty' }
/** The owner's file re-encoded as JPEG q82 at the same 1672x941 (from a 3.7MB PNG). */
export const AERIAL_HOMES: AerialImage = { src: '/land-home/parcels-aerial-homes.jpg', width: 1672, height: 941, alt: AERIAL_ALT, kind: 'homes' }

export const AERIAL_EMPTY_CAPTION =
  'Illustration only. Not a survey. All boundaries, dimensions and acreages are approximate and for illustrative purposes only. Not to be used as a legal survey. Buyers must independently verify all information.'
export const AERIAL_HOMES_CAPTION =
  'Illustration. Homes shown are examples. Boundaries and acreages are approximate. Not a survey.'

/**
 * Owner's facts for a lot's description (owner, 2026-11-24). Shared by the
 * Floresville lots; a lot that differs overrides just that value, e.g.
 * `facts: { ...FLORESVILLE_FACTS, road: 'FM 123' }`.
 * `road` is a road name only: it appears in the visible description on the
 * land-home pages and nowhere else (no title, meta, schema, alt text or
 * llms.txt; validator step 13j). Add no house number, coordinates or map.
 */
export interface LotFacts {
  lead: string
  road: string
  /** Approximate drive times, shown as a list. */
  location: string[]
  /** Verified school line. Must name the rating's year and the Texas Education Agency. */
  school: string
}

/**
 * Floresville ISD: B (overall 81) in TEA's 2026 accountability ratings,
 * verified 2026-11-23 at
 * https://rptsvr1.tea.texas.gov/cgi/sas/broker?_service=marykay&_program=perfrept.perfmast.sas&_debug=0&ccyy=2026&lev=D&id=247901&prgopt=reports/acct/summary.sas
 * (2023–2025 were C, so the year must stay with the grade).
 */
export const SCHOOL_RATING_YEAR = 2026

export const FLORESVILLE_FACTS: LotFacts = {
  lead: 'Quiet country living without being far from town.',
  road: 'FM 536',
  location: [
    'About 7 minutes from downtown Floresville',
    'About 10 minutes from H-E-B',
    'About 10 minutes from Floresville High School',
    'About 39 minutes to downtown San Antonio and San Antonio International Airport',
  ],
  school: `Floresville ISD, a great school district rated B by the Texas Education Agency (${SCHOOL_RATING_YEAR})`,
}

/** The home in the description's sentence and included list. */
export const PACKAGE_HOME_LINE = 'brand new 4 bed, 2 bath double wide'

/** What's included, in the owner's order and words. Nothing else. */
export function includedItems(acres: string): string[] {
  return [
    'Brand new 4 bed, 2 bath home',
    `${acres} acres of land`,
    'Gravel driveway and parking pad',
    'Skirting installed',
    'Front porch',
    'All utilities connected to the house',
    'Move-in ready',
  ]
}

export interface LandHomePackage {
  /** Frozen once live — never change. When the acreage changed on
   *  2026-11-24, new slugs were added and the old ones moved to
   *  `legacySlugs`. */
  slug: string
  /** Old slugs that 308-redirect straight to `slug` (next.config.mjs reads
   *  them from this file). Nothing on the site links to them. */
  legacySlugs?: string[]
  /** City the lot is in. A package in another city joins the same grids
   *  just by adding it here with its own city, label and city-page path. */
  city: string
  /** Shown on cards, e.g. "Floresville, TX". */
  locationLabel: string
  /** The city's land-home page. */
  locationPath: string
  /** Display form of the acreage, exactly as the owner gave it ("1.20"). */
  acres: string
  price: number
  monthlyPayment: number
  /** The head image (a render): the first gallery image, and the photo on cards. */
  image: PackageImage
  facts: LotFacts
}

/** In the owner's order. */
export const PACKAGES: LandHomePackage[] = [
  {
    slug: 'floresville-texas-4-bed-2-bath-1-20-acres-land-home-package',
    legacySlugs: ['floresville-texas-4-bed-2-bath-1-3-acres-land-home-package'],
    city: 'Floresville', locationLabel: 'Floresville, TX', locationPath: FLORESVILLE_PACKAGES_PATH,
    acres: '1.20', price: 249000, monthlyPayment: 2200, image: RENDER_1, facts: FLORESVILLE_FACTS,
  },
  {
    slug: 'floresville-texas-4-bed-2-bath-1-05-acres-land-home-package',
    legacySlugs: ['floresville-texas-4-bed-2-bath-1-2-acres-land-home-package'],
    city: 'Floresville', locationLabel: 'Floresville, TX', locationPath: FLORESVILLE_PACKAGES_PATH,
    acres: '1.05', price: 229000, monthlyPayment: 2000, image: RENDER_2, facts: FLORESVILLE_FACTS,
  },
  {
    slug: 'floresville-texas-4-bed-2-bath-0-75-acres-land-home-package',
    city: 'Floresville', locationLabel: 'Floresville, TX', locationPath: FLORESVILLE_PACKAGES_PATH,
    acres: '0.75', price: 219000, monthlyPayment: 2000, image: RENDER_3, facts: FLORESVILLE_FACTS,
  },
]

/** A package page's gallery (owner's order, at most 13): its render, the two
 *  aerials, the example interiors, then the floor plan last. */
export function packageGallery(p: LandHomePackage): (PackageImage | AerialImage)[] {
  return [p.image, AERIAL_EMPTY, AERIAL_HOMES, ...EXAMPLE_INTERIORS, EXAMPLE_FLOOR_PLAN]
}

/** Packages in one city, in PACKAGES order. */
export function packagesIn(city: string): LandHomePackage[] {
  return PACKAGES.filter((p) => p.city === city)
}

export function packagePath(p: LandHomePackage): string {
  return `${LAND_HOME_HUB_PATH}/${p.slug}`
}

export function packageName(p: LandHomePackage): string {
  return `${p.city} Land-Home Package: ${p.acres} Acres`
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
