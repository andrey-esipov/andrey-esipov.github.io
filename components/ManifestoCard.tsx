'use client'

import { motion } from 'framer-motion'

export default function ManifestoCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="card h-full min-h-[300px] md:min-h-[480px] p-6 md:p-8 flex flex-col justify-center"
    >
      <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-4">
        How I Work
      </p>

      <blockquote className="relative">
        <span className="absolute -top-4 -left-2 text-6xl text-black/10 font-serif">"</span>
        <p className="text-lg md:text-xl font-medium leading-relaxed text-black/80 relative z-10">
          Efficiency is a feature.
        </p>
        <p className="mt-4 text-sm md:text-base text-black/60 leading-relaxed">
          I believe ambiguity is just a dataset missing a framework. I build tools to automate the mundane so teams can focus on the magnificent.
        </p>
      </blockquote>

      {/* Decorative element */}
      <div className="mt-auto pt-6">
        <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
      </div>
    </motion.div>
  )
}
