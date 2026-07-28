'use client'

import Script from 'next/script'

const TAWK_PROPERTY_ID = '698f027e1f51081c3676f34d'
const TAWK_WIDGET_ID = '1jhba3g6k'

/**
 * Chat Tawk.to — visible sur desktop uniquement.
 *
 * Le widget est masqué sous 1024 px : le menu mobile propose déjà la page
 * contact, et un widget flottant y mange une part importante de l'écran.
 *
 * POURQUOI CE CODE A ÉTÉ RÉÉCRIT : la version précédente masquait le widget
 * avec un `setInterval` toutes les 500 ms pendant 30 s (60 exécutions, chacune
 * parcourant les iframes avec getComputedStyle, ce qui force un recalcul de
 * style) DOUBLÉ d'un MutationObserver sur tout le <body> en
 * `subtree: true, attributes: true` pendant 30 s. Sur un article de blog au DOM
 * volumineux, cet observateur se déclenchait en continu et rappelait la même
 * fonction. C'était du temps de thread principal pur, donc de l'INP dégradé —
 * une Core Web Vital — sur chaque page, pour une simple règle d'affichage.
 *
 * Désormais : `Tawk_API.onLoad` (le rappel officiel, déclenché quand le widget
 * est prêt), un observateur limité aux enfants directs du <body> — Tawk y
 * injecte son conteneur — arrêté dès qu'il a fait son travail, et un écouteur
 * de redimensionnement. Zéro sondage périodique.
 */
export default function WhatsAppButton() {
  return (
    <>
      <Script
        src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
        strategy="lazyOnload"
      />

      <Script id="tawk-mobile-hide" strategy="lazyOnload">
        {`
          (function() {
            var MOBILE_BREAKPOINT = 1024;

            function isTawkIframe(f) {
              if (!f || f.tagName !== 'IFRAME') return false;
              var champs = ((f.title || '') + ' ' + (f.src || '') + ' ' + (f.id || '') + ' ' + (f.name || '')).toLowerCase();
              return champs.indexOf('chat') !== -1 || champs.indexOf('tawk') !== -1;
            }

            // Remonte jusqu'au conteneur positionne : Tawk enveloppe son iframe
            // dans un div fixe, masquer la seule iframe laisserait une boite vide.
            function conteneur(el) {
              var n = el;
              while (n && n !== document.body) {
                var pos = window.getComputedStyle(n).position;
                if (pos === 'fixed' || pos === 'absolute') return n;
                n = n.parentElement;
              }
              return el;
            }

            function appliquer() {
              var mobile = window.innerWidth < MOBILE_BREAKPOINT;
              try {
                if (window.Tawk_API) {
                  if (mobile && typeof window.Tawk_API.hideWidget === 'function') window.Tawk_API.hideWidget();
                  else if (!mobile && typeof window.Tawk_API.showWidget === 'function') window.Tawk_API.showWidget();
                }
              } catch (e) {}

              var trouve = false;
              var iframes = document.getElementsByTagName('iframe');
              for (var i = 0; i < iframes.length; i++) {
                if (!isTawkIframe(iframes[i])) continue;
                trouve = true;
                conteneur(iframes[i]).style.setProperty('display', mobile ? 'none' : '', 'important');
              }
              return trouve;
            }

            // 1. Rappel officiel : se declenche quand le widget est pret.
            window.Tawk_API = window.Tawk_API || {};
            var onLoadPrecedent = window.Tawk_API.onLoad;
            window.Tawk_API.onLoad = function() {
              if (typeof onLoadPrecedent === 'function') { try { onLoadPrecedent(); } catch (e) {} }
              appliquer();
            };

            // 2. Filet de securite si onLoad ne se declenche pas.
            //    Quelques verifications differees plutot qu'un sondage : Tawk
            //    insere d'abord son conteneur, PUIS l'iframe dedans, donc un
            //    observateur limite aux enfants directs du <body> raterait
            //    l'iframe, et l'etendre en subtree ramenerait le cout qu'on
            //    vient justement de supprimer.
            //    5 appels au total contre 60 auparavant, et on s'arrete des
            //    que le widget est trouve.
            var essais = [400, 1200, 3000, 6000, 12000];
            essais.forEach(function(delai) {
              setTimeout(function() {
                if (!window.__tawkVisibiliteOk) {
                  if (appliquer()) window.__tawkVisibiliteOk = true;
                }
              }, delai);
            });

            // 3. Rotation ou redimensionnement de la fenetre.
            var t;
            window.addEventListener('resize', function() {
              clearTimeout(t);
              t = setTimeout(appliquer, 200);
            });
          })();
        `}
      </Script>
    </>
  )
}
