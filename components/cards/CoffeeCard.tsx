'use client'

import { useEffect, useState } from 'react'

/** Rough count of espressos a serious coffee drinker has had by this hour */
function expectedCount(): number {
  const h = new Date().getHours()
  if (h < 6) return 0
  if (h < 9) return 1
  if (h < 12) return 2
  if (h < 15) return 3
  return 4
}

function CupSVG() {
  return (
    <svg
      viewBox="0 0 60 56"
      className="h-10 w-10 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* cup body */}
      <path d="M14 22 L14 40 Q14 50 24 50 L36 50 Q46 50 46 40 L46 22 Z" />
      {/* coffee surface */}
      <line x1="14" y1="26" x2="46" y2="26" strokeOpacity="0.45" />
      {/* handle */}
      <path d="M46 28 Q53 28 53 35 Q53 42 46 42" />
      {/* saucer */}
      <path d="M10 50 L50 50" strokeOpacity="0.7" />
    </svg>
  )
}

function Steam() {
  return (
    <svg
      viewBox="0 0 40 24"
      className="h-4 w-10 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path className="steam-wisp steam-wisp-1" d="M12 22 C12 18 10 18 10 14 S12 10 12 6" />
      <path className="steam-wisp steam-wisp-2" d="M20 22 C20 18 22 18 22 14 S20 10 20 6" />
      <path className="steam-wisp steam-wisp-3" d="M28 22 C28 18 26 18 26 14 S28 10 28 6" />
    </svg>
  )
}

export function CoffeeCard() {
  const [count, setCount] = useState(0)
  const [bumping, setBumping] = useState(false)

  useEffect(() => {
    setCount(expectedCount())
  }, [])

  function tap() {
    setCount((c) => c + 1)
    setBumping(true)
    window.setTimeout(() => setBumping(false), 320)
  }

  return (
    <button
      type="button"
      onClick={tap}
      data-category="about"
      aria-label="Brew another espresso"
      className="theme-transition group relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-5 text-left shadow-card transition-shadow hover:shadow-card-hover"
    >
      <p className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        Espresso
      </p>

      <div className="flex flex-col items-center">
        <Steam />
        <CupSVG />
      </div>

      <p
        className={[
          'mt-1 font-serif text-[36px] leading-none tracking-tight-display text-ink',
          'transition-transform duration-300 ease-smooth',
          bumping ? 'scale-110' : 'scale-100',
        ].join(' ')}
      >
        {count}
      </p>
      <p className="text-[10px] uppercase tracking-eyebrow text-ink-soft/80">
        cup{count !== 1 ? 's' : ''} today
      </p>
    </button>
  )
}
