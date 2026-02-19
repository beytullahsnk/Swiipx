'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

function getTimeUntil3AM(): { hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const target = new Date(now)
  target.setHours(3, 0, 0, 0)

  if (now >= target) {
    target.setDate(target.getDate() + 1)
  }

  const diff = target.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { hours, minutes, seconds }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function AnnouncementBar() {
  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setTime(getTimeUntil3AM())
    const interval = setInterval(() => {
      setTime(getTimeUntil3AM())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (dismissed) return null

  return (
    <div className="bg-gray-900 text-white text-center text-xs sm:text-sm py-2 px-4 relative">
      <span className="font-medium">
        Livraison gratuite
      </span>
      <span className="text-white/60 mx-2">—</span>
      <span className="text-white/80">
        Offre expire dans{' '}
        <span className="font-mono font-bold text-accent">
          {time ? `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}` : '--:--:--'}
        </span>
      </span>
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
