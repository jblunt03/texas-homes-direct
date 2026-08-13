'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const SESSION_KEY = 'stw_seen_v1'

// TEMPORARY — testing only. Set to true so the popup fires on every page load,
// ignoring the once-per-session rule. Set back to false before this goes live.
const DEV_ALWAYS_SHOW = false

const PRIZES = [
  { name: 'Free Delivery', value: '$10,000 value' },
  { name: 'Free Skirting', value: '$5,000 value' },
  { name: 'Free Foundation', value: '$8,000 value' },
  { name: 'Furniture Gift Card', value: '$3,000 value' },
  { name: 'Free Septic', value: '$12,000 value' },
]

const SLICE_ANGLE = 360 / PRIZES.length
const WHEEL_SIZE = 300
const CENTER = WHEEL_SIZE / 2
const RADIUS = 140
const LABEL_RADIUS = 96

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) }
}

function describeSlice(startAngle: number, endAngle: number) {
  const start = polarToCartesian(endAngle, RADIUS)
  const end = polarToCartesian(startAngle, RADIUS)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
}

type Stage = 'closed' | 'intro' | 'spinning' | 'result' | 'claim' | 'confirmed'

interface ConfettiPiece {
  left: number
  delay: number
  duration: number
  rotate: number
  color: string
}

function makeConfetti(): ConfettiPiece[] {
  const colors = ['var(--color-primary)', 'var(--color-primary-active)', '#ffffff', '#f3c94b']
  return Array.from({ length: 28 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 1.6 + Math.random() * 1.1,
    rotate: Math.random() * 360,
    color: colors[i % colors.length],
  }))
}

