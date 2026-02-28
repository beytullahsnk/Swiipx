import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://swiipx.fr'),
  title: {
    default: 'Plaque Avis Google NFC & QR Code | Doublez vos avis — Swiipx',
    template: '%s | Swiipx',
  },
  description: 'Plaque avis Google NFC n°1 en France. Vos clients scannent, laissent un avis en 10 secondes. +200% d\'avis en 3 mois. Livraison gratuite, sans abonnement.',
  keywords: 'plaque avis google, plaque nfc avis google, plaque google avis, carte nfc avis google, collecteur avis google, qr code avis google, avis google nfc',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://swiipx.fr',
    siteName: 'Swiipx',
    title: 'Plaque Avis Google NFC & QR Code — Doublez vos avis | Swiipx',
    description: 'Plaque avis Google NFC n°1. Vos clients scannent, laissent un avis en 10 secondes. +200% d\'avis. Livraison gratuite, sans abonnement.',
    images: [
      {
        url: '/product-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Plaque avis Google NFC Swiipx',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plaque Avis Google NFC — Doublez vos avis | Swiipx',
    description: 'La plaque avis Google NFC n°1. Vos clients scannent, laissent un avis en 10 secondes. Dès 39,90€.',
    images: ['/product-main.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://swiipx.fr',
  },
  other: {
    'theme-color': '#2563EB',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://swiipx.fr/#organization',
              name: 'Swiipx',
              url: 'https://swiipx.fr',
              logo: 'https://swiipx.fr/logo.png',
              description: 'Plaque avis Google NFC & QR Code. Collectez des avis Google automatiquement. La solution n°1 pour booster votre visibilité locale.',
              email: 'bonjour@swiipx.fr',
              areaServed: 'FR',
              sameAs: [
                'https://www.instagram.com/swiipx.fr',
                'https://www.facebook.com/swiipx',
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '9 Rue Marcel Sembat',
                postalCode: '93100',
                addressLocality: 'Montreuil',
                addressCountry: 'FR',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://swiipx.fr/#website',
              url: 'https://swiipx.fr',
              name: 'Swiipx',
              publisher: { '@id': 'https://swiipx.fr/#organization' },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://swiipx.fr/#localbusiness',
              name: 'Swiipx',
              image: 'https://swiipx.fr/logo.png',
              url: 'https://swiipx.fr',
              email: 'bonjour@swiipx.fr',
              description: 'Vente de plaques NFC & QR Code pour collecter des avis Google automatiquement. Solution n°1 en France.',
              priceRange: '€€',
              areaServed: 'FR',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '9 Rue Marcel Sembat',
                postalCode: '93100',
                addressLocality: 'Montreuil',
                addressCountry: 'FR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 48.8534,
                longitude: 2.4488,
              },
              sameAs: [
                'https://www.instagram.com/swiipx.fr',
                'https://www.facebook.com/swiipx',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
