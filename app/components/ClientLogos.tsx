import Image from 'next/image'
import { clientsWithLogo, otherSectors } from '../data/clients'

type Variante = 'compact' | 'complet'

interface ClientLogosProps {
  /**
   * 'compact' — bandeau discret sous un bouton ou dans un hero.
   * 'complet' — bloc principal d'une section, logos plus grands.
   */
  variante?: Variante
  /** Intitulé au-dessus des logos. `null` pour n'afficher que les logos. */
  titre?: string | null
  /** Affiche la ligne des secteurs des autres clients. */
  afficherSecteurs?: boolean
  className?: string
}

/**
 * Mur de logos clients.
 *
 * Les enseignes ne sont plus écrites en toutes lettres : on affiche le logo de
 * celles qui nous l'ont transmis (le transmettre vaut accord), et pour les
 * autres on ne cite que le secteur d'activité. Personne n'est nommé sans avoir
 * validé, et aucun compteur n'est affiché.
 *
 * Les 4 logos sont très hétérogènes (trois badges circulaires colorés, un
 * logotype noir). Ils sont normalisés par un cadre carré identique et
 * `object-contain`, qui garantit qu'aucun n'est déformé ni rogné.
 *
 * Ils sont affichés EN COULEUR. Le gris atténué est la convention des murs de
 * 20 logos, où il apporte du calme visuel ; sur quatre enseignes il ne fait que
 * les affadir — Burger Time, en bleu clair, devenait illisible.
 *
 * Server Component : aucune interactivité, tout est en CSS.
 */
export default function ClientLogos({
  variante = 'complet',
  titre = 'Ils utilisent Swiipx',
  afficherSecteurs = true,
  className = '',
}: ClientLogosProps) {
  const complet = variante === 'complet'
  const cote = complet ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-14 h-14 sm:w-16 sm:h-16'

  return (
    <div className={className}>
      {titre && (
        <p
          className={`font-semibold uppercase tracking-wider text-gray-500 ${
            complet ? 'text-xs text-center mb-6' : 'text-xs mb-3'
          }`}
        >
          {titre}
        </p>
      )}

      <ul
        className={`flex flex-wrap items-center ${
          complet ? 'justify-center gap-4 sm:gap-8' : 'gap-3 sm:gap-4'
        }`}
      >
        {clientsWithLogo.map((client) => (
          <li key={client.logo}>
            <div
              className={`${cote} relative flex items-center justify-center rounded-2xl bg-white border border-gray-200/80 ${
                complet ? 'shadow-sm p-3 sm:p-4' : 'p-2'
              }`}
            >
              <Image
                src={client.logo!}
                /* Le nom reste dans l'alt : il est nécessaire aux lecteurs
                   d'écran et à Google pour identifier le logo, sans être
                   affiché comme une mention commerciale. */
                alt={client.name}
                width={96}
                height={96}
                sizes="96px"
                className="w-full h-full object-contain transition duration-300 hover:scale-105"
              />
            </div>
          </li>
        ))}
      </ul>

      {afficherSecteurs && otherSectors.length > 0 && (
        <p
          className={`text-gray-500 ${
            complet ? 'text-sm text-center mt-6' : 'text-xs mt-3'
          }`}
        >
          <span className="text-gray-500">Et aussi&nbsp;: </span>
          {otherSectors.join(' · ')}
        </p>
      )}
    </div>
  )
}
