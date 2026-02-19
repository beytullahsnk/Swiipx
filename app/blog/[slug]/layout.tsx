import type { Metadata } from 'next'

/* ── Données SEO par article ── */
const seoData: Record<string, {
  title: string
  description: string
  keywords: string
  date: string
  dateModified: string
  category: string
  faq: { q: string; a: string }[]
}> = {
  'obtenir-plus-avis-google': {
    title: 'Comment obtenir plus d\'avis Google en 2025 : 10 méthodes testées',
    description: 'Découvrez 10 méthodes testées pour obtenir plus d\'avis Google rapidement. NFC, QR code, scripts, email, SMS : guide pratique avec résultats concrets (+250 % en 3 mois).',
    keywords: 'obtenir avis google, plus avis google, augmenter avis google, collecte avis, méthodes avis google, NFC avis, QR code avis, script demande avis',
    date: '2026-01-15',
    dateModified: '2026-01-15',
    category: 'Stratégie',
    faq: [
      { q: 'Quelle est la méthode la plus efficace pour obtenir des avis Google ?', a: 'La plaque NFC est la méthode la plus efficace avec un taux de conversion de 35-45 %, car elle supprime toute friction. Le client approche son téléphone et arrive directement sur la page d\'avis Google.' },
      { q: 'Combien d\'avis Google faut-il pour être visible ?', a: 'Un minimum de 20-30 avis est recommandé pour apparaître dans le pack local. Au-delà de 50 avis, votre visibilité augmente significativement. L\'objectif est de maintenir un flux régulier d\'avis récents.' },
      { q: 'Est-il légal de demander des avis Google à ses clients ?', a: 'Oui, demander des avis est parfaitement légal et conforme aux règles de Google. Ce qui est interdit, c\'est d\'offrir une contrepartie (réduction, cadeau) en échange d\'un avis ou de rédiger de faux avis.' },
      { q: 'Peut-on utiliser plusieurs méthodes de collecte en même temps ?', a: 'Oui, c\'est même recommandé. Combinez le NFC en point de vente avec l\'email de suivi et le SMS pour maximiser votre taux de collecte. Chaque canal touche le client à un moment différent.' },
    ],
  },
  'avis-clients-influencent-business': {
    title: 'Pourquoi les avis clients influencent votre business | Guide 2026',
    description: 'Impact des avis Google sur le chiffre d\'affaires, la conversion, le SEO local et la confiance client. Données 2026, stratégies par secteur, templates de réponse et calcul du ROI.',
    keywords: 'avis clients business, impact avis google, avis et chiffre affaires, avis clients conversion, e-réputation, gestion avis négatifs, ROI avis google',
    date: '2025-11-08',
    dateModified: '2025-11-08',
    category: 'Business',
    faq: [
      { q: 'Quel est l\'impact des avis Google sur le chiffre d\'affaires ?', a: 'Passer de 3,5 à 4,5 étoiles sur Google entraîne une augmentation moyenne de 25 % du chiffre d\'affaires. Les entreprises avec plus de 50 avis génèrent 3 fois plus de clics que celles avec moins de 10 avis.' },
      { q: 'Comment les avis influencent-ils le SEO local ?', a: 'Google utilise le volume, la fréquence et la qualité des avis comme facteur de classement dans le pack local. Les fiches avec des avis récents et des réponses du propriétaire sont favorisées dans les résultats de recherche.' },
      { q: 'Faut-il répondre aux avis négatifs ?', a: 'Oui, toujours. 89 % des prospects lisent les réponses aux avis négatifs. Une réponse professionnelle et empathique peut transformer un avis négatif en démonstration de votre sérieux et de votre engagement client.' },
      { q: 'Quel est le nombre minimum d\'avis pour inspirer confiance ?', a: 'Les études montrent qu\'un minimum de 10 avis est nécessaire pour que les consommateurs considèrent la note comme fiable. Au-delà de 40 avis, l\'effet de confiance atteint son maximum.' },
    ],
  },
  'booster-visibilite-locale': {
    title: '5 astuces pour booster votre visibilité locale | Guide SEO 2026',
    description: 'Guide complet pour dominer le pack local Google : optimisation Google Business Profile, collecte d\'avis, citations NAP, pages locales et backlinks. Plan d\'action 30/60/90 jours inclus.',
    keywords: 'visibilité locale, SEO local, pack local google, Google Business Profile, citations NAP, avis google local, référencement local, backlinks locaux',
    date: '2025-11-05',
    dateModified: '2025-11-05',
    category: 'SEO Local',
    faq: [
      { q: 'Combien de temps faut-il pour apparaître dans le pack local Google ?', a: 'Avec une stratégie active (fiche optimisée, collecte d\'avis, citations), vous pouvez commencer à apparaître dans le pack local en 4 à 8 semaines. Les résultats s\'accélèrent à partir du 3e mois.' },
      { q: 'Qu\'est-ce que le NAP et pourquoi est-ce important ?', a: 'NAP signifie Name, Address, Phone. La cohérence de ces informations sur tous les annuaires en ligne est un facteur de classement majeur pour Google. Toute incohérence peut nuire à votre visibilité locale.' },
      { q: 'Faut-il un site web pour apparaître dans le pack local ?', a: 'Non, la fiche Google Business Profile suffit pour apparaître dans le pack local. Cependant, un site web avec des pages locales optimisées renforce considérablement votre positionnement et vos chances d\'apparaître en première position.' },
      { q: 'Combien d\'avis faut-il pour dominer le pack local ?', a: 'Il n\'y a pas de nombre fixe, car cela dépend de la concurrence locale. En règle générale, avoir 20-30 % d\'avis de plus que le concurrent le mieux placé vous donne un avantage significatif.' },
    ],
  },
  'nfc-avis-clients': {
    title: 'NFC : la nouvelle arme pour collecter des avis clients | Guide 2026',
    description: 'Comment collecter plus d\'avis Google avec une plaque NFC : fonctionnement, taux de conversion (35-45 %), mise en place, placements par métier, scripts d\'équipe et calcul du ROI.',
    keywords: 'NFC avis clients, plaque NFC avis google, collecte avis NFC, NFC vs QR code, plaque avis restaurant, NFC commerce, avis google automatique',
    date: '2025-11-02',
    dateModified: '2025-11-02',
    category: 'Technologie',
    faq: [
      { q: 'Comment fonctionne une plaque NFC pour les avis Google ?', a: 'La plaque NFC contient une puce programmée avec le lien direct vers votre page d\'avis Google. Quand un client approche son smartphone, le lien s\'ouvre automatiquement sans application ni scan. Le client n\'a plus qu\'à rédiger son avis et publier.' },
      { q: 'Le NFC fonctionne-t-il avec tous les smartphones ?', a: 'Oui. Tous les iPhone depuis le modèle 7 (2016) et la quasi-totalité des smartphones Android supportent le NFC nativement. Cela couvre plus de 95 % des appareils en circulation en France.' },
      { q: 'Quelle est la différence entre NFC et QR code pour les avis ?', a: 'Le NFC convertit à 35-45 % contre 8-12 % pour le QR code. La raison : le NFC ne nécessite aucune action de la part du client (pas d\'appareil photo à ouvrir, pas de lien à cliquer). C\'est un simple contact physique.' },
      { q: 'Où placer la plaque NFC dans mon commerce ?', a: 'L\'emplacement idéal dépend de votre métier. Restaurant : sur la table ou à la caisse. Salon de coiffure : devant le miroir. Cabinet médical : à l\'accueil. Boutique : au comptoir. Le principe : là où le client est le plus satisfait.' },
      { q: 'Google pénalise-t-il les avis collectés par NFC ?', a: 'Non. Le NFC redirige simplement vers la page d\'avis Google officielle. Le client rédige son propre avis librement. Aucune manipulation, aucune incitation interdite. Cette méthode est 100 % conforme aux règles de Google.' },
    ],
  },
  'seo-local-recherches-google': {
    title: 'SEO Local : comment grimper en tête des recherches Google | Guide 2026',
    description: 'Méthode complète pour gagner le pack local Google Maps : Google Business Profile, avis, pages locales, citations NAP, schema markup, backlinks et plan d\'action 30 jours avec templates.',
    keywords: 'SEO local, référencement local, pack local google, google maps seo, Google Business Profile, schema LocalBusiness, citations NAP, backlinks locaux, visibilité locale',
    date: '2025-10-28',
    dateModified: '2025-10-28',
    category: 'SEO Local',
    faq: [
      { q: 'Qu\'est-ce que le SEO local et pourquoi est-ce important ?', a: 'Le SEO local est l\'ensemble des techniques pour apparaître dans les résultats de recherche géolocalisés (pack local, Google Maps). C\'est crucial car 46 % des recherches Google ont une intention locale et 88 % des recherches locales sur mobile mènent à une visite ou un appel sous 24h.' },
      { q: 'Quels sont les 3 facteurs de classement SEO local de Google ?', a: 'Google classe les résultats locaux selon 3 critères : la pertinence (votre fiche correspond-elle à la recherche), la distance (proximité avec l\'utilisateur) et la notoriété (avis, citations, backlinks, ancienneté).' },
      { q: 'Combien de temps prend une stratégie SEO local pour donner des résultats ?', a: 'Les premiers résultats apparaissent généralement en 4 à 8 semaines. Une progression significative dans le pack local prend 3 à 6 mois avec une stratégie active et régulière.' },
      { q: 'Faut-il utiliser le schema markup pour le SEO local ?', a: 'Oui, le schema LocalBusiness aide Google à mieux comprendre votre activité, votre zone de service et vos coordonnées. Il augmente aussi vos chances d\'obtenir des rich snippets dans les résultats de recherche.' },
    ],
  },
  'erreurs-demander-avis': {
    title: 'Les erreurs fatales à éviter avec vos avis Google | Guide 2026',
    description: 'Acheter des faux avis, harceler vos clients, offrir des récompenses... Ces erreurs peuvent vous faire bannir de Google. Guide complet des pratiques interdites et des bonnes alternatives.',
    keywords: 'erreurs avis google, faux avis google, acheter avis google, avis google interdits, règles avis google, sanctions google avis, bonnes pratiques avis',
    date: '2025-10-25',
    dateModified: '2025-10-25',
    category: 'Bonnes pratiques',
    faq: [
      { q: 'Que risque-t-on en achetant des faux avis Google ?', a: 'Google peut supprimer tous vos avis (même les vrais), suspendre votre fiche Google Business Profile et vous infliger une pénalité de visibilité durable. La FTC et la DGCCRF peuvent aussi imposer des amendes pour pratiques commerciales trompeuses.' },
      { q: 'Peut-on offrir une réduction en échange d\'un avis Google ?', a: 'Non, c\'est explicitement interdit par les conditions d\'utilisation de Google. Offrir une contrepartie (réduction, cadeau, avantage) en échange d\'un avis est considéré comme de l\'incentivization et peut entraîner la suppression de tous vos avis.' },
      { q: 'Comment supprimer un faux avis négatif sur Google ?', a: 'Signalez l\'avis via votre fiche Google Business Profile en sélectionnant le motif approprié (spam, contenu hors sujet, conflit d\'intérêts). Google examine le signalement sous 3 à 15 jours. En attendant, répondez professionnellement à l\'avis.' },
      { q: 'Est-ce une erreur de ne pas répondre aux avis ?', a: 'Oui, c\'est une erreur majeure. Ne pas répondre envoie un signal de désintérêt à vos prospects. Google favorise aussi les fiches dont le propriétaire répond activement aux avis. Répondez à chaque avis, positif comme négatif, sous 24 à 48h.' },
    ],
  },
}

/* ── generateMetadata dynamique ── */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const seo = seoData[params.slug]
  if (!seo) {
    return { title: 'Article | Blog Swiipx' }
  }

  return {
    title: `${seo.title} - Swiipx`,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://swiipx.fr/blog/${params.slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://swiipx.fr/blog/${params.slug}`,
      siteName: 'Swiipx',
      locale: 'fr_FR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  }
}

/* ── JSON-LD schemas ── */
function buildJsonLd(slug: string) {
  const seo = seoData[slug]
  if (!seo) return null

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seo.title,
    description: seo.description,
    datePublished: seo.date,
    dateModified: seo.dateModified,
    author: { '@type': 'Organization', name: 'Swiipx', url: 'https://swiipx.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'Swiipx',
      url: 'https://swiipx.fr',
      logo: { '@type': 'ImageObject', url: 'https://swiipx.fr/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://swiipx.fr/blog/${slug}`,
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seo.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://swiipx.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://swiipx.fr/blog' },
      { '@type': 'ListItem', position: 3, name: seo.title.split('|')[0].trim(), item: `https://swiipx.fr/blog/${slug}` },
    ],
  }

  return { article, faqPage, breadcrumb }
}

export default function ArticleLayout({
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.article) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
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
