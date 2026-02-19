'use client'

import { Gift } from 'lucide-react'
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
          className="fixed left-0 top-[30%] z-[300] bg-black text-white px-3 py-6 rounded-r-2xl shadow-2xl hover:bg-gray-900 transition-colors group"
          style={{ writingMode: 'vertical-rl' }}
        >
          <div className="flex items-center space-y-2">
            <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-sm tracking-wide">VOTRE CADEAU</span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

