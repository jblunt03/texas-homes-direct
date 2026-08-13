import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bmh-footer">
      <div className="bmh-container">
        <div className="bmh-footer-grid">
          {/* Brand intro */}
          <div className="bmh-footer-intro">
            <Link
              href="/"
              className="bmh-brand"
              aria-label="Texas Homes Direct home"
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '10px 16px',
                display: 'inline-flex',
              }}
            >
              <Image
                src="/brand/logo.png"
                alt="Texas Homes Direct"
                width={220}
                height={220}
                style={{ height: 64, width: 'auto' }}
              />
            </Link>
            <p>
              A small, family-owned, faith-based business. Quality manufactured
              homes at the best prices in Texas —
              delivered, set up, and ready for keys.
            </p>
            <div className="bmh-spacer-md" />
            <a
              href="tel:+18303811309"
              className="bmh-btn bmh-btn-primary bmh-btn-sm"
            >
              (830) 381-1309
            </a>
          </div>

          {/* Shop */}
          <div>
            <h5>Shop</h5>
            <Link href="/browse?type=single">Singlewides</Link>
            <Link href="/browse?type=double">Doublewides</Link>
          </div>

          {/* Buy */}
          <div>
            <h5>Buy</h5>
            <Link href="/calculator">Financing</Link>
            <Link href="/blog">Blog &amp; guides</Link>
            <Link href="/testimonials">Reviews</Link>
            <Link href="/contact">Contact us</Link>
          </div>

          {/* Company */}
          <div>
            <h5>Company</h5>
            <Link href="/about">About us</Link>
            <Link href="/contact">Service area</Link>
            <a href="tel:+18303811309">(830) 381-1309</a>
          </div>
        </div>

        {/* Mega mark */}
        <div className="bmh-footer-mega-mark">
          Texas <em>Homes</em> Direct
        </div>

        {/* Bottom bar */}
        <div className="bmh-footer-bottom">
          <span>© {year} Texas Homes Direct. All rights reserved.</span>
          <span>Serving all of Texas</span>
          <Link href="/blog" className="bmh-pill bmh-pill-static">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  )
}
