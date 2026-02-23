import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import ProductSection from './components/ProductSection'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import ProductShowcase from './components/ProductShowcase'

export const dynamic = 'force-static'

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Combien de temps pour la livraison ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nous expédions sous 24h ouvrées. La livraison prend entre 2 à 3 jours ouvrés en France métropolitaine. Vous recevrez un numéro de suivi par email.' },
      },
      {
        '@type': 'Question',
        name: 'La plaque est-elle personnalisable ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui ! Vous pouvez personnaliser la plaque avec votre logo, vos couleurs et un message personnalisé. La personnalisation est gratuite pour les packs Business et Pro.' },
      },
      {
        '@type': 'Question',
        name: 'Y a-t-il un abonnement ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non, aucun abonnement ! Vous payez une seule fois pour votre plaque NFC et elle fonctionne à vie. Pas de frais cachés, pas de renouvellement mensuel.' },
      },
      {
        '@type': 'Question',
        name: 'Comment fonctionne la technologie NFC ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le NFC permet à vos clients de scanner la plaque en approchant leur smartphone. Aucune application nécessaire, compatible avec tous les smartphones récents. Un QR code est aussi présent sur la plaque.' },
      },
      {
        '@type': 'Question',
        name: 'Puis-je modifier le lien de redirection plus tard ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, vous pouvez modifier le lien de redirection à tout moment depuis votre espace client.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la garantie ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nos plaques sont garanties 2 ans (3 ans pour le pack Pro) contre tout défaut de fabrication.' },
      },
      {
        '@type': 'Question',
        name: 'La plaque résiste-t-elle à l\'extérieur ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, nos plaques résistent à l\'eau, aux UV et aux températures extrêmes. Installation en extérieur sans problème.' },
      },
      {
        '@type': 'Question',
        name: 'Puis-je commander plusieurs plaques pour différents lieux ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Bien sûr ! Le pack Pro (5 plaques) est idéal pour plusieurs points de vente. Chaque plaque peut être configurée avec un lien différent.' },
      },
    ],
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Plaque NFC Avis Google — Swiipx',
    description: 'Plaque NFC pour collecter des avis Google automatiquement. Vos clients scannent, laissent un avis en 10 secondes. Sans abonnement.',
    image: 'https://swiipx.fr/product-main.jpg',
    brand: {
      '@type': 'Brand',
      name: 'Swiipx',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '39.90',
      highPrice: '89.90',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      offerCount: 3,
      seller: {
        '@type': 'Organization',
        name: 'Swiipx',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Marie Dubois' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Depuis que j\'ai installé les plaques Swiipx, mes avis Google ont explosé ! +180% en 2 mois.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Thomas Bernard' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Un investissement qui s\'est payé en quelques semaines ! Mes clients adorent scanner la plaque.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sophie Martin' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Simple, efficace et ultra rapide à mettre en place. Le retour sur investissement est impressionnant !',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Alexandre Petit' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Ma note Google est passée de 4.2 à 4.8 en 3 mois. Enfin une solution qui fonctionne !',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Isabelle Rousseau' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Nos clients adorent la technologie NFC ! Un must-have pour tout commerce.',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero Section - Main headline and CTA */}
      <HeroSection />
      
      {/* How It Works - 3-step process explanation */}
      <HowItWorks />
      
      {/* Product Showcase - Shopify-style product display */}
      <ProductShowcase />
      
      {/* Testimonials - Customer reviews carousel */}
      <Testimonials />
      
      {/* FAQ - Frequently asked questions accordion */}
      <FAQ />
      
      {/* CTA Section - Final call-to-action before footer */}
      <CTASection />
    </>
  )
}

