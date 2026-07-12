'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Listing } from '@/lib/sampleListings'
import { useLang } from './LanguageContext'

interface Props {
  listing: Listing
  compact?: boolean
}

export default function ListingCard({ listing, compact = false }: Props) {
  const { t } = useLang()
  const fmt = (n: number) =>
    n.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })

  return (
    <Link
      href={`/homes/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all hover:-translate-y-1 hover:border-gold hover:shadow-card-hover border border-transparent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
            {t.listing.newBadge}
          </span>
          {listing.hudCertified && (
            <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy">
              {t.listing.hudCertified}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 rounded-md bg-navy/85 px-2.5 py-1 text-xs font-medium text-white">
          {listing.region}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-tight text-navy group-hover:text-gold-700">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-navy/60">
          {listing.city}, Texas · {listing.year}
        </p>

        {!compact && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-navy-50 px-2.5 py-1 font-medium text-navy">
              {listing.beds} {t.listing.beds}
            </span>
            <span className="rounded-md bg-navy-50 px-2.5 py-1 font-medium text-navy">
              {listing.baths} {t.listing.baths}
            </span>
            <span className="rounded-md bg-navy-50 px-2.5 py-1 font-medium text-navy">
              {listing.sqft.toLocaleString()} {t.listing.sqft}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-end justify-between border-t border-navy-50 pt-4">
          <div>
            <p className="font-display text-2xl font-bold text-navy">
              {listing.price > 0 ? fmt(listing.price) : t.listing.callForPrice}
            </p>
            {listing.monthlyPayment > 0 && (
              <p className="text-xs text-navy/60">
                {t.listing.monthly}: {fmt(listing.monthlyPayment)}/mo
              </p>
            )}
          </div>
          <span className="inline-flex min-h-[44px] items-center rounded-md bg-navy px-4 text-sm font-semibold text-white transition group-hover:bg-gold group-hover:text-navy">
            {t.listing.viewDetails}
          </span>
        </div>
      </div>
    </Link>
  )
}
