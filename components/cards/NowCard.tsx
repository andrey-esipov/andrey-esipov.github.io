'use client'

import { Hammer, BookOpen, Headphones } from 'lucide-react'

const NOW = {
  building: 'AI eval frameworks for OneDrive Copilot',
  reading: 'Designing Data-Intensive Applications',
  listening: 'Bonobo — Black Sands',
  updated: 'Apr 2026',
} as const

function Line({
  Icon,
  label,
  text,
}: {
  Icon: React.ElementType
  label: string
  text: string
}) {
  return (
    <div className="flex items-baseline gap-2.5">
      <Icon
        className="h-3 w-3 shrink-0 translate-y-[1px] text-ink-soft"
        strokeWidth={2.2}
      />
      <span className="w-[64px] shrink-0 text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        {label}
      </span>
      <span className="truncate text-[12.5px] text-ink md:text-[13px]">
        {text}
      </span>
    </div>
  )
}

export function NowCard() {
  return (
    <div
      data-category="about"
      className="theme-transition relative flex h-full flex-col justify-center gap-3 overflow-hidden rounded-card border border-hairline/60 bg-surface px-6 py-5 shadow-card md:px-7"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Now
        </p>
        <p className="text-[10px] text-ink-soft/70">{NOW.updated}</p>
      </div>

      <div className="space-y-2">
        <Line Icon={Hammer} label="Building" text={NOW.building} />
        <Line Icon={BookOpen} label="Reading" text={NOW.reading} />
        <Line Icon={Headphones} label="Listening" text={NOW.listening} />
      </div>
    </div>
  )
}
