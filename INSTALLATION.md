# 📦 Guide d'Installation - Swiipx

Ce guide vous accompagne pas à pas pour installer et lancer le projet Swiipx.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 18.17 ou supérieure
- **npm** (livré avec Node.js) ou **yarn** ou **pnpm**
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation

### 1. Cloner ou télécharger le projet

```bash
cd /Users/beytullahsonkaya/Documents/Swiipx31.10.2025
```

### 2. Installer les dépendances

Avec npm :
```bash
npm install
```

Avec yarn :
```bash
yarn install
```

Avec pnpm :
```bash
pnpm install
```

Cette commande va installer toutes les dépendances listées dans `package.json` :
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Swiper (carousel)
- React Hot Toast (notifications)
- Lucide React (icônes)
- Canvas Confetti (animations de succès)

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

## 🎯 Structure après Installation

```
Swiipx31.10.2025/
├── app/                      # Application Next.js
│   ├── components/          # Composants React
│   ├── product/[slug]/      # Pages produits dynamiques
│   ├── success/             # Page de succès
│   ├── layout.tsx           # Layout global
│   ├── page.tsx             # Page d'accueil
│   └── globals.css          # Styles globaux
├── node_modules/            # Dépendances (créé après npm install)
├── public/                  # Assets statiques (à créer si besoin)
├── .next/                   # Build Next.js (créé automatiquement)
├── package.json             # Configuration npm
├── tsconfig.json            # Configuration TypeScript
├── tailwind.config.ts       # Configuration Tailwind
├── next.config.js           # Configuration Next.js
└── README.md                # Documentation
```

## 🧪 Commandes Disponibles

### Développement
```bash
npm run dev
```
Lance le serveur de développement avec hot-reload sur http://localhost:3000

### Build Production
```bash
npm run build
```
Crée une version optimisée pour la production dans le dossier `.next/`

### Démarrer en Production
```bash
npm start
```
Lance le serveur en mode production (nécessite `npm run build` d'abord)

### Linter
```bash
npm run lint
```
Vérifie le code avec ESLint pour détecter les erreurs

## 🎨 Configuration Tailwind CSS

Tailwind est déjà configuré avec les couleurs personnalisées de Swiipx :

```typescript
// tailwind.config.ts
colors: {
  primary: '#2563EB',  // Bleu principal
  accent: '#FACC15',   // Jaune accentuation
  neutral: '#F9FAFB',  // Fond neutre
}
```

## 🔧 Configuration Next.js

Le projet utilise :
- **App Router** (Next.js 14)
- **TypeScript** pour le typage
- **Client Components** pour les animations et interactivité
- **Server Components** par défaut

## 🌐 Variables d'Environnement (Optionnel)

Pour la production, créez un fichier `.env.local` :

```env
# Exemple pour plus tard (Stripe, Analytics, etc.)
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 📱 Tester sur Mobile

### Option 1 : Réseau local
1. Trouvez votre IP locale :
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```

2. Accédez depuis votre mobile : `http://[VOTRE_IP]:3000`

### Option 2 : Tunnel (ngrok)
```bash
# Installer ngrok
npm install -g ngrok

# Créer un tunnel
ngrok http 3000
```

## 🐛 Résolution de Problèmes

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

### Erreurs de dépendances
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreurs TypeScript
```bash
# Régénérer les types Next.js
rm -rf .next
npm run dev
```

### Problèmes de cache
```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

## 📦 Déploiement

### Vercel (Recommandé)
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Connectez votre repository Git
3. Cliquez sur "Deploy"
4. ✨ C'est fait !

### Netlify
```bash
npm run build
# Déployez le dossier .next/
```

### Serveur Custom
```bash
npm run build
npm start
# Le serveur tourne sur le port 3000
```

## 🎓 Ressources Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Framer Motion](https://www.framer.com/motion/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)

## ✅ Checklist de Vérification

Avant de commencer le développement :

- [ ] Node.js installé (version 18.17+)
- [ ] Dépendances installées (`npm install`)
- [ ] Serveur de dev lancé (`npm run dev`)
- [ ] Site accessible sur http://localhost:3000
- [ ] Pas d'erreurs dans la console
- [ ] Hot reload fonctionne (modifiez un fichier pour tester)

## 💡 Prochaines Étapes

1. **Personnaliser** : Modifiez les couleurs, textes, images
2. **Ajouter des images** : Placez vos vraies images produit
3. **Intégrer Stripe** : Pour les paiements
4. **Backend API** : Pour gérer les commandes
5. **Analytics** : Google Analytics ou Plausible
6. **SEO** : Optimiser metadata et performance

## 🤝 Support

Besoin d'aide ? 
- 📧 Email : contact@swiipx.com
- 📞 Téléphone : +33 1 23 45 67 89

---

Bon développement ! 🚀

