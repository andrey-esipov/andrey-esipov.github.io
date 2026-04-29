'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type Theme = 'sunrise' | 'day' | 'sunset' | 'night'

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'andrey-theme'
const VALID: ReadonlyArray<Theme> = ['sunrise', 'day', 'sunset', 'night']

function isTheme(s: unknown): s is Theme {
  return typeof s === 'string' && (VALID as readonly string[]).includes(s)
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'day'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (isTheme(stored)) return stored
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'night'
  return 'day'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('day')

  useEffect(() => {
    const initial = readInitialTheme()
    setThemeState(initial)
    applyTheme(initial)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (window.localStorage.getItem(STORAGE_KEY)) return
      const next: Theme = mql.matches ? 'night' : 'day'
      setThemeState(next)
      applyTheme(next)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    applyTheme(t)
    window.localStorage.setItem(STORAGE_KEY, t)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

/** Pre-hydration script — applies theme synchronously, no flash. */
export function ThemeBootstrapScript() {
  const code = `(()=>{try{var s=localStorage.getItem('andrey-theme');var v=['sunrise','day','sunset','night'];var t=v.indexOf(s)>=0?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'night':'day');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','day');}})();`
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
