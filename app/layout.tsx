import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://swiipx.fr'),
  title: {
    default: 'Swiipx — Doublez vos avis Google avec la plaque NFC n°1',
    template: '%s | Swiipx',
  },
  description: 'La plaque NFC la plus simple pour booster vos avis Google et votre visibilité locale. Installation en 30 secondes. Livraison gratuite.',
  keywords: 'avis google, plaque NFC, QR code, visibilité locale, avis clients, SEO local, Google Maps',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://swiipx.fr',
    siteName: 'Swiipx',
    title: 'Swiipx — Doublez vos avis Google avec la plaque NFC n°1',
    description: 'La plaque NFC la plus simple pour booster vos avis Google. Installation en 30 secondes. Livraison gratuite. Sans abonnement.',
    images: [
      {
        url: '/product-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Plaque NFC Swiipx pour avis Google',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swiipx — Doublez vos avis Google',
    description: 'La plaque NFC n°1 pour collecter des avis Google en 10 secondes.',
    images: ['/product-main.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://swiipx.fr',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
