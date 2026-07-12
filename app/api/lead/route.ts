import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const webhookUrl = process.env.GHL_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ ok: false, error: 'Webhook URL not configured' }, { status: 500 })
    }
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `GHL responded with ${res.status}` },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
