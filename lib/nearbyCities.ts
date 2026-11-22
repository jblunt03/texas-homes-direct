import data from '@/lib/data/nearby-cities.json'

export interface NearbyCityLink {
  slug: string
  name: string
  url: string
}

const bySlug: Record<string, NearbyCityLink[]> = {}
for (const page of data.pages) {
  bySlug[page.slug] = page.nearby.map((n) => ({
    slug: n.slug,
    name: n.name,
    url: n.url,
  }))
}

/** Six nearest city pages that already exist. Names and order come from the batch file. */
export function nearbyFor(slug: string): NearbyCityLink[] {
  return bySlug[slug] ?? []
}
