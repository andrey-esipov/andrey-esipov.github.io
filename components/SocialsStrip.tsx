'use client'

import { motion } from 'framer-motion'
import { Linkedin, Mail, Github } from 'lucide-react'

const socials = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/andreyyevseyev',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:andrey@example.com',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/andreyyevseyev',
  },
]

export default function SocialsStrip() {
  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="card px-6 py-4"
    >
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {socials.map((social, i) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-black/5 transition-colors"
          >
            <social.icon size={18} className="text-black/60" />
            <span className="text-sm font-medium text-black/70 hidden sm:inline">
              {social.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
