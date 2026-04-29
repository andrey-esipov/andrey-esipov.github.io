'use client'

import { useState } from 'react'
import { motion, useDragControls, type PanInfo } from 'framer-motion'
import { GripVertical } from 'lucide-react'
import BentoGrid from './BentoGrid'
import { TopNav, type Filter } from './TopNav'
import { BioCard } from './cards/BioCard'
import { WorkCard } from './cards/WorkCard'
import { RalloCard } from './cards/RalloCard'
import { LocationCard } from './cards/LocationCard'
import { StravaCard } from './cards/StravaCard'
import { ThemeCard } from './cards/ThemeCard'
import { LinkedInCard } from './cards/LinkedInCard'
import { EducationCard } from './cards/EducationCard'
import { HotTakesCard } from './cards/HotTakesCard'
import { NowCard } from './cards/NowCard'
import { CoffeeCard } from './cards/CoffeeCard'

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
 * Default order — auto-flow places these into a 4×4 grid as:
 *
 *   Row 1: Bio        Bio        Work      Theme
 *   Row 2: LinkedIn   Strava     Work      Rallo
 *   Row 3: Education  Location   HotTakes  Rallo
 *   Row 4: Now        Now        Coffee    Placeholder
 *
 * Tiles can be dragged to swap with another tile (drag handle in the
 * top-right corner of each tile, visible on hover).
 */
const TILES: ReadonlyArray<TileDef> = [
  { id: 'bio',       category: 'bio',      span: 'md:col-span-6 lg:col-span-2 lg:row-span-1', Component: BioCard },
  { id: 'work',      category: 'projects', span: 'md:col-span-3 lg:col-span-1 lg:row-span-2', Component: WorkCard },
  { id: 'theme',     category: 'meta',     span: 'md:col-span-3 lg:col-span-1 lg:row-span-1', Component: ThemeCard },
  { id: 'linkedin',  category: 'about',    span: 'md:col-span-3 lg:col-span-1 lg:row-span-1', Component: LinkedInCard },
  { id: 'strava',    category: 'activity', span: 'md:col-span-3 lg:col-span-1 lg:row-span-1', Component: StravaCard },
  { id: 'rallo',     category: 'projects', span: 'md:col-span-3 lg:col-span-1 lg:row-span-2', Component: RalloCard },
  { id: 'education', category: 'about',    span: 'md:col-span-3 lg:col-span-1 lg:row-span-1', Component: EducationCard },
  { id: 'location',  category: 'activity', span: 'md:col-span-3 lg:col-span-1 lg:row-span-1', Component: LocationCard },
  { id: 'hottakes',  category: 'about',    span: 'md:col-span-3 lg:col-span-1 lg:row-span-1', Component: HotTakesCard },
  { id: 'now',       category: 'about',    span: 'md:col-span-6 lg:col-span-2 lg:row-span-1', Component: NowCard },
  { id: 'coffee',    category: 'about',    span: 'md:col-span-3 lg:col-span-1 lg:row-span-1', Component: CoffeeCard },
  { id: 'ph',        span: 'hidden lg:col-span-1 lg:row-span-1 lg:block', placeholder: true },
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
      className={`group/drag relative ${span} ${dimClass} transition-[opacity,filter] duration-[320ms] ease-smooth`}
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

      <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4 pb-6 pt-1 md:px-6 lg:px-10 lg:pt-2 xl:px-14">
        <BentoGrid className="lg:grid-cols-4 lg:auto-rows-fr lg:[grid-template-rows:repeat(4,minmax(0,1fr))] lg:flex-1">
          {order.map((id) => {
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
                {t.placeholder ? <PlaceholderInner /> : Component ? <Component /> : null}
              </DraggableTile>
            )
          })}
        </BentoGrid>
      </main>
    </div>
  )
}
