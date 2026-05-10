'use client'

import { CheckCircle } from 'lucide-react'
import { useEffect, Suspense } from 'react'
import { useCart } from '../store/cart'
import { useShippingStore } from '../store/shipping'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const { clearCart } = useCart()
  const { reset: resetShipping } = useShippingStore()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  useEffect(() => {
    if (sessionId) {
      clearCart()
      resetShipping()
    }
  }, [clearCart, resetShipping, sessionId])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-32 pb-20">
      <div className="max-w-lg w-full text-center">

        {/* Check icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Commande confirmée
        </h1>
        <p className="text-gray-500 mb-2">
          Merci pour votre commande. Un email de confirmation vient d&apos;être envoyé.
        </p>

        {/* Order ID */}
        {sessionId && (
          <p className="text-sm text-gray-400 mb-10">
            Référence commande{' '}
            <span className="font-mono font-semibold text-gray-700">
              #{sessionId.slice(-8).toUpperCase()}
            </span>
          </p>
        )}
        {!sessionId && <div className="mb-10" />}

        {/* Steps */}
        <div className="text-left border border-gray-200 rounded-xl divide-y divide-gray-200 mb-10">
          <div className="p-5 flex gap-4">
            <span className="text-sm font-semibold text-gray-400 mt-0.5">01</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Email de confirmation</p>
              <p className="text-gray-500 text-sm mt-0.5">Récapitulatif de votre commande envoyé par email.</p>
            </div>
          </div>
          <div className="p-5 flex gap-4">
            <span className="text-sm font-semibold text-gray-400 mt-0.5">02</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Expédition sous 24h</p>
              <p className="text-gray-500 text-sm mt-0.5">Vous recevrez votre numéro de suivi par email.</p>
            </div>
          </div>
          <div className="p-5 flex gap-4">
            <span className="text-sm font-semibold text-gray-400 mt-0.5">03</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Livraison en 2-5 jours ouvrés</p>
              <p className="text-gray-500 text-sm mt-0.5">Livraison gratuite partout en France.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors text-center"
          >
            Retour à l&apos;accueil
          </Link>
          <button
            onClick={() => { if ((window as any).Tawk_API) (window as any).Tawk_API.maximize() }}
            className="flex-1 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium text-sm border border-gray-200 hover:border-gray-300 transition-colors"
          >
            Une question ? Chattez avec nous
          </button>
        </div>

        {/* Internal link to blog (SEO + engagement post-achat) */}
        <p className="mt-10 pt-8 border-t border-gray-100 text-sm text-gray-500">
          En attendant la livraison, découvrez notre guide :{' '}
          <Link
            href="/blog/doubler-avis-google-30-jours"
            className="text-primary hover:text-blue-700 font-medium underline underline-offset-2"
          >
            Doubler vos avis Google en 30 jours
          </Link>
        </p>

      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
