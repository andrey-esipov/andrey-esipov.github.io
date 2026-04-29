'use client'

import polyline from '@mapbox/polyline'

type Props = {
  encoded: string
  width?: number
  height?: number
  className?: string
}

/**
 * Decodes a Strava-style encoded polyline (Google's algorithm) and renders it
 * as an SVG path normalized to fit the given viewport. The path uses
 * stroke-dasharray for a draw-in animation on first paint, with a soft
 * pulsing dot at the end position.
 */
export function RoutePolyline({
  encoded,
  width = 280,
  height = 140,
  className = '',
}: Props) {
  if (!encoded) return null

  let coords: Array<[number, number]> = []
  try {
    coords = polyline.decode(encoded) as Array<[number, number]>
  } catch {
    return null
  }
  if (coords.length < 2) return null

  let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity
  for (const [lat, lng] of coords) {
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
  }

  const padding = 12
  const w = width - padding * 2
  const h = height - padding * 2
  const lngSpan = Math.max(maxLng - minLng, 1e-6)
  const latSpan = Math.max(maxLat - minLat, 1e-6)

  const scale = Math.min(w / lngSpan, h / latSpan)
  const offsetX = (width - lngSpan * scale) / 2
  const offsetY = (height - latSpan * scale) / 2

  const points = coords.map(([lat, lng]) => {
    const x = (lng - minLng) * scale + offsetX
    const y = (maxLat - lat) * scale + offsetY
    return [x, y] as const
  })

  const d = points.reduce(
    (acc, [x, y], i) =>
      acc + (i === 0 ? `M${x.toFixed(1)} ${y.toFixed(1)}` : ` L${x.toFixed(1)} ${y.toFixed(1)}`),
    '',
  )

  const last = points[points.length - 1]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="Map of last activity route"
    >
      <defs>
        <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--ink))" />
          <stop offset="100%" stopColor="rgb(var(--accent))" />
        </linearGradient>
      </defs>
      {/* Animated draw-in path (uses pathLength=1 trick so dasharray is normalized) */}
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke="url(#route-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw"
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
      <circle cx={last[0]} cy={last[1]} r="3.6" fill="rgb(var(--accent))" />
      <circle cx={last[0]} cy={last[1]} r="3.6" fill="rgb(var(--accent))" opacity="0.55" className="pulse-soft" />
    </svg>
  )
}
