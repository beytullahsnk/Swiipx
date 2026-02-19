# 🛒 Implémentation du Panier et Stripe Checkout - Swiipx

## ✅ Fonctionnalités Implémentées

### 1. Store Panier (Zustand + Persistence)
**Fichier**: `/app/store/cart.ts`

**Features**:
- État global du panier avec `zustand`
- Persistance automatique dans `localStorage`
- Types TypeScript stricts
- Actions complètes: add, remove, setQty, clear
- Selectors: totalCents(), totalItems()
- Gestion de l'ouverture/fermeture du side-cart

**Produits configurés** (IDs Stripe réels):
```typescript
plaque1: 39,90€ (prod_TOiYSEiHtjAjAU)
plaque2: 59,90€ (prod_TOiZMHK0uOzIIb)
plaque5: 89,90€ (prod_TOiZBuKlMrDfpR)
```

### 2. Side Cart Component
**Fichier**: `/app/components/SideCart.tsx`

**Features**:
- Slide-in depuis la droite avec Framer Motion
- Overlay cliquable pour fermer
- Liste des produits avec images placeholders
- Contrôles quantité (+/-)
- Bouton supprimer par produit
- Sous-total dynamique
- 2 CTAs: "Commander" et "Voir le panier"
- Gestion état de chargement pendant checkout

### 3. Navbar Mise à Jour
**Fichier**: `/app/components/Navbar.tsx`

