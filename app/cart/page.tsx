'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
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

  // Rediriger vers la page checkout custom (entreprise sera demandée au checkout si absente)
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Votre panier est vide')
      return
    }
    router.push('/checkout')
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

        {/* Company Info — affiché seulement si déjà sélectionnée */}
        {items.length > 0 && company && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="font-bold text-gray-900 text-lg mb-3">Entreprise sélectionnée</h3>
            <CompanySelectedCard />
          </motion.div>
        )}

        {items.length === 0 ? (
          /* Empty Cart — sobre */
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center max-w-md mx-auto">
            <ShoppingBag className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Reprenez où vous étiez ou découvrez nos packs.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Voir les packs
            </button>
          </div>
        ) : (
          /* Cart with items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items - 2/3 width */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
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
                            aria-label="Réduire la quantité"
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            aria-label="Quantité"
                            onChange={(e) => {
                              const qty = parseInt(e.target.value) || 1
                              setQty(item.id, qty)
                            }}
                            className="w-16 text-center py-2 border-2 border-gray-300 rounded-lg font-semibold focus:border-primary focus:outline-none"
                          />
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            aria-label="Augmenter la quantité"
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
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
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
                    <span className="font-semibold text-green-600 text-right text-sm">
                      Gratuite (Point Relais)<br />
                      <span className="text-gray-500 font-normal">ou 4,90€ (domicile)</span>
                    </span>
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

                {/* Info — ligne discrète */}
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Paiement 100% sécurisé · Garantie 2 ans · Satisfait ou remboursé sous 14 jours.
                </p>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 mb-3 bg-primary text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Commander maintenant
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

