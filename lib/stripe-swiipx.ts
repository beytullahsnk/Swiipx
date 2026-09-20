import { PACKS } from './pricing'

/**
 * Reconnaître un paiement Swiipx parmi ceux du compte Stripe.
 *
 * POURQUOI : le compte Stripe encaisse aussi pour SkyFood, l'autre activité du
 * même fondateur. Le webhook réagissait à tous les événements du compte. Le
 * 2026-09-19 à 17 h 56, un abonnement « SkyFood Pro » a donc valu à son
 * acheteur un e-mail « Commande confirmée — Swiipx » annonçant l'expédition
 * d'une plaque NFC sous 24 h, chez un commerçant qui ne connaît pas Swiipx.
 *
 * COMMENT : les paiements créés par ce site portent le marqueur `swiipx=1`
 * (routes create-payment-intent, update-payment-intent et checkout). Le webhook
 * n'agit que sur eux.
 *
 * Deux garde-fous complètent le marqueur :
 * - toute métadonnée dont la clé commence par « skyfood » écarte le paiement,
 *   même si le marqueur traînait par erreur ;
 * - les commandes passées avant l'ajout du marqueur restent reconnues à leur
 *   panier de packs, ou à leur mode de livraison accompagné d'une fiche
 *   d'établissement, le temps que les paiements en cours se règlent.
 *
 * Ni le montant ni le libellé ne servent de critère : un essai à 0,00 € ou un
 * produit renommé les rendraient faux du jour au lendemain.
 */

export const CLE_MARQUEUR = 'swiipx'

/** À étaler dans les métadonnées de tout paiement créé par ce site. */
export const MARQUEUR_SWIIPX: Record<string, string> = { [CLE_MARQUEUR]: '1' }

type Metadonnees = Record<string, string | undefined | null> | null | undefined

/** Panier d'une commande Swiipx : [{ id: 'plaque2', qty: 1 }, …]. */
function panierDePacks(items: string | undefined | null): boolean {
  if (!items) return false
  try {
    const lu: unknown = JSON.parse(items)
    return (
      Array.isArray(lu) &&
      lu.length > 0 &&
      lu.every((element) => {
        const identifiant = (element as { id?: unknown })?.id
        return typeof identifiant === 'string' && Object.prototype.hasOwnProperty.call(PACKS, identifiant)
      })
    )
  } catch {
    return false
  }
}

export function estPaiementSwiipx(metadonnees: Metadonnees): boolean {
  const meta = metadonnees ?? {}

  // Une autre activité du compte se signale : on ne traite jamais son paiement.
  if (Object.keys(meta).some((cle) => cle.toLowerCase().startsWith('skyfood'))) return false

  if (meta[CLE_MARQUEUR] === '1') return true

  // Commandes créées avant le marqueur.
  if (panierDePacks(meta.items)) return true
  const livraison = meta.shipping_method
  if ((livraison === 'domicile' || livraison === 'point_relais') && (meta.business_name || meta.business_place_id || meta.sp_id)) {
    return true
  }

  return false
}

/** Clés des métadonnées, pour les journaux : jamais les valeurs. */
export function clesMetadonnees(metadonnees: Metadonnees): string {
  return Object.keys(metadonnees ?? {}).join(',') || '(aucune)'
}
