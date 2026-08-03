import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

/**
 * Ensemble des outils de mesure.
 *
 * - Vercel Analytics : trafic, pages vues, sources. Sans cookie → pas de bandeau RGPD.
 * - Speed Insights   : Core Web Vitals réels (facteur de classement Google).
 * - GA4              : tunnel e-commerce, attribution, lien Google Ads.
 * - Clarity          : heatmaps, scroll, rage clicks, enregistrements de session.
 *
 * GA4 et Clarity ne se chargent QUE si leur identifiant est présent en variable
 * d'environnement — le site fonctionne normalement sans eux.
 *
 * RIEN N'EST CHARGÉ EN DÉVELOPPEMENT. Les identifiants figurent dans
 * .env.local, donc chaque session sur localhost partait dans les statistiques
 * de production. Constaté : sur 68 sessions Clarity relevées, 35 provenaient du
 * navigateur de développement, et les erreurs JavaScript remontées étaient
 * celles rencontrées en local avant correction — jamais vues par un visiteur.
 * Sur un site à faible trafic, ce bruit rend les chiffres inexploitables.
 */
export default function Analytics() {
  // En dev, on ne mesure rien : les sessions de travail fausseraient les
  // statistiques de production.
  if (process.env.NODE_ENV !== 'production') return null

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />

      {/* GTM et GA4 direct sont EXCLUSIFS : si GTM est configuré, c'est lui
          qui envoie à GA4. Charger les deux doublerait chaque événement. */}
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Clarity n'est PAS ici : Microsoft demande une pose dans le <head>, et
          next/script place le script en fin de <body> quelle que soit la
          stratégie (vérifié : 'afterInteractive' comme 'beforeInteractive').
          Il est donc rendu directement dans le <head> de app/layout.tsx. */}
    </>
  )
}
