import { seoData } from './seo-data'

export interface RelatedArticle {
  slug: string
  label: string
}

/**
 * Libellés courts utilisés comme texte d'ancre des liens internes.
 *
 * Volontairement plus courts que les <title> : un texte d'ancre descriptif et
 * varié aide Google à comprendre la page cible, là où un « cliquez ici » ou un
 * titre à rallonge n'apporte rien.
 */
export const relatedArticles: RelatedArticle[] = [
  { slug: 'ameliorer-note-google', label: 'Améliorer sa note Google : le calcul exact' },
  { slug: 'plaque-nfc-veterinaire', label: 'Plaque NFC vétérinaire : avis et déontologie' },
  { slug: 'plaque-nfc-agence-immobiliere', label: 'Plaque NFC agence immobilière : avis et scripts' },
  { slug: 'avis-google-disparus', label: 'Avis Google disparus : les 8 causes' },
  { slug: 'plaque-nfc-auto-ecole', label: 'Plaque NFC auto-école : avis et scripts' },
  { slug: 'carte-nfc-avis-google', label: 'Carte NFC ou plaque : que choisir ?' },
  { slug: 'magnet-nfc-avis-google', label: 'Magnet NFC : quand il vaut mieux qu\'une plaque' },
  { slug: 'cout-avis-google-comparatif', label: "Combien coûte un avis Google ?" },
  { slug: 'combien-avis-google-pack-local', label: "Combien d'avis Google pour le pack local ?" },
  { slug: 'plaque-nfc-salle-de-sport', label: 'Plaque NFC salle de sport : guide 2026' },
  { slug: 'faux-avis-google-signaler', label: 'Faux avis Google : les signaler et s\'en protéger' },
  { slug: 'plaque-nfc-boulangerie', label: 'Plaque NFC boulangerie : guide 2026' },
  { slug: 'optimiser-fiche-google-business-profile', label: 'Optimiser sa fiche Google Business Profile' },
  { slug: 'plaque-nfc-institut-beaute', label: 'Plaque NFC institut de beauté : guide 2026' },
  { slug: 'comment-choisir-plaque-nfc-avis-google', label: "Choisir sa plaque NFC : guide d'achat 2026" },
  { slug: 'statistiques-avis-google-2026', label: 'Statistiques avis Google 2026 : les chiffres sourcés' },
  { slug: 'repondre-avis-negatifs-google', label: 'Répondre aux avis négatifs Google' },
  { slug: 'plaque-nfc-garage-automobile', label: 'Plaque NFC garage automobile : guide 2026' },
  { slug: 'plaque-nfc-cabinet-medical', label: 'Plaque NFC cabinet médical : guide déontologie' },
  { slug: 'plaque-nfc-restaurant', label: 'Plaque NFC restaurant : guide complet' },
  { slug: 'plaque-nfc-salon-coiffure', label: 'Plaque NFC salon de coiffure' },
  { slug: 'plaque-avis-google-sans-abonnement', label: 'Plaques sans abonnement : comparatif' },
  { slug: 'prix-plaque-nfc-avis-google', label: 'Prix plaque NFC : combien ça coûte ?' },
  { slug: 'ou-placer-plaque-avis-google', label: 'Où placer votre plaque NFC' },
  { slug: 'plaque-nfc-vs-qr-code-avis-google', label: 'Plaque NFC vs QR Code : comparatif 2026' },
  { slug: 'doubler-avis-google-30-jours', label: 'Doubler vos avis Google en 30 jours' },
  { slug: 'obtenir-plus-avis-google', label: "10 méthodes pour obtenir plus d'avis Google" },
  { slug: 'nfc-avis-clients', label: 'NFC : la nouvelle arme pour vos avis' },
  { slug: 'seo-local-recherches-google', label: 'SEO Local : grimper en tête des recherches' },
  { slug: 'avis-clients-influencent-business', label: 'Les avis influencent votre business' },
  { slug: 'booster-visibilite-locale', label: '5 astuces visibilité locale' },
  { slug: 'erreurs-demander-avis', label: 'Les erreurs à éviter' },
]

/** L'article a sa propre route, il n'est pas dans seoData. */
const CATEGORIES_HORS_SEO_DATA: Record<string, string> = {
  'doubler-avis-google-30-jours': 'Stratégie',
}

