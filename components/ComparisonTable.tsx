'use client'
import { useMemo } from 'react'
import { useLang } from './LanguageContext'

interface Props {
  homePrice?: number
  downPct?: number
  termYears?: number
}

function calcMonthly(loan: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12
  const n = years * 12
  if (r === 0) return loan / n
  return (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
}

export default function ComparisonTable({
  homePrice = 85000,
  downPct = 10,
  termYears = 20,
}: Props) {
  const { lang } = useLang()
  const loan = homePrice * (1 - downPct / 100)

  const rows = useMemo(() => {
    const lenders = [
      { name: 'Texas Homes Direct (Justin)', rate: 8.5, highlight: true },
      { name: 'Clayton Homes', rate: 12.0 },
      { name: 'Palm Harbor', rate: 11.5 },
      { name: '21st Mortgage Direct', rate: 10.99 },
    ]
    return lenders.map((l) => {
      const monthly = calcMonthly(loan, l.rate, termYears)
      const total = monthly * termYears * 12
      return { ...l, monthly, total }
    })
  }, [loan, termYears])

  const baseTotal = rows[0].total

  const fmt = (n: number) =>
    n.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })

  const headers =
    lang === 'es'
      ? ['Prestamista', 'Tasa', 'Enganche', 'Mensual', 'Total 20 Años', 'Ahorras']
      : ['Lender', 'Rate', 'Down', 'Monthly', '20yr Total', 'You Save']

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-navy text-white">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {rows.map((row, i) => {
              const savings = row.total - baseTotal
              return (
                <tr
                  key={row.name}
                  className={
                    row.highlight ? 'bg-gold/15 font-semibold' : 'bg-white'
                  }
                >
                  <td className="px-4 py-4 text-sm text-navy">
                    {row.highlight && (
                      <span className="mr-2 inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-navy">
                        ★
                      </span>
                    )}
                    {row.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-navy">
                    {row.rate.toFixed(2)}%
                  </td>
                  <td className="px-4 py-4 text-sm text-navy">
                    {fmt(homePrice * (downPct / 100))}
                  </td>
                  <td className="px-4 py-4 text-sm text-navy">
                    {fmt(row.monthly)}/mo
                  </td>
                  <td className="px-4 py-4 text-sm text-navy">
                    {fmt(row.total)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {i === 0 ? (
                      <span className="font-bold text-gold-700">
                        {lang === 'es' ? 'Punto base' : 'Baseline'}
                      </span>
                    ) : (
                      <span className="font-bold text-emerald-600">
                        {fmt(savings)}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="bg-navy-50 px-4 py-3 text-xs text-navy/70">
        {lang === 'es'
          ? 'Comparación basada en precio de casa de '
          : 'Comparison based on home price of '}
        <strong>{fmt(homePrice)}</strong>
        {lang === 'es' ? ', enganche del ' : ', '}
        <strong>{downPct}% down</strong>
        {lang === 'es' ? ', plazo de ' : ', '}
        <strong>{termYears} {lang === 'es' ? 'años' : 'years'}</strong>.{' '}
        {lang === 'es'
          ? 'Tasas reales varían según crédito.'
          : 'Actual rates depend on your credit.'}
      </p>
    </div>
  )
}
