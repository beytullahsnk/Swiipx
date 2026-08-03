import Image from 'next/image'
import { clientsWithLogo, otherSectors } from '../data/clients'

type Variante = 'compact' | 'complet'

interface ClientLogosProps {
  /**
   * 'compact' — bandeau discret sous un bouton ou dans un hero.
   * 'complet' — bloc de section, pastilles légèrement plus grandes et centrées.
   */
  variante?: Variante
  /** Intitulé à droite de la pile. `null` pour n'afficher que les pastilles. */
  titre?: string | null
  /** Affiche la ligne des secteurs des autres clients. */
  afficherSecteurs?: boolean
  className?: string
}

/**
 * Preuve sociale : pile de pastilles clients.
 *
 * PARTI PRIS : ce n'est PAS un mur de logos. Les pastilles sont petites,
 * rondes et se chevauchent, comme les avatars d'un widget d'avis. On ne
 * cherche pas à faire lire chaque enseigne — on veut donner à voir qu'il y a
 * des clients derrière, et rassurer. Le chevauchement fait d'ailleurs qu'aucun
 * logo n'est entièrement visible, ce qui est voulu.
 *
 * La version précédente affichait des cartes de 80 à 96 px : ça se lisait comme
 * un mur de références d'un grand compte, un registre qui ne correspond ni à la
 * taille de l'entreprise ni à l'effet recherché.
 *
 * Les enseignes ne sont jamais écrites en toutes lettres. Seul le logo des
 * clients qui nous l'ont transmis est affiché — le transmettre vaut accord —
 * et pour les autres on ne cite que le secteur d'activité. Aucun compteur.
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
  const cote = complet ? 'w-10 h-10' : 'w-8 h-8'

  return (
    <div className={className}>
      <div
        className={`flex items-center gap-3 ${complet ? 'justify-center' : ''}`}
      >
        {/* Pile : chaque pastille recouvre partiellement la précédente. */}
        <ul className="flex items-center flex-shrink-0">
          {clientsWithLogo.map((client, i) => (
            <li key={client.logo} className={i > 0 ? '-ml-2.5' : ''}>
              <div
                className={`${cote} rounded-full bg-white ring-2 ring-white shadow-sm overflow-hidden`}
              >
                <Image
                  src={client.logo!}
                  /* Le nom reste dans l'alt : nécessaire aux lecteurs d'écran
                     et à Google pour identifier le logo, sans être affiché
                     comme une mention commerciale. */
                  alt={client.name}
                  width={80}
                  height={80}
                  sizes="40px"
                  className="w-full h-full object-cover"
                />
              </div>
            </li>
          ))}
        </ul>

        {(titre || (afficherSecteurs && otherSectors.length > 0)) && (
          <div className="min-w-0">
            {titre && (
              <p className="text-sm font-semibold text-gray-700 leading-tight">
                {titre}
              </p>
            )}
            {afficherSecteurs && otherSectors.length > 0 && (
              <p className="text-xs text-gray-500 leading-tight mt-0.5">
                {otherSectors.join(' · ')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
