import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blogPosts'
import BlogPostContent from './BlogPostContent'

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: { canonical: `https://texashomesdirect.com/blog/${post.slug}` },
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)
  return <BlogPostContent post={post} related={related} />
}
