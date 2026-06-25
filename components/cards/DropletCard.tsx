'use client'

import Image from 'next/image'
import { ProjectButton } from '../ui/ProjectButton'

/**
 * Droplet project tile — a tall pillar that fans two real app screenshots
 * (dashboard in front, savings peeking behind) over a soft sage surface,
 * mirroring the Work and Rallo project tiles. Links through to /droplet.
 */
export function DropletCard() {
  return (
    <div
      data-category="projects"
      className="group relative h-full overflow-hidden rounded-card border border-hairline/60 bg-sage shadow-card transition-[transform,box-shadow] duration-[260ms] ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Soft decorative blob — bottom-right sky accent */}
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-48 w-48 rounded-full bg-sky/70 blur-2xl" />

      {/* Back phone — savings, tilted left */}
      <div className="pointer-events-none absolute left-[2%] top-[14%] w-[60%] rotate-[-8deg] transition-transform duration-700 ease-smooth group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]">
        <Image
          src="/droplet-savings.jpg"
          alt=""
          width={680}
          height={1452}
          aria-hidden
          className="h-auto w-full rounded-[1.4rem] border border-white/30 shadow-[0_14px_28px_rgb(var(--shadow-rgb)/0.20)]"
        />
      </div>

      {/* Front phone — dashboard, tilted right, gently floating */}
      <div className="pointer-events-none absolute left-[34%] top-[7%] w-[64%] rotate-[6deg] transition-transform duration-700 ease-smooth group-hover:rotate-[3deg] group-hover:-translate-y-1">
        <div className="float-y">
          <Image
            src="/droplet-dashboard.jpg"
            alt="Droplet — this week's watering dashboard"
            width={680}
            height={1452}
            priority
            className="h-auto w-full rounded-[1.4rem] border border-white/40 shadow-[0_20px_34px_rgb(var(--shadow-rgb)/0.22)]"
          />
        </div>
      </div>

      {/* Learn-more pill — bottom-left corner */}
      <div className="absolute bottom-5 left-5 z-20">
        <ProjectButton label="Droplet" href="/droplet" />
      </div>
    </div>
  )
}
