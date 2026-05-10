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
          Livraison gratuite en France
        </span>
        <span className="text-white/80 whitespace-nowrap">Expédié sous 24h</span>
        <span className="text-white/80 whitespace-nowrap hidden sm:inline">Garantie 2 ans</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Fermer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
