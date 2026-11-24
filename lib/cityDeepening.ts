import {
  ANALYSIS_CTA,
  CREDIT_DOWN,
  DELIVERY_TIMING,
  LAND_DOWN,
} from '@/lib/flaggedCopy'

/**
 * Batch 3 city pages. Titles, H1s, intros, prices, and inventory stay as they
 * are. These sections are the unique delivery, placement, and FAQ copy.
 * Financing sentences use only the confirmed down-payment facts.
 */

export interface DeepFaq {
  q: string
  a: string
  flagged?: string[]
}

export interface CityDeepening {
  delivery: [string, string, string]
  placement: string
  faq: DeepFaq[]
}

function opener(city: string): string {
  return `Texas Homes Direct delivers new manufactured homes all over Texas, from Lubbock to Seguin and beyond, with its own crew. That includes ${city}. Delivery is priced per mile. We do not publish a per-mile rate. ${DELIVERY_TIMING}`
}

function closer(county: string): string {
  return `For permits and placement rules, check with ${county}. We do not list permit fees or timelines because those come from the county.`
}

function finance(city: string, includeLand = true): DeepFaq {
  return {
    q: `How do I finance a manufactured home for a ${city}-area property?`,
    a: includeLand ? `${CREDIT_DOWN} ${LAND_DOWN} ${ANALYSIS_CTA}` : `${CREDIT_DOWN} ${ANALYSIS_CTA}`,
    flagged: includeLand ? [CREDIT_DOWN, LAND_DOWN] : [CREDIT_DOWN],
  }
}

