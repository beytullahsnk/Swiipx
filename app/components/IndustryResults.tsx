import { Utensils, Scissors, Stethoscope, Hotel, Cookie, Store } from 'lucide-react'

/**
 * Section « adapté à votre métier ».
 *
 * Volontairement SANS pourcentage de résultat : aucune moyenne de performance
 * ne peut être affirmée tant qu'elle n'a pas été mesurée sur un échantillon réel.
 * On répond à la vraie question du visiteur — « où je la mets, chez moi ? » —
 * avec un conseil concret et vérifiable.
 */
const industries = [
  { icon: Utensils, name: 'Restaurants', placement: 'Sur le porte-addition' },
  { icon: Cookie, name: 'Boulangeries', placement: 'À côté du terminal de paiement' },
  { icon: Scissors, name: 'Salons de coiffure', placement: 'Sur le miroir du poste' },
  { icon: Stethoscope, name: 'Cabinets médicaux', placement: "Au comptoir d'accueil" },
  { icon: Store, name: 'Commerces & épiceries', placement: 'En caisse' },
  { icon: Hotel, name: 'Hôtels & gîtes', placement: 'À la réception' },
]

export default function IndustryResults() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Adapté à votre métier
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Où placer votre plaque
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            L&apos;emplacement fait toute la différence : la plaque doit être visible
            au moment où le client a déjà son téléphone en main.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {industries.map(({ icon: Icon, name, placement }) => (
            <div
              key={name}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-gray-900">
                  {name}
                </span>
              </div>
              <p className="text-sm text-gray-600 pl-12">{placement}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 text-center mt-8">
          Un doute sur le meilleur emplacement chez vous ?{' '}
          <a
            href="/blog/ou-placer-plaque-avis-google"
            className="text-primary hover:text-blue-700 font-medium underline underline-offset-2"
          >
            Voir le guide des 7 emplacements
          </a>
        </p>
      </div>
    </section>
  )
}
