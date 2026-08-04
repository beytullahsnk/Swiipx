import { Metadata } from 'next'
import type { PackSlug } from '../../../lib/pricing'
import { aggregateRatingJsonLd, reviewsJsonLd, reviewsPourPack } from '../../data/reviews'

const productsMeta: Record<string, {
  title: string
  description: string
  price: string
  plaques: number
  keywords: string
  sku: string
  image: string
}> = {
  starter: {
    title: 'Pack Starter — 1 Plaque Avis Google NFC',
    description: 'Plaque avis Google NFC pour collecter des avis automatiquement. Parfait pour débuter. Livraison gratuite, garantie à vie, sans abonnement. 35,88€.',
    price: '35.88',
    plaques: 1,
    keywords: 'plaque avis google, plaque avis google nfc, pack starter plaque avis google, collecter avis google',
    sku: 'SWIIPX-STARTER',
    image: '/products/plaque1.jpg',
  },
  business: {
    title: 'Pack Business — 2 Plaques Avis Google NFC',
    description: '2 plaques avis Google NFC pour multiplier vos avis. Idéal pour les professionnels. Livraison offerte, garantie à vie, sans abonnement. 65,88€.',
    price: '65.88',
    plaques: 2,
    keywords: 'plaque avis google, pack business plaque avis google nfc, 2 plaques avis google',
    sku: 'SWIIPX-BUSINESS',
    image: '/products/plaque2.jpg',
  },
  pro: {
    title: 'Pack Pro — 5 Plaques Avis Google NFC',
    description: '5 plaques avis Google NFC pour maximiser vos avis sur plusieurs emplacements. Solution complète avec support dédié et configuration incluse. 107,88€.',
    price: '107.88',
    plaques: 5,
    keywords: 'plaque avis google, pack pro plaque avis google nfc, 5 plaques avis google',
    sku: 'SWIIPX-PRO',
    image: '/products/plaque5.jpg',
  },
}

const productSpecs: Record<string, Array<{ name: string; value: string }>> = {
  starter: [
    { name: 'Dimensions', value: '120 x 120 x 3 mm' },
    { name: 'Matériau', value: 'Acrylique premium' },
    { name: 'Technologie NFC', value: 'NTAG215' },
    { name: 'Compatibilité', value: 'Tous smartphones récents (iPhone & Android)' },
    { name: 'Résistance', value: 'Eau, UV, rayures' },
    { name: 'Nombre de plaques', value: '1' },
    { name: 'Garantie', value: 'À vie (défaut de fabrication)' },
  ],
  business: [
    { name: 'Dimensions', value: '120 x 120 x 3 mm' },
    { name: 'Matériau', value: 'Acrylique premium' },
    { name: 'Technologie NFC', value: 'NTAG215' },
    { name: 'Compatibilité', value: 'Tous smartphones récents (iPhone & Android)' },
    { name: 'Résistance', value: 'Eau, UV, rayures' },
    { name: 'Nombre de plaques', value: '2' },
    { name: 'Garantie', value: 'À vie (défaut de fabrication)' },
  ],
  pro: [
    { name: 'Dimensions', value: '120 x 120 x 3 mm' },
    { name: 'Matériau', value: 'Acrylique premium' },
    { name: 'Technologie NFC', value: 'NTAG215' },
    { name: 'Compatibilité', value: 'Tous smartphones récents (iPhone & Android)' },
    { name: 'Résistance', value: 'Eau, UV, rayures' },
    { name: 'Nombre de plaques', value: '5' },
    { name: 'Garantie', value: 'À vie (défaut de fabrication)' },
  ],
}

