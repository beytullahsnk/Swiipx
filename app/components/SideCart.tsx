'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, AlertTriangle } from 'lucide-react'
import { useCart, formatPrice } from '../store/cart'
import { useCompanyStore } from '../store/company'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import CompanySelectedCard from './CompanySelectedCard'

export default function SideCart() {
  const router = useRouter()
  const { items, isOpen, closeCart, setQty, removeItem, totalCents, totalItems, hasHydrated } = useCart()
  const { company } = useCompanyStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Bloquer le scroll du body quand le panier est ouvert (méthode Shopify)
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder la position de scroll actuelle
      const scrollY = window.scrollY
      
      // Stocker dans un data attribute pour pouvoir le récupérer
      document.body.setAttribute('data-scroll-y', scrollY.toString())
      
      // Bloquer le scroll avec position fixed
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
    } else {
      // Récupérer la position de scroll sauvegardée
      const scrollYAttr = document.body.getAttribute('data-scroll-y')
      
      // Désactiver le smooth scroll pour une restauration instantanée
      document.documentElement.style.scrollBehavior = 'auto'
      
      // Restaurer les styles AVANT de scrollTo
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      
      // Nettoyer l'attribut
      document.body.removeAttribute('data-scroll-y')
      
      // Restaurer la position de scroll instantanément
      if (scrollYAttr) {
        window.scrollTo(0, parseInt(scrollYAttr))
      }
      
      // Réactiver le comportement normal du scroll
      document.documentElement.style.scrollBehavior = ''
    }

    // Cleanup au démontage du composant
    return () => {
      const scrollYAttr = document.body.getAttribute('data-scroll-y')
      
      // Désactiver le smooth scroll
      document.documentElement.style.scrollBehavior = 'auto'
      
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      if (scrollYAttr) {
        document.body.removeAttribute('data-scroll-y')
        window.scrollTo(0, parseInt(scrollYAttr))
      }
      
      // Réactiver le comportement normal
      document.documentElement.style.scrollBehavior = ''
    }
  }, [isOpen])

  // Handle checkout
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Votre panier est vide')
      return
    }

    // Vérifier qu'une entreprise est sélectionnée
    if (!company) {
      toast.error('⚠️ Veuillez sélectionner votre entreprise avant de commander')
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

  // Handle view cart page
  const handleViewCart = () => {
    closeCart()
    router.push('/cart')
  }

  return (
    <>
      {/* Overlay Fullscreen avec Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[199]"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
          />
        )}
      </AnimatePresence>

      {/* Slide-in Cart */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-white shadow-2xl z-[200] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <ShoppingBag className="w-6 h-6" />
                <span>Panier ({totalItems()})</span>
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Company Info */}
            {company ? (
              <div className="px-6 py-4 border-b border-gray-200">
                <CompanySelectedCard />
              </div>
            ) : (
              items.length > 0 && (
                <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-red-900 text-sm">Entreprise non sélectionnée</p>
                      <p className="text-xs text-red-700 mt-1">
                        Veuillez retourner sur la page produit pour sélectionner votre établissement.
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-600 text-lg mb-2">Votre panier est vide</p>
                  <p className="text-gray-500 text-sm">Ajoutez des produits pour continuer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex space-x-4 bg-gray-50 rounded-xl p-4"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 overflow-hidden border border-gray-200">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-700/20 flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-primary" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold mb-2">
                          {formatPrice(item.priceCents)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {formatPrice(item.priceCents * item.qty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-gray-700">Sous-total</span>
                  <span className="font-bold text-2xl text-gray-900">
                    {formatPrice(totalCents())}
                  </span>
                </div>

                {/* Info */}
                <p className="text-sm text-gray-500">
                  Livraison et taxes calculées au paiement
                </p>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || !company}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                      company && !isCheckingOut
                        ? 'bg-primary text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                    }`}
                  >
                    {isCheckingOut ? 'Chargement...' : !company ? '🔒 Sélectionnez votre entreprise' : 'Commander'}
                  </button>
                  <button
                    onClick={handleViewCart}
                    className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-primary transition-colors"
                  >
                    Voir le panier
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

