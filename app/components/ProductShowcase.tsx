'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Check, ChevronDown, ChevronLeft, ChevronRight, Gift, MapPin, Package, Shield, Truck } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useCart } from '../store/cart'
import { useCompanyStore } from '../store/company'
import BusinessAutocomplete, { BusinessInfo } from './BusinessAutocomplete'

// Product packs data (matching cart store IDs)
const productPacks = [
  {
    id: 'plaque1' as const,
    quantity: 1,
    name: '1 Plaque',
    price: 39.90,
    priceHT: '39,90€',
    badge: null,
  },
  {
    id: 'plaque2' as const,
    quantity: 2,
    name: '2 Plaques',
    price: 59.90,
    priceHT: '59,90€',
    badge: '+ Guide Gratuit 🎁',
    popular: true,
  },
  {
    id: 'plaque5' as const,
    quantity: 5,
    name: '5 Plaques',
    price: 89.90,
    priceHT: '89,90€',
    badge: '+ Guide & Cadeau Mystère 🎁',
  },
]

const productBenefits = [
  { icon: '🇫🇷', text: 'Entreprise Française' },
  { icon: '⚡', text: 'Collectez des avis en 3 secondes !' },
  { icon: '💳', text: 'Paiement en une fois, sans abonnement' },
  { icon: '🚀', text: 'Soyez 1er dans les recherches Google' },
]

export default function ProductShowcase() {
  const { addItem, openCart } = useCart()
  const { company } = useCompanyStore()
  const [selectedPack, setSelectedPack] = useState<typeof productPacks[0]['id']>('plaque2') // Default to pack 2 (most popular)
  const [selectedImage, setSelectedImage] = useState(0)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [business, setBusiness] = useState<BusinessInfo | null>(null)

  // Restaurer l'entreprise depuis le store Zustand au montage
  useEffect(() => {
    if (company && company.placeId && !business) {
      setBusiness({
        name: company.name,
        address: company.address,
        place_id: company.placeId,
        phone: company.phone,
        lat: company.lat,
        lng: company.lng,
      })
    }
  }, [company])

  // Product images - Chaque miniature a sa propre grande image
  const productImages = [
    { id: 0, src: '/product-main.jpg', alt: 'Plaque NFC Swiipx', mainSrc: '/product-main.jpg' },
    { id: 1, src: '/product-thumb-1.png', alt: 'Plaque NFC principale', mainSrc: '/product-thumb-1.png' },
    { id: 2, src: '/product-thumb-2.jpg', alt: 'Plaque NFC vue de côté', mainSrc: '/product-thumb-2.jpg' },
    { id: 3, src: '/product-thumb-3.jpg', alt: 'Plaque NFC en utilisation', mainSrc: '/product-thumb-3.jpg' },
    { id: 4, src: '/product-thumb-4.jpg', alt: 'Pack complet', mainSrc: '/product-thumb-4.jpg' },
  ]

  const handleAddToCart = () => {
    // Vérifier si l'entreprise est sélectionnée
    if (!business || !business.place_id) {
      toast.error("⚠️ Veuillez sélectionner votre entreprise avant d'ajouter au panier")
      return
    }

    const selectedProduct = productPacks.find(p => p.id === selectedPack)
    if (selectedProduct) {
      addItem(selectedProduct.id, business)
      toast.success(`${selectedProduct.name} ajouté au panier ! 🎉`)
      setTimeout(() => {
        openCart()
      }, 500)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Collapsible sections
  const infoSections = [
    {
      id: 'how-it-works',
      title: 'Comment ça marche',
      icon: Package,
      content: 'Scannez simplement la plaque NFC avec votre smartphone pour rediriger instantanément vos clients vers votre page d\'avis Google. Aucune application nécessaire, compatible avec tous les smartphones récents.',
    },
    {
      id: 'delivery',
      title: 'Livraison',
      icon: Truck,
      content: 'Livraison gratuite en France métropolitaine sous 2-3 jours ouvrés. Vous recevrez un numéro de suivi par email dès l\'expédition de votre commande.',
    },
    {
      id: 'guarantee',
      title: 'Garantie & Retours',
      icon: Shield,
      content: 'Garantie produit 2 ans contre tout défaut de fabrication. Support client prioritaire inclus. Guide d\'utilisation et templates de scripts offerts.',
    },
  ]

  return (
    <section id="product" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT COLUMN - Product Images (Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 lg:sticky lg:top-24"
          >
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              
              {/* Product Image */}
              <div className="relative z-10 w-full h-full">
                <Image
                  src={productImages[selectedImage]?.mainSrc || '/product-main.jpg'}
                  alt={productImages[selectedImage]?.alt || 'Plaque NFC Swiipx'}
                  width={800}
                  height={800}
                  className="w-full h-full object-contain p-8"
                  priority={selectedImage === 0}
                />
              </div>

              {/* Navigation Arrows - Subtle & Elegant */}
              <button
                onClick={() => setSelectedImage(prev => prev === 0 ? productImages.length - 1 : prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedImage(prev => prev === productImages.length - 1 ? 0 : prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Counter Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedImage === index 
                        ? 'bg-primary w-4' 
                        : 'bg-gray-400/50 hover:bg-gray-500'
                    }`}
                    aria-label={`Image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-20">
                BLACK MONTH
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={img.id}
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

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-medium">Fabriqué en France</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Garantie 2 ans</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-medium">Livraison gratuite</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Plaque Avis Google
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Démarrez votre collecte d&apos;avis dès aujourd&apos;hui avec notre méthode testée sur 500+ entreprises !
              </p>
            </div>

            {/* Reviews / Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-medium">4.9/5 (500+ avis)</span>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 bg-blue-50 rounded-xl p-6">
              {productBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    {benefit.icon} {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Pack Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Choisissez votre pack</h3>
              
              {productPacks.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPack(pack.id)}
                  className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPack === pack.id
                      ? 'border-primary bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Radio Button */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedPack === pack.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedPack === pack.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>

                      {/* Pack Info */}
                      <div>
                        <p className="font-bold text-gray-900">{pack.name}</p>
                        {pack.badge && (
                          <p className="text-sm text-green-600 font-medium">{pack.badge}</p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{pack.priceHT}</p>
                    </div>
                  </div>

                  {/* Popular Badge */}
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-bold text-xs shadow-lg">
                        LE PLUS POPULAIRE
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Business Selection */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  🏢 Sélectionnez votre entreprise
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Recherchez votre établissement pour personnaliser votre plaque NFC
                </p>
              </div>
              
              <BusinessAutocomplete 
                onSelect={(businessData) => {
                  setBusiness(businessData)
                }}
                placeholder="Tapez le nom de votre entreprise ici.."
              />
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!business || !business.place_id}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                  business && business.place_id
                    ? 'bg-primary text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {business && business.place_id ? 'Ajouter au panier' : '🔒 Sélectionnez votre entreprise'}
              </button>

              {/* Stock Warning */}
              <div className="flex items-center justify-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="font-semibold text-red-600">Stock limité — BLACK MONTH</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center justify-center space-x-4 py-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Paiement sécurisé</span>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">CB</div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">💳</div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">🔒</div>
              </div>
            </div>

            {/* Collapsible Info Sections */}
            <div className="space-y-2 border-t border-gray-200 pt-6">
              {infoSections.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-gray-900">{section.title}</span>
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
            </div>

            {/* Additional Trust Signals */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 space-y-3">
              <p className="font-bold text-gray-900 flex items-center space-x-2">
                <Gift className="w-5 h-5 text-primary" />
                <span>Offre spéciale BLACK MONTH</span>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

