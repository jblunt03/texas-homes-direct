import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/components/LanguageContext'

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
  alternates: {
    canonical: 'https://www.texashomesdirect.com',
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
    'https://www.google.com/maps/place/Texas+Homes+Direct/@30.998505,-110.7156328,5z/data=!4m7!3m6!1s0x4e3ba62879afeaf7:0x6eddce7a32c31cdf!8m2!3d31.4197143!4d-100.0768425!16s%2Fg%2F11zdf35szd',
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
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
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
    </html>
  )
}
