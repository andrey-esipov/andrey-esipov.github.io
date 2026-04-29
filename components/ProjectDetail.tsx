'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

export type ProjectTag = {
  label: string
  href?: string
  external?: boolean
}

type ProjectDetailProps = {
  title: string
  tagline: string
  tags?: ReadonlyArray<ProjectTag>
  body: ReadonlyArray<string>
  showcase?: ReactNode
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.7, 0.3, 1] } },
}

/**
 * Detail-page layout — design-language-inspired by nevflynn.com's project
 * pages: dismiss-X at top-center, then a two-column intro (title + tagline +
 * tags on the left, body paragraphs on the right), and a showcase bento
 * grid below. All copy and visuals are original.
 */
export function ProjectDetail({ title, tagline, tags, body, showcase }: ProjectDetailProps) {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-20 pt-6 md:px-8 lg:px-16 xl:px-24">
      {/* Dismiss */}
      <div className="flex justify-center">
        <Link
          href="/"
          aria-label="Back to home"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink-soft shadow-pill transition-all duration-200 ease-smooth hover:bg-surface-2 hover:text-ink"
        >
          <X className="h-4 w-4" strokeWidth={2.25} />
        </Link>
      </div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
      >
        <motion.div variants={itemVariants} className="flex flex-col">
          <p className="font-serif text-[28px] font-semibold tracking-tight-display text-ink md:text-[32px]">
            {title}
          </p>
          <h1 className="mt-3 font-serif text-[34px] leading-[1.08] tracking-tight-display text-ink md:text-[44px]">
            {tagline}
          </h1>

          {tags && tags.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {tags.map((tag) =>
                tag.href ? (
                  <li key={tag.label}>
                    <a
                      href={tag.href}
                      target={tag.external ? '_blank' : undefined}
                      rel={tag.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-[13px] font-medium text-ink shadow-pill transition-colors duration-200 hover:bg-surface-2"
                    >
                      {tag.label}
                      <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
                    </a>
                  </li>
                ) : (
                  <li
                    key={tag.label}
                    className="inline-flex items-center rounded-full border border-hairline bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-soft"
                  >
                    {tag.label}
                  </li>
                ),
              )}
            </ul>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 text-[15px] leading-relaxed text-ink-soft md:text-base">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>
      </motion.section>

      {showcase && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-14"
        >
          {showcase}
        </motion.section>
      )}

      <footer className="mt-16 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-4 py-2 text-[13px] font-medium text-ink shadow-pill transition-colors duration-200 hover:bg-surface-2"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2.25} />
          Close
        </Link>
      </footer>
    </main>
  )
}
