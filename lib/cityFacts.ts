import data from '@/lib/data/city-facts.json'

export type CityFact = (typeof data.cities)[number]

const bySlug = new Map(data.cities.map((city) => [city.slug, city]))

export function cityFact(slug: string): CityFact | undefined {
  return bySlug.get(slug)
}

export const FLORESVILLE_COUNTY = data.floresville_for_land_home.county_principal

/**
 * Statewide delivery line used in new copy. The lot city is not the frame;
 * it appears only inside "from Lubbock to Seguin and beyond".
 */
export const STATEWIDE_DELIVERY =
  'Texas Homes Direct delivers all over Texas, from Lubbock to Seguin and beyond, with its own crew.'

export const PER_MILE_NO_RATE =
  'Delivery is priced per mile. We do not publish a per-mile rate.'

export function cityFactsLine(fact: CityFact): string {
  const seats = fact.county_seats
    .map((item) => `${item.county} (seat ${item.seat})`)
    .join('; ')
  const population = fact.population_july_1_2025.toLocaleString('en-US')
  return `${seats}. Population ${population} (July 1, 2025, U.S. Census Bureau).`
}

export function cityDeliveryParagraph(fact: CityFact): string {
  return [
    `Texas Homes Direct delivers new manufactured homes all over Texas, from Lubbock to Seguin and beyond, with its own crew. That includes ${fact.name}.`,
    PER_MILE_NO_RATE,
    `For permits and placement rules, check with ${fact.county_check_with}. We do not list permit fees or timelines because those come from the county.`,
  ].join(' ')
}
