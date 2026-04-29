'use client'

import { useEffect } from 'react'

/**
 * Tiny client-only effect that updates --mouse-x / --mouse-y on body
 * for the soft spotlight gradient defined in globals.css. Renders nothing.
 * Disabled on touch-primary devices to avoid pointless writes.
 */
export function MouseSpotlight() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let nextX = '50%'
    let nextY = '30%'

    function onMove(e: MouseEvent) {
      nextX = `${e.clientX}px`
      nextY = `${e.clientY}px`
      if (!raf) {
        raf = window.requestAnimationFrame(apply)
      }
    }
    function apply() {
      raf = 0
      document.body.style.setProperty('--mouse-x', nextX)
      document.body.style.setProperty('--mouse-y', nextY)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
