/**
 * Clients réels Swiipx (accord donné pour la citation du nom commercial).
 *
 * RÈGLE : on ne cite ici que des établissements réellement équipés.
 * Aucune note, aucun nombre d'avis inventé, aucune citation qui n'a pas
 * été réellement prononcée par le client.
 *
 * Pour ajouter une vraie citation : demander l'accord écrit du client
 * (un simple SMS/WhatsApp suffit) puis renseigner `quote` + `author`.
 * La section témoignages les affiche alors automatiquement.
 */

export interface Client {
  name: string
  /** Secteur affiché sous le nom — à vérifier/corriger si besoin. */
  sector: string
  /** Mis en avant sur le site (hero, page produit). */
  featured?: boolean
  /** Citation réelle, validée par le client. Laisser vide tant qu'on ne l'a pas. */
  quote?: string
  /** Personne citée (prénom + initiale), uniquement si quote renseignée. */
  author?: string
}

export const clients: Client[] = [
  { name: 'Chicken City', sector: 'Restauration rapide', featured: true },
  { name: "L'Ottoman", sector: 'Restaurant', featured: true },
  { name: 'Burger Time', sector: 'Restauration rapide', featured: true },
  { name: 'Royal Food', sector: 'Restauration rapide', featured: true },
  { name: "Family's Pizza Cergy", sector: 'Pizzeria' },
  { name: "Broche d'Or", sector: 'Restauration' },
  { name: 'Le Phare', sector: 'Bar · Restaurant' },
  { name: 'Le Flo', sector: 'Bar · Brasserie' },
  { name: 'Le Longchamp', sector: 'Tabac · Bar · FDJ · PMU' },
  { name: 'Sultan Market', sector: 'Épicerie' },
  { name: 'Nur İletişim', sector: 'Téléphonie' },
]

/**
 * Clients affichés sur le site.
 * Volontairement SANS compteur : on ne communique pas le nombre total.
 */
export const featuredClients = clients.filter((c) => c.featured)

/** Clients ayant fourni une citation validée — alimente la section témoignages. */
export const clientsWithQuote = clients.filter((c) => c.quote && c.author)
