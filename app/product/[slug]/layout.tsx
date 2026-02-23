import { Metadata } from 'next'

const productsMeta: Record<string, { title: string; description: string; price: string; keywords: string }> = {
  starter: {
    title: 'Pack Starter — 1 Plaque NFC Avis Google',
    description: 'Plaque NFC pour collecter des avis Google automatiquement. Parfait pour débuter. Livraison gratuite, garantie 2 ans, sans abonnement. 39,90€.',
    price: '39.90',
    keywords: 'plaque NFC avis google, pack starter, 1 plaque NFC, collecter avis google',
  },
  business: {
    title: 'Pack Business — 2 Plaques NFC Avis Google',
    description: '2 plaques NFC pour multiplier vos avis Google. Idéal pour les professionnels. Personnalisation gratuite, livraison offerte, garantie 2 ans. 59,90€.',
    price: '59.90',
    keywords: 'pack business plaque NFC, 2 plaques NFC, avis google professionnels',
  },
  pro: {
    title: 'Pack Pro — 5 Plaques NFC Avis Google',
    description: '5 plaques NFC pour maximiser vos avis Google sur plusieurs emplacements. Solution complète avec support dédié et configuration incluse. 89,90€.',
    price: '89.90',
    keywords: 'pack pro plaque NFC, 5 plaques NFC, avis google multi-sites',
  },
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
      type: 'product' as any,
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
    },
    alternates: {
      canonical: `https://swiipx.fr/product/${params.slug}`,
    },
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
