'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { translations } from '@/lib/translations'

type Lang = 'en' | 'es'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LangCtx>({} as LangCtx)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const t = translations[lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
