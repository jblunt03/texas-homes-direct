import { MetadataRoute } from 'next'
import { sampleListings } from '@/lib/sampleListings'
import { blogPosts } from '@/lib/blogPosts'
import { teamMembers } from '@/lib/teamMembers'

const cities = [
  'san-antonio',
  'houston',
  'dallas',
  'austin',
  'laredo',
  'mcallen',
  'corpus-christi',
  'el-paso',
  'lubbock',
  'amarillo',
  'tyler',
  'waco',
  'victoria',
  'alice',
  'pleasanton',
  'seguin',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://texashomesdirect.com'
  const staticPages = [
    '',
    'browse',
    'advisor',
    'calculator',
    'locations',
    'commercial',
    'about',
    'contact',
    'blog',
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
  const locationPages = cities.map((c) => ({
    url: `${base}/locations/${c}`,
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
  const teamPages = teamMembers.map((m) => ({
    url: `${base}/about/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  return [...staticPages, ...listings, ...locationPages, ...blogPages, ...teamPages]
}
