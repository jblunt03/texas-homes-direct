import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blogPosts'
import BlogClient, { type BlogCat, type BlogPostItem } from './BlogClient'

const TITLE = "Buyer's Blog | Texas Homes Direct"
const DESCRIPTION =
  'Plain-language guides on financing, floor plans, land prep, and delivery for manufactured home buyers in Texas.'
const CANONICAL = 'https://www.texashomesdirect.com/blog'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'Texas Homes Direct',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

// Presentation-only metadata for the list page (category + placeholder image
// label). Title/excerpt/readTime are NOT duplicated here — they're derived
// from lib/blogPosts.ts below, which is the single source of truth for
// actual post content. Add an entry here when a new post needs a category
// or placeholder label; add the post itself to lib/blogPosts.ts.
const LIST_META: Record<string, { cat: BlogCat; catLabel: string; phLabel: string; featured?: boolean }> = {
  'how-to-finance-mobile-home-on-family-land-texas': {
    cat: 'financing',
    catLabel: 'Financing',
    phLabel: 'Land-in-lieu financing illustration',
    featured: true,
  },
  'what-is-sb-785-texas-mobile-home': {
    cat: 'financing',
    catLabel: 'Financing',
    phLabel: 'Texas legal document with property illustration',
  },
  'hud-vs-state-certified-texas': {
    cat: 'buying',
    catLabel: 'First-time buyers',
    phLabel: 'Close-up of HUD certification label on manufactured home',
  },
  'how-to-put-a-mobile-home-on-your-land-in-texas': {
    cat: 'land',
    catLabel: 'Land & permits',
    phLabel: 'Land with survey stakes and manufactured home being set',
  },
  'site-prep-costs-texas-well-septic-electric': {
    cat: 'land',
    catLabel: 'Land & permits',
    phLabel: 'Well drilling rig on Texas property',
  },
  'how-manufactured-home-delivery-is-priced-in-texas': {
    cat: 'delivery',
    catLabel: 'Delivery & setup',
    phLabel: 'Delivery priced per mile across Texas',
  },
  'how-long-manufactured-home-delivery-and-setup-take-in-texas': {
    cat: 'delivery',
    catLabel: 'Delivery & setup',
    phLabel: 'Delivery and setup timing in Texas',
  },
  'single-wide-vs-double-wide-texas': {
    cat: 'floorplans',
    catLabel: 'Floor plans',
    phLabel: 'One section beside two sections joined on site',
  },
  'what-to-check-on-texas-land-before-a-manufactured-home': {
    cat: 'land',
    catLabel: 'Land & permits',
    phLabel: 'Land checks before a manufactured home in Texas',
  },
  'how-to-prepare-for-manufactured-home-delivery-day-in-texas': {
    cat: 'delivery',
    catLabel: 'Delivery & setup',
    phLabel: 'A clear route onto the property before delivery',
  },
}

const POSTS: BlogPostItem[] = blogPosts.map((post) => {
  const meta = LIST_META[post.slug]
  if (!meta) {
    throw new Error(`Missing LIST_META entry for blog post "${post.slug}" in app/blog/page.tsx`)
  }
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime,
    cat: meta.cat,
    catLabel: meta.catLabel,
    phLabel: meta.phLabel,
    featured: meta.featured,
  }
})

export default function BlogPage() {
  return <BlogClient posts={POSTS} />
}
