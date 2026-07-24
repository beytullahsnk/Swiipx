import type { Metadata } from 'next'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog Swiipx — Conseils avis Google, NFC & SEO local',
  description: "Conseils, stratégies et astuces pour booster vos avis Google, optimiser votre fiche Google Business Profile et développer votre visibilité locale.",
  alternates: {
    canonical: 'https://swiipx.fr/blog',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://swiipx.fr/blog',
    siteName: 'Swiipx',
    title: 'Blog Swiipx — Conseils avis Google, NFC & SEO local',
    description: "Conseils, stratégies et astuces pour booster vos avis Google, optimiser votre fiche Google Business Profile et développer votre visibilité locale.",
    images: [
      {
        url: '/product-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Swiipx',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Swiipx — Conseils avis Google, NFC & SEO local',
    description: "Conseils, stratégies et astuces pour booster vos avis Google et votre visibilité locale.",
    images: ['/product-main.jpg'],
  },
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  dateIso: string
  readTime: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 19,
    title: 'Optimiser sa fiche Google Business Profile : le guide 2026',
    excerpt: 'Le guide complet 2026 pour optimiser votre fiche Google Business Profile : catégories, photos, avis, Google Posts, pack local, 7 erreurs à éviter et plan d\'action 30 jours.',
    category: 'SEO Local',
    date: '24 juillet 2026',
    dateIso: '2026-07-24',
    readTime: '11 min',
    slug: 'optimiser-fiche-google-business-profile',
  },
  {
    id: 18,
    title: 'Plaque NFC institut de beauté : x5 avis Google après chaque soin',
    excerpt: 'Instituts de beauté, esthétique, onglerie, spa : multipliez vos avis Google par 5 avec une plaque NFC. Emplacements, scripts esthéticienne, 3 études de cas et ROI chiffré.',
    category: 'Secteur',
    date: '22 juillet 2026',
    dateIso: '2026-07-22',
    readTime: '10 min',
    slug: 'plaque-nfc-institut-beaute',  },
  {
    id: 17,
    title: 'Comment choisir sa plaque NFC avis Google : le guide 2026',
    excerpt: 'Puce, materiau, abonnement, nombre de plaques : les 7 criteres pour choisir la bonne plaque NFC avis Google du premier coup. Comparatif, pieges a eviter et grille de decision.',
    category: 'Comparatif',
    date: '20 juillet 2026',
    dateIso: '2026-07-20',
    readTime: '10 min',
    slug: 'comment-choisir-plaque-nfc-avis-google',  },
  {
    id: 16,
    title: 'Statistiques avis Google 2026 : 45 chiffres clés à connaître',
    excerpt: '45 statistiques 2026 sur les avis Google : lecture, SEO local, conversion, effet de la note, réponses. Les chiffres qui prouvent le ROI d\'une stratégie d\'avis.',
    category: 'Statistiques',
    date: '17 juillet 2026',
    dateIso: '2026-07-17',
    readTime: '11 min',
    slug: 'statistiques-avis-google-2026',  },
  {
    id: 15,
    title: 'Répondre aux avis négatifs Google : la méthode complète',
    excerpt: 'Un avis à 1 étoile ne s\'adresse pas à vous, mais à vos 300 prochains prospects. Méthode en 5 étapes, 6 modèles de réponses, suppression et dilution.',
    category: 'SEO Local',
    date: '13 juillet 2026',
    dateIso: '2026-07-13',
    readTime: '10 min',
    slug: 'repondre-avis-negatifs-google',  },
  {
    id: 14,
    title: 'Plaque NFC garage automobile : x4 avis Google en 2026',
    excerpt: 'Garages, centres auto, carrosseries : multipliez vos avis Google par 4 avec une plaque NFC. Emplacements, scripts garagiste, 3 études de cas et ROI chiffré.',
    category: 'Secteur',
    date: '13 juillet 2026',
    dateIso: '2026-07-13',
    readTime: '10 min',
    slug: 'plaque-nfc-garage-automobile',  },
  {
    id: 13,
    title: 'Plaque NFC cabinet médical : avis Google et déontologie',
    excerpt: 'Médecins, dentistes, kinés, ostéopathes : collectez des avis Google avec une plaque NFC en respectant la déontologie. Placements, scripts conformes, FAQ.',
    category: 'Secteur',
    date: '8 juin 2026',
    dateIso: '2026-06-08',
    readTime: '9 min',
    slug: 'plaque-nfc-cabinet-medical',  },
  {
    id: 12,
    title: 'Où placer votre plaque avis Google ? 7 emplacements stratégiques',
    excerpt: 'Le placement de votre plaque avis Google détermine 80 % du taux de conversion. Guide 2026 : 7 emplacements optimaux par secteur.',
    category: 'Conseils',
    date: '12 mai 2026',
    dateIso: '2026-05-12',
    readTime: '8 min',
    slug: 'ou-placer-plaque-avis-google',  },
  {
    id: 11,
    title: 'Prix plaque NFC avis Google : combien ça coûte vraiment en 2026 ?',
    excerpt: 'Fourchettes de prix par qualité, packs multi-plaques, facteurs de prix. Le bon budget : 35-60 € par plaque. ROI réel calculé.',
    category: 'Comparatif',
    date: '12 mai 2026',
    dateIso: '2026-05-12',
    readTime: '8 min',
    slug: 'prix-plaque-nfc-avis-google',  },
  {
    id: 10,
    title: 'Plaque NFC salon coiffure : guide ROI 2026',
    excerpt: 'Comment collecter +150 avis Google par an avec une plaque NFC dans votre salon. Placements, scripts coiffeur, 3 études de cas réelles.',
    category: 'Secteur',
    date: '11 mai 2026',
    dateIso: '2026-05-11',
    readTime: '9 min',
    slug: 'plaque-nfc-salon-coiffure',  },
  {
    id: 9,
    title: 'Plaque avis Google sans abonnement : comparatif 2026',
    excerpt: 'Comparatif honnête de 5 marques sans abonnement (Swiipx, Reputaz, Coollet, Fivvy, Cogimix). Économisez 500-1500 € sur 5 ans.',
    category: 'Comparatif',
    date: '11 mai 2026',
    dateIso: '2026-05-11',
    readTime: '10 min',
    slug: 'plaque-avis-google-sans-abonnement',  },
  {
    id: 8,
    title: 'Plaque NFC restaurant : collecter +200 avis Google en 2026',
    excerpt: 'Restaurant : guide complet pour collecter +200 avis Google par an avec une plaque NFC. Placements, scripts serveur, ROI, 3 études de cas.',
    category: 'Secteur',
    date: '11 mai 2026',
    dateIso: '2026-05-11',
    readTime: '11 min',
    slug: 'plaque-nfc-restaurant',  },
  {
    id: 7,
    title: 'Plaque NFC vs QR Code pour les avis Google : comparatif 2026',
    excerpt: 'Plaque NFC ou QR code pour vos avis Google ? Comparatif détaillé 2026 sur 8 critères : taux de conversion (35-45 % vs 8-12 %), prix, ROI et études de cas.',
    category: 'Comparatif',
    date: '10 mai 2026',
    dateIso: '2026-05-10',
    readTime: '9 min',
    slug: 'plaque-nfc-vs-qr-code-avis-google',
  },
  {
    id: 0,
    title: 'Comment doubler vos avis Google en 30 jours',
    excerpt: "La méthode complète en 4 phases pour exploser vos avis. Cas pratique : +740% d'avis en 1 mois.",
    category: 'Stratégie',
    date: '19 janvier 2026',
    dateIso: '2026-01-19',
    readTime: '10 min',
    slug: 'doubler-avis-google-30-jours',
  },
  {
    id: 1,
    title: "Comment obtenir plus d'avis Google en 2025 : le guide complet",
    excerpt: "10 méthodes testées pour multiplier vos avis Google (+250% en 3 mois). Scripts prêts à l'emploi.",
    category: 'Stratégie',
    date: '15 janvier 2026',
    dateIso: '2026-01-15',
    readTime: '7 min',
    slug: 'obtenir-plus-avis-google',
  },
  {
    id: 2,
    title: 'Pourquoi les avis clients influencent votre business',
    excerpt: 'Guide pilier 2026 : impact des avis sur le CA, conversion, SEO local, parcours client, psychologie, gestion des avis négatifs, stratégies par secteur, ROI et FAQ complète.',
    category: 'Business',
    date: '8 novembre 2025',
    dateIso: '2025-11-08',
    readTime: '12 min',
    slug: 'avis-clients-influencent-business',
  },
  {
    id: 3,
    title: '5 astuces pour booster votre visibilité locale',
    excerpt: 'Guide pilier 2026 : Google Business Profile, avis, citations NAP, pages locales, backlinks. Avec checklists, plan 30/60/90 jours, cas pratiques et FAQ pour dominer le pack local.',
    category: 'SEO Local',
    date: '5 novembre 2025',
    dateIso: '2025-11-05',
    readTime: '11 min',
    slug: 'booster-visibilite-locale',
  },
  {
    id: 4,
    title: 'NFC : la nouvelle arme pour vos avis clients',
    excerpt: 'Guide 2026 pour collecter plus d’avis Google avec une plaque NFC : fonctionnement, mise en place, placements par métier, scripts, erreurs à éviter, ROI et FAQ.',
    category: 'Technologie',
    date: '2 novembre 2025',
    dateIso: '2025-11-02',
    readTime: '8 min',
    slug: 'nfc-avis-clients',
  },
  {
    id: 5,
    title: 'SEO Local : comment grimper en tête des recherches',
    excerpt: 'Méthode 2026 (très complète) pour gagner Google Maps : Google Business Profile, avis, pages locales, citations, schema, backlinks et plan d’action 30 jours. Avec templates et checklists.',
    category: 'SEO Local',
    date: '28 octobre 2025',
    dateIso: '2025-10-28',
    readTime: '10 min',
    slug: 'seo-local-recherches-google',
  },
  {
    id: 6,
    title: 'Les erreurs fatales à éviter avec vos avis Google',
    excerpt: "Acheter des faux avis, harceler vos clients, ignorer les avis négatifs... Ces erreurs critiques peuvent vous faire bannir de Google et détruire votre e-réputation. Guide complet 2026.",
    category: 'Bonnes pratiques',
    date: '25 octobre 2025',
    dateIso: '2025-10-25',
    readTime: '5 min',
    slug: 'erreurs-demander-avis',
  },
]

