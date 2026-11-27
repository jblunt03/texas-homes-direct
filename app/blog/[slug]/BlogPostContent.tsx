'use client'
import Link from 'next/link'
import { BlogPost } from '@/lib/blogPosts'
import { useLang } from '@/components/LanguageContext'
import FaqAccordion from '@/components/FaqAccordion'
import LeadForm from '@/components/LeadForm'
import { withFaqHtml } from '@/lib/flaggedCopy'

const SITE = 'https://www.texashomesdirect.com'

function renderMarkdown(md: string): string {
  // very light markdown: ## headers, **bold**, paragraphs, lists
  const lines = md.split('\n')
  let html = ''
  let inList = false
  let listType: 'ul' | 'ol' | null = null
  const closeList = () => {
    if (inList && listType) {
      html += `</${listType}>`
      inList = false
      listType = null
    }
  }

  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
        '<a class="text-gold-700 font-semibold" href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      .replace(
        /\[([^\]]+)\]\((\/[^)\s]*)\)/g,
        '<a class="text-gold-700 font-semibold" href="$2">$1</a>',
      )

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      closeList()
      continue
    }
    if (line.startsWith('## ')) {
      closeList()
      html += `<h2>${inline(line.slice(3))}</h2>`
    } else if (line.startsWith('### ')) {
      closeList()
      html += `<h3>${inline(line.slice(4))}</h3>`
    } else if (/^[-*] /.test(line)) {
      if (!inList || listType !== 'ul') {
        closeList()
        html += '<ul>'
        inList = true
        listType = 'ul'
      }
      html += `<li>${inline(line.replace(/^[-*] /, ''))}</li>`
    } else if (/^\d+\.\s/.test(line)) {
      if (!inList || listType !== 'ol') {
        closeList()
        html += '<ol>'
        inList = true
        listType = 'ol'
      }
      html += `<li>${inline(line.replace(/^\d+\.\s/, ''))}</li>`
    } else {
      closeList()
      html += `<p>${inline(line)}</p>`
    }
  }
  closeList()
  return html
}

export default function BlogPostContent({
  post,
  related,
}: {
  post: BlogPost
  related: Pick<BlogPost, 'slug' | 'title' | 'excerpt'>[]
}) {
  const { t } = useLang()
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  const pageUrl = `${SITE}/blog/${post.slug}`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  }
  const faqSchema = post.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

  const articleImage = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${SITE}${post.image}`
    : undefined
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Texas Homes Direct',
    },
    description: post.excerpt,
    ...(articleImage
      ? { url: pageUrl, dateModified: post.date, image: articleImage }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-navy/70">
            <Link href="/" className="font-semibold text-gold-700 hover:text-gold">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/blog" className="font-semibold text-gold-700 hover:text-gold">Blog</Link>
            <span aria-hidden="true"> / </span>
            <span>{post.title}</span>
          </nav>
          <Link
            href="/blog"
            className="mt-3 inline-block text-sm font-semibold text-gold-700 hover:text-gold"
          >
            ← Back to Blog
          </Link>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-navy/70">
            <span>
              {t.blog.by} <strong className="text-navy">{post.author}</strong>
            </span>
            <span>·</span>
            <span>{fmtDate(post.date)}</span>
            <span>·</span>
            <span>
              {post.readTime} {t.blog.readTime}
            </span>
          </div>

          <div
            className="prose-article mt-10"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
          {post.faq && post.faq.length > 0 && (
            <div className="bmh-faq-speakable mt-10">
              <h2 className="font-display text-2xl font-bold text-navy">Frequently asked questions</h2>
              <FaqAccordion items={withFaqHtml(post.faq)} defaultOpen={0} />
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-navy-50 py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-navy">
              {t.blog.related}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block rounded-xl bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <p className="font-display text-base font-bold text-navy">
                    {r.title}
                  </p>
                  <p className="mt-2 text-sm text-navy/70">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <LeadForm
            title="Ready to find your home? Talk to Justin."
            source={`blog-${post.slug}`}
          />
        </div>
      </section>
    </>
  )
}
