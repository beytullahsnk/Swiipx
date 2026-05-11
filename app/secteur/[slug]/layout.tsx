import type { Metadata } from 'next'

const sectorData: Record<string, {
  title: string
  description: string
  keywords: string
  h1: string
  intro: string
}> = {
  restaurant: {
    title: 'Plaque NFC pour Restaurant — Collectez +200 avis Google | Swiipx',
    description: 'Restaurant : plaque NFC avis Google sans abonnement. 35-45 % de taux d\'avis collectés. Pack 2 plaques 59,90 €, livraison gratuite, garantie 2 ans.',
    keywords: 'plaque nfc restaurant, avis google restaurant, plaque restaurant nfc, plaque avis google bistrot, nfc restauration france, plaque avis brasserie',
    h1: 'Plaque NFC pour restaurants : multipliez vos avis Google par 7',
    intro: 'La plaque NFC Swiipx aide 500+ restaurants en France à passer de 5-8 avis Google/mois à 30-60 avis/mois. Acrylique premium, sans abonnement, livraison gratuite.',
  },
  'salon-coiffure': {
    title: 'Plaque NFC pour Salon de Coiffure — Avis Google | Swiipx',
    description: 'Salon de coiffure : plaque NFC avis Google. 40-55 % de conversion (taux record). +150 avis/an. Pack adapté aux salons, garantie 2 ans, sans abonnement.',
    keywords: 'plaque nfc salon coiffure, plaque avis google coiffeur, nfc coiffure, plaque avis institut beauté, plaque nfc barbier, plaque coiffeur',
    h1: 'Plaque NFC pour salons de coiffure : le secteur n°1 du NFC',
    intro: 'Les salons de coiffure obtiennent le meilleur taux de conversion en NFC : 40-55 % des clientes laissent un avis. Découvrez pourquoi et comment.',
  },
  'cabinet-medical': {
    title: 'Plaque NFC pour Cabinet Médical — Avis Google Patients | Swiipx',
    description: 'Cabinet médical, dentiste, kiné, ostéo : plaque NFC avis Google discrète et déontologique. Collectez +50 avis/an facilement. Sans abonnement.',
    keywords: 'plaque nfc cabinet medical, plaque avis google dentiste, avis google medecin, plaque nfc osteopathe, avis google kinesitherapeute, plaque libéral',
    h1: 'Plaque NFC pour cabinets médicaux et professionnels libéraux',
    intro: 'Une solution discrète et déontologique pour collecter des avis Google de vos patients satisfaits. Conforme aux règles des professions médicales.',
  },
}

export function generateStaticParams() {
  return Object.keys(sectorData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = sectorData[params.slug]
  if (!data) return { title: 'Secteur — Swiipx' }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: `https://swiipx.fr/secteur/${params.slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://swiipx.fr/secteur/${params.slug}`,
      siteName: 'Swiipx',
      locale: 'fr_FR',
      type: 'website',
      images: [
        { url: '/product-main.jpg', width: 1200, height: 630, alt: data.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['/product-main.jpg'],
    },
  }
}

function buildJsonLd(slug: string) {
  const data = sectorData[slug]
  if (!data) return null

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.h1,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: 'Swiipx',
      url: 'https://swiipx.fr',
    },
    areaServed: 'FR',
    serviceType: 'Plaque NFC avis Google',
    audience: { '@type': 'Audience', audienceType: slug },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://swiipx.fr' },
      { '@type': 'ListItem', position: 2, name: 'Secteurs', item: 'https://swiipx.fr/secteur' },
      { '@type': 'ListItem', position: 3, name: data.h1.split(':')[0].trim(), item: `https://swiipx.fr/secteur/${slug}` },
    ],
  }

  return { service, breadcrumb }
}

export default function SectorLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const jsonLd = buildJsonLd(params.slug)

  return (
    <>
      {jsonLd && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.service) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
          />
        </>
      )}
      {children}
    </>
  )
}
