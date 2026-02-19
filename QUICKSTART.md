# ⚡ Quick Start - Swiipx

Lancez votre site en **3 minutes** chrono ! ⏱️

## 🚀 Installation Express

```bash
# 1. Naviguer dans le dossier
cd /Users/beytullahsonkaya/Documents/Swiipx31.10.2025

# 2. Installer les dépendances (~ 2 minutes)
npm install

# 3. Lancer le serveur de développement
npm run dev
```

**C'est tout !** 🎉  
Ouvrez votre navigateur sur **http://localhost:3000**

## 📱 Aperçu des Pages

Une fois le serveur lancé, explorez :

- **/** → Landing page complète avec toutes les sections
- **/product/starter** → Détail du pack Starter (49€)
- **/product/business** → Détail du pack Business (79€) ⭐
- **/product/pro** → Détail du pack Pro (149€)
- **/success** → Page de confirmation d'achat

## 🎨 Personnalisation Rapide

### Changer les couleurs (5 min)

Éditez `tailwind.config.ts` :

```typescript
colors: {
  primary: '#2563EB',  // Changez ici
  accent: '#FACC15',   // Changez ici
}
```

### Modifier les prix (3 min)

Éditez `app/components/ProductSection.tsx` ligne ~18 :

```typescript
const packs = [
  { name: 'Starter', price: 49, ... },  // ← Changez le prix
  { name: 'Business', price: 79, ... }, // ← Changez le prix
  { name: 'Pro', price: 149, ... },     // ← Changez le prix
]
```

### Changer les textes (10 min)

Les principaux textes à personnaliser :

1. **Hero** → `app/components/HeroSection.tsx` ligne ~27
2. **Témoignages** → `app/components/Testimonials.tsx` ligne ~18
3. **FAQ** → `app/components/FAQ.tsx` ligne ~12
4. **Footer** → `app/components/Footer.tsx` ligne ~9

### Ajouter votre logo (2 min)

1. Placez votre logo dans `public/logo.png`
2. Éditez `app/components/Navbar.tsx` ligne ~47 :

```tsx
<img src="/logo.png" alt="Logo" className="w-10 h-10" />
```

## 📦 Build pour Production

```bash
# Créer une version optimisée
npm run build

# Tester localement
npm start
```

## 🚢 Déployer sur Vercel (Gratuit)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre dossier
4. Cliquez sur "Deploy"
5. ✨ Votre site est en ligne !

Vous obtiendrez une URL type : `https://votre-projet.vercel.app`

## ✅ Checklist Post-Installation

Vérifiez que tout fonctionne :

- [ ] Le site se charge sur http://localhost:3000
- [ ] Toutes les sections s'affichent correctement
- [ ] Les animations fonctionnent au scroll
- [ ] Le carousel de témoignages tourne automatiquement
- [ ] Les boutons "Ajouter au panier" affichent une notification
- [ ] Le menu mobile s'ouvre/ferme correctement
- [ ] Aucune erreur dans la console navigateur

## 🐛 Problème ?

### Le port 3000 est déjà utilisé
```bash
npm run dev -- -p 3001
# Puis ouvrez http://localhost:3001
```

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Les animations ne fonctionnent pas
Vérifiez la console navigateur. Si vous voyez des erreurs Framer Motion, relancez :
```bash
npm install framer-motion@latest
```

## 🎯 Prochaines Étapes

1. ✅ **Site fonctionnel** (vous y êtes !)
2. 🎨 **Personnaliser** couleurs, textes, images
3. 💳 **Ajouter Stripe** pour les paiements
4. 📊 **Analytics** Google Analytics / Plausible
5. 🚀 **Déployer** en production

## 💡 Astuces

### Hot Reload
Le code se recharge automatiquement quand vous modifiez un fichier. Si ça ne fonctionne pas, redémarrez le serveur.

### DevTools
Ouvrez les DevTools (F12) pour :
- Voir les erreurs console
- Tester le responsive
- Débugger le JavaScript
- Analyser les performances

### TypeScript
L'auto-complétion fonctionne dans VS Code. Installez les extensions recommandées :
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense

## 📞 Besoin d'aide ?

- 📖 [README complet](README.md)
- 🔧 [Guide d'installation détaillé](INSTALLATION.md)
- 📊 [Vue d'ensemble du projet](PROJECT_OVERVIEW.md)

---

**Temps estimé total** : 3 minutes d'installation + ∞ de customisation ! 🎨

