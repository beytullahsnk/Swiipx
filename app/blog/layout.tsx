import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Swiipx — Avis Google, SEO Local & NFC | Guides 2026',
  description:
    'Guides pratiques pour booster vos avis Google, votre visibilité locale et votre e-réputation. Stratégies NFC, SEO local, scripts de collecte et bonnes pratiques.',
  keywords:
    'blog avis google, guide SEO local, collecte avis, plaque NFC avis, e-réputation, visibilité locale, Google Business Profile',
  alternates: {
    canonical: 'https://swiipx.fr/blog',
  },
  openGraph: {
    title: 'Blog Swiipx — Avis Google, SEO Local & NFC',
    description:
      'Guides pratiques pour booster vos avis Google et votre visibilité locale. Stratégies, scripts et outils NFC.',
    url: 'https://swiipx.fr/blog',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/product-main.jpg', width: 1200, height: 630, alt: 'Blog Swiipx — Guides avis Google et SEO local' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Swiipx — Avis Google, SEO Local & NFC',
    description:
      'Guides pratiques pour booster vos avis Google et votre visibilité locale.',
    images: ['/product-main.jpg'],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        name: 'Blog',
        item: 'https://swiipx.fr/blog',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
