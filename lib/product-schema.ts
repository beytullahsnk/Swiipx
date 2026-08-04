import {
  HIGHEST_PRICE_CENTS,
  LOWEST_PRICE_CENTS,
  PACK_LIST,
  SHIPPING_DOMICILE_CENTS,
  SHIPPING_POINT_RELAIS_CENTS,
  formatPriceSchema,
  type Pack,
  type PackSlug,
} from './pricing'

/**
 * Fragments de balisage schema.org communs aux offres Swiipx.
 *
 * POURQUOI CE FICHIER EXISTE : Search Console signalait quatre champs manquants
 * sur les « fiches de marchand » — validFrom, hasMerchantReturnPolicy,
 * shippingDetails et description. Ils étaient présents sur les fiches produit
 * mais absents des trois Product imbriqués dans l'OfferCatalog de la page
 * d'accueil, et des AggregateOffer de l'accueil et des pages secteur.
 *
 * La cause est structurelle : chaque bloc JSON-LD était écrit à la main dans sa
 * page. Ajouter un champ obligeait à penser à quatre endroits, et les prix y
 * étaient recopiés en dur. Tout part désormais d'ici, et les montants de
 * lib/pricing.ts.
 */

/**
 * Date d'entrée en vigueur de la grille tarifaire actuelle (29,90 / 54,90 /
 * 89,90 € HT). À mettre à jour lors du prochain changement de prix : `validFrom`
 * dit à Google depuis quand le prix annoncé est celui-ci.
 */
export const OFFRE_VALIDE_DEPUIS = '2026-07-31'

/** Au-delà, Google considère le prix comme périmé et cesse de l'afficher. */
export const PRIX_VALIDE_JUSQUAU = '2026-12-31'

/**
 * Politique de retour.
 *
 * 90 jours et non 14 : le droit légal de rétractation est de 14 jours, mais
 * Swiipx l'étend commercialement à 90 (page /retours, CGV art. 7, tunnel de
 * commande). Le balisage annonçait 14 — on se privait d'un argument réel.
 *
 * Les frais de retour sont à la charge du client : c'est le régime par défaut
 * de l'article L221-23 du Code de la consommation, et aucune page du site ne
 * s'engage à les rembourser. Le balisage déclarait `FreeReturn`, un engagement
 * que rien ne soutenait. Si Swiipx décide de prendre ces frais en charge, il
 * faudra l'écrire sur /retours ET repasser cette valeur à `FreeReturn`.
 */
export const POLITIQUE_RETOUR = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'FR',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 90,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
}

/** Expédition sous 24 h ouvrées, puis 2 à 3 jours de transport. */
const DELAI_LIVRAISON = {
  '@type': 'ShippingDeliveryTime',
  handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 1, unitCode: 'DAY' },
  transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
}

function modeLivraison(nom: string, cents: number) {
  return {
    '@type': 'OfferShippingDetails',
    name: nom,
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: formatPriceSchema(cents),
      currency: 'EUR',
    },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
    deliveryTime: DELAI_LIVRAISON,
  }
}

/**
 * Les deux modes et leur tarif réel. Déclarer une livraison gratuite alors que
 * le domicile est facturé fait désapprouver les fiches : Google recoupe le
 * montant annoncé avec celui débité au panier.
 */
export const MODES_LIVRAISON = [
  modeLivraison('Point relais', SHIPPING_POINT_RELAIS_CENTS),
  modeLivraison('Domicile', SHIPPING_DOMICILE_CENTS),
]

/** Champs communs à toute offre Swiipx — c'est ce qui manquait aux fiches. */
const COMMUN = {
  priceCurrency: 'EUR',
  availability: 'https://schema.org/InStock',
  validFrom: OFFRE_VALIDE_DEPUIS,
  priceValidUntil: PRIX_VALIDE_JUSQUAU,
  seller: { '@type': 'Organization', name: 'Swiipx', url: 'https://swiipx.fr' },
  hasMerchantReturnPolicy: POLITIQUE_RETOUR,
  shippingDetails: MODES_LIVRAISON,
}

/** Offre complète d'un pack, prix pris dans lib/pricing.ts. */
export function offreJsonLd(pack: Pack) {
  return {
    '@type': 'Offer',
    url: `https://swiipx.fr/product/${pack.slug}`,
    price: formatPriceSchema(pack.priceCents),
    ...COMMUN,
  }
}

/** Offre groupée couvrant les trois packs — accueil et pages secteur. */
export function offreGammeJsonLd() {
  return {
    '@type': 'AggregateOffer',
    lowPrice: formatPriceSchema(LOWEST_PRICE_CENTS),
    highPrice: formatPriceSchema(HIGHEST_PRICE_CENTS),
    offerCount: PACK_LIST.length,
    ...COMMUN,
  }
}

/**
 * Descriptions produit destinées au balisage.
 *
 * Search Console signalait « champ description manquant » : les trois Product
 * imbriqués dans l'OfferCatalog de l'accueil n'en avaient aucune. Volontairement
 * factuelles, sans chiffre de résultat invérifiable.
 */
export const DESCRIPTION_PACK: Record<PackSlug, string> = {
  starter:
    "Plaque NFC en acrylique 120 x 120 mm, livrée déjà programmée avec le lien d'avis Google de votre établissement. Vos clients approchent leur smartphone, l'avis se rédige en 10 secondes, sans application à installer. QR code de secours intégré, adhésif 3M fourni, aucun abonnement.",
  business:
    "Deux plaques NFC en acrylique 120 x 120 mm, livrées déjà programmées avec le lien d'avis Google de votre établissement. De quoi couvrir deux emplacements — comptoir et caisse, salle et vitrine. Chacune peut pointer vers un lien différent. QR code de secours intégré, aucun abonnement.",
  pro:
    "Cinq plaques NFC en acrylique 120 x 120 mm, livrées déjà programmées avec le lien d'avis Google de votre établissement. Conçu pour équiper plusieurs points de contact ou plusieurs établissements, chaque plaque pouvant pointer vers un lien différent. QR code de secours intégré, aucun abonnement.",
}

/** Intitulé commercial du pack, tel qu'affiché sur le site. */
export const NOM_PACK: Record<PackSlug, string> = {
  starter: 'Pack Starter',
  business: 'Pack Business',
  pro: 'Pack Pro',
}

/** Product complet d'un pack, pour l'OfferCatalog de la page d'accueil. */
export function produitPackJsonLd(pack: Pack) {
  return {
    '@type': 'Product',
    name: `${NOM_PACK[pack.slug]} — ${pack.plaques} plaque${pack.plaques > 1 ? 's' : ''} NFC avis Google`,
    description: DESCRIPTION_PACK[pack.slug],
    sku: `SWIIPX-${pack.slug.toUpperCase()}`,
    image: [`https://swiipx.fr${pack.image}`, 'https://swiipx.fr/product-main.jpg'],
    brand: { '@type': 'Brand', name: 'Swiipx' },
    offers: offreJsonLd(pack),
  }
}
