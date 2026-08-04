import { Quote, Star } from 'lucide-react'
import { noteMoyenne, parDateDecroissante, type Review } from '../data/reviews'

/**
 * Avis clients affichés sur la page.
 *
 * RÈGLE GOOGLE : une note balisée en données structurées doit être visible par
 * le visiteur au même endroit. Ce composant et le JSON-LD lisent donc la même
 * source, app/data/reviews.ts — impossible de baliser une note qui ne serait
 * nulle part affichée.
 *
 * COMPORTEMENT À VIDE : le composant ne rend rien. Pas de « Soyez le premier à
 * donner votre avis », pas de bloc vide — sur une fiche produit, une section
 * d'avis déserte inquiète plus qu'elle ne rassure.
 *
 * Server Component : aucune interactivité.
 */

/**
 * <span inline-flex> et non <div flex> : les étoiles sont rendues à l'intérieur
 * d'un <p>, où un <div> est du HTML invalide. React s'en sort au rendu serveur
 * mais le navigateur reconstruit l'arbre à sa façon, l'hydratation échoue et
 * tout le document est remplacé côté client.
 */
function Etoiles({ note, taille = 'w-4 h-4' }: { note: number; taille?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${taille} ${
            i <= Math.round(note) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
          }`}
        />
      ))}
    </span>
  )
}

const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

/** « 2026-03-14 » → « mars 2026 ». Découpage de la chaîne, sans `new Date()` :
 *  passer par un fuseau ferait basculer le mois d'un jour sur l'autre entre le
 *  serveur et le navigateur, et donc casser l'hydratation. */
function moisAnnee(iso: string): string {
  const [annee, mois] = iso.split('-')
  const index = Number(mois) - 1
  return MOIS[index] ? `${MOIS[index]} ${annee}` : annee
}

interface Props {
  avis: Review[]
  titre?: string
  className?: string
}

export default function CustomerReviews({
  avis,
  titre = 'Ce que disent les commerces équipés',
  className = '',
}: Props) {
  if (avis.length === 0) return null

  // La moyenne ne s'affiche que si au moins un client a donne une note. Tant
  // qu'ils ont valide un texte sans etoiles, on montre les temoignages seuls
  // plutot qu'une note deduite de leur ton.
  const note = noteMoyenne(avis)

  return (
    <section className={className} aria-labelledby="avis-clients">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
        <h2 id="avis-clients" className="text-2xl font-bold text-gray-900">
          {titre}
        </h2>
        {note && (
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Etoiles note={note.ratingValue} />
            <span>
              {/* Une decimale, comme Google : « 5,0 / 5 » plutot que « 5 / 5 ». */}
              <span className="font-semibold text-gray-900">
                {note.ratingValue.toFixed(1).replace('.', ',')}
              </span>
              <span className="text-gray-400"> / 5</span>
              <span className="text-gray-400 mx-1.5">·</span>
              {note.reviewCount} avis
            </span>
          </p>
        )}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parDateDecroissante(avis).map((r) => (
          <li
            key={`${r.author}-${r.date}`}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              {r.rating ? (
                <Etoiles note={r.rating} />
              ) : (
                <Quote className="w-5 h-5 text-primary/30" aria-hidden="true" />
              )}
              <span className="text-xs text-gray-400">{moisAnnee(r.date)}</span>
            </div>
            <blockquote className="text-gray-700 leading-relaxed mb-3">
              {r.body}
            </blockquote>
            <p className="text-sm">
              <span className="font-semibold text-gray-900">{r.author}</span>
              {r.business && (
                <>
                  <span className="text-gray-400 mx-1.5">·</span>
                  <span className="text-gray-500">{r.business}</span>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
