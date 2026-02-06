'use client'

import { motion } from 'framer-motion'

const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]

export default function EngineCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="card p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left content */}
        <div className="flex-shrink-0">
          <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">
            The Engine
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl md:text-5xl font-bold tracking-tight">00:00</span>
            <span className="text-lg text-black/50">AM</span>
          </div>
          <p className="text-sm text-black/60">
            [Current Activity or Focus]
          </p>
        </div>

        {/* Activity chart */}
        <div className="flex-1 flex items-end justify-center gap-1 md:gap-2 h-20 md:h-24">
          {chartData.map((height, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="w-3 md:w-4 rounded-full bg-gradient-to-t from-blue-400 to-blue-300 origin-bottom"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
