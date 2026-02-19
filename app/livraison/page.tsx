'use client'

import Link from 'next/link'
import { Truck, Clock, Package, MapPin, ChevronRight } from 'lucide-react'

export const dynamic = 'force-static'

export default function LivraisonPage() {
  return (
    <div className="min-h-screen bg-white pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Expédition & Livraison</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Expédition & Livraison
        </h1>
        <p className="text-gray-500 mb-12">
          Tout ce que vous devez savoir sur la livraison de vos plaques Swiipx.
        </p>

        {/* Content sections */}
        <div className="space-y-12">

          {/* Délais */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Délais de livraison</h2>
            </div>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-200">
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">France Métropolitaine</span>
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">2-4 jours ouvrés</span>
                </div>
                <p className="text-sm text-gray-600">
                  Expédition sous 24h après validation. Livraison par Colissimo ou Chronopost.
                </p>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">DOM-TOM & Corse</span>
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">5-7 jours ouvrés</span>
                </div>
                <p className="text-sm text-gray-600">
                  Délais variables selon la destination. Suivi par email à chaque étape.
                </p>
              </div>
            </div>
          </section>

          {/* Frais */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Frais de livraison</h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="font-bold text-green-900 text-lg mb-1">Livraison gratuite</p>
              <p className="text-sm text-green-800">
                Sur toutes les commandes, sans minimum d&apos;achat. Les frais de port sont entièrement pris en charge par Swiipx.
              </p>
            </div>
          </section>

          {/* Suivi */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Suivi de commande</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Un email de confirmation avec votre <strong>numéro de suivi</strong> vous est envoyé dès l&apos;expédition de votre colis.
              </p>
              <p>
                Vous pouvez suivre l&apos;acheminement en temps réel sur le site de Colissimo ou Chronopost jusqu&apos;à la livraison (domicile ou point relais).
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-600 border border-gray-100">
                Pensez à vérifier vos spams si vous ne recevez pas l&apos;email de suivi dans les 24h.
              </div>
            </div>
          </section>

          {/* Problème */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Un problème de livraison ?</h2>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Colis perdu, endommagé ou en retard ? Notre équipe vous répond sous 24h.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 transition-colors"
            >
              Contacter le support
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
