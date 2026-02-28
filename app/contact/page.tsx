'use client'

import Link from 'next/link'
import { MessageCircle, ChevronRight, Clock, HelpCircle, Package, RotateCcw } from 'lucide-react'

export const dynamic = 'force-static'

declare global {
  interface Window {
    Tawk_API?: {
      maximize: () => void
    }
  }
}

function openTawk() {
  if (typeof window !== 'undefined' && window.Tawk_API) {
    window.Tawk_API.maximize()
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <span className="text-gray-900 font-medium">Contact</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Contactez-nous
        </h1>
        <p className="text-gray-500 mb-12">
          Une question ? Notre équipe vous répond en direct via le chat.
        </p>

        {/* CTA Chat */}
        <div className="border border-gray-200 rounded-xl p-6 sm:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Chat en direct</h2>
              <p className="text-sm text-gray-600 mb-4">
                Réponse rapide de notre équipe. Disponible 7j/7.
              </p>
              <button
                onClick={openTawk}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Ouvrir le chat
              </button>
            </div>
          </div>
        </div>

        {/* Sujets fréquents */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <Link
            href="/livraison"
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary/30 hover:bg-blue-50/30 transition-colors group"
          >
            <Package className="w-5 h-5 text-gray-400 group-hover:text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Livraison</p>
              <p className="text-xs text-gray-500">Délais, suivi de colis, frais</p>
            </div>
          </Link>

          <Link
            href="/retours"
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary/30 hover:bg-blue-50/30 transition-colors group"
          >
            <RotateCcw className="w-5 h-5 text-gray-400 group-hover:text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Retours & échanges</p>
              <p className="text-xs text-gray-500">Politique de retour, remboursement</p>
            </div>
          </Link>

          <Link
            href="/#how-it-works"
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary/30 hover:bg-blue-50/30 transition-colors group"
          >
            <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Comment ça marche ?</p>
              <p className="text-xs text-gray-500">Installation, configuration NFC</p>
            </div>
          </Link>

          <Link
            href="/#faq"
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary/30 hover:bg-blue-50/30 transition-colors group"
          >
            <Clock className="w-5 h-5 text-gray-400 group-hover:text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">FAQ</p>
              <p className="text-xs text-gray-500">Toutes les réponses à vos questions</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}