// Badge "Nouveau" calculé automatiquement sur les N articles les plus récents.
// Plus besoin d'ajouter/retirer le badge à la main quand on publie un article.
const NEW_BADGE_COUNT = 3
const recentSlugs = new Set(
  [...blogPosts]
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
    .slice(0, NEW_BADGE_COUNT)
    .map((post) => post.slug)
)

export default function BlogPage() {
  // CollectionPage + ItemList JSON-LD
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://swiipx.fr/blog#webpage',
    url: 'https://swiipx.fr/blog',
    name: 'Blog Swiipx',
    description: "Conseils, stratégies et astuces pour booster vos avis Google et développer votre visibilité locale.",
    inLanguage: 'fr-FR',
    isPartOf: { '@id': 'https://swiipx.fr/#website' },
    breadcrumb: { '@id': 'https://swiipx.fr/blog#breadcrumb' },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://swiipx.fr/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://swiipx.fr/blog#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://swiipx.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://swiipx.fr/blog' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-white">
        {/* Bannière haut */}
        <section className="bg-accent pt-32 pb-10 relative overflow-hidden">
          <div className="absolute left-6 top-32 hidden xl:block">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
              <Image src="/product-thumb-2.jpg" alt="Plaque NFC Swiipx" width={192} height={192} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute right-6 top-32 hidden xl:block">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
              <Image src="/product-thumb-1.jpg" alt="Plaque NFC Swiipx vue" width={192} height={192} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <p className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">
              Boostez vos avis Google<br />avec Swiipx dès aujourd&apos;hui
            </p>
            <p className="text-gray-800 mb-6 max-w-xl mx-auto">
              Commandez votre plaque avis Google NFC et commencez à collecter des avis en 10 secondes. Utilisé par 500+ entreprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#product"
                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
              >
                Découvrir nos plaques avis Google
              </Link>
              <Link
                href="/#how-it-works"
                className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>▶</span>
                <span>Comment ça marche ?</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Header blog */}
        <section className="border-b border-gray-200 py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">
              Blog
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Blog Swiipx
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Conseils, stratégies et astuces pour booster vos avis Google et développer votre visibilité locale
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
          </div>
        </section>

        {/* Grille articles */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="sr-only">Nos derniers articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                      {recentSlugs.has(post.slug) && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Nouveau
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.dateIso}>{post.date}</time>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <span className="flex items-center space-x-1 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        <span>Lire</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <section className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center text-white mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Prêt à booster vos avis Google ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Commandez votre plaque Swiipx et commencez à collecter des avis en 10 secondes.
            </p>
            <Link
              href="/#product"
              className="inline-flex items-center px-8 py-4 bg-accent text-gray-900 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 shadow-lg"
            >
              Découvrir nos packs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </section>

          {/* Newsletter */}
          <section className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-200">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Restez informé des dernières actualités
              </h3>
              <p className="text-gray-600 mb-6">
                Recevez nos meilleurs conseils pour développer votre e-réputation.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  aria-label="Adresse email pour la newsletter"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none bg-white"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 whitespace-nowrap"
                >
                  S&apos;abonner
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4">
                Pas de spam, uniquement du contenu de qualité. Désabonnement en 1 clic.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
