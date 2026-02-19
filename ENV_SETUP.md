# Configuration des Variables d'Environnement

## Créer le fichier `.env.local`

À la racine du projet, créez un fichier `.env.local` avec ce contenu :

```env
# Stripe Keys (Mode Test)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Site URL (pour Stripe redirections)
NEXT_PUBLIC_URL=http://localhost:3000
```

## Où trouver vos clés Stripe

1. Connectez-vous sur https://dashboard.stripe.com
2. Activez le **mode Test** (toggle en haut à droite)
3. Allez dans **Developers** → **API keys**
4. Copiez :
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

## Important

⚠️ **Ne commitez JAMAIS le fichier `.env.local`** (déjà dans `.gitignore`)

✅ Le fichier `.env.local` est automatiquement chargé par Next.js au démarrage

