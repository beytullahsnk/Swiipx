'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { Toaster } from 'react-hot-toast'

// Pages du tunnel d'achat : aucune sollicitation, pas même le chat.
const PAGES_SANS_SOLLICITATION = ['/checkout', '/cart', '/success']

/**
 * UN SEUL MESSAGE À LA FOIS (stratégie du 2026-10-02).
 *
 * Le pop-up « guide gratuit » et son encoche « cadeau » ont été retirés : ils
 * s'ouvraient au bout de 2 minutes sur toutes les pages, téléphone compris,
 * promettaient un e-book qui n'existait pas (le mail renvoyait vers un
 * article) et un « 3x plus d'avis » sans source. Ce qui reste, chacun à sa
 * place et sans se superposer :
 * - en haut, le bandeau (AnnouncementBar) : le panier en attente quand un
 *   visiteur revient avec une commande non finie, sinon la réassurance ;
 * - dans les articles, les blocs du parcours de lecture (ConversionArticle) ;
 * - sur ordinateur, le chat, qui se retire quand le panier s'ouvre.
 * Rien sur les pages du tunnel d'achat.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  /** Vrai a partir de 1024 px, seule largeur ou le chat est visible. Evalue
   *  cote client uniquement : false au rendu serveur, donc rien n'est charge
   *  avant de savoir. */
  const [chatAffichable, setChatAffichable] = useState(false)
  const tunnelAchat = PAGES_SANS_SOLLICITATION.some((p) => pathname?.startsWith(p))

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const maj = () => setChatAffichable(mq.matches)
    maj()
    mq.addEventListener('change', maj)
    return () => mq.removeEventListener('change', maj)
  }, [])

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold">
        Aller au contenu principal
      </a>

      {/* Google Places API Script */}

      {/* Sendcloud Service Point Picker Script */}
      
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
      
      {/* Le chat n'est monte que sur les ecrans qui l'affichent.
          AVANT : le script Tawk partait partout, puis un second script le
          MASQUAIT sous 1024 px — 20 requetes telechargees sur mobile pour un
          widget que personne ne verra jamais, sur le terminal ou la bande
          passante est la plus contrainte. Masquer n'est pas ne pas charger. */}
      {!tunnelAchat && chatAffichable && <WhatsAppButton />}
    </>
  )
}

