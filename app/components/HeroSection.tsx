'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'

// 4 vraies photos clients (à placer dans /public/customers/)
// Pour l'instant fallback Unsplash en attendant la livraison des photos par l'utilisateur.
const customerAvatars = [
  '/customers/c1.jpg',
  '/customers/c2.jpg',
  '/customers/c3.jpg',
  '/customers/c4.jpg',
]
// Fallback temporaire (sera retiré une fois les photos clients livrées)
const fallbackAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
]

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
              Plaque NFC · Avis Google · Sans abonnement
            </p>

            {/* Main Headline (sans emoji) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.05] tracking-tight">
              La plaque avis Google qui{' '}
              <span className="text-primary">double vos avis</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              Vos clients laissent un avis en{' '}
              <span className="font-semibold text-gray-900">10 secondes</span>
              {' '}au lieu de 3-5 minutes. Ils approchent leur smartphone, c&apos;est tout. +200% d&apos;avis en moyenne sur 3 mois.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/#product"
                className="group inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white rounded-xl font-semibold text-base shadow-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <span>Commander dès 39,90€</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/#how-it-works"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-gray-900 rounded-xl font-semibold text-base border border-gray-200 hover:border-gray-400 transition-colors"
              >
                Comment ça marche
              </a>
            </div>

            {/* Social proof unique : avatars + rating + trust line en 1 bloc compact */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <div className="flex -space-x-2">
                {customerAvatars.map((src, i) => (
                  <Image
                    key={i}
                    src={fallbackAvatars[i]}
                    alt={`Client Swiipx satisfait ${i + 1}`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    data-real-src={src}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <div className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">4,9/5</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600">500+ entreprises</span>
              </div>
            </div>

            {/* Trust line discrète (pas de checkmarks répétés) */}
            <p className="mt-6 text-sm text-gray-500">
              Livraison 2-5 jours <span className="text-gray-300 mx-1.5">·</span>
              Garantie 2 ans <span className="text-gray-300 mx-1.5">·</span>
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
                <p className="text-2xl sm:text-3xl font-bold text-primary leading-none">+200%</p>
                <p className="text-xs text-gray-500 mt-1">Avis en moyenne</p>
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
