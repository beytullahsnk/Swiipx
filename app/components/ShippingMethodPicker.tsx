'use client'

import { Home, MapPin, Edit3, CheckCircle } from 'lucide-react'
import { useShippingStore, SHIPPING_DOMICILE_CENTS } from '../store/shipping'
import { formatPrice } from '../store/cart'

declare global {
  interface Window {
    sendcloud?: {
      servicePoints?: {
        open: (
          config: {
            apiKey: string
            country: string
            carriers?: string[]
            language?: string
          },
          onSelect: (point: {
            id: number
            name: string
            carrier: string
            street: string
            house_number: string
            postal_code: string
            city: string
            country: string
            to_post_number?: string
          }) => void,
          onError: (errors: any) => void
        ) => void
      }
    }
  }
}

export default function ShippingMethodPicker() {
  const { method, servicePoint, setMethod, setServicePoint } = useShippingStore()

  const openServicePointPicker = () => {
    if (!window.sendcloud?.servicePoints?.open) {
      // Script pas encore chargé, réessayer dans 500ms
      setTimeout(openServicePointPicker, 500)
      return
    }

    window.sendcloud.servicePoints.open(
      {
        apiKey: process.env.NEXT_PUBLIC_SENDCLOUD_PUBLIC_KEY || '',
        country: 'fr',
        carriers: ['mondial_relay'],
        language: 'fr',
      },
      (point) => {
        setServicePoint({
          id: point.id.toString(),
          name: point.name,
          carrier: point.carrier,
          street: point.street,
          houseNumber: point.house_number,
          postalCode: point.postal_code,
          city: point.city,
          country: point.country,
          postNumber: point.to_post_number,
        })
      },
      (errors) => {
        console.error('Sendcloud Service Point Picker error:', errors)
      }
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Mode de livraison</h3>

      <div className="space-y-3">
        {/* Option Point Relais */}
        <button
          onClick={() => setMethod('point_relais')}
          className={`w-full flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left ${
            method === 'point_relais'
              ? 'border-primary bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            method === 'point_relais' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            <MapPin className="w-5 h-5" />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Point Relais Mondial Relay</span>
              <span className="font-bold text-green-600">Gratuit</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">Livraison en 2-5 jours ouvrés</p>
          </div>
          <div className={`ml-3 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            method === 'point_relais' ? 'border-primary' : 'border-gray-300'
          }`}>
            {method === 'point_relais' && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </div>
        </button>

        {/* Sélection du point relais */}
        {method === 'point_relais' && (
          <div className="ml-14 -mt-1">
            {servicePoint ? (
              <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-semibold text-green-900 text-sm">{servicePoint.name}</p>
                  <p className="text-green-700 text-xs mt-0.5">
                    {servicePoint.street} {servicePoint.houseNumber}, {servicePoint.postalCode} {servicePoint.city}
                  </p>
                </div>
                <button
                  onClick={openServicePointPicker}
                  className="ml-2 p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex-shrink-0"
                  title="Modifier le point relais"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openServicePointPicker}
                className="w-full flex items-center justify-center p-3 border-2 border-dashed border-primary/40 rounded-lg text-primary hover:bg-blue-50 hover:border-primary transition-all duration-200"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span className="font-medium text-sm">Choisir un point relais</span>
              </button>
            )}
          </div>
        )}

        {/* Option Domicile */}
        <button
          onClick={() => setMethod('domicile')}
          className={`w-full flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left ${
            method === 'domicile'
              ? 'border-primary bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            method === 'domicile' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            <Home className="w-5 h-5" />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Livraison à domicile</span>
              <span className="font-bold text-gray-900">{formatPrice(SHIPPING_DOMICILE_CENTS)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">Colissimo — Livraison en 2-5 jours ouvrés</p>
          </div>
          <div className={`ml-3 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            method === 'domicile' ? 'border-primary' : 'border-gray-300'
          }`}>
            {method === 'domicile' && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
