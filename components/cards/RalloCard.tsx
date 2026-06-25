'use client'

import Image from 'next/image'
import { ProjectButton } from '../ui/ProjectButton'

/**
 * Rallo project tile — a tall pillar that fans two real iOS app screenshots
 * (the Today hero in front, the weekly Stats screen peeking behind) over a
 * warm butter surface, mirroring the Work and Droplet project tiles.
 * Links through to /rallo.
 */
export function RalloCard() {
  return (
    <div
      data-category="projects"
      className="group relative h-full overflow-hidden rounded-card border border-hairline/60 bg-butter shadow-card transition-[transform,box-shadow] duration-[260ms] ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Soft decorative blob — bottom-left accent */}
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-48 w-48 rounded-full bg-accent/40 blur-2xl" />

      {/* Back phone — weekly stats, tilted left */}
      <div className="pointer-events-none absolute left-[2%] top-[13%] w-[60%] rotate-[-8deg] transition-transform duration-700 ease-smooth group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]">
        <Image
          src="/rallo-stats.jpg"
          alt=""
          width={680}
          height={1478}
          aria-hidden
          className="h-auto w-full rounded-[1.4rem] border border-white/40 shadow-[0_14px_28px_rgb(var(--shadow-rgb)/0.20)]"
        />
      </div>

      {/* Front phone — Today hero, tilted right, gently floating */}
      <div className="pointer-events-none absolute left-[34%] top-[6%] w-[64%] rotate-[6deg] transition-transform duration-700 ease-smooth group-hover:rotate-[3deg] group-hover:-translate-y-1">
        <div className="float-y">
          <Image
            src="/rallo-today.jpg"
            alt="Rallo: every stroke, in focus"
            width={680}
            height={1478}
            priority
            className="h-auto w-full rounded-[1.4rem] border border-white/50 shadow-[0_20px_34px_rgb(var(--shadow-rgb)/0.22)]"
          />
        </div>
      </div>

      {/* Animated learn-more pill — bottom-left corner */}
      <div className="absolute bottom-5 left-5 z-20">
        <ProjectButton label="Rallo" href="/rallo" />
      </div>
    </div>
  )
}
