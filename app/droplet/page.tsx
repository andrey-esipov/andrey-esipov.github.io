import type { Metadata } from 'next'
import Image from 'next/image'
import { ProjectDetail } from '@/components/ProjectDetail'
import { DropletGlyph } from '@/components/visuals/DropletGlyph'

export const metadata: Metadata = {
  title: 'Droplet · water-saving control for Rain Bird sprinklers',
  description:
    'Droplet: a modern, open-source replacement for the Rain Bird app that waters the right amount using free weather data, and proves the savings in real dollars.',
}

const TILE = 'rounded-card border border-hairline/60 shadow-card overflow-hidden'

function WordmarkTile() {
  return (
    <div className={`${TILE} bg-surface flex flex-col justify-center gap-4 p-8 md:p-10 lg:col-span-8`}>
      <DropletGlyph className="h-12 w-12" />
      <span className="font-serif text-[72px] leading-none tracking-tight-display text-ink md:text-[104px]">
        Droplet<span style={{ color: '#0E7C86' }}>.</span>
      </span>
      <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink-soft md:text-base">
        Real dollars, right-sized to the weather. The sprinkler app that waters
        only what your yard needs.
      </p>
    </div>
  )
}

function GlyphTile() {
  return (
    <div
      className={`${TILE} flex items-center justify-center p-10 lg:col-span-4`}
      style={{ background: 'linear-gradient(150deg, rgb(var(--sky)) 0%, rgb(var(--sage)) 100%)' }}
    >
      <DropletGlyph className="h-28 w-28 drop-shadow-[0_18px_30px_rgb(var(--shadow-rgb)/0.22)]" />
    </div>
  )
}

function ScreenTile({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className={`${TILE} bg-surface-2 p-3 lg:col-span-4`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <p className="px-1.5 pb-1 pt-3 text-[12px] font-medium tracking-tight-card text-ink-soft">{label}</p>
    </div>
  )
}

function ModeTile({
  eyebrow,
  title,
  body,
  tone,
}: {
  eyebrow: string
  title: string
  body: string
  tone: 'surface-2' | 'sage'
}) {
  const bg = tone === 'sage' ? 'bg-sage' : 'bg-surface-2'
  return (
    <div className={`${TILE} ${bg} p-7 md:p-8 lg:col-span-6`}>
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">{eyebrow}</p>
      <h4 className="mt-2 font-serif text-2xl leading-tight text-ink md:text-[26px]">{title}</h4>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft md:text-[15px]">{body}</p>
    </div>
  )
}

function MethodologyTile() {
  return (
    <div className={`${TILE} bg-surface p-7 md:p-8 lg:col-span-12`}>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">No sensors</p>
          <h4 className="mt-2 font-serif text-2xl leading-tight text-ink md:text-[26px]">
            Savings you can see, not guess.
          </h4>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft md:text-[15px]">
            Droplet estimates your water use and cost from your setup and local
            weather. No flow meters, no catch-cups. It&rsquo;s an honest model,
            labelled as an estimate, that turns &ldquo;am I overwatering?&rdquo;
            into a number in dollars.
          </p>
        </div>
        <div className="flex shrink-0 items-end gap-3">
          <span className="font-serif text-[44px] leading-none tracking-tight-display text-ink md:text-[56px]">
            +$2.29
          </span>
          <span className="pb-1 text-[13px] text-ink-soft">/ mo, weather-adjusted</span>
        </div>
      </div>
    </div>
  )
}

export default function DropletPage() {
  return (
    <ProjectDetail
      title="Droplet"
      tagline="Water the right amount, and prove the savings in real dollars."
      tags={[
        { label: 'Rain Bird LNK' },
        { label: 'Expo / React Native' },
        { label: 'Open source' },
      ]}
      body={[
        "Droplet is the sprinkler app I'm building to replace Rain Bird's flaky official one. Its whole job is to water the right amount and cut your water bill, then show the savings back to you in real dollars.",
        "It leans on free, accurate weather and evapotranspiration data to apply only what your yard actually needs, and estimates usage and cost without any extra hardware. No flow meters, no catch-cups to bury in the lawn.",
        "Run it local-only on your home WiFi, or add an always-on bridge for weather-based watering while you're away, history, notifications, and an AI assistant. Open-source, and in active development.",
      ]}
      showcase={
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:gap-6 lg:grid-cols-12">
          <WordmarkTile />
          <GlyphTile />
          <ScreenTile src="/droplet-dashboard.jpg" alt="Droplet dashboard: this week's watering, on target" label="On-target watering, at a glance." />
          <ScreenTile src="/droplet-reveal.jpg" alt="Droplet onboarding: your water balance result" label="A weather-adjusted schedule in a minute." />
          <ScreenTile src="/droplet-savings.jpg" alt="Droplet savings: real dollars, right-sized to the weather" label="Savings, in real dollars." />
          <ModeTile
            eyebrow="Local mode"
            title="Just the app, no extra hardware."
            body="On your home WiFi it talks straight to your controller: manual control, schedules, and sensor-free savings estimates."
            tone="surface-2"
          />
          <ModeTile
            eyebrow="Smart mode"
            title="An always-on bridge for hands-off watering."
            body="Add a small service on a Mac, Pi, or NAS for bulletproof weather-based watering while you're away, plus history, notifications, remote access, and an AI assistant."
            tone="sage"
          />
          <MethodologyTile />
        </div>
      }
    />
  )
}
