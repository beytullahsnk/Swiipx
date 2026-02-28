'use client'

import Link from 'next/link'
import { Building2, User, Shield, Scale, Globe, Cookie, ChevronRight } from 'lucide-react'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Mentions Légales</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Mentions Légales
        </h1>
        <p className="text-gray-500 mb-12">
          Informations légales relatives au site swiipx.fr.
        </p>

        {/* Content sections */}
        <div className="space-y-12">

          {/* Éditeur */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Éditeur du site</h2>
            </div>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-200">
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Nom commercial</span>
                <span className="text-sm font-semibold text-gray-900">SKYAKSA</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Forme juridique</span>
                <span className="text-sm font-semibold text-gray-900">Entrepreneur individuel</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">SIRET</span>
                <span className="text-sm font-semibold text-gray-900">948 165 717 00026</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">N° TVA</span>
                <span className="text-sm font-semibold text-gray-900">FR02948165717</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Code APE</span>
                <span className="text-sm font-semibold text-gray-900">4791A</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Siège social</span>
                <span className="text-sm font-semibold text-gray-900 text-right">9 Rue Marcel Sembat, 93100 Montreuil</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Email</span>
                <a href="mailto:bonjour@swiipx.fr" className="text-sm font-semibold text-primary hover:underline">bonjour@swiipx.fr</a>
              </div>
            </div>
          </section>

          {/* Directeur de publication */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Directeur de publication</h2>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <span className="text-sm text-gray-900 font-semibold">Beytullah Sonkaya</span>
              <span className="text-sm text-gray-600"> — Dirigeant de SKYAKSA</span>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Hébergement</h2>
            </div>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-200">
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Hébergeur</span>
                <span className="text-sm font-semibold text-gray-900">OVH SAS</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Adresse</span>
                <span className="text-sm font-semibold text-gray-900 text-right">2 Rue Kellermann, 59100 Roubaix</span>
              </div>
              <div className="p-5 flex justify-between">
                <span className="text-sm text-gray-600">Site web</span>
                <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline">ovhcloud.com</a>
              </div>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Propriété intellectuelle</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                L&apos;ensemble du contenu du site swiipx.fr (textes, logos, images, vidéos) est la propriété exclusive de SKYAKSA et est protégé par les lois relatives à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction ou utilisation non autorisée est interdite sans accord écrit préalable.
              </p>
            </div>
          </section>

          {/* Données personnelles */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Protection des données</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:bonjour@swiipx.fr" className="text-primary font-semibold hover:underline">bonjour@swiipx.fr</a>.
              </p>
              <p>
                Les données collectées sont utilisées exclusivement pour le traitement de vos commandes. Elles ne sont jamais transmises à des tiers sans votre consentement.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-600 border border-gray-100">
                Responsable du traitement : SKYAKSA — 9 Rue Marcel Sembat, 93100 Montreuil.
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Cookies</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Le site utilise des cookies pour améliorer votre expérience de navigation et réaliser des statistiques de visite. Vous pouvez les désactiver depuis les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Droit applicable</h2>
            </div>
            <p className="text-sm text-gray-700">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, le tribunal compétent sera celui de <strong>Bobigny</strong>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
