# 🚀 Quick Start - Panier & Stripe Checkout

## ⚡ Installation Express (5 minutes)

### Étape 1: Installer les nouvelles dépendances

```bash
npm install
```

Ceci installera:
- `stripe` (^14.10.0) - SDK Stripe pour Node.js
- `zustand` (^4.5.0) - State management pour le panier

### Étape 2: Configurer les variables d'environnement

Créez le fichier `.env.local` à la racine du projet:

```env
# Stripe Keys (Mode Test)
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_ici
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_ici

# Site URL (localhost en dev, votre domaine en prod)
NEXT_PUBLIC_URL=http://localhost:3000
```

**📌 Où trouver vos clés Stripe:**
1. Allez sur https://dashboard.stripe.com
2. Activez le mode **Test** (toggle en haut à droite)
3. **Developers** → **API keys**
4. Copiez vos clés (Publishable key et Secret key)

### Étape 3: Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez http://localhost:3000

---

## ✅ Tester le Panier

### 1. Ajouter un produit
- Scrollez jusqu'à la section "Produits"
- Cliquez sur "Ajouter au panier"
- ✅ Le side-cart s'ouvre automatiquement
- ✅ Le badge panier affiche "1"

### 2. Voir le panier complet
- Cliquez sur "Voir le panier" dans le side-cart
- OU cliquez sur l'icône panier dans la navbar
- ✅ Page `/cart` s'affiche

### 3. Modifier la quantité
- Utilisez les boutons +/- ou l'input
- ✅ Total se met à jour en temps réel

### 4. Passer commande (Mode Test)
- Cliquez "Commander maintenant"
- ✅ Redirection vers Stripe Checkout
- Entrez ces informations test:
  - **Carte**: `4242 4242 4242 4242`
  - **Date**: n'importe quelle date future (ex: 12/25)
  - **CVC**: `123`
  - **Email**: votre email
- Cliquez "Payer"
- ✅ Redirection vers `/success`
- ✅ Confettis s'affichent 🎉
- ✅ Panier automatiquement vidé

---

## 📦 Ce Qui a Été Créé

### Nouveaux Fichiers

```
app/
├── store/
│   └── cart.ts                    ← Store Zustand (panier global)
│
├── components/
│   └── SideCart.tsx               ← Panier latéral slide-in
│
├── cart/
│   └── page.tsx                   ← Page panier complète
│
└── api/
    └── checkout/
        └── route.ts               ← API Stripe Checkout
```

### Fichiers Modifiés

```
app/
├── components/
│   ├── Navbar.tsx                 ← Icône panier + badge
│   ├── ProductSection.tsx         ← Bouton "Ajouter au panier"
│   └── ProductShowcase.tsx        ← Bouton "Ajouter au panier"
│
└── success/
    └── page.tsx                   ← Clear panier après paiement

package.json                       ← + stripe, zustand
```

---

## 🎯 Fonctionnalités Implémentées

### Panier (Zustand)
✅ Ajout/suppression de produits  
✅ Modification de quantité  
✅ Calcul automatique du total  
✅ Persistence dans localStorage  
✅ Badge dynamique sur navbar  

### Side-Cart
✅ Slide-in animé depuis la droite  
✅ Overlay cliquable pour fermer  
✅ Liste des produits avec contrôles  
✅ Boutons "Voir le panier" et "Commander"  

### Page Panier (/cart)
✅ Layout responsive (2 colonnes desktop)  
✅ Table produits avec quantité éditable  
✅ Sidebar récapitulatif avec total  
✅ État vide avec CTA  
✅ Animations Framer Motion  

### Stripe Checkout
✅ Création de session payment  
✅ Produits mappés avec IDs Stripe réels  
✅ Prix en EUR (TTC)  
✅ Adresse de livraison  
✅ Locale française  
✅ URLs de succès/annulation  

### Page Succès
✅ Confettis automatiques  
✅ Clear panier après paiement  
✅ Message de confirmation  
✅ Liens de navigation  

---

## 💰 Produits Configurés

| ID | Nom | Prix | Product ID Stripe |
|----|-----|------|-------------------|
| `plaque1` | 1 Plaque | 39,90€ | prod_TOiYSEiHtjAjAU |
| `plaque2` | 2 Plaques | 59,90€ | prod_TOiZMHK0uOzIIb |
| `plaque5` | 5 Plaques | 89,90€ | prod_TOiZBuKlMrDfpR |

---

## 🐛 Troubleshooting

### Erreur "Module not found: zustand"
```bash
# Solution:
npm install
```

