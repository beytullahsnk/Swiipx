import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site swiipx.fr. Informations sur l\'éditeur, l\'hébergeur et les conditions d\'utilisation du site.',
  alternates: {
    canonical: 'https://swiipx.fr/mentions-legales',
  },
  openGraph: {
    title: 'Mentions Légales — Swiipx',
    description: 'Mentions légales du site swiipx.fr. Éditeur, hébergeur et conditions d\'utilisation.',
    url: 'https://swiipx.fr/mentions-legales',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/product-main.jpg', width: 1200, height: 630, alt: 'Swiipx — Plaques avis Google NFC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentions Légales — Swiipx',
    description: 'Mentions légales du site swiipx.fr. Éditeur, hébergeur et conditions d\'utilisation.',
    images: ['/product-main.jpg'],
  },
}

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
