/**
 * Master directory of Texas cities for the "Cities We Serve" hub (/cities)
 * and its per-city landing pages (/mobile-homes-[slug]-tx).
 *
 * How to publish a new city:
 *   1. Create app/mobile-homes-<slug>-tx/page.tsx (see the San Antonio page
 *      for the pattern — it just pulls its content from this file and
 *      renders <CityPageContent city={...} />).
 *   2. Add an `intro` paragraph for that city below.
 *   3. Flip `published: true` on its entry.
 * The hub only ever links to cities with `published: true`, so nothing here
 * creates a dead link until its actual page exists.
 */

export type Region =
  | 'DFW'
  | 'Greater Houston'
  | 'Hill Country'
  | 'Central Texas'
  | 'South Texas'
  | 'East Texas'
  | 'Gulf Coast'
  | 'West Texas'
  | 'Panhandle'

// Rendering order for the hub page's region sections.
export const REGION_ORDER: Region[] = [
  'Hill Country',
  'Central Texas',
  'East Texas',
  'West Texas',
  'South Texas',
  'Panhandle',
  'Gulf Coast',
  'DFW',
  'Greater Houston',
]

export interface CityEntry {
  name: string
  slug: string
  region: Region
  published: boolean
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function city(name: string, region: Region, published = false): CityEntry {
  return { name, slug: slugify(name), region, published }
}

export const TEXAS_CITIES: CityEntry[] = [
  // ─── Hill Country ────────────────────────────────────────────────
  city(
    'Austin',
    'Hill Country',
    false
  ),
  city(
    'Seguin',
    'Hill Country',
    true
  ),
  city('San Marcos', 'Hill Country'),
  city('New Braunfels', 'Hill Country', true),
  city('Kerrville', 'Hill Country'),
  city('Fredericksburg', 'Hill Country'),
  city('Boerne', 'Hill Country'),
  city('Dripping Springs', 'Hill Country'),
  city('Wimberley', 'Hill Country'),
  city('Blanco', 'Hill Country', true),
  city('Johnson City', 'Hill Country', true),
  city('Bandera', 'Hill Country', true),
  city('Marble Falls', 'Hill Country'),
  city('Burnet', 'Hill Country', true),
  city('Llano', 'Hill Country', true),
  city('Canyon Lake', 'Hill Country'),
  city('Bulverde', 'Hill Country'),
  city('Schertz', 'Hill Country'),
  city('Converse', 'Hill Country'),
  city('Castroville', 'Hill Country', true),
  city('Marion', 'Hill Country'),
  city('Cibolo', 'Hill Country'),
  city('San Saba', 'Hill Country', true),
  city('Lampasas', 'Hill Country', true),
  city('Goldthwaite', 'Hill Country', true),
  city('Brady', 'Hill Country', true),
  city('Mason', 'Hill Country', true),
  city('Junction', 'Hill Country', true),
  city('Comfort', 'Hill Country', true),
  city('Hondo', 'Hill Country', true),
  city('Devine', 'Hill Country', true),

  // ─── Central Texas ───────────────────────────────────────────────
  city(
    'Waco',
    'Central Texas',
    false
  ),
  city('Temple', 'Central Texas'),
  city('Killeen', 'Central Texas'),
  city('Belton', 'Central Texas'),
  city('Georgetown', 'Central Texas'),
  city('Round Rock', 'Central Texas'),
  city('Taylor', 'Central Texas'),
  city('Bastrop', 'Central Texas', true),
  city('Lockhart', 'Central Texas', true),
  city('Elgin', 'Central Texas', true),
  city('Hutto', 'Central Texas'),
  city('Copperas Cove', 'Central Texas'),
  city('Gatesville', 'Central Texas'),
  city('Cameron', 'Central Texas'),
  city('Brenham', 'Central Texas'),
  city('Hewitt', 'Central Texas'),
  city('Woodway', 'Central Texas'),
  city('Bellmead', 'Central Texas'),
  city('Robinson', 'Central Texas'),
  city('Luling', 'Central Texas', true),
  city('Smithville', 'Central Texas', true),
  city('Giddings', 'Central Texas', true),
  city('La Grange', 'Central Texas', true),
  city('Schulenburg', 'Central Texas', true),
  city('Flatonia', 'Central Texas', true),
  city('Caldwell', 'Central Texas'),
  city('Columbus', 'Central Texas'),
  city('Hallettsville', 'Central Texas'),

  // ─── East Texas ──────────────────────────────────────────────────
  city(
    'Tyler',
    'East Texas',
    false
  ),
  city('Longview', 'East Texas'),
  city('Marshall', 'East Texas'),
  city('Nacogdoches', 'East Texas'),
  city('Lufkin', 'East Texas'),
  city('Texarkana', 'East Texas'),
  city('Palestine', 'East Texas'),
  city('Jacksonville', 'East Texas'),
  city('Kilgore', 'East Texas'),
  city('Henderson', 'East Texas'),
  city('Mount Pleasant', 'East Texas'),
  city('Paris', 'East Texas'),
  city('Sulphur Springs', 'East Texas'),
  city('Carthage', 'East Texas'),
  city('Center', 'East Texas'),
  city('Whitehouse', 'East Texas'),
  city('Lindale', 'East Texas'),
  city('Bullard', 'East Texas'),

  // ─── West Texas ──────────────────────────────────────────────────
  city(
    'El Paso',
    'West Texas',
    false
  ),
  city('Midland', 'West Texas'),
  city('Odessa', 'West Texas'),
  city('San Angelo', 'West Texas'),
  city('Abilene', 'West Texas'),
  city('Big Spring', 'West Texas'),
  city('Andrews', 'West Texas'),
  city('Pecos', 'West Texas'),
  city('Fort Stockton', 'West Texas'),
  city('Alpine', 'West Texas'),
  city('Snyder', 'West Texas'),
  city('Sweetwater', 'West Texas'),
  city('Socorro', 'West Texas'),
  city('Horizon City', 'West Texas'),
  city('Anthony', 'West Texas'),
  city('Canutillo', 'West Texas'),

  // ─── South Texas ─────────────────────────────────────────────────
  city(
    'San Antonio',
    'South Texas',
    false
  ),
  city(
    'Laredo',
    'South Texas',
    false
  ),
  city(
    'McAllen',
    'South Texas',
    false
  ),
  city(
    'Victoria',
    'South Texas',
    false
  ),
  city(
    'Alice',
    'South Texas',
    false
  ),
  city(
    'Pleasanton',
    'South Texas',
    true
  ),
  city('Edinburg', 'South Texas'),
  city('Mission', 'South Texas'),
  city('Pharr', 'South Texas'),
  city('Brownsville', 'South Texas'),
  city('Harlingen', 'South Texas'),
  city('Kingsville', 'South Texas'),
  city('Uvalde', 'South Texas'),
  city('Eagle Pass', 'South Texas'),
  city('Del Rio', 'South Texas'),
  city('Beeville', 'South Texas'),
  city('Floresville', 'South Texas', true),
  city('Rio Bravo', 'South Texas'),
  city('Hidalgo', 'South Texas'),
  city('Cuero', 'South Texas', true),
  city('Goliad', 'South Texas'),
  city('Edna', 'South Texas'),
  city('Orange Grove', 'South Texas'),
  city('Premont', 'South Texas'),
  city('Jourdanton', 'South Texas'),
  city('Poteet', 'South Texas'),
  city('Charlotte', 'South Texas'),
  city('Gonzales', 'South Texas', true),
  city('Yoakum', 'South Texas'),
  city('Karnes City', 'South Texas'),
  city('Pearsall', 'South Texas'),
  city('Yorktown', 'South Texas'),

  // ─── Panhandle ───────────────────────────────────────────────────
  city(
    'Amarillo',
    'Panhandle',
    false
  ),
  city(
    'Lubbock',
    'Panhandle',
    false
  ),
  city('Plainview', 'Panhandle'),
  city('Pampa', 'Panhandle'),
  city('Borger', 'Panhandle'),
  city('Dumas', 'Panhandle'),
  city('Hereford', 'Panhandle'),
  city('Canyon', 'Panhandle'),
  city('Levelland', 'Panhandle'),
  city('Dalhart', 'Panhandle'),
  city('Wolfforth', 'Panhandle'),
  city('Shallowater', 'Panhandle'),
  city('Idalou', 'Panhandle'),

  // ─── Gulf Coast ──────────────────────────────────────────────────
  city(
    'Corpus Christi',
    'Gulf Coast',
    false
  ),
  city('Galveston', 'Gulf Coast'),
  city('Texas City', 'Gulf Coast'),
  city('Port Arthur', 'Gulf Coast'),
  city('Beaumont', 'Gulf Coast'),
  city('Orange', 'Gulf Coast'),
  city('Rockport', 'Gulf Coast'),
  city('Port Lavaca', 'Gulf Coast'),
  city('Freeport', 'Gulf Coast'),
  city('Port Aransas', 'Gulf Coast'),
  city('Alvin', 'Gulf Coast'),
  city('Portland', 'Gulf Coast'),
  city('Ingleside', 'Gulf Coast'),
  city('Robstown', 'Gulf Coast'),
  city('Aransas Pass', 'Gulf Coast'),

  // ─── DFW ─────────────────────────────────────────────────────────
  city(
    'Dallas',
    'DFW',
    false
  ),
  city('Fort Worth', 'DFW'),
  city('Arlington', 'DFW'),
  city('Plano', 'DFW'),
  city('Irving', 'DFW'),
  city('Garland', 'DFW'),
  city('Grand Prairie', 'DFW'),
  city('McKinney', 'DFW'),
  city('Frisco', 'DFW'),
  city('Denton', 'DFW'),
  city('Mesquite', 'DFW'),
  city('Carrollton', 'DFW'),
  city('Waxahachie', 'DFW'),
  city('Cleburne', 'DFW'),
  city('Ennis', 'DFW'),
  city('Terrell', 'DFW'),
  city('Rockwall', 'DFW'),
  city('Weatherford', 'DFW'),
  city('Decatur', 'DFW'),
  city('Corsicana', 'DFW'),
  city('Richardson', 'DFW'),

  // ─── Greater Houston ─────────────────────────────────────────────
  city(
    'Houston',
    'Greater Houston',
    false
  ),
  city('Pasadena', 'Greater Houston'),
  city('Baytown', 'Greater Houston'),
  city('Conroe', 'Greater Houston'),
  city('The Woodlands', 'Greater Houston'),
  city('Sugar Land', 'Greater Houston'),
  city('Pearland', 'Greater Houston'),
  city('League City', 'Greater Houston'),
  city('Missouri City', 'Greater Houston'),
  city('Spring', 'Greater Houston'),
  city('Katy', 'Greater Houston'),
  city('Humble', 'Greater Houston'),
  city('Bellaire', 'Greater Houston'),
  city('Cypress', 'Greater Houston'),
  city('Tomball', 'Greater Houston'),
  city('Rosenberg', 'Greater Houston'),
  city('Angleton', 'Greater Houston'),
  city('Lake Jackson', 'Greater Houston'),
  city('Cleveland', 'Greater Houston'),
  city('Liberty', 'Greater Houston'),
  city('Dayton', 'Greater Houston'),
]

export function publishedCities(): CityEntry[] {
  return TEXAS_CITIES.filter((c) => c.published)
}

export function getCityBySlug(slug: string): CityEntry | undefined {
  return TEXAS_CITIES.find((c) => c.slug === slug && c.published)
}

export function citiesByRegion(): Partial<Record<Region, CityEntry[]>> {
  const grouped: Partial<Record<Region, CityEntry[]>> = {}
  for (const c of TEXAS_CITIES) {
    if (!c.published) continue
    if (!grouped[c.region]) grouped[c.region] = []
    grouped[c.region]!.push(c)
  }
  for (const region of Object.keys(grouped) as Region[]) {
    grouped[region]!.sort((a, b) => a.name.localeCompare(b.name))
  }
  return grouped
}
