'use client'

import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

/** Rough count of espressos a serious coffee drinker has had by this hour */
function expectedCount(): number {
  const h = new Date().getHours()
  if (h < 6) return 0
  if (h < 9) return 1
  if (h < 12) return 2
  if (h < 15) return 3
  return 4
}

function Steam() {
  return (
    <svg
      viewBox="0 0 60 36"
      className="h-8 w-12 text-ink/55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path className="steam-wisp"        d="M22 32 Q 14 22 22 14 T 22 0" />
      <path className="steam-wisp steam-wisp-2" d="M30 32 Q 36 22 30 14 T 30 0" />
      <path className="steam-wisp steam-wisp-3" d="M38 32 Q 30 22 38 14 T 38 0" />
    </svg>
  )
}

export function CoffeeCard() {
  const [count, setCount] = useState(0)
  const [busy, setBusy] = useState(false)

  // Espresso level: 1 = half-full (rest state), 0 = empty.
  // Drives the rect's y / height and the crema's cy / opacity, so the
  // surface drops as you drink and rises as a new brew pours in.
  const level = useMotionValue(1)
  const fillY = useTransform(level, [0, 1], [68, 46])
  const fillH = useTransform(level, [0, 1], [0, 22])
  const cremaY = useTransform(level, [0, 1], [68, 46])
  const cremaOp = useTransform(level, [0, 0.2, 1], [0, 0.55, 1])

  useEffect(() => {
    setCount(expectedCount())
  }, [])

  async function tap(e: React.MouseEvent) {
    e.stopPropagation()
    if (busy) return
    setBusy(true)
    // Drink — espresso surface slowly falls
    await animate(level, 0, { duration: 1.3, ease: [0.42, 0, 0.58, 1] })
    // Brief empty pause
    await new Promise((r) => window.setTimeout(r, 280))
    // Brew — fresh espresso pours back in
    await animate(level, 1, { duration: 1.3, ease: [0.42, 0, 0.58, 1] })
    setCount((c) => c + 1)
    setBusy(false)
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

      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <Steam />

          {/* Double-walled espresso glass — no saucer.
              Espresso fill + crema follow the `level` motion value. */}
          <svg
            viewBox="0 0 100 78"
            className="h-[92px] w-[118px] text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
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
              <clipPath id="cc-inside">
                <path d="M34 26 L36 60 Q37 68 42 68 L58 68 Q63 68 64 60 L66 26 Z" />
              </clipPath>
            </defs>

            {/* Espresso liquid */}
            <g clipPath="url(#cc-inside)">
              <motion.rect
                x="34"
                width="32"
                style={{ y: fillY, height: fillH }}
                fill="url(#cc-brew)"
              />
            </g>

            {/* Crema — golden ellipse that rides on the surface */}
            <motion.ellipse
              cx="50"
              rx="14"
              ry="1.6"
              fill="url(#cc-crema)"
              style={{ cy: cremaY, opacity: cremaOp }}
            />
            <motion.ellipse
              cx="50"
              rx="11"
              ry="0.9"
              fill="#D6A06A"
              fillOpacity="0.55"
              style={{ cy: cremaY, opacity: cremaOp }}
            />

            {/* Outer wall — body sides + base */}
            <path d="M30 26 L33 64 Q34 72 42 72 L58 72 Q66 72 67 64 L70 26" />
            {/* Handle */}
            <path d="M69 36 Q82 36 82 48 Q82 60 69 60" />
            {/* Outer rim ellipse */}
            <ellipse cx="50" cy="26" rx="20" ry="3.2" />

            {/* Inner wall — body, faded for the double-wall illusion */}
            <path
              d="M34 26 L36 60 Q37 68 42 68 L58 68 Q63 68 64 60 L66 26"
              strokeOpacity="0.55"
              strokeWidth="1.3"
            />
            {/* Inner rim ellipse */}
            <ellipse
              cx="50"
              cy="26"
              rx="16"
              ry="2.5"
              strokeOpacity="0.55"
              strokeWidth="1.3"
            />
          </svg>
        </div>

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
