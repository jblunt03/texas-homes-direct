/**
 * Alt text for in-scope pages (city pages and any other non-inventory use).
 * Suggested alts from the batch-1 alt list, keyed by src. Inventory pages
 * and the homepage do not import this.
 */
const ALT_BY_SRC: Record<string, string> = {
  '/homes/the-dove/IMG_0895.jpg.jpeg': 'The Smithville exterior, available from Texas Homes Direct',
  '/homes/the-chapman/Chapman-Hero.jpg': 'Double wide manufactured home exterior, available from Texas Homes Direct',
  '/homes/the-coleman/Coleman-Gallery-1.jpg': 'The Sealy exterior, available from Texas Homes Direct',
  '/homes/the-gadwall/Gadwall-Hero.jpg': 'Single wide manufactured home exterior, available from Texas Homes Direct',
  '/homes/the-brewster/Brewster-Body-1.jpg': 'Single wide manufactured home exterior, available from Texas Homes Direct',
  '/homes/the-grayson/IMG_0789.webp': 'Single wide manufactured home exterior, available from Texas Homes Direct',
  '/homes/the-javelina/hero.jpg': 'Single wide manufactured home with agave and limestone landscaping, available from Texas Homes Direct',
  '/homes/the-mallard/213CCA81-EDC0-4C8C-8804-8B2ACE3E4731.jpg.jpeg': 'Black double wide manufactured home with wood steps on cleared land, available from Texas Homes Direct',
  '/homes/the-pronghorn/Image.jpeg': 'White double wide mobile home with black trim and a planted front yard, available from Texas Homes Direct',
  '/homes/the-terra/Terra-Hero.jpg': 'The Mineola exterior, available from Texas Homes Direct',
  '/homes/the-pigeon/Marathon-Archer-7.jpeg': 'White double wide manufactured home with stone skirting and rolling hills in the background, available from Texas Homes Direct',
  '/homes/the-katy/Katy-Hero.jpg': 'Two-tone single wide mobile home set under live oaks, available from Texas Homes Direct',
  '/homes/the-pearland/918F558B-6E95-44EF-9CD5-E240C3BBDDBE.jpg': 'Black mobile home with a cedar front porch and wooded hills behind it, available from Texas Homes Direct',
  '/homes/the-spoonbill/Spoonbill-Hero.jpg': 'Gray single wide manufactured home with a covered entry under live oaks, available from Texas Homes Direct',
  '/homes/the-widgeon/2-Stonewall.jpg.jpeg': 'Double wide manufactured home with a lit front walkway at sunset, available from Texas Homes Direct',
  '/homes/the-mesquite/Mesquite-Body-1.jpg': 'Dark single wide mobile home on a gravel drive beside an oak, available from Texas Homes Direct',
  '/homes/the-peredavid/3c6875ae-20d8-809a-89b2-e06c6ffda770.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-jackson/Jackson-Body-1.png': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-rattlesnake/img-01.png': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Bailey-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-pintail/41b875ae-20d8-8060-bae7-f6d8c623a690.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-lanny/7ADF26C5-4FB1-419E-8807-A72A63DB5F18.png': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-daniel/Daniel-Body-1.png': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Jasper-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Darrell-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-brewster/3fe875ae-20d8-8041-9cf8-d269eb93e223.jpeg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-badger/3c6875ae-20d8-805c-b09a-f23c47282ef5.jpeg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Beaumont-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Caldwell-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Fisher-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Breckenridge-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-armadillo/3e4875ae-20d8-8082-b930-f1bb9408be47.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-redhead/IMG_0001-scaled.jpg.jpeg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Loving-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-moose/3c7875ae-20d8-8046-9349-ddc899a9c3e5.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-road-runner/3c6875ae-20d8-80c9-ab1b-cb1831341b2d.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Cisco-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Longview-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-coleman/3c6875ae-20d8-80dd-98ec-cf9afa3946aa.jpeg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-raven/3c6875ae-20d8-807c-a710-fdb6ca49ba34.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Kendall-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-bobcat/3d5875ae-20d8-80de-be5f-eafaf5eb3933.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Hays-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-temple/5EA4F89E-9B6D-4F21-80E8-ACAB5163349D.png': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/jasper-4bed-2bath-double-wide/3fa875ae-20d8-8035-a9ac-e9cbb700afcd.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Conroe-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Trinity-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-coyote/Coyote-FloorPlan.png': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/the-grayson/Image.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Grapevine-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-axis-fleetwood/img-01.png': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Abilene-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-jack-rabbit/img-01.jpeg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/lampasas-texas-5-bed-3-bath-double-wide/41c875ae-20d8-8096-9347-ef87b6aabac5.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Ranger-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Dawson-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/jade-3bed-2bath-single-wide/41c875ae-20d8-80f4-a97f-d3e0d395a712.jpg': 'Exterior of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Amarillo-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/floorplans/Bell-FloorPlan.webp': 'Floor plan of a manufactured home available from Texas Homes Direct',
  '/homes/the-moose/hero.jpeg': 'Double wide manufactured home with a lit porch and desert landscaping, available from Texas Homes Direct',
  '/homes/the-wood-duck/Wood-Duck-Hero.jpg': 'Double wide mobile home with wood steps and a cactus garden, available from Texas Homes Direct',
}

const FLOOR_PLAN_ALT = 'Floor plan of a manufactured home available from Texas Homes Direct'

export function inScopeImageAlt(src: string, current: string): string {
  const path = src.split('?')[0]
  if (ALT_BY_SRC[path]) return ALT_BY_SRC[path]
  if (path.includes('/homes/floorplans/')) return FLOOR_PLAN_ALT
  if (/near\s+[^,]{1,60},\s*TX/i.test(current)) {
    const stripped = current
      .replace(/\s*near\s+[^,]{1,60},\s*TX/gi, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s+,/g, ',')
      .replace(/,\s*$/, '')
      .trim()
    if (/available from Texas Homes Direct/i.test(stripped)) return stripped
    return `${stripped}, available from Texas Homes Direct`
  }
  return current
}