### Erreur "Invalid API Key"
- Vérifiez que `.env.local` existe à la racine
- Vérifiez que les clés commencent par `sk_test_` et `pk_test_`
- Redémarrez le serveur: `npm run dev`

### Le panier ne s'affiche pas
- Ouvrez la console (F12)
- Vérifiez qu'il n'y a pas d'erreurs
- Vérifiez que vous avez bien run `npm install`

### Stripe Checkout ne redirige pas
- Vérifiez `NEXT_PUBLIC_URL` dans `.env.local`
- Doit être `http://localhost:3000` (pas de slash à la fin)

---

## 🧪 Cartes de Test Stripe

| Numéro de Carte | Résultat |
|-----------------|----------|
| `4242 4242 4242 4242` | ✅ Paiement réussi |
| `4000 0000 0000 9995` | ❌ Fonds insuffisants |
| `4000 0000 0000 0002` | ❌ Carte déclinée |
| `4000 0025 0000 3155` | ⚠️ 3D Secure requis |

**Tous les tests**: Date future + CVC quelconque (ex: 123)

---

## 📝 Checklist Post-Installation

- [ ] `npm install` exécuté sans erreurs
- [ ] Fichier `.env.local` créé avec vos clés Stripe
- [ ] Serveur dev lancé (`npm run dev`)
- [ ] Aucune erreur dans la console navigateur
- [ ] Badge panier visible dans navbar
- [ ] Bouton "Ajouter au panier" fonctionne
- [ ] Side-cart s'ouvre/ferme correctement
- [ ] Page `/cart` accessible
- [ ] Checkout Stripe redirige correctement
- [ ] Page `/success` affiche les confettis

---

## 🎓 Utilisation du Store Cart

### Dans un composant

```typescript
import { useCart } from '../store/cart'

function MonComposant() {
  const { 
    items,           // Tableau des produits
    addItem,         // Ajouter un produit
    removeItem,      // Supprimer un produit
    setQty,          // Modifier la quantité
    clearCart,       // Vider le panier
    totalCents,      // Total en centimes
    totalItems,      // Nombre total d'items
    openCart,        // Ouvrir le side-cart
    closeCart,       // Fermer le side-cart
  } = useCart()

  // Ajouter un produit
  const handleAdd = () => {
    addItem('plaque1') // ou 'plaque2', 'plaque5'
    openCart() // Ouvrir le side-cart
  }

  return (
    <button onClick={handleAdd}>
      Panier ({totalItems()})
    </button>
  )
}
```

---

## 🔐 Sécurité

✅ **Clés API jamais exposées** côté client  
✅ **Montants définis** côté serveur (pas modifiables par l'utilisateur)  
✅ **Validation** des IDs produits côté serveur  
✅ **Variables d'environnement** protégées par `.gitignore`  

---

## 🚀 Déploiement Production

### 1. Activer le mode Live Stripe
- Dashboard Stripe → Désactiver mode Test
- Générer de nouvelles clés API Live
- Remplacer dans `.env.local` (ou variables d'env Vercel)

### 2. Mettre à jour l'URL
```env
NEXT_PUBLIC_URL=https://votredomaine.com
```

### 3. Implémenter les Webhooks (Recommandé)
```typescript
// app/api/webhooks/stripe/route.ts
// TODO: Vérifier checkout.session.completed
// Créer commande en BDD
// Envoyer email de confirmation
```

### 4. Deploy
```bash
npm run build  # Tester localement
vercel --prod  # Déployer sur Vercel
```

---

## 💡 Prochaines Améliorations

### Court terme
- [ ] Ajouter vraies images produits
- [ ] Tests sur mobile
- [ ] Emails de confirmation

### Moyen terme
- [ ] Webhook Stripe
- [ ] Base de données commandes
- [ ] Dashboard admin

### Long terme
- [ ] Codes promo
- [ ] Gestion stock
- [ ] Programme fidélité

---

## 📚 Documentation Complète

- **STRIPE_CART_IMPLEMENTATION.md** → Documentation technique complète
- **ENV_SETUP.md** → Guide configuration environnement
- Ce fichier (QUICK_START_STRIPE.md) → Guide rapide

---

## 🎉 Félicitations !

Vous avez maintenant:
✅ Un panier fonctionnel avec persistance  
✅ Un side-cart animé moderne  
✅ Une page panier complète  
✅ Un checkout Stripe sécurisé  
✅ Une expérience utilisateur fluide  

**Prêt à vendre vos plaques NFC ! 🚀**

---

**Questions ?** Consultez `STRIPE_CART_IMPLEMENTATION.md` pour plus de détails.

