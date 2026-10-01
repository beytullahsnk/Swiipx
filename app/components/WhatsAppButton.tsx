'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useCart } from '../store/cart'

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
 *
 * Le script neutralise aussi deux zones transparentes de tawk.to qui captaient
 * les clics en bas à droite de l'écran : pied de page (Mentions légales, CGV…)
 * et bouton « Passer commande » du panier (détail dans le script).
 *
 * Le même script pose aussi `Tawk_API.onOfflineSubmit`. Un message laissé via
 * le formulaire hors ligne ne déclenche aucun webhook tawk.to : sans ce rappel,
 * personne n'était prévenu. Il transmet les champs du formulaire et la page à
 * app/api/tawk-alerte, qui relaie l'alerte sur Telegram.
 */
export default function WhatsAppButton() {
  // Panier ouvert : la bulle du chat recouvrait la droite du bouton « Passer
  // commande ». Le chat se retire le temps du panier et revient à sa fermeture.
  const panierOuvert = useCart((s) => s.isOpen)
  useEffect(() => {
    const tawk = (window as unknown as { Tawk_API?: { hideWidget?: () => void; showWidget?: () => void } }).Tawk_API
    if (!tawk || window.innerWidth < 1024) return
    try {
      if (panierOuvert) tawk.hideWidget?.()
      else tawk.showWidget?.()
    } catch {}
  }, [panierOuvert])

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

            // Zones transparentes qui captent les clics.
            // Constate le 1er octobre 2026 : tawk.to laisse en bas a droite deux
            // iframes transparentes et actives, meme quand elles n'affichent
            // rien : l'apercu de message (360 x 545 px) et la mention tawk.to
            // (350 x 45 px). Sur ordinateur, elles recouvraient la colonne
            // « A propos, Blog, Contact, Mentions legales, CGV » du pied de
            // page, et le bouton « Passer commande » du panier, qui ne
            // repondait que sur ses 15 premiers pixels.
            // Elles laissent desormais passer les clics tant qu'elles sont
            // vides : l'apercu les reprend des qu'un message s'y affiche, la
            // mention des que la fenetre du chat est ouverte.
            function laisserPasser(id, actif) {
              var c = document.getElementById(id);
              var f = c && c.querySelector('iframe');
              if (!f) return;
              var voulu = actif ? 'auto' : 'none';
              if (f.style.getPropertyValue('pointer-events') !== voulu) f.style.setProperty('pointer-events', voulu, 'important');
            }
            function apercuAffiche() {
              var c = document.getElementById('message-preview');
              var f = c && c.querySelector('iframe');
              try { return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerText.trim()); } catch (e) { return true; }
            }
            function chatOuvert() {
              try { return !!(window.Tawk_API && window.Tawk_API.isChatMaximized && window.Tawk_API.isChatMaximized()); } catch (e) { return false; }
            }
            function libererClics() {
              laisserPasser('message-preview', apercuAffiche());
              laisserPasser('branding-widget', chatOuvert());
            }
            // Tawk.to reecrit le style de ses iframes et le contenu de l'apercu :
            // on suit ces deux seuls changements, sur ces deux seules iframes.
            var suivies = [];
            function suivre() {
              ['message-preview', 'branding-widget'].forEach(function(id) {
                var c = document.getElementById(id);
                var f = c && c.querySelector('iframe');
                if (!f || suivies.indexOf(f) !== -1) return;
                suivies.push(f);
                new MutationObserver(libererClics).observe(f, { attributes: true, attributeFilter: ['style'] });
                try {
                  if (id === 'message-preview' && f.contentDocument && f.contentDocument.body) {
                    new MutationObserver(libererClics).observe(f.contentDocument.body, { childList: true, subtree: true, characterData: true });
                  }
                } catch (e) {}
              });
              libererClics();
            }

            // 1. Rappel officiel : se declenche quand le widget est pret.
            window.Tawk_API = window.Tawk_API || {};
            var onLoadPrecedent = window.Tawk_API.onLoad;
            window.Tawk_API.onLoad = function() {
              if (typeof onLoadPrecedent === 'function') { try { onLoadPrecedent(); } catch (e) {} }
              appliquer();
              suivre();
            };
            ['onChatMaximized', 'onChatMinimized', 'onUnreadCountChanged'].forEach(function(nom) {
              var precedent = window.Tawk_API[nom];
              window.Tawk_API[nom] = function(a) {
                if (typeof precedent === 'function') { try { precedent(a); } catch (e) {} }
                setTimeout(libererClics, 300);
              };
            });

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
                  if (appliquer()) { window.__tawkVisibiliteOk = true; suivre(); }
                }
              }, delai);
            });

            // 3. Rotation ou redimensionnement de la fenetre.
            var t;
            window.addEventListener('resize', function() {
              clearTimeout(t);
              t = setTimeout(appliquer, 200);
            });

            // 4. Alerte Telegram pour les messages hors ligne : ils ne
            //    declenchent aucun webhook tawk.to, seul ce rappel du
            //    navigateur les voit passer (app/api/tawk-alerte).
            var horsLignePrecedent = window.Tawk_API.onOfflineSubmit;
            window.Tawk_API.onOfflineSubmit = function(data) {
              if (typeof horsLignePrecedent === 'function') { try { horsLignePrecedent(data); } catch (e) {} }
              try {
                // Le widget v4 passe l'objet formData de son formulaire, dont
                // les cles dependent des champs configures : on le transmet tel
                // quel, moins les attributs techniques, et le serveur y
                // cherche le texte du visiteur.
                var formulaire = {};
                if (data && typeof data === 'object') {
                  Object.keys(data).forEach(function(cle) {
                    if (cle !== 'customAttributes' && cle !== 'widgetId') formulaire[cle] = data[cle];
                  });
                }
                fetch('/api/tawk-alerte', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ formData: formulaire, page: window.location.pathname }),
                  keepalive: true
                }).catch(function() {});
              } catch (e) {}
            };
          })();
        `}
      </Script>
    </>
  )
}