function categorie(slug: string): string {
  return seoData[slug]?.category ?? CATEGORIES_HORS_SEO_DATA[slug] ?? ''
}

/**
 * Articles connexes d'un article donné.
 *
 * PROBLÈME RÉSOLU : la version précédente faisait
 * `relatedArticles.filter(a => a.slug !== slug).slice(0, 4)` — donc toujours
 * les 4 PREMIERS du tableau. Mesuré sur le site construit : 4 articles
 * recevaient 20 liens internes chacun pendant que `booster-visibilite-locale`
 * n'en recevait qu'un seul. Un article sans lien entrant est mal exploré et
 * transmet peu d'autorité.
 *
 * Deux objectifs désormais :
 *   1. PERTINENCE — on sert d'abord des articles de la même catégorie
 *      (grappes thématiques : Google comprend mieux un site organisé par sujet
 *      qu'une liste de liens sans rapport).
 *   2. ÉQUITÉ — le remplissage démarre à un décalage dérivé de la position de
 *      l'article courant, ce qui fait tourner les liens sur tout le catalogue
 *      au lieu de toujours pointer vers les mêmes.
 *
 * Fonction pure et déterministe : même entrée, même sortie à chaque build,
 * donc pas d'écart d'hydratation ni de sitemap instable.
 */
export function getRelatedArticles(currentSlug: string, count = 4): RelatedArticle[] {
  const autres = relatedArticles.filter((a) => a.slug !== currentSlug)
  if (autres.length <= count) return autres

  const position = relatedArticles.findIndex((a) => a.slug === currentSlug)
  const index = position >= 0 ? position : 0
  const cat = categorie(currentSlug)

  const choisis: RelatedArticle[] = []
  const pris = new Set<string>()

  // 1. Même catégorie — au maximum la moitié des emplacements, pour garder de
  //    la place à la découverte d'autres sujets. On décale aussi le point de
  //    départ afin que deux articles d'une même catégorie ne renvoient pas
  //    exactement vers les mêmes voisins.
  const memeCat = autres.filter((a) => cat && categorie(a.slug) === cat)
  const maxCat = Math.min(Math.floor(count / 2), memeCat.length)
  for (let i = 0; i < maxCat; i++) {
    const a = memeCat[(index + i) % memeCat.length]
    if (!pris.has(a.slug)) {
      pris.add(a.slug)
      choisis.push(a)
    }
  }

  // 2. Remplissage en rotation sur l'ensemble du catalogue.
  const depart = (index * count) % autres.length
  for (let i = 0; i < autres.length && choisis.length < count; i++) {
    const a = autres[(depart + i) % autres.length]
    if (!pris.has(a.slug)) {
      pris.add(a.slug)
      choisis.push(a)
    }
  }

  return choisis
}


/**
 * Page secteur correspondant a un article, quand elle existe.
 *
 * POURQUOI : mesure sur le site construit, les pages /secteur ne recevaient
 * QUE des liens de pied de page — 41 liens site-wide, zero depuis le contenu
 * d'une page. Google devalue largement les liens de pied de page repetes
 * partout : en pratique, les pages commerciales n'avaient aucun lien interne
 * editorial, alors que ce sont elles qui doivent capter les requetes d'achat.
 *
 * Un lien contextuel depuis un article de fond, topiquement proche, vaut
 * infiniment plus qu'une ligne de navigation.
 */
export const SECTEUR_PAR_ARTICLE: Record<string, { slug: string; label: string }> = {
  'plaque-nfc-restaurant': { slug: 'restaurant', label: 'Plaque NFC pour restaurants' },
  'plaque-nfc-salon-coiffure': { slug: 'salon-coiffure', label: 'Plaque NFC pour salons de coiffure' },
  'plaque-nfc-cabinet-medical': { slug: 'cabinet-medical', label: 'Plaque NFC pour cabinets médicaux' },
  'plaque-nfc-institut-beaute': { slug: 'salon-coiffure', label: 'Plaque NFC pour salons et instituts' },
  'plaque-nfc-boulangerie': { slug: 'restaurant', label: 'Plaque NFC pour commerces de bouche' },
  'plaque-nfc-garage-automobile': { slug: 'restaurant', label: 'Voir la plaque NFC en situation' },
}

export function secteurDeLArticle(slug: string) {
  return SECTEUR_PAR_ARTICLE[slug] ?? null
}
