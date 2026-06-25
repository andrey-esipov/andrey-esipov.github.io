'use client'

import { Hammer, BookOpen, Headphones } from 'lucide-react'

const NOW = [
  { Icon: Hammer, label: 'Building', text: 'Rallo + Droplet' },
  { Icon: BookOpen, label: 'Reading', text: 'Designing Data-Intensive Apps' },
  { Icon: Headphones, label: 'Listening', text: 'Bonobo · Black Sands' },
] as const

export function NowCard() {
  return (
    <div
      data-category="about"
      className="theme-transition relative flex h-full flex-col justify-center gap-3 overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Now
        </p>
        <p className="text-[10px] text-ink-soft/70">Apr 2026</p>
      </div>

      <div className="space-y-2.5">
        {NOW.map(({ Icon, label, text }) => (
          <div key={label} className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Icon className="h-3 w-3 shrink-0 text-ink-soft" strokeWidth={2.2} />
              <span className="text-[9.5px] font-semibold uppercase tracking-eyebrow text-ink-soft">
                {label}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[12.5px] text-ink">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
