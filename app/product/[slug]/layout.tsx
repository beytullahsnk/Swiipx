import { Metadata } from 'next'

const productsMeta: Record<string, { title: string; description: string; price: string; originalPrice?: string; plaques: number; keywords: string; sku: string }> = {
  starter: {
    title: 'Pack Starter — 1 Plaque Avis Google NFC',
    description: 'Plaque avis Google NFC pour collecter des avis automatiquement. Parfait pour débuter. Livraison gratuite, garantie 2 ans, sans abonnement. 39,90€.',
    price: '39.90',
    plaques: 1,
    keywords: 'plaque avis google, plaque avis google nfc, pack starter plaque avis google, collecter avis google',
    sku: 'SWIIPX-STARTER',
  },
  business: {
    title: 'Pack Business — 2 Plaques Avis Google NFC',
    description: '2 plaques avis Google NFC pour multiplier vos avis. Idéal pour les professionnels. Personnalisation gratuite, livraison offerte, garantie 2 ans. 59,90€.',
    price: '59.90',
    originalPrice: '79.90',
    plaques: 2,
    keywords: 'plaque avis google, pack business plaque avis google nfc, 2 plaques avis google',
    sku: 'SWIIPX-BUSINESS',
  },
  pro: {
    title: 'Pack Pro — 5 Plaques Avis Google NFC',
    description: '5 plaques avis Google NFC pour maximiser vos avis sur plusieurs emplacements. Solution complète avec support dédié et configuration incluse. 89,90€.',
    price: '89.90',
    originalPrice: '149.90',
    plaques: 5,
    keywords: 'plaque avis google, pack pro plaque avis google nfc, 5 plaques avis google',
    sku: 'SWIIPX-PRO',
  },
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
          url: '/product-main.jpg',
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
      images: ['/product-main.jpg'],
    },
    alternates: {
      canonical: `https://swiipx.fr/product/${params.slug}`,
    },
  }
}

export default function ProductLayout({ params, children }: { params: { slug: string }; children: React.ReactNode }) {
  const product = productsMeta[params.slug]

  if (!product) {
    return <>{children}</>
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: product.sku,
    image: [
      'https://swiipx.fr/product-main.jpg',
      'https://swiipx.fr/product-thumb-1.jpg',
      'https://swiipx.fr/product-thumb-2.jpg',
    ],
    brand: {
      '@type': 'Brand',
      name: 'Swiipx',
    },
    offers: {
      '@type': 'Offer',
      url: `https://swiipx.fr/product/${params.slug}`,
      priceCurrency: 'EUR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Swiipx',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'EUR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'FR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
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
        item: `https://swiipx.fr/product/${params.slug}`,
      },
    ],
  }

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
      {children}
    </>
  )
}
