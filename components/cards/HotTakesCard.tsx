'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'

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
      className="theme-transition group relative flex h-full w-full flex-col items-stretch overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-5 text-left shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Hot take
        </p>
        <p className="text-[9px] tabular-nums text-ink-soft/70">
          {String(idx + 1).padStart(2, '0')} / {String(TAKES.length).padStart(2, '0')}
        </p>
      </div>

      <div className="relative mt-2 flex flex-1 items-center">
        <Quote
          className="pointer-events-none absolute -left-1 -top-1 h-4 w-4 text-accent/35"
          strokeWidth={2}
          aria-hidden
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={idx}
            initial={{ y: 12, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.3, 1] }}
            className="font-serif text-[16px] leading-[1.18] tracking-tight-card text-ink md:text-[17px]"
          >
            {TAKES[idx]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="mt-2 text-[10px] uppercase tracking-eyebrow text-ink-soft/80 transition-colors group-hover:text-ink-soft">
        Tap for next &rarr;
      </p>
    </button>
  )
}
