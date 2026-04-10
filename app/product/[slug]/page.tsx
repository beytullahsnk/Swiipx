'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Check, ShoppingCart, Truck, Shield,
  ChevronLeft, ChevronRight, ChevronDown, Package, MapPin, Gift, Minus, Plus
} from 'lucide-react'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useCart, CartItem } from '../../store/cart'

const slugToCartId: Record<string, CartItem['id']> = {
  starter: 'plaque1',
  business: 'plaque2',
  pro: 'plaque5',
}

const products = {
  'starter': {
    id: 1,
    name: 'Pack Starter — 1 Plaque Avis Google NFC',
    slug: 'starter',
    plaques: 1,
    price: 39.90,
    originalPrice: null as number | null,
    description: 'La plaque avis Google NFC idéale pour débuter. Collez-la à l\'accueil ou au comptoir : vos clients scannent et laissent un avis Google en 10 secondes, sans application. Plaque en acrylique premium 120×120 mm, garantie 2 ans.',
    ratingValue: 4.8,
    reviewCount: 247,
    guaranteeYears: 2,
    features: [
      '1 plaque NFC premium',
      'QR code de secours intégré',
      'Livraison gratuite en France',
      'Support par email',
      'Garantie 2 ans',
      'Configuration incluse',
    ],
    technicalSpecs: [
      { label: 'Dimensions', value: '120 x 120 x 3 mm' },
      { label: 'Matériau', value: 'Acrylique premium' },
      { label: 'Technologie', value: 'NFC NTAG215' },
      { label: 'Compatibilité', value: 'Tous smartphones récents' },
      { label: 'Résistance', value: 'Eau, UV, rayures' },
    ],
    images: [
      { src: '/products/plaque1.jpg', alt: 'Pack Starter — 1 Plaque NFC Swiipx' },
      { src: '/product-main.jpg', alt: 'Plaque avis Google NFC Swiipx' },
      { src: '/product-thumb-1.jpg', alt: 'Plaque NFC — vue principale' },
      { src: '/product-thumb-2.jpg', alt: 'Plaque NFC — vue de côté' },
      { src: '/product-thumb-3.jpg', alt: 'Plaque NFC — en utilisation' },
    ],
  },
  'business': {
    id: 2,
    name: 'Pack Business — 2 Plaques Avis Google NFC',
    slug: 'business',
    plaques: 2,
    price: 59.90,
    originalPrice: 79.90 as number | null,
    popular: true,
    description: 'Le pack professionnel avec 2 plaques NFC avis Google pour couvrir deux emplacements stratégiques. Doublez vos points de contact et multipliez vos avis Google naturellement. Acrylique premium, NTAG215, garanti 2 ans.',
    ratingValue: 4.9,
    reviewCount: 389,
    guaranteeYears: 2,
    features: [
      '2 plaques NFC premium',
      'QR code de secours intégré',
      'Livraison gratuite en France',
      'Support prioritaire',
      'Garantie 2 ans',
      'Configuration incluse',
    ],
    technicalSpecs: [
      { label: 'Dimensions', value: '120 x 120 x 3 mm' },
      { label: 'Matériau', value: 'Acrylique premium' },
      { label: 'Technologie', value: 'NFC NTAG215' },
      { label: 'Compatibilité', value: 'Tous smartphones récents' },
      { label: 'Résistance', value: 'Eau, UV, rayures' },
    ],
    images: [
      { src: '/products/plaque2.jpg', alt: 'Pack Business — 2 Plaques NFC Swiipx' },
      { src: '/product-main.jpg', alt: 'Plaque avis Google NFC Swiipx' },
      { src: '/product-thumb-1.jpg', alt: 'Plaque NFC — vue principale' },
      { src: '/product-thumb-2.jpg', alt: 'Plaque NFC — vue de côté' },
      { src: '/product-thumb-4.jpg', alt: 'Pack complet plaques avis Google Swiipx' },
    ],
  },
  'pro': {
    id: 3,
    name: 'Pack Pro — 5 Plaques Avis Google NFC',
    slug: 'pro',
    plaques: 5,
    price: 89.90,
    originalPrice: 149.90 as number | null,
    description: 'La solution complète avec 5 plaques NFC avis Google pour équiper tous vos emplacements. Idéal pour les entreprises multi-sites : tableau de bord analytics, liens personnalisables, support 24/7. Acrylique premium, garanti 2 ans.',
    ratingValue: 5.0,
    reviewCount: 156,
    guaranteeYears: 3,
    features: [
      '5 plaques NFC premium',
      'QR code de secours intégré',
      'Livraison express gratuite',
      'Support prioritaire 24/7',
      'Garantie 2 ans',
      'Configuration incluse',
      'Tableau de bord analytics',
      'Liens personnalisables par plaque',
    ],
    technicalSpecs: [
      { label: 'Dimensions', value: '120 x 120 x 3 mm' },
      { label: 'Matériau', value: 'Acrylique premium' },
      { label: 'Technologie', value: 'NFC NTAG215' },
      { label: 'Compatibilité', value: 'Tous smartphones récents' },
      { label: 'Résistance', value: 'Eau, UV, rayures' },
    ],
    images: [
      { src: '/products/plaque5.jpg', alt: 'Pack Pro — 5 Plaques NFC Swiipx' },
      { src: '/product-main.jpg', alt: 'Plaque avis Google NFC Swiipx' },
      { src: '/product-thumb-1.jpg', alt: 'Plaque NFC — vue principale' },
      { src: '/product-thumb-3.jpg', alt: 'Plaque NFC — en utilisation' },
      { src: '/product-thumb-4.jpg', alt: 'Pack complet plaques avis Google Swiipx' },
    ],
  },
}

