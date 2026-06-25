'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useCommandPalette } from './CommandPaletteProvider'

export function CommandTrigger() {
  const { open } = useCommandPalette()
  const [shortcut, setShortcut] = useState('⌘K')

  useEffect(() => {
    const platform = navigator.platform || navigator.userAgent
    if (!/Mac|iPhone|iPad/.test(platform)) setShortcut('Ctrl K')
  }, [])

  return (
    <button
      type="button"
      aria-label="Open command palette"
      onClick={open}
      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/85 px-3 py-2 text-[13px] font-medium text-ink shadow-pill backdrop-blur-md transition-colors duration-200 hover:bg-surface"
    >
      <Search className="h-3.5 w-3.5" strokeWidth={2.25} />
      <kbd className="rounded border border-hairline bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium leading-none text-ink-soft">
        {shortcut}
      </kbd>
    </button>
  )
}
