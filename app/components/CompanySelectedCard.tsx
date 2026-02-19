'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, MapPin } from 'lucide-react'
import { useCompanyStore } from '../store/company'
import { useState } from 'react'

interface CompanySelectedCardProps {
  onReset?: () => void // Callback optionnel après reset
  className?: string
}

export default function CompanySelectedCard({ 
  onReset, 
  className = '' 
}: CompanySelectedCardProps) {
  const { company, clearCompany } = useCompanyStore()
  const [isRemoving, setIsRemoving] = useState(false)

  // Handle reset with animation
  const handleReset = () => {
    // Début de l'animation
    setIsRemoving(true)
    
    // Attendre la fin de l'animation (150ms)
    setTimeout(() => {
      clearCompany()
      setIsRemoving(false)
      
      // Callback optionnel (ex: réactiver l'autocomplete)
      if (onReset) {
        onReset()
      }
    }, 150)
  }

  // Si pas d'entreprise, ne rien afficher
  if (!company) return null

  return (
    <AnimatePresence mode="wait">
      {!isRemoving && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={`relative bg-green-50 border-2 border-green-200 rounded-xl p-4 ${className}`}
        >
          {/* Reset Button (X Rouge) */}
          <button
            onClick={handleReset}
            className="absolute top-3 right-3 p-1.5 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Supprimer la sélection"
            title="Supprimer cette entreprise"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Company Info */}
          <div className="flex items-start space-x-3 pr-10">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 break-words">{company.name}</p>
              <p className="text-gray-700 text-sm mt-1 break-words">{company.address}</p>
              {company.phone && (
                <p className="text-gray-600 text-xs mt-1">📞 {company.phone}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

