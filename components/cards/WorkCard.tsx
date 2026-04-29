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
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blush/80 blur-2xl" />

      {/* Image #1 — laptop UI, top, tilted left */}
      <div className="pointer-events-none absolute left-[14%] top-[4%] w-[72%] rotate-[-3deg] transition-transform duration-700 ease-smooth group-hover:rotate-[-2deg] group-hover:-translate-y-0.5">
        <Image
          src="/od1.jpg"
          alt="OneDrive on a laptop"
          width={1600}
          height={900}
          priority
          className="h-auto w-full rounded-xl shadow-[0_14px_28px_rgb(var(--shadow-rgb)/0.20)]"
        />
      </div>

      {/* Image #2 — cloud illustration, middle, tilted right */}
      <div className="pointer-events-none absolute left-[9%] top-[30%] w-[78%] rotate-[5deg] transition-transform duration-700 ease-smooth group-hover:rotate-[3deg]">
        <Image
          src="/od2.jpg"
          alt=""
          width={1600}
          height={900}
          aria-hidden
          className="h-auto w-full rounded-xl shadow-[0_14px_28px_rgb(var(--shadow-rgb)/0.20)]"
        />
      </div>

      {/* Image #3 — Photos mobile, lower, tilted left */}
      <div className="pointer-events-none absolute left-[16%] top-[56%] w-[70%] rotate-[-2deg] transition-transform duration-700 ease-smooth group-hover:rotate-[-1deg] group-hover:translate-y-0.5">
        <Image
          src="/od3.jpg"
          alt=""
          width={1600}
          height={900}
          aria-hidden
          className="h-auto w-full rounded-xl shadow-[0_14px_28px_rgb(var(--shadow-rgb)/0.20)]"
        />
      </div>

      {/* Animated learn-more pill — bottom-left corner */}
      <div className="absolute bottom-5 left-5 z-20">
        <ProjectButton label="OneDrive" href="/work" />
      </div>
    </div>
  )
}
