import type { Metadata } from 'next'

import { seoData } from './seo-data'


/* ── generateStaticParams — pre-build all article pages ── */
export function generateStaticParams() {
  return Object.keys(seoData).map((slug) => ({ slug }))
}

/* ── generateMetadata dynamique ── */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const seo = seoData[params.slug]
  if (!seo) {
    return { title: 'Article | Blog Swiipx' }
  }

  return {
    title: seo.title,
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
      publishedTime: seo.date,
      modifiedTime: seo.dateModified,
      authors: ['Équipe Swiipx'],
      images: [
        {
          url: '/product-main.jpg',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/product-main.jpg'],
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
    inLanguage: 'fr-FR',
    keywords: seo.keywords,
    articleSection: seo.category,
    author: {
      '@type': 'Organization',
      name: 'Swiipx',
      url: 'https://swiipx.fr',
      '@id': 'https://swiipx.fr/#organization',
    },
    publisher: { '@id': 'https://swiipx.fr/#organization' },
    about: {
      '@type': 'Thing',
      name: 'Plaque NFC avis Google',
    },
    image: 'https://swiipx.fr/product-main.jpg',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.article-excerpt'],
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
