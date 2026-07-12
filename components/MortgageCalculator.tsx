'use client'
import { useMemo, useState } from 'react'
import { useLang } from './LanguageContext'

interface Props {
  initialPrice?: number
  initialRate?: number
  initialTerm?: number
  initialDownPct?: number
}

export default function MortgageCalculator({
  initialPrice = 85000,
  initialRate = 8.5,
  initialTerm = 20,
  initialDownPct = 10,
}: Props) {
  const { t } = useLang()
  const [price, setPrice] = useState(initialPrice)
  const [downPct, setDownPct] = useState(initialDownPct)
  const [term, setTerm] = useState(initialTerm)
  const [rate, setRate] = useState(initialRate)

  const { loanAmount, monthlyPayment, totalPaid, totalInterest } =
    useMemo(() => {
      const down = price * (downPct / 100)
      const loan = price - down
      const r = rate / 100 / 12
      const n = term * 12
      let monthly = 0
      if (r === 0) {
        monthly = loan / n
      } else {
        monthly = (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
      }
      const total = monthly * n
      return {
        loanAmount: loan,
        monthlyPayment: monthly,
        totalPaid: total,
        totalInterest: total - loan,
      }
    }, [price, downPct, term, rate])

  const fmt = (n: number) =>
    n.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="space-y-6 p-6 lg:col-span-3 lg:p-8">
          <Slider
            label={t.calculator.homePrice}
            value={price}
            min={30000}
            max={200000}
            step={500}
            format={fmt}
            onChange={setPrice}
          />
          <Slider
            label={`${t.calculator.downPayment} (${downPct}%)`}
            value={downPct}
            min={0}
            max={30}
            step={1}
            format={(v) => `${v}% · ${fmt(price * (v / 100))}`}
            onChange={setDownPct}
          />
          <Slider
            label={t.calculator.loanTerm}
            value={term}
            min={10}
            max={30}
            step={1}
            format={(v) => `${v} years`}
            onChange={setTerm}
          />
          <Slider
            label={t.calculator.interestRate}
            value={rate}
            min={4}
            max={14}
            step={0.1}
            format={(v) => `${v.toFixed(1)}%`}
            onChange={setRate}
          />
          <p className="text-xs text-navy/60">{t.calculator.disclaimer}</p>
        </div>

        <div className="space-y-4 bg-navy p-6 lg:col-span-2 lg:p-8">
          <div className="rounded-xl bg-gold p-5 text-navy shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy/70">
              {t.calculator.monthlyPayment}
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold leading-none">
              {fmt(monthlyPayment)}
            </p>
            <p className="mt-1 text-xs font-medium text-navy/70">/ month</p>
          </div>

          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {t.calculator.loanAmount}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-white">
              {fmt(loanAmount)}
            </p>
          </div>

          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-100">
              {t.calculator.totalInterest}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-accent">
              {fmt(totalInterest)}
            </p>
          </div>

          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {t.calculator.totalPaid}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-white">
              {fmt(totalPaid)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: SliderProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-navy">{label}</span>
        <span className="font-display text-base font-bold text-gold-700">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-navy-50 accent-gold"
        style={{ minHeight: 44 }}
      />
    </label>
  )
}
