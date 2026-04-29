'use client'

const SCHOOLS = [
  { name: 'Stanford',  field: 'AI',             current: true },
  { name: 'Harvard',   field: 'Data Science',   current: false },
  { name: 'Arizona',   field: 'MIS',            current: false },
  { name: 'Tennessee', field: 'MBA',            current: false },
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
            {s.current ? (
              <span className="relative inline-flex h-1.5 w-1.5 shrink-0 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-accent/45 pulse-soft" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            ) : (
              <span className="h-1 w-1 shrink-0 rounded-full bg-ink-soft/40" />
            )}
            <span className="font-medium text-ink">{s.name}</span>
            <span className="text-ink-soft/85">· {s.field}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
