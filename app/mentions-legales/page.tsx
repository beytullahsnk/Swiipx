'use client'

import { motion } from 'framer-motion'
import { Scale, Building2, User, Shield } from 'lucide-react'

export const dynamic = 'force-static'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6">
            <Scale className="w-10 h-10 text-gray-700" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Mentions Légales
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informations légales relatives au site Swiipx
          </p>
        </motion.div>

        {/* Éditeur du site */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Building2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Éditeur du site</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Le site <strong className="text-gray-900">swiipx.fr</strong> est un service édité par :
            </p>
            <p>
              <strong className="text-gray-900">Nom commercial :</strong> SKYAKSA
            </p>
            <p>
              <strong className="text-gray-900">Forme juridique :</strong> Entrepreneur individuel
            </p>
            <p>
              <strong className="text-gray-900">SIRET :</strong> 948 165 717 00026
            </p>
            <p>
              <strong className="text-gray-900">N° TVA intracommunautaire :</strong> FR02948165717
            </p>
            <p>
              <strong className="text-gray-900">Code APE :</strong> 4791A — Vente à distance sur catalogue général
            </p>
            <p>
              <strong className="text-gray-900">Siège social :</strong> 9 Rue Marcel Sembat, 93100 Montreuil, France
            </p>
            <p>
              <strong className="text-gray-900">Email :</strong>{' '}
              <a href="mailto:bonjour@swiipx.fr" className="text-primary hover:underline">
                bonjour@swiipx.fr
              </a>
            </p>
          </div>
        </motion.section>

        {/* Directeur de publication */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Directeur de publication</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Nom :</strong> Beytullah Sonkaya, Dirigeant de SKYAKSA
          </p>
        </motion.section>

        {/* Hébergeur */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Hébergement</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">Hébergeur :</strong> OVH SAS
            </p>
            <p>
              <strong className="text-gray-900">Adresse :</strong> 2 Rue Kellermann, 59100 Roubaix, France
            </p>
            <p>
              <strong className="text-gray-900">Site web :</strong>{' '}
              <a
                href="https://www.ovhcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ovhcloud.com
              </a>
            </p>
          </div>
        </motion.section>

        {/* Propriété intellectuelle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Propriété intellectuelle</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              L&apos;ensemble du contenu du site <strong>swiipx.fr</strong> (structure, textes, logos, images, 
              vidéos, etc.) est la propriété exclusive de <strong>SKYAKSA</strong> ou de ses partenaires, 
              et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, transmission, dénaturation, 
              totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque 
              support que ce soit est interdite sans l&apos;autorisation écrite préalable de SKYAKSA.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de son contenu engage la responsabilité civile 
              et/ou pénale de l&apos;utilisateur.
            </p>
          </div>
        </motion.section>

        {/* Protection des données */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Protection des données personnelles</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
              Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression 
              et d&apos;opposition aux données personnelles vous concernant.
            </p>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter par email à{' '}
              <a href="mailto:bonjour@swiipx.fr" className="text-primary hover:underline">
                bonjour@swiipx.fr
              </a>{' '}
              ou par courrier à l&apos;adresse du siège social.
            </p>
            <p>
              <strong className="text-gray-900">Responsable du traitement des données :</strong> SKYAKSA
            </p>
            <p>
              Les données collectées sur ce site sont exclusivement utilisées pour le traitement de 
              vos commandes et l&apos;amélioration de nos services. Elles ne sont jamais transmises à des tiers 
              sans votre consentement explicite.
            </p>
          </div>
        </motion.section>

        {/* Cookies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookies</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Le site <strong>swiipx.fr</strong> utilise des cookies pour améliorer votre expérience 
              de navigation et réaliser des statistiques de visite.
            </p>
            <p>
              Vous pouvez à tout moment désactiver les cookies depuis les paramètres de votre navigateur. 
              Cependant, cela peut affecter certaines fonctionnalités du site.
            </p>
          </div>
        </motion.section>

        {/* Droit applicable */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-3xl shadow-lg p-8 sm:p-12 border-2 border-gray-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Droit applicable et juridiction</h2>
          <p className="text-gray-700 leading-relaxed">
            Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut 
            d&apos;accord amiable, le tribunal compétent sera celui de <strong>Bobigny</strong>.
          </p>
        </motion.section>
      </div>
    </div>
  )
}

