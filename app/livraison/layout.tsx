import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Livraison en Point Relais Offerte — 2-5 Jours',
  description: 'Livraison en point relais offerte, 4,90 € à domicile. Expédition sous 24h, France métropolitaine en 2-5 jours ouvrés.',
  alternates: {
    canonical: 'https://swiipx.fr/livraison',
  },
  openGraph: {
    title: 'Livraison — Swiipx',
    description: 'Livraison en point relais offerte, 4,90 € à domicile, sous 2-5 jours ouvrés pour vos plaques NFC.',
    url: 'https://swiipx.fr/livraison',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/product-main.jpg', width: 1200, height: 630, alt: 'Swiipx — Plaques avis Google NFC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Livraison — Swiipx',
    description: 'Livraison en point relais offerte, 4,90 € à domicile, sous 2-5 jours ouvrés pour vos plaques NFC.',
    images: ['/product-main.jpg'],
  },
}

export default function LivraisonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
