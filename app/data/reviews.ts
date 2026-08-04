import type { PackSlug } from '../../lib/pricing'

/**
 * Avis clients réels.
 *
 * POURQUOI CE FICHIER EXISTE : Google Merchant Center signale deux champs
 * manquants sur nos fiches produit — « aggregateRating » et « review ». Ce sont
 * eux qui déclenchent les étoiles dans les résultats de recherche.
 *
 * Ces champs contenaient auparavant des notes inventées (4,8 sur 247 avis,
 * 4,9 sur 389, 5,0 sur 156) alors qu'aucun avis n'avait jamais été collecté.
 * Elles ont été retirées : les règles Google sur les données structurées
 * interdisent les notes auto-déclarées et invérifiables, et une infraction se
 * paie d'une action manuelle sur tout le compte Merchant Center.
 *
 * Ce fichier est donc le SEUL endroit d'où une note peut désormais venir. Le
 * balisage et l'affichage en sont tous deux dérivés, ce qui garantit ce que
 * Google exige : toute note balisée doit correspondre à un avis réellement
 * visible sur la page.
 *
 * Tant que le tableau est vide, aucune étoile n'est affichée et aucun champ
 * n'est balisé — l'avertissement Merchant Center reste, et c'est le
 * comportement correct. Il disparaîtra dès le premier avis réel ajouté ici.
 *
 * POUR AJOUTER UN AVIS :
 *   1. Le client l'a réellement écrit (SMS, WhatsApp, email, formulaire).
 *   2. On garde son texte tel quel, sans le réécrire ni le corriger.
 *   3. Il sait qu'il sera publié sur le site.
 * Rien d'autre à faire : l'affichage et le balisage suivent automatiquement.
 */

export interface Review {
  /** Prénom + initiale du nom, ou nom de l'établissement s'il l'accepte. */
  author: string
  /** Établissement, affiché sous l'auteur. Facultatif. */
  business?: string
  /** Note sur 5, telle que le client l'a donnée. */
  rating: 1 | 2 | 3 | 4 | 5
  /** Date de rédaction au format ISO (AAAA-MM-JJ) — requise par schema.org. */
  date: string
  /** Texte réellement écrit par le client. Ne pas le reformuler. */
  body: string
  /**
   * Pack concerné, si on le sait. Un avis sans pack est considéré comme
   * portant sur la plaque en général : il compte pour toutes les fiches.
   */
  pack?: PackSlug
}

/**
 * VIDE VOLONTAIREMENT.
 *
 * Onze établissements sont équipés (voir app/data/clients.ts) mais aucun ne
 * nous a encore transmis d'avis écrit. Ne rien inventer ici.
 */
export const reviews: Review[] = []

/**
 * Avis retenus pour une fiche produit : ceux qui la visent explicitement, plus
 * les avis génériques, qui portent sur la plaque et valent donc pour les trois
 * packs.
 */
export function reviewsPourPack(slug: PackSlug): Review[] {
  return reviews.filter((r) => !r.pack || r.pack === slug)
}

/** Du plus récent au plus ancien : un avis frais rassure davantage. */
export function parDateDecroissante(list: Review[]): Review[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date))
}

export interface Note {
  /** Moyenne arrondie au dixième, comme Google l'affiche. */
  ratingValue: number
  reviewCount: number
}

/**
 * Note moyenne d'un ensemble d'avis, ou `null` s'il est vide.
 *
 * Le `null` est important : un `aggregateRating` avec un compteur à zéro est
 * une erreur bloquante dans le testeur de résultats enrichis, pas un simple
 * avertissement. Mieux vaut ne rien émettre.
 */
export function noteMoyenne(list: Review[]): Note | null {
  if (list.length === 0) return null
  const somme = list.reduce((total, r) => total + r.rating, 0)
  return {
    ratingValue: Math.round((somme / list.length) * 10) / 10,
    reviewCount: list.length,
  }
}

/**
 * Bloc `aggregateRating` prêt à être étalé dans un JSON-LD Product,
 * ou `undefined` s'il n'y a aucun avis.
 *
 * S'utilise avec un étalement conditionnel, pour que la clé soit absente
 * plutôt que nulle :
 *   ...(aggregateRatingJsonLd(list) ?? {})
 */
export function aggregateRatingJsonLd(list: Review[]) {
  const note = noteMoyenne(list)
  if (!note) return undefined
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: note.ratingValue,
      reviewCount: note.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

/**
 * Bloc `review` prêt à être étalé dans un JSON-LD Product,
 * ou `undefined` s'il n'y a aucun avis.
 *
 * Limité aux avis les plus récents : Google n'en exploite qu'une poignée, et
 * un balisage à rallonge alourdit la page sans rien apporter.
 */
export function reviewsJsonLd(list: Review[], max = 5) {
  if (list.length === 0) return undefined
  return {
    review: parDateDecroissante(list)
      .slice(0, max)
      .map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.date,
        reviewBody: r.body,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
  }
}
