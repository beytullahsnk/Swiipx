'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PromoPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function PromoPopup({ isOpen, onClose }: PromoPopupProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

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

  const handleCTA = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowPopup(false)
      setIsClosing(false)
      onClose()
      sessionStorage.setItem('swiipx-promo-popup-shown', 'true')
      setTimeout(() => {
        const productSection = document.getElementById('product')
        if (productSection) {
          productSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }, 200)
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
          {/* Badge promo */}
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full mb-4">
            Livraison offerte
          </span>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Livraison gratuite sur toutes les commandes
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Doublez vos avis Google avec la plaque NFC Swiipx. Sans abonnement, sans frais cachés.
          </p>

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl font-bold text-gray-900">39,90 €</span>
            <span className="text-xs text-green-600 font-semibold">+ livraison offerte</span>
          </div>

          {/* CTA */}
          <button
            onClick={handleCTA}
            className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
          >
            Voir le produit
          </button>
          <button
            onClick={handleClose}
            className="w-full py-2 mt-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Non merci
          </button>
        </div>
      </div>
    </>
  )
}
