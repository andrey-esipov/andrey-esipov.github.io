'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Archive, Bot } from 'lucide-react'

const impacts = [
  {
    icon: TrendingUp,
    text: '[Impact Item 1]',
  },
  {
    icon: Archive,
    text: '[Impact Item 2]',
  },
  {
    icon: Bot,
    text: '[Impact Item 3]',
  },
]

export default function ImpactCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="card p-6 md:p-8"
    >
      <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-4">
        Scale
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {impacts.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <item.icon size={16} className="text-blue-600" />
            </div>
            <p className="text-sm text-black/70 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
