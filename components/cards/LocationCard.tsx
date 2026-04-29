'use client'

import { useState } from 'react'
import { Map, Marker } from 'pigeon-maps'
import { Plus, Minus } from 'lucide-react'

const NASHVILLE: [number, number] = [36.1627, -86.7816]
const MIN_ZOOM = 4
const MAX_ZOOM = 17
const DEFAULT_ZOOM = 9

function tileProvider(x: number, y: number, z: number): string {
  const s = 'abc'.charAt(Math.abs(x + y) % 3)
  // OpenStreetMap Standard — high-contrast roads + clear labels.
  return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
}

function MarkerPin() {
  return (
    <div className="relative flex h-7 w-7 items-center justify-center">
      <span className="absolute h-7 w-7 rounded-full bg-accent/35 pulse-soft" />
      <span className="absolute h-4 w-4 rounded-full bg-accent/70" />
      <span className="relative h-2 w-2 rounded-full bg-surface ring-2 ring-accent shadow-pill" />
    </div>
  )
}

export function LocationCard() {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [center, setCenter] = useState<[number, number]>(NASHVILLE)

  return (
    <div
      data-category="activity"
      className="group relative h-full overflow-hidden rounded-card border border-hairline/60 bg-blush shadow-card transition-[transform,box-shadow,background-color,border-color] duration-[260ms] ease-smooth theme-transition"
    >
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
          }}
        >
          <Marker anchor={NASHVILLE} width={28} offset={[14, 14]}>
            <MarkerPin />
          </Marker>
        </Map>
      </div>

      {/* Floating label chip — top-left */}
      <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-xl border border-hairline/40 bg-surface/85 px-3 py-2 shadow-pill backdrop-blur-md">
        <p className="text-[9px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Based in
        </p>
        <h3 className="mt-0.5 font-serif text-[16px] leading-[1.05] tracking-tight-card text-ink md:text-[17px]">
          Nashville,&nbsp;TN.
        </h3>
      </div>

      {/* Recenter pill — top-right */}
      <div className="absolute right-3 top-3 z-20">
        <button
          type="button"
          onClick={() => {
            setCenter(NASHVILLE)
            setZoom(DEFAULT_ZOOM)
          }}
          aria-label="Recenter on Nashville"
          className="rounded-full border border-hairline/60 bg-surface/90 px-2.5 py-1 text-[10px] font-medium text-ink-soft shadow-pill backdrop-blur-md transition-colors duration-200 hover:text-ink"
        >
          Recenter
        </button>
      </div>

      {/* Zoom controls — bottom-right */}
      <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(z + 1, MAX_ZOOM))}
          aria-label="Zoom in"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline/60 bg-surface/90 text-ink shadow-pill backdrop-blur-md transition-colors duration-200 hover:bg-surface"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(z - 1, MIN_ZOOM))}
          aria-label="Zoom out"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline/60 bg-surface/90 text-ink shadow-pill backdrop-blur-md transition-colors duration-200 hover:bg-surface"
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-1.5 left-2.5 z-20 text-[8px] text-ink-soft/70">
        © OpenStreetMap
      </p>
    </div>
  )
}