**Changes**:
- Import du store cart
- Icône panier avec badge dynamique (nombre d'items)
- Click sur l'icône ouvre le side-cart
- Intégration du composant `<SideCart />`

### 4. Page Panier Complète
**Fichier**: `/app/cart/page.tsx`

**Features**:
- Layout responsive (grid 2/3 + 1/3)
- Table produits avec:
  - Image placeholder
  - Nom et prix
  - Quantité éditable (input + +/-)
  - Total ligne
  - Bouton supprimer
- État vide avec CTA vers la page d'accueil
- Sidebar récapitulatif:
  - Sous-total
  - Livraison (gratuite)
  - Total TTC
  - Trust badges
  - Bouton "Commander maintenant"
  - Bouton "Continuer mes achats"
- Animations Framer Motion au chargement

### 5. API Stripe Checkout
**Fichier**: `/app/api/checkout/route.ts`

**Features**:
- Endpoint POST `/api/checkout`
- Validation des items du panier
- Mapping vers produits Stripe via `PRODUCT_MAP`
- Création session Stripe Checkout avec:
  - Mode: payment
  - Line items avec `price_data`
  - Currency: EUR
  - Adresse de livraison (France + limitrophes)
  - URLs de succès/annulation
  - Locale: fr
- Gestion d'erreurs complète
- Pas de secrets exposés (env vars uniquement)

### 6. Page Succès Mise à Jour
**Fichier**: `/app/success/page.tsx`

**Changes**:
- Import du store cart
- Clear automatique du panier après paiement réussi
- Récupération du `session_id` depuis l'URL
- Commentaire TODO pour futur webhook

### 7. Intégration ProductSection
**Fichier**: `/app/components/ProductSection.tsx`

**Changes**:
- IDs produits alignés avec cart store (`plaque1`, `plaque2`, `plaque5`)
- Prix mis à jour (39.90€, 59.90€, 89.90€)
- Bouton "Ajouter au panier" fonctionnel
- Ouverture automatique du side-cart après ajout
- Toast de confirmation

### 8. Intégration ProductShowcase
**Fichier**: `/app/components/ProductShowcase.tsx`

**Changes**:
- IDs produits alignés avec cart store
- Bouton "Ajouter au panier" fonctionnel
- Ouverture automatique du side-cart après ajout
- Sélection de pack par défaut: pack 2 (plaque2)

---

## 📦 Nouvelles Dépendances

Ajoutées dans `package.json`:
```json
"stripe": "^14.10.0",
"zustand": "^4.5.0"
```

---

## 🔧 Configuration Requise

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer les variables d'environnement

Créez le fichier `.env.local` à la racine :

```env
# Stripe Keys (Mode Test)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Site URL
NEXT_PUBLIC_URL=http://localhost:3000
```

**Où trouver vos clés Stripe**:
1. https://dashboard.stripe.com
2. Activez le mode **Test** (toggle en haut à droite)
3. **Developers** → **API keys**
4. Copiez:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

---

## 🧪 Tests Manuels

### Scénario Complet

1. **Ajouter au panier**:
   ```
   - Aller sur la page d'accueil
   - Cliquer "Ajouter au panier" sur un pack
   - ✅ Toast de confirmation apparaît
   - ✅ Side-cart s'ouvre automatiquement
   - ✅ Badge panier (navbar) affiche "1"
   ```

2. **Side-cart**:
   ```
   - ✅ Produit visible avec image, nom, prix
   - ✅ Boutons +/- fonctionnent
   - ✅ Sous-total se met à jour
   - ✅ Cliquer overlay ferme le side-cart
   - ✅ Badge navbar se met à jour
   ```

3. **Page panier**:
   ```
   - Cliquer "Voir le panier" dans side-cart
   - ✅ Redirige vers /cart
   - ✅ Produits affichés en tableau
   - ✅ Input quantité éditable
   - ✅ Total ligne correct
   - ✅ Sous-total et total corrects
   - ✅ Supprimer un produit fonctionne
   ```

4. **Checkout Stripe**:
   ```
   - Cliquer "Commander maintenant"
   - ✅ Redirection vers Stripe Checkout
   - ✅ Produits et prix corrects
   - ✅ Locale en français
   - Entrer carte test: 4242 4242 4242 4242
   - Date: n'importe quelle date future
   - CVC: 123
   - ✅ Paiement réussit
   ```

5. **Page succès**:
   ```
   - ✅ Confettis s'affichent
   - ✅ Message de confirmation
   - ✅ Panier vidé automatiquement
   - ✅ Badge navbar = 0
   - ✅ Lien retour accueil fonctionne
   ```

### Cartes de Test Stripe

| Carte | Résultat |
|-------|----------|
| `4242 4242 4242 4242` | Succès ✅ |
| `4000 0000 0000 0002` | Décliné ❌ |
| `4000 0025 0000 3155` | 3D Secure requis |

---

## 🎯 Flux Utilisateur Complet

```
Homepage
   ↓
[Ajouter au panier] → Side-Cart s'ouvre
   ↓                     ↓
   ↓              [Commander] ────┐
   ↓                               ↓
[Voir le panier] → /cart     Stripe Checkout
                     ↓              ↓
          [Commander maintenant]  Paiement
                     ↓              ↓
                     └──────────→ /success
                                    ↓
                              Panier vidé + Confettis
```

---

## 📁 Structure des Fichiers Créés/Modifiés

```
app/
├── store/
│   └── cart.ts                    ← Store Zustand (nouveau)
│
├── components/
│   ├── SideCart.tsx               ← Panier latéral (nouveau)
│   ├── Navbar.tsx                 ← Mis à jour
│   ├── ProductSection.tsx         ← Mis à jour
│   └── ProductShowcase.tsx        ← Mis à jour
│
├── cart/
│   └── page.tsx                   ← Page panier (nouveau)
│
├── api/
│   └── checkout/
│       └── route.ts               ← Endpoint Stripe (nouveau)
│
└── success/
    └── page.tsx                   ← Mis à jour

package.json                       ← Dépendances ajoutées
.env.local                         ← À créer (voir ENV_SETUP.md)
```

---

## 🔒 Sécurité

✅ **Clés API**:
- Jamais de clés hardcodées
- Variables d'environnement uniquement
- `.env.local` dans `.gitignore`

✅ **Validation**:
- Validation des IDs produits côté serveur
- Montants définis côté serveur (pas envoyés par le client)
- Session Stripe créée avec produits Stripe réels

✅ **Production**:
- Remplacer les clés test par les clés live
- Implémenter webhook `checkout.session.completed`
- Vérifier signature webhook avant traitement

---

## 🚀 Prochaines Étapes (Production)

### Court terme
- [ ] Ajouter vraies images produits dans `/public/products/`
- [ ] Tester sur mobile
- [ ] Ajuster les prix si besoin

### Moyen terme
- [ ] Implémenter webhook Stripe pour confirmer paiements
- [ ] Créer base de données pour commandes
- [ ] Envoyer emails de confirmation
- [ ] Tableau de bord admin

### Long terme
- [ ] Codes promo / coupons
- [ ] Gestion stock
- [ ] Suivi de livraison
- [ ] Programme de fidélité

---

## 🐛 Troubleshooting

### Le panier ne s'ouvre pas
- Vérifier la console pour erreurs
- Vérifier que `useCart` est bien importé
- Redémarrer le serveur dev

### Erreur Stripe "Invalid API Key"
- Vérifier `.env.local` existe
- Vérifier format des clés (sk_test_... et pk_test_...)
- Redémarrer le serveur: `npm run dev`

### Le panier se vide au refresh
- Normal en dev si hot reload
- En prod, vérifie localStorage dans DevTools
- Clé: `swiipx-cart`

### Redirect Stripe ne fonctionne pas
- Vérifier `NEXT_PUBLIC_URL` dans `.env.local`
- Utiliser l'URL complète: `http://localhost:3000`
- Vérifier console navigateur pour erreurs CORS

---

## 💡 Notes Techniques

### Zustand vs Context API
Choix de Zustand pour:
- ✅ Plus simple que Redux
- ✅ Moins verbose que Context
- ✅ Meilleure performance
- ✅ Persistence intégrée
- ✅ DevTools support

### Stripe Price Data vs Price IDs
Utilisation de `price_data` car:
- ✅ Pas besoin de créer des Price objects dans Stripe Dashboard
- ✅ Flexibilité pour ajuster prix
- ✅ Référence directe aux Product IDs
- ❌ Moins adapté si beaucoup de produits

Pour scale, passer à des Price IDs fixes.

### localStorage Persistence
- Clé: `swiipx-cart`
- Format: JSON stringifié
- Hydration automatique au chargement
- Supporte `incognito` (mais perd données à fermeture)

---

## ✅ Checklist Finale

Installation & Config:
- [x] `npm install` exécuté
- [ ] `.env.local` créé avec vos clés Stripe
- [x] Code TypeScript sans erreurs
- [x] Build Next.js réussi

Composants:
- [x] Store cart fonctionnel
- [x] SideCart slide-in animé
- [x] Navbar avec badge panier
- [x] Page /cart responsive
- [x] API checkout Stripe
- [x] Page success mise à jour
- [x] ProductSection intégré
- [x] ProductShowcase intégré

Tests:
- [ ] Ajout au panier
- [ ] Side-cart interactions
- [ ] Page panier
- [ ] Checkout Stripe (carte test)
- [ ] Page succès + clear panier

---

## 📚 Références

- [Stripe Docs - Checkout](https://stripe.com/docs/payments/checkout)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Framer Motion](https://www.framer.com/motion/)

---

**Date**: Novembre 2025  
**Version**: 1.0.0  
**Status**: ✅ Prêt à tester

**Bon test ! 🚀**

