'use client'

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { PAYMENT_DISCLOSURE } from '@/lib/disclaimers'

/**
 * A monthly payment figure with its required "est." label and info button:
 *   $950/mo est. (i)
 * Every monthly payment on the site renders through this component — see
 * CLAUDE.md "Estimated payment disclosure". validate_batch.py fails on any
 * "$N/mo" in rendered HTML that isn't wrapped by it.
 *
 * The button opens a dialog (portaled to <body>, so overflow:hidden cards
 * can't clip it). It closes on Esc, on a tap outside, and with its Close
 * button, then returns focus to the info button. Cards that contain this are
 * NOT wrapped in <a> — they use a stretched title link — so the button is
 * never nested inside a link; the click is also stopped for safety.
 */
export default function PaymentEstimate({
  amount,
  children,
  className,
}: {
  amount: number
  children?: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogId = useId()
  const titleId = `${dialogId}-title`

  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <span className={`bmh-pay${className ? ` ${className}` : ''}`} data-pay="">
      <span className="bmh-pay-amount">{children ?? `$${amount.toLocaleString()}/mo`}</span>{' '}
      <span className="bmh-pay-est">{PAYMENT_DISCLOSURE.label}</span>
      <button
        ref={buttonRef}
        type="button"
        className="bmh-pay-info"
        aria-label="About this estimated payment"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="7.5" r="1.3" fill="currentColor" />
        </svg>
      </button>
      {open &&
        createPortal(
          <div
            className="bmh-pay-backdrop"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <div
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="bmh-pay-dialog"
            >
              <h2 id={titleId} className="bmh-pay-dialog-title">
                {PAYMENT_DISCLOSURE.title}
              </h2>
              <p className="bmh-pay-dialog-body">{PAYMENT_DISCLOSURE.body}</p>
              <button ref={closeRef} type="button" className="bmh-btn bmh-btn-secondary" onClick={close}>
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </span>
  )
}
