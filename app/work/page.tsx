import type { Metadata } from 'next'
import Image from 'next/image'
import { ProjectDetail } from '@/components/ProjectDetail'

export const metadata: Metadata = {
  title: 'Work — OneDrive · Microsoft',
  description: 'Principal product manager on the OneDrive Sync team at Microsoft.',
}

const TILE = 'rounded-card border border-hairline/60 shadow-card overflow-hidden'

function HeroTile() {
  return (
    <div
      className={`${TILE} relative aspect-[16/8] lg:col-span-12`}
      style={{ background: 'linear-gradient(135deg, rgb(var(--sky)) 0%, rgb(var(--surface)) 100%)' }}
    >
      <Image
        src="/onedrive-hero-blog.jpg"
        alt="OneDrive — product visual"
        fill
        priority
        sizes="(min-width: 1024px) 1100px, 100vw"
        className="object-cover"
      />
    </div>
  )
}

function NumbersTile() {
  return (
    <div className={`${TILE} bg-surface p-7 lg:col-span-4`}>
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        Order of magnitude
      </p>
      <ul className="mt-4 space-y-4">
        <li>
          <p className="font-serif text-[40px] leading-none text-ink md:text-[48px]">10⁹</p>
          <p className="text-[12px] text-ink-soft">devices running the Sync engine</p>
        </li>
        <li>
          <p className="font-serif text-[40px] leading-none text-ink md:text-[48px]">10⁸</p>
          <p className="text-[12px] text-ink-soft">monthly active users</p>
        </li>
      </ul>
    </div>
  )
}

function ProductTile() {
  return (
    <div className={`${TILE} relative aspect-[16/9] lg:col-span-8`}>
      <Image
        src="/onedrive-home.jpg"
        alt="OneDrive home — For you and Recent files"
        fill
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover"
      />
    </div>
  )
}

function FeatureTile({ src, alt, eyebrow, title }: {
  src: string
  alt: string
  eyebrow: string
  title: string
}) {
  return (
    <div className={`${TILE} relative bg-surface-2 lg:col-span-6`}>
      <div className="relative aspect-[16/11]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
      </div>
      <div className="p-5 md:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          {eyebrow}
        </p>
        <h4 className="mt-1.5 font-serif text-[20px] leading-tight tracking-tight-card text-ink md:text-[22px]">
          {title}
        </h4>
      </div>
    </div>
  )
}

function ExternalTile() {
  return (
    <a
      href="https://onedrive.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`${TILE} group/tile relative bg-surface p-7 transition-transform duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover lg:col-span-12`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        Product
      </p>
      <h4 className="mt-2 font-serif text-2xl leading-tight text-ink">
        OneDrive on the web
      </h4>
      <p className="mt-2 text-[14px] text-ink-soft">
        onedrive.com — what we ship for everyone.
      </p>
    </a>
  )
}

export default function WorkPage() {
  return (
    <ProjectDetail
      title="OneDrive"
      tagline="Files at the scale of a billion devices."
      tags={[
        { label: 'Microsoft', href: 'https://onedrive.com', external: true },
        { label: 'Principal PM', external: false },
      ]}
      body={[
        "Principal product manager on the OneDrive Sync team at Microsoft. We build the file engine that runs on Windows, macOS, iOS, Android, and the web — keeping documents, photos, and videos moving between local devices and the cloud.",
        "My work spans product strategy, specs, and the cross-team coordination it takes to ship file experiences inside Windows, Microsoft 365, and a growing surface area of AI-powered products.",
      ]}
      showcase={
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:gap-6 lg:grid-cols-12">
          <HeroTile />
          <NumbersTile />
          <ProductTile />
          <FeatureTile
            src="/onedrive-sync.jpg"
            alt="OneDrive cloud icon — files at rest in the cloud"
            eyebrow="In the product"
            title="Files in the cloud, synced everywhere."
          />
          <FeatureTile
            src="/onedrive-sync-2.jpg"
            alt="Files-on-Demand — download as you need them"
            eyebrow="In the product"
            title="Files download as you need them."
          />
          <ExternalTile />
        </div>
      }
    />
  )
}
