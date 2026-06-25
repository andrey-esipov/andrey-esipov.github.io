'use client'

import type { ComponentType } from 'react'
import { createElement, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  BriefcaseBusiness,
  Copy,
  Droplet,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Trophy,
} from 'lucide-react'
import { useTheme, type Theme } from '@/components/ThemeProvider'

export type CommandSection = 'Navigate' | 'Theme' | 'Connect'

export type Command = {
  id: string
  section: CommandSection
  label: string
  keywords: string[]
  Icon: ComponentType<{ className?: string }>
  hint?: string
  isActive?: boolean
  run: () => void
}

type CommandIconProps = {
  className?: string
}

function XIcon({ className = '' }: CommandIconProps) {
  return createElement(
    'svg',
    { viewBox: '0 0 24 24', fill: 'none', className, 'aria-hidden': 'true' },
    createElement('path', {
      d: 'M3 3l8.5 11.5L3.5 21h2.5l6.5-7.2 5.4 7.2H21l-9-12.1L20.4 3H17.9l-6 6.6L7 3H3z',
      fill: 'currentColor',
    })
  )
}

const EMAIL = 'andrey.esipov@outlook.com'

const THEME_COMMANDS: ReadonlyArray<{
  value: Theme
  label: string
  Icon: ComponentType<{ className?: string }>
  keywords: string[]
}> = [
  {
    value: 'sunrise',
    label: 'Sunrise',
    Icon: Sunrise,
    keywords: ['theme', 'mode', 'morning', 'dawn', 'warm', 'light'],
  },
  {
    value: 'day',
    label: 'Day',
    Icon: Sun,
    keywords: ['theme', 'mode', 'light', 'cream', 'default'],
  },
  {
    value: 'sunset',
    label: 'Sunset',
    Icon: Sunset,
    keywords: ['theme', 'mode', 'evening', 'golden', 'orange', 'warm'],
  },
  {
    value: 'night',
    label: 'Night',
    Icon: Moon,
    keywords: ['theme', 'mode', 'dark', 'evening', 'night'],
  },
]

export function useCommands(): Command[] {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  return useMemo<Command[]>(() => {
    const navigate: Command[] = [
      {
        id: 'navigate-home',
        section: 'Navigate',
        label: 'Home',
        keywords: ['/', 'start', 'index', 'bento', 'about'],
        Icon: Home,
        hint: '/',
        run: () => router.push('/'),
      },
      {
        id: 'navigate-work',
        section: 'Navigate',
        label: 'Work',
        keywords: ['onedrive', 'microsoft', 'product', 'project'],
        Icon: BriefcaseBusiness,
        hint: '/work',
        run: () => router.push('/work'),
      },
      {
        id: 'navigate-rallo',
        section: 'Navigate',
        label: 'Rallo',
        keywords: ['tennis', 'ai', 'coach', 'project'],
        Icon: Trophy,
        hint: '/rallo',
        run: () => router.push('/rallo'),
      },
      {
        id: 'navigate-droplet',
        section: 'Navigate',
        label: 'Droplet',
        keywords: ['water', 'sprinkler', 'irrigation', 'rain bird', 'savings', 'project'],
        Icon: Droplet,
        hint: '/droplet',
        run: () => router.push('/droplet'),
      },
    ]

    const themes = THEME_COMMANDS.map<Command>(({ value, label, Icon, keywords }) => ({
      id: `theme-${value}`,
      section: 'Theme',
      label,
      keywords,
      Icon,
      hint: 'Theme',
      isActive: theme === value,
      run: () => setTheme(value),
    }))

    const connect: Command[] = [
      {
        id: 'connect-linkedin',
        section: 'Connect',
        label: 'LinkedIn',
        keywords: ['social', 'profile', 'career', 'connect'],
        Icon: Linkedin,
        hint: 'Open',
        run: () => {
          if (typeof window === 'undefined') return
          window.open('https://www.linkedin.com/in/andrey-esipov/', '_blank', 'noopener,noreferrer')
        },
      },
      {
        id: 'connect-github',
        section: 'Connect',
        label: 'GitHub',
        keywords: ['social', 'code', 'repo', 'source'],
        Icon: Github,
        hint: 'Open',
        run: () => {
          if (typeof window === 'undefined') return
          window.open('https://github.com/andrey-esipov', '_blank', 'noopener,noreferrer')
        },
      },
      {
        id: 'connect-x',
        section: 'Connect',
        label: 'X',
        keywords: ['twitter', 'social', 'posts', 'updates'],
        Icon: XIcon,
        hint: 'Open',
        run: () => {
          if (typeof window === 'undefined') return
          window.open('https://x.com/andreyesipov', '_blank', 'noopener,noreferrer')
        },
      },
      {
        id: 'connect-email',
        section: 'Connect',
        label: 'Email',
        keywords: ['mail', 'contact', 'outlook', EMAIL],
        Icon: Mail,
        hint: 'Mail',
        run: () => {
          if (typeof window === 'undefined') return
          window.location.href = `mailto:${EMAIL}`
        },
      },
      {
        id: 'connect-copy-email',
        section: 'Connect',
        label: 'Copy email address',
        keywords: ['copy', 'clipboard', 'address', 'contact', EMAIL],
        Icon: Copy,
        hint: 'Copy',
        run: () => {
          if (typeof navigator === 'undefined' || !navigator.clipboard) return
          void navigator.clipboard.writeText(EMAIL).catch(() => undefined)
        },
      },
    ]

    return [...navigate, ...themes, ...connect]
  }, [router, setTheme, theme])
}