const productFAQs: Record<string, Array<{ question: string; answer: string }>> = {
  starter: [
    { question: 'Comment fonctionne la plaque NFC avis Google Swiipx ?', answer: 'Vos clients approchent simplement leur smartphone de la plaque NFC. Ils sont automatiquement redirigés vers votre page d\'avis Google pour laisser un avis en quelques secondes. Aucune application requise, compatible tous smartphones récents.' },
    { question: 'La plaque NFC est-elle compatible avec tous les smartphones ?', answer: 'Oui, la plaque NFC NTAG215 est compatible avec tous les smartphones récents (iPhone et Android). Un QR code de secours est également intégré pour les appareils plus anciens ne disposant pas du NFC.' },
    { question: 'Combien de temps dure la livraison de la plaque avis Google ?', answer: 'La livraison est gratuite en France métropolitaine et prend 2 à 5 jours ouvrés. Expédition sous 24h après commande. Un numéro de suivi vous est envoyé par email dès l\'expédition.' },
  ],
  business: [
    { question: 'Pourquoi choisir le pack Business avec 2 plaques avis Google NFC ?', answer: 'Le pack Business permet de couvrir 2 emplacements stratégiques (accueil, comptoir, vitrine, salle d\'attente). Multiplier les points de contact augmente significativement le nombre d\'avis Google collectés, en moyenne +150% en 2 mois.' },
    { question: 'Les plaques NFC Swiipx sont-elles résistantes ?', answer: 'Oui, nos plaques en acrylique premium de 3 mm d\'épaisseur (120 x 120 mm) résistent à l\'eau, aux UV et aux rayures. Elles sont garanties à vie contre tout défaut de fabrication avec remplacement gratuit.' },
    { question: 'Puis-je configurer chaque plaque avec un lien différent ?', answer: 'Oui, chaque plaque NFC du pack Business peut être configurée avec un lien différent. Vous pouvez rediriger vers votre fiche Google Business, un formulaire de satisfaction, ou tout autre lien de votre choix.' },
  ],
  pro: [
    { question: 'Que comprend le tableau de bord analytics du Pack Pro Swiipx ?', answer: 'Le tableau de bord vous permet de suivre le nombre de scans par plaque, les heures de pointe et les performances de chaque emplacement. Idéal pour optimiser votre stratégie de collecte d\'avis Google sur plusieurs sites.' },
    { question: 'Comment fonctionnent les liens personnalisables par plaque NFC ?', answer: 'Chaque plaque NFC du Pack Pro peut pointer vers une URL différente. Vous pouvez rediriger vers votre page Google Business, un formulaire de satisfaction client, ou tout autre lien. La configuration est incluse et notre support vous accompagne.' },
    { question: 'La garantie à vie du Pack Pro couvre quoi exactement ?', answer: 'Le Pack Pro bénéficie d\'une garantie à vie contre tout défaut de fabrication des plaques NFC en acrylique. En cas de défaillance technique non imputable à une mauvaise utilisation, nous remplaçons la plaque gratuitement.' },
  ],
}

/** Expedition sous 24 h ouvrees, puis 2 a 3 jours de transport. */
const DELAI_LIVRAISON = {
  '@type': 'ShippingDeliveryTime',
  handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 1, unitCode: 'DAY' },
  transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
}

export function generateStaticParams() {
  return Object.keys(productsMeta).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = productsMeta[params.slug]

  if (!product) {
    return { title: 'Produit non trouvé' }
  }

  return {
    title: product.title,
    description: product.description,
    keywords: product.keywords,
    openGraph: {
      title: product.title,
      description: product.description,
      type: 'website',
      url: `https://swiipx.fr/product/${params.slug}`,
      locale: 'fr_FR',
      siteName: 'Swiipx',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://swiipx.fr/product/${params.slug}`,
    },
    other: {
      'product:price:amount': product.price,
      'product:price:currency': 'EUR',
      'product:availability': 'in stock',
    },
  }
}

export default function ProductLayout({ params, children }: { params: { slug: string }; children: React.ReactNode }) {
  const slug = params.slug
  const product = productsMeta[slug]

  if (!product) {
    return <>{children}</>
  }

  const specs = productSpecs[slug] || []
  const faqs = productFAQs[slug] || []
  const avis = reviewsPourPack(slug as PackSlug)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: product.sku,
    image: [
      `https://swiipx.fr${product.image}`,
      'https://swiipx.fr/product-main.jpg',
      'https://swiipx.fr/product-thumb-1.jpg',
    ],
    brand: {
      '@type': 'Brand',
      name: 'Swiipx',
    },
    ...(specs.length > 0 && {
      additionalProperty: specs.map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.name,
        value: spec.value,
      })),
    }),
    offers: {
      '@type': 'Offer',
      url: `https://swiipx.fr/product/${slug}`,
      priceCurrency: 'EUR',
      price: product.price,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Swiipx',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'FR',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      // DEUX modes, deux tarifs. Le balisage annoncait une livraison a 0 EUR
      // alors que le domicile est facture 4,90 EUR au panier
      // (SHIPPING_DOMICILE_CENTS). Google recoupe le prix balise avec celui
      // reellement debite : un ecart a la hausse fait desapprouver la fiche.
      shippingDetails: [
        {
          '@type': 'OfferShippingDetails',
          name: 'Point relais',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
          deliveryTime: DELAI_LIVRAISON,
        },
        {
          '@type': 'OfferShippingDetails',
          name: 'Domicile',
          shippingRate: { '@type': 'MonetaryAmount', value: '4.90', currency: 'EUR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
          deliveryTime: DELAI_LIVRAISON,
        },
      ],
    },
    // Note moyenne et avis : emis UNIQUEMENT si de vrais avis existent dans
    // app/data/reviews.ts. Merchant Center signale ces deux champs comme
    // manquants (avertissement non bloquant) ; les remplir avec des notes
    // inventees serait une infraction aux regles sur les donnees structurees.
    // Les memes avis sont affiches sur la page par <CustomerReviews />, comme
    // Google l'exige.
    ...(aggregateRatingJsonLd(avis) ?? {}),
    ...(reviewsJsonLd(avis) ?? {}),
  }

  const breadcrumbJsonLd = {
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
        name: product.title,
        item: `https://swiipx.fr/product/${slug}`,
      },
    ],
  }

  const faqJsonLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {children}
    </>
  )
}
