'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

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
      className="h-[92px] w-[104px] text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cc-brew" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2D1810" />
          <stop offset="55%"  stopColor="#46220F" />
          <stop offset="100%" stopColor="#5E3017" />
        </linearGradient>
        <linearGradient id="cc-crema" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#8E5C30" />
          <stop offset="50%"  stopColor="#B57E48" />
          <stop offset="100%" stopColor="#8E5C30" />
        </linearGradient>
        {/* Cup interior (excludes the rim ellipse — that's drawn on top) */}
        <clipPath id="cc-body">
          <path d="M16 24 L20 64 Q21 73 30 73 L54 73 Q63 73 64 64 L68 24 Z" />
        </clipPath>
      </defs>

      {/* Brown espresso fills the cup body */}
      <g clipPath="url(#cc-body)">
        <rect x="16" y="24" width="52" height="55" fill="url(#cc-brew)" />
      </g>

      {/* Crema — golden surface ellipse, tucked just inside the rim */}
      <ellipse cx="42" cy="24" rx="25.5" ry="3.6" fill="url(#cc-crema)" />
      {/* Subtle highlight on the crema for depth */}
      <ellipse cx="42" cy="23.4" rx="20" ry="1.5" fill="#D6A06A" fillOpacity="0.55" />

      {/* Cup top rim — outline ellipse */}
      <ellipse cx="42" cy="24" rx="26" ry="4" />

      {/* Cup body sides + bottom */}
      <path d="M16 24 L20 64 Q21 73 30 73 L54 73 Q63 73 64 64 L68 24" />

      {/* Handle */}
      <path d="M68 32 Q82 32 82 44 Q82 55 68 55" />

      {/* Saucer */}
      <ellipse
        cx="42"
        cy="79"
        rx="38"
        ry="2.5"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function Steam({ burst }: { burst: boolean }) {
  return (
    <svg
      viewBox="0 0 60 36"
      className="h-7 w-12 text-ink/55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path
        className={`steam-wisp ${burst ? 'steam-burst' : ''}`}
        d="M20 34 C20 28 16 26 16 20 S20 14 20 6"
      />
      <path
        className={`steam-wisp steam-wisp-2 ${burst ? 'steam-burst' : ''}`}
        d="M30 34 C30 28 34 26 34 20 S30 14 30 6"
      />
      <path
        className={`steam-wisp steam-wisp-3 ${burst ? 'steam-burst' : ''}`}
        d="M40 34 C40 28 36 26 36 20 S40 14 40 6"
      />
    </svg>
  )
}

export function CoffeeCard() {
  const [count, setCount] = useState(0)
  const [burst, setBurst] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setCount(expectedCount())
  }, [])

  async function tap(e: React.MouseEvent) {
    e.stopPropagation()
    setCount((c) => c + 1)
    setBurst(true)
    // Two-stage smooth animation — sip back, then settle
    await controls.start({
      rotate: -10,
      y: -3,
      transition: { duration: 0.28, ease: [0.32, 0.72, 0.35, 1] },
    })
    controls.start({
      rotate: 0,
      y: 0,
      transition: { duration: 0.46, ease: [0.32, 0.72, 0.35, 1] },
    })
    window.setTimeout(() => setBurst(false), 800)
  }

  return (
    <button
      type="button"
      onClick={tap}
      data-category="about"
      aria-label="Brew another espresso"
      className="theme-transition group relative flex h-full w-full flex-col overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
    >
      <header className="flex w-full items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Espresso
        </p>
        <p className="text-[9px] uppercase tracking-eyebrow text-ink-soft/70 transition-colors group-hover:text-ink-soft">
          tap to brew &rarr;
        </p>
      </header>

      {/* Center group — cup + count grow into the remaining space and
          sit centered as a balanced unit. */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <motion.div
          animate={controls}
          className="flex origin-bottom flex-col items-center"
        >
          <Steam burst={burst} />
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
      </div>
    </button>
  )
}
