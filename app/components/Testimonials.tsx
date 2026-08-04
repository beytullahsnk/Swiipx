import { Quote, Zap, ShieldCheck, Truck, CreditCard } from 'lucide-react'
import { clientsWithQuote } from '../data/clients'
import { reviews } from '../data/reviews'
import ClientLogos from './ClientLogos'
import CustomerReviews from './CustomerReviews'

/**
 * Section preuve sociale.
 *
 * Ne contient QUE des éléments vérifiables :
 * - les noms des établissements réellement équipés
 * - les citations réelles (affichées seulement si `quote` est renseignée
 *   dans app/data/clients.ts, après accord du client)
 * - des caractéristiques produit factuelles
 *
 * Aucune note moyenne ni compteur d'avis tant que de vrais avis
 * n'ont pas été collectés.
 */

const productFacts = [
  { icon: Zap, value: '10 s', label: 'Pour laisser un avis' },
  { icon: CreditCard, value: '0 €', label: "D'abonnement" },
  // « À vie », et pas « 2 ans » : c'est l'engagement pris partout ailleurs
  // (métadonnées, fiches produit, FAQ, CGV). Les deux chiffres coexistaient.
  { icon: ShieldCheck, value: 'À vie', label: 'De garantie' },
  { icon: Truck, value: '2-5 j', label: 'De livraison' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Ils utilisent Swiipx
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Des commerces qui collectent déjà leurs avis
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chaque plaque est programmée avec le lien d&apos;avis Google de l&apos;établissement.
            Elle fonctionne dès la sortie du carton.
          </p>
        </div>

        {/* Clients réels — logos, sans compteur ni nom en clair */}
        {/* Sans intitulé : le chapeau de section dit déjà « Ils utilisent
            Swiipx », le répéter deux lignes plus bas faisait doublon. */}
        <ClientLogos titre={null} className="mb-16" />

        {/* Citations réelles — affichées uniquement si collectées */}
        {clientsWithQuote.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {clientsWithQuote.map((client) => (
              <figure
                key={client.name}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <Quote className="w-6 h-6 text-primary/30 mb-3" aria-hidden="true" />
                <blockquote className="text-gray-700 leading-relaxed mb-4">
                  {client.quote}
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-semibold text-gray-900">{client.author}</span>
                  <span className="text-gray-400 mx-1.5">·</span>
                  <span className="text-gray-600">{client.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Avis notés — même source que le balisage aggregateRating de la page
            d'accueil, pour que la note affichée soit toujours celle balisée. */}
        <CustomerReviews avis={reviews} titre="Les avis de nos clients" className="mb-16" />

        {/* Caractéristiques produit — toutes vérifiables */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-200">
          {productFacts.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="w-5 h-5 text-primary mx-auto mb-2.5" aria-hidden="true" />
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">
                {value}
              </p>
              <p className="text-sm text-gray-600 mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
