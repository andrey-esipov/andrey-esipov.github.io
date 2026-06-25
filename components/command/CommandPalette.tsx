'use client'

import type { KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, CornerDownLeft, Search } from 'lucide-react'
import { useCommandPalette } from './CommandPaletteProvider'
import { useCommands, type Command, type CommandSection } from './useCommands'

const SECTIONS: ReadonlyArray<CommandSection> = ['Navigate', 'Theme', 'Connect']
const EASE = [0.2, 0.7, 0.3, 1] as const

function optionId(id: string) {
  return `cmdk-option-${id}`
}

function sectionId(section: CommandSection) {
  return `cmdk-section-${section.toLowerCase()}`
}

function matchesCommand(command: Command, query: string) {
  if (!query) return true
  return [command.label, ...command.keywords].join(' ').toLowerCase().includes(query)
}

export function CommandPalette() {
  const { close } = useCommandPalette()
  const commands = useCommands()
  const reduceMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(
    () => commands.filter((command) => matchesCommand(command, normalizedQuery)),
    [commands, normalizedQuery]
  )

  useEffect(() => {
    setActiveIndex(0)
  }, [commands, query])

  useEffect(() => {
    if (filtered.length === 0) {
      setActiveIndex(0)
      return
    }
    setActiveIndex((current) => Math.min(current, filtered.length - 1))
  }, [filtered.length])

  useEffect(() => {
    setMounted(true)

    const previousOverflow = document.body.style.overflow
    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      previousActiveElement?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    inputRef.current?.focus({ preventScroll: true })
  }, [mounted])

  const safeActiveIndex = filtered.length > 0 ? Math.min(activeIndex, filtered.length - 1) : -1
  const activeCommand = safeActiveIndex >= 0 ? filtered[safeActiveIndex] : null
  const activeId = activeCommand ? optionId(activeCommand.id) : undefined

  const grouped = useMemo(
    () =>
      SECTIONS.map((section) => ({
        section,
        items: filtered.reduce<Array<{ command: Command; index: number }>>((items, command, index) => {
          if (command.section === section) items.push({ command, index })
          return items
        }, []),
      })).filter((group) => group.items.length > 0),
    [filtered]
  )

  function runCommand(command: Command) {
    command.run()
    close()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (filtered.length === 0) return
      setActiveIndex((current) => (current + 1) % filtered.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (filtered.length === 0) return
      setActiveIndex((current) => (current - 1 + filtered.length) % filtered.length)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      if (filtered.length > 0) setActiveIndex(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      if (filtered.length > 0) setActiveIndex(filtered.length - 1)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (activeCommand) runCommand(activeCommand)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  if (!mounted) return null

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 z-[100] bg-[rgb(var(--shadow-rgb)/0.5)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: EASE }}
        onClick={close}
      />

      <div className="pointer-events-none fixed inset-x-0 top-[14vh] z-[101] flex justify-center px-4 sm:top-[16vh]">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="theme-transition pointer-events-auto w-full max-w-[560px] overflow-hidden rounded-[20px] border border-hairline bg-surface shadow-floating"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 6 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 6 }}
          transition={{ duration: 0.18, ease: EASE }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
            <Search className="h-4 w-4 text-ink-soft" strokeWidth={2.25} />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-expanded="true"
              aria-controls="cmdk-list"
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              autoFocus
              placeholder="Search pages, themes, links…"
              className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-soft"
              style={{ outline: 'none' }}
            />
          </div>

          <div id="cmdk-list" role="listbox" className="max-h-[52vh] overflow-y-auto px-2 py-2">
            {filtered.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-ink-soft">No results</div>
            ) : (
              grouped.map(({ section, items }) => (
                <div key={section} role="group" aria-labelledby={sectionId(section)} className="py-1">
                  <div
                    id={sectionId(section)}
                    className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-eyebrow text-ink-soft"
                  >
                    {section}
                  </div>

                  {items.map(({ command, index }) => {
                    const selected = index === safeActiveIndex
                    const Icon = command.Icon

                    return (
                      <div
                        key={command.id}
                        id={optionId(command.id)}
                        role="option"
                        aria-selected={selected}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseMove={() => setActiveIndex(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand(command)}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                          selected ? 'bg-surface-2 text-ink' : 'text-ink-soft'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline ${
                            selected ? 'bg-surface text-ink' : 'bg-surface-2 text-ink-soft'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="min-w-0 flex-1 truncate font-medium">{command.label}</span>

                        <span className="ml-auto flex shrink-0 items-center gap-2 pl-3">
                          {command.hint ? (
                            <span className="text-[11px] font-medium text-ink-soft">{command.hint}</span>
                          ) : null}
                          {command.isActive ? <Check className="h-4 w-4 text-accent" strokeWidth={2.5} /> : null}
                          {selected ? (
                            <CornerDownLeft className="h-3.5 w-3.5 text-ink-soft" strokeWidth={2.25} />
                          ) : null}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          <div className="border-t border-hairline px-4 py-3 text-[11px] text-ink-soft">
            ↑↓ navigate · ↵ select · esc close
          </div>
        </motion.div>
      </div>
    </>,
    document.body
  )
}
