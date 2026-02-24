'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../store/cart'

export default function ProductSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { addItem, openCart } = useCart()

  const packs = [
    {
      id: 'plaque1' as const,
      name: 'Starter',
      plaques: 1,
      price: 39.90,
      popular: false,
      features: [
        '1 plaque NFC premium',
        'QR code inclus',
        'Livraison gratuite',
        'Support par email',
        'Garantie 2 ans',
      ],
    },
    {
      id: 'plaque2' as const,
      name: 'Business',
      plaques: 2,
      price: 59.90,
      popular: true,
      discount: '20%',
      features: [
        '2 plaques NFC premium',
        'QR code inclus',
        'Livraison gratuite',
        'Support prioritaire',
        'Garantie 2 ans',
        'Personnalisation gratuite',
      ],
    },
    {
      id: 'plaque5' as const,
      name: 'Pro',
      plaques: 5,
      price: 89.90,
      popular: false,
      discount: '40%',
      features: [
        '5 plaques NFC premium',
        'QR code inclus',
        'Livraison express gratuite',
        'Support prioritaire 24/7',
        'Garantie 3 ans',
        'Personnalisation gratuite',
        'Tableaux de bord analytics',
      ],
    },
  ]

  const handleAddToCart = (pack: typeof packs[0]) => {
    addItem(pack.id)
    toast.success(`${pack.name} ajouté au panier ! 🎉`)
    setTimeout(() => {
      openCart()
    }, 500)
  }

  return (
    <section id="product" className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choisissez votre pack
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Un investissement unique pour booster votre réputation en ligne
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative"
            >
              {/* Popular Badge */}
              {pack.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-accent to-yellow-500 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Le plus populaire</span>
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative bg-white rounded-3xl p-8 h-full flex flex-col transition-all duration-300 ${
                  pack.popular
                    ? 'border-4 border-primary shadow-2xl scale-105'
                    : 'border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:scale-105'
                }`}
              >
                {/* Discount Badge */}
                {pack.discount && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                    Économisez {pack.discount}
                  </div>
                )}

                {/* Pack Name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pack.name}
                  </h3>
                  <p className="text-gray-600">
                    {pack.plaques} plaque{pack.plaques > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      {pack.price}€
                    </span>
                    <span className="text-gray-600 ml-2">/ paiement unique</span>
                  </div>
                  {pack.discount && (
                    <p className="text-sm text-gray-500 mt-2 line-through">
                      {pack.plaques === 2 ? '98€' : '245€'} au lieu
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {pack.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleAddToCart(pack)}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                    pack.popular
                      ? 'bg-primary text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Ajouter au panier
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">Paiement sécurisé</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">Livraison suivie</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">Support 7j/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

