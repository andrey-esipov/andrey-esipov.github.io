'use client'

const HANDS_ON_URL = 'https://andreyesipov.substack.com'
const HANDS_ON_ORANGE = '#E8743C'

/**
 * Compact 1×1 tile for the Hands On newsletter. Click anywhere opens
 * Substack in a new tab. Matches the favicon/wordmark italic-serif
 * letterforms with the orange period dot.
 */
export function NewsletterCard() {
  return (
    <a
      href={HANDS_ON_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-category="projects"
      aria-label="Hands On, Andrey's newsletter"
      className="theme-transition group relative flex h-full w-full flex-col overflow-hidden rounded-card border border-hairline/60 bg-surface px-5 py-4 text-left shadow-card transition-[transform,box-shadow] duration-[260ms] ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <header className="flex w-full items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Newsletter
        </p>
        <p className="text-[9px] uppercase tracking-eyebrow text-ink-soft/70 transition-colors group-hover:text-ink-soft">
          read &rarr;
        </p>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-2">
        <h3
          className="font-serif italic leading-none tracking-tight-display text-ink"
          style={{ fontSize: 'clamp(36px, 4.6vw, 56px)' }}
        >
          hands on
          <span style={{ color: HANDS_ON_ORANGE }}>.</span>
        </h3>

        <p className="max-w-[26ch] text-center font-serif italic text-[13px] leading-snug text-ink-soft">
          Practical AI for builders with full lives.
        </p>
      </div>

      <footer className="flex items-center justify-center">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: HANDS_ON_ORANGE }}
          aria-hidden="true"
        />
      </footer>
    </a>
  )
}
