'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, Star, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      icon: Smartphone,
      title: 'Scannez la plaque',
      description: 'Vos clients scannent la plaque NFC avec leur téléphone ou utilisent le QR code. Aucune application nécessaire.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Star,
      title: 'Laissez un avis en 10s',
      description: 'Ils sont redirigés directement vers votre page Google. Un simple clic pour laisser leurs étoiles.',
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      icon: TrendingUp,
      title: 'Gagnez en visibilité',
      description: 'Plus d\'avis = meilleur référencement local. Attirez plus de clients grâce à votre réputation.',
      color: 'from-green-500 to-green-600',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus ultra-simple en 3 étapes pour transformer vos clients en ambassadeurs
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2">
                    <svg
                      className="w-12 lg:w-16 h-6 text-primary/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="/#product"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Voir les packs disponibles
          </a>
        </motion.div>
      </div>
    </section>
  )
}

