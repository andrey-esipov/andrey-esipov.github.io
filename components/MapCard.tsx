'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export default function MapCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="card h-full min-h-[180px] p-6 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Stylized map background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          {/* Grid lines to simulate map */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* "Roads" */}
          <path d="M 0 80 Q 50 90 100 80 T 200 85" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 100 0 Q 110 50 100 100 T 95 200" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-1">
          Base
        </p>
        <p className="text-lg font-semibold">Franklin, TN</p>
      </div>

      {/* Pulsing beacon */}
      <div className="absolute bottom-6 right-6 flex items-center justify-center">
        <div className="relative">
          {/* Pulse rings */}
          <span className="absolute inset-0 w-4 h-4 rounded-full bg-blue-400/30 pulse-beacon" />
          <span className="absolute inset-0 w-4 h-4 rounded-full bg-blue-400/20 pulse-beacon" style={{ animationDelay: '0.5s' }} />
          {/* Center dot */}
          <span className="relative block w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
        </div>
      </div>

      {/* Map pin icon */}
      <div className="absolute top-6 right-6 text-black/20">
        <MapPin size={20} />
      </div>
    </motion.div>
  )
}
