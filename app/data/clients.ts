/**
 * Clients réels Swiipx.
 *
 * RÈGLE : on ne référence ici que des établissements réellement équipés.
 * Aucune note, aucun nombre d'avis inventé, aucune citation qui n'a pas
 * été réellement prononcée par le client.
 *
 * AFFICHAGE : les clients qui nous ont transmis leur logo sont montrés par ce
 * logo. Les autres ne sont PAS nommés — on ne reprend que leur secteur
 * d'activité, ce qui illustre la variété des commerces équipés sans citer une
 * enseigne qui n'aurait rien validé.
 *
 * Pour ajouter une vraie citation : demander l'accord écrit du client
 * (un simple SMS/WhatsApp suffit) puis renseigner `quote` + `author`.
 * La section témoignages les affiche alors automatiquement.
 */

export interface Client {
  name: string
  /** Secteur d'activité — c'est ce qui est affiché pour les clients sans logo. */
  sector: string
  /**
   * Logo transmis par le client. Sa présence vaut accord d'affichage :
   * ne renseigner ce champ que si le client nous a effectivement donné son logo.
   */
  logo?: string
  /** Citation réelle, validée par le client. Laisser vide tant qu'on ne l'a pas. */
  quote?: string
  /** Personne citée (prénom + initiale), uniquement si quote renseignée. */
  author?: string
}

export const clients: Client[] = [
  { name: 'Chicken City', sector: 'Restauration rapide', logo: '/clients/chicken-city.png' },
  { name: "L'Ottoman", sector: 'Restauration rapide et traditionnelle', logo: '/clients/ottoman.png' },
  { name: 'Burger Time', sector: 'Restauration rapide', logo: '/clients/burger-time.png' },
  { name: 'Royal Food', sector: 'Restauration rapide', logo: '/clients/royal-food.png' },
  { name: "Family's Pizza Cergy", sector: 'Pizzeria' },
  { name: "Broche d'Or", sector: 'Restauration' },
  { name: 'Le Phare', sector: 'Bar · Restaurant' },
  { name: 'Le Flo', sector: 'Bar · Brasserie' },
  { name: 'Le Longchamp', sector: 'Tabac · FDJ · PMU' },
  { name: 'Sultan Market', sector: 'Épicerie' },
  { name: 'Nur İletişim', sector: 'Téléphonie' },
]

/** Clients dont le logo peut être affiché (logo transmis = accord donné). */
export const clientsWithLogo = clients.filter((c) => c.logo)

/**
 * Secteurs des clients qui n'ont pas transmis de logo, dédoublonnés.
 *
 * Montre l'étendue des commerces équipés sans nommer personne et sans avancer
 * le moindre chiffre.
 *
 * On ne garde que l'activité principale (le segment avant le premier « · ») :
 * découper « Le Longchamp — Tabac · FDJ · PMU » en trois entrées produisait une
 * énumération illisible où « FDJ » et « PMU » se retrouvaient au même rang que
 * « Épicerie ».
 */
export const otherSectors = Array.from(
  new Set(
    clients
      .filter((c) => !c.logo)
      .map((c) => c.sector.split('·')[0].trim())
      .filter(Boolean)
  )
)

/** Clients ayant fourni une citation validée — alimente la section témoignages. */
export const clientsWithQuote = clients.filter((c) => c.quote && c.author)
