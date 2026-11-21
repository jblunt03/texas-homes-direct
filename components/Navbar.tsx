'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { isArchivedPath } from '@/lib/archived'
import { LAND_HOME_PACKAGES } from '@/lib/features'
import { LAND_HOME_HUB_PATH } from '@/lib/packages'
import { trackLandHome } from '@/components/landHome/TrackedLink'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Inventory' },
  // Behind lib/features.json "landHomePackages" (CLAUDE.md "Land-Home Packages").
  ...(LAND_HOME_PACKAGES ? [{ href: LAND_HOME_HUB_PATH, label: 'Land-Home Packages' }] : []),
  { href: '/cities', label: 'Cities We Serve' },
  { href: '/calculator', label: 'Free Pre-Approval' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/commercial', label: 'Commercial' },
].filter((link) => !isArchivedPath(link.href)) // see lib/archived.ts

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    // bmh-nav-lh: the extra tab needs tighter spacing at 961–1180px (app/globals.css).
    <header className={LAND_HOME_PACKAGES ? 'bmh-nav bmh-nav-lh' : 'bmh-nav'}>
      <div className="bmh-container bmh-nav-inner">
        {/* Brand */}
        <Link href="/" className="bmh-brand" aria-label="Texas Homes Direct home">
          <Image
            src="/brand/logo.png"
            alt="Texas Homes Direct"
            width={220}
            height={220}
            priority
            style={{ height: 124, width: 'auto' }}
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="bmh-nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || (link.href === LAND_HOME_HUB_PATH && pathname.startsWith(LAND_HOME_HUB_PATH)) ? 'bmh-is-active' : ''}
              onClick={link.href === LAND_HOME_HUB_PATH ? () => trackLandHome('land_home_nav_click', { placement: 'header' }) : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA area */}
        <div className="bmh-nav-cta">
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
            onClick={() => {
              if (link.href === LAND_HOME_HUB_PATH) trackLandHome('land_home_nav_click', { placement: 'mobile_menu' })
              setMenuOpen(false)
            }}
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
