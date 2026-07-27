/**
 * Clients réels Swiipx.
 *
 * RÈGLE : on ne cite ici que des établissements réellement équipés.
 * Aucune note, aucun nombre d'avis inventé, aucune citation qui n'a pas
 * été réellement prononcée par le client.
 *
 * Pour ajouter une vraie citation : demander l'accord écrit du client
 * (un simple SMS/WhatsApp suffit) puis renseigner le champ `quote`.
 */

export interface Client {
  name: string
  sector: string
  /** Citation réelle, validée par le client. Laisser vide tant qu'on ne l'a pas. */
  quote?: string
  /** Personne citée (prénom + initiale), uniquement si quote renseignée. */
  author?: string
}

export const clients: Client[] = [
  { name: 'Chicken City', sector: 'Restauration' },
  { name: "O'Regal", sector: 'Restauration' },
  { name: 'Le Marmara', sector: 'Restauration' },
  { name: 'La Station', sector: 'Restauration' },
]

/** Clients ayant fourni une citation validée — alimente la section témoignages. */
export const clientsWithQuote = clients.filter((c) => c.quote && c.author)
