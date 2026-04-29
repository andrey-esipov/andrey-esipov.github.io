'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RotateCw, Linkedin, Github, Mail } from 'lucide-react'

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
  const rotateX = useTransform(ys, [-0.5, 0.5], ['3deg', '-3deg'])
  const rotateY = useTransform(xs, [-0.5, 0.5], ['-3deg', '3deg'])

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
        className="relative flex h-full flex-col p-5 md:p-6"
      >
        {/* Top row — avatar (left) + wave pill (right) */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="relative overflow-hidden rounded-full shadow-card"
            style={{
              transform: hovering ? 'translateZ(28px)' : 'translateZ(0)',
              transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
            }}
          >
            <Image
              src="/avatar.png"
              alt="Andrey, illustrated portrait"
              width={736}
              height={736}
              priority
              className={`h-14 w-14 object-cover object-top md:h-16 md:w-16 ${waving ? 'wave-once' : ''}`}
            />
          </div>

          <button
            type="button"
            onClick={triggerWave}
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface/90 px-3 py-1.5 text-[11px] font-medium text-ink-soft shadow-pill backdrop-blur-sm transition-colors duration-200 hover:text-ink"
            aria-label="Wave hello"
          >
            <RotateCw className="h-3 w-3" strokeWidth={2.25} />
            Wave hello
          </button>
        </div>

        {/* Intro + brief — condensed to fit a wide-short tile */}
        <div
          style={{
            transform: hovering ? 'translateZ(20px)' : 'translateZ(0)',
            transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
          }}
          className="mt-3 flex flex-1 flex-col justify-between"
        >
          <div>
            <p className="font-serif text-[20px] leading-[1.18] tracking-tight-display text-ink md:text-[22px]">
              I&rsquo;m{' '}
              <span className="bg-gradient-to-br from-ink via-accent to-accent bg-clip-text font-serif italic text-transparent">
                Andrey
              </span>
              <span className="text-ink-soft">, a product manager at </span>
              <span className="text-ink">Microsoft</span>
              <span className="text-ink-soft">.</span>
            </p>

            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft md:text-[13px]">
              On the OneDrive Sync team, working to make daily file work
              quieter and faster for hundreds of millions of people across
              Windows, Mac, and mobile. I sweat the details, prefer simple
              and elegant solutions over clever ones, and lean on a{' '}
              <span className="text-ink">show&#8209;don&rsquo;t&#8209;tell</span>{' '}
              approach &mdash; fewer slides, more demos. Off the clock:
              dad of three, endurance athlete, training neural nets on
              weekends.
            </p>
          </div>

          <div className="flex items-center justify-end gap-1.5 pt-3">
            {SOCIALS.map(({ Icon, href, label }) => {
              const external = href.startsWith('http')
              return (
                <Link
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-surface-2 text-ink-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-surface hover:text-ink"
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
