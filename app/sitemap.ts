import { MetadataRoute } from 'next'
import { sampleListings } from '@/lib/sampleListings'
import { blogPosts } from '@/lib/blogPosts'
import { publishedCities } from '@/lib/cities'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.texashomesdirect.com'
  const staticPages = [
    '',
    'browse',
    'calculator',
    'cities',
    'commercial',
    'contact',
    'blog',
    'manufactured-vs-mobile-home',
    'how-pricing-works',
    'whats-included-in-setup',
  ].map((p) => ({
    url: p ? `${base}/${p}` : base,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }))
  const listings = sampleListings.map((l) => ({
    url: `${base}/homes/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  // Driven by publishedCities() so a new city page appears here automatically
  // the moment its `published` flag flips to true in lib/cities.ts.
  const cityPages = publishedCities().map((c) => ({
    url: `${base}/mobile-homes-${c.slug}-tx`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))
  const blogPages = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...staticPages, ...listings, ...cityPages, ...blogPages]
}
