# Sujets d'articles à venir

La routine prend le premier sujet non coché de la catégorie à publier (voir `CONSIGNES.md`, partie 3). Une fois l'article proposé, elle coche la case et ajoute la date et le slug.

Elle peut aussi écarter un sujet, trop proche d'un article existant ou faute de sources : elle le note alors sous le sujet.

Les slugs indiqués sont des propositions. Les articles déjà publiés figurent dans `app/blog/[slug]/seo-data.ts` : ne pas les refaire.

## Priorités Search Console (relevé du 7 octobre 2026)

Recherches des trois derniers mois sur lesquelles swiipx.fr apparaît déjà, sans page qui y réponde vraiment. Les sujets correspondants sont en tête de leur catégorie, marqués « priorité Search Console ».

| Recherches (impressions sur 3 mois, position moyenne) | Sujet |
| --- | --- |
| « combien de temps pour qu'un avis google apparaisse », « délai publication avis google », « temps de validation avis google » et deux variantes (60 au total, positions 7 à 18) | Délai de publication d'un avis Google |
| « plaque avis google gratuit » (16, position 10,6) | Créer soi-même un QR code d'avis Google |

Le calculateur `/outils/calculateur-avis-google` répond à « calculateur avis google », « calcul note google » et « combien d'avis google pour augmenter la note » : pas d'article sur ces recherches.

### En attente d'une décision de l'équipe : ne pas traiter

- **Plaque NFC Tripadvisor.** 644 impressions sur 3 mois, réparties sur 17 variantes (« plaque nfc tripadvisor sans contact », « plaque qr code nfc tripadvisor »…), positions 24 à 55.
- **Plaque NFC pour la carte du restaurant.** « plaque nfc carte restaurant » : 117 impressions, position 12,8.

Swiipx ne vend aujourd'hui que des plaques programmées avec le lien d'avis Google. Un article sur ces sujets décevrait le lecteur tant que l'offre n'existe pas.

## Secteur : « plaque NFC + métier »

- [x] **Fleuriste** (`plaque-nfc-fleuriste`) : proposé le 2026-10-02, slug `plaque-nfc-fleuriste`
  - Pics de fêtes : Saint-Valentin, fête des mères, Toussaint.
  - Livraisons de bouquets, emplacement en caisse.
- [ ] **Food truck** (`plaque-nfc-food-truck`)
  - Emplacements tournants, fiche Google sans adresse fixe (zone desservie).
  - Plaque sur le comptoir du camion.
- [ ] **Cabinet dentaire** (`plaque-nfc-dentiste`)
  - Ce que permet le code de déontologie des chirurgiens-dentistes en matière de communication.
  - Le secret professionnel dans les réponses.
- [ ] **Boucherie, charcuterie, traiteur** (`plaque-nfc-boucherie-charcuterie`)
  - Comptoir de vente, commandes de fêtes.
  - Distinct de `plaque-nfc-boulangerie`.
- [ ] **Pressing et cordonnerie** (`plaque-nfc-pressing`)
  - Le retrait de l'article, moment de satisfaction.
  - Les tickets de dépôt.
- [ ] **Salon de tatouage** (`plaque-nfc-tatoueur`)
  - Portfolio photos sur la fiche.
  - Demander l'avis après cicatrisation, pas le jour même.
- [ ] **Coach sportif indépendant** (`plaque-nfc-coach-sportif`)
  - Sans salle : fiche en zone desservie, carte NFC, séances à domicile.
  - Distinct de `plaque-nfc-salle-de-sport`.
- [ ] **Pension animalière et toiletteur** (`plaque-nfc-pension-animaliere`)
  - Le retour de l'animal, moment clé.
  - Distinct de `plaque-nfc-veterinaire`.
- [ ] **Kinésithérapeute et ostéopathe** (`plaque-nfc-kinesitherapeute`)
  - Règles de communication des ordres concernés.
  - Fin de cycle de séances.
- [ ] **Camping et hôtellerie de plein air** (`plaque-nfc-camping`)
  - Accueil, départ, saisonnalité.
  - Distinct de `plaque-nfc-hotel`.
