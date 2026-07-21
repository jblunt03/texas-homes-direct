import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Locations — Texas Homes Direct',
  description:
    'Where Texas Homes Direct delivers and sets up manufactured homes across Texas, New Mexico, and Oklahoma.',
}

export default function LocationsPage() {
  return (
    <section
      className="bmh-page-header"
      style={{ background: 'var(--color-canvas)', minHeight: '60vh' }}
    >
      <div className="bmh-container">
        <span className="bmh-eyebrow">Coming soon</span>
        <h1>
          Find us <em>near you.</em>
        </h1>
        <p className="bmh-lead">
          We&rsquo;re building out a full map of the cities and regions we serve across Texas,
          New Mexico, and Oklahoma. In the meantime, reach out and we&rsquo;ll tell you exactly
          what we can do in your area.
        </p>
        <div className="bmh-spacer-md" />
        <Link href="/contact" className="bmh-btn bmh-btn-primary bmh-btn-lg">
          Talk to us →
        </Link>
      </div>
    </section>
  )
}