const CITIES: Record<string, CityDeepening> = {
  blanco: {
    delivery: [
      opener('Blanco'),
      'Blanco sits on U.S. Highway 281 in south central Blanco County, about 12 miles south of Johnson City, the county seat. Texas Homes Direct uses that highway network to deliver a home to a Blanco-area site; once we have the property address, we will confirm the delivery and setup plan for that specific lot.',
      closer('Blanco County'),
    ],
    placement:
      'A Blanco-area site can be inside the city or on land elsewhere in Blanco County, including family land or a lot the buyer already owns. Hill Country lots often need a well, a septic system, and electric service confirmed before a home is set — some sites already have those, others do not. We size up the actual work rather than assuming a default package. Permits and placement rules come from Blanco County (and from the City of Blanco if the site is inside the city). We do not list fees or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Do you deliver manufactured homes to Blanco and the rest of Blanco County?',
        a: 'Yes. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Blanco and the rest of Blanco County. Blanco is on U.S. Highway 281, about 12 miles south of Johnson City, the county seat. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Send us the property address and we will confirm the plan for that site.',
      },
      {
        q: 'Who should I check with about permits for a manufactured home in Blanco County?',
        a: 'Permits and placement rules come from Blanco County, and from the City of Blanco if the property is inside the city limits. Those requirements vary, so confirm them before you buy. We can steer you to the right office. We do not list permit fees or timelines because those come from the county.',
      },
      {
        q: 'Can I put a home on family land near Blanco?',
        a: `Yes. Family land, a lot you already own, or a lot you are still buying are all starting points. ${LAND_DOWN} We will walk the utilities and access on that specific property rather than assuming a default package.`,
        flagged: [LAND_DOWN],
      },
      finance('Blanco', false),
    ],
  },
  sinton: {
    delivery: [
      opener('Sinton'),
      'Sinton is the county seat of San Patricio County and sits at the intersection of U.S. Highways 77 and 181, about 28 miles from Corpus Christi. Texas Homes Direct delivers to Sinton and the rest of the county along that highway network. Send us the property address and we will confirm the delivery and setup plan for that site.',
      closer('San Patricio County'),
    ],
    placement:
      'A Sinton-area site can be inside the city or elsewhere in San Patricio County — already owned, still being purchased, or family land. Confirm water, septic or sewer, and electric service on that specific property before a home is set. Permits and placement rules come from San Patricio County (and from the City of Sinton if the site is inside the city). We do not list fees or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Do you deliver throughout San Patricio County, or only to Sinton?',
        a: 'San Patricio County is in our Texas service area. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Sinton, the county seat at the intersection of U.S. Highways 77 and 181, about 28 miles from Corpus Christi. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Pass along the property address and we will confirm the plan for that site.',
      },
      {
        q: 'Do I need a San Patricio County lot secured before the first call?',
        a: `No. Buyers reach out with land already secured, a lot in progress, or family property still being decided. ${LAND_DOWN}`,
        flagged: [LAND_DOWN],
      },
      {
        q: 'Who sets manufactured-home permit rules in Sinton?',
        a: 'Permits and placement rules come from San Patricio County, and from the City of Sinton if the property is inside the city limits. We do not list fees or timelines because those come from the county. We can steer you to the right office.',
      },
      finance('Sinton'),
    ],
  },
  yorktown: {
    delivery: [
      opener('Yorktown'),
      'Yorktown is in southwestern DeWitt County on State Highway 72, about 75 miles east of San Antonio and about 36 miles northwest of Victoria. Cuero is the county seat. Texas Homes Direct delivers to Yorktown and the rest of DeWitt County along that route. Send us the property address and we will confirm the delivery and setup plan for that site.',
      closer('DeWitt County'),
    ],
    placement:
      'A Yorktown-area site can be inside the city or on land elsewhere in southwestern DeWitt County, including family land or a lot the buyer already owns. Confirm water, septic or sewer, electric service, and delivery access on that specific property. Permits and placement rules come from DeWitt County (and from the City of Yorktown if the site is inside the city). We do not list fees or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Do you deliver manufactured homes to Yorktown and the rest of DeWitt County?',
        a: 'Yes. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Yorktown and the rest of DeWitt County. Yorktown is on State Highway 72, about 75 miles east of San Antonio and about 36 miles northwest of Victoria. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Send us the address and we will confirm the plan for that site.',
      },
      {
        q: 'Do I have to own DeWitt County land before I contact you?',
        a: `No. A buyer might already have land, might be shopping for a lot, or might be working through family property. All three are starting points. ${LAND_DOWN}`,
        flagged: [LAND_DOWN],
      },
      {
        q: 'Who should I check with about permits near Yorktown?',
        a: 'Permits and placement rules come from DeWitt County, whose seat is Cuero, and from the City of Yorktown if the property is inside the city limits. We do not list fees or timelines because those come from the county. We can steer you to the right office.',
      },
      finance('Yorktown'),
    ],
  },
  'karnes-city': {
    delivery: [
      opener('Karnes City'),
      'Karnes City is the county seat of Karnes County, at the intersection of U.S. Highway 181 and State Highways 80 and 123, about 50 miles southeast of San Antonio. Texas Homes Direct delivers to Karnes City and the rest of the county along that highway network. Send us the property address and we will confirm the delivery and setup plan for that site.',
      closer('Karnes County'),
    ],
    placement:
      'A Karnes City-area site can be inside the city or elsewhere in Karnes County — already owned, still being purchased, or family land. Confirm water, septic or sewer, and electric service on that specific property before a home is set. Permits and placement rules come from Karnes County (and from the City of Karnes City if the site is inside the city). We do not list fees or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Can you deliver a manufactured home to any address in Karnes County?',
        a: 'Karnes County is in our Texas service area. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Karnes City, the county seat at U.S. Highway 181 and State Highways 80 and 123, about 50 miles southeast of San Antonio. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Send us the address and we will spell out what delivery and setup will look like at that property.',
      },
      {
        q: 'Do I need land in Karnes County squared away before contacting you?',
        a: `Not necessarily. Some buyers already have a site, others are still looking, and some are working through family property. ${LAND_DOWN}`,
        flagged: [LAND_DOWN],
      },
      {
        q: 'Who handles manufactured-home permits in Karnes City?',
        a: 'Permits and placement rules come from Karnes County, and from the City of Karnes City if the property is inside the city limits. We do not list fees or timelines because those come from the county. We can steer you to the right office.',
      },
      finance('Karnes City'),
    ],
  },
  pleasanton: {
    delivery: [
      opener('Pleasanton'),
      'Pleasanton is in Atascosa County on U.S. Highway 281, about 30 miles south of San Antonio and about 5 miles northeast of Jourdanton, the county seat. Texas Homes Direct delivers to Pleasanton and the rest of Atascosa County along that highway. Send us the property address and we will confirm the delivery and setup plan for that site.',
      closer('Atascosa County'),
    ],
    placement:
      'A Pleasanton-area site can be inside the city or elsewhere in Atascosa County, including family land or a lot the buyer already owns. Confirm water, septic or sewer, and electric service on that specific property before a home is set. Permits and placement rules come from Atascosa County (and from the City of Pleasanton if the site is inside the city). We do not list fees or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Do you deliver manufactured homes to Pleasanton and the rest of Atascosa County?',
        a: 'Yes. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Pleasanton and the rest of Atascosa County. Pleasanton is on U.S. Highway 281, about 30 miles south of San Antonio and about 5 miles northeast of Jourdanton, the county seat. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Send us the address and we will confirm the plan for that site.',
      },
      {
        q: 'Will I need a permit in Atascosa County?',
        a: 'That is property-specific. Permits and placement rules come from Atascosa County, and from the City of Pleasanton if the site is inside the city limits. Confirm what applies to your lot with the county. We do not list fees or timelines because those come from the county. We can steer you to the right office.',
      },
      {
        q: 'Can I use land I already own near Pleasanton?',
        a: `Yes. Family land, a lot you already own, or a lot you are still buying are all starting points. ${LAND_DOWN}`,
        flagged: [LAND_DOWN],
      },
      finance('Pleasanton'),
    ],
  },
  floresville: {
    delivery: [
      opener('Floresville'),
      'Floresville is the county seat of Wilson County, at the junction of U.S. Highway 181 and State Highway 97, about 30 miles southeast of San Antonio. Texas Homes Direct delivers to Floresville and the rest of Wilson County along that highway network. Send us the property address and we will confirm the delivery and setup plan for that site.',
      closer('Wilson County'),
    ],
    placement:
      'A Floresville-area site can be inside the city or elsewhere in Wilson County — already owned, still being purchased, or family land. Confirm water, septic or sewer, and electric service on that specific property before a home is set. If you would rather buy the land and the home together, Texas Homes Direct also lists land-home packages in Floresville. Permits and placement rules come from Wilson County (and from the City of Floresville if the site is inside the city). We do not list fees or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Do you serve every part of Wilson County?',
        a: 'Yes. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Floresville and the rest of Wilson County. Floresville is the county seat, at U.S. Highway 181 and State Highway 97, about 30 miles southeast of San Antonio. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Send us the address and we will lay out delivery and setup for that location.',
      },
      {
        q: 'Can I buy a land-home package in Floresville instead of placing a home on my own land?',
        a: `Yes. Current packages are listed on the Floresville land-home packages page. You can also buy a home for land you already own. ${LAND_DOWN}`,
        flagged: [LAND_DOWN],
      },
      {
        q: 'How does permitting typically work for a Wilson County property?',
        a: 'Permits and placement rules come from Wilson County, and from the City of Floresville if the property is inside the city limits. They track the property and current county requirements, not a fixed checklist we can publish here. We do not list fees or timelines because those come from the county. We can steer you to the right office.',
      },
      finance('Floresville'),
    ],
  },
  gonzales: {
    delivery: [
      opener('Gonzales'),
      'Gonzales is the county seat of Gonzales County, on U.S. Highways 90, 97, and 183, at the confluence of the Guadalupe and San Marcos rivers. Texas Homes Direct delivers to Gonzales and the rest of the county along that highway network. Send us the property address and we will confirm the delivery and setup plan for that site.',
      closer('Gonzales County'),
    ],
    placement:
      'A Gonzales-area site can be inside the city or elsewhere in Gonzales County, including family land or a lot the buyer already owns. Because Gonzales sits at the confluence of the Guadalupe and San Marcos rivers, placement and access are property-specific — confirm those with Gonzales County (and with the City of Gonzales if the site is inside the city) rather than assuming a default package. Also confirm water, septic or sewer, and electric service on that specific property. We do not list permit fees, flood rules, or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Do you deliver manufactured homes to Gonzales and the rest of Gonzales County?',
        a: 'Yes. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Gonzales and the rest of Gonzales County. Gonzales is the county seat, on U.S. Highways 90, 97, and 183. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Send us the address and we will confirm the plan for that site.',
      },
      {
        q: 'Do you expect Gonzales County land to already be owned?',
        a: `No. Buyers come with land they already own, a lot they are buying, or family property. ${LAND_DOWN}`,
        flagged: [LAND_DOWN],
      },
      {
        q: 'Who should I check with about placing a home near the rivers in Gonzales?',
        a: 'Gonzales is at the confluence of the Guadalupe and San Marcos rivers, so placement is property-specific. Check with Gonzales County, and with the City of Gonzales if the site is inside the city limits. We do not list fees, flood rules, or timelines because those come from the county. We can steer you to the right office.',
      },
      finance('Gonzales'),
    ],
  },
  hondo: {
    delivery: [
      opener('Hondo'),
      'Hondo is the county seat of Medina County, on U.S. Highway 90, about 41 miles west of San Antonio. Texas Homes Direct delivers to Hondo and the rest of Medina County along that highway. Send us the property address and we will confirm the delivery and setup plan for that site.',
      closer('Medina County'),
    ],
    placement:
      'A Hondo-area site can be inside the city or elsewhere in Medina County — family land, a lot already owned, or a lot being purchased separately. Confirm water, septic or sewer, electric service, and delivery access on that specific property before a home is set. Permits and placement rules come from Medina County (and from the City of Hondo if the site is inside the city). We do not list fees or timelines because those come from the county. We can point you to the right office to ask.',
    faq: [
      {
        q: 'Does your delivery area cover all of Medina County?',
        a: 'Yes. Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew, including Hondo and the rest of Medina County. Hondo is the county seat, on U.S. Highway 90, about 41 miles west of San Antonio. Delivery is priced per mile. We do not publish a per-mile rate. In Texas, delivery and setup usually take 1–2 days. Once we have the address, we will confirm the plan for that property.',
      },
      {
        q: 'What determines which floor plan fits my land near Hondo?',
        a: 'Delivery access and the county’s placement rules matter more than raw acreage. We will go over your specific property before recommending a size. Confirm permits and setbacks with Medina County, and with the City of Hondo if the site is inside the city limits.',
      },
      {
        q: 'Can I use land I already own in Medina County?',
        a: `Yes. Family land, a lot you already own, or a lot you are still buying are all starting points. ${LAND_DOWN}`,
        flagged: [LAND_DOWN],
      },
      finance('Hondo'),
    ],
  },
}

export function cityDeepening(slug: string): CityDeepening | undefined {
  return CITIES[slug]
}
