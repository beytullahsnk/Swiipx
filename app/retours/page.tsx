'use client'

import Link from 'next/link'
import { RotateCcw, Clock, Package, Mail, ChevronRight, AlertTriangle } from 'lucide-react'

export default function RetoursPage() {
  return (
    <div className="min-h-screen bg-white pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <span className="text-gray-900 font-medium">Retours & Échanges</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Retours & Échanges
        </h1>
        <p className="text-gray-500 mb-12">
          Conditions et procédure pour retourner ou échanger vos plaques Swiipx.
        </p>

        {/* Content sections */}
        <div className="space-y-12">

          {/* Droit de rétractation */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Droit de rétractation</h2>
            </div>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-200">
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Délai légal</span>
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">14 jours</span>
                </div>
                <p className="text-sm text-gray-600">
                  Vous disposez de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation, conformément au Code de la consommation.
                </p>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Remboursement</span>
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">Sous 7 jours ouvrés</span>
                </div>
                <p className="text-sm text-gray-600">
                  Dès réception et vérification de votre retour, le remboursement est effectué sur votre moyen de paiement initial.
                </p>
              </div>
            </div>
          </section>

          {/* Conditions */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Conditions de retour</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Pour être accepté, le retour doit respecter les conditions suivantes :
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>Produit <strong>non utilisé</strong> et <strong>non collé</strong> — une plaque déjà posée ne peut pas être retournée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>Emballage d&apos;origine intact, non ouvert</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>Demande effectuée dans les 14 jours suivant la réception</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>Retour validé au préalable par email</span>
                </li>
              </ul>
              <div className="bg-amber-50 rounded-lg p-4 text-amber-800 border border-amber-200 flex items-start gap-3 mt-4">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Les plaques déjà collées ou utilisées ne sont ni reprises ni échangées. L&apos;adhésif se détériore au retrait, rendant le produit inutilisable.
                </span>
              </div>
            </div>
          </section>

          {/* Procédure */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Procédure de retour</h2>
            </div>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-200">
              <div className="p-5">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-bold rounded-full mr-3">1</span>
                <span className="font-semibold text-gray-900">Contactez-nous par email</span>
                <p className="text-sm text-gray-600 mt-1 ml-9">
                  Envoyez votre numéro de commande et le motif du retour à{' '}
                  <a href="mailto:bonjour@swiipx.fr" className="text-primary font-semibold hover:underline">bonjour@swiipx.fr</a>.
                </p>
              </div>
              <div className="p-5">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-bold rounded-full mr-3">2</span>
                <span className="font-semibold text-gray-900">On vous confirme le retour</span>
                <p className="text-sm text-gray-600 mt-1 ml-9">
                  Nous vous répondons sous 24h avec les instructions et l&apos;adresse d&apos;expédition.
                </p>
              </div>
              <div className="p-5">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-bold rounded-full mr-3">3</span>
                <span className="font-semibold text-gray-900">Expédiez le colis</span>
                <p className="text-sm text-gray-600 mt-1 ml-9">
                  Emballez soigneusement le produit et envoyez-le à l&apos;adresse indiquée.
                </p>
              </div>
              <div className="p-5">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-bold rounded-full mr-3">4</span>
                <span className="font-semibold text-gray-900">Remboursement</span>
                <p className="text-sm text-gray-600 mt-1 ml-9">
                  Après vérification, remboursement sous 7 jours ouvrés sur votre moyen de paiement initial.
                </p>
              </div>
            </div>
          </section>

          {/* Échanges */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Échanges</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Pour échanger votre pack contre un autre, effectuez un retour classique puis passez une nouvelle commande. Cela garantit un traitement rapide et la disponibilité du produit.
              </p>
            </div>
          </section>

          {/* Produit défectueux */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Produit défectueux</h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="font-bold text-green-900 text-lg mb-1">Remplacement gratuit</p>
              <p className="text-sm text-green-800">
                Si votre plaque présente un défaut de fabrication (NFC non fonctionnel, impression défectueuse), nous la remplaçons gratuitement. Contactez-nous avec une photo du produit et votre numéro de commande.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Besoin d&apos;aide ?</h2>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Une question sur un retour ou un échange ? Notre équipe vous répond sous 24h.
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
