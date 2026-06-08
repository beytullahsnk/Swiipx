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

const sectorFaq: Record<string, { q: string; a: string }[]> = {
  restaurant: [
    { q: 'Combien d\'avis Google peut collecter mon restaurant ?', a: 'En moyenne, les restaurants utilisateurs passent de 5-8 avis/mois à 25-40 avis/mois, soit une multiplication par 4-7. Les meilleurs résultats observés : 60 avis/mois sur des brasseries 80+ couverts.' },
    { q: 'La plaque résiste-t-elle au nettoyage quotidien ?', a: 'Oui. L\'acrylique 3 mm résiste à l\'eau, aux désinfectants, aux UV et aux rayures. Vous pouvez la nettoyer comme une table normale.' },
    { q: 'Faut-il former mes serveurs ?', a: 'Oui, c\'est crucial. Une plaque NFC sans communication verbale convertit 3-4 fois moins. Comptez 15-30 min de briefing pour expliquer le script aux serveurs.' },
    { q: 'Quel pack pour un restaurant de 80 couverts ?', a: 'Pack Pro (5 plaques) : 1 plaque par groupe de 15-20 couverts. C\'est le ratio optimal pour ne pas créer de "bouchon" sur une seule plaque.' },
  ],
  'salon-coiffure': [
    { q: 'Mes clientes seniors vont-elles savoir utiliser le NFC ?', a: 'Oui. Le NFC fonctionne avec tout smartphone récent. La cliente n\'a rien à comprendre : elle approche son téléphone, ça s\'ouvre automatiquement. Plus simple qu\'un QR code.' },
    { q: 'La plaque résiste-t-elle aux produits capillaires ?', a: 'Oui. L\'acrylique 3 mm résiste à l\'eau, aux laques, colorations et shampoings. Nettoyage avec un chiffon humide ou un spray désinfectant.' },
    { q: 'Quel pack pour un institut multi-cabines ?', a: 'Pack Pro (5 plaques) : 1 plaque par cabine + 1 à l\'accueil. Maximisation du taux d\'avis par tranche de clientèle.' },
    { q: 'Combien d\'avis attendre par mois ?', a: 'En moyenne, multiplication par 5-10. Pour un salon avec 5 avis/mois actuellement, comptez 25-50 avis/mois avec une plaque NFC bien placée + script.' },
  ],
  'cabinet-medical': [
    { q: 'Est-ce conforme à mon code de déontologie ?', a: 'Oui. La plaque est discrète, sans message commercial agressif, et le patient choisit librement de l\'utiliser. C\'est l\'équivalent d\'un panneau "votre avis nous intéresse" classique. Aucune contrepartie offerte, aucune incitation = conforme.' },
    { q: 'Puis-je demander verbalement à mes patients ?', a: 'Évitez la sollicitation directe ("laissez-nous un avis"). Préférez une mention factuelle : "Nous avons mis une plaque à l\'accueil si vous souhaitez laisser un retour." Le patient décide.' },
    { q: 'Quel pack pour un cabinet pluridisciplinaire ?', a: 'Pack Pro (5 plaques) : 1 par cabine de consultation + accueil. Adapté aux cabinets avec 3+ praticiens.' },
    { q: 'Que faire d\'un avis négatif (RGPD, secret médical) ?', a: 'Répondez de manière générale ("Nous sommes désolés que votre expérience n\'ait pas été à la hauteur, contactez-nous à [email]") sans mentionner de détail médical. Si l\'avis viole le secret médical du patient, signalez-le à Google pour suppression.' },
  ],
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
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '39.90',
      highPrice: '89.90',
      offerCount: 3,
    },
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

  const faqList = sectorFaq[slug]
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
