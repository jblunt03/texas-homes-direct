import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Contact Us — Texas Homes Direct',
  description:
    "Drop us a note, give us a call, or stop by the lot. We answer the phone ourselves. Serving all of Texas.",
}

const FAQ_ITEMS = [
  {
    q: 'Do you really deliver to all of Texas?',
    a: 'Yes — every corner of the state. Our crews coordinate transport, blocking, leveling, tie-down, and skirting. You\'ll get a single delivered-and-set price with no surprise fees.',
  },
  {
    q: 'How long does it take from signing to move-in?',
    a: 'For homes already on our lot: typically 2–4 weeks once financing and land prep are sorted. For a custom factory order: 4–6 weeks depending on the model and the manufacturer\'s queue.',
  },
  {
    q: 'Do I need to own land before I can buy?',
    a: "No. We can finance the home alone, or as a land-and-home package. We can also help you scope out a piece of land before you commit if you'd like.",
  },
  {
    q: 'What credit score do I need to qualify?',
    a: 'We work with lenders that approve buyers with scores as low as 400 — sometimes lower with a co-signer or larger down payment. We don\'t pull your credit during pre-qualification, so you can find out where you stand without any impact to your score.',
  },
  {
    q: 'What about warranties and after-the-sale support?',
    a: "New homes carry the manufacturer's structural warranty (typically 1–2 years) plus appliance and systems coverage. We handle warranty claims for you for the life of the home — call us, not the factory.",
  },
]

const CONTACT_TILES = [
  {
    href: 'tel:+18303811309',
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    ),
    heading: 'Call us',
    detail: '(830) 381-1309',
    detailSize: 28,
    sub: 'Mon–Sat, 8:00 AM–6:00 PM CST',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-split" style={{ alignItems: 'center' }}>
            <div>
              <span className="bmh-eyebrow">Get in touch</span>
              <h1>
                Let&rsquo;s find your
                <br />
                <em>forever home.</em>
              </h1>
              <p className="bmh-lead">
                Whether you&rsquo;ve already picked out a floor plan or you&rsquo;re just kicking the
                tires — drop us a note or give us a call. We answer the phone, and
                we answer it ourselves.
              </p>
              <div className="bmh-spacer-md" />
              <a
                href={CONTACT_TILES[0].href}
                className="bmh-card-canvas"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  maxWidth: 280,
                }}
              >
                <span className="bmh-feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {CONTACT_TILES[0].icon}
                  </svg>
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 18,
                    color: 'var(--color-ink)',
                    margin: 0,
                  }}
                >
                  {CONTACT_TILES[0].heading}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: CONTACT_TILES[0].detailSize,
                    letterSpacing: '-0.3px',
                    color: 'var(--color-ink)',
                    margin: 0,
                  }}
                >
                  {CONTACT_TILES[0].detail}
                </p>
                <p className="bmh-caption bmh-muted" style={{ margin: 0 }}>
                  {CONTACT_TILES[0].sub}
                </p>
              </a>
            </div>
            <div className="bmh-lifestyle-photo bmh-ratio-4x3" style={{ position: 'relative' }}>
              <Image
                src="/homes/the-pronghorn/Image.jpeg"
                alt="Texas Homes Direct manufactured home exterior on a Texas lot"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 960px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORM + MAP SPLIT */}
      <section className="bmh-section" style={{ background: 'var(--color-canvas)' }}>
        <div className="bmh-container">
          <div className="bmh-split" style={{ alignItems: 'flex-start' }}>
            {/* LEFT: form */}
            <div>
              <span className="bmh-eyebrow">Send us a note</span>
              <div className="bmh-spacer-sm" />
              <h2>
                Tell us what you&rsquo;re
                <br />
                looking for.
              </h2>
              <div className="bmh-spacer-md" />
              <p className="bmh-lead">
                Quick questions about a listing, financing, or scheduling a visit — drop a line and
                we&rsquo;ll get back the same day, often within the hour.
              </p>
              <div className="bmh-spacer-lg" />
              <ContactForm />
            </div>

            {/* RIGHT: hours */}
            <div>
              <div className="bmh-card" style={{ padding: 28 }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 18,
                    color: 'var(--color-ink)',
                    marginBottom: 16,
                  }}
                >
                  Hours
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '12px 20px',
                    font: 'var(--type-body-sm)',
                  }}
                >
                  <span className="bmh-muted">Mon–Fri</span>
                  <span>8:00 AM – 6:00 PM</span>
                  <span className="bmh-muted">Saturday</span>
                  <span>9:00 AM – 5:00 PM</span>
                  <span className="bmh-muted">Sunday</span>
                  <span>By appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bmh-section bmh-surface-card">
        <div className="bmh-container-narrow">
          <div className="bmh-section-head" style={{ marginBottom: 32 }}>
            <h2>
              Common <em>questions.</em>
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} defaultOpen={0} />
        </div>
      </section>
    </>
  )
}