export default function SpinToWinPopup() {
  const [stage, setStage] = useState<Stage>('closed')
  const [rotation, setRotation] = useState(0)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!DEV_ALWAYS_SHOW && sessionStorage.getItem(SESSION_KEY)) return
    const timer = setTimeout(() => {
      // Mark as shown immediately — a refresh or reopen this session must not show it again.
      // (Skipped entirely while DEV_ALWAYS_SHOW is on.)
      if (!DEV_ALWAYS_SHOW) sessionStorage.setItem(SESSION_KEY, 'shown')
      setStage('intro')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (stage === 'closed') {
      document.body.style.overflow = ''
      document.body.classList.remove('bmh-stw-open')
    } else {
      document.body.style.overflow = 'hidden'
      // The GHL chat widget renders a full-viewport hit area even while closed,
      // which sits above our modal and swallows clicks — suppress it while open.
      document.body.classList.add('bmh-stw-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('bmh-stw-open')
    }
  }, [stage])

  function handleClose() {
    setStage('closed')
  }

  function handleSpin() {
    const index = Math.floor(Math.random() * PRIZES.length)
    setTargetIndex(index)
    setStage('spinning')

    const sliceCenter = index * SLICE_ANGLE + SLICE_ANGLE / 2
    const jitter = Math.random() * (SLICE_ANGLE * 0.5) - SLICE_ANGLE * 0.25
    const spins = 6
    const target = spins * 360 + ((360 - sliceCenter + jitter) % 360)
    setRotation(target)
  }

  function handleWheelTransitionEnd() {
    if (stage !== 'spinning') return
    setConfetti(makeConfetti())
    setStage('result')
    const t = setTimeout(() => setStage('claim'), 1400)
    return () => clearTimeout(t)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (targetIndex === null) return
    setSubmitting(true)

    const entry = {
      ...form,
      prize: PRIZES[targetIndex].name,
      prizeValue: PRIZES[targetIndex].value,
      submittedAt: new Date().toISOString(),
      source: 'spin-to-win-popup',
    }

    // NOTE: no CRM/backend wired up yet — logging locally only for now.
    console.log('[Spin to Win] New prize claim (NOT sent anywhere real yet):', entry)

    await new Promise((r) => setTimeout(r, 500))
    setSubmitting(false)
    setStage('confirmed')
  }

  const prize = targetIndex !== null ? PRIZES[targetIndex] : null

  const slices = useMemo(
    () =>
      PRIZES.map((p, i) => {
        const start = i * SLICE_ANGLE
        const end = start + SLICE_ANGLE
        const center = start + SLICE_ANGLE / 2
        const labelPos = polarToCartesian(center, LABEL_RADIUS)
        const flip = center > 90 && center < 270
        const labelRotate = flip ? center + 180 : center
        return {
          path: describeSlice(start, end),
          fill: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-primary-active)',
          labelPos,
          labelRotate,
          name: p.name,
          value: p.value,
        }
      }),
    [],
  )

  if (stage === 'closed') return null

  return (
    <div
      className="bmh-stw-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Spin to win a prize"
    >
      <div className="bmh-stw-modal">
        <button
          type="button"
          className="bmh-stw-close"
          aria-label="Close"
          onClick={handleClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {(stage === 'intro' || stage === 'spinning') && (
          <>
            <div className="bmh-stw-head">
              <span className="bmh-eyebrow" style={{ color: 'var(--color-primary)' }}>
                Texas Homes Direct
              </span>
              <h2 className="bmh-stw-title">Spin to Win a Real Prize.</h2>
              <p className="bmh-stw-sub">Every spin wins — no exceptions.</p>
            </div>

            <div className="bmh-stw-wheel-wrap">
              <div className="bmh-stw-pointer" aria-hidden="true" />
              <div
                ref={wheelRef}
                className="bmh-stw-wheel"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
                onTransitionEnd={handleWheelTransitionEnd}
              >
                <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} width="100%" height="100%">
                  <circle cx={CENTER} cy={CENTER} r={RADIUS + 6} fill="var(--color-surface-dark)" />
                  {slices.map((s, i) => (
                    <path key={i} d={s.path} fill={s.fill} stroke="var(--color-on-primary)" strokeWidth="2" />
                  ))}
                  {slices.map((s, i) => (
                    <text
                      key={i}
                      x={s.labelPos.x}
                      y={s.labelPos.y}
                      transform={`rotate(${s.labelRotate} ${s.labelPos.x} ${s.labelPos.y})`}
                      textAnchor="middle"
                      fill="var(--color-on-primary)"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
                    >
                      <tspan x={s.labelPos.x} dy="-6" fontSize="12">
                        {s.name}
                      </tspan>
                      <tspan x={s.labelPos.x} dy="16" fontSize="10" opacity={0.85}>
                        {s.value}
                      </tspan>
                    </text>
                  ))}
                  <circle cx={CENTER} cy={CENTER} r={22} fill="var(--color-on-primary)" />
                  <circle cx={CENTER} cy={CENTER} r={22} fill="none" stroke="var(--color-primary)" strokeWidth="3" />
                </svg>
              </div>
            </div>

            <button
              type="button"
              className="bmh-btn bmh-btn-primary bmh-btn-lg bmh-stw-spin-btn"
              onClick={handleSpin}
              disabled={stage === 'spinning'}
            >
              {stage === 'spinning' ? 'Spinning…' : 'Spin to Win →'}
            </button>
          </>
        )}

        {stage === 'result' && prize && (
          <div className="bmh-stw-result">
            <div className="bmh-stw-confetti" aria-hidden="true">
              {confetti.map((c, i) => (
                <span
                  key={i}
                  style={{
                    left: `${c.left}%`,
                    animationDelay: `${c.delay}s`,
                    animationDuration: `${c.duration}s`,
                    background: c.color,
                    transform: `rotate(${c.rotate}deg)`,
                  }}
                />
              ))}
            </div>
            <span className="bmh-stw-glow" aria-hidden="true" />
            <span className="bmh-eyebrow" style={{ color: 'var(--color-primary)' }}>
              You won!
            </span>
            <h2 className="bmh-stw-title">{prize.name}</h2>
            <p className="bmh-stw-sub">{prize.value}</p>
          </div>
        )}

        {stage === 'claim' && prize && (
          <div className="bmh-stw-claim">
            <div className="bmh-stw-head">
              <span className="bmh-eyebrow" style={{ color: 'var(--color-primary)' }}>
                You won {prize.name}!
              </span>
              <h2 className="bmh-stw-title" style={{ fontSize: 26 }}>
                Let&rsquo;s get it to you.
              </h2>
              <p className="bmh-stw-sub">
                Tell us where to send the details — takes 10 seconds.
              </p>
            </div>

            <form className="bmh-stw-form" onSubmit={handleSubmit}>
              <div className="bmh-field">
                <label htmlFor="stw-name">Name</label>
                <input
                  id="stw-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="bmh-field">
                <label htmlFor="stw-phone">Phone</label>
                <input
                  id="stw-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 555-5555"
                />
              </div>
              <div className="bmh-field">
                <label htmlFor="stw-email">Email</label>
                <input
                  id="stw-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                className="bmh-btn bmh-btn-primary bmh-btn-lg"
                style={{ width: '100%' }}
                disabled={submitting}
              >
                {submitting ? 'Claiming…' : 'Claim My Prize →'}
              </button>
            </form>
          </div>
        )}

        {stage === 'confirmed' && prize && (
          <div className="bmh-stw-confirmed">
            <div className="bmh-stw-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="bmh-stw-title" style={{ fontSize: 26 }}>
              You&rsquo;re locked in for {prize.name}!
            </h2>
            <p className="bmh-stw-sub">
              Our team will reach out shortly to confirm details.
            </p>
            <p className="bmh-stw-finePrint">
              Valid at closing on qualifying home purchases. One offer per household.
              Our team will contact you to confirm details.
            </p>
            <button
              type="button"
              className="bmh-btn bmh-btn-secondary bmh-btn-lg"
              style={{ width: '100%' }}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
