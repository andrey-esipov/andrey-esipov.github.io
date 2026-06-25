'use client'

import { useState } from 'react'
import { motion, useDragControls, type PanInfo } from 'framer-motion'
import { GripVertical } from 'lucide-react'
import BentoGrid from './BentoGrid'
import { TopNav, type Filter } from './TopNav'
import { BioCard } from './cards/BioCard'
import { WorkCard } from './cards/WorkCard'
import { RalloCard } from './cards/RalloCard'
import { DropletCard } from './cards/DropletCard'
import { LocationCard } from './cards/LocationCard'
import { StravaCard } from './cards/StravaCard'
import { EducationCard } from './cards/EducationCard'
import { HotTakesCard } from './cards/HotTakesCard'
import { NowCard } from './cards/NowCard'
import { CoffeeCard } from './cards/CoffeeCard'
import { NewsletterCard } from './cards/NewsletterCard'

const SHOW_FOR: Record<Filter, ReadonlyArray<string>> = {
  all: ['bio', 'projects', 'activity', 'about', 'meta'],
  about: ['bio', 'about'],
  projects: ['projects'],
  activity: ['activity'],
}

type TileDef = {
  id: string
  category?: string
  span: string
  Component?: React.ComponentType
  placeholder?: boolean
}

/*
 * Default order — auto-flow packs these into a 4×4 grid on large screens:
 *
 *   Row 1: Bio       Bio        Work      Rallo
 *   Row 2: Droplet   Strava     Work      Rallo
 *   Row 3: Droplet   Now        Education Location
 *   Row 4: HotTakes  Coffee     Newsletter Newsletter
 *
 * Bio is a wide 2×1 lead card; Work / Rallo / Droplet are three matching 1×2
 * project pillars; Newsletter is a wide 2×1 CTA closing the grid. The
 * image-driven tiles carry a mobile/tablet min-height so they don't collapse
 * before the large-screen row spans kick in. Tiles can be dragged to swap
 * (drag handle, top-right on hover).
 */
const PILLAR = 'md:col-span-3 lg:col-span-1 lg:row-span-2 min-h-[420px] lg:min-h-0'
const VISUAL = 'md:col-span-3 lg:col-span-1 lg:row-span-1 min-h-[210px] lg:min-h-0'
const SMALL = 'md:col-span-3 lg:col-span-1 lg:row-span-1'
const WIDE = 'md:col-span-6 lg:col-span-2 lg:row-span-1'

const TILES: ReadonlyArray<TileDef> = [
  { id: 'bio',       category: 'bio',      span: WIDE, Component: BioCard },
  { id: 'work',      category: 'projects', span: PILLAR, Component: WorkCard },
  { id: 'rallo',     category: 'projects', span: PILLAR, Component: RalloCard },
  { id: 'droplet',   category: 'projects', span: PILLAR, Component: DropletCard },
  { id: 'strava',    category: 'activity', span: VISUAL, Component: StravaCard },
  { id: 'now',       category: 'about',    span: SMALL,  Component: NowCard },
  { id: 'education', category: 'about',    span: SMALL,  Component: EducationCard },
  { id: 'location',  category: 'activity', span: VISUAL, Component: LocationCard },
  { id: 'hottakes',  category: 'about',    span: SMALL,  Component: HotTakesCard },
  { id: 'coffee',    category: 'about',    span: SMALL,  Component: CoffeeCard },
  { id: 'newsletter',category: 'projects', span: WIDE,   Component: NewsletterCard },
]

const TILES_BY_ID: Record<string, TileDef> = Object.fromEntries(TILES.map((t) => [t.id, t]))
const INITIAL_ORDER = TILES.map((t) => t.id)

function PlaceholderInner() {
  return (
    <div className="h-full overflow-hidden rounded-card border border-hairline/40 bg-surface-2/55 shadow-card theme-transition" />
  )
}

type DraggableTileProps = {
  id: string
  span: string
  category?: string
  dimClass: string
  onSwap: (id: string, info: PanInfo) => void
  placeholder?: boolean
  children: React.ReactNode
}

function DraggableTile({
  id,
  span,
  category,
  dimClass,
  onSwap,
  placeholder,
  children,
}: DraggableTileProps) {
  const dragControls = useDragControls()
  return (
    <motion.div
      layout
      drag={!placeholder}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragSnapToOrigin
      whileDrag={{ scale: 1.03, zIndex: 50 }}
      transition={{ layout: { type: 'spring', stiffness: 360, damping: 32 } }}
      onDragEnd={(_, info) => onSwap(id, info)}
      className={`group/drag relative min-h-0 min-w-0 ${span} ${dimClass} transition-[opacity,filter] duration-[320ms] ease-smooth`}
      data-tile-id={id}
      data-category={category ?? ''}
    >
      {!placeholder && (
        <button
          type="button"
          onPointerDown={(e) => {
            e.stopPropagation()
            dragControls.start(e)
          }}
          aria-label="Drag to rearrange"
          title="Drag to rearrange"
          className="absolute right-2.5 top-2.5 z-40 inline-flex h-7 w-7 cursor-grab items-center justify-center rounded-full border border-hairline/60 bg-surface/90 text-ink-soft opacity-0 shadow-pill backdrop-blur-md transition-opacity duration-200 ease-smooth hover:text-ink active:cursor-grabbing group-hover/drag:opacity-90 hover:!opacity-100"
        >
          <GripVertical className="h-3.5 w-3.5" strokeWidth={2.4} />
        </button>
      )}
      {children}
    </motion.div>
  )
}

export default function Site() {
  const [filter, setFilter] = useState<Filter>('all')
  const [order, setOrder] = useState<string[]>(INITIAL_ORDER)

  const visible = SHOW_FOR[filter]

  function dimClass(category?: string): string {
    if (!category) return 'opacity-100'
    if (filter === 'all' || visible.includes(category)) return 'opacity-100'
    return 'opacity-40 saturate-[0.15] pointer-events-none'
  }

  function handleSwap(id: string, info: PanInfo) {
    const el = document.elementFromPoint(info.point.x, info.point.y)
    if (!el) return
    const tileEl = (el as Element).closest('[data-tile-id]') as HTMLElement | null
    if (!tileEl) return
    const targetId = tileEl.dataset.tileId
    if (!targetId || targetId === id) return
    setOrder((prev) => {
      const next = [...prev]
      const i1 = next.indexOf(id)
      const i2 = next.indexOf(targetId)
      if (i1 === -1 || i2 === -1) return prev
      ;[next[i1], next[i2]] = [next[i2], next[i1]]
      return next
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav filter={filter} onFilterChange={setFilter} />

      <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4 pb-10 pt-1 md:px-6 lg:px-10 lg:pb-14 lg:pt-2 xl:px-14">
        <BentoGrid className="lg:grid-cols-4 lg:auto-rows-[210px]">
          {order.map((id, index) => {
            const t = TILES_BY_ID[id]
            const Component = t.Component
            return (
              <DraggableTile
                key={id}
                id={id}
                span={t.span}
                category={t.category}
                dimClass={dimClass(t.category)}
                onSwap={handleSwap}
                placeholder={t.placeholder}
              >
                <div
                  className="tile-in h-full"
                  style={{ animationDelay: `${Math.min(index * 35, 350)}ms` }}
                >
                  {t.placeholder ? <PlaceholderInner /> : Component ? <Component /> : null}
                </div>
              </DraggableTile>
            )
          })}
        </BentoGrid>
      </main>
    </div>
  )
}
