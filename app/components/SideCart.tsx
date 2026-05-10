'use client'

import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart, formatPrice } from '../store/cart'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import { Button } from './ui/button'

export default function SideCart() {
  const router = useRouter()
  const { items, isOpen, closeCart, setQty, removeItem, totalCents, totalItems } = useCart()

  const handleGoToCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  const handleViewCart = () => {
    closeCart()
    router.push('/cart')
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col p-0 gap-0">
        {/* Header */}
        <SheetHeader className="p-6 border-b border-gray-200">
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6" />
            <span>Panier ({totalItems()})</span>
          </SheetTitle>
        </SheetHeader>

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
                        aria-label="Réduire la quantité"
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Augmenter la quantité"
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Supprimer l'article"
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
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-gray-700">Sous-total</span>
              <span className="font-bold text-2xl text-gray-900">
                {formatPrice(totalCents())}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Livraison et taxes calculées au paiement
            </p>

            <div className="space-y-3">
              <Button
                onClick={handleGoToCheckout}
                size="lg"
                className="w-full text-lg"
              >
                Passer commande
              </Button>
              <Button
                onClick={handleViewCart}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Voir le panier
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
