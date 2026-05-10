'use client'

import { useState, useEffect, useMemo } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {
  ArrowLeft,
  ShoppingBag,
  Lock,
  CheckCircle,
  MapPin,
  Home,
  Edit3,
  Truck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useCart, formatPrice } from '../store/cart'
import { useCompanyStore } from '../store/company'
import BusinessAutocomplete, { BusinessInfo } from '../components/BusinessAutocomplete'
import { useShippingStore, SHIPPING_DOMICILE_CENTS } from '../store/shipping'
import type { ServicePointData } from '../store/shipping'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ─── Types communs pour les récaps ──────────────────────────────────────────

interface OrderSummaryProps {
  items: { id: string; name: string; image?: string; priceCents: number; qty: number }[]
  subtotalCents: number
  shippingCents: number
  grandTotal: number
}

// ─── Récapitulatif compact (mobile only — collapsible) ──────────────────────

function OrderSummaryMobile({ items, subtotalCents, shippingCents, grandTotal }: OrderSummaryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { method: shippingMethod } = useShippingStore()
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <div className="lg:hidden bg-gray-50 rounded-xl mb-6 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center space-x-3">
          <ShoppingBag className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">
            Votre commande ({itemCount} article{itemCount > 1 ? 's' : ''})
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-bold text-gray-900">{formatPrice(grandTotal)}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-200 pt-4">
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">Qté : {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatPrice(item.priceCents * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-3 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Sous-total</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Livraison</span>
              {shippingMethod === 'point_relais' ? (
                <span className="text-green-600 font-medium">Gratuite</span>
              ) : (
                <span>{formatPrice(shippingCents)}</span>
              )}
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-1">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Récapitulatif sidebar (desktop only — sticky) ──────────────────────────

function OrderSummarySidebar({ items, subtotalCents, shippingCents, grandTotal }: OrderSummaryProps) {
  const { method: shippingMethod } = useShippingStore()
  const { company } = useCompanyStore()

  return (
    <div className="hidden lg:block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-36">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Votre commande</h2>

        {/* Items */}
        <div className="space-y-4 mb-5">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={56} height={56} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-500">Qté : {item.qty}</p>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{formatPrice(item.priceCents * item.qty)}</p>
            </div>
          ))}
        </div>

        {/* Totaux */}
        <div className="border-t border-gray-100 pt-4 space-y-2.5">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Sous-total</span>
            <span className="font-medium">{formatPrice(subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>Livraison</span>
            </span>
            {shippingMethod === 'point_relais' ? (
              <span className="font-medium text-green-600">Gratuite</span>
            ) : (
              <span className="font-medium">{formatPrice(shippingCents)}</span>
            )}
          </div>
          <div className="border-t border-gray-100 pt-3 mt-1">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span className="text-primary">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Badges de confiance — minimaux (la livraison est déjà détaillée juste au-dessus) */}
        <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            <span>Paiement 100% sécurisé</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <CheckCircle className="w-3.5 h-3.5 text-gray-400" />
            <span>Satisfait ou remboursé sous 14 jours</span>
          </div>
        </div>

        {/* Entreprise */}
        {company && (
          <div className="mt-5 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-0.5">Entreprise liée</p>
            <p className="font-medium text-gray-900 text-sm">{company.name}</p>
            <p className="text-xs text-gray-500">{company.address}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Express Checkout (Apple Pay / Google Pay) ──────────────────────────────

function ExpressCheckoutSection({
  paymentIntentId,
  totalCents,
  onExpressAvailable,
  position = 'top',
}: {
  paymentIntentId: string
  totalCents: number
  onExpressAvailable: (available: boolean) => void
  position?: 'top' | 'bottom'
}) {
  const stripe = useStripe()
  const elements = useElements()
  const { items } = useCart()
  const { company } = useCompanyStore()
  const { method: shippingMethod, servicePoint } = useShippingStore()
  const [isAvailable, setIsAvailable] = useState(true)

  const hasBusinessSelected = !!(company && company.placeId)
  const needsServicePoint = shippingMethod === 'point_relais' && !servicePoint
  const isReady = hasBusinessSelected && !needsServicePoint

  const onReady = ({ availablePaymentMethods }: { availablePaymentMethods?: Record<string, boolean> }) => {
    const hasExpress = !!(availablePaymentMethods?.applePay || availablePaymentMethods?.googlePay)
    setIsAvailable(hasExpress)
    onExpressAvailable(hasExpress && isReady)
  }

  const onConfirm = async () => {
    if (!stripe || !elements) return

    // Vérification : entreprise requise même pour Apple Pay / Google Pay
    if (!hasBusinessSelected) {
      toast.error('Sélectionnez votre entreprise dans le formulaire avant de payer.')
      return
    }
    // Vérification : si Point Relais, il doit être sélectionné
    if (needsServicePoint) {
      toast.error('Choisissez votre point relais avant de payer.')
      return
    }

    try {
      // 1. Mettre à jour le PaymentIntent avec les metadata
      await fetch('/api/update-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId,
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
          shippingMethod,
          servicePoint,
          business: company
            ? {
                name: company.name,
                address: company.address,
                placeId: company.placeId,
                phone: company.phone,
                lat: company.lat,
                lng: company.lng,
              }
            : undefined,
        }),
      })

      // 2. Confirmer le paiement
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success?session_id=${paymentIntentId}`,
        },
      })

      if (error) {
        toast.error(error.message || 'Erreur de paiement')
      }
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors du paiement')
    }
  }

  // Apple Pay / Google Pay non dispo (autre navigateur / pas de wallet) → ne rien afficher
  if (!isAvailable) return null

  // Pré-requis manquants → message informatif (uniquement en haut, on ne pollue pas le bas)
  if (!isReady) {
    if (position === 'bottom') return null // pas de message dupliqué en bas

    const missing: string[] = []
    if (!hasBusinessSelected) missing.push('votre entreprise')
    if (needsServicePoint) missing.push('votre point relais')
    const missingText = missing.join(' et ')

    return (
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-gray-700">
        <p className="flex items-start gap-2">
          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>Apple Pay / Google Pay disponibles</strong> — sélectionnez d&apos;abord {missingText} dans le formulaire ci-dessous pour payer en 1 clic.
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className={position === 'top' ? 'mb-2' : 'mt-4 mb-4'}>
      {position === 'bottom' && (
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">ou payer en 1 clic</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}
      <ExpressCheckoutElement
        onReady={onReady}
        onConfirm={onConfirm}
        options={{
          buttonHeight: 48,
        }}
      />
    </div>
  )
}

// ─── Shipping Picker (Point Relais / Domicile) ─────────────────────────────

interface CheckoutShippingPickerProps {
  billingPostalCode?: string
  billingCity?: string
}

function CheckoutShippingPicker({ billingPostalCode, billingCity }: CheckoutShippingPickerProps) {
  const { method, servicePoint, setMethod, setServicePoint } = useShippingStore()
  const [sendcloudKey, setSendcloudKey] = useState<string | null>(null)
  const [keyError, setKeyError] = useState<string | null>(null)

  // Récupère la clé publique Sendcloud depuis l'API serveur (au lieu de l'embarquer dans le bundle)
  useEffect(() => {
    fetch('/api/sendcloud-config')
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text().catch(() => '')
          throw new Error(`HTTP ${res.status} — ${txt.slice(0, 100)}`)
        }
        return res.json()
      })
      .then((data) => {
        if (data?.publicKey) {
          setSendcloudKey(data.publicKey)
        } else {
          setKeyError('Réponse API sans publicKey')
          console.error('[Sendcloud] API returned no publicKey', data)
        }
      })
      .catch((err) => {
        setKeyError(err?.message || 'Erreur réseau')
        console.error('[Sendcloud] /api/sendcloud-config fetch failed:', err)
      })
  }, [])

  const openServicePointPicker = () => {
    if (!sendcloudKey) {
      const msg = keyError
        ? `Service indisponible : ${keyError}. Choisissez la livraison à domicile.`
        : 'Configuration en cours, réessayez dans 2s.'
      toast.error(msg)
      return
    }
    if (!window.sendcloud?.servicePoints?.open) {
      setTimeout(openServicePointPicker, 500)
      return
    }
    window.sendcloud.servicePoints.open(
      {
        apiKey: sendcloudKey,
        country: 'fr',
        carriers: ['mondial_relay'],
        language: 'fr',
        // Pré-centre le picker sur l'adresse de facturation déjà saisie
        ...(billingPostalCode && { postalCode: billingPostalCode }),
        ...(billingCity && { city: billingCity }),
      },
      (point: any) => {
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
      (errors: any) => {
        console.error('Sendcloud error:', errors)
      }
    )
  }

  return (
    <div className="space-y-3">
      {/* Point Relais */}
      <button
        type="button"
        onClick={() => setMethod('point_relais')}
        className={`w-full flex items-center p-3.5 rounded-lg border transition-all duration-200 text-left ${
          method === 'point_relais' ? 'border-primary bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
          method === 'point_relais' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
        }`}>
          <MapPin className="w-4 h-4" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 text-sm">Point Relais Mondial Relay</span>
            <span className="font-semibold text-green-600 text-sm">Gratuit</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">2-5 jours ouvrés</p>
        </div>
        <div className={`ml-2 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          method === 'point_relais' ? 'border-primary' : 'border-gray-300'
        }`}>
          {method === 'point_relais' && <div className="w-2 h-2 rounded-full bg-primary" />}
        </div>
      </button>

      {/* Point relais sélection */}
      {method === 'point_relais' && (
        <div className="ml-12">
          {servicePoint ? (
            <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="ml-2 flex-1 min-w-0">
                <p className="font-medium text-green-900 text-xs">{servicePoint.name}</p>
                <p className="text-green-700 text-xs mt-0.5">
                  {servicePoint.street} {servicePoint.houseNumber}, {servicePoint.postalCode} {servicePoint.city}
                </p>
              </div>
              <button
                type="button"
                onClick={openServicePointPicker}
                className="ml-2 p-1 text-green-600 hover:bg-green-100 rounded transition-colors flex-shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openServicePointPicker}
              className="w-full flex items-center justify-center p-2.5 border border-dashed border-primary/40 rounded-lg text-primary hover:bg-blue-50 hover:border-primary transition-all duration-200"
            >
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              <span className="font-medium text-xs">Choisir un point relais</span>
            </button>
          )}
        </div>
      )}

      {/* Domicile */}
      <button
        type="button"
        onClick={() => setMethod('domicile')}
        className={`w-full flex items-center p-3.5 rounded-lg border transition-all duration-200 text-left ${
          method === 'domicile' ? 'border-primary bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
          method === 'domicile' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
        }`}>
          <Home className="w-4 h-4" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 text-sm">Livraison à domicile</span>
            <span className="font-semibold text-gray-900 text-sm">{formatPrice(SHIPPING_DOMICILE_CENTS)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Colissimo — 2-5 jours ouvrés</p>
        </div>
        <div className={`ml-2 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          method === 'domicile' ? 'border-primary' : 'border-gray-300'
        }`}>
          {method === 'domicile' && <div className="w-2 h-2 rounded-full bg-primary" />}
        </div>
      </button>
    </div>
  )
}

// ─── Formulaire de paiement par carte ───────────────────────────────────────

function CheckoutForm({
  paymentIntentId,
  totalCents,
  expressAvailable,
}: {
  paymentIntentId: string
  totalCents: number
  expressAvailable: boolean
}) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { company } = useCompanyStore()
  const { method: shippingMethod, servicePoint, reset: resetShipping } = useShippingStore()

  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // Adresse de facturation (toujours obligatoire)
  const [billingLine1, setBillingLine1] = useState('')
  const [billingLine2, setBillingLine2] = useState('')
  const [billingCity, setBillingCity] = useState('')
  const [billingPostalCode, setBillingPostalCode] = useState('')
  const [billingCountry, setBillingCountry] = useState('FR')

  // Adresse de livraison domicile (réutilise facturation ou saisie séparée)
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(true)
  const [shippingLine1, setShippingLine1] = useState('')
  const [shippingLine2, setShippingLine2] = useState('')
  const [shippingCity, setShippingCity] = useState('')
  const [shippingPostalCode, setShippingPostalCode] = useState('')
  const [shippingCountry, setShippingCountry] = useState('FR')

  const [paymentReady, setPaymentReady] = useState(false)

  // Entreprise (pré-remplie depuis le store Zustand si déjà sélectionnée)
  const [businessSelected, setBusinessSelected] = useState<boolean>(!!company)

  // Adresse de livraison effective (facturation ou séparée)
  const effectiveShippingAddress = useMemo(() => {
    if (shippingMethod !== 'domicile') return null
    if (shippingSameAsBilling) {
      return { name, line1: billingLine1, line2: billingLine2, city: billingCity, postalCode: billingPostalCode, country: billingCountry }
    }
    return { name, line1: shippingLine1, line2: shippingLine2, city: shippingCity, postalCode: shippingPostalCode, country: shippingCountry }
  }, [shippingMethod, shippingSameAsBilling, name, billingLine1, billingLine2, billingCity, billingPostalCode, billingCountry, shippingLine1, shippingLine2, shippingCity, shippingPostalCode, shippingCountry])

  const canSubmit = useMemo(() => {
    if (!email || !name || !phone || !paymentReady) return false
    if (!billingLine1 || !billingCity || !billingPostalCode) return false
    if (!businessSelected) return false
    if (shippingMethod === 'point_relais' && !servicePoint) return false
    if (shippingMethod === 'domicile' && !shippingSameAsBilling && (!shippingLine1 || !shippingCity || !shippingPostalCode)) return false
    return true
  }, [email, name, phone, paymentReady, billingLine1, billingCity, billingPostalCode, businessSelected, shippingMethod, servicePoint, shippingSameAsBilling, shippingLine1, shippingCity, shippingPostalCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !canSubmit) return

    setIsProcessing(true)

    try {
      // 1. Mettre à jour le PaymentIntent avec toutes les données
      const updateRes = await fetch('/api/update-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId,
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
          shippingMethod,
          servicePoint,
          customer: { email, name, phone },
          billingAddress: { name, line1: billingLine1, line2: billingLine2, city: billingCity, postalCode: billingPostalCode, country: billingCountry },
          shippingAddress: shippingMethod === 'domicile' ? effectiveShippingAddress : undefined,
          business: company
            ? {
                name: company.name,
                address: company.address,
                placeId: company.placeId,
                phone: company.phone,
                lat: company.lat,
                lng: company.lng,
              }
            : undefined,
        }),
      })

      if (!updateRes.ok) {
        const data = await updateRes.json()
        throw new Error(data.error || 'Erreur lors de la mise à jour')
      }

      // 2. Confirmer le paiement
      const baseUrl = window.location.origin
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${baseUrl}/success?session_id=${paymentIntentId}`,
          receipt_email: email,
          payment_method_data: {
            billing_details: { name, email, phone },
          },
        },
      })

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          toast.error(error.message || 'Erreur de paiement')
        } else {
          toast.error('Une erreur inattendue est survenue')
        }
        setIsProcessing(false)
      }
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors du paiement')
      setIsProcessing(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {/* Coordonnées */}
          <div className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Coordonnées</h2>
            <div className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Nom complet *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">Téléphone *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Adresse de facturation */}
          <div className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Adresse de facturation</h2>
            <div className="space-y-3">
              <div>
                <label htmlFor="billingLine1" className="block text-sm text-gray-600 mb-1">Adresse *</label>
                <input
                  id="billingLine1"
                  type="text"
                  required
                  value={billingLine1}
                  onChange={(e) => setBillingLine1(e.target.value)}
                  placeholder="12 Rue de la Paix"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="billingLine2" className="block text-sm text-gray-600 mb-1">Complément</label>
                <input
                  id="billingLine2"
                  type="text"
                  value={billingLine2}
                  onChange={(e) => setBillingLine2(e.target.value)}
                  placeholder="Appartement, étage..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="billingPostalCode" className="block text-sm text-gray-600 mb-1">Code postal *</label>
                  <input
                    id="billingPostalCode"
                    type="text"
                    required
                    value={billingPostalCode}
                    onChange={(e) => setBillingPostalCode(e.target.value)}
                    placeholder="75002"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="billingCity" className="block text-sm text-gray-600 mb-1">Ville *</label>
                  <input
                    id="billingCity"
                    type="text"
                    required
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    placeholder="Paris"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="billingCountry" className="block text-sm text-gray-600 mb-1">Pays</label>
                <select
                  id="billingCountry"
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors bg-white text-sm"
                >
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MC">Monaco</option>
                </select>
              </div>
            </div>
          </div>

          {/* Entreprise */}
          <div className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Votre entreprise</h2>
            <p className="text-sm text-gray-500 mb-4">
              Recherchez votre établissement pour personnaliser votre plaque NFC
            </p>
            <BusinessAutocomplete
              onSelect={(businessData) => {
                setBusinessSelected(!!businessData?.place_id)
              }}
              placeholder="Tapez le nom de votre entreprise ici.."
            />
            {!businessSelected && (
              <p className="text-xs text-amber-600 mt-2 flex items-center space-x-1">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Requis pour personnaliser votre plaque</span>
              </p>
            )}
          </div>

          {/* Livraison */}
          <div className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Livraison</h2>
            <CheckoutShippingPicker
              billingPostalCode={billingPostalCode}
              billingCity={billingCity}
            />

            {/* Option adresse de livraison différente (domicile uniquement) */}
            {shippingMethod === 'domicile' && (
              <div className="mt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!shippingSameAsBilling}
                    onChange={(e) => setShippingSameAsBilling(!e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-0 focus:outline-none"
                  />
                  <span className="text-sm text-gray-700">Livrer à une adresse différente</span>
                </label>

                {!shippingSameAsBilling && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <label htmlFor="shippingLine1" className="block text-sm text-gray-600 mb-1">Adresse de livraison *</label>
                      <input
                        id="shippingLine1"
                        type="text"
                        required
                        value={shippingLine1}
                        onChange={(e) => setShippingLine1(e.target.value)}
                        placeholder="12 Rue de la Paix"
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingLine2" className="block text-sm text-gray-600 mb-1">Complément</label>
                      <input
                        id="shippingLine2"
                        type="text"
                        value={shippingLine2}
                        onChange={(e) => setShippingLine2(e.target.value)}
                        placeholder="Appartement, étage..."
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="shippingPostalCode" className="block text-sm text-gray-600 mb-1">Code postal *</label>
                        <input
                          id="shippingPostalCode"
                          type="text"
                          required
                          value={shippingPostalCode}
                          onChange={(e) => setShippingPostalCode(e.target.value)}
                          placeholder="75002"
                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="shippingCity" className="block text-sm text-gray-600 mb-1">Ville *</label>
                        <input
                          id="shippingCity"
                          type="text"
                          required
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          placeholder="Paris"
                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="shippingCountry" className="block text-sm text-gray-600 mb-1">Pays</label>
                      <select
                        id="shippingCountry"
                        value={shippingCountry}
                        onChange={(e) => setShippingCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors bg-white text-sm"
                      >
                        <option value="FR">France</option>
                        <option value="BE">Belgique</option>
                        <option value="CH">Suisse</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MC">Monaco</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Paiement — section finale, accent visuel */}
          <div className="p-5 sm:p-6 border-l-4 border-l-primary bg-gradient-to-b from-blue-50/30 to-transparent">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Paiement</h2>

            {/* Garantie 14 jours AVANT le formulaire de paiement (rassure avant la carte) */}
            <div className="mb-4 flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="text-sm">
                <p className="font-semibold text-green-900">Satisfait ou remboursé sous 14 jours</p>
                <p className="text-green-700 text-xs">Retour gratuit si la plaque n&apos;est pas encore collée — remboursement intégral.</p>
              </div>
            </div>

            <PaymentElement
              onChange={(e) => setPaymentReady(e.complete)}
              options={{
                layout: 'tabs',
                // Wallets activés ici → Apple Pay / Google Pay apparaissent
                // comme onglets supplémentaires (en plus du bouton express en haut).
                wallets: { applePay: 'auto', googlePay: 'auto' },
              }}
            />
            <div className="flex items-center space-x-1.5 mt-3 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Paiement sécurisé — cryptage SSL 256-bit</span>
            </div>
          </div>
        </div>

        {/* Bouton de paiement */}
        <button
          type="submit"
          disabled={!canSubmit || isProcessing}
          className={`w-full mt-5 py-3.5 rounded-xl font-bold text-base shadow-md transition-all duration-300 flex items-center justify-center space-x-2 ${
            canSubmit && !isProcessing
              ? 'bg-primary text-white hover:bg-blue-700 hover:shadow-lg active:scale-[0.99] cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>
            {isProcessing ? 'Traitement en cours...' : `Payer ${formatPrice(totalCents)}`}
          </span>
        </button>
      </form>
    </>
  )
}

// ─── Page principale ────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalCents, hasHydrated } = useCart()
  const { company } = useCompanyStore()
  const { method: shippingMethod } = useShippingStore()

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expressAvailable, setExpressAvailable] = useState(false)

  const shippingCents = shippingMethod === 'domicile' ? SHIPPING_DOMICILE_CENTS : 0
  const grandTotal = totalCents() + shippingCents

  // Créer le PaymentIntent au chargement
  useEffect(() => {
    if (!hasHydrated || items.length === 0) return

    const createPI = async () => {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({ id: i.id, qty: i.qty })),
            shippingMethod,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        setClientSecret(data.clientSecret)
        setPaymentIntentId(data.paymentIntentId)
      } catch (err: any) {
        setError(err.message)
      }
    }

    createPI()
  }, [hasHydrated, items.length])

  // Rediriger si panier vide
  useEffect(() => {
    if (hasHydrated && items.length === 0 && !clientSecret) {
      router.push('/cart')
    }
  }, [hasHydrated, items.length, clientSecret, router])

  // Loading
  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
      </div>
    )
  }

  // Erreur
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => router.push('/cart')}
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm"
          >
            Retour au panier
          </button>
        </div>
      </div>
    )
  }

  // Chargement du PaymentIntent
  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Préparation du paiement...</p>
        </div>
      </div>
    )
  }

  const summaryProps: OrderSummaryProps = {
    items,
    subtotalCents: totalCents(),
    shippingCents,
    grandTotal,
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/cart')}
            className="flex items-center space-x-1.5 text-gray-500 hover:text-primary transition-colors mb-3 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au panier</span>
          </button>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Paiement sécurisé</h1>
          </div>
        </div>

        {/* Layout 2 colonnes desktop / 1 colonne mobile */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          {/* Colonne gauche — Formulaire */}
          <div className="lg:col-span-7">
            {/* Récapitulatif mobile (collapsible, masqué sur desktop) */}
            <OrderSummaryMobile {...summaryProps} />

            {/* Stripe Elements wrapper */}
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#2563EB',
                    colorDanger: '#ef4444',
                    borderRadius: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSizeBase: '14px',
                  },
                  rules: {
                    '.Input': {
                      border: '1px solid #e5e7eb',
                      boxShadow: 'none',
                      padding: '10px 14px',
                    },
                    '.Input:focus': {
                      border: '1px solid #2563EB',
                      boxShadow: '0 0 0 1px rgba(37, 99, 235, 0.2)',
                    },
                    '.Tab': {
                      border: '1px solid #e5e7eb',
                      boxShadow: 'none',
                    },
                    '.Tab--selected': {
                      border: '1px solid #2563EB',
                      boxShadow: 'none',
                      color: '#2563EB',
                    },
                    '.Label': {
                      fontWeight: '500',
                      color: '#4b5563',
                    },
                  },
                },
                locale: 'fr',
              }}
            >
              {/* Formulaire — Apple Pay / Google Pay sont disponibles en onglets
                  dans le PaymentElement (en bas), pour qu'ils restent toujours
                  visibles peu importe l'état du formulaire. */}
              <CheckoutForm
                paymentIntentId={paymentIntentId!}
                totalCents={grandTotal}
                expressAvailable={expressAvailable}
              />
            </Elements>

            {/* Trust badges mobile */}
            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-400 lg:hidden">
              <div className="flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>SSL sécurisé</span>
              </div>
              <span>·</span>
              <div className="flex items-center space-x-1">
                <Truck className="w-3 h-3" />
                <span>Livraison dès 0€</span>
              </div>
              <span>·</span>
              <span>Garantie 2 ans</span>
            </div>
          </div>

          {/* Colonne droite — Récapitulatif sticky (desktop only) */}
          <div className="lg:col-span-5">
            <OrderSummarySidebar {...summaryProps} />
          </div>
        </div>
      </div>
    </div>
  )
}
