'use client'
import { createContext, useContext, ReactNode } from 'react'
import { translations } from '@/lib/translations'

interface LangCtx {
  t: typeof translations.en
}

const LanguageContext = createContext<LangCtx>({ t: translations.en })

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ t: translations.en }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
