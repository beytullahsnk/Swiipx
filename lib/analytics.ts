/**
 * Couche de tracking unique pour Swiipx.
 *
 * Un seul point d'entrée : `track(event, params)`.
 * L'événement est envoyé simultanément à GA4 et à Vercel Analytics.
 *
 * Règles :
 * - Aucun crash si un outil n'est pas configuré (no-op silencieux)
 * - Aucune donnée personnelle (pas d'email, pas de nom, pas d'adresse)
 * - Noms d'événements alignés sur le standard GA4 e-commerce
 */

import { track as vercelTrack } from '@vercel/analytics'

type Params = Record<string, string | number | boolean | undefined>

/** Événements suivis. Toute mesure passe par cette liste. */
export type AnalyticsEvent =
  // Découverte produit
  | 'view_item'
  | 'select_pack'
  // Étape clé : personnalisation (friction n°1 suspectée)
  | 'business_search_started'
  | 'business_selected'
  // Panier
  | 'add_to_cart'
  | 'view_cart'
  | 'remove_from_cart'
  // Tunnel de commande
  | 'begin_checkout'
  | 'checkout_contact_completed'
  | 'checkout_address_completed'
  | 'shipping_method_selected'
  | 'service_point_selected'
  | 'add_payment_info'
  | 'purchase'
  // Frictions
  | 'checkout_error'
  | 'express_checkout_shown'
  | 'express_checkout_used'

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Params) => void
    clarity?: (command: string, ...args: unknown[]) => void
  }
}

/**
 * Envoie un événement à tous les outils configurés.
 * Sans effet côté serveur et si aucun outil n'est chargé.
 */
export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === 'undefined') return

  // Nettoie les valeurs undefined (GA4 les rejette)
  const clean: Params = {}
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') clean[key] = value
  }

  try {
    window.gtag?.('event', event, clean)
  } catch {
    /* GA4 absent ou bloqué par un adblock — sans conséquence */
  }

  try {
    vercelTrack(event, clean as Record<string, string | number | boolean>)
  } catch {
    /* Vercel Analytics absent — sans conséquence */
  }
}

/**
 * Marque la session dans Clarity pour pouvoir filtrer les enregistrements
 * (ex. voir uniquement les sessions ayant atteint le checkout).
 */
export function tagSession(key: string, value: string) {
  if (typeof window === 'undefined') return
  try {
    window.clarity?.('set', key, value)
  } catch {
    /* Clarity absent */
  }
}

/** Convertit les centimes en euros pour GA4 (qui attend une valeur décimale). */
export const toEuros = (cents: number) => Number((cents / 100).toFixed(2))
