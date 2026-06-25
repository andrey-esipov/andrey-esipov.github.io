'use client'

import { Sun, Moon, Sunrise, Sunset } from 'lucide-react'
import { PillToggle } from './ui/PillToggle'
import { useTheme, type Theme } from './ThemeProvider'

const ICON = 'h-3.5 w-3.5'

const THEME_ITEMS: ReadonlyArray<{ value: Theme; label: React.ReactNode; ariaLabel: string }> = [
  { value: 'sunrise', label: <Sunrise className={ICON} strokeWidth={2.2} />, ariaLabel: 'Sunrise theme' },
  { value: 'day',     label: <Sun className={ICON} strokeWidth={2.2} />,     ariaLabel: 'Day theme'     },
  { value: 'sunset',  label: <Sunset className={ICON} strokeWidth={2.2} />,  ariaLabel: 'Sunset theme'  },
  { value: 'night',   label: <Moon className={ICON} strokeWidth={2.2} />,    ariaLabel: 'Night theme'   },
]

/**
 * Compact day-cycle theme switcher for the top nav. Four icon stops
 * (sunrise / day / sunset / night); the active stop gets the accent fill.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <PillToggle
      items={THEME_ITEMS}
      value={theme}
      onChange={setTheme}
      size="sm"
      ariaLabel="Choose theme"
      className="!gap-0.5 !p-0.5"
    />
  )
}
