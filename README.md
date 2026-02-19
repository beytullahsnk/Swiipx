# 🚀 Swiipx - Landing Page E-commerce

Landing page moderne et optimisée pour la conversion pour Swiipx, concurrent de digifeel.fr. Vente de plaques NFC + QR pour collecter des avis Google.

## 🎯 Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Carousel**: Swiper
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📁 Structure du Projet

```
/app
├── layout.tsx                 # Layout global avec Navbar + Footer
├── page.tsx                   # Landing page principale
├── globals.css                # Styles globaux
├── success/page.tsx           # Page de succès après achat
├── product/[slug]/page.tsx    # Page détail produit
└── components/
    ├── Navbar.tsx             # Navigation avec menu responsive
    ├── HeroSection.tsx        # Section hero avec CTA principal
    ├── HowItWorks.tsx         # Explication en 3 étapes
    ├── ProductSection.tsx     # Grille de produits avec pricing
    ├── Testimonials.tsx       # Carousel de témoignages clients
    ├── FAQ.tsx                # Accordion de questions/réponses
    ├── CTASection.tsx         # Call-to-action final
    └── Footer.tsx             # Footer avec liens et infos
```

## 🚀 Installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
```

3. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🎨 Guide de Style

### Couleurs
- **Primary**: `#2563EB` (blue-600) - Actions principales
- **Accent**: `#FACC15` (yellow-400) - Éléments d'accentuation
- **Neutral**: `#F9FAFB` (gray-50) - Fond principal

### Typographie
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Design System
- **Buttons**: `rounded-xl` avec ombres et hover transitions
- **Cards**: `rounded-3xl` avec effets de profondeur
- **Spacing**: System de grille responsive avec Tailwind
- **Animations**: Fade-in au scroll avec Framer Motion

## 📦 Packs Disponibles

1. **Starter** - 49€
   - 1 plaque NFC
   - Livraison gratuite
   - Garantie 2 ans

2. **Business** - 79€ ⭐ (Le plus populaire)
   - 2 plaques NFC
   - Personnalisation gratuite
   - Support prioritaire
   - Garantie 2 ans

3. **Pro** - 149€
   - 5 plaques NFC
   - Tableau de bord analytics
   - Support 24/7
   - Garantie 3 ans

## 🧩 Fonctionnalités

### Implémentées
- ✅ Landing page complète et responsive
- ✅ Animations smooth au scroll
- ✅ Carousel de témoignages
- ✅ FAQ accordion interactive
- ✅ Système de notifications (toast)
- ✅ Page de détail produit
- ✅ Page de succès post-achat
- ✅ Navigation sticky avec scroll effect
- ✅ Menu mobile responsive

### À Venir (Backend)
- ⏳ Intégration Stripe pour paiements
- ⏳ Gestion du panier
- ⏳ Backend API pour commandes
- ⏳ Dashboard analytics
- ⏳ Système de personnalisation

## 🎯 Optimisations Conversion

- Hero section avec CTA clair et visible
- Social proof (témoignages + stats)
- Urgence et rareté (badges "populaire")
- Trust indicators (garanties, livraison gratuite)
- FAQ pour lever les objections
- Multiple CTAs stratégiquement placés
- Design moderne et professionnel
- Temps de chargement optimisé

## 📱 Responsive Design

- **Mobile First**: Optimisé pour tous les écrans
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Menu Mobile**: Hamburger menu avec animations
- **Touch Friendly**: Boutons et zones de clic adaptés

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

## 📄 Pages

- `/` - Landing page principale
- `/success` - Page de confirmation post-achat
- `/product/starter` - Détail pack Starter
- `/product/business` - Détail pack Business
- `/product/pro` - Détail pack Pro

## 🎨 Personnalisation

Pour modifier les couleurs, éditer `tailwind.config.ts`:

```typescript
colors: {
  primary: '#2563EB',  // Votre couleur primaire
  accent: '#FACC15',   // Votre couleur d'accent
  neutral: '#F9FAFB',  // Votre couleur de fond
}
```

## 📝 Notes Importantes

- Les images sont actuellement des placeholders
- Le panier est simulé (état local uniquement)
- Les paiements ne sont pas encore implémentés
- Les analytics sont mockées
- Canvas-confetti est utilisé pour les animations de succès

## 🤝 Support

Pour toute question ou support:
- Email: contact@swiipx.com
- Téléphone: +33 1 23 45 67 89

## 📜 Licence

© 2025 Swiipx. Tous droits réservés.

