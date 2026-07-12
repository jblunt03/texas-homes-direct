'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Inventory' },
  { href: '/calculator', label: 'Financing' },
  { href: '/blog', label: 'Blog' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bmh-nav">
      <div className="bmh-container bmh-nav-inner">
        {/* Brand */}
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
          <span className="bmh-brand-name">
            Texas <em>Homes</em> Direct
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="bmh-nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'bmh-is-active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA area */}
        <div className="bmh-nav-cta">
          <a href="tel:+18303811309" className="bmh-nav-phone">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
            </svg>
            (830) 381-1309
          </a>
          <Link href="/contact" className="bmh-btn bmh-btn-dark bmh-btn-sm">
            Contact us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="bmh-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`bmh-mobile-menu${menuOpen ? ' bmh-is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
        <div className="bmh-mobile-cta">
          <a
            href="tel:+18303811309"
            className="bmh-btn bmh-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Call (830) 381-1309
          </a>
        </div>
      </div>
    </header>
  )
}
