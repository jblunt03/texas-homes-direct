'use client'
import { useState, FormEvent } from 'react'
import { useLang } from './LanguageContext'

interface LeadFormProps {
  title?: string
  compact?: boolean
  source?: string
}

export default function LeadForm({
  title,
  compact = false,
  source = 'website',
}: LeadFormProps) {
  const { t, lang } = useLang()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    ownsLand: false,
    message: '',
    bestTime: 'morning',
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, firstName: form.name, source, language: lang }),
      })
      if (!res.ok) throw new Error('Submit failed')
      setSuccess(true)
    } catch (err) {
      setError(t.leadForm.error)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-navy"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-navy">
          {lang === 'en' ? 'Thanks!' : '¡Gracias!'}
        </h3>
        <p className="mt-2 text-navy/70">{t.leadForm.success}</p>
        <p className="mt-3 text-sm font-semibold text-gold-700">— Justin</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-2xl bg-white p-6 shadow-card lg:p-8 ${
        compact ? '' : ''
      }`}
    >
      <div>
        <h3 className="font-display text-xl font-bold text-navy">
          {title || t.leadForm.heading}
        </h3>
        <p className="mt-1 text-sm text-navy/70">{t.leadForm.sub}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={t.leadForm.name}
          required
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <Field
          label={t.leadForm.phone}
          type="tel"
          required
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
      </div>

      <Field
        label={t.leadForm.email}
        type="email"
        required
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
      />

      <Field
        label={t.leadForm.city}
        value={form.city}
        onChange={(v) => setForm({ ...form, city: v })}
      />

      <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md border border-navy-100 px-3 py-2">
        <input
          type="checkbox"
          checked={form.ownsLand}
          onChange={(e) => setForm({ ...form, ownsLand: e.target.checked })}
          className="h-5 w-5 cursor-pointer accent-gold"
        />
        <span className="text-sm font-medium text-navy">
          {t.leadForm.ownsLand}
        </span>
      </label>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy">
          {t.leadForm.bestTime}
        </label>
        <select
          value={form.bestTime}
          onChange={(e) => setForm({ ...form, bestTime: e.target.value })}
          className="block min-h-[44px] w-full rounded-md border border-navy-100 bg-white px-3 text-sm text-navy outline-none transition focus:border-gold focus:shadow-gold-glow"
        >
          <option value="morning">{t.leadForm.morning}</option>
          <option value="afternoon">{t.leadForm.afternoon}</option>
          <option value="evening">{t.leadForm.evening}</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy">
          {t.leadForm.message}
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="block w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-navy outline-none transition focus:border-gold focus:shadow-gold-glow"
        />
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-gold px-6 font-bold text-navy shadow-sm transition hover:bg-gold-400 hover:shadow-gold-glow disabled:opacity-60"
      >
        {submitting ? t.leadForm.submitting : t.leadForm.submit}
      </button>
    </form>
  )
}

interface FieldProps {
  label: string
  type?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
}
function Field({
  label,
  type = 'text',
  required,
  value,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block min-h-[44px] w-full rounded-md border border-navy-100 bg-white px-3 text-sm text-navy outline-none transition focus:border-gold focus:shadow-gold-glow"
      />
    </div>
  )
}
