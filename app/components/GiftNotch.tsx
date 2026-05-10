'use client'

import { BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GiftNotchProps {
  onClick: () => void
  isVisible: boolean
}

export default function GiftNotch({ onClick, isVisible }: GiftNotchProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          aria-label="Télécharger le guide gratuit"
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[300] bg-black text-white px-2 py-3 sm:px-3 sm:py-5 rounded-r-xl sm:rounded-r-2xl shadow-xl hover:bg-gray-900 transition-colors group"
          style={{ writingMode: 'vertical-rl' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" aria-hidden="true" />
            <span className="font-bold text-[10px] sm:text-xs tracking-wide">E-BOOK GRATUIT</span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