function getInfoSections(slug: string) {
  const guaranteeYears = slug === 'pro' ? 3 : 2
  return [
    {
      id: 'how-it-works',
      title: 'Comment fonctionne la plaque NFC ?',
      icon: Package,
      content: `Vos clients approchent simplement leur smartphone de la plaque NFC Swiipx. Ils sont automatiquement redirigés vers votre page d'avis Google pour laisser un avis en quelques secondes. Aucune application à installer. Le QR code de secours intégré assure la compatibilité avec tous les smartphones.`,
    },
    {
      id: 'delivery',
      title: 'Livraison & Expédition',
      icon: Truck,
      content: slug === 'pro'
        ? 'Livraison express gratuite en France métropolitaine sous 2-3 jours ouvrés. Expédition sous 24h après commande. Numéro de suivi envoyé par email. Livraison en Corse et DOM-TOM sous 5-7 jours ouvrés.'
        : 'Livraison gratuite en France métropolitaine sous 2-3 jours ouvrés. Expédition sous 24h après commande. Numéro de suivi envoyé par email dès l\'expédition. Livraison en Corse et DOM-TOM disponible.',
    },
    {
      id: 'guarantee',
      title: 'Garantie & Retours',
      icon: Shield,
      content: `Garantie fabricant ${guaranteeYears} ans contre tout défaut de fabrication. Remplacement gratuit en cas de défaillance technique. Droit de rétractation de 14 jours (produit non utilisé, non collé, emballage intact). Support client réactif par email.`,
    },
  ]
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const product = products[slug as keyof typeof products]

  const { addItem, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center text-sm text-gray-500 mb-8"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-1.5 flex-shrink-0" />
          <Link href="/#product" className="hover:text-primary transition-colors">Nos plaques</Link>
          <ChevronRight className="w-4 h-4 mx-1.5 flex-shrink-0" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ══════════════════════════════════════════════ */}
          {/* LEFT COLUMN — Image Gallery (sticky desktop)  */}
          {/* ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 lg:sticky lg:top-28"
          >
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden aspect-square group">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />

              {/* Product Image with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full h-full"
                >
                  <Image
                    src={product.images[selectedImage]?.src || '/product-main.jpg'}
                    alt={product.images[selectedImage]?.alt || product.name}
                    width={800}
                    height={800}
                    className="w-full h-full object-contain p-6 sm:p-8"
                    priority={selectedImage === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows (hover) */}
              <button
                onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedImage === index
                        ? 'bg-primary w-4'
                        : 'bg-gray-400/50 hover:bg-gray-500'
                    }`}
                    aria-label={product.images[index]?.alt || `Image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Badges */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-20">
                LIVRAISON OFFERTE
              </div>
              {'popular' in product && product.popular && (
                <div className="absolute top-4 left-4 bg-accent text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg z-20">
                  ⭐ POPULAIRE
                </div>
              )}
              {discountPercent && (
                <div className="absolute top-16 right-4 bg-green-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg z-20">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Gallery — 5 columns */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    selectedImage === index
                      ? 'ring-2 ring-primary shadow-lg scale-105 border-primary'
                      : 'border-gray-200 hover:border-gray-300 hover:ring-2 hover:ring-gray-200'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Trust Badges below thumbnails */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-medium">Fabriqué en France</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Garantie {product.guaranteeYears} ans</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-medium">Livraison gratuite</span>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════ */}
          {/* RIGHT COLUMN — Product Details               */}
          {/* ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title + Description */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{product.ratingValue}/5 ({product.reviewCount}+ avis)</span>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                  {product.price.toFixed(2).replace('.', ',')}€
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice.toFixed(2).replace('.', ',')}€
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-semibold mt-1">
                  Économisez {(product.originalPrice - product.price).toFixed(2).replace('.', ',')}€ !
                </p>
              )}
            </div>

            {/* Benefits */}
            <div className="space-y-3 bg-blue-50 rounded-xl p-5">
              {[
                { emoji: '🇫🇷', text: 'Entreprise Française' },
                { emoji: '⚡', text: 'Collectez des avis en 3 secondes !' },
                { emoji: '💳', text: 'Paiement en une fois, sans abonnement' },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-base font-medium text-gray-900">
                    {benefit.emoji} {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantité
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Réduire la quantité"
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-blue-50 transition-all"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Augmenter la quantité"
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-blue-50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Ajouter ${quantity} ${product.name} au panier`}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Ajouter au panier — {(product.price * quantity).toFixed(2).replace('.', ',')}€</span>
            </motion.button>

            {/* Stock Warning */}
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="font-semibold text-red-600">Stock limité — Offre du moment</span>
            </div>

            {/* Included Features */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">
                Inclus dans votre pack :
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Collapsible Info Sections */}
            <div className="space-y-2 border-t border-gray-200 pt-6">
              {getInfoSections(slug).map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={expandedSection === section.id}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-gray-900 text-base">{section.title}</h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        expandedSection === section.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSection === section.id ? 'auto' : 0,
                      opacity: expandedSection === section.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                      {section.content}
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Technical Specs — collapsible */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('specs')}
                  aria-expanded={expandedSection === 'specs'}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-gray-900 text-base">Spécifications techniques</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      expandedSection === 'specs' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedSection === 'specs' ? 'auto' : 0,
                    opacity: expandedSection === 'specs' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
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

            {/* Special Offer Box */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 space-y-3">
              <p className="font-bold text-gray-900 flex items-center space-x-2">
                <Gift className="w-5 h-5 text-primary" />
                <span>Offre spéciale livraison offerte</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Guide complet offert (valeur 29€)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Configuration personnalisée incluse</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Support prioritaire 7j/7</span>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center justify-center space-x-4 py-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">Paiement sécurisé</span>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">CB</div>
                <div className="w-10 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">Visa</div>
                <div className="w-10 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">MC</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
