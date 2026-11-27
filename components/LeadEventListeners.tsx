'use client'

import { useEffect } from 'react'
import {
  BUSINESS_PHONE,
  CHAT_WIDGET_ID,
  CIRRUS_HOST,
  GA_MEASUREMENT_ID,
  pageContext,
  trackEvent,
} from '@/lib/analytics'

/**
 * Sitewide lead events. No visible UI.
 *
 * chat_start: once per path per tab session, when the visitor opens the
 * LeadConnector widget. The launcher is a <chat-widget> custom element
 * (often in shadow DOM), so a document click only sees the host. A
 * leadconnectorhq.com postMessage that names an open, or a chat iframe
 * that grows from a bubble into a panel, counts as the same open.
 * Reloading the same path does not send a second event.
 */
export default function LeadEventListeners() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('debug') === '1') {
      const enable = () => {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
        if (typeof gtag === 'function') {
          gtag('config', GA_MEASUREMENT_ID, { debug_mode: true })
        }
      }
      enable()
      const timer = window.setInterval(enable, 400)
      window.setTimeout(() => window.clearInterval(timer), 4000)
    }

    const chatKey = `thd-chat-start:${window.location.pathname}`

    function fireChatStart() {
      try {
        if (sessionStorage.getItem(chatKey)) return
        sessionStorage.setItem(chatKey, '1')
      } catch {
        return
      }
      trackEvent('chat_start', {
        widget_id: CHAT_WIDGET_ID,
        ...pageContext(),
      })
    }

    function onClick(event: MouseEvent) {
      const path = event.composedPath()
      const link = path.find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement)
      if (link) {
        const href = link.getAttribute('href') || ''
        if (href.toLowerCase().startsWith('tel:')) {
          const normalized = href.replace(/^tel:/i, '').split('?')[0].replace(/[^\d+]/g, '')
          const digits = normalized.replace(/\D/g, '')
          if (digits === '18303811309') {
            const text = (link.textContent || '').replace(/\s+/g, ' ').trim()
            trackEvent('click_to_call', {
              phone_number: BUSINESS_PHONE,
              link_text: text || 'Call',
              ...pageContext(),
            })
          }
        }
        if (href.includes(CIRRUS_HOST) || link.href.includes(CIRRUS_HOST)) {
          const text = (link.textContent || '').replace(/\s+/g, ' ').trim()
          trackEvent('mortgage_analysis_click', {
            link_url: link.href,
            link_text: text,
            ...pageContext(),
          })
        }
      }

      if (path.some(isChatNode)) fireChatStart()
    }

    function onMessage(event: MessageEvent) {
      const origin = String(event.origin || '')
      if (!origin.includes('leadconnectorhq.com') && !origin.includes('msgsndr.com')) return
      let raw = ''
      try {
        raw = typeof event.data === 'string' ? event.data : JSON.stringify(event.data ?? '')
      } catch {
        return
      }
      // Ignore resize/ready traffic. Fire when the payload says the panel opened.
      if (!/"?(?:open|opened|expand|expanded|show|toggle)"?\s*[:=]/i.test(raw) && !/widget[_-]?open|chat[_-]?open/i.test(raw)) {
        return
      }
      if (/resize|height|ping|heartbeat|ready|config/i.test(raw) && !/open/i.test(raw)) return
      fireChatStart()
    }

    let sawBubble = false
    let frame = 0
    const observer = new MutationObserver(() => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const open = chatPanelOpen()
        if (open && sawBubble) fireChatStart()
        if (!open) sawBubble = chatBubblePresent()
      })
    })
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden'],
    })

    document.addEventListener('click', onClick, true)
    window.addEventListener('message', onMessage)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('message', onMessage)
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return null
}

function isChatNode(node: EventTarget): boolean {
  if (!(node instanceof Element)) return false
  if (node.tagName.toLowerCase() === 'chat-widget') return true
  if (node.hasAttribute('data-chat-widget')) return true
  const widgetId = node.getAttribute('data-widget-id')
  if (widgetId === CHAT_WIDGET_ID) return true
  const src = node.getAttribute('src') || ''
  return /leadconnectorhq\.com|msgsndr\.com/i.test(src)
}

function chatFrameSize(): { w: number; h: number } | null {
  const frames = document.querySelectorAll('iframe')
  let best: { w: number; h: number } | null = null
  frames.forEach((frame) => {
    const src = frame.getAttribute('src') || ''
    const title = frame.getAttribute('title') || ''
    if (!/leadconnector|msgsndr|chat/i.test(`${src} ${title} ${frame.id}`)) return
    const rect = frame.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) return
    if (!best || rect.width * rect.height > best.w * best.h) {
      best = { w: rect.width, h: rect.height }
    }
  })
  return best
}

function chatBubblePresent(): boolean {
  const size = chatFrameSize()
  return Boolean(size && size.w < 280 && size.h < 360)
}

function chatPanelOpen(): boolean {
  const size = chatFrameSize()
  return Boolean(size && size.w >= 280 && size.h >= 360)
}
