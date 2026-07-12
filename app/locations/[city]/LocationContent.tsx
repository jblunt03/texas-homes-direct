'use client'
import { useState } from 'react'
import { sampleListings } from '@/lib/sampleListings'
import ListingCard from '@/components/ListingCard'
import LeadForm from '@/components/LeadForm'
import { useLang } from '@/components/LanguageContext'

interface Props {
  slug: string
  city: string
  region: string
  intro: string
}

export default function LocationContent({ slug, city, region, intro }: Props) {
  const { lang } = useLang()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const matches = sampleListings.filter(
    (l) =>
      l.city.toLowerCase() === city.toLowerCase() || l.region === region,
  )

  const faqs = [
    {
      q: `What do manufactured home prices look like in ${city}, Texas?`,
      a: `In the ${city} area, single-wides typically run $48,000-$80,000 and double-wides run $85,000-$145,000 depending on age, size, and finish-out. Pre-owned homes in this area are usually 15-30% below those numbers. We update our pricing weekly based on current inventory.`,
    },
    {
      q: `Do I need to own land to buy a manufactured home near ${city}?`,
      a: `You do not have to — there are park-based options around ${city} — but land ownership opens up much better financing (often 2-4% lower rates) and lets you build equity. We help with both situations.`,
    },
    {
      q: `What are the site prep costs in ${region} for a manufactured home?`,
      a: `${region} site prep typically runs $20,000-$45,000 for raw land needing well, septic, and electric. Well drilling and septic vary the most across this region. We give you real quotes from local contractors before you commit to a home.`,
    },
    {
      q: `How long does the process take in ${city}?`,
      a: `From signed paperwork to keys in your hand, the typical timeline in the ${city} area is 8-14 weeks. That includes financing, permits, factory order or pre-owned home prep, delivery, and final inspection. We keep you updated at every step.`,
    },
  ]

  return (
    <div className="bg-navy-50">
      <section className="bg-navy py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            {region}
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">
            {lang === 'es'
              ? `Casas Manufacturadas en ${city}, Texas`
              : `Manufactured Homes for Sale in ${city}, Texas`}
          </h1>
          <p className="mt-4 max-w-3xl text-white/80">{intro}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            {lang === 'es'
              ? `Casas Cerca de ${city}`
              : `Homes Near ${city}`}
          </h2>
          <p className="mt-1 text-navy/70">
            {matches.length}{' '}
            {lang === 'es' ? 'casas disponibles' : 'homes currently available'}
          </p>
          {matches.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-card">
              <p className="text-navy/70">
                {lang === 'es'
                  ? 'No hay casas listadas para esta área esta semana. Llena el formulario abajo y Justin te avisa cuando lleguen.'
                  : "No homes listed in this area this week. Fill out the form below and Justin will notify you when new inventory comes in."}
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            {lang === 'es'
              ? `Preguntas Frecuentes — ${city}`
              : `Frequently Asked Questions — ${city}`}
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm"
              >
                <button
                  className="flex min-h-[56px] w-full items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-navy">{f.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-5 w-5 flex-none text-gold-700 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="border-t border-navy-100 px-5 py-4 text-sm text-navy/80">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <LeadForm source={`location-${slug}`} />
        </div>
      </section>
    </div>
  )
}
