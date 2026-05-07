'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderV5Props {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

/*
 * v5 ThemeProvider — sets [data-theme] on <html>, persists to localStorage,
 * respects system preference on first visit.
 */
export function ThemeProviderV5({
  children,
  defaultTheme = 'light',
  storageKey = 'jvk-ds-theme',
}: ThemeProviderV5Props) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored) {
      setThemeState(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark')
    }
  }, [storageKey])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const toggle = () => setThemeState(t => (t === 'light' ? 'dark' : 'light'))
  const setTheme = (t: Theme) => setThemeState(t)

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeV5(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeV5 must be used inside ThemeProviderV5')
  return ctx
}
