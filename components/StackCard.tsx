'use client'

import { motion } from 'framer-motion'

const stackIcons = [
  { name: 'Python', icon: '🐍' },
  { name: 'React', icon: '⚛️' },
  { name: 'Claude', icon: '🤖' },
  { name: 'OpenAI', icon: '✨' },
]

export default function StackCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="card h-full min-h-[180px] p-6 flex flex-col justify-between"
    >
      <div>
        <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-1">
            [Category]
        </p>
        <p className="text-sm text-black/60">[Short Description]</p>
      </div>

      {/* Stack icons */}
      <div className="flex gap-3 mt-4">
        {stackIcons.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            whileHover={{ scale: 1.15, y: -2 }}
            className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-xl cursor-default"
            title={item.name}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
