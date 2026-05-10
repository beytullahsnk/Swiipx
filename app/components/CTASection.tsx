'use client'

import { ArrowRight, Truck, Shield, RotateCcw, Star } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-primary to-blue-800 relative">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social proof stars */}
        <div className="flex justify-center items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
          ))}
          <span className="text-white/80 text-sm ml-2 font-medium">4,9/5 — 500+ clients satisfaits</span>
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
          <a
            href="/#product"
            className="group px-10 py-5 bg-accent text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:bg-yellow-300 transition-colors flex items-center space-x-3 whitespace-nowrap"
          >
            <span>Commander à 39,90 €</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/#how-it-works"
            className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
          >
            Voir la démo
          </a>
        </div>

        {/* Trust signals — variés (icônes différentes, pas de checkmark spam) */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-blue-100">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium text-sm">Livraison offerte</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium text-sm">Garantie 2 ans</span>
          </div>
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium text-sm">Satisfait ou remboursé</span>
          </div>
        </div>

        {/* Internal link to blog for SEO authority flow */}
        <p className="mt-8 text-blue-200/80 text-sm">
          Notre{' '}
          <a href="/blog/doubler-avis-google-30-jours" className="text-white underline hover:text-accent transition-colors font-medium">
            guide pour doubler vos avis Google en 30 jours
          </a>
          {' · '}
          <a href="/blog/nfc-avis-clients" className="text-white underline hover:text-accent transition-colors font-medium">
            comment fonctionne le NFC
          </a>
        </p>
      </div>
    </section>
  )
}

