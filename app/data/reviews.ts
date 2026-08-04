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
 * Si le tableau redevenait vide, aucune étoile ne serait affichée et aucun
 * champ balisé : c'est le comportement correct, mieux vaut l'avertissement
 * Merchant Center qu'une note inventée.
 *
 * POUR AJOUTER UN AVIS :
 *   1. Le texte vient du client — écrit par lui, ou relu et validé par lui.
 *   2. On ne le reformule pas après sa validation.
 *   3. La note vient de lui aussi. Jamais déduite du ton du texte.
 *   4. Il sait qu'il sera publié sur le site, sous ce nom.
 * Rien d'autre à faire : l'affichage et le balisage suivent automatiquement.
 */

export interface Review {
  /**
   * Nom affiché. L'établissement par défaut ; « Prénom N. » si le client
   * préfère signer en son nom, auquel cas `business` porte l'enseigne.
   * C'est cette présence de `business` qui distingue les deux cas dans le
   * balisage : schema.org attend une Person ou une Organization, pas les deux.
   */
  author: string
  /** Enseigne, quand `author` est une personne physique. */
  business?: string
  /**
   * Note sur 5, telle que le client l'a donnée — jamais déduite ni arrondie
   * depuis le ton du texte.
   *
   * FACULTATIVE À DESSEIN : un client peut valider un témoignage sans avoir
   * donné de note. Le texte est alors publié sans étoiles, et l'avis ne compte
   * ni dans la moyenne ni dans le balisage. Inventer la note serait inventer
   * précisément le chiffre que Google affiche.
   */
  rating?: 1 | 2 | 3 | 4 | 5
  /** Date de publication au format ISO (AAAA-MM-JJ) — requise par schema.org. */
  date: string
  /** Texte validé par le client. Ne pas le reformuler après coup. */
  body: string
  /**
   * Pack concerné, si on le sait. Un avis sans pack est considéré comme
   * portant sur la plaque en général : il compte pour toutes les fiches.
   */
  pack?: PackSlug
}

/**
 * PROVENANCE DE CES TEXTES — à conserver, c'est ce qui les rend publiables.
 *
 * Les quatre établissements ci-dessous ont demandé qu'on leur propose un texte
 * plutôt que d'avoir à l'écrire. Une proposition leur a donc été envoyée, avec
 * la consigne explicite de la corriger ou de la refuser, et ils l'ont validée
 * telle quelle. Le texte est le leur au sens où ils l'ont relu et adopté.
 *
 * Garder les messages de validation : l'article L111-7-2 du Code de la
 * consommation impose de pouvoir justifier l'authenticité d'un avis publié.
 *
 * NOTES : trois 5 et un 4 (Royal Food), soit une moyenne de 4,75 affichée et
 * balisée 4,8. Chacune vient de l'établissement lui-même.
 *
 * Ne jamais retoucher une note pour rendre la moyenne plus vendeuse — ni vers
 * le haut, ni vers le bas. Attribuer à un établissement nommé une note qu'il
 * n'a pas donnée, c'est le même faux qu'un avis inventé. La moyenne bouge en
 * ajoutant de vrais avis, pas en corrigeant ceux qui sont là.
 */
export const reviews: Review[] = [
  {
    author: 'Chicken City',
    rating: 5,
    date: '2026-08-04',
    body: "On l'a posée sur le comptoir, juste à côté de la caisse. Les clients mettent leur téléphone dessus pendant qu'ils attendent leur commande, et c'est fait. Avant je demandais à l'oral, franchement personne ne le faisait.",
  },
  {
    author: "L'Ottoman",
    rating: 5,
    date: '2026-08-04',
    body: "Ce qui m'a décidé c'est qu'il n'y avait rien à installer. Elle est arrivée déjà réglée sur notre page Google, on l'a collée, terminé. Je m'attendais à une application ou un abonnement, en fait il n'y a rien de tout ça.",
  },
  {
    author: 'Burger Time',
    rating: 5,
    date: '2026-08-04',
    body: "Je n'y croyais pas trop au début. En fait les gens sont curieux, ils approchent le téléphone pour voir ce que ça fait, et ils laissent l'avis derrière. C'est beaucoup moins gênant que de leur demander.",
  },
  {
    author: 'Royal Food',
    // 4 et non 5 : note donnée par l'établissement lors d'un échange de suivi,
    // le 5 août 2026. Elle prime sur la note initiale.
    rating: 4,
    date: '2026-08-04',
    body: "Payé une fois, pas d'abonnement tous les mois, c'était ma condition. Elle est à la caisse et elle marche toujours pareil depuis le premier jour.",
  },
]

/** Avis assortis d'une note — les seuls qui alimentent moyenne et balisage. */
export function avisNotes(list: Review[]): Review[] {
  return list.filter((r) => r.rating !== undefined)
}

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
  const notes = avisNotes(list)
  if (notes.length === 0) return null
  const somme = notes.reduce((total, r) => total + (r.rating ?? 0), 0)
  return {
    ratingValue: Math.round((somme / notes.length) * 10) / 10,
    reviewCount: notes.length,
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
  // Seuls les avis NOTES sont balises : Google exige un `reviewRating` sur
  // chaque Review d'un extrait produit, et rejette celles qui n'en ont pas.
  // Un temoignage sans note reste affiche sur la page, simplement pas balise.
  const notes = avisNotes(list)
  if (notes.length === 0) return undefined
  return {
    review: parDateDecroissante(notes)
      .slice(0, max)
      .map((r) => ({
        '@type': 'Review',
        // Une enseigne est une Organization, pas une Person. `business` n'est
        // renseigne que lorsque `author` designe quelqu'un.
        author: r.business
          ? { '@type': 'Person', name: r.author, worksFor: { '@type': 'Organization', name: r.business } }
          : { '@type': 'Organization', name: r.author },
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
