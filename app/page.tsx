import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import ProductSection from './components/ProductSection'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import ProductShowcase from './components/ProductShowcase'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
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

