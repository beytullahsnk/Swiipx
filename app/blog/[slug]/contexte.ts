import { LOWEST_PRICE_CENTS, formatHt, type PackSlug } from '@/lib/pricing'

/**
 * Message des blocs de conversion d'un article, selon son sujet.
 *
 * POURQUOI : le lecteur arrive de Google avec une question précise. Le même
 * bloc « plaque NFC avis Google » sur tous les articles parlait à côté : qui
 * lit l'article sur les taxis veut savoir où la poser dans sa voiture, qui
 * compare les prix veut le prix. Même emplacement, mais un message qui
 * prolonge la question du lecteur (stratégie du 2026-10-02 : le contextuel se
 * place dans le contenu, pas dans un pop-up, que 4 lecteurs mobiles sur 5
 * n'auraient jamais vu).
 *
 * Les conseils de placement reprennent ceux de chaque article (sa section
 * « où la poser ») : le bloc ne doit jamais contredire le texte qui l'entoure.
 * Un nouvel article secteur sans entrée ici reçoit le message générique.
 */
export type TypeArticle = 'secteur' | 'comparatif' | 'fiche_google' | 'statistiques' | 'conseils'

export interface ContexteArticle {
  type: TypeArticle
  /** Petite ligne au-dessus du titre de l'encart. */
  accroche: string
  titre: string
  texte: string
  /** Libellé du bouton de l'encart et de la carte en colonne. */
  cta: string
  /** Titre de la barre mobile et de la carte en colonne : 24 caractères au plus (375 px). */
  barre: string
  /** Phrase de la carte en colonne, sur ordinateur. */
  resume: string
  titreFin: string
  /** Pack mis en avant en fin d'article, et pourquoi. */
  packConseille: PackSlug | null
  raisonPack: string | null
  /** Logos de clients réels du même secteur (app/data/clients.ts). */
  logosClients: boolean
}

const PRIX = formatHt(LOWEST_PRICE_CENTS)
const LIVREE = "Livrée déjà programmée avec votre lien d'avis Google. Sans application, sans abonnement."

interface Secteur {
  metier: string
  barre: string
  titre: string
  titreFin: string
  pack: PackSlug
  raison: string
  logos?: boolean
}

const SECTEURS: Record<string, Secteur> = {
  'plaque-nfc-taxi-vtc': {
    metier: 'taxis et VTC',
    barre: 'Plaque pour taxi et VTC',
    titre: "Au dos de l'appui-tête, le passager a la plaque sous les yeux pendant tout le trajet",
    titreFin: 'Équipez votre véhicule',
    pack: 'starter',
    raison: 'Une plaque par véhicule',
  },
  'plaque-nfc-pharmacie': {
    metier: 'pharmacies',
    barre: 'Plaque pour pharmacie',
    titre: 'Au comptoir de parapharmacie ou à la caisse libre-service, hors des actes de santé',
    titreFin: 'Équipez votre officine',
    pack: 'business',
    raison: 'Parapharmacie et orthopédie',
  },
  'plaque-nfc-artisan-plombier': {
    metier: 'artisans',
    barre: 'Plaque pour artisan',
    titre: "Sur la pochette de devis : le client note au moment où vous lui remettez la facture",
    titreFin: 'Équipez votre activité',
    pack: 'starter',
    raison: 'Une plaque sur la pochette de devis',
  },
  'plaque-nfc-hotel': {
    metier: 'hôtels',
    barre: 'Plaque pour hôtel',
    titre: "Au comptoir de réception d'abord, au petit-déjeuner ensuite",
    titreFin: 'Équipez votre hôtel',
    pack: 'business',
    raison: 'Réception et petit-déjeuner',
  },
  'plaque-nfc-opticien': {
    metier: 'opticiens',
    barre: 'Plaque pour opticien',
    titre: "Sur la table d'ajustage, au moment où le client essaie ses nouvelles lunettes",
    titreFin: 'Équipez votre magasin',
    pack: 'business',
    raison: "Table d'ajustage et caisse",
  },
  'plaque-nfc-veterinaire': {
    metier: 'vétérinaires',
    barre: 'Plaque pour vétérinaire',
    titre: "Au comptoir d'accueil, à droite du terminal de paiement",
    titreFin: 'Équipez votre clinique',
    pack: 'business',
    raison: 'Accueil et comptoir de délivrance',
  },
  'plaque-nfc-agence-immobiliere': {
    metier: 'agences immobilières',
    barre: 'Plaque pour agence immo',
    titre: 'Sur la table de signature, quand vendeur et acquéreur sont assis et disponibles',
    titreFin: 'Équipez votre agence',
    pack: 'business',
    raison: 'Table de signature et bureau du négociateur',
  },
  'plaque-nfc-auto-ecole': {
    metier: 'auto-écoles',
    barre: 'Plaque pour auto-école',
    titre: 'Au comptoir du secrétariat, puis en salle de code',
    titreFin: 'Équipez votre auto-école',
    pack: 'business',
    raison: 'Secrétariat et salle de code',
  },
  'plaque-nfc-salle-de-sport': {
    metier: 'salles de sport',
    barre: 'Plaque salle de sport',
    titre: "Au bureau du coach, au moment du bilan, puis à l'accueil",
    titreFin: 'Équipez votre salle',
    pack: 'business',
    raison: 'Bureau du coach et accueil',
  },
  'plaque-nfc-boulangerie': {
    metier: 'boulangeries',
    barre: 'Plaque pour boulangerie',
    titre: 'Au comptoir de caisse, juste à côté du terminal de paiement',
    titreFin: 'Équipez votre boulangerie',
    pack: 'starter',
    raison: 'Une plaque à la caisse',
  },
  'plaque-nfc-institut-beaute': {
    metier: 'instituts de beauté',
    barre: 'Plaque pour institut',
    titre: 'À la caisse, puis sur la table de manucure',
    titreFin: 'Équipez votre institut',
    pack: 'business',
    raison: 'Caisse et table de soin',
  },
  'plaque-nfc-garage-automobile': {
    metier: 'garages',
    barre: 'Plaque pour garage',
    titre: "Au comptoir de facturation, quand le client récupère son véhicule",
    titreFin: 'Équipez votre garage',
    pack: 'business',
    raison: 'Facturation et accueil',
  },
  'plaque-nfc-cabinet-medical': {
    metier: 'cabinets médicaux',
    barre: 'Plaque pour cabinet',
    titre: "Sur le bureau, en fin de consultation, puis à l'accueil",
    titreFin: 'Équipez votre cabinet',
    pack: 'starter',
    raison: 'Une plaque sur le bureau',
  },
  'plaque-nfc-salon-coiffure': {
    metier: 'salons de coiffure',
    barre: 'Plaque pour salon',
    titre: 'Sur le poste de coiffage, quand le client découvre sa coupe dans le miroir',
    titreFin: 'Équipez votre salon',
    pack: 'business',
    raison: 'Poste de coiffage et caisse',
  },
  'plaque-nfc-fleuriste': {
    metier: 'fleuristes',
    barre: 'Plaque pour fleuriste',
    titre: 'À plat près du terminal de paiement, sur une zone que les bouquets ne mouillent pas',
    titreFin: 'Équipez votre boutique',
    pack: 'business',
    raison: 'Caisse et plan de travail',
  },
  'plaque-nfc-restaurant': {
    metier: 'restaurants',
    barre: 'Plaque pour restaurant',
    titre: "Sur les tables d'abord, puis à la caisse et sur le porte-addition",
    titreFin: 'Équipez votre restaurant',
    pack: 'pro',
    raison: 'Les tables et la caisse',
    logos: true,
  },
}

