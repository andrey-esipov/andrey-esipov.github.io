import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Andrey Yevseyev | Product Architect',
  description: 'Principal PM at Microsoft. Architecting systems at the intersection of AI, Cloud, and Product Operations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}
