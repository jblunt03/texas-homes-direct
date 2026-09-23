import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCityBySlug } from '@/lib/cities'
import { CITY_CONTENT } from '@/lib/cityContent'
import CityPageContentV2 from '@/components/CityPageContentV2'

const SLUG = 'georgetown'

export function generateMetadata(): Metadata {
  const city = getCityBySlug(SLUG)
  const content = CITY_CONTENT[SLUG]
  if (!city || !content) return { title: 'Not Found' }
  return {
    title: `Mobile Homes for Sale in ${city.name}, TX`,
    description: content.metaDescription,
    alternates: {
      canonical: `https://www.texashomesdirect.com/mobile-homes-${SLUG}-tx`,
    },
  }
}

export default function Page() {
  const city = getCityBySlug(SLUG)
  const content = CITY_CONTENT[SLUG]
  if (!city || !content) notFound()
  return <CityPageContentV2 city={city} content={content} />
}
