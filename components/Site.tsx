'use client'

import { useState } from 'react'
import BentoGrid from './BentoGrid'
import { TopNav, type Filter } from './TopNav'
import { BioCard } from './cards/BioCard'
import { WorkCard } from './cards/WorkCard'
import { RalloCard } from './cards/RalloCard'
import { LocationCard } from './cards/LocationCard'
import { StravaCard } from './cards/StravaCard'
import { ThemeCard } from './cards/ThemeCard'
import { LinkedInCard } from './cards/LinkedInCard'

const SHOW_FOR: Record<Filter, ReadonlyArray<string>> = {
  all: ['bio', 'projects', 'activity', 'about', 'meta'],
  about: ['bio', 'about'],
  projects: ['projects'],
  activity: ['activity'],
}

const placeholderInner =
  'h-full overflow-hidden rounded-card border border-hairline/40 bg-surface-2/55 shadow-card theme-transition'

export default function Site() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = SHOW_FOR[filter]
  const visibleClass = (category: string) => {
    const isOn = visible.includes(category)
    // Tiles outside the active filter desaturate + dim instead of
    // disappearing — the layout stays whole so the visual rhythm reads.
    const dimmed = filter === 'all' || isOn
      ? 'opacity-100'
      : 'opacity-40 saturate-[0.15] pointer-events-none'
    return `transition-[opacity,filter] duration-[320ms] ease-smooth ${dimmed}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav filter={filter} onFilterChange={setFilter} />

      <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4 pb-6 pt-1 md:px-6 lg:px-10 lg:pt-2 xl:px-14">
        {/*
          4 cols × 4 rows of square unit-cells. Tile sizes:
            1:1 square     → Theme · LinkedIn · Strava · Location · placeholders
            1:2 wide (2×1) → Bio
            2:1 tall (1×2) → Work · Rallo
          Empty cells are filled with quiet 1×1 gray placeholders so the
          overall grid reads as a clean 4×4. DOM order matches the visual
          left-to-right / top-to-bottom flow so auto-placement does the
          right thing without manual `grid-row-start` / `grid-column-start`.
        */}
        <BentoGrid className="lg:grid-cols-4 lg:auto-rows-fr lg:[grid-template-rows:repeat(4,minmax(0,1fr))] lg:flex-1">
          {/* Row 1 — Bio · Theme · Work-top */}
          <div
            className={`${visibleClass('bio')} md:col-span-6 lg:col-span-2 lg:row-span-1`}
            data-category="bio"
          >
            <BioCard />
          </div>
          <div
            className={`${visibleClass('meta')} md:col-span-3 lg:col-span-1 lg:row-span-1`}
            data-category="meta"
          >
            <ThemeCard />
          </div>
          <div
            className={`${visibleClass('projects')} md:col-span-3 lg:col-span-1 lg:row-span-2`}
            data-category="projects"
          >
            <WorkCard />
          </div>

          {/* Row 2 — LinkedIn · Strava · Rallo-top · Work-bottom */}
          <div
            className={`${visibleClass('about')} md:col-span-3 lg:col-span-1 lg:row-span-1`}
            data-category="about"
          >
            <LinkedInCard />
          </div>
          <div
            className={`${visibleClass('activity')} md:col-span-3 lg:col-span-1 lg:row-span-1`}
            data-category="activity"
          >
            <StravaCard />
          </div>
          <div
            className={`${visibleClass('projects')} md:col-span-3 lg:col-span-1 lg:row-span-2`}
            data-category="projects"
          >
            <RalloCard />
          </div>

          {/* Row 3 — placeholder · Location · Rallo-bottom · placeholder */}
          <div className="hidden lg:col-span-1 lg:row-span-1 lg:block" aria-hidden="true">
            <div className={placeholderInner} />
          </div>
          <div
            className={`${visibleClass('activity')} md:col-span-3 lg:col-span-1 lg:row-span-1`}
            data-category="activity"
          >
            <LocationCard />
          </div>
          <div className="hidden lg:col-span-1 lg:row-span-1 lg:block" aria-hidden="true">
            <div className={placeholderInner} />
          </div>

          {/* Row 4 — four placeholder squares */}
          <div className="hidden lg:col-span-1 lg:row-span-1 lg:block" aria-hidden="true">
            <div className={placeholderInner} />
          </div>
          <div className="hidden lg:col-span-1 lg:row-span-1 lg:block" aria-hidden="true">
            <div className={placeholderInner} />
          </div>
          <div className="hidden lg:col-span-1 lg:row-span-1 lg:block" aria-hidden="true">
            <div className={placeholderInner} />
          </div>
          <div className="hidden lg:col-span-1 lg:row-span-1 lg:block" aria-hidden="true">
            <div className={placeholderInner} />
          </div>
        </BentoGrid>
      </main>
    </div>
  )
}
