import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Options payantes cochées au checkout.
 *
 * Store séparé du panier : ces options ne sont pas des articles, elles ne
 * doivent ni apparaître dans le tiroir latéral ni influer sur les totaux
 * affichés avant le checkout — c'est là qu'elles sont proposées.
 *
 * Persisté pour survivre à un rechargement en pleine saisie du formulaire.
 * Le serveur recalcule de toute façon le montant à partir de ce drapeau avant
 * de débiter : l'affichage ne fait jamais autorité.
 */
interface OptionsStore {
  remplacement: boolean
  hasHydrated: boolean

  setRemplacement: (actif: boolean) => void
  reset: () => void
  setHasHydrated: (state: boolean) => void
}

export const useOptionsStore = create<OptionsStore>()(
  persist(
    (set) => ({
      remplacement: false,
      hasHydrated: false,

      setRemplacement: (actif) => set({ remplacement: actif }),
      reset: () => set({ remplacement: false }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'swiipx-options',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
