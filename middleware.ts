import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Canonical host. Apex and http requests that reach this app 301 here in
// one hop. Vercel’s domain settings currently 308 the apex before the app
// runs, so those hops are not replaced until that dashboard redirect is
// changed. This file does not touch DNS or domain settings.
const CANONICAL_HOST = 'www.texashomesdirect.com'
const PRODUCTION_HOSTS = new Set(['texashomesdirect.com', CANONICAL_HOST])

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.replace(/\/+$/, '') || '/'
  return pathname
}

export function middleware(request: NextRequest) {
  const method = request.method
  if (method === 'GET' || method === 'HEAD') {
    const hostHeader = (request.headers.get('host') || '').toLowerCase()
    const host = hostHeader.split(':')[0]
    const forwarded = (request.headers.get('x-forwarded-proto') || '')
      .split(',')[0]
      .trim()
      .toLowerCase()
    const proto = forwarded || request.nextUrl.protocol.replace(':', '')
    const pathname = request.nextUrl.pathname
    const slash = pathname.length > 1 && pathname.endsWith('/')
    // Homepage "/" and "https://host" are the same request path, so a
    // trailing-slash homepage cannot be told apart here.
    if (PRODUCTION_HOSTS.has(host)) {
      const needsHost = host !== CANONICAL_HOST || proto !== 'https'
      if (needsHost || slash) {
        const dest = request.nextUrl.clone()
        dest.protocol = 'https'
        dest.hostname = CANONICAL_HOST
        dest.port = ''
        dest.pathname = stripTrailingSlash(pathname)
        return NextResponse.redirect(dest, 301)
      }
    } else if (slash) {
      const dest = request.nextUrl.clone()
      dest.pathname = stripTrailingSlash(pathname)
      return NextResponse.redirect(dest, 301)
    }
  }

  // The root layout picks one business JSON-LD block from this path.
  // Static files, including the IndexNow key, are left alone.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)'],
}
