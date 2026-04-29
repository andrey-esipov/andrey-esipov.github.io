'use client'

import { Map, Marker } from 'pigeon-maps'

const NASHVILLE: [number, number] = [36.1627, -86.7816]

function tileProvider(x: number, y: number, z: number, dpr?: number): string {
  const s = 'abc'.charAt(Math.abs(x + y) % 3)
  const retina = (dpr ?? 1) >= 2 ? '@2x' : ''
  // Voyager — colorful neighborhoods + visible road hierarchy. Has
  // the labels (Nashville · La Vergne · etc.) so a small map still
  // tells you where you're looking.
  return `https://${s}.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}${retina}.png`
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

/**
 * Compact "where I am" tile (1:1 small). Static decorative map — no
 * pan/zoom controls, no mouse interaction. The map tile is just here to
 * give Nashville some texture; the headline does the heavy lifting.
 */
export function LocationCard() {
  return (
    <div
      data-category="activity"
      className="group relative h-full overflow-hidden rounded-card border border-hairline/60 bg-blush shadow-card transition-[transform,box-shadow,background-color,border-color] duration-[260ms] ease-smooth theme-transition"
    >
      <div className="absolute inset-0 map-warmth">
        <Map
          provider={tileProvider}
          dprs={[1, 2]}
          center={NASHVILLE}
          zoom={9}
          mouseEvents={false}
          touchEvents={false}
          attribution={false}
        >
          <Marker anchor={NASHVILLE} width={28} offset={[14, 14]}>
            <MarkerPin />
          </Marker>
        </Map>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-xl border border-hairline/40 bg-surface/85 px-3 py-2 shadow-pill backdrop-blur-md">
        <p className="text-[9px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          Based in
        </p>
        <h3 className="mt-0.5 font-serif text-[16px] leading-[1.05] tracking-tight-card text-ink md:text-[17px]">
          Nashville,&nbsp;TN.
        </h3>
      </div>

      <p className="absolute bottom-1.5 right-2.5 z-20 text-[8px] text-ink-soft/70">
        © OSM · CartoDB
      </p>
    </div>
  )
}
