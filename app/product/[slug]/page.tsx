'use client'

import { motion } from 'framer-motion'
import { Star, Check, ArrowLeft, ShoppingCart, Truck, Shield, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useCart, CartItem } from '../../store/cart'

const slugToCartId: Record<string, CartItem['id']> = {
  starter: 'plaque1',
  business: 'plaque2',
  pro: 'plaque5',
}

// Mock product data - would come from a database in production
const products = {
  'starter': {
    id: 1,
    name: 'Pack Starter — 1 Plaque Avis Google NFC',
    slug: 'starter',
    plaques: 1,
    price: 39.90,
    originalPrice: null,
    description: 'Parfait pour débuter et tester la puissance du NFC pour votre entreprise.',
    features: [
      '1 plaque NFC premium',
      'QR code de secours intégré',
      'Livraison gratuite en France',
      'Support par email',
      'Garantie 2 ans',
      'Configuration incluse',
    ],
    technicalSpecs: [
      { label: 'Dimensions', value: '85 x 55 mm' },
      { label: 'Matériau', value: 'PVC premium résistant' },
      { label: 'Technologie', value: 'NFC Type 2 (NTAG213)' },
      { label: 'Compatibilité', value: 'Tous smartphones récents' },
      { label: 'Résistance', value: 'Eau, UV, températures extrêmes' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ],
  },
  'business': {
    id: 2,
    name: 'Pack Business — 2 Plaques Avis Google NFC',
    slug: 'business',
    plaques: 2,
    price: 59.90,
    originalPrice: 79.90,
    popular: true,
    description: 'Le choix idéal pour les professionnels qui veulent multiplier les points de contact.',
    features: [
      '2 plaques NFC premium',
      'QR code de secours intégré',
      'Livraison gratuite en France',
      'Support prioritaire',
      'Garantie 2 ans',
      'Configuration incluse',
      'Personnalisation gratuite (logo + couleurs)',
    ],
    technicalSpecs: [
      { label: 'Dimensions', value: '85 x 55 mm' },
      { label: 'Matériau', value: 'PVC premium résistant' },
      { label: 'Technologie', value: 'NFC Type 2 (NTAG213)' },
      { label: 'Compatibilité', value: 'Tous smartphones récents' },
      { label: 'Résistance', value: 'Eau, UV, températures extrêmes' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ],
  },
  'pro': {
    id: 3,
    name: 'Pack Pro — 5 Plaques Avis Google NFC',
    slug: 'pro',
    plaques: 5,
    price: 89.90,
    originalPrice: 149.90,
    description: 'La solution complète pour les entreprises avec plusieurs emplacements stratégiques.',
    features: [
      '5 plaques NFC premium',
      'QR code de secours intégré',
      'Livraison express gratuite',
      'Support prioritaire 24/7',
      'Garantie 3 ans',
      'Configuration incluse',
      'Personnalisation gratuite (logo + couleurs)',
      'Tableau de bord analytics',
      'Liens personnalisables par plaque',
    ],
    technicalSpecs: [
      { label: 'Dimensions', value: '85 x 55 mm' },
      { label: 'Matériau', value: 'PVC premium résistant' },
      { label: 'Technologie', value: 'NFC Type 2 (NTAG213)' },
      { label: 'Compatibilité', value: 'Tous smartphones récents' },
      { label: 'Résistance', value: 'Eau, UV, températures extrêmes' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ],
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const product = products[slug as keyof typeof products]
  
  const { addItem, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
          <button
            onClick={() => router.push('/')}
            className="text-primary hover:underline"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const cartId = slugToCartId[slug]
    if (!cartId) return
    for (let i = 0; i < quantity; i++) {
      addItem(cartId)
    }
    toast.success(`${quantity}x ${product.name} ajouté au panier ! 🎉`)
    openCart()
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux produits</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Popular Badge */}
            {'popular' in product && product.popular && (
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 bg-accent text-gray-900 rounded-full font-bold text-sm">
                  ⭐ Le plus populaire
                </span>
              </div>
            )}

            {/* Main Image */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 mb-4 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-48 h-48 bg-primary rounded-full flex items-center justify-center shadow-2xl mb-6 mx-auto">
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-800">{product.name}</p>
                <p className="text-gray-600">{product.plaques} plaque{product.plaques > 1 ? 's' : ''} NFC</p>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-xl hover:ring-2 hover:ring-primary transition-all ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-gray-600">4.9/5 (500 avis)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold text-gray-900">
                  {product.price}€
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    {product.originalPrice}€
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-semibold mt-2">
                  Économisez {product.originalPrice - product.price}€ !
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantité
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Réduire la quantité"
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors font-bold text-xl"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Augmenter la quantité"
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-primary text-white rounded-xl font-bold text-lg shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 mb-4"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Ajouter au panier - {product.price * quantity}€</span>
            </button>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 text-gray-700">
                <Truck className="w-5 h-5 text-green-500" />
                <span className="text-sm">Livraison 2-3 jours</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm">Garantie {product.features.find(f => f.includes('Garantie'))}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <RefreshCw className="w-5 h-5 text-green-500" />
                <span className="text-sm">Retour 30 jours</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Paiement sécurisé</span>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">
                Inclus dans votre pack :
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specs */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">
                Spécifications techniques
              </h2>
              <dl className="space-y-3">
                {product.technicalSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <dt className="text-gray-600">{spec.label}</dt>
                    <dd className="font-semibold text-gray-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

