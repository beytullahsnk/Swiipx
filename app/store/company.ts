import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CompanyInfo {
  name: string
  address: string
  city?: string
  country?: string
  placeId: string
  phone?: string
  lat?: number
  lng?: number
}

interface CompanyStore {
  company: CompanyInfo | null
  setCompany: (company: CompanyInfo) => void
  clearCompany: () => void
  resetCompany: () => void // Alias de clearCompany pour plus de clarté
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      company: null,
      
      setCompany: (company) => {
        set({ company })
      },
      
      clearCompany: () => {
        set({ company: null })
      },
      
      resetCompany: () => {
        set({ company: null })
      },
    }),
    {
      name: 'swiipx-company',
    }
  )
)

