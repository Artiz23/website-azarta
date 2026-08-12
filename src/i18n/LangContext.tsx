import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { getDictionary, type Dictionary, type Lang } from '../data/content'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'azarta-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'ru'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'ru' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'ru'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang())

  const setLang = (next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    const dict = getDictionary(lang)
    document.title = dict.metaTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', dict.metaDescription)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: getDictionary(lang),
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
