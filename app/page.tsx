import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import VideoShowcase from './components/VideoShowcase'
import IndustryResults from './components/IndustryResults'
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
        acceptedAnswer: { '@type': 'Answer', text: 'Nous expédions sous 24h ouvrées. La livraison prend entre 2 à 5 jours ouvrés en France métropolitaine. Vous recevrez un numéro de suivi par email.' },
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
    // aggregateRating + review retires : Google interdit les avis auto-generes.
    // A reintroduire uniquement avec de vrais avis clients collectes et affiches.
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://swiipx.fr/#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://swiipx.fr',
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
        text: 'Choisissez votre pack Swiipx (Starter, Business ou Pro) et passez commande sur swiipx.fr. Livraison gratuite en France métropolitaine sous 2-5 jours ouvrés.',
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

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Plaque NFC avis Google Swiipx',
    serviceType: 'Plaque NFC avis Google',
    description: 'Solution NFC clé en main pour collecter des avis Google sans abonnement. Livraison gratuite en France, garantie 2 ans.',
    provider: {
      '@type': 'Organization',
      name: 'Swiipx',
      url: 'https://swiipx.fr',
    },
    areaServed: { '@type': 'Country', name: 'France' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Restaurants, salons de coiffure, cabinets médicaux, commerces de proximité',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '39.90',
      highPrice: '89.90',
      offerCount: 3,
    },
  }

  const offerCatalogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Packs Plaques NFC Swiipx',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Pack Starter — 1 plaque',
        itemOffered: {
          '@type': 'Product',
          name: 'Pack Starter — 1 plaque NFC avis Google',
          image: 'https://swiipx.fr/product-main.jpg',
          brand: { '@type': 'Brand', name: 'Swiipx' },
          offers: {
            '@type': 'Offer',
            url: 'https://swiipx.fr/product/starter',
            price: '39.90',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            seller: { '@type': 'Organization', name: 'Swiipx' },
          },
        },
      },
      {
        '@type': 'Offer',
        name: 'Pack Business — 2 plaques',
        itemOffered: {
          '@type': 'Product',
          name: 'Pack Business — 2 plaques NFC avis Google',
          image: 'https://swiipx.fr/product-main.jpg',
          brand: { '@type': 'Brand', name: 'Swiipx' },
          offers: {
            '@type': 'Offer',
            url: 'https://swiipx.fr/product/business',
            price: '59.90',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            seller: { '@type': 'Organization', name: 'Swiipx' },
          },
        },
      },
      {
        '@type': 'Offer',
        name: 'Pack Pro — 5 plaques',
        itemOffered: {
          '@type': 'Product',
          name: 'Pack Pro — 5 plaques NFC avis Google',
          image: 'https://swiipx.fr/product-main.jpg',
          brand: { '@type': 'Brand', name: 'Swiipx' },
          offers: {
            '@type': 'Offer',
            url: 'https://swiipx.fr/product/pro',
            price: '89.90',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            seller: { '@type': 'Organization', name: 'Swiipx' },
          },
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero Section - Main headline and CTA */}
      <HeroSection />
      
      {/* How It Works - 3-step process explanation */}
      <HowItWorks />

      {/* Product Showcase - Shopify-style product display */}
      <ProductShowcase />

      {/* Video Showcase - 3 vidéos format mobile (placé après le produit) */}
      <VideoShowcase />

      {/* Industry Results — résultats par secteur (placé après le produit) */}
      <IndustryResults />
      
      {/* Testimonials - Customer reviews carousel */}
      <Testimonials />
      
      {/* FAQ - Frequently asked questions accordion */}
      <FAQ />
      
      {/* CTA Section - Final call-to-action before footer */}
      <CTASection />
    </>
  )
}

