import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos de Swiipx',
  description: "Qui est derrière Swiipx : SKYAKSA, entreprise individuelle établie à Montreuil. Ce que nous fabriquons, comment la plaque est programmée, et comment nous joindre.",
  alternates: {
    canonical: 'https://swiipx.fr/a-propos',
  },
  openGraph: {
    title: 'À propos de Swiipx',
    description: "Qui est derrière Swiipx : SKYAKSA, entreprise individuelle établie à Montreuil, et comment la plaque est fabriquée et programmée.",
    url: 'https://swiipx.fr/a-propos',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/product-main.jpg', width: 1200, height: 630, alt: 'Swiipx — Plaques avis Google NFC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos de Swiipx',
    description: "Qui est derrière Swiipx : SKYAKSA, entreprise individuelle établie à Montreuil.",
    images: ['/product-main.jpg'],
  },
}

export default function AProposLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fil d'Ariane a deux niveaux, identique au fil visible de la page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://swiipx.fr' },
              { '@type': 'ListItem', position: 2, name: 'À propos', item: 'https://swiipx.fr/a-propos' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
