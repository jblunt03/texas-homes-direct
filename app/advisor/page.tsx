import { notFound } from 'next/navigation'

// /advisor is temporarily taken offline (returns 404) while the AI advisor
// is on hold. The component (components/ChatInterface.tsx) and API route
// (app/api/chat/route.ts) are left in place — to bring the page back,
// restore the ChatInterface render below and re-add the nav/footer/CTA
// links that were removed when this was disabled.
export default function AdvisorPage() {
  notFound()
}
