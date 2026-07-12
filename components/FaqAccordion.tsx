'use client'
import { useState } from 'react'

export interface FaqItem {
  q: string
  a: string
}

export default function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FaqItem[]
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          className={`bmh-faq-item${open === i ? ' bmh-is-open' : ''}`}
        >
          <div
            className="bmh-faq-q"
            onClick={() => setOpen(open === i ? null : i)}
            role="button"
            aria-expanded={open === i}
          >
            {item.q}
            <span className="bmh-faq-toggle" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </div>
          <div className="bmh-faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  )
}
