import { Smartphone, Star, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Smartphone,
    title: 'Scannez la plaque avis Google',
    description:
      'Vos clients approchent leur téléphone de la plaque avis Google NFC ou scannent le QR code. Aucune application nécessaire.',
  },
  {
    icon: Star,
    title: 'Laissez un avis en 10s',
    description:
      'Ils sont redirigés directement vers votre page Google. Un simple clic pour laisser leurs étoiles.',
  },
  {
    icon: TrendingUp,
    title: 'Gagnez en visibilité',
    description:
      "Plus d'avis = meilleur référencement local. Attirez plus de clients grâce à votre réputation.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comment fonctionne notre plaque avis Google&nbsp;?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            3 étapes ultra-simples pour transformer chaque client en avis Google 5 étoiles
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="relative bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:border-primary/30 transition-colors h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2">
                    <svg
                      className="w-12 lg:w-16 h-6 text-primary/30"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/#product"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Voir les packs disponibles
          </a>
        </div>
      </div>
    </section>
  )
}
