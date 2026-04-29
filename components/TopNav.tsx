'use client'

import { PillToggle } from './ui/PillToggle'

export type Filter = 'all' | 'about' | 'projects' | 'activity'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'about', label: 'About' },
  { value: 'projects', label: 'Projects' },
  { value: 'activity', label: 'Activity' },
] as const

type TopNavProps = {
  filter: Filter
  onFilterChange: (next: Filter) => void
}

export function TopNav({ filter, onFilterChange }: TopNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 pt-4 pb-2 md:px-6 lg:px-10 lg:pt-5 lg:pb-3 xl:px-14"
    >
      {/* Wordmark */}
      <a
        href="/"
        aria-label="andrey — home"
        className="font-serif text-[26px] leading-none tracking-tight-display"
      >
        <span className="bg-gradient-to-br from-ink via-accent to-accent bg-clip-text text-transparent">
          andrey
        </span>
      </a>

      {/* Filter pill (desktop center) */}
      <div className="hidden md:flex">
        <PillToggle
          items={FILTERS}
          value={filter}
          onChange={onFilterChange}
          size="md"
          ariaLabel="Filter cards"
        />
      </div>

      {/* Contact */}
      <a
        href="mailto:andrey.esipov@outlook.com"
        className="inline-flex items-center rounded-full border border-hairline bg-surface/85 px-3.5 py-2 text-[13px] font-medium text-ink shadow-pill backdrop-blur-md transition-colors duration-200 hover:bg-surface"
      >
        Contact
      </a>
    </nav>
  )
}
