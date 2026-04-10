import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
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
        name: 'La plaque avis Google est-elle personnalisable ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui ! Vous pouvez personnaliser votre plaque avis Google avec votre logo, vos couleurs et un message personnalisé. La personnalisation est gratuite pour les packs Business et Pro.' },
      },
      {
        '@type': 'Question',
        name: 'Y a-t-il un abonnement ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non, aucun abonnement ! Vous payez une seule fois pour votre plaque NFC et elle fonctionne à vie. Pas de frais cachés, pas de renouvellement mensuel.' },
      },
      {
        '@type': 'Question',
        name: 'Comment fonctionne une plaque avis Google NFC ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La plaque avis Google NFC redirige vos clients directement vers votre page avis Google quand ils approchent leur smartphone. Aucune application nécessaire, compatible iPhone et Android. Un QR code est aussi présent en secours.' },
      },
      {
        '@type': 'Question',
        name: 'Puis-je modifier le lien de redirection plus tard ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, vous pouvez modifier le lien de redirection à tout moment depuis votre espace client.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la garantie ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nos plaques sont garanties 2 ans contre tout défaut de fabrication.' },
      },
      {
        '@type': 'Question',
        name: 'La plaque avis Google résiste-t-elle à l\'extérieur ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, nos plaques avis Google résistent à l\'eau, aux UV et aux températures extrêmes. Installation en extérieur sans problème.' },
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
    name: 'Plaque Avis Google NFC & QR Code — Swiipx',
    description: 'Plaque avis Google NFC pour collecter des avis automatiquement. Vos clients scannent la plaque, laissent un avis en 10 secondes. Sans abonnement.',
    sku: 'SWIIPX-RANGE',
    image: [
      'https://swiipx.fr/product-main.jpg',
      'https://swiipx.fr/product-thumb-1.jpg',
      'https://swiipx.fr/product-thumb-2.jpg',
    ],
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
      priceValidUntil: '2026-12-31',
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
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Marie Dubois' },
        datePublished: '2026-01-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Depuis que j\'ai installé les plaques Swiipx, mes avis Google ont explosé ! +180% en 2 mois.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Thomas Bernard' },
        datePublished: '2026-01-22',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Un investissement qui s\'est payé en quelques semaines ! Mes clients adorent scanner la plaque.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sophie Martin' },
        datePublished: '2026-02-03',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Simple, efficace et ultra rapide à mettre en place. Le retour sur investissement est impressionnant !',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Alexandre Petit' },
        datePublished: '2026-02-10',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Ma note Google est passée de 4.2 à 4.8 en 3 mois. Enfin une solution qui fonctionne !',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Isabelle Rousseau' },
        datePublished: '2026-02-18',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Nos clients adorent la technologie NFC ! Un must-have pour tout commerce.',
      },
    ],
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Comment collecter des avis Google avec une plaque NFC Swiipx',
    description: 'Guide en 3 étapes pour collecter des avis Google automatiquement avec une plaque NFC. Installation en 30 secondes, avis en 10 secondes.',
    totalTime: 'PT5M',
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Plaque NFC Swiipx (à partir de 39,90€)',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Smartphone compatible NFC (iPhone 7+ ou Android récent)',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Commandez votre plaque NFC avis Google',
        text: 'Choisissez votre pack Swiipx (Starter, Business ou Pro) et passez commande sur swiipx.fr. Livraison gratuite en France métropolitaine sous 2-3 jours ouvrés.',
        url: 'https://swiipx.fr/#product',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Collez la plaque dans votre commerce',
        text: 'Placez la plaque NFC à l\'accueil, au comptoir ou en vitrine de votre commerce. Adhésif 3M inclus. Installation en 30 secondes.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Vos clients scannent et laissent un avis Google',
        text: 'Vos clients approchent leur smartphone de la plaque NFC. Ils sont redirigés automatiquement vers votre page d\'avis Google. Avis laissé en 10 secondes, sans application à installer.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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

