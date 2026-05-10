'use client'

import Link from 'next/link'
import { Truck, Clock, Package, MapPin, ChevronRight } from 'lucide-react'

export const dynamic = 'force-static'

export default function LivraisonPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero band */}
      <div className="bg-gradient-to-b from-blue-50/50 to-transparent pt-36 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <span className="text-gray-700">Expédition & Livraison</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Livraison
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Expédition & Livraison
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Livraison gratuite, expédition sous 24h. Tout ce que vous devez savoir.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content sections */}
        <div className="space-y-14">

          {/* Délais */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Délais de livraison</h2>
            </div>
            <dl className="space-y-3">
              <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                <div>
                  <dt className="font-semibold text-gray-900">France Métropolitaine</dt>
                  <dd className="text-sm text-gray-600 mt-1">
                    Expédition sous 24h. Livraison par Colissimo ou Chronopost.
                  </dd>
                </div>
                <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  2-5 jours
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 py-3">
                <div>
                  <dt className="font-semibold text-gray-900">DOM-TOM & Corse</dt>
                  <dd className="text-sm text-gray-600 mt-1">
                    Délais variables selon destination. Suivi par email à chaque étape.
                  </dd>
                </div>
                <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  5-7 jours
                </span>
              </div>
            </dl>
          </section>

          {/* Frais — alerte unique conservée */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Package className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Frais de livraison</h2>
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
            <div className="flex items-center gap-3 mb-5">
              <Truck className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Suivi de commande</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Un email de confirmation avec votre <strong>numéro de suivi</strong> vous est envoyé dès l&apos;expédition de votre colis.
              </p>
              <p>
                Vous pouvez suivre l&apos;acheminement en temps réel sur le site de Colissimo ou Chronopost jusqu&apos;à la livraison (domicile ou point relais).
              </p>
              <p className="text-sm text-gray-500 pt-2">
                Pensez à vérifier vos spams si vous ne recevez pas l&apos;email de suivi dans les 24h.
              </p>
            </div>
          </section>

          {/* Problème */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Un problème de livraison&nbsp;?</h2>
            </div>
            <p className="text-base text-gray-700">
              Colis perdu, endommagé ou en retard ? Notre équipe vous répond sous 24h.
            </p>
          </section>

        </div>

        {/* CTA fin de page */}
        <section className="bg-blue-50/40 border border-blue-100 rounded-2xl p-8 mt-16 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Une question sur votre commande&nbsp;?
          </h2>
          <p className="text-gray-600 mb-5 text-sm">
            Notre équipe répond en moins de 24h par email ou en direct via le chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:bonjour@swiipx.fr"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Envoyer un email
            </a>
            <button
              type="button"
              onClick={() => { if ((window as any).Tawk_API) (window as any).Tawk_API.maximize() }}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm border border-gray-200 hover:border-gray-400 transition-colors"
            >
              Ouvrir le chat
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}
