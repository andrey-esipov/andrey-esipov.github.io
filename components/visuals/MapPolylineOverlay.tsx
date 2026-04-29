'use client'

import polyline from '@mapbox/polyline'

/**
 * Web Mercator projection — convert lat/lng to world pixel coordinates
 * at a given zoom level (256 pixels per tile, standard slippy-map math).
 */
function latLngToWorldPx(lat: number, lng: number, zoom: number): [number, number] {
  const tileSize = 256
  const scale = Math.pow(2, zoom) * tileSize
  const x = ((lng + 180) / 360) * scale
  const sinLat = Math.sin((lat * Math.PI) / 180)
  const y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale
  return [x, y]
}

/**
 * Compute a center + zoom that fits the route into a viewport of the given
 * size with some padding margin. Returns the values pigeon-maps expects.
 */
export function fitBoundsForRoute(
  encoded: string,
  viewport: { w: number; h: number },
  paddingPct = 0.12,
): { center: [number, number]; zoom: number } | null {
  let coords: Array<[number, number]>
  try { coords = polyline.decode(encoded) as Array<[number, number]> } catch { return null }
  if (coords.length < 2) return null

  let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity
  for (const [lat, lng] of coords) {
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
  }
  const center: [number, number] = [(minLat + maxLat) / 2, (minLng + maxLng) / 2]
  const targetW = viewport.w * (1 - paddingPct * 2)
  const targetH = viewport.h * (1 - paddingPct * 2)

  for (let z = 18; z >= 2; z--) {
    const [x1, y1] = latLngToWorldPx(maxLat, minLng, z)
    const [x2, y2] = latLngToWorldPx(minLat, maxLng, z)
    const w = Math.abs(x2 - x1)
    const h = Math.abs(y2 - y1)
    if (w <= targetW && h <= targetH) return { center, zoom: z }
  }
  return { center, zoom: 2 }
}

type Props = {
  encoded: string
  center: [number, number]
  zoom: number
  width: number
  height: number
  className?: string
  animated?: boolean
}

/**
 * Renders the activity polyline as an SVG path projected with the same
 * Web Mercator math the map tiles use, so the line aligns to the map
 * underneath. Animated stroke draw-in by default.
 */
export function MapPolylineOverlay({
  encoded,
  center,
  zoom,
  width,
  height,
  className = '',
  animated = true,
}: Props) {
  let coords: Array<[number, number]>
  try { coords = polyline.decode(encoded) as Array<[number, number]> } catch { return null }
  if (coords.length < 2) return null

  const [cx, cy] = latLngToWorldPx(center[0], center[1], zoom)
  const points = coords.map(([lat, lng]) => {
    const [px, py] = latLngToWorldPx(lat, lng, zoom)
    return [width / 2 + (px - cx), height / 2 + (py - cy)] as const
  })

  const d = points.reduce(
    (acc, [x, y], i) =>
      acc + (i === 0 ? `M${x.toFixed(1)} ${y.toFixed(1)}` : ` L${x.toFixed(1)} ${y.toFixed(1)}`),
    '',
  )

  const last = points[points.length - 1]
  const first = points[0]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`pointer-events-none ${className}`}
      role="img"
      aria-label="Activity route"
    >
      <defs>
        <linearGradient id="route-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--ink))" />
          <stop offset="100%" stopColor="rgb(var(--accent))" />
        </linearGradient>
      </defs>

      {/* Soft glow underlay */}
      <path
        d={d}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="6"
        strokeOpacity="0.28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Main route line, gradient + animated draw-in */}
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke="url(#route-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? 'animate-draw' : ''}
        style={animated ? { strokeDasharray: 1, strokeDashoffset: 1 } : undefined}
      />
      {/* Endpoints — quiet static dots, ink for start, accent for finish */}
      <circle cx={first[0]} cy={first[1]} r="3.5" fill="rgb(var(--surface))" stroke="rgb(var(--ink))" strokeWidth="1.5" />
      <circle cx={last[0]} cy={last[1]} r="4" fill="rgb(var(--accent))" stroke="rgb(var(--surface))" strokeWidth="1.5" />
    </svg>
  )
}
