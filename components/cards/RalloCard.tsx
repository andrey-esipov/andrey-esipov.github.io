'use client'

import { RalloPhoneSVG } from '../visuals/RalloPhoneSVG'
import { ProjectButton } from '../ui/ProjectButton'

export function RalloCard() {
  return (
    <div
      data-category="projects"
      className="group relative h-full overflow-hidden rounded-card border border-hairline/60 bg-butter shadow-card transition-[transform,box-shadow] duration-[260ms] ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Soft decorative blob — bottom-left accent */}
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-48 w-48 rounded-full bg-accent/40 blur-2xl" />

      {/* Phone hero — tilted, overflowing top */}
      <div className="pointer-events-none absolute left-1/2 top-[6%] w-[78%] -translate-x-1/2 rotate-[6deg] transition-transform duration-700 ease-smooth group-hover:rotate-[3deg] group-hover:-translate-y-1">
        <div className="float-y">
          <RalloPhoneSVG className="h-auto w-full drop-shadow-[0_22px_36px_rgb(var(--shadow-rgb)/0.18)]" />
        </div>
      </div>

      {/* Animated learn-more pill — bottom-left corner */}
      <div className="absolute bottom-5 left-5 z-20">
        <ProjectButton label="Rallo" href="/rallo" />
      </div>
    </div>
  )
}
