'use client'

import { Map } from 'pigeon-maps'
import { Activity, MountainSnow } from 'lucide-react'
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
// 1:1 viewport — matches the small square cell, so the route doesn't
// stretch when the SVG overlays the map.
const VIEWPORT = { w: 280, h: 280 }

function formatDistance(m: number): string {
  const miles = m / 1609.34
  return miles >= 10 ? `${miles.toFixed(1)} mi` : `${miles.toFixed(2)} mi`
}
function formatPace(distance_m: number, moving_time_s: number): string {
  if (distance_m === 0) return '—'
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

function tileProvider(x: number, y: number, z: number, dpr?: number): string {
  const s = 'abc'.charAt(Math.abs(x + y) % 3)
  const retina = (dpr ?? 1) >= 2 ? '@2x' : ''
  // Voyager (no labels) — keeps the colorful neighborhoods + road
  // hierarchy of Voyager but drops place names so the route reads
  // first. Way more visible than the bleached Positron tiles.
  return `https://${s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/${z}/${x}/${y}${retina}.png`
}

const cardClass =
  'relative h-full overflow-hidden rounded-card border border-hairline/60 bg-sage shadow-card transition-[transform,box-shadow,background-color,border-color] duration-[260ms] ease-smooth theme-transition'

export function StravaCard() {
  const a = latest as StravaActivity
  const stale = !a?.start_date_local || isStale(a.start_date_local)

  if (stale || !a.summary_polyline) {
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

  const fit = fitBoundsForRoute(a.summary_polyline, VIEWPORT)

  return (
    <div className={cardClass} data-category="activity">
      {fit && (
        <div className="absolute inset-0 map-warmth">
          <Map
            provider={tileProvider}
            dprs={[1, 2]}
            center={fit.center}
            zoom={fit.zoom}
            mouseEvents={false}
            touchEvents={false}
            attribution={false}
          />
        </div>
      )}

      {fit && (
        <MapPolylineOverlay
          encoded={a.summary_polyline}
          center={fit.center}
          zoom={fit.zoom}
          width={VIEWPORT.w}
          height={VIEWPORT.h}
          className="absolute inset-0 h-full w-full"
        />
      )}

      {/* Top-left eyebrow chip */}
      <span className="absolute left-3 top-3 z-20 rounded-full border border-hairline/40 bg-surface/85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-eyebrow text-ink-soft shadow-pill backdrop-blur-md">
        Out and about
      </span>

      {/* Top-right activity badge */}
      <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-hairline/40 bg-surface/85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-eyebrow text-ink-soft shadow-pill backdrop-blur-md">
        <Activity className="h-2.5 w-2.5" strokeWidth={2.4} />
        {a.type}
      </span>

      {/* Bottom stats chip — activity name + 2-line stats grid */}
      <div className="absolute inset-x-3 bottom-3 z-20 rounded-xl border border-hairline/40 bg-surface/88 px-3 py-2 shadow-pill backdrop-blur-md">
        <p className="line-clamp-1 font-serif text-[13px] leading-none tracking-tight-card text-ink">
          {a.name}
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-2 text-[10px] text-ink-soft">
          <span className="inline-flex items-baseline gap-1">
            <span className="font-serif text-[12px] leading-none text-ink">
              {formatDistance(a.distance_m)}
            </span>
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
