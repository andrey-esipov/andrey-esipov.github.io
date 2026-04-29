'use client'

import type { ReactNode } from 'react'

type Item<T extends string> = {
  value: T
  label: ReactNode
  ariaLabel?: string
}

type PillToggleProps<T extends string> = {
  items: ReadonlyArray<Item<T>>
  value: T
  onChange: (next: T) => void
  size?: 'sm' | 'md'
  ariaLabel: string
  className?: string
}

/**
 * Segmented pill control. Used for the nav filters and the theme switcher.
 * Active item gets the accent fill; inactive items stay outlined.
 */
export function PillToggle<T extends string>({
  items,
  value,
  onChange,
  size = 'md',
  ariaLabel,
  className = '',
}: PillToggleProps<T>) {
  const padX = size === 'sm' ? 'px-3' : 'px-4'
  const padY = size === 'sm' ? 'py-1.5' : 'py-2'
  const text = size === 'sm' ? 'text-[13px]' : 'text-sm'

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1 rounded-full border border-hairline bg-surface/80 p-1 shadow-pill backdrop-blur-md ${className}`}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={item.ariaLabel}
            onClick={() => onChange(item.value)}
            className={[
              'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 ease-smooth',
              padX,
              padY,
              text,
              active
                ? 'bg-accent text-surface shadow-pill'
                : 'text-ink-soft hover:text-ink hover:bg-surface-2',
            ].join(' ')}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
