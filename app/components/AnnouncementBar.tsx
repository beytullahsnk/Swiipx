'use client'

import { useState } from 'react'
import { Truck, X } from 'lucide-react'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-gray-900 text-white text-xs sm:text-sm py-2 pl-4 pr-10 relative">
      <div className="flex items-center justify-center gap-x-3 gap-y-0 flex-wrap">
        <span className="inline-flex items-center font-medium whitespace-nowrap">
          <Truck className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" aria-hidden="true" />
          Livraison offerte en point relais
        </span>
        <span className="text-white/80 whitespace-nowrap">Expédié sous 24h</span>
        <span className="text-white/80 whitespace-nowrap hidden sm:inline">Garantie à vie</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        /* Cible 44x44 : le bouton se limitait aux 14 px de l'icone. */
        className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
        aria-label="Fermer le bandeau"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
