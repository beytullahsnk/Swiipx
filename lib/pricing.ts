/**
 * Source unique de vérité pour les prix.
 *
 * Toute modification de prix se fait ICI et nulle part ailleurs.
 * Les routes API (create/update payment intent, checkout, webhook) et le panier
 * importent ce fichier : impossible que le montant affiché diverge du montant
 * réellement débité par Stripe.
 */

export type PackId = 'plaque1' | 'plaque2' | 'plaque5'
export type PackSlug = 'starter' | 'business' | 'pro'

export interface Pack {
  id: PackId
  slug: PackSlug
  /** Nom transmis à Stripe et Sendcloud — ne pas modifier sans raison. */
  name: string
  plaques: number
  priceCents: number
  /**
   * Prix de référence barré, en centimes. `null` = aucun prix barré affiché.
   *
   * ⚠️ CADRE LÉGAL (directive Omnibus, art. L112-1-1 du Code de la
   * consommation) : le prix barré doit être le prix le plus bas RÉELLEMENT
   * pratiqué au cours des 30 jours précédant l'annonce de la réduction.
   *
   * Tous à `null` depuis le passage à la grille HT : les prix ont AUGMENTÉ.
   * Afficher un prix barré sur un tarif en hausse serait une réduction
   * fictive — une pratique commerciale trompeuse (art. L121-2), et une
   * violation des règles Google Merchant Center.
   *
   * Ne remettre une valeur ici que lors d'une vraie baisse, et uniquement le
   * prix effectivement pratiqué avant celle-ci.
   */
  formerPriceCents: number | null
  image: string
}

/**
 * TAUX DE TVA appliqué pour passer des prix HT (base de la tarification
 * commerciale) aux prix TTC affichés et débités.
 *
 * Les `priceCents` ci-dessous sont des montants TTC : c'est ce que le client
 * paie et ce que Stripe encaisse. L'affichage TTC est une obligation légale
 * vis-à-vis du consommateur (art. L112-1 du Code de la consommation), et les
 * CGV l'annoncent explicitement.
 */
export const TVA = 0.20

/** Prix hors taxes correspondant, en centimes (pour information / facturation). */
export function priceHtCents(pack: Pack): number {
  return Math.round(pack.priceCents / (1 + TVA))
}

export const PACKS: Record<PackId, Pack> = {
  plaque1: {
    id: 'plaque1',
    slug: 'starter',
    name: 'Swiipx — 1 Plaque',
    plaques: 1,
    priceCents: 3588,   // 29,90 € HT
    formerPriceCents: null,
    image: '/products/plaque1.jpg',
  },
  plaque2: {
    id: 'plaque2',
    slug: 'business',
    name: 'Swiipx — 2 Plaques',
    plaques: 2,
    priceCents: 6588,   // 54,90 € HT
    formerPriceCents: null,
    image: '/products/plaque2.jpg',
  },
  plaque5: {
    id: 'plaque5',
    slug: 'pro',
    name: 'Swiipx — 5 Plaques',
    plaques: 5,
    priceCents: 10788,  // 89,90 € HT
    formerPriceCents: null,
    image: '/products/plaque5.jpg',
  },
}

export const PACK_LIST: Pack[] = [PACKS.plaque1, PACKS.plaque2, PACKS.plaque5]

export const PACK_BY_SLUG: Record<PackSlug, Pack> = {
  starter: PACKS.plaque1,
  business: PACKS.plaque2,
  pro: PACKS.plaque5,
}

/** 2990 -> "29,90" (format français, sans symbole). */
export function formatPrice(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',')
}

/** 2990 -> "29,90€" */
export function formatPriceWithSymbol(cents: number): string {
  return `${formatPrice(cents)}€`
}

/** 2990 -> "29.90" (format schema.org / flux Merchant Center). */
export function formatPriceSchema(cents: number): string {
  return (cents / 100).toFixed(2)
}

/** Prix unitaire par plaque, en centimes (arrondi). */
export function unitPriceCents(pack: Pack): number {
  return Math.round(pack.priceCents / pack.plaques)
}

/** Pourcentage de réduction affiché, ou null si aucun prix barré. */
export function discountPercent(pack: Pack): number | null {
  if (!pack.formerPriceCents) return null
  return Math.round((1 - pack.priceCents / pack.formerPriceCents) * 100)
}

/** Le prix le plus bas de la gamme, en centimes (2990). */
export const LOWEST_PRICE_CENTS = Math.min(...PACK_LIST.map((p) => p.priceCents))

/** Le prix le plus haut de la gamme, en centimes (7990). */
export const HIGHEST_PRICE_CENTS = Math.max(...PACK_LIST.map((p) => p.priceCents))
