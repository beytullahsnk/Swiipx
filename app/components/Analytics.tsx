import Script from 'next/script'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'

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
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />

      {gaId && <GoogleAnalytics gaId={gaId} />}

      {clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  )
}
