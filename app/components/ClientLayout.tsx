'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import PromoPopup from './PromoPopup'
import WhatsAppButton from './WhatsAppButton'
import GooglePlacesScript from './GooglePlacesScript'
import SendcloudScript from './SendcloudScript'
import GiftNotch from './GiftNotch'
import AnnouncementBar from './AnnouncementBar'
import { Toaster } from 'react-hot-toast'

// Pages où on désactive les popups / chat / e-book — flow d'achat focused
const POPUPLESS_PATHS = ['/checkout', '/cart', '/success']

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [showNotch, setShowNotch] = useState(false)
  const POPUP_STORAGE_KEY = 'swiipx-promo-popup-shown'

  // Désactive popups + chat sur les pages transactionnelles
  const hidePopups = POPUPLESS_PATHS.some((p) => pathname?.startsWith(p))

  // Afficher le popup après 2 minutes OU en exit-intent (desktop) — sauf en checkout/cart/success
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (hidePopups) return // skip toute la logique si on est en flow d'achat

    const hasBeenShown = sessionStorage.getItem(POPUP_STORAGE_KEY)

    if (hasBeenShown) {
      setShowNotch(true)
      return
    }

    const openPopup = () => {
      setIsPopupOpen(true)
    }

    // Timer fallback (2 minutes — surtout utile sur mobile)
    const timer = setTimeout(openPopup, 120000)

    // Exit-intent : détecte quand la souris quitte la fenêtre (desktop uniquement)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        openPopup()
        document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
        clearTimeout(timer)
      }
    }
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hidePopups])

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold">
        Aller au contenu principal
      </a>

      {/* Google Places API Script */}
      <GooglePlacesScript />

      {/* Sendcloud Service Point Picker Script */}
      <SendcloudScript />
      
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Popups + chat — désactivés sur les pages transactionnelles (checkout, cart, success) */}
      {!hidePopups && (
        <>
          <PromoPopup
            isOpen={isPopupOpen}
            onClose={() => {
              setIsPopupOpen(false)
              setShowNotch(true)
            }}
          />
          <GiftNotch
            onClick={() => setIsPopupOpen(true)}
            isVisible={!isPopupOpen && showNotch}
          />
          <WhatsAppButton />
        </>
      )}
    </>
  )
}

