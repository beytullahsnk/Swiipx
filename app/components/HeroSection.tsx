'use client'

import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              La plaque avis Google qui{' '}
              <span className="text-primary">double vos avis 🚀</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Avec notre plaque avis Google NFC, vos clients laissent un avis en{' '}
              <span className="font-semibold text-primary">10 secondes</span>
              {' '}(vs 3-5 min sur Google). Ils scannent, c&apos;est tout. +200% d&apos;avis en 3 mois.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="/#product"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <span>Commander dès 39,90€</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/#how-it-works"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-primary whitespace-nowrap"
              >
                Comment ça marche ?
              </motion.a>
            </div>

            {/* Mini Testimonials - Social Proof Visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 space-y-3"
            >
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
                  ].map((avatar, i) => (
                    <Image
                      key={i}
                      src={avatar}
                      alt={`Client Swiipx satisfait ${i + 1}`}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="font-semibold text-gray-900">4.9/5</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-600">500+ entreprises satisfaites</span>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Livraison 2-3 jours</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Garantie 2 ans</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Sans abonnement</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              
              {/* Product Image */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex items-center justify-center aspect-square overflow-hidden">
                <Image
                  src="/hero-product.jpg"
                  alt="Plaque avis Google NFC Swiipx"
                  width={800}
                  height={800}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-6"
              >
                <p className="text-3xl sm:text-4xl font-bold text-primary">+200%</p>
                <p className="text-sm text-gray-600">Avis en moyenne</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 sm:p-6"
              >
                <p className="text-3xl sm:text-4xl font-bold text-accent">10s</p>
                <p className="text-sm text-gray-600">Pour laisser un avis</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

