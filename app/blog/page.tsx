'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 0,
      title: 'Comment doubler vos avis Google en 30 jours',
      excerpt: 'La méthode complète en 4 phases pour exploser vos avis. Cas pratique : +740% d\'avis en 1 mois.',
      category: 'Stratégie',
      date: '19 janvier 2026',
      readTime: '10 min',
      slug: 'doubler-avis-google-30-jours',
      badge: 'Nouveau',
    },
    {
      id: 1,
      title: 'Comment obtenir plus d\'avis Google en 2025 : le guide complet',
      excerpt: '10 méthodes testées pour multiplier vos avis Google (+250% en 3 mois). Scripts prêts à l\'emploi.',
      category: 'Stratégie',
      date: '15 janvier 2026',
      readTime: '7 min',
      slug: 'obtenir-plus-avis-google',
    },
    {
      id: 2,
      title: 'Pourquoi les avis clients influencent votre business',
      excerpt: 'Guide pilier 2026 : impact des avis sur le CA, conversion, SEO local, parcours client, psychologie, gestion des avis négatifs, stratégies par secteur, ROI et FAQ complète.',
      category: 'Business',
      date: '8 novembre 2025',
      readTime: '12 min',
      slug: 'avis-clients-influencent-business',
    },
    {
      id: 3,
      title: '5 astuces pour booster votre visibilité locale',
      excerpt: 'Guide pilier 2026 : Google Business Profile, avis, citations NAP, pages locales, backlinks. Avec checklists, plan 30/60/90 jours, cas pratiques et FAQ pour dominer le pack local.',
      category: 'SEO Local',
      date: '5 novembre 2025',
      readTime: '11 min',
      slug: 'booster-visibilite-locale',
    },
    {
      id: 4,
      title: 'NFC : la nouvelle arme pour vos avis clients',
      excerpt: 'Guide 2026 pour collecter plus d’avis Google avec une plaque NFC : fonctionnement, mise en place, placements par métier, scripts, erreurs à éviter, ROI et FAQ.',
      category: 'Technologie',
      date: '2 novembre 2025',
      readTime: '8 min',
      slug: 'nfc-avis-clients',
    },
    {
      id: 5,
      title: 'SEO Local : comment grimper en tête des recherches',
      excerpt: 'Méthode 2026 (très complète) pour gagner Google Maps : Google Business Profile, avis, pages locales, citations, schema, backlinks et plan d’action 30 jours. Avec templates et checklists.',
      category: 'SEO Local',
      date: '28 octobre 2025',
      readTime: '10 min',
      slug: 'seo-local-recherches-google',
    },
    {
      id: 6,
      title: 'Les erreurs fatales à éviter avec vos avis Google',
      excerpt: 'Acheter des faux avis, harceler vos clients, ignorer les avis négatifs... Ces erreurs critiques peuvent vous faire bannir de Google et détruire votre e-réputation. Guide complet 2026.',
      category: 'Bonnes pratiques',
      date: '25 octobre 2025',
      readTime: '5 min',
      slug: 'erreurs-demander-avis',
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════
          BANNIÈRE PUB SWIIPX (haut de page)
          ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          HEADER BLOG
          ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          GRILLE D'ARTICLES
          ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="sr-only">Nos derniers articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => {
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                >
                  {/* Contenu */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                      {post.badge && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {post.badge}
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
                          <span>{post.date}</span>
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
                </motion.article>
              </Link>
            )
          })}
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
  )
}
