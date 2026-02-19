'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, AlertTriangle } from 'lucide-react'
import { useCart, formatPrice } from '../store/cart'
import { useCompanyStore } from '../store/company'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import CompanySelectedCard from '../components/CompanySelectedCard'

export default function CartPage() {
  const router = useRouter()
  const { items, setQty, removeItem, totalCents, clearCart, hasHydrated } = useCart()
  const { company } = useCompanyStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Handle checkout
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Votre panier est vide')
      return
    }

    // Vérifier qu'une entreprise est sélectionnée
    if (!company) {
      toast.error('⚠️ Veuillez sélectionner votre entreprise avant de commander')
      router.push('/')
      return
    }

    setIsCheckingOut(true)

    try {
      // Prepare cart data for Stripe (avec infos entreprise)
      const cartData = items.map((item) => ({
        id: item.id,
        qty: item.qty,
        businessInfo: item.businessInfo || {
          name: company?.name || '',
          address: company?.address || '',
          place_id: company?.placeId || '',
          phone: company?.phone || '',
          lat: company?.lat,
          lng: company?.lng,
        },
      }))

      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartData, company }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du paiement')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast.error(error?.message || 'Erreur lors du paiement. Veuillez réessayer.')
      setIsCheckingOut(false)
    }
  }

  // Afficher un loader tant que le store n'est pas hydraté (évite les erreurs SSR)
  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continuer mes achats</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Mon panier
          </h1>
        </motion.div>

        {/* Company Info */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            {company ? (
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">Entreprise sélectionnée</h3>
                <CompanySelectedCard />
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-900 text-lg mb-1">⚠️ Entreprise non sélectionnée</h3>
                    <p className="text-red-700 text-sm mb-3">
                      Vous devez sélectionner votre établissement avant de pouvoir commander.
                    </p>
                    <button
                      onClick={() => router.push('/')}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Retour à la page produit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {items.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-12 text-center"
          >
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-8">
              Découvrez nos plaques NFC pour booster vos avis Google !
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Découvrir nos produits
            </button>
          </motion.div>
        ) : (
          /* Cart with items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items - 2/3 width */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 bg-white rounded-xl flex-shrink-0 overflow-hidden border border-gray-200">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-700/20 flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary mb-4">
                        {formatPrice(item.priceCents)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600 font-medium">Quantité :</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value) || 1
                              setQty(item.id, qty)
                            }}
                            className="w-16 text-center py-2 border-2 border-gray-300 rounded-lg font-semibold focus:border-primary focus:outline-none"
                          />
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Line Total & Remove */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start space-y-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(item.priceCents * item.qty)}
                      </p>
                      <button
                        onClick={() => {
                          removeItem(item.id)
                          toast.success('Produit retiré du panier')
                        }}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
                    clearCart()
                    toast.success('Panier vidé')
                  }
                }}
                className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
              >
                Vider le panier
              </button>
            </div>

            {/* Order Summary - 1/3 width */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Récapitulatif
                </h2>

                {/* Summary Lines */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total</span>
                    <span className="font-semibold">
                      {formatPrice(totalCents())}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Livraison</span>
                    <span className="font-semibold text-green-600">Gratuite</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary">
                        {formatPrice(totalCents())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Paiement 100% sécurisé</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Livraison gratuite en France</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Garantie produit 2 ans</span>
                    </li>
                  </ul>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !company}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 mb-3 ${
                    company && !isCheckingOut
                      ? 'bg-primary text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                  }`}
                >
                  {isCheckingOut ? 'Chargement...' : !company ? '🔒 Sélectionnez votre entreprise' : 'Commander maintenant'}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => router.push('/')}
                  className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-primary transition-colors"
                >
                  Continuer mes achats
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

