import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface BusinessInfo {
  name: string
  address: string
  place_id: string
  phone?: string
  lat?: number
  lng?: number
}

export interface CartItem {
  id: 'plaque1' | 'plaque2' | 'plaque5'
  name: string
  priceCents: number
  qty: number
  image?: string
  businessInfo?: BusinessInfo
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  hasHydrated: boolean // Pour éviter les erreurs d'hydratation
  
  // Actions
  addItem: (id: CartItem['id'], businessInfo?: BusinessInfo) => void
  removeItem: (id: CartItem['id']) => void
  setQty: (id: CartItem['id'], qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  setHasHydrated: (state: boolean) => void
  
  // Selectors
  totalCents: () => number
  totalItems: () => number
}

// Product mapping (matches Stripe product IDs)
const PRODUCT_DATA: Record<CartItem['id'], Omit<CartItem, 'id' | 'qty'>> = {
  plaque1: {
    name: 'Swiipx — 1 Plaque',
    priceCents: 3990, // 39,90€
    image: '/products/plaque1.jpg',
  },
  plaque2: {
    name: 'Swiipx — 2 Plaques',
    priceCents: 5990, // 59,90€
    image: '/products/plaque2.jpg',
  },
  plaque5: {
    name: 'Swiipx — 5 Plaques',
    priceCents: 8990, // 89,90€
    image: '/products/plaque5.jpg',
  },
}

// Create cart store with persistence
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,

      // Add item to cart (or increment qty if exists)
      addItem: (id, businessInfo) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === id)

        if (existingItem) {
          // Increment quantity and update business info
          set({
            items: items.map((item) =>
              item.id === id ? { ...item, qty: item.qty + 1, businessInfo: businessInfo || item.businessInfo } : item
            ),
          })
        } else {
          // Add new item with business info
          const productData = PRODUCT_DATA[id]
          set({
            items: [
              ...items,
              {
                id,
                ...productData,
                qty: 1,
                businessInfo,
              },
            ],
          })
        }
      },

      // Remove item from cart
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      // Set specific quantity (remove if qty === 0)
      setQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        })
      },

      // Clear entire cart + fermer le panier
      clearCart: () => {
        set({ items: [], isOpen: false })
      },

      // Toggle cart sidebar
      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      // Open cart sidebar
      openCart: () => {
        set({ isOpen: true })
      },

      // Close cart sidebar
      closeCart: () => {
        set({ isOpen: false })
      },

      // Set hydration state
      setHasHydrated: (state) => {
        set({ hasHydrated: state })
      },

      // Calculate total price in cents
      totalCents: () => {
        return get().items.reduce((total, item) => {
          return total + item.priceCents * item.qty
        }, 0)
      },

      // Calculate total number of items
      totalItems: () => {
        return get().items.reduce((total, item) => {
          return total + item.qty
        }, 0)
      },
    }),
    {
      name: 'swiipx-cart', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Marquer comme hydraté une fois que les données sont chargées
        state?.setHasHydrated(true)
      },
    }
  )
)

// Helper function to format price
export const formatPrice = (cents: number): string => {
  return `${(cents / 100).toFixed(2).replace('.', ',')}€`
}

