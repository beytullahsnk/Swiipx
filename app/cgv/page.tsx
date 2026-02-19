'use client'

import { motion } from 'framer-motion'
import { FileText, ShoppingCart, CreditCard, Shield, RefreshCw } from 'lucide-react'

export const dynamic = 'force-static'

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En vigueur au 14 novembre 2025
          </p>
        </motion.div>

        {/* Article 1 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Article 1 - Objet</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
              entre <strong>Swiipx SAS</strong> (ci-après « le Vendeur ») et toute personne physique ou morale 
              (ci-après « l&apos;Acheteur » ou « le Client ») souhaitant effectuer un achat sur le site{' '}
              <strong>swiipx.fr</strong>.
            </p>
            <p>
              Toute commande passée sur le site implique l&apos;acceptation sans réserve des présentes CGV.
            </p>
          </div>
        </motion.section>

        {/* Article 2 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <ShoppingCart className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Article 2 - Produits et commandes</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">2.1 Produits</strong><br />
              Swiipx commercialise des plaques NFC/QR permettant de collecter des avis Google de manière 
              simplifiée. Les caractéristiques essentielles des produits sont présentées sur le site.
            </p>
            <p>
              <strong className="text-gray-900">2.2 Commandes</strong><br />
              Les commandes peuvent être passées 24h/24 et 7j/7 sur le site <strong>swiipx.fr</strong>. 
              Le Client sélectionne les produits souhaités, les ajoute au panier et valide sa commande 
              après avoir renseigné ses coordonnées et choisi son mode de paiement.
            </p>
            <p>
              <strong className="text-gray-900">2.3 Confirmation de commande</strong><br />
              Une fois le paiement validé, le Client reçoit un email de confirmation récapitulant les détails 
              de sa commande (produits, quantités, prix, adresse de livraison).
            </p>
            <p>
              <strong className="text-gray-900">2.4 Disponibilité</strong><br />
              Nos produits sont proposés dans la limite des stocks disponibles. En cas d&apos;indisponibilité 
              d&apos;un produit après passation de la commande, le Client en sera informé dans les plus brefs 
              délais et pourra choisir un remboursement intégral.
            </p>
          </div>
        </motion.section>

        {/* Article 3 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <CreditCard className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Article 3 - Prix et paiement</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">3.1 Prix</strong><br />
              Les prix sont indiqués en euros (€) toutes taxes comprises (TTC), incluant la TVA française 
              au taux en vigueur. Les prix affichés sur le site sont ceux applicables au jour de la commande.
            </p>
            <p>
              <strong className="text-gray-900">3.2 Frais de livraison</strong><br />
              La livraison est <strong>gratuite</strong> sur toutes les commandes, sans minimum d&apos;achat.
            </p>
            <p>
              <strong className="text-gray-900">3.3 Moyens de paiement</strong><br />
              Le règlement s&apos;effectue par carte bancaire (Visa, Mastercard, American Express) via notre 
              solution de paiement sécurisé <strong>Stripe</strong>. Le paiement est exigible immédiatement 
              à la commande.
            </p>
            <p>
              <strong className="text-gray-900">3.4 Sécurité des paiements</strong><br />
              Toutes les transactions sont sécurisées par protocole SSL. Swiipx ne conserve aucune donnée 
              bancaire sur ses serveurs. Les informations de paiement sont traitées exclusivement par Stripe, 
              certifié PCI-DSS niveau 1.
            </p>
          </div>
        </motion.section>

        {/* Article 4 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Article 4 - Livraison</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">4.1 Zone de livraison</strong><br />
              Nous livrons en France métropolitaine, Corse, DOM-TOM et Monaco.
            </p>
            <p>
              <strong className="text-gray-900">4.2 Délais de livraison</strong><br />
              Les commandes sont expédiées sous <strong>24h ouvrées</strong> après validation du paiement. 
              Les délais de livraison sont de :
            </p>
            <ul className="ml-6 space-y-2 list-disc">
              <li>France métropolitaine : 2 à 4 jours ouvrés</li>
              <li>DOM-TOM et Corse : 5 à 7 jours ouvrés</li>
            </ul>
            <p>
              <strong className="text-gray-900">4.3 Suivi de colis</strong><br />
              Un numéro de suivi est communiqué par email dès l&apos;expédition de la commande.
            </p>
            <p>
              <strong className="text-gray-900">4.4 Réception</strong><br />
              En cas d&apos;absence lors de la livraison, un avis de passage sera déposé. Le Client dispose 
              alors de 15 jours pour retirer son colis au bureau de poste ou point relais indiqué.
            </p>
            <p>
              Pour plus d&apos;informations, consultez notre page{' '}
              <a href="/livraison" className="text-primary font-semibold hover:underline">
                Expédition & Livraison
              </a>.
            </p>
          </div>
        </motion.section>

        {/* Article 5 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <RefreshCw className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Article 5 - Droit de rétractation</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">5.1 Délai de rétractation</strong><br />
              Conformément aux articles L221-18 et suivants du Code de la consommation, le Client dispose 
              d&apos;un délai de <strong>30 jours</strong> à compter de la réception de sa commande pour exercer 
              son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalité.
            </p>
            <p>
              <strong className="text-gray-900">5.2 Conditions</strong><br />
              Les produits retournés doivent être dans leur emballage d&apos;origine, en parfait état, non ouverts 
              et non utilisés. Les frais de retour sont à la charge du Client, sauf en cas de produit défectueux 
              ou d&apos;erreur de notre part.
            </p>
            <p>
              <strong className="text-gray-900">5.3 Remboursement</strong><br />
              Le remboursement est effectué dans un délai de <strong>14 jours</strong> suivant la réception 
              et la vérification du produit retourné, sur le même moyen de paiement que celui utilisé lors 
              de la commande.
            </p>
            <p>
              Pour plus d&apos;informations, consultez notre page{' '}
              <a href="/retours" className="text-primary font-semibold hover:underline">
                Retours & Échanges
              </a>.
            </p>
          </div>
        </motion.section>

        {/* Article 6 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Article 6 - Garanties</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">6.1 Garantie légale de conformité</strong><br />
              Tous nos produits bénéficient de la garantie légale de conformité (articles L217-4 à L217-14 
              du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 à 1649 
              du Code civil).
            </p>
            <p>
              <strong className="text-gray-900">6.2 Garantie commerciale</strong><br />
              Les plaques Swiipx sont garanties <strong>2 ans</strong> contre tout défaut de fabrication. 
              En cas de défaillance technique non imputable à une mauvaise utilisation, nous procédons au 
              remplacement gratuit du produit.
            </p>
          </div>
        </motion.section>

        {/* Article 7 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Article 7 - Responsabilité et force majeure
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Swiipx met tout en œuvre pour assurer la disponibilité et la qualité de ses services. 
              Toutefois, sa responsabilité ne saurait être engagée en cas de force majeure ou d&apos;événements 
              indépendants de sa volonté (panne réseau, grève des transporteurs, catastrophe naturelle, etc.).
            </p>
          </div>
        </motion.section>

        {/* Article 8 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Article 8 - Protection des données personnelles
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Les données personnelles collectées sur le site sont traitées conformément au RGPD et à la 
              loi Informatique et Libertés. Vous disposez d&apos;un droit d&apos;accès, de rectification et de 
              suppression de vos données.
            </p>
            <p>
              Pour plus d&apos;informations, consultez notre page{' '}
              <a href="/mentions-legales" className="text-primary font-semibold hover:underline">
                Mentions Légales
              </a>.
            </p>
          </div>
        </motion.section>

        {/* Article 9 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Article 9 - Droit applicable et litiges
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable 
              sera recherchée avant toute action judiciaire.
            </p>
            <p>
              À défaut d&apos;accord amiable, le tribunal compétent sera celui du ressort de <strong>Paris</strong>.
            </p>
            <p>
              Conformément à l&apos;article L612-1 du Code de la consommation, le Client peut recourir gratuitement 
              à un médiateur de la consommation en vue de la résolution amiable du litige qui l&apos;opposerait 
              au Vendeur.
            </p>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl shadow-lg p-8 sm:p-12 border-2 border-primary/20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Une question sur nos CGV ?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Notre équipe est à votre disposition pour toute question relative à nos Conditions Générales de Vente.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contactez-nous
          </a>
        </motion.section>
      </div>
    </div>
  )
}

