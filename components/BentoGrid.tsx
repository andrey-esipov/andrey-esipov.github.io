'use client'

import { Children, isValidElement, type ReactNode } from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.2, 0.7, 0.3, 1] },
  },
}

type BentoGridProps = {
  children: ReactNode
  className?: string
}

/**
 * 12-column bento grid. Each direct child is a <div> declaring its own
 * grid spans (lg:col-span-N lg:row-span-N) and an optional data-category.
 * We hoist those props onto a motion.div per child so each card is a real
 * grid item that staggers in on first paint.
 */
export default function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 ${className}`}
    >
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        const props = child.props as {
          className?: string
          'data-category'?: string
          children?: ReactNode
        }
        return (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`min-h-0 ${props.className ?? ''}`}
            data-category={props['data-category']}
          >
            {props.children}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
