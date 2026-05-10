'use client'

import Script from 'next/script'

const TAWK_PROPERTY_ID = '698f027e1f51081c3676f34d'
const TAWK_WIDGET_ID = '1jhba3g6k'

export default function WhatsAppButton() {
  return (
    <>
      <Script
        src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
        strategy="lazyOnload"
      />
      {/* Tawk : masqué sur mobile (le client a déjà la page contact dans le menu).
          Sur desktop, le widget reste visible en bas à droite. */}
      <Script id="tawk-mobile-hide" strategy="afterInteractive">
        {`
          (function() {
            var MOBILE_BREAKPOINT = 1024;

            function isTawkIframe(f) {
              if (!f || f.tagName !== 'IFRAME') return false;
              var title = (f.title || '').toLowerCase();
              var src = (f.src || '').toLowerCase();
              var id = (f.id || '').toLowerCase();
              var name = (f.name || '').toLowerCase();
              return title.indexOf('chat') !== -1
                  || title.indexOf('tawk') !== -1
                  || src.indexOf('tawk.to') !== -1
                  || src.indexOf('embed.tawk') !== -1
                  || id.indexOf('tawk') !== -1
                  || name.indexOf('tawk') !== -1;
            }

            function findPositionedAncestor(el) {
              var node = el;
              while (node && node !== document.body) {
                var pos = window.getComputedStyle(node).position;
                if (pos === 'fixed' || pos === 'absolute') return node;
                node = node.parentElement;
              }
              return null;
            }

            function applyVisibility() {
              var isMobile = window.innerWidth < MOBILE_BREAKPOINT;
              // Tawk API officielle (si dispo)
              try {
                if (window.Tawk_API) {
                  if (isMobile && typeof window.Tawk_API.hideWidget === 'function') {
                    window.Tawk_API.hideWidget();
                  } else if (!isMobile && typeof window.Tawk_API.showWidget === 'function') {
                    window.Tawk_API.showWidget();
                  }
                }
              } catch (e) {}

              // Fallback DOM : force display none/block sur l'iframe Tawk
              var iframes = document.getElementsByTagName('iframe');
              for (var i = 0; i < iframes.length; i++) {
                if (!isTawkIframe(iframes[i])) continue;
                var target = findPositionedAncestor(iframes[i]) || iframes[i];
                target.style.setProperty('display', isMobile ? 'none' : '', 'important');
              }
            }

            // Polling pendant 30s pour attraper Tawk au montage
            var attempts = 0;
            var pollInterval = setInterval(function() {
              applyVisibility();
              attempts++;
              if (attempts > 60) clearInterval(pollInterval);
            }, 500);

            // MutationObserver — Tawk peut ré-injecter
            var observer = new MutationObserver(applyVisibility);
            observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
            setTimeout(function() { observer.disconnect() }, 30000);

            // Resize / orientation : re-apply (rotation mobile <-> desktop)
            window.addEventListener('resize', applyVisibility);
            window.addEventListener('load', applyVisibility);
          })();
        `}
      </Script>
    </>
  )
}
