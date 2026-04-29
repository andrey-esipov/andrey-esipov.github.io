'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  label: string
  href: string
  className?: string
}

/**
 * Corner pill for project tiles. At rest it's a perfect 36×36 circle
 * with just an arrow; on hover the disc unfolds horizontally and the
 * project name slides in from the left of the arrow with a tiny delay
 * so the motion reads as: pill grows → name fades in → arrow nudges.
 *
 * The circle is enforced by `aspect-square min-w-9` (height = 36 sets
 * width via aspect-ratio); on hover we drop aspect-square and let the
 * label dictate width via grid `0fr → 1fr`. The transition between
 * "force-square" and "fluid" is what makes the open feel physical.
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
        'group/proj relative inline-flex h-9 items-center justify-center rounded-full',
        'border border-hairline bg-surface text-ink shadow-pill backdrop-blur-md',
        'aspect-square hover:aspect-auto',
        'px-2.5 hover:pl-3.5 hover:pr-3',
        'text-[12.5px] font-semibold tracking-tight-card',
        'transition-[aspect-ratio,padding,box-shadow,border-color] duration-[320ms] ease-smooth',
        'hover:border-accent/50 hover:shadow-card-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'grid grid-cols-[0fr] overflow-hidden',
          'transition-[grid-template-columns] duration-[320ms] ease-smooth',
          'group-hover/proj:grid-cols-[1fr] group-focus-visible/proj:grid-cols-[1fr]',
        ].join(' ')}
      >
        <span
          className={[
            'overflow-hidden whitespace-nowrap pr-2',
            'opacity-0 -translate-x-1',
            'transition-[opacity,transform] duration-[260ms] ease-smooth',
            'group-hover/proj:opacity-100 group-hover/proj:translate-x-0 group-hover/proj:delay-100',
            'group-focus-visible/proj:opacity-100 group-focus-visible/proj:translate-x-0',
          ].join(' ')}
        >
          {label}
        </span>
      </span>
      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-smooth group-hover/proj:-translate-y-0.5 group-hover/proj:translate-x-0.5"
        strokeWidth={2.4}
      />
    </Link>
  )
}
