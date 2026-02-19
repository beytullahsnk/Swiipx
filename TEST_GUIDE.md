# 🧪 GUIDE DE TEST - Swiipx Hydratation & Scroll Fix

## 🚀 Démarrage Rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur : **http://localhost:3000**

---

## ✅ Tests à Effectuer

### Test 1 : Hydratation du Badge Panier (Navbar)

**Objectif** : Vérifier qu'il n'y a plus d'erreurs d'hydratation

**Étapes** :
1. Ajouter 2 produits au panier
2. Rafraîchir la page (F5)
3. Ouvrir la console du navigateur (F12)

**Résultat attendu** :
- ✅ Aucune erreur d'hydratation dans la console
- ✅ Le badge panier affiche "2" après un bref instant
- ✅ Le badge ne clignote pas ou ne change pas de valeur

**Symptômes d'échec** :
- ❌ Erreur dans la console : "Hydration failed"
- ❌ Le badge affiche "0" puis "2"
- ❌ Erreur : "Expected server HTML to contain..."

---

### Test 2 : Scroll Bloqué (SideCart Ouvert)

**Objectif** : Vérifier que le scroll est complètement bloqué quand le panier est ouvert

**Étapes** :
1. Scroller en milieu de page (environ 500px vers le bas)
2. Cliquer sur l'icône panier pour ouvrir le SideCart
3. Essayer de scroller avec la molette ou le trackpad
4. Essayer de scroller sur mobile (si applicable)

**Résultat attendu** :
- ✅ Impossible de scroller la page principale
- ✅ Seul le contenu du SideCart est scrollable (s'il déborde)
- ✅ Le fond de la page reste fixe
- ✅ Overlay semi-transparent visible avec blur

**Symptômes d'échec** :
- ❌ La page principale scrolle en arrière-plan
- ❌ Le SideCart se décale lors du scroll
- ❌ Sur mobile, le scroll fonctionne encore

---

### Test 3 : Restauration du Scroll (SideCart Fermé)

**Objectif** : Vérifier que le scroll revient exactement à la position d'origine

**Étapes** :
1. Scroller en bas de page (au niveau de la FAQ ou Footer)
2. Noter mentalement la position (ou prendre un screenshot)
3. Ouvrir le SideCart
4. Fermer le SideCart (X ou clic sur l'overlay)
5. Observer la position de scroll

**Résultat attendu** :
- ✅ La page revient EXACTEMENT à la position d'origine
- ✅ Pas de "jump" vers le haut
- ✅ Transition fluide et naturelle
- ✅ L'overlay disparaît avec une animation fade-out

**Symptômes d'échec** :
- ❌ La page remonte en haut automatiquement
- ❌ Décalage de quelques pixels
- ❌ Animation saccadée

---

### Test 4 : Overlay Cliquable

**Objectif** : Vérifier que cliquer sur l'overlay ferme le panier

**Étapes** :
1. Ouvrir le SideCart
2. Cliquer n'importe où sur la zone grisée (overlay) en dehors du panier

**Résultat attendu** :
- ✅ Le SideCart se ferme immédiatement
- ✅ Même comportement que le bouton X
- ✅ Le scroll est restauré

**Symptômes d'échec** :
- ❌ Clic sur l'overlay ne fait rien
- ❌ Il faut obligatoirement utiliser le bouton X

---

### Test 5 : Page Cart - Hydratation

**Objectif** : Vérifier qu'il n'y a pas d'erreur sur la page `/cart`

**Étapes** :
1. Ajouter 2 produits au panier
2. Visiter directement `/cart` dans l'URL
3. Rafraîchir la page
4. Ouvrir la console

**Résultat attendu** :
- ✅ Loader s'affiche brièvement
- ✅ Les produits s'affichent correctement
- ✅ Aucune erreur d'hydratation dans la console
- ✅ Les quantités et prix sont corrects

**Symptômes d'échec** :
- ❌ Erreur d'hydratation dans la console
- ❌ Les produits ne s'affichent pas
- ❌ "Votre panier est vide" alors qu'il y a des items

---

### Test 6 : Page Success - Suspense

**Objectif** : Vérifier que la page `/success` fonctionne avec Suspense

**Étapes** :
1. Visiter `/success?session_id=test123` dans l'URL
2. Observer le chargement
3. Vérifier la console

**Résultat attendu** :
- ✅ Loader s'affiche brièvement
- ✅ Confettis apparaissent
- ✅ Message de succès s'affiche
- ✅ Aucune erreur dans la console

**Symptômes d'échec** :
- ❌ Erreur : "useSearchParams should be wrapped in a suspense boundary"
- ❌ Page blanche
- ❌ Erreur de prerender

---

### Test 7 : Build Production

**Objectif** : Vérifier que le build compile sans erreurs

**Étapes** :
```bash
npm run build
```

**Résultat attendu** :
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (7/7)
✓ Finalizing page optimization
```

**Symptômes d'échec** :
- ❌ Type error dans checkout/route.ts (Stripe API version)
- ❌ Missing dependencies warning (success/page.tsx)
- ❌ Hydration failed during prerender

---

## 🎯 Checklist Complète

Cochez chaque test une fois validé :

- [ ] Test 1 : Badge panier - pas d'erreur d'hydratation
- [ ] Test 2 : Scroll bloqué quand SideCart ouvert
- [ ] Test 3 : Scroll restauré à la fermeture
- [ ] Test 4 : Overlay cliquable ferme le panier
- [ ] Test 5 : Page `/cart` sans erreur d'hydratation
- [ ] Test 6 : Page `/success` avec Suspense
- [ ] Test 7 : Build production successful

---

## 🐛 En Cas de Problème

### Erreur : "Module not found: Can't resolve 'zustand'"
```bash
npm install
```

### Le badge panier ne s'affiche pas
- Vérifier que `hasHydrated` est bien importé dans `Navbar.tsx`
- Vérifier la console pour d'éventuelles erreurs

### Le scroll ne se restaure pas
- Vérifier que `data-scroll-y` est bien défini dans `SideCart.tsx`
- Ouvrir les DevTools > Elements > Inspecter `<body>` et vérifier l'attribut `data-scroll-y`

### Build échoue sur Stripe API version
- Vérifier que `/app/api/checkout/route.ts` utilise `apiVersion: '2023-10-16'`

---

## 📊 Résultats Attendus (Tous les Tests)

Si tous les tests passent, vous devriez avoir :

✅ **0 erreurs** dans la console  
✅ **0 warnings** ESLint bloquants  
✅ **Build production** successful  
✅ **UX fluide** et professionnelle  
✅ **Comportement identique** à Shopify/Digifeel  

---

## 🎉 Tout Fonctionne ?

Félicitations ! Le projet Swiipx est maintenant **production-ready** ! 🚀

Vous pouvez :
1. Déployer sur Vercel : `vercel --prod`
2. Tester le paiement Stripe avec la carte test : `4242 4242 4242 4242`
3. Profiter d'une UX parfaite sans bugs d'hydratation

---

**Besoin d'aide ?** Consultez `HYDRATION_AND_SCROLL_FIX.md` pour les détails techniques.

