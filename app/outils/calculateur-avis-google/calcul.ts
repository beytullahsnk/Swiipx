/**
 * Calcul du nombre d'avis nécessaires pour atteindre une note Google.
 *
 * Avec N avis à la moyenne A, il faut n nouveaux avis de moyenne M pour
 * atteindre la note T :  (A·N + M·n) / (N + n) ≥ T  ⇔  n ≥ N·(T − A) / (M − T).
 * Avec M = 5 (que des avis à 5 étoiles), c'est la formule de l'article
 * « Améliorer sa note Google ». Pur calcul : aucune donnée externe.
 */
export function avisNecessaires(note: number, nombre: number, cible: number, moyenneNouveaux = 5): number | null {
  if (note >= cible) return 0
  if (moyenneNouveaux <= cible) return null
  // Marge minuscule : 50 × 0,5 / 0,5 ne doit pas devenir 51 par arrondi flottant.
  return Math.ceil((nombre * (cible - note)) / (moyenneNouveaux - cible) - 1e-9)
}

/** Note obtenue après un avis supplémentaire de `etoiles` étoiles. */
export function noteApres(note: number, nombre: number, etoiles: number): number {
  return (note * nombre + etoiles) / (nombre + 1)
}

export const virgule = (n: number, decimales = 1) => n.toFixed(decimales).replace('.', ',')
