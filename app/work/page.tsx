import type { Metadata } from 'next'
import Image from 'next/image'
import { ProjectDetail } from '@/components/ProjectDetail'

export const metadata: Metadata = {
  title: 'Work — OneDrive · Microsoft',
  description: 'Principal product manager on the OneDrive Sync team at Microsoft.',
}

const TILE = 'rounded-card border border-hairline/60 shadow-card overflow-hidden'

function ImageTile({
  src,
  alt,
  span,
  aspect = 'aspect-[16/9]',
  priority = false,
  sizes,
}: {
  src: string
  alt: string
  span: string
  aspect?: string
  priority?: boolean
  sizes: string
}) {
  return (
    <div className={`${TILE} relative ${aspect} ${span}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
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
          <ImageTile
            src="/onedrive-hero-blog.jpg"
            alt="OneDrive — product visual"
            span="lg:col-span-12"
            aspect="aspect-[16/8]"
            priority
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
          <ImageTile
            src="/onedrive-home.jpg"
            alt="OneDrive home — For you and Recent files"
            span="lg:col-span-12"
            aspect="aspect-[16/9]"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        </div>
      }
    />
  )
}
