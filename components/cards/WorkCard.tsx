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
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-48 w-48 rounded-full bg-blush/80 blur-2xl" />

      {/* Secondary marketing visual — sits behind, tilted right, peeks lower */}
      <div className="pointer-events-none absolute -right-[14%] bottom-[10%] w-[78%] rotate-[7deg] transition-transform duration-700 ease-smooth group-hover:rotate-[5deg] group-hover:translate-y-1">
        <Image
          src="/onedrive-hero-blog.jpg"
          alt=""
          width={1800}
          height={1013}
          aria-hidden
          className="h-auto w-full rounded-2xl shadow-[0_18px_36px_rgb(var(--shadow-rgb)/0.22)]"
        />
      </div>

      {/* Primary product UI — overflows top-right, tilted left */}
      <div className="pointer-events-none absolute -right-[10%] top-[8%] w-[112%] rotate-[-3deg] transition-transform duration-700 ease-smooth group-hover:rotate-[-2deg] group-hover:-translate-y-1">
        <Image
          src="/onedrive-home.jpg"
          alt="OneDrive product UI"
          width={1800}
          height={1013}
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