const PAR_CATEGORIE: Record<Exclude<TypeArticle, 'secteur'>, Omit<ContexteArticle, 'type'>> = {
  comparatif: {
    accroche: 'Le choix Swiipx, en clair',
    titre: `${PRIX}, payée une fois : pas d'abonnement, et la puce est garantie à vie`,
    texte: "Programmée avec votre lien d'avis Google avant l'expédition, expédiée sous 24 h ouvrées, livraison offerte en point relais.",
    cta: 'Comparer les packs',
    barre: 'Payée une fois',
    resume: "Paiement unique, sans abonnement. Programmée avec votre lien d'avis avant l'expédition.",
    titreFin: 'Choisissez votre pack',
    packConseille: null,
    raisonPack: null,
    logosClients: false,
  },
  fiche_google: {
    accroche: 'Après les réglages, les avis',
    titre: 'Votre fiche est prête ? Il lui faut des avis réguliers : avec la plaque, un geste suffit',
    texte: "Vos clients approchent leur téléphone, le formulaire d'avis de votre fiche s'ouvre. Sans application, sans abonnement.",
    cta: 'Voir la plaque',
    barre: 'Des avis en un geste',
    resume: "Le formulaire d'avis de votre fiche s'ouvre d'un geste, sans application.",
    titreFin: 'Équipez votre établissement',
    packConseille: null,
    raisonPack: null,
    logosClients: false,
  },
  statistiques: {
    accroche: 'Passer aux actes',
    titre: 'Des avis réguliers sans y penser : la plaque reste posée là où le client paie',
    texte: LIVREE,
    cta: 'Voir les packs',
    barre: 'Plaque avis Google',
    resume: "Posée là où le client paie, elle demande l'avis à votre place, tous les jours.",
    titreFin: 'Équipez votre établissement',
    packConseille: null,
    raisonPack: null,
    logosClients: false,
  },
  conseils: {
    accroche: 'La solution Swiipx',
    titre: "Une plaque NFC livrée déjà programmée avec votre lien d'avis Google",
    texte: "Vos clients approchent leur téléphone, la page d'avis s'ouvre. Sans application, sans abonnement.",
    cta: 'Voir les packs',
    barre: 'Plaque avis Google',
    resume: "Livrée déjà programmée avec le lien d'avis de votre établissement. Sans application, sans abonnement.",
    titreFin: 'Équipez votre établissement',
    packConseille: null,
    raisonPack: null,
    logosClients: false,
  },
}

const TYPE_PAR_CATEGORIE: Record<string, Exclude<TypeArticle, 'secteur'>> = {
  Comparatif: 'comparatif',
  'SEO Local': 'fiche_google',
  Statistiques: 'statistiques',
}

export function contexteArticle(slug: string, categorie: string): ContexteArticle {
  const secteur = SECTEURS[slug]
  if (secteur) {
    return {
      type: 'secteur',
      accroche: `Pour les ${secteur.metier}`,
      titre: secteur.titre,
      texte: LIVREE,
      cta: 'Voir les packs',
      barre: secteur.barre,
      resume: `${secteur.titre}. ${LIVREE}`,
      titreFin: secteur.titreFin,
      packConseille: secteur.pack,
      raisonPack: secteur.raison,
      logosClients: secteur.logos ?? false,
    }
  }
  const type = TYPE_PAR_CATEGORIE[categorie] ?? 'conseils'
  return { type, ...PAR_CATEGORIE[type] }
}
