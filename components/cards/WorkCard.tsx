'use client'

import Image from 'next/image'
import { ProjectButton } from '../ui/ProjectButton'

export function WorkCard() {
  return (
    <div
      data-category="projects"
      className="group relative h-full overflow-hidden rounded-card border border-hairline/60 bg-sky shadow-card transition-[transform,box-shadow] duration-[260ms] ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Soft decorative blob — bottom-left blush */}
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-blush/80 blur-2xl" />

      {/* OneDrive product hero — tilted, overflowing top-right */}
      <div className="pointer-events-none absolute -right-[10%] top-[16%] w-[108%] rotate-[-3deg] transition-transform duration-700 ease-smooth group-hover:rotate-[-2deg] group-hover:-translate-y-1">
        <Image
          src="/onedrive-hero.jpg"
          alt="OneDrive product screenshot"
          width={1200}
          height={800}
          priority
          className="h-auto w-full rounded-2xl shadow-[0_22px_44px_rgb(var(--shadow-rgb)/0.18)]"
        />
      </div>

      {/* Animated learn-more pill — bottom-left corner */}
      <div className="absolute bottom-5 left-5 z-20">
        <ProjectButton label="OneDrive" href="/work" />
      </div>
    </div>
  )
}
