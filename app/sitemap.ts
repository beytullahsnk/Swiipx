import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swiipx.fr'

  const blogArticles: { slug: string; date: string }[] = [
    { slug: 'doubler-avis-google-30-jours', date: '2026-01-19' },
    { slug: 'obtenir-plus-avis-google', date: '2026-01-15' },
    { slug: 'avis-clients-influencent-business', date: '2026-01-20' },
    { slug: 'booster-visibilite-locale', date: '2026-01-21' },
    { slug: 'nfc-avis-clients', date: '2026-01-22' },
    { slug: 'seo-local-recherches-google', date: '2026-01-23' },
    { slug: 'erreurs-demander-avis', date: '2026-01-24' },
  ]

  const productSlugs = ['starter', 'business', 'pro']

  const staticPages = [
    { url: baseUrl, lastModified: '2026-02-24', changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: '2026-01-19', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: '2026-02-26', changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/livraison`, lastModified: '2026-02-26', changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/retours`, lastModified: '2026-02-26', changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/cgv`, lastModified: '2026-02-26', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/mentions-legales`, lastModified: '2026-02-26', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: '2026-02-24',
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const blogPages = blogArticles.map(({ slug, date }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: date,
    changeFrequency: 'monthly' as const,
    priority: slug === 'doubler-avis-google-30-jours' ? 0.8 : 0.7,
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
