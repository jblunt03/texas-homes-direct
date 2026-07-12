'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [showLandWhere, setShowLandWhere] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          phone: data.phone,
          hasLand: data.hasLand,
          interest: data.interest,
          message: data.message,
          source: 'Website Contact Form',
        }),
      })
      if (!res.ok) throw new Error('Request failed')
    } catch (_) {
      setSubmitting(false)
      setError('Something went wrong — please try again or call us at (830) 381-1309.')
      return
    }

    form.reset()
    setShowLandWhere(false)
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div
        style={{
          padding: 32,
          background: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <span className="bmh-badge-caps bmh-badge-coral" style={{ alignSelf: 'flex-start' }}>
          Sent
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 32,
            letterSpacing: '-0.5px',
            color: 'var(--color-ink)',
            margin: 0,
          }}
        >
          Got it. Thanks.
        </h3>
        <p style={{ color: 'var(--color-body)', lineHeight: 1.6 }}>
          We&rsquo;ll get back to you within one business day — usually a lot sooner. In
          the meantime, feel free to call us at{' '}
          <a href="tel:+18303811309" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
            (830) 381-1309
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="bmh-form-grid-2">
        <div className="bmh-field">
          <label htmlFor="c-first">First name</label>
          <input id="c-first" name="firstName" type="text" placeholder="Jordan" required />
        </div>
        <div className="bmh-field">
          <label htmlFor="c-last">Last name</label>
          <input id="c-last" name="lastName" type="text" placeholder="Hernandez" required />
        </div>
        <div className="bmh-field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="bmh-field">
          <label htmlFor="c-phone">Phone</label>
          <input id="c-phone" name="phone" type="tel" placeholder="(210) 555-0142" />
        </div>

        <div className="bmh-field bmh-field-wide">
          <span className="bmh-field-label">
            Do you have land or family land?{' '}
            <span className="bmh-req" aria-hidden="true">*</span>
          </span>
          <div className="bmh-radio-group">
            <label className="bmh-radio-pill">
              <input
                type="radio"
                name="hasLand"
                value="yes"
                required
                onChange={() => setShowLandWhere(true)}
              />
              <span>Yes</span>
            </label>
            <label className="bmh-radio-pill">
              <input
                type="radio"
                name="hasLand"
                value="no"
                required
                onChange={() => setShowLandWhere(false)}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {showLandWhere && (
          <div className="bmh-field bmh-field-wide">
            <span className="bmh-field-label">
              Where is your land located?{' '}
              <span className="bmh-req" aria-hidden="true">*</span>
            </span>
            <div className="bmh-radio-group">
              {['Texas', 'New Mexico', 'Oklahoma', 'Other'].map((state) => (
                <label key={state} className="bmh-radio-pill">
                  <input type="radio" name="landWhere" value={state.toLowerCase().replace(' ', '-')} />
                  <span>{state}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="bmh-field bmh-field-wide">
          <label htmlFor="c-interest">I&rsquo;m interested in</label>
          <select id="c-interest" name="interest">
            <option>Browsing the inventory</option>
            <option>Financing pre-qualification</option>
            <option>Custom factory order</option>
            <option>Land + home package</option>
            <option>Just general questions</option>
          </select>
        </div>

        <div className="bmh-field bmh-field-wide">
          <label htmlFor="c-msg">Message</label>
          <textarea
            id="c-msg"
            name="message"
            placeholder="Tell us about your timeline, budget, where the land is, anything that helps us help you."
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="submit"
            className="bmh-btn bmh-btn-primary bmh-btn-lg"
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Send message'}
          </button>
          <span className="bmh-caption bmh-muted">We never share your info. No spam, ever.</span>
        </div>
        {error && (
          <p style={{ color: 'var(--color-error, #c0392b)', fontSize: 14, margin: 0 }}>
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
