'use client'

import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

/**
 * A link that fires a GA4 event on click (Land-Home Packages CTAs and the nav
 * tab). Internal hrefs use next/link; tel: and external links use <a>.
 */
export function trackLandHome(event: string, params: Record<string, string>) {
  try {
    sendGAEvent('event', event, params)
  } catch {
    /* analytics must never block navigation */
  }
}

export default function TrackedLink({
  href,
  event,
  params,
  className,
  style,
  external = false,
  children,
}: {
  href: string
  event: string
  params: Record<string, string>
  className?: string
  style?: CSSProperties
  external?: boolean
  children: ReactNode
}) {
  const onClick = () => trackLandHome(event, params)
  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={className} style={style} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
