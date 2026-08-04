/**
 * Section vidéo de la page d'accueil.
 *
 * Server Component : rien ici n'est interactif, l'élément <video> natif gère
 * seul la lecture. Cela évite d'embarquer ce composant dans le bundle client.
 */

interface Video {
  src: string
  poster: string
  name: string
  description: string
}

/**
 * CADRAGE : 9/16, le format mobile natif des sources.
 *
 * ATTENTION AU PIÈGE : ces MP4 ont une trame CODÉE de 720x720 mais des pixels
 * non carrés. Leur dimension d'AFFICHAGE réelle est 720x1280, soit du 9/16 —
 * c'est ce que rapporte `video.videoWidth/videoHeight` dans le navigateur, et
 * c'est ce qui fait foi.
 *
 * Les outils qui lisent la trame codée sans tenir compte du rapport de pixels
 * (OpenCV, entre autres) annoncent 720x720 et donnent une image écrasée
 * verticalement. Se fier à eux conduit à choisir un cadrage carré, et donc à
 * déformer la vidéo à l'écran.
 *
 * Le conteneur étant en 9/16 comme la source, `object-cover` ne rogne
 * strictement rien : l'image s'inscrit exactement.
 *
 * Les vignettes de `public/*-poster-v2.jpg` sont générées en 720x1280 pour la
 * même raison — extraites en 720x720, elles apparaissaient écrasées avant que
 * la vidéo ne se charge.
 */
const videos: Video[] = [
  {
    src: '/ugc1swiipx.mp4',
    // Suffixe -v2 : l'ancienne URL est figee dans les navigateurs par un
    // en-tete `immutable` d'un an. Changer le nom est le seul moyen de leur
    // faire recharger la vignette corrigee.
    poster: '/ugc1swiipx-poster-v2.jpg',
    name: 'La plaque NFC Swiipx présentée en situation',
    description:
      "Présentation de la plaque avis Google Swiipx : le client approche son téléphone de la plaque et accède directement au formulaire d'avis Google.",
  },
  {
    src: '/ugc2swiipx.mp4',
    poster: '/ugc2swiipx-poster-v2.jpg',
    name: 'Comment fonctionne la plaque avis Google NFC',
    description:
      "Démonstration du fonctionnement de la plaque NFC Swiipx : aucune application à installer, la redirection vers la fiche Google est immédiate.",
  },
  {
    src: '/ugc3swiipx.mp4',
    poster: '/ugc3swiipx-poster-v2.jpg',
    name: 'Collecter des avis Google en 10 secondes',
    description:
      "La plaque NFC Swiipx en usage courant dans un commerce : le parcours complet, de l'approche du téléphone à la rédaction de l'avis.",
  },
]

const DUREE_ISO = 'PT8S' // 8 s — mesuré sur les fichiers sources

/**
 * Mise en ligne des vidéos, au format ISO 8601 COMPLET.
 *
 * Search Console refusait « 2026-05-09 » : contrairement à `datePublished`,
 * `uploadDate` exige l'heure ET le décalage horaire, une date seule est rejetée.
 *
 * Le décalage suit l'heure légale française à cette date : +02:00 de fin mars
 * à fin octobre, +01:00 le reste de l'année. Pour une nouvelle vidéo, prendre
 * celui de la saison — un +01:00 en juillet resterait accepté par Google, mais
 * daterait la vidéo d'une heure trop tôt.
 */
const DATE_PUBLICATION = '2026-05-09T10:00:00+02:00'

export default function VideoShowcase() {
  /* VideoObject : sans ce balisage, Google n'a aucun moyen de savoir que la page
     contient des vidéos. thumbnailUrl et uploadDate sont obligatoires, name et
     description le sont aussi — d'où les vignettes extraites des fichiers. */
  const videoJsonLd = videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.name,
    description: v.description,
    thumbnailUrl: [`https://swiipx.fr${v.poster}`],
    uploadDate: DATE_PUBLICATION,
    duration: DUREE_ISO,
    contentUrl: `https://swiipx.fr${v.src}`,
    isFamilyFriendly: true,
    inLanguage: 'fr-FR',
    publisher: {
      '@type': 'Organization',
      name: 'Swiipx',
      url: 'https://swiipx.fr',
    },
  }))

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      {videoJsonLd.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Voyez le résultat en action
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            La plaque en situation : le client approche son téléphone, l&apos;avis se rédige en
            quelques secondes.
          </p>
        </div>

        {/* Mobile : slider horizontal (2 vidéos visibles), Desktop : grille 3 colonnes */}
        <div className="max-w-4xl mx-auto">
          {/* Mobile slider — padding égal des 2 côtés (pas de bleed) */}
          <div className="sm:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-2">
            <div className="flex gap-3 pb-4 px-2">
              {videos.map((video) => (
                <div
                  key={video.src}
                  className="relative shrink-0 w-[calc(50%-0.375rem)] aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden shadow-lg snap-start"
                >
                  <video
                    src={video.src}
                    poster={video.poster}
                    aria-label={video.name}
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
            {videos.map((video) => (
              <div
                key={video.src}
                className="relative aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden shadow-lg"
              >
                <video
                  src={video.src}
                  poster={video.poster}
                  aria-label={video.name}
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
