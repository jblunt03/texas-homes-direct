import type { Metadata } from 'next'
import ChatInterface from '@/components/ChatInterface'

export const metadata: Metadata = {
  title: 'AI Home Advisor',
  description:
    "Justin's 24/7 AI Home Advisor — trained on Texas market data, financing rules, and every home in our inventory. Get real answers in English or Spanish.",
}

export default function AdvisorPage() {
  return <ChatInterface />
}
