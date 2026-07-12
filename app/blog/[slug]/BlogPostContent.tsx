'use client'
import Link from 'next/link'
import { BlogPost } from '@/lib/blogPosts'
import { useLang } from '@/components/LanguageContext'
import LeadForm from '@/components/LeadForm'

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
  related: BlogPost[]
}) {
  const { t, lang } = useLang()
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

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
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-sm font-semibold text-gold-700 hover:text-gold"
          >
            ← {lang === 'es' ? 'Volver al Blog' : 'Back to Blog'}
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
            title={
              lang === 'es'
                ? '¿Listo para encontrar tu casa? Habla con Justin.'
                : 'Ready to find your home? Talk to Justin.'
            }
            source={`blog-${post.slug}`}
          />
        </div>
      </section>
    </>
  )
}