- [ ] **Réparateur de smartphones** (`plaque-nfc-reparateur-smartphone`)
  - Le moment du retrait, le diagnostic gratuit.
- [ ] **Caviste et épicerie fine** (`plaque-nfc-caviste`)
  - Conseil en boutique, dégustations, coffrets de fin d'année.

## SEO Local et fiche Google

- [x] **Lien d'avis Google** (`lien-avis-google`) : proposé le 2026-10-01, slug `lien-avis-google`
  - Où le trouver dans la fiche, le partager, le tester.
  - Pourquoi il ne faut pas le modifier.
- [ ] **Délai de publication d'un avis Google : combien de temps pour qu'il apparaisse ?** (`delai-publication-avis-google`), priorité Search Console
  - Mot-clé principal : « délai publication avis google ».
  - Ce que Google dit de la publication et de la modération des avis, l'avis visible par son auteur seul, les causes de retard.
  - Que répondre au client dont l'avis n'apparaît pas.
  - Distinct de `avis-google-disparus`, qui traite des avis retirés après publication.
- [ ] **Créer sa fiche Google Business Profile, pas à pas** (`creer-fiche-google-business-profile`)
- [ ] **Validation de la fiche** (`verification-fiche-google-business-profile`)
  - Méthodes proposées par Google, délais, refus fréquents.
- [ ] **Fiche Google suspendue** (`fiche-google-suspendue`)
  - Causes documentées par Google, procédure de rétablissement.
- [ ] **Catégorie principale et catégories secondaires** (`categorie-google-business-profile`)
- [ ] **Horaires exceptionnels et jours fériés sur Google** (`horaires-exceptionnels-google`)
  - À publier en novembre, avant les fêtes.
- [ ] **Répondre aux avis positifs** (`repondre-avis-positifs-google`)
  - Modèles, erreurs, fréquence.
  - Distinct de `repondre-avis-negatifs-google`.
- [ ] **Plusieurs établissements** (`avis-google-plusieurs-etablissements`)
  - Une fiche par lieu, un lien d'avis par plaque, groupes d'établissements.

## Comparatif

- [x] **Avis Google, Tripadvisor ou Trustpilot : où concentrer ses efforts** (`avis-google-tripadvisor-trustpilot`) : proposé le 2026-10-05, slug `avis-google-tripadvisor-trustpilot`
- [ ] **Créer soi-même un QR code d'avis Google, et ses limites** (`qr-code-avis-google-gratuit`), priorité Search Console
  - Mot-clé principal : « qr code avis google gratuit ».
  - Angle : ce que l'on peut faire gratuitement, à partir de ce que Google propose lui-même (sources de l'aide Google), puis les limites.
  - Distinct de `plaque-nfc-vs-qr-code-avis-google`.
- [ ] **NTAG213, NTAG215 ou NTAG216 : quelle puce pour une plaque d'avis** (`ntag213-ntag215-ntag216`)
  - S'appuyer sur les fiches techniques NXP.
- [ ] **Programmer une puce NFC soi-même** (`programmer-puce-nfc-soi-meme`)
  - Applications, verrouillage de la puce, pièges.
- [ ] **Logiciels de gestion des avis : ce qu'ils font et combien ils coûtent** (`logiciels-gestion-avis`)
  - Uniquement des tarifs publics sourcés.
  - Aucun dénigrement.

## Statistiques et Conseils

- [ ] **Avis en ligne : ce que dit la loi en France** (`reglementation-avis-en-ligne-france`, Conseils)
  - Code de la consommation, obligations d'information sur les avis, contrôles de la DGCCRF.
- [ ] **Répondre aux avis avec l'intelligence artificielle sans perdre en authenticité** (`repondre-avis-intelligence-artificielle`, Conseils)
- [ ] **Smartphones et sans contact en France : les chiffres d'équipement** (`chiffres-smartphones-nfc-france`, Statistiques)
  - Baromètre du numérique (Arcep, Crédoc).
- [ ] **Les Français et les avis en ligne : ce que disent les études françaises** (`francais-avis-en-ligne-etudes`, Statistiques)
