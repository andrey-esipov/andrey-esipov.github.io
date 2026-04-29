'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

export type CardTone =
  | 'surface'
  | 'surface-2'
  | 'sky'
  | 'sage'
  | 'blush'
  | 'butter'

const TONE_BG: Record<CardTone, string> = {
  surface: 'bg-surface',
  'surface-2': 'bg-surface-2',
  sky: 'bg-sky',
  sage: 'bg-sage',
  blush: 'bg-blush',
  butter: 'bg-butter',
}

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CardTone
  span?: string                 // e.g. "lg:col-span-6 lg:row-span-2"
  category?: 'bio' | 'projects' | 'activity' | 'about' | 'meta'
  href?: string                 // turns the card into an anchor with corner arrow
  external?: boolean            // open href in new tab
  interactive?: boolean         // adds hover lift; auto-true when href is set
  ariaLabel?: string
  children: ReactNode
}

/**
 * The shared card primitive: rounded radius, dual-layer shadow, hover lift,
 * tone-tinted background, and an optional corner-arrow link affordance.
 *
 * Layout (col/row spans + ordering) lives at the grid level via `span`,
 * so cards stay layout-agnostic.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    tone = 'surface',
    span = '',
    category,
    href,
    external,
    interactive,
    ariaLabel,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const isInteractive = interactive ?? Boolean(href)
  const baseClasses = [
    TONE_BG[tone],
    'group relative rounded-card border border-hairline/60 shadow-card overflow-hidden',
    'p-7 md:p-9',
    'transition-[transform,box-shadow,background-color,border-color] duration-[220ms] ease-smooth',
    'theme-transition',
    isInteractive ? 'hover:-translate-y-0.5 hover:shadow-card-hover' : '',
    span,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {href ? (
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-pill backdrop-blur-sm transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
        </span>
      ) : null}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        data-category={category}
        className={baseClasses + ' block'}
      >
        {content}
      </a>
    )
  }

  return (
    <div ref={ref} data-category={category} className={baseClasses} {...rest}>
      {content}
    </div>
  )
})
