'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <div className="perspective-container h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="card h-full min-h-[400px] md:min-h-[480px] p-8 flex flex-col justify-between relative overflow-hidden"
      >
        {/* Avatar placeholder */}
        <div className="flex justify-center mb-6">
          <motion.div
            style={{
              transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
            }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg"
          >
            <span className="text-5xl md:text-6xl">A</span>
          </motion.div>
        </div>

        {/* Text content */}
        <motion.div
          style={{
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out',
          }}
          className="text-center"
        >
          <p className="text-sm font-medium text-black/50 uppercase tracking-wider mb-2">
            [Role / Title]
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight">
            Hi, I'm [Name]
          </h1>
          <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
            [Short bio or introduction goes here]
          </p>
        </motion.div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none rounded-3xl" />
      </motion.div>
    </div>
  )
}
