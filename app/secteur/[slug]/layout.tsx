import type { Metadata } from 'next'
import { faqSecteurs } from './faq'
import { offreGammeJsonLd } from '../../../lib/product-schema'

const sectorData: Record<string, {
  title: string
  description: string
  keywords: string
  h1: string
  intro: string
}> = {
  restaurant: {
    title: 'Plaque avis Google pour restaurant — sans app',
    description: 'Plaque NFC avis Google pour restaurant, livrée déjà programmée avec votre lien d\'avis. Pack 2 plaques 65,88 € TTC, sans abonnement, livraison offerte en point relais.',
    keywords: 'plaque nfc restaurant, avis google restaurant, plaque restaurant nfc, plaque avis google bistrot, nfc restauration france, plaque avis brasserie',
    h1: 'Plaque NFC pour restaurants : l\'avis se laisse en salle, en 10 secondes',
    intro: 'Plaque NFC programmée avec le lien d\'avis Google de votre restaurant. Vos clients laissent un avis en 10 secondes, sans application. Acrylique premium, sans abonnement, livraison offerte en point relais.',
  },
  'salon-coiffure': {
    title: 'Plaque avis Google pour salon de coiffure',
    description: 'Plaque NFC avis Google pour salon de coiffure, livrée déjà programmée avec votre lien d\'avis. Dès 35,88 € TTC, sans abonnement, sans application à installer.',
    keywords: 'plaque nfc salon coiffure, plaque avis google coiffeur, nfc coiffure, plaque avis institut beauté, plaque nfc barbier, plaque coiffeur',
    h1: 'Plaque NFC pour salons de coiffure : avis Google en 10 s',
    intro: 'Le passage en caisse d\'un salon dure assez longtemps pour qu\'une cliente pose son téléphone sur la plaque. C\'est ce qui rend ce moment particulièrement favorable.',
  },
  'cabinet-medical': {
    title: 'Plaque avis Google pour cabinet médical',
    description: 'Plaque NFC avis Google discrète pour cabinet médical, dentiste, kiné, ostéo. Livrée déjà programmée, dès 35,88 € TTC, sans abonnement, sans application.',
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
    provider: { '@id': 'https://swiipx.fr/#organization' },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      { '@type': 'City', name: 'Paris' },
    ],
    serviceType: 'Plaque NFC avis Google',
    audience: { '@type': 'Audience', audienceType: slug },
    offers: offreGammeJsonLd(),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://swiipx.fr' },
      // Pas d'echelon « Secteurs » : https://swiipx.fr/secteur renvoie 404, il
      // n'existe aucune page d'index. Declarer une URL morte dans un fil
      // d'Ariane invalide le balisage. On colle au fil visible, a 2 niveaux.
      { '@type': 'ListItem', position: 2, name: data.h1.split(':')[0].trim(), item: `https://swiipx.fr/secteur/${slug}` },
    ],
  }

  const faqList = faqSecteurs[slug]
  const faqPage = faqList
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqList.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }
    : null

  return { service, breadcrumb, faqPage }
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
          {jsonLd.faqPage && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
            />
          )}
        </>
      )}
      {children}
    </>
  )
}
