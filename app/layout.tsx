import type { Metadata } from 'next'
import { serif, sans } from './fonts'
import { ThemeProvider, ThemeBootstrapScript } from '@/components/ThemeProvider'
import { MouseSpotlight } from '@/components/MouseSpotlight'
import { TileSounds } from '@/components/TileSounds'
import './globals.css'

export const metadata: Metadata = {
  title: 'Andrey Esipov - Product @ Microsoft',
  description:
    'Andrey Esipov: product manager at Microsoft on the OneDrive Sync team — file-centric AI, semantic search, smart organization. Off the clock: dad of three, endurance athlete, training neural nets.',
  metadataBase: new URL('https://andrey-esipov.github.io'),
  openGraph: {
    title: 'Andrey Esipov - Product @ Microsoft',
    description:
      'Product manager at Microsoft. OneDrive Sync, file-centric AI, semantic search.',
    url: 'https://andrey-esipov.github.io',
    siteName: 'Andrey Esipov',
    type: 'website',
    images: ['/icon.png'],
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <ThemeBootstrapScript />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <ThemeProvider>
          <MouseSpotlight />
          <TileSounds />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
