'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { useCompanyStore } from '../store/company'
import CompanySelectedCard from './CompanySelectedCard'

export interface BusinessInfo {
  name: string
  address: string
  place_id: string
  phone?: string
  lat?: number
  lng?: number
}

interface BusinessAutocompleteProps {
  onSelect: (business: BusinessInfo | null) => void
  placeholder?: string
  className?: string
}

export default function BusinessAutocomplete({
  onSelect,
  placeholder = "Tapez le nom de votre entreprise ici..",
  className = ""
}: BusinessAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedPlace, setSelectedPlace] = useState<BusinessInfo | null>(null)
  const [resetTrigger, setResetTrigger] = useState(0) // Trigger pour forcer la réinitialisation
  const { setCompany, clearCompany } = useCompanyStore()

  // Check if Google Maps API is loaded
  useEffect(() => {
    const checkGoogleLoaded = setInterval(() => {
      if ((window as any).google && (window as any).google.maps && (window as any).google.maps.places) {
        setIsLoaded(true)
        clearInterval(checkGoogleLoaded)
      }
    }, 100)

    return () => clearInterval(checkGoogleLoaded)
  }, [])

  // Initialize/Reinitialize Google Places Autocomplete
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

    // Nettoyer l'ancienne instance si elle existe
    if (autocompleteRef.current) {
      (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current)
      autocompleteRef.current = null
    }

    // Créer une nouvelle instance
    const autocomplete = new (window as any).google.maps.places.Autocomplete(inputRef.current, {
      fields: ['formatted_address', 'geometry', 'name', 'place_id', 'formatted_phone_number'],
      types: ['establishment'],
      componentRestrictions: { country: ['fr'] },
    })

    autocompleteRef.current = autocomplete

    // Listen for place selection
    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      // Vérifier uniquement le place_id (geometry est optionnel)
      if (!place.place_id) {
        console.warn('Google Places: place_id manquant')
        return
      }

      // Extract business info
      const businessInfo: BusinessInfo = {
        name: place.name || place.formatted_address || 'Établissement',
        address: place.formatted_address || '',
        place_id: place.place_id,
        phone: place.formatted_phone_number || undefined,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      }

      // Update input value
      const displayText = businessInfo.name && businessInfo.address 
        ? `${businessInfo.name} - ${businessInfo.address}`
        : businessInfo.name || businessInfo.address
      
      setInputValue(displayText)

      // Save selected place
      setSelectedPlace(businessInfo)

      // Save to global store
      setCompany({
        name: businessInfo.name,
        address: businessInfo.address,
        placeId: businessInfo.place_id,
        phone: businessInfo.phone,
        lat: businessInfo.lat,
        lng: businessInfo.lng,
      })

      // Call parent callback
      onSelect(businessInfo)
      
    })

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isLoaded, resetTrigger, onSelect, setCompany])

  // Reset function (appelée par CompanySelectedCard)
  const handleReset = () => {
    // Reset tous les états
    setSelectedPlace(null)
    setInputValue('')
    onSelect(null)
    
    // Forcer la réinitialisation de l'autocomplete
    setResetTrigger(prev => prev + 1)
    
    // Remettre le focus dans l'input après un court délai
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
    
    // clearCompany() est déjà appelé par CompanySelectedCard
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    // Si l'utilisateur modifie le texte après une sélection, on reset
    if (selectedPlace && newValue !== inputValue) {
      setSelectedPlace(null)
      clearCompany()
      onSelect(null)
      // Réinitialiser l'autocomplete
      setResetTrigger(prev => prev + 1)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Input container with Google logo */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>

        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={!isLoaded}
          className="w-full pl-12 pr-20 py-4 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        {/* Google logo badge */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-1 text-xs text-gray-400">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">by Google</span>
        </div>
      </div>

      {/* Loading state */}
      {!isLoaded && (
        <p className="mt-2 text-sm text-gray-500">
          Chargement de l&apos;autocomplete...
        </p>
      )}

      {/* Selected Company Card with Reset Button */}
      <CompanySelectedCard 
        onReset={handleReset}
        className="mt-4"
      />

      {/* Powered by Google (required by Google Places API) */}
      <div className="mt-2 flex justify-end">
        <span className="text-xs text-gray-400">Powered by Google</span>
      </div>
    </div>
  )
}

