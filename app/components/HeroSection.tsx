'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import ClientLogos from './ClientLogos'

export default function HeroSection() {
  return (
    <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-24 bg-white overflow-hidden">
      {/* Filet accent discret en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Layout asymétrique : texte 7/12, image 5/12 décalée */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Colonne texte (7/12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left"
          >
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
              Plaque NFC · Avis Google · Sans application
            </p>

            {/* Headline — positionnement : prête à l'emploi (vs concurrents à app) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.05] tracking-tight">
              La plaque avis Google{' '}
              <span className="text-primary">prête à l&apos;emploi</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              Elle arrive <span className="font-semibold text-gray-900">déjà programmée</span> avec
              le lien d&apos;avis de votre établissement. Aucune application à installer,
              aucun code à activer : vous la collez, vos clients approchent leur téléphone,
              l&apos;avis se rédige en 10 secondes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/#product"
                className="group inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white rounded-xl font-semibold text-base shadow-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <span>Commander dès 35,88€</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/#how-it-works"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-gray-900 rounded-xl font-semibold text-base border border-gray-200 hover:border-gray-400 transition-colors"
              >
                Comment ça marche
              </a>
            </div>

            {/* Preuve sociale : logos des clients qui nous les ont transmis,
                secteurs pour les autres. Aucun nom en clair, aucun compteur. */}
            <ClientLogos variante="compact" className="mt-10" />

            {/* Trust line discrète (pas de checkmarks répétés) */}
            <p className="mt-6 text-sm text-gray-500">
              Livraison 2-5 jours <span className="text-gray-300 mx-1.5">·</span>
              Garantie à vie <span className="text-gray-300 mx-1.5">·</span>
              Paiement unique sans abonnement
            </p>
          </motion.div>

          {/* Colonne image (5/12) — décalée verticalement, déborde un peu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 lg:translate-x-4 lg:-translate-y-4"
          >
            <div className="relative">
              {/* Image produit */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-10 aspect-square overflow-hidden">
                <Image
                  src="/hero-product.jpg"
                  alt="Plaque avis Google NFC Swiipx"
                  width={800}
                  height={800}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Stat flottante 1 — en haut à GAUCHE (rupture de symétrie) */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
                <p className="text-2xl sm:text-3xl font-bold text-primary leading-none">0 €</p>
                <p className="text-xs text-gray-500 mt-1">D&apos;abonnement</p>
              </div>

              {/* Stat flottante 2 — en bas à DROITE */}
              <div className="absolute -bottom-4 -right-4 bg-gray-900 rounded-xl shadow-lg px-4 py-3">
                <p className="text-2xl sm:text-3xl font-bold text-accent leading-none">10s</p>
                <p className="text-xs text-gray-400 mt-1">Pour un avis</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
