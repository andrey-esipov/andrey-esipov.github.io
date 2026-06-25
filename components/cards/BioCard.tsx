'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 3l8.5 11.5L3.5 21h2.5l6.5-7.2 5.4 7.2H21l-9-12.1L20.4 3H17.9l-6 6.6L7 3H3z"
        fill="currentColor"
      />
    </svg>
  )
}

const SOCIALS = [
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/andrey-esipov/', label: 'LinkedIn' },
  { Icon: Github,   href: 'https://github.com/andrey-esipov',          label: 'GitHub'   },
  { Icon: XIcon,    href: 'https://x.com/andreyesipov',                label: 'X'        },
  { Icon: Mail,     href: 'mailto:andrey.esipov@outlook.com',           label: 'Email'    },
] as const

export function BioCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [waving, setWaving] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xs = useSpring(x, { stiffness: 160, damping: 22 })
  const ys = useSpring(y, { stiffness: 160, damping: 22 })
  const rotateX = useTransform(ys, [-0.5, 0.5], ['2deg', '-2deg'])
  const rotateY = useTransform(xs, [-0.5, 0.5], ['-2deg', '2deg'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  function handleLeave() {
    setHovering(false)
    x.set(0); y.set(0)
  }
  function triggerWave() {
    setWaving(true)
    window.setTimeout(() => setWaving(false), 850)
  }

  return (
    <div
      data-category="bio"
      className="relative h-full overflow-hidden rounded-card border border-hairline/60 bg-surface shadow-card transition-[background-color,border-color] duration-[260ms] ease-smooth theme-transition perspective-container"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX: hovering ? rotateX : 0,
          rotateY: hovering ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="flex h-full items-center gap-4 p-5 md:gap-5 md:p-6 lg:gap-6 lg:p-7"
      >
        {/* Avatar — click to wave */}
        <button
          type="button"
          onClick={triggerWave}
          aria-label="Wave hello"
          title="Wave hello"
          className="relative shrink-0 overflow-hidden rounded-full shadow-card outline-none ring-accent/40 focus-visible:ring-2"
          style={{
            transform: hovering ? 'translateZ(26px)' : 'translateZ(0)',
            transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
          }}
        >
          <Image
            src="/avatar.png"
            alt="Andrey, illustrated portrait"
            width={736}
            height={736}
            priority
            className={`h-16 w-16 object-cover object-top md:h-[72px] md:w-[72px] lg:h-[84px] lg:w-[84px] ${waving ? 'wave-once' : ''}`}
          />
        </button>

        {/* Name, brief, and socials */}
        <div
          className="min-w-0 flex-1"
          style={{
            transform: hovering ? 'translateZ(16px)' : 'translateZ(0)',
            transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
          }}
        >
          <p className="font-serif text-[19px] leading-[1.2] tracking-tight-display text-ink md:text-[21px] lg:text-[23px] lg:leading-[1.18]">
            I&rsquo;m{' '}
            <span className="font-serif italic text-accent">Andrey</span>
            <span className="text-ink-soft">, a product manager at </span>
            <span className="text-ink">Microsoft</span>
            <span className="text-ink-soft">.</span>
          </p>

          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft md:text-[13px] lg:mt-2 lg:text-[13.5px] lg:leading-[1.55]">
            I work on OneDrive, where hundreds of millions of people trust their
            files to sync quietly in the background. Off the clock: dad of three,
            endurance athlete, building with AI on weekends.
          </p>

          <div className="mt-3 flex items-center gap-2 lg:mt-3.5">
            {SOCIALS.map(({ Icon, href, label }) => {
              const external = href.startsWith('http')
              return (
                <Link
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-surface-2 text-ink-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-surface hover:text-ink lg:h-8 lg:w-8"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
