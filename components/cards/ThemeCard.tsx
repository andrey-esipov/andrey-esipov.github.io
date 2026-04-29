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
 * Compact day-cycle slider — small horizontal pill with a circular thumb
 * that springs between four stops. The thumb spins as it travels and the
 * icon inside cross-fades to match the chosen theme. Distinct stop icons
 * sit beneath the track so the four moods read at a glance, and the
 * current label sits below in the serif voice.
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
      className="theme-transition relative flex h-full flex-col items-center justify-center gap-2.5 overflow-hidden rounded-card border border-hairline/60 bg-surface px-4 py-4 shadow-card"
    >
      {/* Slider — track + thumb */}
      <div className="relative h-7 w-full max-w-[170px] overflow-hidden rounded-full border border-hairline/60 bg-surface-2">
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
          className="pointer-events-none absolute z-20 flex h-6 w-6 items-center justify-center rounded-full bg-surface text-ink shadow-[0_3px_10px_rgb(var(--shadow-rgb)/0.28)] ring-1 ring-ink/10"
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
              <Active.Icon className="h-3 w-3" strokeWidth={2.4} />
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Distinct icon row — one glyph per stop, current one inks up */}
      <div
        role="radiogroup"
        aria-label="Choose theme"
        className="flex w-full max-w-[170px] items-center justify-between px-1"
      >
        {STOPS.map((stop, i) => {
          const Icon = stop.Icon
          const isActive = theme === stop.value
          return (
            <button
              key={stop.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => selectAt(i)}
              title={stop.label}
              className={[
                'flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200',
                isActive ? 'text-ink' : 'text-ink-soft hover:text-ink',
              ].join(' ')}
            >
              <Icon className="h-3 w-3" strokeWidth={2.2} />
            </button>
          )
        })}
      </div>

      {/* Current label */}
      <p className="font-serif text-[13px] leading-none tracking-tight-card text-ink">
        {Active.label}.
      </p>
    </div>
  )
}
