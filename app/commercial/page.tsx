import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial — Texas Homes Direct',
  description:
    'Commercial manufactured housing solutions from Texas Homes Direct — for developers, landowners, and businesses across Texas.',
}

export default function CommercialPage() {
  return (
    <section
      className="bmh-page-header"
      style={{ background: 'var(--color-canvas)', minHeight: '60vh' }}
    >
      <div className="bmh-container">
        <span className="bmh-eyebrow">Coming soon</span>
        <h1>
          Commercial <em>solutions.</em>
        </h1>
        <p className="bmh-lead">
          We&rsquo;re building out our commercial offering for developers, landowners, and
          businesses across Texas. In the meantime, reach out and we&rsquo;ll talk through
          what you need.
        </p>
        <div className="bmh-spacer-md" />
        <Link href="/contact" className="bmh-btn bmh-btn-primary bmh-btn-lg">
          Talk to us →
        </Link>
      </div>
    </section>
  )
}
