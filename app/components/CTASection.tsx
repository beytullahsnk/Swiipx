'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Star } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-primary via-blue-600 to-blue-800 relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Social proof stars */}
          <div className="flex justify-center items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/80 text-sm ml-2 font-medium">4.9/5 — 500+ clients satisfaits</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Vos concurrents collectent déjà<br className="hidden sm:block" /> plus d&apos;avis que vous
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
            Une plaque avis Google Swiipx = 3x plus d&apos;avis en 30 jours.
          </p>
          <p className="text-base text-blue-200/80 mb-10 max-w-xl mx-auto">
            Installation en 30 secondes. Aucun abonnement. Résultats dès la 1ère semaine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/#product"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-accent text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-3 whitespace-nowrap"
            >
              <span>Commander à 39,90 €</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/#how-it-works"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Voir la démo
            </motion.a>
          </div>

          {/* Urgency + Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-blue-100"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-sm">Livraison offerte</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-sm">Garantie 2 ans</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-sm">Satisfait ou remboursé</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-sm">Support 7j/7</span>
            </div>
          </motion.div>

          {/* Internal link to blog for SEO authority flow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-blue-200/70 text-sm"
          >
            📖 Découvrez notre{' '}
            <a href="/blog/doubler-avis-google-30-jours" className="text-white underline hover:text-accent transition-colors font-medium">
              guide pour doubler vos avis Google en 30 jours
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

