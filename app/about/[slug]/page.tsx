import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { teamMembers } from '@/lib/teamMembers'

export async function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const member = teamMembers.find((m) => m.slug === params.slug)
  if (!member) return { title: 'Team Member Not Found' }
  return {
    title: `${member.name} — Texas Homes Direct`,
    description: member.bio,
  }
}

export default function TeamMemberPage({
  params,
}: {
  params: { slug: string }
}) {
  const member = teamMembers.find((m) => m.slug === params.slug)
  if (!member) notFound()

  return (
    <section className="bmh-page-header" style={{ background: 'var(--color-canvas)' }}>
      <div className="bmh-container">
        <Link
          href="/about"
          className="bmh-caption"
          style={{ color: 'var(--color-primary)', fontWeight: 600 }}
        >
          ← Back to the team
        </Link>

        <div className="bmh-spacer-lg" />

        <div className="bmh-split-6-5">
          <div
            className="bmh-ph bmh-ratio-1x1"
            style={{ borderRadius: '50%', maxWidth: 280, margin: '0 auto' }}
          >
            <span className="bmh-ph-label">Headshot</span>
          </div>
          <div>
            <span className="bmh-eyebrow">{member.role}</span>
            <div className="bmh-spacer-sm" />
            <h1>{member.name}</h1>
            <div className="bmh-spacer-md" />
            <p className="bmh-lead">{member.bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
