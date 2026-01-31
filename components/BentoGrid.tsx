'use client'

import { motion } from 'framer-motion'
import ProfileCard from './ProfileCard'
import ManifestoCard from './ManifestoCard'
import EngineCard from './EngineCard'
import MapCard from './MapCard'
import StackCard from './StackCard'
import ImpactCard from './ImpactCard'
import SocialsStrip from './SocialsStrip'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function BentoGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 md:gap-5"
    >
      {/* Top row: Profile (2x2), Manifesto (1x2), Map + Stack (1x1 each) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5 lg:grid-rows-2">
        {/* Profile Card - 2x2 */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
          <ProfileCard />
        </motion.div>

        {/* Manifesto Card - 1x2 */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
          <ManifestoCard />
        </motion.div>

        {/* Right column: Map and Stack */}
        <div className="flex flex-col gap-4 md:gap-5 md:col-span-1 md:row-span-2">
          <motion.div variants={itemVariants} className="flex-1">
            <MapCard />
          </motion.div>
          <motion.div variants={itemVariants} className="flex-1">
            <StackCard />
          </motion.div>
        </div>
      </div>

      {/* Engine Card - Full width */}
      <motion.div variants={itemVariants}>
        <EngineCard />
      </motion.div>

      {/* Impact Card - Full width */}
      <motion.div variants={itemVariants}>
        <ImpactCard />
      </motion.div>

      {/* Socials Strip */}
      <motion.div variants={itemVariants}>
        <SocialsStrip />
      </motion.div>
    </motion.div>
  )
}
