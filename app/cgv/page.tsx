'use client'

import Link from 'next/link'
import { FileText, ShoppingCart, CreditCard, Truck, RotateCcw, Shield, Scale, ChevronRight, Lock } from 'lucide-react'

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero band */}
      <div className="bg-gradient-to-b from-blue-50/50 to-transparent pt-36 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <span className="text-gray-700">CGV</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Conditions Générales
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Conditions Générales de Vente
          </h1>
          <p className="text-base text-gray-500">
            En vigueur au 14 novembre 2025.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-14">

          {/* Article 1 — Objet */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 1 — Objet</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Les présentes CGV régissent les ventes entre <strong>SKYAKSA</strong> (entrepreneur individuel, SIRET 948 165 717 00026) et tout client passant commande sur le site <strong>swiipx.fr</strong>.
              </p>
              <p>
                Toute commande implique l&apos;acceptation sans réserve des présentes conditions.
              </p>
            </div>
          </section>

          {/* Article 2 — Produits et commandes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 2 — Produits et commandes</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Swiipx commercialise des plaques NFC/QR Code permettant de collecter des avis Google. Les caractéristiques sont présentées sur le site.
              </p>
              <p>
                Les commandes sont passables 24h/24 sur swiipx.fr. Un email de confirmation est envoyé dès le paiement validé.
              </p>
              <p>
                Nos produits sont proposés dans la limite des stocks disponibles. En cas d&apos;indisponibilité, le client sera informé et pourra être remboursé intégralement.
              </p>
            </div>
          </section>

          {/* Article 3 — Prix et paiement */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 3 — Prix et paiement</h2>
            </div>
            <dl className="space-y-3">
              <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                <div>
                  <dt className="font-semibold text-gray-900">Prix</dt>
                  <dd className="text-sm text-gray-600 mt-1">
                    Les prix incluent la TVA au taux en vigueur et sont ceux applicables au jour de la commande.
                  </dd>
                </div>
                <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  TTC en €
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                <div>
                  <dt className="font-semibold text-gray-900">Livraison</dt>
                  <dd className="text-sm text-gray-600 mt-1">
                    Sur toutes les commandes, sans minimum d&apos;achat.
                  </dd>
                </div>
                <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  Gratuite
                </span>
              </div>
              <div className="py-3">
                <dt className="font-semibold text-gray-900">Moyens de paiement</dt>
                <dd className="text-sm text-gray-600 mt-1">
                  Carte bancaire (Visa, Mastercard, American Express) via <strong>Stripe</strong>. Paiement exigible immédiatement à la commande.
                </dd>
              </div>
            </dl>
            <p className="flex items-start gap-2 mt-4 text-sm text-gray-500">
              <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>Transactions sécurisées par protocole SSL. Swiipx ne conserve aucune donnée bancaire. Stripe est certifié PCI-DSS niveau 1.</span>
            </p>
          </section>

          {/* Article 4 — Livraison */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 4 — Livraison</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Nous livrons en France métropolitaine, Corse, DOM-TOM et Monaco. Expédition sous 24h ouvrées après validation du paiement.
              </p>
              <dl className="space-y-2 pt-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <dt className="font-semibold text-gray-900">France Métropolitaine</dt>
                  <dd className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">2-5 jours ouvrés</dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="font-semibold text-gray-900">DOM-TOM & Corse</dt>
                  <dd className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">5-7 jours ouvrés</dd>
                </div>
              </dl>
              <p>
                Un numéro de suivi est communiqué par email dès l&apos;expédition. En cas d&apos;absence, un avis de passage sera déposé (retrait sous 15 jours). Plus d&apos;infos sur notre page{' '}
                <Link href="/livraison" className="text-primary hover:text-blue-700 font-medium underline underline-offset-2">Expédition & Livraison</Link>.
              </p>
            </div>
          </section>

          {/* Article 5 — Rétractation */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 5 — Droit de rétractation</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Conformément aux articles L221-18 du Code de la consommation, le client dispose de <strong>14 jours</strong> après réception pour exercer son droit de rétractation.
              </p>
              <p>
                Les produits doivent être retournés dans leur emballage d&apos;origine, non utilisés et non collés. Les frais de retour sont à la charge du client, sauf produit défectueux.
              </p>
              <p>
                Le remboursement intervient sous <strong>14 jours</strong> après réception et vérification du retour, sur le moyen de paiement initial. Plus d&apos;infos sur notre page{' '}
                <Link href="/retours" className="text-primary hover:text-blue-700 font-medium underline underline-offset-2">Retours & Échanges</Link>.
              </p>
            </div>
          </section>

          {/* Article 6 — Garanties */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 6 — Garanties</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Nos produits bénéficient de la garantie légale de conformité (articles L217-4 à L217-14 du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 à 1649 du Code civil).
              </p>
              <p>
                Une <strong>garantie commerciale de 2 ans</strong> couvre tout défaut de fabrication. Remplacement gratuit en cas de défaillance technique non imputable à une mauvaise utilisation.
              </p>
            </div>
          </section>

          {/* Article 7 — Responsabilité */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 7 — Responsabilité</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Swiipx met tout en œuvre pour assurer la disponibilité et la qualité de ses services. Sa responsabilité ne saurait être engagée en cas de force majeure (panne réseau, grève des transporteurs, catastrophe naturelle, etc.).
            </p>
          </section>

          {/* Article 8 — Données personnelles */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 8 — Données personnelles</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Les données collectées sont traitées conformément au RGPD. Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression. Plus d&apos;infos sur notre page{' '}
              <Link href="/mentions-legales" className="text-primary hover:text-blue-700 font-medium underline underline-offset-2">Mentions Légales</Link>.
            </p>
          </section>

          {/* Article 9 — Litiges */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Article 9 — Litiges</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, le tribunal compétent sera celui de <strong>Paris</strong>.
              </p>
              <p>
                Le client peut recourir gratuitement à un médiateur de la consommation (article L612-1 du Code de la consommation).
              </p>
            </div>
          </section>

        </div>

        {/* CTA fin de page */}
        <section className="bg-blue-50/40 border border-blue-100 rounded-2xl p-8 mt-16 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Une question sur nos CGV&nbsp;?
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
