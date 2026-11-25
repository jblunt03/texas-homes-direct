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
 * Each package's home (owner, 2026-11-25). FIXED VALUES copied on 2026-11-25
 * from lib/sampleListings.ts and the Notion rows (matched by name and Notion
 * Listing ID). Deliberately NOT imported from the listings, so later edits to
 * them can't change the packages. The homes' names, prices, payments, tours,
 * features, descriptions, years and manufacturers are not used, and land-home
 * pages never name or link to them.
 *   0.75 ac: The Austin (BMH-93)  4 bed, 2 bath, 1,493 sq ft, Double Wide, new
 *   1.05 ac: The Sealy (BMH-19)   3 bed, 2 bath, 1,680 sq ft, Double Wide, new
 *   1.20 ac: The San Saba (BMH-21) 4 bed, 2 bath, 2,280 sq ft, Double Wide, new
 */
const HOME_0_75: PackageHome = { beds: 4, baths: 2, sqft: 1493, wideType: 'Double Wide' }
const HOME_1_05: PackageHome = { beds: 3, baths: 2, sqft: 1680, wideType: 'Double Wide' }
const HOME_1_20: PackageHome = { beds: 4, baths: 2, sqft: 2280, wideType: 'Double Wide' }

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

/**
 * Each package's own home's interiors (living room, kitchen, primary bath or
 * bedroom; at least 900px wide) and its floor plan, under neutral per-lot
 * filenames (lot-<acres>-…). A package page shows only its own files
 * (validator step 13j checks the lot prefix). Floor plans are untouched copies,
 * except 1.20 ac: a copy cropped to the main plan, without the option insets
 * printed below it (original untouched).
 */
const LOT_0_75_INTERIORS: PackageImage[] = [
  { src: '/land-home/lot-0-75-interior-1.jpg', width: 961, height: 645, alt: 'Example home living room', kind: 'interior' },
  { src: '/land-home/lot-0-75-interior-2.jpg', width: 964, height: 645, alt: 'Example home kitchen', kind: 'interior' },
  { src: '/land-home/lot-0-75-interior-3.jpg', width: 962, height: 644, alt: 'Example home primary bedroom', kind: 'interior' },
]
const LOT_0_75_FLOOR_PLAN: PackageImage = { src: '/land-home/lot-0-75-floor-plan.png', width: 1548, height: 772, alt: 'Example floor plan, 4 bed, 2 bath', kind: 'floorplan' }
const LOT_1_05_INTERIORS: PackageImage[] = [
  { src: '/land-home/lot-1-05-interior-1.jpg', width: 2560, height: 1707, alt: 'Example home living room', kind: 'interior' },
  { src: '/land-home/lot-1-05-interior-2.jpg', width: 2560, height: 1707, alt: 'Example home kitchen', kind: 'interior' },
  { src: '/land-home/lot-1-05-interior-3.jpg', width: 2560, height: 1707, alt: 'Example home primary bathroom', kind: 'interior' },
]
const LOT_1_05_FLOOR_PLAN: PackageImage = { src: '/land-home/lot-1-05-floor-plan.jpg', width: 2560, height: 1513, alt: 'Example floor plan, 3 bed, 2 bath', kind: 'floorplan' }
const LOT_1_20_INTERIORS: PackageImage[] = [
  { src: '/land-home/lot-1-20-interior-1.jpg', width: 2560, height: 1706, alt: 'Example home living room', kind: 'interior' },
  { src: '/land-home/lot-1-20-interior-2.jpg', width: 2560, height: 1707, alt: 'Example home kitchen', kind: 'interior' },
  { src: '/land-home/lot-1-20-interior-3.jpg', width: 2560, height: 1707, alt: 'Example home primary bathroom', kind: 'interior' },
]
const LOT_1_20_FLOOR_PLAN: PackageImage = { src: '/land-home/lot-1-20-floor-plan.jpg', width: 1604, height: 693, alt: 'Example floor plan, 4 bed, 2 bath', kind: 'floorplan' }

/** Caption under each render on the package page. */
export const RENDER_CAPTION = 'Illustration. Home shown is an example. Not the actual property.'

/** Caption under every interior and the floor plan, wherever they render. */
export const EXAMPLE_PHOTO_CAPTION = 'Example homes shown. You can choose your own home.'

/** Added under every floor plan, after EXAMPLE_PHOTO_CAPTION (owner, 2026-11-25). */
export const FLOOR_PLAN_CAPTION = 'Example floor plan. Dimensions are approximate and options may not be included.'

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

/** The facts about a package's home that the description fills in. Copied as
 *  literals from the home's listing data, never imported from it. */
export interface PackageHome {
  beds: number
  baths: number
  sqft: number
  wideType: 'Single Wide' | 'Double Wide'
}

/** "4 bed, 2 bath double wide": the description's home, from the data. */
export function homeLine(h: PackageHome): string {
  return `${h.beds} bed, ${h.baths} bath ${h.wideType.toLowerCase()}`
}

/** What's included, in the owner's order and words, with the numbers
 *  filled in from the data. Nothing else. */
export function includedItems(acres: string, bedsBaths: string): string[] {
  return [
    `Brand new ${bedsBaths} home`,
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
  /** The home's specs for this package (description, spec row, card). */
  home: PackageHome
  /** That home's interiors (up to 3) and its floor plan, for the gallery. */
  interiors: PackageImage[]
  floorPlan: PackageImage
}

/** In the owner's order. */
export const PACKAGES: LandHomePackage[] = [
  {
    slug: 'floresville-texas-4-bed-2-bath-1-20-acres-land-home-package',
    legacySlugs: ['floresville-texas-4-bed-2-bath-1-3-acres-land-home-package'],
    city: 'Floresville', locationLabel: 'Floresville, TX', locationPath: FLORESVILLE_PACKAGES_PATH,
    acres: '1.20', price: 249000, monthlyPayment: 2200, image: RENDER_3, facts: FLORESVILLE_FACTS,
    home: HOME_1_20, interiors: LOT_1_20_INTERIORS, floorPlan: LOT_1_20_FLOOR_PLAN,
  },
  {
    slug: 'floresville-texas-3-bed-2-bath-1-05-acres-land-home-package',
    legacySlugs: ['floresville-texas-4-bed-2-bath-1-2-acres-land-home-package'],
    city: 'Floresville', locationLabel: 'Floresville, TX', locationPath: FLORESVILLE_PACKAGES_PATH,
    acres: '1.05', price: 229000, monthlyPayment: 2000, image: RENDER_2, facts: FLORESVILLE_FACTS,
    home: HOME_1_05, interiors: LOT_1_05_INTERIORS, floorPlan: LOT_1_05_FLOOR_PLAN,
  },
  {
    slug: 'floresville-texas-4-bed-2-bath-0-75-acres-land-home-package',
    city: 'Floresville', locationLabel: 'Floresville, TX', locationPath: FLORESVILLE_PACKAGES_PATH,
    acres: '0.75', price: 219000, monthlyPayment: 2000, image: RENDER_1, facts: FLORESVILLE_FACTS,
    home: HOME_0_75, interiors: LOT_0_75_INTERIORS, floorPlan: LOT_0_75_FLOOR_PLAN,
  },
]

/** A package page's gallery (owner's order): its render, the two aerials,
 *  its own home's interiors, then its own home's floor plan last. */
export function packageGallery(p: LandHomePackage): (PackageImage | AerialImage)[] {
  return [p.image, AERIAL_EMPTY, AERIAL_HOMES, ...p.interiors, p.floorPlan]
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

export function packageSpecLine(p: LandHomePackage): string {
  const s = p.home
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
