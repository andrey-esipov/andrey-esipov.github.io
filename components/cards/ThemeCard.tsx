'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react'
import { useTheme, type Theme } from '../ThemeProvider'

type Stop = {
  value: Theme
  label: string
  Icon: React.ElementType
}

const STOPS: ReadonlyArray<Stop> = [
  { value: 'sunrise', label: 'Sunrise', Icon: Sunrise },
  { value: 'day',     label: 'Day',     Icon: Sun },
  { value: 'sunset',  label: 'Sunset',  Icon: Sunset },
  { value: 'night',   label: 'Night',   Icon: Moon },
]

/**
 * Day-cycle slider. A wide pill with a circular thumb that springs
 * between four stops; the icon inside cross-fades to match the chosen
 * theme. Below it sits the current label in the serif voice.
 */
export function ThemeCard() {
  const { theme, setTheme } = useTheme()
  const [spin, setSpin] = useState(0)
  const activeIndex = Math.max(0, STOPS.findIndex((s) => s.value === theme))
  const Active = STOPS[activeIndex]

  function selectAt(i: number) {
    if (STOPS[i].value === theme) return
    const delta = i - activeIndex
    setSpin((s) => s + (delta >= 0 ? 1 : -1))
    setTheme(STOPS[i].value)
  }

  return (
    <div
      data-category="meta"
      className="theme-transition relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-5 shadow-card"
    >
      {/* Slider track + thumb */}
      <div className="relative h-9 w-full max-w-[210px] overflow-hidden rounded-full border border-hairline/60 bg-surface-2">
        {STOPS.map((stop, i) => (
          <button
            key={stop.value}
            type="button"
            onClick={() => selectAt(i)}
            aria-label={stop.label}
            title={stop.label}
            className="absolute bottom-0 top-0 z-10 cursor-pointer"
            style={{ left: `${i * 25}%`, width: '25%' }}
          />
        ))}

        <motion.div
          className="pointer-events-none absolute z-20 flex h-7 w-7 items-center justify-center rounded-full bg-surface text-ink shadow-[0_3px_10px_rgb(var(--shadow-rgb)/0.28)] ring-1 ring-ink/10"
          style={{ top: '50%', x: '-50%', y: '-50%' }}
          animate={{
            left: `${12.5 + activeIndex * 25}%`,
            rotate: spin * 360,
          }}
          transition={{
            left: { type: 'spring', stiffness: 320, damping: 30 },
            rotate: { duration: 0.55, ease: [0.2, 0.7, 0.3, 1] },
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <Active.Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Current label — larger, cross-fades on theme change */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={theme}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] }}
          className="font-serif text-[20px] leading-none tracking-tight-card text-ink"
        >
          {Active.label}.
        </motion.p>
      </AnimatePresence>

      {/* Hidden radiogroup for a11y — the visible UI is the slider above */}
      <div role="radiogroup" aria-label="Choose theme" className="sr-only">
        {STOPS.map((stop, i) => (
          <button
            key={stop.value}
            type="button"
            role="radio"
            aria-checked={theme === stop.value}
            onClick={() => selectAt(i)}
          >
            {stop.label}
          </button>
        ))}
      </div>
    </div>
  )
}
