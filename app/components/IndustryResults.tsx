import { Utensils, Scissors, Stethoscope, Hotel, Cookie, Car } from 'lucide-react'

const industries = [
  { icon: Utensils, name: 'Restaurants', growth: '+180%' },
  { icon: Scissors, name: 'Salons de coiffure', growth: '+220%' },
  { icon: Stethoscope, name: 'Cabinets médicaux', growth: '+150%' },
  { icon: Hotel, name: 'Hôtels & gîtes', growth: '+160%' },
  { icon: Cookie, name: 'Boulangeries', growth: '+200%' },
  { icon: Car, name: 'Auto-écoles', growth: '+140%' },
]

export default function IndustryResults() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Résultats par secteur
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Adapté à votre métier
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Augmentation moyenne d&apos;avis Google observée sur 3 mois après la mise en place.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {industries.map(({ icon: Icon, name, growth }) => (
            <div
              key={name}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:border-primary/40 transition-colors flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
            >
              {/* Icône + nom — stack vertical sur mobile, horizontal sur desktop */}
              <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-900 leading-tight">
                  {name}
                </span>
              </div>
              {/* % */}
              <span className="text-xl sm:text-lg font-bold text-primary tabular-nums leading-none pl-12 sm:pl-0">
                {growth}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center mt-6 max-w-xl mx-auto">
          Moyennes constatées sur l&apos;ensemble de nos clients par secteur. Résultats variables selon l&apos;emplacement et la régularité d&apos;utilisation.
        </p>
      </div>
    </section>
  )
}
