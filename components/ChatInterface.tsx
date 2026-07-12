'use client'
import { useEffect, useRef, useState, FormEvent } from 'react'
import { useLang } from './LanguageContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export default function ChatInterface() {
  const { t, lang, setLang } = useLang()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: t.advisor.welcome,
        timestamp: Date.now(),
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  async function send(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || typing) return
    const next: Message[] = [
      ...messages,
      { role: 'user', content: text, timestamp: Date.now() },
    ]
    setMessages(next)
    setInput('')
    setTyping(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
          language: lang,
        }),
      })
      const data = await res.json()
      const reply =
        data.content ||
        (lang === 'es'
          ? 'Disculpa, tuve un problema. Llama a Justin directo al (830) 381-1309.'
          : 'Sorry, I had a hiccup. Call Justin directly at (830) 381-1309.')
      setMessages([
        ...next,
        { role: 'assistant', content: reply, timestamp: Date.now() },
      ])
    } catch (err) {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            lang === 'es'
              ? 'No me pude conectar. Por favor llama a Justin: (830) 381-1309.'
              : "I couldn't connect. Please call Justin directly: (830) 381-1309.",
          timestamp: Date.now(),
        },
      ])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-navy-50">
      <div className="flex items-center justify-between border-b border-navy-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display font-bold text-navy">
            J
          </div>
          <div>
            <p className="font-display text-sm font-bold text-navy">
              {lang === 'es' ? "Asesor AI de Justin" : "Justin's AI Advisor"}
            </p>
            <p className="text-xs text-emerald-600">
              ● {lang === 'es' ? 'En línea ahora' : 'Online now'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="flex h-10 items-center rounded-md border border-navy-100 px-3 text-xs font-semibold text-navy transition hover:border-gold"
        >
          <span className={lang === 'en' ? 'text-gold-700' : ''}>EN</span>
          <span className="mx-1 text-navy/30">|</span>
          <span className={lang === 'es' ? 'text-gold-700' : ''}>ES</span>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm sm:max-w-[75%] ${
                  msg.role === 'user'
                    ? 'bg-gold text-navy'
                    : 'bg-navy text-white'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl bg-navy px-4 py-3.5 shadow-sm">
                <Dot />
                <Dot delay="0.15s" />
                <Dot delay="0.3s" />
              </div>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={send}
        className="border-t border-navy-100 bg-white p-3 sm:p-4"
      >
        <div className="mx-auto flex max-w-3xl gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.advisor.placeholder}
            className="block min-h-[48px] flex-1 rounded-full border border-navy-100 bg-navy-50/50 px-4 text-sm text-navy outline-none transition focus:border-gold focus:shadow-gold-glow"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="flex h-12 min-w-[48px] items-center justify-center rounded-full bg-gold px-4 font-bold text-navy shadow-sm transition hover:bg-gold-400 disabled:opacity-50"
            aria-label={t.advisor.send}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes typing {
          0%,
          80%,
          100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

function Dot({ delay = '0s' }: { delay?: string }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full bg-gold"
      style={{
        animation: 'typing 1.4s infinite ease-in-out',
        animationDelay: delay,
      }}
    />
  )
}
