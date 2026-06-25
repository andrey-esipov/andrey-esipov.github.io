import type { Metadata } from 'next'
import Image from 'next/image'
import { ProjectDetail } from '@/components/ProjectDetail'

export const metadata: Metadata = {
  title: 'Rallo · AI tennis coach for iOS',
  description: 'Rallo: an AI tennis coach for iOS that watches your swing and tells you what to fix.',
}

const TILE = 'rounded-card border border-hairline/60 shadow-card overflow-hidden'

function WordmarkTile() {
  return (
    <div className={`${TILE} bg-surface flex items-center justify-center p-10 lg:col-span-6 lg:row-span-1`}>
      <span className="font-serif text-[88px] leading-none tracking-tight-display md:text-[120px]">
        <span className="text-ink">Rallo</span>
        <span className="text-accent">.</span>
      </span>
    </div>
  )
}

function IconOutlineTile() {
  return (
    <div className={`${TILE} bg-surface flex items-center justify-center p-10 lg:col-span-3`}>
      <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden="true">
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgb(var(--accent))" strokeWidth="3" />
        <path d="M 50 14 C 35 32 35 68 50 86" fill="none" stroke="rgb(var(--accent))" strokeWidth="3" />
        <path d="M 50 14 C 65 32 65 68 50 86" fill="none" stroke="rgb(var(--accent))" strokeWidth="3" />
      </svg>
    </div>
  )
}

function IconFilledTile() {
  return (
    <div className={`${TILE} flex items-center justify-center p-10 lg:col-span-3`} style={{ background: 'linear-gradient(135deg, rgb(var(--accent)) 0%, rgb(var(--blush)) 100%)' }}>
      <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden="true">
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgb(var(--surface))" strokeWidth="3" />
        <path d="M 50 14 C 35 32 35 68 50 86" fill="none" stroke="rgb(var(--surface))" strokeWidth="3" />
        <path d="M 50 14 C 65 32 65 68 50 86" fill="none" stroke="rgb(var(--surface))" strokeWidth="3" />
      </svg>
    </div>
  )
}

function PhoneTile() {
  return (
    <div className={`${TILE} relative bg-butter overflow-hidden lg:col-span-4 lg:row-span-2 min-h-[420px]`}>
      <div className="pointer-events-none absolute -bottom-5 left-1/2 h-[68%] -translate-x-1/2 rotate-[2deg]">
        <Image
          src="/rallo-stats.jpg"
          alt="Rallo: weekly training load and on-court stats"
          width={680}
          height={1478}
          className="h-full w-auto rounded-[1.6rem] border border-white/50 shadow-[0_20px_36px_rgb(var(--shadow-rgb)/0.22)]"
        />
      </div>
      <p className="relative z-10 px-7 pt-7 font-serif text-[26px] leading-[1.1] text-ink md:text-[28px]">
        Watches your swing.
      </p>
      <p className="relative z-10 px-7 pt-2 text-[13px] text-ink-soft md:text-[14px]">
        Frame-by-frame.
      </p>
    </div>
  )
}

function PrincipleTile({ title, body, tone = 'surface-2' }: { title: string; body: string; tone?: 'surface-2' | 'sage' | 'blush' }) {
  const bg = tone === 'sage' ? 'bg-sage' : tone === 'blush' ? 'bg-blush' : 'bg-surface-2'
  return (
    <div className={`${TILE} ${bg} p-7 lg:col-span-4`}>
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">Principle</p>
      <h4 className="mt-2 font-serif text-2xl leading-tight text-ink md:text-[24px]">{title}</h4>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

function PaletteTile() {
  const swatches = ['var(--accent)', 'var(--butter)', 'var(--sage)', 'var(--blush)', 'var(--ink)']
  return (
    <div className={`${TILE} bg-surface p-7 lg:col-span-4`}>
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">Palette</p>
      <h4 className="mt-2 font-serif text-2xl leading-tight text-ink">Sun, court, ink.</h4>
      <div className="mt-5 flex gap-2">
        {swatches.map((c) => (
          <span
            key={c}
            className="h-10 flex-1 rounded-xl border border-hairline/60"
            style={{ background: `rgb(${c})` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function RalloPage() {
  return (
    <ProjectDetail
      title="Rallo"
      tagline="An AI tennis coach for iOS that watches your swing and tells you what to fix."
      tags={[
        { label: 'iOS', href: '#', external: false },
        { label: 'AI', href: '#', external: false },
        { label: 'Personal', href: '#', external: false },
      ]}
      body={[
        "I'm building Rallo as a tennis coach in your pocket. Point your phone at the court and it watches your stance, contact point, and follow-through, then tells you what one thing to change next.",
        "It's the side project I keep coming back to. Tennis is precise enough that small adjustments compound, and recreational players almost never get film, let alone film with feedback. Rallo is what I wish I had on every weekend court.",
        "Right now: native SwiftUI app, on-device pose estimation, GPT-powered drill recommendations. Slowly opening to a wider beta as the model improves.",
      ]}
      showcase={
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:gap-6 lg:grid-cols-12">
          <WordmarkTile />
          <IconOutlineTile />
          <IconFilledTile />
          <PhoneTile />
          <PrincipleTile
            title="One thing per session."
            body="Don't list ten flaws. Pick the highest-leverage adjustment and drill it."
            tone="surface-2"
          />
          <PaletteTile />
          <PrincipleTile
            title="Court-quiet UX."
            body="Glanceable feedback between points. No reading, no fiddling, no menus during play."
            tone="sage"
          />
          <PrincipleTile
            title="Coach voice, not chat."
            body="Short. Specific. Encouraging. Not a wall of GPT prose."
            tone="blush"
          />
        </div>
      }
    />
  )
}
