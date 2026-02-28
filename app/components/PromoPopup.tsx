'use client'

import { X, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface PromoPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function PromoPopup({ isOpen, onClose }: PromoPopupProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowPopup(true)
    }
  }, [isOpen])

  // Scroll lock
  useEffect(() => {
    if (showPopup && !isClosing) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.setAttribute('data-popup-scroll-y', scrollY.toString())
    } else if (document.body.getAttribute('data-popup-scroll-y')) {
      const scrollYOriginal = Math.abs(parseInt(document.body.style.top || '0'))
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.removeAttribute('data-popup-scroll-y')
      window.scrollTo(0, scrollYOriginal)
      document.documentElement.style.scrollBehavior = ''
    }

    return () => {
      if (document.body.getAttribute('data-popup-scroll-y')) {
        const scrollYOriginal = Math.abs(parseInt(document.body.style.top || '0'))
        document.documentElement.style.scrollBehavior = 'auto'
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
        document.body.removeAttribute('data-popup-scroll-y')
        window.scrollTo(0, scrollYOriginal)
        document.documentElement.style.scrollBehavior = ''
      }
    }
  }, [showPopup, isClosing])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowPopup(false)
      setIsClosing(false)
      onClose()
      sessionStorage.setItem('swiipx-promo-popup-shown', 'true')
    }, 200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Veuillez entrer un email valide.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/ebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        toast.success('Guide envoyé ! Vérifiez votre boîte mail 📬')
      } else {
        toast.error('Erreur lors de l\'envoi. Réessayez.')
      }
    } catch {
      toast.error('Erreur réseau. Réessayez.')
    }

    setIsSubmitting(false)
    handleClose()
  }

  if (!showPopup) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 200,
        }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-label="Télécharger le guide gratuit"
        className={`w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 201,
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Fermer"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Guide gratuit
          </span>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            3x plus d&apos;avis Google en 30 jours
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Recevez notre e-book gratuit avec les méthodes pour booster vos avis Google rapidement.
          </p>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Recevoir le guide gratuit'}
            </button>
          </form>

          <button
            onClick={handleClose}
            className="w-full py-2 mt-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Non merci
          </button>

          <p className="text-xs text-gray-400 mt-3">
            Pas de spam. Désinscription en un clic.
          </p>
        </div>
      </div>
    </>
  )
}
