import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Livraison Gratuite en 2-3 Jours',
  description: 'Livraison gratuite en France métropolitaine sous 2-3 jours ouvrés. Découvrez nos options d\'expédition pour vos plaques NFC Swiipx.',
  alternates: {
    canonical: 'https://swiipx.fr/livraison',
  },
  openGraph: {
    title: 'Livraison — Swiipx',
    description: 'Livraison gratuite en France métropolitaine sous 2-3 jours ouvrés pour vos plaques NFC.',
    url: 'https://swiipx.fr/livraison',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/product-main.jpg', width: 1200, height: 630, alt: 'Swiipx — Plaques avis Google NFC' }],
  },
  twitter: {
    card: 'summary',
    title: 'Livraison — Swiipx',
    description: 'Livraison gratuite en France métropolitaine sous 2-3 jours ouvrés pour vos plaques NFC.',
  },
}

export default function LivraisonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
