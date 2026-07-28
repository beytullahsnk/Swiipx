import { Metadata } from 'next'

/**
 * Sans ce layout, /checkout héritait des métadonnées de la page d'accueil :
 * même <title> et même description que la home (contenu dupliqué), et
 * surtout robots "index, follow" alors que /cart et /success sont en noindex.
 */
export const metadata: Metadata = {
  title: 'Finaliser ma commande',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
