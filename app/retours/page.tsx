'use client'

import { motion } from 'framer-motion'
import { RotateCcw, CheckCircle, Clock, Mail } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-static'

export default function RetoursPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-2xl mb-6">
            <RotateCcw className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Retours & Échanges
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre satisfaction est notre priorité. Politique de retour simple et sans tracas.
          </p>
        </motion.div>

        {/* Politique de retour */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Satisfait ou remboursé</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-3">
                30 jours pour changer d&apos;avis
              </h3>
              <p className="text-green-800 text-lg leading-relaxed">
                Vous disposez de <strong>30 jours</strong> à compter de la réception de votre commande 
                pour nous retourner vos plaques Swiipx et obtenir un remboursement intégral.
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Nous sommes convaincus de la qualité de nos produits, mais si pour une raison quelconque 
              vous n&apos;êtes pas satisfait, vous pouvez nous retourner votre commande sans avoir à vous justifier.
            </p>
          </div>
        </motion.section>

        {/* Conditions de retour */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conditions de retour</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Produit neuf et non utilisé
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Les plaques doivent être retournées dans leur <strong>emballage d&apos;origine</strong>, 
                  non ouvertes et en parfait état. Les produits endommagés ou utilisés ne pourront pas être remboursés.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Demande de retour obligatoire
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Avant de retourner vos produits, vous devez obligatoirement nous contacter par email 
                  à <a href="mailto:bonjour@swiipx.fr" className="text-primary font-semibold hover:underline">bonjour@swiipx.fr</a> pour 
                  obtenir un numéro de retour (RMA).
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Frais de retour à votre charge
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Les frais de port pour le retour de votre commande sont à votre charge, sauf en cas de produit défectueux ou d&apos;erreur de notre part.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Procédure de retour */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Comment faire un retour ?</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Étape 1 : Contactez-nous</h3>
              <p className="text-gray-700">
                Envoyez un email à <a href="mailto:bonjour@swiipx.fr" className="text-primary font-semibold hover:underline">bonjour@swiipx.fr</a> avec 
                votre numéro de commande et le motif du retour.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Étape 2 : Recevez votre numéro RMA</h3>
              <p className="text-gray-700">
                Nous vous enverrons un numéro de retour (RMA) et l&apos;adresse de retour sous 24h.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Étape 3 : Renvoyez le colis</h3>
              <p className="text-gray-700">
                Emballez soigneusement vos produits, indiquez le numéro RMA sur le colis et expédiez-le à l&apos;adresse indiquée.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Étape 4 : Remboursement sous 7 jours</h3>
              <p className="text-gray-700">
                Dès réception et vérification de votre retour, nous procédons au remboursement sous 7 jours ouvrés 
                sur votre moyen de paiement initial.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Échanges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Échanges</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Si vous souhaitez échanger votre commande contre un autre pack, nous vous invitons à :
          </p>
          <ol className="space-y-3 text-gray-600 leading-relaxed ml-6 list-decimal">
            <li>Effectuer un retour selon la procédure ci-dessus</li>
            <li>Passer une nouvelle commande sur notre site avec le pack souhaité</li>
          </ol>
          <p className="text-gray-600 leading-relaxed mt-4">
            Cette méthode vous garantit la disponibilité immédiate du produit et un traitement plus rapide.
          </p>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl shadow-lg p-8 sm:p-12 border-2 border-primary/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Une question ?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Notre équipe est à votre disposition pour répondre à toutes vos questions concernant 
            les retours et échanges.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contactez-nous
          </Link>
        </motion.section>
      </div>
    </div>
  )
}

