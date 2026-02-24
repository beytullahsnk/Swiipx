import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comment doubler vos avis Google en 30 jours | Guide 2026',
  description:
    'Méthode complète en 4 phases pour doubler vos avis Google en 30 jours. Optimisation Google Business Profile, plaque NFC, scripts de demande et templates de réponse. Cas pratique : +740 % d\'avis.',
  keywords:
    'doubler avis google, obtenir plus avis google, augmenter avis google, plaque NFC avis, Google My Business, avis clients, e-réputation, visibilité locale, collecte avis google, avis google 30 jours',
  alternates: {
    canonical: 'https://swiipx.fr/blog/doubler-avis-google-30-jours',
  },
  openGraph: {
    title: 'Comment doubler vos avis Google en 30 jours | Guide 2026',
    description:
      'La méthode en 4 phases pour passer de 10 à 100+ avis Google. Cas pratique, scripts prêts à copier et outils NFC indispensables.',
    url: 'https://swiipx.fr/blog/doubler-avis-google-30-jours',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'article',
    publishedTime: '2026-01-19',
    modifiedTime: '2026-01-19',
    authors: ['Équipe Swiipx'],
    images: [
      {
        url: '/product-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Comment doubler vos avis Google en 30 jours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comment doubler vos avis Google en 30 jours | Guide 2026',
    description:
      'Méthode complète en 4 phases + cas pratique (+740 % d\'avis). Scripts, templates et outils NFC.',
    images: ['/product-main.jpg'],
  },
}

/* ── JSON-LD : Article + FAQPage + BreadcrumbList ── */
const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Comment doubler vos avis Google en 30 jours',
  description:
    'Méthode complète en 4 phases pour doubler vos avis Google en 30 jours. Optimisation Google Business Profile, plaque NFC, scripts de demande et templates de réponse.',
  datePublished: '2026-01-19',
  dateModified: '2026-01-19',
  author: {
    '@type': 'Organization',
    name: 'Swiipx',
    url: 'https://swiipx.fr',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Swiipx',
    url: 'https://swiipx.fr',
    logo: {
      '@type': 'ImageObject',
      url: 'https://swiipx.fr/logo.png',
    },
  },
  image: 'https://swiipx.fr/product-main.jpg',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://swiipx.fr/blog/doubler-avis-google-30-jours',
  },
}

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Est-ce que ça marche pour tous les secteurs ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Restaurants, salons de coiffure, cabinets médicaux, boutiques, garages… la méthode fonctionne pour tout commerce ayant des clients physiques. Le NFC convertit en moyenne à 35-45 % dans tous les secteurs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps par jour faut-il y consacrer ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 à 15 minutes par jour suffisent pour répondre aux avis et suivre les statistiques. La collecte est automatisée grâce à la plaque NFC et aux scripts de demande.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que faire si je reçois un avis négatif ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un avis négatif bien géré devient une opportunité : répondez sous 24 h de façon professionnelle et empathique. 89 % des prospects lisent vos réponses aux avis négatifs avant de prendre leur décision.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ça marche sans plaque NFC ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, mais avec un taux de conversion 4 à 5 fois inférieur. Le QR code convertit à environ 10 %, l\'email à 3-5 %, tandis que le NFC atteint 35-45 %.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte une plaque NFC Swiipx ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'À partir de 39,90 € pour une plaque. Le pack 2 plaques (le plus populaire) est à 59,90 € et le pack 5 plaques à 89,90 €. Aucun abonnement mensuel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps pour voir les premiers résultats ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les premiers avis supplémentaires arrivent dès la première semaine. En moyenne, nos clients constatent un doublement de leurs avis en 3 à 4 semaines avec la méthode complète.',
      },
    },
    {
      '@type': 'Question',
      name: 'Google pénalise-t-il la collecte d\'avis par NFC ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non. Le NFC redirige simplement le client vers la page d\'avis Google officielle. Il n\'y a aucune manipulation : le client rédige son propre avis librement. Cette méthode est 100 % conforme aux règles de Google.',
      },
    },
    {
      '@type': 'Question',
      name: 'Est-ce que le NFC fonctionne avec tous les smartphones ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Tous les iPhone depuis le modèle 7 (2016) et la quasi-totalité des smartphones Android supportent le NFC nativement. Cela représente plus de 95 % des appareils en circulation en France.',
      },
    },
  ],
}

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: 'https://swiipx.fr',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://swiipx.fr/blog',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Comment doubler vos avis Google en 30 jours',
      item: 'https://swiipx.fr/blog/doubler-avis-google-30-jours',
    },
  ],
}

export default function DoublerAvisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  )
}
