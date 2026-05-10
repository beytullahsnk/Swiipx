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
      {/* Reposer Tawk : approche brute force (polling + observer + plusieurs sélecteurs)
          car Tawk met du temps à monter et peut ré-appliquer son bottom. */}
      <Script id="tawk-reposition" strategy="afterInteractive">
        {`
          (function() {
            var MOBILE_OFFSET = 90;

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

            function applyOffset() {
              var isMobile = window.innerWidth < 1024;
              var offset = isMobile ? MOBILE_OFFSET : 0;
              var iframes = document.getElementsByTagName('iframe');
              var changed = false;
              for (var i = 0; i < iframes.length; i++) {
                if (!isTawkIframe(iframes[i])) continue;
                var target = findPositionedAncestor(iframes[i]) || iframes[i];
                target.style.setProperty('bottom', offset + 'px', 'important');
                if (target !== iframes[i] && !target.style.getPropertyValue('transition')) {
                  target.style.setProperty('transition', 'bottom 0.2s ease');
                }
                changed = true;
              }
              return changed;
            }

            // Polling agressif pendant 30 secondes
            var attempts = 0;
            var pollInterval = setInterval(function() {
              applyOffset();
              attempts++;
              if (attempts > 60) clearInterval(pollInterval); // 60 * 500ms = 30s
            }, 500);

            // Observe les modifications du DOM (Tawk peut ré-injecter)
            var observer = new MutationObserver(function() {
              applyOffset();
            });
            observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
            setTimeout(function() { observer.disconnect() }, 30000);

            // Re-applique sur resize (changement orientation/breakpoint)
            window.addEventListener('resize', applyOffset);
            window.addEventListener('load', applyOffset);
          })();
        `}
      </Script>
    </>
  )
}
