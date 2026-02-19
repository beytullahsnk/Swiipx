# How to Use ProductShowcase Component

## Quick Start (3 steps)

### Step 1: Import the component

Open `/app/page.tsx` and add the import:

```typescript
import ProductShowcase from './components/ProductShowcase'
```

### Step 2: Replace ProductSection

Replace the old component with the new one:

```typescript
export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ProductShowcase />  {/* ← New Shopify-style component */}
      {/* <ProductSection /> */}  {/* ← Comment out the old one */}
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  )
}
```

### Step 3: Test it

```bash
npm run dev
```

Open http://localhost:3000 and scroll to the product section.

---

## Full Example

Here's the complete updated `app/page.tsx`:

```typescript
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import ProductShowcase from './components/ProductShowcase'
// import ProductSection from './components/ProductSection' // Keep commented for now
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'

export default function Home() {
  return (
    <>
      {/* Hero Section - Main headline and CTA */}
      <HeroSection />
      
      {/* How It Works - 3-step process explanation */}
      <HowItWorks />
      
      {/* Product Showcase - New Shopify-style product display */}
      <ProductShowcase />
      
      {/* OLD Product Section - Kept for reference, not displayed */}
      {/* <ProductSection /> */}
      
      {/* Testimonials - Customer reviews carousel */}
      <Testimonials />
      
      {/* FAQ - Frequently asked questions accordion */}
      <FAQ />
      
      {/* CTA Section - Final call-to-action before footer */}
      <CTASection />
    </>
  )
}
```

---

## What You Get

### Desktop View
```
┌─────────────────────────────────────────────────────────┐
│                    Product Showcase                      │
├──────────────────────────┬──────────────────────────────┤
│                          │  Plaque Avis Google          │
│   [Large Product Image]  │  Doublez vos avis en 30j...  │
│                          │                              │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐  │  ✓ Entreprise Française 🇫🇷  │
│   └──┘ └──┘ └──┘ └──┘  │  ✓ Collectez en 3 secondes   │
│   thumbnails             │  ✓ Sans abonnement           │
│                          │  ✓ 1er sur Google            │
│   🇫🇷 France             │                              │
│   🛡️ Garantie 2 ans      │  [Pack Options]              │
│   🚚 Livraison gratuite  │  ○ 1 Plaque - 39,90€        │
│                          │  ● 2 Plaques - 59,90€ ⭐     │
│                          │  ○ 5 Plaques - 89,90€        │
│                          │                              │
│                          │  [Ajouter au panier]         │
│                          │  🔴 Stock limité             │
│                          │                              │
│                          │  ▼ Comment ça marche         │
│                          │  ▼ Livraison                 │
│                          │  ▼ Garantie & Retours        │
└──────────────────────────┴──────────────────────────────┘
```

### Mobile View
```
┌────────────────────────┐
│  [Large Product Image] │
│  BLACK MONTH badge     │
│                        │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ │
│  └──┘ └──┘ └──┘ └──┘ │
│                        │
│  Plaque Avis Google    │
│  Doublez vos avis...   │
│                        │
│  ⭐⭐⭐⭐⭐ 4.9/5       │
│                        │
│  ✓ Benefits...         │
│                        │
│  [Pack Selection]      │
│                        │
│  [Ajouter au panier]   │
│                        │
│  Collapsible sections  │
└────────────────────────┘
```

---

## Customization Examples

### Change a price

Edit `app/components/ProductShowcase.tsx` line 11:

```typescript
const productPacks = [
  {
    id: 1,
    quantity: 1,
    name: '1 Plaque',
    price: 49.90,          // ← Changed from 39.90
    priceHT: '49,90€ HT',  // ← Update display too
    badge: null,
  },
  // ...
]
```

### Add a new benefit

Edit line 33:

```typescript
const productBenefits = [
  { icon: '🇫🇷', text: 'Entreprise Française' },
  { icon: '⚡', text: 'Collectez des avis en 3 secondes !' },
  { icon: '💳', text: 'Paiement en une fois, sans abonnement' },
  { icon: '🚀', text: 'Soyez 1er dans les recherches Google' },
  { icon: '🎁', text: 'Cadeau offert avec chaque commande' }, // ← New
]
```

### Change the default selected pack

Edit line 45:

```typescript
const [selectedPack, setSelectedPack] = useState(1) // ← Changed from 2
```

Now pack 1 will be selected by default instead of pack 2.

---

## A/B Testing Setup

Want to test both versions? Here's how:

```typescript
'use client'

import { useState } from 'react'
import ProductSection from './components/ProductSection'
import ProductShowcase from './components/ProductShowcase'

export default function Home() {
  // Randomly show one version (50/50 split)
  const [showNewVersion] = useState(Math.random() > 0.5)
  
  return (
    <>
      <HeroSection />
      <HowItWorks />
      
      {/* A/B Test */}
      {showNewVersion ? (
        <ProductShowcase />  // Version B: New Shopify-style
      ) : (
        <ProductSection />   // Version A: Original cards
      )}
      
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  )
}
```

---

## Adding Real Images

### Step 1: Add images to public folder

```
/public/
  /products/
    main.jpg        ← Main product image
    side.jpg        ← Side view
    usage.jpg       ← In use
    pack.jpg        ← Full pack
```

### Step 2: Update the component

In `ProductShowcase.tsx`, replace the placeholder (around line 120):

```typescript
{/* Before: Placeholder */}
<div className="w-64 h-64 bg-gradient-to-br from-primary to-blue-700...">
  <svg>...</svg>
</div>

{/* After: Real image */}
<img 
  src="/products/main.jpg"
  alt="Plaque NFC Swiipx"
  className="w-full h-full object-contain p-8"
/>
```

### Step 3: Update thumbnails

Around line 140:

```typescript
{productImages.map((img, index) => (
  <button key={img.id} onClick={() => setSelectedImage(index)}>
    <img 
      src={`/products/thumb-${index + 1}.jpg`}
      alt={img.alt}
      className="w-full h-full object-cover"
    />
  </button>
))}
```

---

## Troubleshooting

### Component not showing?

1. Check import path:
```typescript
import ProductShowcase from './components/ProductShowcase'
```

2. Verify file exists:
```
app/components/ProductShowcase.tsx ✓
```

3. Check for build errors:
```bash
npm run build
```

### Styling looks off?

Make sure Tailwind is compiling:
```bash
# Restart dev server
npm run dev
```

### Images not loading?

1. Check file paths: `/public/products/image.jpg`
2. Use relative paths in src: `/products/image.jpg`
3. Verify Next.js config allows the domain (for external images)

---

## Next Steps

1. ✅ Component is installed and working
2. 📸 Add your real product images
3. 💰 Adjust prices if needed
4. 🎨 Customize colors/text
5. 🔗 Connect to real cart system (later)
6. 📊 Track conversions with analytics

---

## Questions?

- Read `PRODUCT_SHOWCASE_README.md` for full docs
- Check `ProductShowcase.tsx` code comments
- Original `ProductSection.tsx` is still there as reference

**Status**: Ready to use! 🚀

