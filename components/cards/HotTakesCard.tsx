'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TAKES: ReadonlyArray<string> = [
  'Ship the demo before the deck.',
  'Specs are for thinking, not handoff.',
  'Details compound.',
  'Show, don’t tell.',
  'Simple beats clever, every time.',
  'Fewer slides. More demos.',
]

export function HotTakesCard() {
  const [idx, setIdx] = useState(0)

  function next() {
    setIdx((i) => (i + 1) % TAKES.length)
  }

  return (
    <button
      type="button"
      onClick={next}
      data-category="about"
      aria-label="Tap for the next hot take"
      className="theme-transition group relative flex h-full w-full flex-col overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Hot take
        </p>
        <p className="text-[9px] tabular-nums text-ink-soft/70">
          {String(idx + 1).padStart(2, '0')} / {String(TAKES.length).padStart(2, '0')}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={idx}
            initial={{ y: 14, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -14, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.34, ease: [0.2, 0.7, 0.3, 1] }}
            className="text-balance text-center font-serif text-[20px] leading-[1.18] tracking-tight-card text-ink md:text-[22px]"
          >
            {TAKES[idx]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-center text-[9.5px] uppercase tracking-eyebrow text-ink-soft/70 transition-colors group-hover:text-ink-soft">
        tap for next &rarr;
      </p>
    </button>
  )
}
