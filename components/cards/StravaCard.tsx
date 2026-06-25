'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Map } from 'pigeon-maps'
import { Activity, MountainSnow, Plus, Minus } from 'lucide-react'
import { fitBoundsForRoute, MapPolylineOverlay } from '../visuals/MapPolylineOverlay'
import latest from '../../public/data/strava-latest.json'

type StravaActivity = {
  name: string
  type: string
  distance_m: number
  moving_time_s: number
  total_elevation_gain_m: number
  start_date_local: string
  summary_polyline: string | null
}

const STALE_DAYS = 30
const FALLBACK_VIEWPORT = { w: 240, h: 240 }
const MIN_ZOOM = 2
const MAX_ZOOM = 18
// Slightly aggressive padding so the route is comfortably inside the
// tile no matter what the actual rendered size ends up being.
const FIT_PADDING = 0.16

function formatDistance(m: number): string {
  const miles = m / 1609.34
  return miles >= 10 ? `${miles.toFixed(1)} mi` : `${miles.toFixed(2)} mi`
}
function formatPace(distance_m: number, moving_time_s: number): string {
  if (distance_m === 0) return '–'
  const miles = distance_m / 1609.34
  const minPerMile = (moving_time_s / 60) / miles
  const min = Math.floor(minPerMile)
  const sec = Math.round((minPerMile - min) * 60)
  return `${min}:${sec.toString().padStart(2, '0')}/mi`
}
function formatElevation(m: number): string {
  return `${Math.round(m * 3.28084).toLocaleString()} ft`
}
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
function isStale(iso: string): boolean {
  const d = new Date(iso).getTime()
  const days = (Date.now() - d) / (1000 * 60 * 60 * 24)
  return Number.isNaN(days) || days > STALE_DAYS
}

function tileProvider(x: number, y: number, z: number): string {
  const s = 'abc'.charAt(Math.abs(x + y) % 3)
  // OpenStreetMap Standard — natively high-contrast roads and labels
  // so the route reads even on a small tile. No retina variant.
  return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
}

const cardClass =
  'relative h-full overflow-hidden rounded-card border border-hairline/60 bg-sage shadow-card transition-[transform,box-shadow,background-color,border-color] duration-[260ms] ease-smooth theme-transition'

export function StravaCard() {
  const a = latest as StravaActivity
  const stale = !a?.start_date_local || isStale(a.start_date_local)

  // Track the live container size so the polyline overlay can render
  // at exactly the same pixel dimensions the map sees, and so the
  // initial fit picks a zoom that matches the actual tile.
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(FALLBACK_VIEWPORT)
  const [userMoved, setUserMoved] = useState(false)
  const [center, setCenter] = useState<[number, number] | null>(null)
  const [zoom, setZoom] = useState<number>(12)

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      const h = Math.round(entry.contentRect.height)
      if (w > 0 && h > 0) setSize({ w, h })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const initialFit = useMemo(() => {
    if (stale || !a.summary_polyline) return null
    return fitBoundsForRoute(a.summary_polyline, size, FIT_PADDING)
  }, [a.summary_polyline, size, stale])

  // Snap to the freshly-computed fit whenever the container resizes
  // and the user hasn't manually panned/zoomed.
  useEffect(() => {
    if (!initialFit || userMoved) return
    setCenter(initialFit.center)
    setZoom(initialFit.zoom)
  }, [initialFit, userMoved])

  if (stale || !a.summary_polyline || !initialFit || !center) {
    return (
      <div className={`${cardClass} p-4`} data-category="activity">
        <div className="flex h-full flex-col">
          <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
            Out and about
          </p>
          <h3 className="mt-1 font-serif text-[18px] leading-tight tracking-tight-card text-ink">
            Lacing up.
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cardClass} data-category="activity">
      <div className="absolute inset-0 map-warmth">
        <Map
          provider={tileProvider}
          center={center}
          zoom={zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          attribution={false}
          metaWheelZoom
          metaWheelZoomWarning="Use ⌘ + scroll to zoom"
          twoFingerDrag
          onBoundsChanged={({ center: c, zoom: z }) => {
            setCenter([c[0], c[1]])
            setZoom(z)
            setUserMoved(true)
          }}
        />
      </div>

      {/* Polyline uses the same live size as the tile, so it never
          stretches against the map underneath. */}
      <div className="pointer-events-none absolute inset-0">
        <MapPolylineOverlay
          encoded={a.summary_polyline}
          center={center}
          zoom={zoom}
          width={size.w}
          height={size.h}
          className="h-full w-full"
        />
      </div>

      {/* Top-left eyebrow chip */}
      <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full border border-hairline bg-surface px-2 py-0.5 text-[9px] font-semibold uppercase tracking-eyebrow text-ink-soft shadow-floating">
        Out and about
      </span>

      {/* Top-right activity badge */}
      <span className="pointer-events-none absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-hairline bg-surface px-2 py-0.5 text-[9px] font-semibold uppercase tracking-eyebrow text-ink-soft shadow-floating">
        <Activity className="h-2.5 w-2.5" strokeWidth={2.4} />
        {a.type}
      </span>

      {/* Zoom + recenter — bottom-right */}
      <div className="absolute right-3 top-12 z-20 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(z + 1, MAX_ZOOM))}
          aria-label="Zoom in"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-floating transition-colors duration-200 hover:bg-surface-2"
        >
          <Plus className="h-3 w-3" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(z - 1, MIN_ZOOM))}
          aria-label="Zoom out"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-floating transition-colors duration-200 hover:bg-surface-2"
        >
          <Minus className="h-3 w-3" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={() => {
            setCenter(initialFit.center)
            setZoom(initialFit.zoom)
            setUserMoved(false)
          }}
          aria-label="Recenter on route"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-hairline bg-surface text-[8px] font-semibold uppercase tracking-eyebrow text-ink-soft shadow-floating transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
        >
          ⌖
        </button>
      </div>

      {/* Bottom stats chip — activity name + inline stats */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 rounded-xl border border-hairline bg-surface px-3 py-2 shadow-floating">
        <p className="line-clamp-1 font-serif text-[13px] leading-none tracking-tight-card text-ink">
          {a.name}
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-2 text-[10px] text-ink-soft">
          <span className="font-serif text-[12px] leading-none text-ink">
            {formatDistance(a.distance_m)}
          </span>
          <span className="text-ink-soft/40" aria-hidden>·</span>
          <span>{formatPace(a.distance_m, a.moving_time_s)}</span>
          <span className="text-ink-soft/40" aria-hidden>·</span>
          <span className="inline-flex items-center gap-0.5">
            <MountainSnow className="h-2.5 w-2.5" strokeWidth={2.4} />
            {formatElevation(a.total_elevation_gain_m)}
          </span>
          <span className="text-ink-soft/40" aria-hidden>·</span>
          <span>{formatDate(a.start_date_local)}</span>
        </div>
      </div>
    </div>
  )
}
