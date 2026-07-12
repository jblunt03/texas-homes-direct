import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('[Lead]', JSON.stringify(body))
  const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          timestamp: new Date().toISOString(),
          source: body.source || 'website',
        }),
      })
    } catch (e) {
      console.error('[Lead webhook error]', e)
    }
  }
  return NextResponse.json({ success: true })
}
