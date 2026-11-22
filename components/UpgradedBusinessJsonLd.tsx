import { UPGRADED_BUSINESS_JSON_LD } from '@/lib/businessSchema'

export default function UpgradedBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(UPGRADED_BUSINESS_JSON_LD) }}
    />
  )
}
