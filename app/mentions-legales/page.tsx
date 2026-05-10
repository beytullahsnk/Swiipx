'use client'

import Link from 'next/link'
import { Building2, User, Shield, Scale, Globe, Cookie, ChevronRight } from 'lucide-react'

const editorInfo = [
  { label: 'Nom commercial', value: 'SKYAKSA' },
  { label: 'Forme juridique', value: 'Entrepreneur individuel' },
  { label: 'SIRET', value: '948 165 717 00026' },
  { label: 'N° TVA', value: 'FR02948165717' },
  { label: 'Code APE', value: '4791A' },
  { label: 'Siège social', value: '9 Rue Marcel Sembat, 93100 Montreuil' },
]

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero band */}
      <div className="bg-gradient-to-b from-blue-50/50 to-transparent pt-36 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <span className="text-gray-700">Mentions Légales</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Mentions Légales
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Mentions Légales
          </h1>
          <p className="text-base text-gray-500">
            Informations légales relatives au site swiipx.fr.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-14">

          {/* Éditeur */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Éditeur du site</h2>
            </div>
            <dl className="space-y-2.5">
              {editorInfo.map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-2.5 border-b border-gray-100">
                  <dt className="text-sm text-gray-500">{label}</dt>
                  <dd className="text-sm font-semibold text-gray-900 sm:text-right">{value}</dd>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-2.5">
                <dt className="text-sm text-gray-500">Email</dt>
                <dd>
                  <a href="mailto:bonjour@swiipx.fr" className="text-sm font-semibold text-primary hover:text-blue-700 underline underline-offset-2">bonjour@swiipx.fr</a>
                </dd>
              </div>
            </dl>
          </section>

          {/* Directeur de publication */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Directeur de publication</h2>
            </div>
            <p className="text-base text-gray-700">
              <span className="font-semibold text-gray-900">Beytullah Sonkaya</span> — Dirigeant de SKYAKSA
            </p>
          </section>

          {/* Hébergeur */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Hébergement</h2>
            </div>
            <dl className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-2.5 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Hébergeur</dt>
                <dd className="text-sm font-semibold text-gray-900 sm:text-right">OVH SAS</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-2.5 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Adresse</dt>
                <dd className="text-sm font-semibold text-gray-900 sm:text-right">2 Rue Kellermann, 59100 Roubaix</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-2.5">
                <dt className="text-sm text-gray-500">Site web</dt>
                <dd>
                  <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:text-blue-700 underline underline-offset-2">ovhcloud.com</a>
                </dd>
              </div>
            </dl>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Propriété intellectuelle</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
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
              <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Protection des données</h2>
            </div>
            <div className="space-y-3 text-base text-gray-700 leading-relaxed">
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:bonjour@swiipx.fr" className="text-primary hover:text-blue-700 font-medium underline underline-offset-2">bonjour@swiipx.fr</a>.
              </p>
              <p>
                Les données collectées sont utilisées exclusivement pour le traitement de vos commandes. Elles ne sont jamais transmises à des tiers sans votre consentement.
              </p>
              <p className="text-sm text-gray-500 pt-2">
                Responsable du traitement : SKYAKSA — 9 Rue Marcel Sembat, 93100 Montreuil.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Le site utilise des cookies pour améliorer votre expérience de navigation et réaliser des statistiques de visite. Vous pouvez les désactiver depuis les paramètres de votre navigateur.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900">Droit applicable</h2>
            </div>
            <p className="text-base text-gray-700">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, le tribunal compétent sera celui de <strong>Bobigny</strong>.
            </p>
          </section>

        </div>

        {/* CTA fin de page */}
        <section className="bg-blue-50/40 border border-blue-100 rounded-2xl p-8 mt-16 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Une question légale&nbsp;?
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
