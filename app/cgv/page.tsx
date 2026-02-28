'use client'

import Link from 'next/link'
import { FileText, ShoppingCart, CreditCard, Truck, RotateCcw, Shield, Scale, ChevronRight, Lock } from 'lucide-react'

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <span className="text-gray-900 font-medium">Conditions Générales de Vente</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Conditions Générales de Vente
        </h1>
        <p className="text-gray-500 mb-12">
          En vigueur au 14 novembre 2025.
        </p>

        {/* Content sections */}
        <div className="space-y-12">

          {/* Article 1 — Objet */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 1 — Objet</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
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
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 2 — Produits et commandes</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
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
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 3 — Prix et paiement</h2>
            </div>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-200">
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Prix</span>
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">TTC en euros</span>
                </div>
                <p className="text-sm text-gray-600">
                  Les prix incluent la TVA au taux en vigueur et sont ceux applicables au jour de la commande.
                </p>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Livraison</span>
                  <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">Gratuite</span>
                </div>
                <p className="text-sm text-gray-600">
                  Sur toutes les commandes, sans minimum d&apos;achat.
                </p>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Moyens de paiement</span>
                </div>
                <p className="text-sm text-gray-600">
                  Carte bancaire (Visa, Mastercard, American Express) via <strong>Stripe</strong>. Paiement exigible immédiatement à la commande.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 border border-gray-100 mt-3 flex items-start gap-2">
              <Lock className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <span>Transactions sécurisées par protocole SSL. Swiipx ne conserve aucune donnée bancaire. Stripe est certifié PCI-DSS niveau 1.</span>
            </div>
          </section>

          {/* Article 4 — Livraison */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 4 — Livraison</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Nous livrons en France métropolitaine, Corse, DOM-TOM et Monaco. Expédition sous 24h ouvrées après validation du paiement.
              </p>
              <div className="border border-gray-200 rounded-xl divide-y divide-gray-200">
                <div className="p-5 flex items-center justify-between">
                  <span className="text-gray-900 font-semibold">France Métropolitaine</span>
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">2-3 jours ouvrés</span>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <span className="text-gray-900 font-semibold">DOM-TOM & Corse</span>
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">5-7 jours ouvrés</span>
                </div>
              </div>
              <p>
                Un numéro de suivi est communiqué par email dès l&apos;expédition. En cas d&apos;absence, un avis de passage sera déposé (retrait sous 15 jours). Plus d&apos;infos sur notre page{' '}
                <Link href="/livraison" className="text-primary font-semibold hover:underline">Expédition & Livraison</Link>.
              </p>
            </div>
          </section>

          {/* Article 5 — Rétractation */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 5 — Droit de rétractation</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Conformément aux articles L221-18 du Code de la consommation, le client dispose de <strong>14 jours</strong> après réception pour exercer son droit de rétractation.
              </p>
              <p>
                Les produits doivent être retournés dans leur emballage d&apos;origine, non utilisés et non collés. Les frais de retour sont à la charge du client, sauf produit défectueux.
              </p>
              <p>
                Le remboursement intervient sous <strong>14 jours</strong> après réception et vérification du retour, sur le moyen de paiement initial. Plus d&apos;infos sur notre page{' '}
                <Link href="/retours" className="text-primary font-semibold hover:underline">Retours & Échanges</Link>.
              </p>
            </div>
          </section>

          {/* Article 6 — Garanties */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 6 — Garanties</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Nos produits bénéficient de la garantie légale de conformité (articles L217-4 à L217-14 du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 à 1649 du Code civil).
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="font-bold text-green-900 text-base mb-1">Garantie commerciale : 2 ans</p>
                <p className="text-sm text-green-800">
                  Les plaques Swiipx sont garanties 2 ans contre tout défaut de fabrication. Remplacement gratuit en cas de défaillance technique non imputable à une mauvaise utilisation.
                </p>
              </div>
            </div>
          </section>

          {/* Article 7 — Responsabilité */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 7 — Responsabilité</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Swiipx met tout en œuvre pour assurer la disponibilité et la qualité de ses services. Sa responsabilité ne saurait être engagée en cas de force majeure (panne réseau, grève des transporteurs, catastrophe naturelle, etc.).
              </p>
            </div>
          </section>

          {/* Article 8 — Données personnelles */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 8 — Données personnelles</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Les données collectées sont traitées conformément au RGPD. Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression. Plus d&apos;infos sur notre page{' '}
                <Link href="/mentions-legales" className="text-primary font-semibold hover:underline">Mentions Légales</Link>.
              </p>
            </div>
          </section>

          {/* Article 9 — Litiges */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Article 9 — Litiges</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, le tribunal compétent sera celui de <strong>Paris</strong>.
              </p>
              <p>
                Le client peut recourir gratuitement à un médiateur de la consommation (article L612-1 du Code de la consommation).
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Une question ?</h2>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Notre équipe est disponible pour toute question relative à nos CGV.
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
