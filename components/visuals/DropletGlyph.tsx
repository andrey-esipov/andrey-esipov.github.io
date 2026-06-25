'use client'

import { useId } from 'react'

type DropletGlyphProps = {
  className?: string
  /** Wrap the droplet in a soft, theme-aware circular badge (as on the app's welcome screen). */
  withBadge?: boolean
  title?: string
}

/**
 * Bespoke Droplet brand mark — a friendly teal water droplet with a highlight
 * bubble and a soft "smile" waterline, recreated from the app's own icon.
 *
 * The teal gradient is the product's fixed brand colour (it reads well on every
 * site theme, light through night), while the optional badge uses surface
 * tokens so it adapts to the active theme.
 */
export function DropletGlyph({ className = '', withBadge = false, title }: DropletGlyphProps) {
  const uid = useId().replace(/:/g, '')
  const grad = `droplet-body-${uid}`
  const sheen = `droplet-sheen-${uid}`

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={grad} x1="0.28" y1="0.04" x2="0.72" y2="1">
          <stop offset="0%" stopColor="#33A7B4" />
          <stop offset="52%" stopColor="#0E7C86" />
          <stop offset="100%" stopColor="#124E59" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {withBadge && (
        <circle cx="50" cy="50" r="48" fill="rgb(var(--surface))" stroke="rgb(var(--hairline))" strokeWidth="1" />
      )}

      {/* Teardrop body */}
      <path
        d="M50 14 C 50 14 78 44 78 64 A 28 28 0 1 1 22 64 C 22 44 50 14 50 14 Z"
        fill={`url(#${grad})`}
      />

      {/* Highlight bubble */}
      <circle cx="40" cy="46" r="6.5" fill={`url(#${sheen})`} />

      {/* Smile waterline */}
      <path
        d="M34 71 Q 50 81 66 71"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.75"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
