'use client'

import { useEffect } from 'react'

/**
 * Subtle hover-tick sound across bento tiles. Uses the Web Audio API to
 * synthesize a brief downward-swept "click" — no audio file needed.
 *
 * The first user gesture (click/keydown/touch) unlocks the AudioContext;
 * subsequent mouseover entries on `[data-category]` cards play the tick.
 * Disabled on touch-primary devices and when the user prefers reduced motion.
 */
export function TileSounds() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    type AnyAC = typeof AudioContext | undefined
    const Ctor: AnyAC =
      window.AudioContext || (window as unknown as { webkitAudioContext?: AnyAC }).webkitAudioContext
    if (!Ctor) return

    let ctx: AudioContext | null = null
    let unlocked = false
    let lastEl: Element | null = null
    let lastPlayedAt = 0

    function unlock() {
      if (unlocked) return
      try {
        ctx = new Ctor!()
        // Some browsers leave the context "suspended" until resumed
        ctx.resume?.().catch(() => {})
        unlocked = true
      } catch {
        // ignore
      }
    }

    function playTick() {
      if (!ctx) return
      const now = performance.now()
      if (now - lastPlayedAt < 140) return
      lastPlayedAt = now

      // Near-subliminal hover tick — a single very quiet sine pulse,
      // lowpassed to take any edge off. Tuned to the kind of click you
      // hear on portfolio sites: present but never demanding attention.
      const t = ctx.currentTime
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 1800
      lp.connect(ctx.destination)

      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 1000
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.012, t + 0.005)
      g.gain.exponentialRampToValueAtTime(0.0004, t + 0.05)
      osc.connect(g)
      g.connect(lp)
      osc.start(t)
      osc.stop(t + 0.06)
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as Element | null
      if (!target?.closest) return
      const card = target.closest('[data-category]')
      if (card && card !== lastEl) {
        lastEl = card
        if (unlocked) playTick()
      }
    }

    function onLeaveBody() {
      lastEl = null
    }

    document.addEventListener('click', unlock, { once: true, passive: true })
    document.addEventListener('keydown', unlock, { once: true })
    document.addEventListener('touchstart', unlock, { once: true, passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.body?.addEventListener('mouseleave', onLeaveBody)

    return () => {
      document.removeEventListener('click', unlock)
      document.removeEventListener('keydown', unlock)
      document.removeEventListener('touchstart', unlock)
      document.removeEventListener('mouseover', onMouseOver)
      document.body?.removeEventListener('mouseleave', onLeaveBody)
      ctx?.close().catch(() => {})
    }
  }, [])

  return null
}
