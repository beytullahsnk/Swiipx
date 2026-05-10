'use client'

import Link from 'next/link'
import { RotateCcw, Clock, Package, ChevronRight, AlertTriangle } from 'lucide-react'

export default function RetoursPage() {
  const procedureSteps = [
    { n: 1, title: 'Contactez-nous par email', text: (
      <>Envoyez votre numéro de commande et le motif du retour à{' '}
      <a href="mailto:bonjour@swiipx.fr" className="text-primary font-semibold hover:underline">bonjour@swiipx.fr</a>.</>
    ) },
    { n: 2, title: 'On vous confirme le retour', text: <>Nous vous répondons sous 24h avec les instructions et l&apos;adresse d&apos;expédition.</> },
    { n: 3, title: 'Expédiez le colis', text: <>Emballez soigneusement le produit et envoyez-le à l&apos;adresse indiquée.</> },
    { n: 4, title: 'Remboursement', text: <>Après vérification, remboursement sous 7 jours ouvrés sur votre moyen de paiement initial.</> },
  ]

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero band */}
      <div className="bg-gradient-to-b from-blue-50/50 to-transparent pt-36 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <span className="text-gray-700">Retours & Échanges</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Retours
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Retours & Échanges
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            14 jours pour changer d&apos;avis. Procédure simple, remboursement rapide.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-14">

          {/* Droit de rétractation */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Droit de rétractation</h2>
            </div>
            <dl className="space-y-3">
              <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                <div>
                  <dt className="font-semibold text-gray-900">Délai légal</dt>
                  <dd className="text-sm text-gray-600 mt-1">
                    Vous disposez de 14 jours à compter de la réception pour exercer votre droit de rétractation, conformément au Code de la consommation.
                  </dd>
                </div>
                <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  14 jours
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 py-3">
                <div>
                  <dt className="font-semibold text-gray-900">Remboursement</dt>
                  <dd className="text-sm text-gray-600 mt-1">
                    Dès réception et vérification de votre retour, remboursement effectué sur votre moyen de paiement initial.
                  </dd>
                </div>
                <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  7 jours
                </span>
              </div>
            </dl>
          </section>

          {/* Conditions */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Package className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Conditions de retour</h2>
            </div>
            <p className="text-base text-gray-700 mb-3">
              Pour être accepté, le retour doit respecter les conditions suivantes :
            </p>
            <ul className="space-y-2 text-base text-gray-700">
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Produit <strong>non utilisé</strong> et <strong>non collé</strong> — une plaque déjà posée ne peut pas être retournée</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Emballage d&apos;origine intact, non ouvert</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Demande effectuée dans les 14 jours suivant la réception</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Retour validé au préalable par email</span>
              </li>
            </ul>
            <div className="bg-amber-50 rounded-lg p-4 text-amber-800 border border-amber-200 flex items-start gap-3 mt-5">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm">
                Les plaques déjà collées ou utilisées ne sont ni reprises ni échangées. L&apos;adhésif se détériore au retrait, rendant le produit inutilisable.
              </p>
            </div>
          </section>

          {/* Procédure */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <RotateCcw className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Procédure de retour</h2>
            </div>
            <ol className="space-y-5">
              {procedureSteps.map(({ n, title, text }) => (
                <li key={n} className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-primary text-white text-xs font-bold rounded-full flex-shrink-0">
                    {n}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-0.5">{title}</p>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Échanges */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Package className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Échanges</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Pour échanger votre pack contre un autre, effectuez un retour classique puis passez une nouvelle commande. Cela garantit un traitement rapide et la disponibilité du produit.
            </p>
          </section>

          {/* Produit défectueux — alerte unique conservée pour ce cas spécifique */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Produit défectueux</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Si votre plaque présente un défaut de fabrication (NFC non fonctionnel, impression défectueuse), nous la <strong>remplaçons gratuitement</strong>. Contactez-nous avec une photo du produit et votre numéro de commande à{' '}
              <a href="mailto:bonjour@swiipx.fr" className="text-primary hover:text-blue-700 font-medium underline underline-offset-2">bonjour@swiipx.fr</a>.
            </p>
          </section>

        </div>

        {/* CTA fin de page */}
        <section className="bg-blue-50/40 border border-blue-100 rounded-2xl p-8 mt-16 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Une question sur votre retour&nbsp;?
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
