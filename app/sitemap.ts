import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swiipx.fr'

  const blogSlugs = [
    'obtenir-plus-avis-google',
    'avis-clients-influencent-business',
    'booster-visibilite-locale',
    'nfc-avis-clients',
    'seo-local-recherches-google',
    'erreurs-demander-avis',
  ]

  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog/doubler-avis-google-30-jours`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/livraison`, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/retours`, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/cgv`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
