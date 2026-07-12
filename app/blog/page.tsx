import type { Metadata } from 'next'
import BlogClient, { type BlogPostItem } from './BlogClient'

export const metadata: Metadata = {
  title: "Buyer's Blog — Texas Homes Direct",
  description:
    'Plain-language guides on financing, floor plans, land prep, and delivery for manufactured home buyers in Texas, New Mexico, and Oklahoma.',
}

const POSTS: BlogPostItem[] = [
  {
    slug: 'how-to-finance-mobile-home-on-family-land-texas',
    title: 'How to finance a mobile home on family land in Texas.',
    excerpt:
      'Land-in-lieu, chattel, SB 785 conversion — the real financing playbook for Texas families who already own land.',
    readTime: '9 min',
    cat: 'financing',
    catLabel: 'Financing',
    phLabel: 'Land-in-lieu financing illustration',
  },
  {
    slug: 'what-is-sb-785-texas-mobile-home',
    title: 'What is SB 785 and why it matters for Texas mobile home buyers.',
    excerpt:
      'The 2011 Texas law that lets you convert your manufactured home to real property — and unlock 30-year mortgage rates instead of chattel rates.',
    readTime: '6 min',
    cat: 'financing',
    catLabel: 'Financing',
    phLabel: 'Texas legal document with property illustration',
  },
  {
    slug: 'hud-vs-state-certified-texas',
    title: 'HUD vs state certified: what Texas buyers need to know.',
    excerpt:
      'The red HUD label is the line between a financeable home and a cash-only project. Here is what to check before you fall in love with a listing.',
    readTime: '5 min',
    cat: 'buying',
    catLabel: 'First-time buyers',
    phLabel: 'Close-up of HUD certification label on manufactured home',
  },
  {
    slug: 'how-to-put-a-mobile-home-on-your-land-in-texas',
    title: 'How to put a mobile home on your land in Texas — step by step.',
    excerpt:
      'Permits, foundations, utilities, and the real timeline. Every step in order, with Texas-specific numbers from real installs.',
    readTime: '8 min',
    cat: 'land',
    catLabel: 'Land & permits',
    phLabel: 'Land with survey stakes and manufactured home being set',
  },
  {
    slug: 'site-prep-costs-texas-well-septic-electric',
    title: 'Site prep costs in Texas: well, septic, and electric explained.',
    excerpt:
      'Real numbers for the three biggest hidden costs of putting a manufactured home on raw Texas land — broken down by region.',
    readTime: '7 min',
    cat: 'land',
    catLabel: 'Land & permits',
    phLabel: 'Well drilling rig on Texas property',
  },
]

export default function BlogPage() {
  return <BlogClient posts={POSTS} />
}
