'use client'

/**
 * Stylized iPhone-frame mockup with a placeholder Rallo screen.
 * Original SVG illustration — no third-party device chrome.
 * The screen content shows a simplified tennis court + a coaching bubble,
 * meant to communicate "AI tennis coach" without claiming a real UI render.
 */
export function RalloPhoneSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 400"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="rallo-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--surface))" />
          <stop offset="100%" stopColor="rgb(var(--surface-2))" />
        </linearGradient>
        <linearGradient id="rallo-court" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--sage))" />
          <stop offset="100%" stopColor="rgb(var(--sage))" stopOpacity="0.65" />
        </linearGradient>
        <filter id="rallo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgb(var(--shadow-rgb))" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Phone body (slight tilt comes from outer transform) */}
      <g filter="url(#rallo-shadow)">
        <rect x="20" y="14" width="200" height="372" rx="36" fill="rgb(var(--ink))" />
        <rect x="26" y="20" width="188" height="360" rx="30" fill="url(#rallo-screen)" />

        {/* Notch */}
        <rect x="100" y="28" width="40" height="10" rx="5" fill="rgb(var(--ink))" />

        {/* Status row */}
        <text x="40" y="52" fontFamily="Inter Tight, system-ui, sans-serif" fontSize="9" fontWeight="600" fill="rgb(var(--ink))">9:41</text>
        <circle cx="190" cy="48" r="2" fill="rgb(var(--ink))" />
        <circle cx="184" cy="48" r="2" fill="rgb(var(--ink))" />
        <circle cx="178" cy="48" r="2" fill="rgb(var(--ink))" />

        {/* App header */}
        <text x="40" y="86" fontFamily="Instrument Serif, Georgia, serif" fontSize="18" fill="rgb(var(--ink))">Rallo</text>
        <text x="40" y="102" fontFamily="Inter Tight, system-ui, sans-serif" fontSize="9" fill="rgb(var(--ink-soft))">Today's session</text>

        {/* Tennis court */}
        <g transform="translate(40 122)">
          <rect width="160" height="120" rx="8" fill="url(#rallo-court)" />
          {/* outer lines */}
          <rect x="6" y="6" width="148" height="108" rx="4" fill="none" stroke="rgb(var(--surface))" strokeWidth="2" opacity="0.85" />
          {/* service line */}
          <line x1="6" y1="60" x2="154" y2="60" stroke="rgb(var(--surface))" strokeWidth="1.5" opacity="0.85" />
          <line x1="40" y1="6" x2="40" y2="114" stroke="rgb(var(--surface))" strokeWidth="1.5" opacity="0.85" />
          <line x1="120" y1="6" x2="120" y2="114" stroke="rgb(var(--surface))" strokeWidth="1.5" opacity="0.85" />
          <line x1="80" y1="6" x2="80" y2="114" stroke="rgb(var(--surface))" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" />

          {/* ball trace */}
          <path d="M30 95 Q 80 -10 130 25" fill="none" stroke="rgb(var(--accent))" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="130" cy="25" r="4.5" fill="rgb(var(--accent))" />
        </g>

        {/* Coach bubble */}
        <g transform="translate(40 256)">
          <rect width="160" height="50" rx="14" fill="rgb(var(--blush))" />
          <text x="14" y="20" fontFamily="Inter Tight, system-ui, sans-serif" fontSize="8" fontWeight="600" fill="rgb(var(--ink-soft))">COACH</text>
          <text x="14" y="36" fontFamily="Instrument Serif, Georgia, serif" fontSize="13" fill="rgb(var(--ink))">
            Wider stance on the
          </text>
          <text x="14" y="50" fontFamily="Instrument Serif, Georgia, serif" fontSize="13" fill="rgb(var(--ink))">
            backhand.
          </text>
        </g>

        {/* CTA pill */}
        <g transform="translate(60 326)">
          <rect width="120" height="32" rx="16" fill="rgb(var(--accent))" />
          <text x="60" y="20" fontFamily="Inter Tight, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="rgb(var(--surface))" textAnchor="middle">Start drill</text>
        </g>
      </g>
    </svg>
  )
}
