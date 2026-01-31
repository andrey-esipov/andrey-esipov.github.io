'use client'

import { motion } from 'framer-motion'
import BentoGrid from '@/components/BentoGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8 lg:px-16 xl:px-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <BentoGrid />
      </motion.div>
    </main>
  )
}
