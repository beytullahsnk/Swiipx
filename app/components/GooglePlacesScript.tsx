'use client'

import Script from 'next/script'

/**
 * Charge l'API Google Maps / Places.
 *
 * NE PAS remettre ce composant dans ClientLayout : il y etait, donc le script
 * se chargeait sur les 11 pages du site — 1,35 Mo de JavaScript tiers impose a
 * chaque article de blog, alors qu'il ne sert que la ou l'utilisateur saisit
 * son etablissement (accueil et checkout). C'etait le premier poste de cout
 * pour les Core Web Vitals des pages qui recoivent le trafic SEO.
 *
 * Il est desormais rendu par <BusinessAutocomplete>. next/script deduplique par
 * `src`, donc plusieurs instances sur une meme page ne chargent qu'une fois.
 *
 * SECURITE : la cle est necessairement publique (l'API Places s'appelle depuis
 * le navigateur). Elle DOIT donc etre restreinte par referent HTTP dans Google
 * Cloud Console, faute de quoi n'importe qui peut l'extraire du bundle et
 * facturer des appels sur le compte.
 */
export default function GooglePlacesScript() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_KEY
  if (!key) return null

  return (
    <Script
      id="google-maps-places"
      src={`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&loading=async`}
      strategy="afterInteractive"
    />
  )
}
