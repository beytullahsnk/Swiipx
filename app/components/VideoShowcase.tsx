'use client'

// Astuce iOS Safari : ajouter `#t=0.1` à l'URL de la vidéo force le navigateur
// à charger le premier frame comme aperçu (sinon écran gris sur iOS).
const videos: { src: string }[] = [
  { src: '/ugc1swiipx.mp4#t=0.1' },
  { src: '/ugc2swiipx.mp4#t=0.1' },
  { src: '/ugc3swiipx.mp4#t=0.1' },
]

export default function VideoShowcase() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Voyez le résultat en action
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nos clients collectent des avis Google en quelques secondes
          </p>
        </div>

        {/* Mobile : slider horizontal (2 vidéos visibles), Desktop : grille 3 colonnes */}
        <div className="max-w-4xl mx-auto">
          {/* Mobile slider — padding égal des 2 côtés (pas de bleed) */}
          <div className="sm:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-2">
            <div className="flex gap-3 pb-4 px-2">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="relative shrink-0 w-[calc(50%-0.375rem)] aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden shadow-lg snap-start"
                >
                  <video
                    src={video.src}
                    controls
                    playsInline
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden shadow-lg"
              >
                <video
                  src={video.src}
                  controls
                  playsInline
                  muted
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
