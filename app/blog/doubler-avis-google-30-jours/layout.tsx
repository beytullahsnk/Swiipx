import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comment doubler vos avis Google en 30 jours | Guide 2026',
  description:
    'Méthode en 4 phases pour doubler vos avis Google en 30 jours : fiche Google Business, plaque NFC, scripts de demande et modèles de réponse.',
  keywords:
    'doubler avis google, obtenir plus avis google, augmenter avis google, plaque NFC avis, Google My Business, avis clients, e-réputation, visibilité locale, collecte avis google, avis google 30 jours',
  alternates: {
    canonical: 'https://swiipx.fr/blog/doubler-avis-google-30-jours',
  },
  openGraph: {
    title: 'Comment doubler vos avis Google en 30 jours | Guide 2026',
    description:
      'La méthode en 4 phases : optimiser la fiche Google Business, supprimer la friction avec une plaque NFC, demander l\'avis au bon moment et répondre à chacun.',
    url: 'https://swiipx.fr/blog/doubler-avis-google-30-jours',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'article',
    publishedTime: '2026-01-19',
    modifiedTime: '2026-07-28',
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
      'Méthode en 4 phases : fiche Google Business, plaque NFC, scripts et modèles de réponse.',
    images: ['/product-main.jpg'],
  },
}

/* ── JSON-LD : Article + FAQPage + BreadcrumbList ── */
const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Comment doubler vos avis Google en 30 jours',
  description:
    'Méthode en 4 phases pour doubler vos avis Google en 30 jours : fiche Google Business, plaque NFC, scripts de demande et modèles de réponse.',
  datePublished: '2026-01-19',
  dateModified: '2026-07-28',
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
        text: 'Oui. Restaurants, salons de coiffure, cabinets médicaux, boutiques, garages… la méthode fonctionne pour tout commerce qui reçoit ses clients sur place. Le seul prérequis est d\'avoir un moment où le client est satisfait, disponible, et son téléphone à portée de main : c\'est là que la plaque doit se trouver. Le nombre d\'avis obtenu, lui, dépend de votre fréquentation et de la régularité avec laquelle votre équipe pense à mentionner la plaque.',
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
        text: 'Répondez sous 24 à 48 h, de façon factuelle et sans polémique. Votre réponse est publique et permanente : elle est lue par les prospects qui hésitent, et elle leur montre comment vous traitez un problème, ce qu\'aucun avis positif ne démontre. Dans l\'enquête BrightLocal Local Consumer Review Survey 2026, menée auprès de 1 002 consommateurs américains, 89 % des répondants déclarent attendre qu\'une entreprise réponde à ses avis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ça marche sans plaque NFC ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, mais chaque étape ajoutée entre l\'envie et l\'avis publié fait perdre des clients. Le QR code oblige à sortir le téléphone, ouvrir l\'appareil photo, viser, puis confirmer l\'ouverture d\'un lien. L\'e-mail de relance, lui, arrive des heures plus tard, quand le client n\'est plus dans le contexte. Le NFC agit sur place, en un geste, pendant que la satisfaction est encore fraîche. Nous ne publions pas de taux de conversion comparés : nous ne les mesurons pas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte une plaque NFC Swiipx ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'À partir de 35,88 € pour une plaque. Le pack 2 plaques (le plus populaire) est à 65,88 € et le pack 5 plaques à 107,88 €. Aucun abonnement mensuel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps pour voir les premiers résultats ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La plaque fonctionne dès sa réception : elle arrive déjà programmée avec le lien de votre fiche, il n\'y a rien à installer. Le rythme, lui, dépend entièrement de votre fréquentation et de la régularité de la demande. Faites le calcul avec vos propres chiffres : un commerce qui sert 300 clients par semaine et en convainc un sur vingt ajoute une quinzaine d\'avis par semaine ; un cabinet qui reçoit 20 personnes par jour n\'aura pas le même volume. Nous ne publions pas de moyenne, parce que nous ne mesurons pas la vôtre.',
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
        text: 'Oui. Tous les iPhone depuis le modèle 7 (2016) lisent les puces NFC sans réglage ni application, et la quasi-totalité des smartphones Android vendus depuis le milieu des années 2010 également. Pour les rares téléphones qui ne le font pas, un QR code est imprimé au dos de chaque plaque Swiipx.',
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
