import { MetadataRoute } from 'next'
import { seoData } from './blog/[slug]/seo-data'

const BASE_URL = 'https://swiipx.fr'

/**
 * Articles ayant leur propre route au lieu de passer par /blog/[slug].
 * Ils ne sont pas dans seoData, il faut donc les déclarer ici à la main.
 */
const ARTICLES_ROUTE_DEDIEE = [
  { slug: 'doubler-avis-google-30-jours', date: '2026-01-19', dateModified: '2026-07-28' },
]

/**
 * Le sitemap dérive de seo-data.ts (la même source que generateStaticParams).
 * Ajouter un article là-bas suffit : il est construit ET déclaré à Google.
 *
 * Avant, les deux listes étaient tenues à la main séparément — un article
 * oublié côté sitemap n'était jamais découvert par Google, donc jamais indexé,
 * donc zéro trafic. Sur un site dont le SEO est l'unique canal, c'est le type
 * d'oubli qui coûte le plus cher.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = [
    ...Object.entries(seoData).map(([slug, seo]) => ({
      slug,
      date: seo.date,
      dateModified: seo.dateModified,
    })),
    ...ARTICLES_ROUTE_DEDIEE,
  ]

  const productSlugs = ['starter', 'business', 'pro']
  const sectorSlugs = ['restaurant', 'salon-coiffure', 'cabinet-medical']

  /**
   * Dates de derniere modification, par groupe de pages.
   *
   * Il n'y avait qu'une constante pour tout le site, figee au 28/07 : l'accueil
   * et les fiches produit ont ete modifiees plusieurs fois depuis (prix, avis,
   * balisage), et le sitemap continuait d'annoncer a Google qu'elles n'avaient
   * pas bouge. Un lastmod perime retarde le reexamen des pages qui comptent.
   *
   * A mettre a jour dans le meme commit que le contenu concerne — c'est deja le
   * modele suivi article par article via dateModified dans seo-data.ts.
   */
  const MODIF_COMMERCIAL = '2026-08-07'   // accueil, fiches produit, pages secteur
  const MODIF_LEGAL = '2026-08-05'        // CGV, livraison, retours, mentions legales
  const MODIF_EDITORIAL = '2026-08-07'    // /blog et pages de contenu

  const staticPages = [
    { url: BASE_URL, lastModified: MODIF_COMMERCIAL, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: MODIF_EDITORIAL, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/a-propos`, lastModified: MODIF_EDITORIAL, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: MODIF_LEGAL, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/livraison`, lastModified: MODIF_LEGAL, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${BASE_URL}/retours`, lastModified: MODIF_LEGAL, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${BASE_URL}/cgv`, lastModified: MODIF_LEGAL, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: MODIF_LEGAL, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const productPages = productSlugs.map((slug) => ({
    url: `${BASE_URL}/product/${slug}`,
    lastModified: MODIF_COMMERCIAL,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const sectorPages = sectorSlugs.map((slug) => ({
    url: `${BASE_URL}/secteur/${slug}`,
    lastModified: MODIF_COMMERCIAL,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  /* Les 2 articles les plus récents sont mis en avant. On classe sur la date de
     PUBLICATION, pas sur dateModified : une modification globale (changement de
     prix, par exemple) aligne toutes les dates de modification et rendrait le
     classement arbitraire. */
  const parPublication = [...articles].sort((a, b) => b.date.localeCompare(a.date))
  const plusRecent = parPublication[0]?.slug
  const secondPlusRecent = parPublication[1]?.slug

  const blogPages = articles.map(({ slug, dateModified }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: dateModified,
    changeFrequency: 'monthly' as const,
    priority: slug === plusRecent ? 0.9 : slug === secondPlusRecent ? 0.8 : 0.7,
  }))

  return [...staticPages, ...productPages, ...sectorPages, ...blogPages]
}
