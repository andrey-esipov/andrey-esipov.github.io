'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  label: string
  href: string
  className?: string
}

/**
 * Project pill — bespoke "stamp" affordance for project tiles.
 *
 * At rest: a small ink-coloured rounded square (rounded-2xl, NOT a
 * circle), tilted -6° as if pressed onto the card by hand. Just an
 * arrow glyph inside.
 *
 * On hover/focus: the stamp rotates back to 0°, fills in with the
 * accent colour, and unfolds horizontally to reveal the project name
 * sliding in from the left of the arrow. The tilt + colour shift gives
 * the interaction a warm, hand-made feel — distinct from the white
 * circular ↗ pill the rest of the world is using.
 */
export function ProjectButton({ label, href, className = '' }: Props) {
  const external = href.startsWith('http')
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`Learn more about ${label}`}
      className={[
        'group/proj relative inline-flex h-10 items-center justify-center',
        'rounded-2xl bg-ink text-surface',
        'shadow-[0_8px_18px_rgb(var(--shadow-rgb)/0.22)]',
        'px-2.5',
        'origin-bottom-left -rotate-[6deg]',
        'transition-[transform,padding,background-color,box-shadow] duration-[420ms] ease-smooth',
        'hover:rotate-0 hover:bg-accent hover:pl-3.5 hover:pr-2.5',
        'hover:shadow-[0_12px_24px_rgb(var(--shadow-rgb)/0.28)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'grid grid-cols-[0fr] overflow-hidden',
          'transition-[grid-template-columns] duration-[420ms] ease-smooth',
          'group-hover/proj:grid-cols-[1fr] group-focus-visible/proj:grid-cols-[1fr]',
        ].join(' ')}
      >
        <span
          className={[
            'overflow-hidden whitespace-nowrap pr-2',
            'text-[12.5px] font-semibold tracking-tight-card',
            'opacity-0 -translate-x-1.5',
            'transition-[opacity,transform] duration-[280ms] ease-smooth',
            'group-hover/proj:opacity-100 group-hover/proj:translate-x-0 group-hover/proj:delay-150',
            'group-focus-visible/proj:opacity-100 group-focus-visible/proj:translate-x-0',
          ].join(' ')}
        >
          {label}
        </span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 transition-transform duration-[300ms] ease-smooth group-hover/proj:-translate-y-0.5 group-hover/proj:translate-x-0.5"
        strokeWidth={2.5}
      />
    </Link>
  )
}
