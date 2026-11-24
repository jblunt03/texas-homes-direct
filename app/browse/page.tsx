import type { Metadata } from 'next'
import { fetchAllListings } from '@/lib/notion'
import BrowseClient from './BrowseClient'
import { isPromoActive } from '@/lib/promo'

export const revalidate = 3000

const TITLE = 'Browse Manufactured Homes for Sale in Texas | Texas Homes Direct'
const DESCRIPTION =
  'Browse singlewides and doublewides. Every home priced to give Texas families more for their money. Delivered anywhere in Texas.'
const CANONICAL = 'https://www.texashomesdirect.com/browse'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'Texas Homes Direct',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { type?: string; budget?: string; beds?: string; baths?: string }
}) {
  const allListings = await fetchAllListings()
  const listings = allListings.filter(
    (l) => l.status === 'Active' || l.status === 'Repo Deal',
  )

  return (
    <BrowseClient
      initialType={searchParams.type ?? 'all'}
      initialBudget={searchParams.budget ?? ''}
      initialBeds={searchParams.beds ?? ''}
      initialBaths={searchParams.baths ?? ''}
      listings={listings}
      promoActiveAtRender={isPromoActive()}
    />
  )
}
