import type { Metadata } from 'next'

/* ── Données SEO par article ── */
const seoData: Record<string, {
  title: string
  description: string
  keywords: string
  date: string
  dateModified: string
  category: string
  faq: { q: string; a: string }[]
}> = {
  'plaque-nfc-garage-automobile': {
    title: 'Plaque NFC garage automobile : x4 avis Google (guide 2026)',
    description: 'Garages, centres auto, carrosseries : multipliez vos avis Google par 4 avec une plaque NFC. Guide 2026 : emplacements, scripts garagiste, 3 études de cas, ROI chiffré.',
    keywords: 'plaque nfc garage, avis google garage, plaque nfc garage automobile, avis google garagiste, plaque avis google centre auto, avis google carrosserie, seo local garage',
    date: '2026-07-13',
    dateModified: '2026-07-13',
    category: 'Secteur',
    faq: [
      { q: 'Combien d\'avis Google un garage peut-il collecter avec une plaque NFC ?', a: 'Un garage traitant 15 à 20 véhicules par semaine passe généralement de 2-4 avis/mois à 12-25 avis/mois, soit une multiplication par 4 à 6. Les centres auto à fort volume dépassent souvent 40 avis par mois.' },
      { q: 'Où placer la plaque NFC dans un garage ?', a: 'Le comptoir de facturation est le meilleur emplacement (35-45 % de conversion) : le client a déjà son téléphone en main pour payer et vient de récupérer son véhicule. L\'accueil arrive en second (20-30 %), puis la salle d\'attente (10-15 %).' },
      { q: 'La plaque résiste-t-elle à l\'environnement d\'un atelier ?', a: 'Oui. L\'acrylique premium 3 mm résiste à l\'eau, aux UV, aux rayures et aux projections d\'huile. Un simple coup de chiffon suffit à la nettoyer, contrairement à une affiche papier ou un flyer plastifié.' },
      { q: 'Puis-je offrir une remise en échange d\'un avis Google ?', a: 'Non, c\'est formellement interdit par les règles de Google. Vos avis pourraient être supprimés en masse et votre fiche suspendue. La plaque NFC fonctionne en supprimant la friction, pas en achetant l\'avis.' },
      { q: 'Quel pack de plaques choisir pour un garage ?', a: 'Garage indépendant avec un seul point de caisse : Pack Starter. Garage avec accueil et caisse séparés : Pack Business (2 plaques), la configuration la plus courante. Centre auto multi-baies : Pack Pro (5 plaques).' },
      { q: 'Combien de temps avant de voir un effet sur Google ?', a: 'Les premiers avis arrivent dès la première semaine. L\'effet sur le classement dans le pack local se manifeste en 4 à 8 semaines, avec un saut significatif entre 3 et 6 mois si le rythme est maintenu.' },
    ],
  },
  'plaque-nfc-cabinet-medical': {
    title: 'Plaque NFC cabinet médical : avis Google et déontologie (guide 2026)',
    description: 'Médecins, dentistes, kinés, ostéopathes : collectez des avis Google avec une plaque NFC en respectant la déontologie. Guide 2026 : placements, scripts conformes, FAQ.',
    keywords: 'plaque nfc cabinet medical, avis google dentiste, avis google medecin, plaque nfc dentiste, avis google kinesitherapeute, plaque nfc osteopathe, deontologie avis google',
    date: '2026-06-08',
    dateModified: '2026-06-08',
    category: 'Secteur',
    faq: [
      { q: 'Est-ce déontologique de demander des avis à ses patients ?', a: 'Oui, à condition de rester passif et non insistant, sans contrepartie ni tri des patients. La plaque NFC est un moyen passif : le patient choisit librement de l\'utiliser ou non, ce qui est conforme aux recommandations des ordres professionnels.' },
      { q: 'Puis-je répondre aux avis de mes patients ?', a: 'Oui, mais sans jamais révéler d\'information de santé ni confirmer qu\'une personne est votre patient (secret médical). Restez neutre : "Merci pour votre retour" suffit. Ne mentionnez jamais le motif de consultation.' },
      { q: 'Combien d\'avis un cabinet médical peut-il espérer collecter ?', a: 'Un cabinet moyen passe de 5-10 avis/an à 30-60 avis/an avec une plaque NFC bien placée, soit une multiplication par 4 à 6, tout en respectant la discrétion attendue dans le secteur médical.' },
      { q: 'Où placer la plaque NFC dans un cabinet médical ?', a: 'Le meilleur emplacement est sur le bureau, évoqué une seule fois en fin de consultation (25-35 % de conversion). À l\'accueil/secrétariat au moment de reprendre rendez-vous (15-25 %). En salle d\'attente de façon discrète (10-15 %).' },
      { q: 'Faut-il un abonnement pour la plaque NFC ?', a: 'Non. La plaque Swiipx fonctionne sans abonnement : un paiement unique et elle fonctionne pendant des années, sans frais récurrents ni renouvellement mensuel.' },
    ],
  },
  'plaque-nfc-restaurant': {
    title: 'Plaque NFC restaurant : collecter +200 avis Google en 2026 (guide complet)',
    description: 'Restaurant : comment collecter +200 avis Google par an avec une plaque NFC. Guide 2026 : placements, scripts serveur, ROI, 3 études de cas réelles.',
    keywords: 'plaque nfc restaurant, avis google restaurant, plaque avis google restaurant, plaque nfc bistrot, nfc restauration, avis restaurant google, collecte avis restaurant',
    date: '2026-05-11',
    dateModified: '2026-05-11',
    category: 'Secteur',
    faq: [
      { q: 'Combien d\'avis Google peut collecter un restaurant avec une plaque NFC ?', a: 'Un restaurant moyen (30 couverts/jour) passe de 5-8 avis/mois à 25-40 avis/mois grâce à une plaque NFC, soit une multiplication par 4-7. Les meilleurs résultats observés atteignent 60 avis/mois sur des brasseries 80+ couverts.' },
      { q: 'Où placer la plaque NFC dans un restaurant ?', a: 'Le meilleur emplacement est sur la table (placée à côté du sel ou sur le porte-addition), avec un taux de conversion de 40-50 %. Le 2e meilleur emplacement est à la caisse à côté du terminal de paiement (25-35 %).' },
      { q: 'Le serveur doit-il mentionner la plaque ?', a: 'Oui, c\'est crucial. Une plaque sans mention verbale convertit 3-4 fois moins. Le script optimal : "Tout s\'est bien passé ? Si vous avez 30 secondes, un avis Google nous aiderait beaucoup. Approchez juste votre téléphone ici."' },
      { q: 'Quel pack de plaques pour un restaurant ?', a: 'Petit resto (15-30 couverts) : Pack Starter 1 plaque. Restaurant moyen (30-60 couverts) : Pack Business 2 plaques. Grande brasserie (60+ couverts) : Pack Pro 5 plaques.' },
      { q: 'Combien de temps pour voir l\'impact sur Google ?', a: 'Nouveaux avis dès la 1ère semaine. Impact sur le ranking pack local en 4-8 semaines. Saut significatif visible à 3-6 mois en maintenant le rythme.' },
    ],
  },
  'plaque-avis-google-sans-abonnement': {
    title: 'Plaque avis Google sans abonnement : comparatif 2026 (5 marques)',
    description: 'Plaque avis Google sans abonnement : comparatif honnête de 5 marques en 2026. Prix, qualité, fonctionnalités. Économisez 500-1500 € sur 5 ans.',
    keywords: 'plaque avis google sans abonnement, plaque nfc sans abonnement, plaque google paiement unique, comparatif plaque nfc, plaque sans engagement, plaque avis sans abonnement',
    date: '2026-05-11',
    dateModified: '2026-05-11',
    category: 'Comparatif',
    faq: [
      { q: 'Pourquoi choisir une plaque NFC sans abonnement ?', a: 'Une plaque NFC est un objet physique qui fonctionne 10 ans sans maintenance. L\'abonnement (9-29 €/mois) n\'apporte rien techniquement et coûte 500-1500 € de plus sur 5 ans pour des fonctionnalités identiques.' },
      { q: 'Combien économise-t-on en choisissant sans abonnement ?', a: 'En moyenne 500 à 1 500 € par plaque sur 5 ans. Pour un commerce avec 5 plaques, l\'économie peut atteindre 5 000 € sur 5 ans, soit l\'équivalent d\'un mois de loyer commercial.' },
      { q: 'Une plaque sans abonnement est-elle de moins bonne qualité ?', a: 'Non, c\'est un mythe. La qualité dépend du fabricant, pas du modèle économique. Les marques sans abonnement (Swiipx, Cogimix) utilisent les mêmes puces NTAG215 que les marques avec abonnement.' },
      { q: 'Si la marque "sans abonnement" disparaît dans 2 ans ?', a: 'Aucun impact. La plaque physique continue de fonctionner indépendamment de la marque. Elle redirige vers votre URL Google qui, elle, est permanente. Pas de cloud ou serveur à maintenir.' },
      { q: 'Quelle est la meilleure marque sans abonnement en France ?', a: 'Selon notre comparatif 2026, Swiipx offre le meilleur rapport qualité-prix : acrylique 3 mm, NTAG215, QR de secours, garantie 2 ans, personnalisation incluse, à 39,90 €.' },
    ],
  },
  'plaque-nfc-salon-coiffure': {
    title: 'Plaque NFC salon coiffure : ROI réel + guide 2026',
    description: 'Salon de coiffure : comment collecter +150 avis Google/an avec une plaque NFC. Placements, scripts, études de cas réelles, ROI x300.',
    keywords: 'plaque nfc salon coiffure, plaque avis google coiffeur, nfc institut beauté, avis google salon, plaque nfc beauté, collecte avis coiffeur, plaque nfc barbier',
    date: '2026-05-11',
    dateModified: '2026-05-11',
    category: 'Secteur',
    faq: [
      { q: 'Pourquoi les salons sont-ils idéaux pour la plaque NFC ?', a: 'Les salons offrent le contexte parfait : clientes captives 60-90 min, satisfaites en fin de service (transformation visible), téléphone à portée. Taux de conversion record : 40-55 % (vs 20-30 % dans d\'autres secteurs).' },
      { q: 'Où placer la plaque dans un salon de coiffure ?', a: 'Le meilleur emplacement est sur le poste de coiffage (à côté du miroir) : taux de conversion 45-55 %. Le 2e emplacement optimal : à côté du miroir d\'accueil ou à la caisse (30-40 %).' },
      { q: 'Quel script pour demander un avis dans un salon ?', a: 'Le script à 55 % : "Vous êtes magnifique ! Si ça vous plaît, j\'ai une petite faveur : un avis Google nous aide vraiment. Approchez juste votre téléphone ici, ça prend 30 secondes !"' },
      { q: 'Combien de plaques pour un salon de coiffure ?', a: 'Petit salon (1-2 fauteuils) : 1 plaque (poste principal). Salon moyen (3-4 fauteuils) : 2 plaques (1 poste + 1 caisse). Institut multi-cabines : 5 plaques (1 par cabine).' },
      { q: 'Mes clientes seniors comprennent-elles le NFC ?', a: 'Oui. Le NFC fonctionne sur tout smartphone récent (iPhone 7+ depuis 2016, Android post-2018). La cliente n\'a rien à comprendre techniquement : elle approche son téléphone, ça s\'ouvre automatiquement. Plus simple qu\'un QR code.' },
    ],
  },
  'prix-plaque-nfc-avis-google': {
    title: 'Prix plaque NFC avis Google 2026 : combien ça coûte vraiment ?',
    description: 'Prix d\'une plaque NFC avis Google en 2026 : fourchettes par qualité, packs multi-plaques, facteurs de prix. Le bon budget : 35-60 € par plaque.',
    keywords: 'prix plaque nfc avis google, combien coute plaque nfc, tarif plaque avis google, plaque nfc pas cher, prix plaque google, cout plaque nfc avis',
    date: '2026-05-12',
    dateModified: '2026-05-12',
    category: 'Comparatif',
    faq: [
      { q: 'Quel est le bon prix pour une plaque NFC professionnelle en 2026 ?', a: 'Entre 35 et 50 € pour une plaque pro de qualité : acrylique 3 mm, NTAG215, QR de secours, garantie 2 ans, personnalisation incluse. En dessous, qualité douteuse. Au-dessus, vous payez surtout l\'esthétique.' },
      { q: 'Pourquoi certaines plaques NFC coûtent moins de 20 € ?', a: 'Production de masse en Asie avec puces NTAG213 bas de gamme, PVC fin, pas de QR de secours, pas de SAV. Économie à court terme mais durée de vie réelle de 6-18 mois vs 10 ans pour une plaque pro.' },
      { q: 'Faut-il un abonnement mensuel ?', a: 'Non. Une plaque NFC fonctionne 10 ans sans maintenance. Les abonnements (9-29 €/mois) facturent un dashboard analytics inutile (Google Business Profile donne déjà ces stats gratuitement).' },
      { q: 'Quelle économie sur un pack multi-plaques ?', a: 'Économie d\'échelle : 2 plaques = environ 25 % de moins que le prix unitaire ×2, 5 plaques = environ 55 % de moins. Ex. Swiipx : 1 plaque 39,90 €, 2 plaques 59,90 € (économie 20 €), 5 plaques 89,90 € (économie 110 €).' },
      { q: 'En combien de temps une plaque NFC est-elle amortie ?', a: 'Pour 99 % des commerces locaux, une plaque NFC à 40-60 € s\'amortit en moins de 7 jours grâce à 3-5 nouveaux clients/mois acquis via les nouveaux avis Google et la meilleure visibilité dans le pack local.' },
    ],
  },
  'ou-placer-plaque-avis-google': {
    title: 'Où placer votre plaque avis Google ? 7 emplacements stratégiques 2026',
    description: 'Le placement de votre plaque avis Google détermine 80 % du taux de conversion. Guide 2026 : 7 emplacements optimaux par secteur (restaurant, salon, retail).',
    keywords: 'où placer plaque avis google, emplacement plaque nfc, placement plaque avis google, position plaque nfc, optimiser plaque nfc, placer plaque nfc',
    date: '2026-05-12',
    dateModified: '2026-05-12',
    category: 'Conseils',
    faq: [
      { q: 'Pourquoi le placement de la plaque NFC est-il si important ?', a: 'Le placement détermine 80 % du taux de conversion. Une même plaque mal placée convertit 5 %, bien placée convertit 45 %. La visibilité, le timing (moment de satisfaction maximale) et l\'accessibilité physique sont les 3 facteurs clés.' },
      { q: 'Quel est le meilleur emplacement universel ?', a: 'Le top 1 : sur la table / poste de travail individuel (40-55 % de conversion). Le client voit la plaque pendant tout le service et son téléphone est à portée au moment du paiement.' },
      { q: 'Peut-on mettre une plaque NFC en extérieur ?', a: 'Oui pour les plaques en acrylique 3 mm de qualité. Résistantes à la pluie, aux UV, aux températures de -10 à +60 °C. Utile pour les terrasses de café/restaurant.' },
      { q: 'La plaque peut-elle être collée sur du métal ?', a: 'Évitez. Le métal interfère avec le signal NFC (effet cage de Faraday). Si nécessaire, intercalez une protection isolante. Mieux : choisissez un support en bois, verre, plastique ou plâtre.' },
      { q: 'Combien de temps avant de tester un nouvel emplacement ?', a: 'Minimum 2-4 semaines à chaque emplacement avant de juger. La conversion dépend du volume client qui varie selon la semaine. Une mesure sur trop courte période est trompeuse.' },
    ],
  },
  'plaque-nfc-vs-qr-code-avis-google': {
    title: 'Plaque NFC vs QR Code pour les avis Google : comparatif 2026',
    description: 'Plaque NFC ou QR code pour collecter des avis Google ? Comparatif 2026 : taux de conversion (35-45 % vs 8-12 %), prix, compatibilité, ROI.',
    keywords: 'plaque nfc vs qr code, qr code avis google, plaque nfc avis google, comparatif nfc qr, avis google nfc, taux conversion qr code, plaque nfc france, comparer nfc qr',
    date: '2026-05-10',
    dateModified: '2026-05-10',
    category: 'Comparatif',
    faq: [
      { q: 'Plaque NFC ou QR code : lequel convertit le plus d\'avis Google ?', a: 'La plaque NFC convertit 4 fois mieux que le QR code : 35-45 % de taux de conversion contre 8-12 % pour le QR. Cette différence s\'explique par la friction réduite (2 étapes vs 5 étapes) et l\'absence de décision consciente du client.' },
      { q: 'La plaque NFC fonctionne-t-elle sur tous les iPhone ?', a: 'Oui, sur tous les iPhone depuis l\'iPhone 7 (2016). Depuis iOS 14 (2020), le NFC en arrière-plan est natif : aucune application à ouvrir, le téléphone détecte automatiquement la plaque.' },
      { q: 'Quel est le coût comparé d\'une plaque NFC vs un QR code ?', a: 'Une plaque NFC coûte 35-50 € avec une durée de vie de 10+ ans, soit environ 4 € par an. Un autocollant QR code coûte 5 € mais doit être renouvelé tous les 1-2 ans (sensibilité à l\'usure), soit 3-5 € par an. Coûts annuels quasi-identiques mais expérience NFC très supérieure.' },
      { q: 'Peut-on combiner plaque NFC et QR code ?', a: 'Oui, c\'est même recommandé. Les plaques NFC professionnelles intègrent un QR code de secours imprimé. Cela couvre les 5 % de smartphones non-NFC tout en bénéficiant du taux de conversion premium du NFC pour les 95 % restants.' },
      { q: 'En combien de temps une plaque NFC est-elle rentabilisée ?', a: 'Une plaque NFC à 40 € est typiquement rentabilisée en 2 à 4 semaines pour un commerce moyen, grâce à 3-5 nouveaux clients/mois acquis via les nouveaux avis Google et la meilleure visibilité dans le pack local.' },
    ],
  },
  'obtenir-plus-avis-google': {
    title: 'Comment obtenir plus d\'avis Google en 2026 : 10 méthodes testées',
    description: '10 méthodes testées pour obtenir plus d\'avis Google rapidement (+250 % en 3 mois). NFC, QR code, scripts email/SMS : guide pratique 2026.',
    keywords: 'obtenir avis google, plus avis google, augmenter avis google, collecte avis, méthodes avis google, NFC avis, QR code avis, script demande avis',
    date: '2026-01-15',
    dateModified: '2026-01-15',
    category: 'Stratégie',
    faq: [
      { q: 'Quelle est la méthode la plus efficace pour obtenir des avis Google ?', a: 'La plaque NFC est la méthode la plus efficace avec un taux de conversion de 35-45 %, car elle supprime toute friction. Le client approche son téléphone et arrive directement sur la page d\'avis Google.' },
      { q: 'Combien d\'avis Google faut-il pour être visible ?', a: 'Un minimum de 20-30 avis est recommandé pour apparaître dans le pack local. Au-delà de 50 avis, votre visibilité augmente significativement. L\'objectif est de maintenir un flux régulier d\'avis récents.' },
      { q: 'Est-il légal de demander des avis Google à ses clients ?', a: 'Oui, demander des avis est parfaitement légal et conforme aux règles de Google. Ce qui est interdit, c\'est d\'offrir une contrepartie (réduction, cadeau) en échange d\'un avis ou de rédiger de faux avis.' },
      { q: 'Peut-on utiliser plusieurs méthodes de collecte en même temps ?', a: 'Oui, c\'est même recommandé. Combinez le NFC en point de vente avec l\'email de suivi et le SMS pour maximiser votre taux de collecte. Chaque canal touche le client à un moment différent.' },
    ],
  },
  'avis-clients-influencent-business': {
    title: 'Pourquoi les avis clients influencent votre business | Guide 2026',
    description: 'Impact des avis Google sur le chiffre d\'affaires, la conversion et le SEO local. Données 2026, stratégies par secteur et calcul du ROI.',
    keywords: 'avis clients business, impact avis google, avis et chiffre affaires, avis clients conversion, e-réputation, gestion avis négatifs, ROI avis google',
    date: '2026-01-20',
    dateModified: '2026-01-20',
    category: 'Business',
    faq: [
      { q: 'Quel est l\'impact des avis Google sur le chiffre d\'affaires ?', a: 'Passer de 3,5 à 4,5 étoiles sur Google entraîne une augmentation moyenne de 25 % du chiffre d\'affaires. Les entreprises avec plus de 50 avis génèrent 3 fois plus de clics que celles avec moins de 10 avis.' },
      { q: 'Comment les avis influencent-ils le SEO local ?', a: 'Google utilise le volume, la fréquence et la qualité des avis comme facteur de classement dans le pack local. Les fiches avec des avis récents et des réponses du propriétaire sont favorisées dans les résultats de recherche.' },
      { q: 'Faut-il répondre aux avis négatifs ?', a: 'Oui, toujours. 89 % des prospects lisent les réponses aux avis négatifs. Une réponse professionnelle et empathique peut transformer un avis négatif en démonstration de votre sérieux et de votre engagement client.' },
      { q: 'Quel est le nombre minimum d\'avis pour inspirer confiance ?', a: 'Les études montrent qu\'un minimum de 10 avis est nécessaire pour que les consommateurs considèrent la note comme fiable. Au-delà de 40 avis, l\'effet de confiance atteint son maximum.' },
    ],
  },
  'booster-visibilite-locale': {
    title: '5 astuces pour booster votre visibilité locale | Guide SEO 2026',
    description: 'Dominer le pack local Google : optimisation Google Business Profile, avis, citations NAP, pages locales, backlinks. Plan d\'action 30/60/90 jours.',
    keywords: 'visibilité locale, SEO local, pack local google, Google Business Profile, citations NAP, avis google local, référencement local, backlinks locaux',
    date: '2026-01-21',
    dateModified: '2026-01-21',
    category: 'SEO Local',
    faq: [
      { q: 'Combien de temps faut-il pour apparaître dans le pack local Google ?', a: 'Avec une stratégie active (fiche optimisée, collecte d\'avis, citations), vous pouvez commencer à apparaître dans le pack local en 4 à 8 semaines. Les résultats s\'accélèrent à partir du 3e mois.' },
      { q: 'Qu\'est-ce que le NAP et pourquoi est-ce important ?', a: 'NAP signifie Name, Address, Phone. La cohérence de ces informations sur tous les annuaires en ligne est un facteur de classement majeur pour Google. Toute incohérence peut nuire à votre visibilité locale.' },
      { q: 'Faut-il un site web pour apparaître dans le pack local ?', a: 'Non, la fiche Google Business Profile suffit pour apparaître dans le pack local. Cependant, un site web avec des pages locales optimisées renforce considérablement votre positionnement et vos chances d\'apparaître en première position.' },
      { q: 'Combien d\'avis faut-il pour dominer le pack local ?', a: 'Il n\'y a pas de nombre fixe, car cela dépend de la concurrence locale. En règle générale, avoir 20-30 % d\'avis de plus que le concurrent le mieux placé vous donne un avantage significatif.' },
    ],
  },
  'nfc-avis-clients': {
    title: 'NFC : la nouvelle arme pour collecter des avis clients | Guide 2026',
    description: 'Collecter plus d\'avis Google avec une plaque NFC : fonctionnement, taux de conversion (35-45 %), mise en place et ROI. Guide 2026.',
    keywords: 'NFC avis clients, plaque NFC avis google, collecte avis NFC, NFC vs QR code, plaque avis restaurant, NFC commerce, avis google automatique',
    date: '2026-01-22',
    dateModified: '2026-01-22',
    category: 'Technologie',
    faq: [
      { q: 'Comment fonctionne une plaque NFC pour les avis Google ?', a: 'La plaque NFC contient une puce programmée avec le lien direct vers votre page d\'avis Google. Quand un client approche son smartphone, le lien s\'ouvre automatiquement sans application ni scan. Le client n\'a plus qu\'à rédiger son avis et publier.' },
      { q: 'Le NFC fonctionne-t-il avec tous les smartphones ?', a: 'Oui. Tous les iPhone depuis le modèle 7 (2016) et la quasi-totalité des smartphones Android supportent le NFC nativement. Cela couvre plus de 95 % des appareils en circulation en France.' },
      { q: 'Quelle est la différence entre NFC et QR code pour les avis ?', a: 'Le NFC convertit à 35-45 % contre 8-12 % pour le QR code. La raison : le NFC ne nécessite aucune action de la part du client (pas d\'appareil photo à ouvrir, pas de lien à cliquer). C\'est un simple contact physique.' },
      { q: 'Où placer la plaque NFC dans mon commerce ?', a: 'L\'emplacement idéal dépend de votre métier. Restaurant : sur la table ou à la caisse. Salon de coiffure : devant le miroir. Cabinet médical : à l\'accueil. Boutique : au comptoir. Le principe : là où le client est le plus satisfait.' },
      { q: 'Google pénalise-t-il les avis collectés par NFC ?', a: 'Non. Le NFC redirige simplement vers la page d\'avis Google officielle. Le client rédige son propre avis librement. Aucune manipulation, aucune incitation interdite. Cette méthode est 100 % conforme aux règles de Google.' },
    ],
  },
  'seo-local-recherches-google': {
    title: 'SEO Local : comment grimper en tête des recherches Google | Guide 2026',
    description: 'Méthode 2026 pour gagner le pack local Google Maps : Google Business Profile, avis, pages locales, citations NAP, backlinks. Plan d\'action 30 jours.',
    keywords: 'SEO local, référencement local, pack local google, google maps seo, Google Business Profile, schema LocalBusiness, citations NAP, backlinks locaux, visibilité locale',
    date: '2026-01-23',
    dateModified: '2026-01-23',
    category: 'SEO Local',
    faq: [
      { q: 'Qu\'est-ce que le SEO local et pourquoi est-ce important ?', a: 'Le SEO local est l\'ensemble des techniques pour apparaître dans les résultats de recherche géolocalisés (pack local, Google Maps). C\'est crucial car 46 % des recherches Google ont une intention locale et 88 % des recherches locales sur mobile mènent à une visite ou un appel sous 24h.' },
      { q: 'Quels sont les 3 facteurs de classement SEO local de Google ?', a: 'Google classe les résultats locaux selon 3 critères : la pertinence (votre fiche correspond-elle à la recherche), la distance (proximité avec l\'utilisateur) et la notoriété (avis, citations, backlinks, ancienneté).' },
      { q: 'Combien de temps prend une stratégie SEO local pour donner des résultats ?', a: 'Les premiers résultats apparaissent généralement en 4 à 8 semaines. Une progression significative dans le pack local prend 3 à 6 mois avec une stratégie active et régulière.' },
      { q: 'Faut-il utiliser le schema markup pour le SEO local ?', a: 'Oui, le schema LocalBusiness aide Google à mieux comprendre votre activité, votre zone de service et vos coordonnées. Il augmente aussi vos chances d\'obtenir des rich snippets dans les résultats de recherche.' },
    ],
  },
  'erreurs-demander-avis': {
    title: 'Les erreurs fatales à éviter avec vos avis Google | Guide 2026',
    description: 'Acheter des faux avis, offrir des récompenses, harceler les clients : les erreurs qui font bannir votre fiche Google. Guide complet 2026.',
    keywords: 'erreurs avis google, faux avis google, acheter avis google, avis google interdits, règles avis google, sanctions google avis, bonnes pratiques avis',
    date: '2026-01-24',
    dateModified: '2026-01-24',
    category: 'Bonnes pratiques',
    faq: [
      { q: 'Que risque-t-on en achetant des faux avis Google ?', a: 'Google peut supprimer tous vos avis (même les vrais), suspendre votre fiche Google Business Profile et vous infliger une pénalité de visibilité durable. La FTC et la DGCCRF peuvent aussi imposer des amendes pour pratiques commerciales trompeuses.' },
      { q: 'Peut-on offrir une réduction en échange d\'un avis Google ?', a: 'Non, c\'est explicitement interdit par les conditions d\'utilisation de Google. Offrir une contrepartie (réduction, cadeau, avantage) en échange d\'un avis est considéré comme de l\'incentivization et peut entraîner la suppression de tous vos avis.' },
      { q: 'Comment supprimer un faux avis négatif sur Google ?', a: 'Signalez l\'avis via votre fiche Google Business Profile en sélectionnant le motif approprié (spam, contenu hors sujet, conflit d\'intérêts). Google examine le signalement sous 3 à 15 jours. En attendant, répondez professionnellement à l\'avis.' },
      { q: 'Est-ce une erreur de ne pas répondre aux avis ?', a: 'Oui, c\'est une erreur majeure. Ne pas répondre envoie un signal de désintérêt à vos prospects. Google favorise aussi les fiches dont le propriétaire répond activement aux avis. Répondez à chaque avis, positif comme négatif, sous 24 à 48h.' },
    ],
  },
}

