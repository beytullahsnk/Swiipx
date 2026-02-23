import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Consultez les conditions générales de vente de Swiipx. Informations sur les commandes, paiements, livraisons et garanties de nos plaques NFC.',
  alternates: {
    canonical: 'https://swiipx.fr/cgv',
  },
  openGraph: {
    title: 'CGV — Swiipx',
    description: 'Conditions générales de vente de Swiipx. Commandes, paiements, livraisons et garanties.',
    url: 'https://swiipx.fr/cgv',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'CGV — Swiipx',
    description: 'Conditions générales de vente de Swiipx. Commandes, paiements, livraisons et garanties.',
  },
}

export default function CGVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
