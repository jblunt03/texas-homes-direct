import type { Metadata } from 'next'
import { fetchAllListings } from '@/lib/notion'
import BrowseClient from './BrowseClient'

export const revalidate = 3000

export const metadata: Metadata = {
  title: 'Inventory — Texas Homes Direct',
  description:
    'Browse singlewides and doublewides. Every home priced to give Texas families more for their money. Delivered anywhere in Texas.',
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  const allListings = await fetchAllListings()
  const listings = allListings.filter(
    (l) => l.status === 'Active' || l.status === 'Repo Deal',
  )

  return (
    <BrowseClient
      initialType={searchParams.type ?? 'all'}
      listings={listings}
    />
  )
}
