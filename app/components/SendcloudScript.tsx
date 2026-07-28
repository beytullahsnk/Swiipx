'use client'

import Script from 'next/script'

/**
 * Selecteur de point relais Sendcloud.
 *
 * NE PAS remettre dans ClientLayout : il y etait, donc Next posait un
 * <link rel="preload"> vers embed.sendcloud.sc dans le <head> de TOUTES les
 * pages — y compris les 21 articles de blog. Un preload est une recuperation
 * prioritaire : le script se disputait la bande passante avec les ressources
 * qui determinent reellement le LCP, et chaque visiteur payait une resolution
 * DNS et une poignee de main TLS vers un tiers pour un script utilise nulle
 * part sur ces pages.
 *
 * Il n'est desormais rendu que la ou l'on choisit un point relais.
 * next/script deduplique par `src`.
 */
export default function SendcloudScript() {
  return (
    <Script
      id="sendcloud-spp"
      src="https://embed.sendcloud.sc/spp/1.0.0/api.min.js"
      strategy="afterInteractive"
    />
  )
}
