'use client'

import Image from 'next/image'

const SCHOOLS = [
  { name: 'Stanford',  field: 'AI',            logo: '/schools/stanford.png', current: true  },
  { name: 'Harvard',   field: 'Data Science',  logo: '/schools/harvard.png',  current: false },
  { name: 'Arizona',   field: 'MIS',           logo: '/schools/arizona.png',  current: false },
  { name: 'Tennessee', field: 'MBA',           logo: '/schools/utm.png',      current: false },
] as const

export function EducationCard() {
  return (
    <div
      data-category="about"
      className="theme-transition relative flex h-full flex-col gap-2.5 overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-5 shadow-card"
    >
      <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        School
      </p>
      <h3 className="font-serif text-[18px] leading-[1.1] tracking-tight-card text-ink md:text-[19px]">
        Always studying.
      </h3>

      <ul className="mt-auto space-y-1.5 text-[11.5px] leading-tight">
        {SCHOOLS.map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
              <Image
                src={s.logo}
                alt=""
                width={64}
                height={64}
                className="h-5 w-5 object-contain"
              />
              {s.current && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-accent/55 pulse-soft" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-accent ring-2 ring-surface" />
                </span>
              )}
            </span>
            <span className="font-medium text-ink">{s.name}</span>
            <span className="text-ink-soft/85">· {s.field}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
