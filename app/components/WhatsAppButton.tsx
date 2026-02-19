'use client'

import { useEffect } from 'react'

/**
 * Tawk.to Live Chat Widget
 *
 * Pour configurer :
 * 1. Crée un compte gratuit sur https://www.tawk.to
 * 2. Récupère ton Property ID et Widget ID depuis le dashboard
 * 3. Remplace les valeurs ci-dessous
 * 4. Télécharge l'app Tawk.to sur ton téléphone pour répondre en direct
 */

const TAWK_PROPERTY_ID = '698f027e1f51081c3676f34d'
const TAWK_WIDGET_ID = '1jhba3g6k'

export default function WhatsAppButton() {
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null // Le widget Tawk.to s'injecte lui-même dans le DOM
}
