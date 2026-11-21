import { LLMS_TXT } from '@/lib/llmsTxt'

// Built at deploy time from lib/llmsTxt.ts (see there for why it isn't a
// static file in public/ any more).
export const dynamic = 'force-static'

export function GET() {
  return new Response(LLMS_TXT, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
