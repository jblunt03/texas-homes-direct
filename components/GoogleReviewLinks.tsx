import { GOOGLE_REVIEW_URL } from '@/lib/businessSchema'

/**
 * Official Google review link only. No review text, rating, or
 * Review / AggregateRating schema, and no Maps URL.
 */
export default function GoogleReviewLinks() {
  return (
    <section className="bmh-surface-card" style={{ padding: '32px 0' }}>
      <div className="bmh-container">
        <h2 className="bmh-city-h2">Google reviews</h2>
        <p className="bmh-lead" style={{ marginTop: 12 }}>
          Read reviews on the Texas Homes Direct Google Business Profile, or leave one if you have worked with us.
        </p>
        <div className="bmh-spacer-md" />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bmh-btn bmh-btn-secondary"
          >
            Leave a Google review
          </a>
        </div>
      </div>
    </section>
  )
}
