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
        // Cache long pour les assets statiques — perf + Core Web Vitals (bon signal SEO)
        source: '/:all*(jpg|jpeg|png|webp|avif|svg|ico|woff|woff2|mp4)',
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