/* ── generateStaticParams — pre-build all article pages ── */
export function generateStaticParams() {
  return Object.keys(seoData).map((slug) => ({ slug }))
}

/* ── generateMetadata dynamique ── */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const seo = seoData[params.slug]
  if (!seo) {
    return { title: 'Article | Blog Swiipx' }
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://swiipx.fr/blog/${params.slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://swiipx.fr/blog/${params.slug}`,
      siteName: 'Swiipx',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: seo.date,
      modifiedTime: seo.dateModified,
      authors: ['Équipe Swiipx'],
      images: [
        {
          url: '/product-main.jpg',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/product-main.jpg'],
    },
  }
}

/* ── JSON-LD schemas ── */
function buildJsonLd(slug: string) {
  const seo = seoData[slug]
  if (!seo) return null

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seo.title,
    description: seo.description,
    datePublished: seo.date,
    dateModified: seo.dateModified,
    inLanguage: 'fr-FR',
    keywords: seo.keywords,
    articleSection: seo.category,
    author: {
      '@type': 'Organization',
      name: 'Swiipx',
      url: 'https://swiipx.fr',
      '@id': 'https://swiipx.fr/#organization',
    },
    publisher: { '@id': 'https://swiipx.fr/#organization' },
    about: {
      '@type': 'Thing',
      name: 'Plaque NFC avis Google',
    },
    image: 'https://swiipx.fr/product-main.jpg',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.article-excerpt'],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://swiipx.fr/blog/${slug}`,
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seo.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://swiipx.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://swiipx.fr/blog' },
      { '@type': 'ListItem', position: 3, name: seo.title.split('|')[0].trim(), item: `https://swiipx.fr/blog/${slug}` },
    ],
  }

  return { article, faqPage, breadcrumb }
}

export default function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const jsonLd = buildJsonLd(params.slug)

  return (
    <>
      {jsonLd && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.article) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
          />
        </>
      )}
      {children}
    </>
  )
}
