# Variables d'environnement

En local : fichier `.env.local` à la racine (déjà dans `.gitignore`, ne jamais le commiter).
En production : **Vercel → Settings → Environment Variables**, puis redéployer — Vercel
ne réinjecte pas les variables dans un déploiement déjà construit.

> Les variables préfixées `NEXT_PUBLIC_` sont **lisibles par n'importe qui** dans le code
> livré au navigateur. N'y mettre que ce qui est conçu pour être public.

---

## Indispensables — le site ne peut pas encaisser sans elles

| Variable | Rôle | Où la trouver |
|---|---|---|
| `STRIPE_SECRET_KEY` | Création et mise à jour des paiements | Stripe → Développeurs → Clés API → *Clé secrète* |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Formulaire de paiement côté navigateur | Stripe → même écran → *Clé publiable* |
| `STRIPE_WEBHOOK_SECRET` | Vérifie que le webhook vient bien de Stripe | Stripe → Développeurs → Webhooks → votre endpoint → *Secret de signature* |
| `NEXT_PUBLIC_URL` | Redirections après paiement | `https://swiipx.fr` en prod, `http://localhost:3000` en local |

⚠️ Sans `STRIPE_WEBHOOK_SECRET`, le webhook rejette tout : **aucun email, aucun colis,
aucune notification** — alors que le client a bien été débité.

---

## Traitement des commandes

| Variable | Rôle | Sans elle |
|---|---|---|
| `RESEND_API_KEY` | Envoi des emails | Ni confirmation client, ni notification marchand |
| `SENDCLOUD_PUBLIC_KEY` | API Sendcloud + sélecteur de point relais | Pas de colis, pas de choix de point relais |
| `SENDCLOUD_SECRET_KEY` | API Sendcloud (serveur) | Pas de création de colis |
| `MERCHANT_EMAIL` | Destinataire des notifications de commande | Repli sur `bonjour@swiipx.fr` |

**`MERCHANT_EMAIL`** reçoit un email à chaque commande payée, avec l'établissement à
programmer (nom, adresse, Place ID) et l'adresse d'expédition. L'objet est préfixé
`[ACTION REQUISE]` quand une étape a échoué — colis non créé, email client non parti,
ou aucun établissement rattaché. Sans cet email, une commande peut être encaissée sans
jamais être expédiée, et la panne ne se voit que dans les logs Vercel.

La clé publique Sendcloud est servie au navigateur par `/api/sendcloud-config` plutôt
que par une variable `NEXT_PUBLIC_*` : la clé secrète ne quitte donc jamais le serveur.

`NEXT_PUBLIC_SENDCLOUD_PUBLIC_KEY` est encore accepté **en repli** si
`SENDCLOUD_PUBLIC_KEY` est absent, pour ne pas casser une configuration existante.
Ne pas l'utiliser pour une nouvelle installation : elle exposerait la clé dans le code
livré au navigateur, ce que `/api/sendcloud-config` est précisément là pour éviter.

---

## Google

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_GOOGLE_KEY` | Recherche d'établissement (Places) sur l'accueil et le checkout |

⚠️ Cette clé est **nécessairement publique** — l'API Places s'appelle depuis le
navigateur. Elle **doit** donc être restreinte, sinon n'importe qui peut l'extraire et
facturer des appels sur votre compte :

Google Cloud Console → **API et services** → **Identifiants** → la clé →
**Restrictions relatives aux applications** → *Sites web* → ajouter `https://swiipx.fr/*`.
Définir aussi un plafond de facturation.

---

## Mesure d'audience — toutes optionnelles

Chaque outil ne se charge que si son identifiant est présent. Le site fonctionne
normalement sans aucun d'eux.

| Variable | Outil | Remarque |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | `GTM-XXXXXXX` |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity | Posé dans le `<head>` (Microsoft l'exige) |

⚠️ **GTM et GA4 sont exclusifs.** Si `NEXT_PUBLIC_GTM_ID` est défini, c'est GTM qui
alimente GA4 et `NEXT_PUBLIC_GA_ID` est ignoré. Charger les deux compterait chaque
événement en double.

---

## Exemple de `.env.local`

```env
# Stripe — utiliser les clés de TEST en local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=http://localhost:3000

# Commandes
RESEND_API_KEY=re_...
SENDCLOUD_PUBLIC_KEY=...
SENDCLOUD_SECRET_KEY=...
MERCHANT_EMAIL=bonjour@swiipx.fr

# Google Places
NEXT_PUBLIC_GOOGLE_KEY=AIza...

# Mesure (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

## Tester le webhook en local

Le webhook Stripe ne peut pas joindre `localhost`. Utiliser la CLI Stripe :

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Elle affiche un `whsec_...` propre à la session : le reporter dans `STRIPE_WEBHOOK_SECRET`.
