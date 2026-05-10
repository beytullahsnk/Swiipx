import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export type ShippingMethod = 'domicile' | 'point_relais'

export interface ServicePointData {
  id: string
  name: string
  carrier: string
  street: string
  houseNumber: string
  postalCode: string
  city: string
  country: string
  postNumber?: string
}

interface ShippingStore {
  method: ShippingMethod
  servicePoint: ServicePointData | null
  hasHydrated: boolean

  // Actions
  setMethod: (method: ShippingMethod) => void
  setServicePoint: (point: ServicePointData) => void
  clearServicePoint: () => void
  reset: () => void
  setHasHydrated: (state: boolean) => void
}

// Frais de livraison à domicile en centimes
export const SHIPPING_DOMICILE_CENTS = 490 // 4,90€

export const useShippingStore = create<ShippingStore>()(
  persist(
    (set) => ({
      method: 'point_relais', // Gratuit par défaut
      servicePoint: null,
      hasHydrated: false,

      setMethod: (method) => {
        if (method === 'domicile') {
          // Clear service point quand on switch à domicile
          set({ method, servicePoint: null })
        } else {
          set({ method })
        }
      },

      setServicePoint: (point) => {
        set({ servicePoint: point })
      },

      clearServicePoint: () => {
        set({ servicePoint: null })
      },

      reset: () => {
        set({ method: 'point_relais', servicePoint: null })
      },

      setHasHydrated: (state) => {
        set({ hasHydrated: state })
      },
    }),
    {
      name: 'swiipx-shipping',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
