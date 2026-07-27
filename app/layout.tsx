import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './components/ClientLayout'
import Analytics from './components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://swiipx.fr'),
  title: {
    default: 'Plaque NFC avis Google prête à l\'emploi — sans app | Swiipx',
    template: '%s | Swiipx',
  },
  description: 'Plaque NFC livrée déjà programmée avec le lien d\'avis de votre établissement. Aucune application à installer. Sans abonnement, garantie à vie, 90 jours satisfait ou remboursé.',
  keywords: 'plaque avis google, plaque nfc avis google, plaque google avis, carte nfc avis google, collecteur avis google, qr code avis google, avis google nfc',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://swiipx.fr',
    siteName: 'Swiipx',
    title: 'Plaque NFC avis Google prête à l\'emploi — sans app | Swiipx',
    description: 'Plaque NFC livrée déjà programmée. Aucune application à installer, aucun code à activer. Sans abonnement, garantie à vie.',
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
    title: 'Plaque NFC avis Google — sans abonnement | Swiipx',
    description: 'Plaque NFC livrée déjà programmée. Aucune app à installer. Dès 39,90€, sans abonnement, garantie à vie.',
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
              legalName: 'SKYAKSA',
              url: 'https://swiipx.fr',
              logo: 'https://swiipx.fr/logo.png',
              slogan: 'La plaque NFC avis Google prête à l\'emploi, sans application.',
              description: 'Plaque NFC & QR Code pour collecter des avis Google automatiquement. Sans abonnement, fabriquée en France.',
              email: 'bonjour@swiipx.fr',
              foundingDate: '2026-02',
              founder: { '@type': 'Person', name: 'Beytullah Sonkaya' },
              vatID: 'FR',
              taxID: '948 165 717 00026',
              areaServed: 'FR',
              knowsAbout: [
                'Plaque NFC avis Google',
                'Collecte d\'avis Google',
                'SEO local',
                'Google Business Profile',
                'Réputation en ligne des commerces',
                'Technologie NFC NTAG215',
                'QR Code avis clients',
              ],
              sameAs: [
                'https://www.instagram.com/swiipx.fr',
                'https://www.facebook.com/swiipx',
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '9 Rue Marcel Sembat',
                postalCode: '93100',
                addressLocality: 'Montreuil',
                addressRegion: 'Île-de-France',
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
              inLanguage: 'fr-FR',
              publisher: { '@id': 'https://swiipx.fr/#organization' },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://swiipx.fr/blog?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
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
              description: 'Vente de plaques NFC & QR Code pour collecter des avis Google automatiquement, sans abonnement.',
              priceRange: '€€',
              currenciesAccepted: 'EUR',
              paymentAccepted: 'Carte bancaire, Visa, Mastercard, CB',
              parentOrganization: { '@id': 'https://swiipx.fr/#organization' },
              areaServed: [
                { '@type': 'Country', name: 'France' },
                { '@type': 'City', name: 'Montreuil' },
                { '@type': 'City', name: 'Paris' },
                { '@type': 'AdministrativeArea', name: 'Île-de-France' },
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '9 Rue Marcel Sembat',
                postalCode: '93100',
                addressLocality: 'Montreuil',
                addressRegion: 'Île-de-France',
                addressCountry: 'FR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 48.8534,
                longitude: 2.4488,
              },
              hasMap: 'https://www.google.com/maps?q=9+Rue+Marcel+Sembat,+93100+Montreuil',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              // Pas d'aggregateRating : Google interdit les notes auto-declarees
              // sans avis reels verifiables. A reintroduire quand de vrais avis
              // clients seront collectes et affiches sur le site.
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
        <Analytics />
      </body>
    </html>
  )
}
