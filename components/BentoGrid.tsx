'use client'

import type { ReactNode } from 'react'

type BentoGridProps = {
  children: ReactNode
  className?: string
}

/**
 * Plain CSS-grid container for the bento. The tiles themselves carry
 * their own motion.div + layout animation + drag, so the wrapper just
 * sets up the responsive column rhythm and gap.
 */
export default function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 ${className}`}>
      {children}
    </div>
  )
}
