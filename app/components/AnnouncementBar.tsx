'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Truck, X } from 'lucide-react'
import { useCart } from '../store/cart'
import { PACKS } from '@/lib/pricing'
import { track } from '@/lib/analytics'

/**
 * Bandeau du haut de page : un seul message à la fois.
 *
 * Par défaut, la réassurance (livraison, expédition, garantie). Mais un
 * visiteur qui revient avec un panier non payé voit à la place sa commande en
 * attente, au nom de son établissement quand il l'a choisi. C'est la façon la
 * moins intrusive de récupérer un panier : ni pop-up, ni e-mail, et le
 * navigateur garde déjà le panier entre deux visites (stratégie du
 * 2026-10-02 ; en septembre, 6 ajouts au panier pour 1 achat).
 *
 * « Revenir » = la visite a commencé avec un panier rempli : un panier rempli
 * pendant la visite en cours n'affiche rien, le visiteur sait où il en est.
 * Masqué sur les pages du tunnel d'achat, où il ferait doublon.
 */
const CLE_VISITE = 'swiipx-visite'
const CLE_RETOUR = 'swiipx-retour-panier'
const CLE_FERME = 'swiipx-bandeau-ferme'
const TUNNEL = ['/checkout', '/cart', '/success']
const PROMO = { creative_slot: 'bandeau_retour', promotion_id: 'panier', promotion_name: 'retour_panier' }

export default function AnnouncementBar() {
  const pathname = usePathname()
  const { items, hasHydrated, openCart } = useCart()
  const [ferme, setFerme] = useState(false)
  const [retour, setRetour] = useState(false)

  useEffect(() => {
    if (!hasHydrated) return
    try {
      setFerme(sessionStorage.getItem(CLE_FERME) === '1')
      if (!sessionStorage.getItem(CLE_VISITE)) {
        sessionStorage.setItem(CLE_VISITE, '1')
        sessionStorage.setItem(CLE_RETOUR, items.length > 0 ? '1' : '0')
      }
      setRetour(sessionStorage.getItem(CLE_RETOUR) === '1')
    } catch {
      /* stockage indisponible : bandeau de réassurance */
    }
    // Évalué une fois, au chargement du panier : c'est son état d'arrivée qui compte.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated])

  const plaques = items.reduce((total, item) => total + (PACKS[item.id]?.plaques ?? 0) * item.qty, 0)
  const commerce = items.find((item) => item.businessInfo?.name)?.businessInfo?.name
  const afficheRetour = retour && plaques > 0 && !TUNNEL.some((p) => pathname?.startsWith(p))

  useEffect(() => {
    if (afficheRetour && !ferme) track('view_promotion', PROMO)
  }, [afficheRetour, ferme])

  const fermer = () => {
    setFerme(true)
    if (afficheRetour) track('dismiss_promotion', PROMO)
    try {
      sessionStorage.setItem(CLE_FERME, '1')
    } catch {
      /* fermé jusqu'au rechargement */
    }
  }

  if (ferme) return null

  return (
    <div
      className={`${afficheRetour ? 'bg-primary' : 'bg-gray-900'} text-white text-xs sm:text-sm py-2 pl-4 pr-10 relative`}
    >
      {afficheRetour ? (
        <div className="flex items-center justify-center gap-x-3 gap-y-1 flex-wrap">
          <span className="inline-flex items-center font-medium min-w-0">
            <ShoppingBag className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" aria-hidden="true" />
            {commerce ? (
              // Seul le nom se raccourcit : « vous attend » doit rester lisible.
              <span className="flex min-w-0 items-center">
                <span className="whitespace-nowrap">Votre plaque pour&nbsp;</span>
                <span className="truncate">{commerce}</span>
                <span className="whitespace-nowrap">&nbsp;vous attend</span>
              </span>
            ) : (
              <span className="whitespace-nowrap">
                Votre commande vous attend : {plaques} plaque{plaques > 1 ? 's' : ''}
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={() => {
              track('select_promotion', { ...PROMO, destination: 'panier' })
              openCart()
            }}
            className="font-bold underline underline-offset-2 whitespace-nowrap hover:text-white/80"
          >
            Finaliser ma commande
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-3 gap-y-0 flex-wrap">
          <span className="inline-flex items-center font-medium whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" aria-hidden="true" />
            Livraison offerte en point relais
          </span>
          <span className="text-white/80 whitespace-nowrap">Expédié sous 24 h ouvrées</span>
          <span className="text-white/80 whitespace-nowrap hidden sm:inline">Garantie à vie</span>
        </div>
      )}
      <button
        onClick={fermer}
        /* Cible 44x44 : le bouton se limitait aux 14 px de l'icone. */
        className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
        aria-label="Fermer le bandeau"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
