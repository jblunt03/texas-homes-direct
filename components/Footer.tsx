import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bmh-footer">
      <div className="bmh-container">
        <div className="bmh-footer-grid">
          {/* Brand intro */}
          <div className="bmh-footer-intro">
            <Link href="/" className="bmh-brand" aria-label="Texas Homes Direct home">
              <span className="bmh-brand-mark">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 11 L12 3 L21 11 V20 A1 1 0 0 1 20 21 H4 A1 1 0 0 1 3 20 Z"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21 V14 H15 V21"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="bmh-brand-name bmh-brand-name-light">
                Texas <em>Homes</em> Direct
              </span>
            </Link>
            <p>
              A small, family-owned, faith-based business. Quality manufactured
              homes at the best prices in Texas, New Mexico, and Oklahoma —
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
            <Link href="/browse?type=used">Used homes</Link>
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
          <span>Serving Texas · New Mexico · Oklahoma</span>
        </div>
      </div>
    </footer>
  )
}
