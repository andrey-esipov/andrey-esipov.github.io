'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/** Rough count of espressos a serious coffee drinker has had by this hour */
function expectedCount(): number {
  const h = new Date().getHours()
  if (h < 6) return 0
  if (h < 9) return 1
  if (h < 12) return 2
  if (h < 15) return 3
  return 4
}

function Cup() {
  return (
    <svg
      viewBox="0 0 100 92"
      className="h-[82px] w-[92px] text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* coffee surface (filled) */}
      <ellipse
        cx="40"
        cy="32"
        rx="25"
        ry="3.5"
        fill="rgb(var(--ink))"
        fillOpacity="0.18"
        stroke="none"
      />
      {/* cup body — tapered toward the bottom */}
      <path d="M14 30 L20 70 Q21 78 30 78 L52 78 Q61 78 62 70 L68 30" />
      {/* cup top edge — slightly heavier stroke */}
      <path d="M12 30 L70 30" strokeWidth="2.1" />
      {/* handle */}
      <path d="M68 38 Q83 38 83 51 Q83 62 68 62" />
      {/* saucer — subtle ellipse beneath */}
      <ellipse cx="40" cy="84" rx="40" ry="3" strokeOpacity="0.6" />
    </svg>
  )
}

function Steam({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 60 36"
      className="h-7 w-12 text-ink/65"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path
        className={`steam-wisp ${active ? 'steam-burst' : ''}`}
        d="M20 34 C20 26 16 26 16 18 S20 12 20 4"
      />
      <path
        className={`steam-wisp steam-wisp-2 ${active ? 'steam-burst' : ''}`}
        d="M30 34 C30 26 34 26 34 18 S30 12 30 4"
      />
      <path
        className={`steam-wisp steam-wisp-3 ${active ? 'steam-burst' : ''}`}
        d="M40 34 C40 26 36 26 36 18 S40 12 40 4"
      />
    </svg>
  )
}

export function CoffeeCard() {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setCount(expectedCount())
  }, [])

  function tap(e: React.MouseEvent) {
    e.stopPropagation()
    setCount((c) => c + 1)
    setActive(true)
    window.setTimeout(() => setActive(false), 800)
  }

  return (
    <button
      type="button"
      onClick={tap}
      data-category="about"
      aria-label="Brew another espresso"
      className="theme-transition group relative flex h-full w-full flex-col items-center overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Espresso
        </p>
        <p className="text-[9px] uppercase tracking-eyebrow text-ink-soft/70 transition-colors group-hover:text-ink-soft">
          tap to brew &rarr;
        </p>
      </div>

      {/* Cup tilts forward like a sip on tap, comes back to rest */}
      <motion.div
        animate={
          active
            ? { rotate: [-9, 4, 0], y: [0, -3, 0] }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1] }}
        className="my-1 flex origin-bottom flex-col items-center"
      >
        <Steam active={active} />
        <Cup />
      </motion.div>

      <div className="flex items-baseline gap-2">
        <motion.span
          key={count}
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.32, ease: [0.2, 0.7, 0.3, 1] }}
          className="font-serif text-[28px] leading-none tracking-tight-display text-ink"
        >
          {count}
        </motion.span>
        <span className="text-[10px] uppercase tracking-eyebrow text-ink-soft">
          today
        </span>
      </div>
    </button>
  )
}
