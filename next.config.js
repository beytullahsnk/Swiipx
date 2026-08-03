/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  // Pas de slash final : swiipx.fr/blog (pas /blog/) — cohérence des URLs pour le SEO
  trailingSlash: false,
  images: {
    // Formats modernes (meilleur poids → Core Web Vitals → SEO)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Redirections 301 permanentes — CRUCIAL pour ne pas perdre le SEO à la migration.
  // On force le domaine canonique swiipx.fr (sans www) pour concentrer l'autorité.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.swiipx.fr' }],
        destination: 'https://swiipx.fr/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache des médias servis depuis /public.
        //
        // PAS d'`immutable` ici, volontairement. `immutable` interdit au
        // navigateur de revalider le fichier pendant toute la durée du cache :
        // c'est correct pour une URL dont le nom contient un hash de contenu
        // (les assets de /_next/static, que Next gère déjà lui-même), mais pas
        // pour /public, dont les noms sont fixes alors que le contenu peut
        // changer.
        //
        // Avec la règle précédente (max-age=31536000, immutable), remplacer une
        // image sans renommer le fichier la rendait invisible UN AN pour tout
        // visiteur déjà venu. C'est exactement ce qui s'est produit avec les
        // vignettes vidéo : corrigées côté serveur, toujours affichées écrasées
        // côté navigateur.
        //
        // stale-while-revalidate : servi immédiatement depuis le cache, puis
        // rafraîchi en arrière-plan. On garde le bénéfice perf sans figer le
        // contenu.
        source: '/:all*(jpg|jpeg|png|webp|avif|svg|ico|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Les polices, elles, sont bien immuables : Next leur donne un nom
        // contenant un hash de contenu, toute modification change l'URL.
        source: '/:all*(woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
