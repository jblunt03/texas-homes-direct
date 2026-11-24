import type { Metadata } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/components/LanguageContext'
import { UPGRADED_BUSINESS_JSON_LD, usesUpgradedBusinessSchema } from '@/lib/businessSchema'
import { PRICE_MODE_BOOT_SCRIPT } from '@/lib/priceMode'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.texashomesdirect.com'),
  title: {
    default:
      'Texas Homes Direct | Manufactured Homes for Sale in Texas',
    template: '%s | Texas Homes Direct',
  },
  description:
    "Texas's most transparent manufactured home marketplace. Browse manufactured homes, get real financing numbers, and talk to Justin — no dealership pressure.",
  keywords: [
    'manufactured homes Texas',
    'mobile homes for sale Texas',
    'Clayton homes Texas',
    'manufactured home financing Texas',
    'San Antonio mobile homes',
    'Houston mobile homes',
  ],
  authors: [{ name: 'Justin' }],
  openGraph: {
    title: 'Texas Homes Direct | Manufactured Homes for Sale in Texas',
    description:
      "Texas's most transparent manufactured home marketplace. Real homes. Real numbers. Real talk.",
    url: 'https://www.texashomesdirect.com',
    siteName: 'Texas Homes Direct',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Homes Direct',
    description: 'Texas manufactured homes. Real numbers. No pressure.',
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.texashomesdirect.com/#business',
  name: 'Texas Homes Direct',
  description:
    "Texas's most transparent manufactured home marketplace. Owned and operated by Justin.",
  url: 'https://www.texashomesdirect.com',
  telephone: '+1-830-381-1309',
  priceRange: '$$',
  areaServed: { '@type': 'State', name: 'Texas' },
  founder: { '@type': 'Person', name: 'Justin' },
  // Real profile URLs only — this disambiguates Texas Homes Direct from
  // similarly-named businesses to AI/search engines. Never fill with a
  // guessed or unverified link.
  sameAs: [
    'https://www.facebook.com/profile.php?id=61593330354434',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '20:00',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // One business block per page. Upgraded routes replace this script;
  // `/` and every other route keep the object above, unchanged.
  const pathname = headers().get('x-pathname') ?? '/'
  const businessJsonLd = usesUpgradedBusinessSchema(pathname)
    ? UPGRADED_BUSINESS_JSON_LD
    : localBusinessJsonLd

  return (
    // suppressHydrationWarning: the boot script below may add data-price-mode
    // to <html> before React hydrates (CLAUDE.md "Cash price").
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the visitor's saved price mode before first paint, so cards never flip after load. */}
        <script dangerouslySetInnerHTML={{ __html: PRICE_MODE_BOOT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessJsonLd),
          }}
        />
        <LanguageProvider>
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </LanguageProvider>
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a357d115dcabc40b57cbf34"
          strategy="afterInteractive"
        />
      </body>
      <GoogleAnalytics gaId="G-TEY2WEP5QP" />
    </html>
  )
}
