import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swiipx.fr'

  const blogArticles: { slug: string; date: string }[] = [
    { slug: 'repondre-avis-negatifs-google', date: '2026-07-13' },
    { slug: 'plaque-nfc-garage-automobile', date: '2026-07-13' },
    { slug: 'plaque-nfc-cabinet-medical', date: '2026-06-08' },
    { slug: 'plaque-nfc-restaurant', date: '2026-05-11' },
    { slug: 'plaque-avis-google-sans-abonnement', date: '2026-05-11' },
    { slug: 'plaque-nfc-salon-coiffure', date: '2026-05-11' },
    { slug: 'prix-plaque-nfc-avis-google', date: '2026-05-12' },
    { slug: 'ou-placer-plaque-avis-google', date: '2026-05-12' },
    { slug: 'plaque-nfc-vs-qr-code-avis-google', date: '2026-05-10' },
    { slug: 'doubler-avis-google-30-jours', date: '2026-01-19' },
    { slug: 'obtenir-plus-avis-google', date: '2026-01-15' },
    { slug: 'avis-clients-influencent-business', date: '2026-01-20' },
    { slug: 'booster-visibilite-locale', date: '2026-01-21' },
    { slug: 'nfc-avis-clients', date: '2026-01-22' },
    { slug: 'seo-local-recherches-google', date: '2026-01-23' },
    { slug: 'erreurs-demander-avis', date: '2026-01-24' },
  ]

  const productSlugs = ['starter', 'business', 'pro']
  const sectorSlugs = ['restaurant', 'salon-coiffure', 'cabinet-medical']

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

  const sectorPages = sectorSlugs.map((slug) => ({
    url: `${baseUrl}/secteur/${slug}`,
    lastModified: '2026-05-10',
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Trouver l'article le plus récent (priorité dynamique = 0.9)
  const sortedByDate = [...blogArticles].sort((a, b) =>
    b.date.localeCompare(a.date)
  )
  const newestSlug = sortedByDate[0]?.slug
  const secondNewestSlug = sortedByDate[1]?.slug

  const blogPages = blogArticles.map(({ slug, date }) => {
    let priority = 0.7
    if (slug === newestSlug) priority = 0.9
    else if (slug === secondNewestSlug) priority = 0.8
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: date,
      changeFrequency: 'monthly' as const,
      priority,
    }
  })

  return [...staticPages, ...productPages, ...sectorPages, ...blogPages]
}
