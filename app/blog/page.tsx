import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blogPosts'
import BlogClient, { type BlogCat, type BlogPostItem } from './BlogClient'

export const metadata: Metadata = {
  title: "Buyer's Blog — Texas Homes Direct",
  description:
    'Plain-language guides on financing, floor plans, land prep, and delivery for manufactured home buyers in Texas.',
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
