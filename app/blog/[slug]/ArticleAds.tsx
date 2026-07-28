'use client'

import { ChevronRight, Target } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface RelatedArticle {
  slug: string
  label: string
}

/**
 * Colonne de droite : une seule carte visible a la fois, selon l'avancement
 * dans l'article.
 *
 * Le composant cible l'article via [data-article] plutot que par une ref :
 * l'article est rendu par le Server Component parent, une ref React ne peut
 * donc pas traverser la frontiere.
 */
export default function ArticleAds({ related }: { related: RelatedArticle[] }) {
  const [currentAd, setCurrentAd] = useState(-1)

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('[data-article]')
      if (!article) return

      const rect = article.getBoundingClientRect()
      const scrolledInArticle = -rect.top + window.innerHeight * 0.3
      const progress = Math.max(0, Math.min(1, scrolledInArticle / rect.height))

      if (progress < 0.08) setCurrentAd(-1)
      else if (progress < 0.38) setCurrentAd(0)
      else if (progress < 0.62) setCurrentAd(1)
      else setCurrentAd(2)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cardClass = (index: number) =>
    `transition-all duration-500 ease-out ${
      currentAd === index
        ? 'relative opacity-100 translate-y-0 scale-100'
        : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none translate-y-4 scale-95'
    }`

  return (
    <div className="relative">
      {/* Ad 0: Swiipx */}
      <div className={cardClass(0)}>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">
            Sponsorisé
          </div>
          <h3 className="font-bold text-lg mb-2">La plaque NFC pour chaque commerce.</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Livrée déjà programmée. Aucune application à installer.
          </p>
          <Link
            href="/#product"
            className="block w-full py-3 bg-accent text-gray-900 text-center font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm"
          >
            Commander maintenant
          </Link>
        </div>
      </div>

      {/* Ad 1: Partenaire */}
      <div className={cardClass(1)}>
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">
            Partenaire
          </div>
          <div className="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
            <Target className="w-12 h-12 text-indigo-400" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Besoin d&apos;un site web pro&nbsp;?</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Nos partenaires créent votre site vitrine ou e-commerce optimisé SEO.
          </p>
          <a
            href="https://skyaksa.fr"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block w-full py-3 bg-indigo-600 text-white text-center font-bold rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            Demander un devis gratuit
          </a>
        </div>
      </div>

      {/* Ad 2: Articles liés */}
      <div className={cardClass(2)}>
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">📚 Guides gratuits Swiipx</h3>
          <ul className="space-y-3">
            {related.map((relArticle) => (
              <li key={relArticle.slug}>
                <Link
                  href={`/blog/${relArticle.slug}`}
                  className="flex items-start space-x-2 text-sm text-gray-700 hover:text-primary transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  <span>{relArticle.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
