import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swiipx.fr'
  const now = new Date().toISOString()

  const blogSlugs = [
    'obtenir-plus-avis-google',
    'avis-clients-influencent-business',
    'booster-visibilite-locale',
    'nfc-avis-clients',
    'seo-local-recherches-google',
    'erreurs-demander-avis',
  ]

  const productSlugs = ['starter', 'business', 'pro']

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog/doubler-avis-google-30-jours`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/livraison`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/retours`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/cgv`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
