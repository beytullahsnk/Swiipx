import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientLogos from '../../components/ClientLogos'
import { faqSecteurs } from './faq'
import Image from 'next/image'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'

interface SectorContent {
  eyebrow: string
  h1: string
  intro: string
  heroStat: { value: string; label: string }
  problemTitle: string
  problemPoints: string[]
  solutionTitle: string
  solutionSteps: { title: string; description: string }[]
  /** Etude de cas : uniquement si REELLE et validee par le client. */
  caseStudy?: {
    name: string
    location: string
    profile: string
    before: string
    action: string
    result: string
  }
  /** Affiche le bloc logos clients pour ce secteur. */
  montrerClients?: boolean
  bestPlacements: string[]
  /**
   * Section « quel format ? ». Repond a une demande mesuree dans Search
   * Console : « plaque nfc CARTE restaurant » (117 impressions/trimestre) et
   * « MAGNET nfc restaurant » (33). Les gens cherchent le bon format avant de
   * choisir. On repond honnetement — on ne vend que la plaque — plutot que de
   * laisser la question sans reponse.
   */
  formats: {
    intro: string
    options: { nom: string; pour: string; limite: string }[]
    conclusion: string
  }
  /**
   * Section « fiche Google Business Profile ». Repond a
   * « plaque nfc google my business » (34 impressions), et explique le
   * mecanisme reel du produit — ce que la plupart des prospects ignorent.
   */
  googleBusiness: { paragraphes: string[] }
  recommendedPack: { slug: string; name: string; price: string; description: string }
  faq: { q: string; a: string }[]
  relatedBlogSlug: string
  relatedBlogLabel: string
}

const sectors: Record<string, SectorContent> = {
  restaurant: {
    eyebrow: 'Plaque NFC · Restaurants & cafés',
    h1: 'Plaque NFC pour restaurants : multipliez vos avis Google par 7',
    intro: 'La plaque NFC Swiipx est programmée avec le lien d\'avis Google de votre restaurant. Vos clients laissent un avis en 10 secondes, sans application. Sans abonnement, livraison gratuite, garantie à vie.',
    heroStat: { value: '10 s', label: 'pour qu\'un client laisse son avis' },
    problemTitle: 'Le problème : 95 % de vos clients satisfaits ne laissent jamais d\'avis',
    problemPoints: [
      'Vos clients sont satisfaits après le repas, mais oublient de laisser un avis',
      'Demander verbalement convertit moins de 5 %',
      'Un QR code sur l\'addition convertit 8-12 %',
      'Sans avis récents, vous disparaissez du pack local Google',
      'Vos concurrents bien notés capturent les nouveaux clients',
    ],
    solutionTitle: 'La solution : la plaque NFC sur la table ou le porte-addition',
    solutionSteps: [
      { title: 'Posez la plaque', description: 'Sur la table, le porte-addition ou la caisse. Plusieurs emplacements possibles selon votre configuration.' },
      { title: 'Le serveur mentionne au moment du paiement', description: '« Tout s\'est bien passé ? Si vous avez 30 secondes, un avis nous aiderait — approchez votre téléphone ici. »' },
      { title: 'Le client approche son smartphone', description: 'La page d\'avis Google s\'ouvre en 3 secondes. Le client note et commente en 30 secondes.' },
      { title: 'Vous récoltez 30-60 avis/mois', description: 'Soit 4-7× plus qu\'avant. Note moyenne en hausse, ranking pack local en hausse, CA en hausse.' },
    ],
    bestPlacements: [
      '🍽️ Sur la table (taux : 40-50 %)',
      '💳 À la caisse (taux : 25-35 %)',
      '📋 Sur le porte-addition (taux : 35-45 %)',
      '🚪 À la sortie (taux : 20-30 %)',
    ],
    formats: {
      intro: "Plaque, carte ou magnet : le support change tout, parce qu'il détermine si le client voit le message au bon moment. Voici ce que donne chacun en salle.",
      options: [
        { nom: 'La plaque', pour: "Reste posée sur une table, un comptoir ou un porte-addition. Le client la voit sans qu'un serveur ait à la lui tendre.", limite: "Il en faut une par emplacement à couvrir." },
        { nom: 'La carte', pour: "Se glisse dans le porte-addition ou se remet en main propre.", limite: "Format souple : elle se plie, se tache avec le service, et finit par disparaître dans un tiroir." },
        { nom: 'Le magnet', pour: "Se pose sur une surface métallique — frigo, hotte, meuble de caisse.", limite: "Suppose d'avoir du métal à hauteur de regard, ce qui est rare côté salle." },
      ],
      conclusion: "Swiipx ne fabrique que la plaque : acrylique 3 mm, adhésif 3M au dos, QR code de secours imprimé. C'est le format qui reste où on le pose et qui supporte le nettoyage quotidien d'une salle de restaurant.",
    },
    googleBusiness: {
      paragraphes: [
        "Une plaque NFC ne crée pas d'avis toute seule : elle ouvre le formulaire d'avis de votre fiche Google Business Profile. Sans fiche, il n'existe aucun lien vers lequel envoyer vos clients.",
        "Chaque établissement référencé par Google possède un identifiant unique, le Place ID. C'est lui qui construit l'adresse du formulaire d'avis. Au moment de la commande, vous cherchez votre établissement dans le champ prévu : nous récupérons ce Place ID et programmons la puce avec le lien correspondant.",
        "C'est pour cette raison que la plaque arrive prête à l'emploi. Aucune application à installer, aucun code à saisir : le lien est déjà dans la puce quand vous ouvrez le colis.",
        "Deux conditions à vérifier avant de commander : votre fiche doit exister et être validée par Google. Si vous ne l'avez pas encore revendiquée, faites-le d'abord — c'est gratuit et cela prend quelques jours.",
      ],
    },
    recommendedPack: {
      slug: 'business',
      name: 'Pack Business — 2 plaques NFC',
      price: '65,88 €',
      description: 'Le pack idéal pour un restaurant moyen : 1 plaque sur le porte-addition + 1 plaque à la caisse. Configuration incluse, livraison gratuite, garantie à vie.',
    },
    faq: faqSecteurs['restaurant'],
    montrerClients: true,
    relatedBlogSlug: 'plaque-nfc-restaurant',
    relatedBlogLabel: 'Guide complet : plaque NFC restaurant',
  },
  'salon-coiffure': {
    eyebrow: 'Plaque NFC · Salons de coiffure & instituts',
    h1: 'Plaque NFC pour salons de coiffure : 40-55 % de taux de conversion',
    intro: 'Vos clientes sont captives, satisfaites, leur téléphone à portée. Conditions parfaites pour collecter +150 avis par an.',
    heroStat: { value: '10 s', label: 'pour qu\'une cliente laisse son avis' },
    problemTitle: 'Le problème : votre note Google bloque à 4,3/5',
    problemPoints: [
      'Vos clientes sont ravies en sortant... mais oublient de laisser un avis',
      'Demander de vive voix convertit moins de 5 %',
      'Un QR code sur la carte de visite : 8-12 % maximum',
      'Vos concurrents à 4,7+/5 captent les nouvelles clientes',
      'Sans avis récents, votre fiche Google perd en visibilité chaque mois',
    ],
    solutionTitle: 'La solution : la plaque NFC sur le miroir du poste de coiffage',
    solutionSteps: [
      { title: 'Posez la plaque à côté du miroir', description: 'À hauteur d\'œil pour que la cliente la voie pendant toute la prestation.' },
      { title: 'Au brushing final, le/la coiffeur·se mentionne', description: '« Vous êtes magnifique ! Si ça vous plaît, un avis Google nous aiderait beaucoup — approchez votre téléphone ici. »' },
      { title: 'La cliente laisse un avis en 30 secondes', description: 'Au pic émotionnel maximal, quand elle découvre sa transformation.' },
      { title: 'Vous passez de 5 à 35 avis/mois', description: 'Note moyenne en hausse, position pack local en hausse, nouvelles clientes en hausse.' },
    ],
    bestPlacements: [
      '💇 Sur le miroir du poste de coiffage (taux record : 45-55 %)',
      '🪞 Près du miroir d\'accueil (30-40 %)',
      '💳 À la caisse (25-35 %)',
      '🎁 Dans le sac de revente produit (15-25 %)',
    ],
    formats: {
      intro: "Plaque, carte ou magnet : dans un salon, le support doit tenir en place face au miroir et résister aux produits. Voici ce que vaut chacun.",
      options: [
        { nom: 'La plaque', pour: "Se fixe près du miroir, à hauteur de regard, et reste visible pendant toute la prestation.", limite: "Il en faut une par poste de coiffage à équiper." },
        { nom: 'La carte', pour: "Se glisse dans le sac de revente ou se donne à l'encaissement.", limite: "La cliente la reçoit en partant, quand l'effet de la prestation est déjà retombé." },
        { nom: 'Le magnet', pour: "Tient sur un bac à shampoing ou un meuble métallique.", limite: "Rarement placé dans le champ de vision de la cliente installée au fauteuil." },
      ],
      conclusion: "Swiipx ne fabrique que la plaque : acrylique 3 mm, adhésif 3M au dos, QR code de secours imprimé. Elle résiste aux laques, colorations et shampoings, et se nettoie au chiffon humide.",
    },
    googleBusiness: {
      paragraphes: [
        "Une plaque NFC ne crée pas d'avis toute seule : elle ouvre le formulaire d'avis de votre fiche Google Business Profile. Sans fiche, il n'existe aucun lien vers lequel envoyer vos clients.",
        "Chaque établissement référencé par Google possède un identifiant unique, le Place ID. C'est lui qui construit l'adresse du formulaire d'avis. Au moment de la commande, vous cherchez votre établissement dans le champ prévu : nous récupérons ce Place ID et programmons la puce avec le lien correspondant.",
        "C'est pour cette raison que la plaque arrive prête à l'emploi. Aucune application à installer, aucun code à saisir : le lien est déjà dans la puce quand vous ouvrez le colis.",
        "Deux conditions à vérifier avant de commander : votre fiche doit exister et être validée par Google. Si vous ne l'avez pas encore revendiquée, faites-le d'abord — c'est gratuit et cela prend quelques jours.",
      ],
    },
    recommendedPack: {
      slug: 'business',
      name: 'Pack Business — 2 plaques NFC',
      price: '65,88 €',
      description: 'Le pack le plus populaire chez les salons : 1 plaque sur le poste principal + 1 plaque à la caisse. Logo et nom de salon inclus.',
    },
    faq: faqSecteurs['salon-coiffure'],
    relatedBlogSlug: 'plaque-nfc-salon-coiffure',
    relatedBlogLabel: 'Guide complet : plaque NFC salon de coiffure',
  },
  'cabinet-medical': {
    eyebrow: 'Plaque NFC · Cabinets médicaux & professionnels libéraux',
    h1: 'Plaque NFC pour cabinets médicaux : discrète, déontologique, efficace',
    intro: 'Pour médecins, dentistes, kinés, ostéos, vétérinaires : une solution conforme aux règles déontologiques qui aide à collecter des avis Google de patients satisfaits.',
    heroStat: { value: '10 s', label: 'pour qu\'un patient laisse son avis' },
    problemTitle: 'Le problème : 1-2 avis Google par mois, c\'est insuffisant',
    problemPoints: [
      'Les patients satisfaits ne laissent quasi jamais d\'avis spontanément',
      'Vous ne pouvez pas faire de publicité agressive (déontologie)',
      'Vos confrères mieux notés capturent les nouveaux patients',
      'Une fiche Google sans avis = invisible pour les patients qui cherchent',
      'L\'enjeu : être visible sans contrevenir aux règles professionnelles',
    ],
    solutionTitle: 'La solution : la plaque NFC discrète à l\'accueil',
    solutionSteps: [
      { title: 'Plaque discrète à l\'accueil ou en salle d\'attente', description: 'Sans message commercial agressif. Juste une plaque sobre avec un texte du type « Votre retour nous est précieux ».' },
      { title: 'Le patient la remarque pendant l\'attente ou au check-out', description: 'Aucune pression verbale de votre part. C\'est lui qui décide.' },
      { title: 'Il approche son téléphone, laisse un avis en 30 secondes', description: 'En toute simplicité, sans incitation, sans cadeau.' },
      { title: 'Vous passez de 1-2 à 15-25 avis par mois', description: 'Tout en restant 100 % conforme à votre code de déontologie professionnelle.' },
    ],
    bestPlacements: [
      '🏥 À l\'accueil, à côté du paiement (taux : 25-35 %)',
      '🪑 Dans la salle d\'attente, sur la table basse (15-25 %)',
      '📋 Sur le bureau, en fin de consultation (20-30 %)',
      '🚪 À la sortie, sur le mur ou présentoir discret (15-25 %)',
    ],
    formats: {
      intro: "Plaque, carte ou magnet : en cabinet, le support doit rester discret et ne jamais donner l'impression de solliciter le patient. Voici ce que vaut chacun.",
      options: [
        { nom: 'La plaque', pour: "Se pose au comptoir d'accueil ou en salle d'attente. Le patient la remarque de lui-même, sans qu'on lui demande quoi que ce soit.", limite: "Il en faut une par point d'accueil." },
        { nom: 'La carte', pour: "Se remet en main propre avec l'ordonnance ou la carte de rendez-vous.", limite: "Le geste de remise s'apparente à une sollicitation directe, ce que la déontologie déconseille." },
        { nom: 'Le magnet', pour: "Tient sur un meuble métallique ou un tableau.", limite: "Peu de cabinets disposent d'une surface métallique bien placée." },
      ],
      conclusion: "Swiipx ne fabrique que la plaque : acrylique 3 mm, adhésif 3M au dos, QR code de secours imprimé. Format sobre, sans message commercial, qui laisse le patient libre de l'utiliser ou non.",
    },
    googleBusiness: {
      paragraphes: [
        "Une plaque NFC ne crée pas d'avis toute seule : elle ouvre le formulaire d'avis de votre fiche Google Business Profile. Sans fiche, il n'existe aucun lien vers lequel envoyer vos clients.",
        "Chaque établissement référencé par Google possède un identifiant unique, le Place ID. C'est lui qui construit l'adresse du formulaire d'avis. Au moment de la commande, vous cherchez votre établissement dans le champ prévu : nous récupérons ce Place ID et programmons la puce avec le lien correspondant.",
        "C'est pour cette raison que la plaque arrive prête à l'emploi. Aucune application à installer, aucun code à saisir : le lien est déjà dans la puce quand vous ouvrez le colis.",
        "Deux conditions à vérifier avant de commander : votre fiche doit exister et être validée par Google. Si vous ne l'avez pas encore revendiquée, faites-le d'abord — c'est gratuit et cela prend quelques jours.",
      ],
    },
    recommendedPack: {
      slug: 'business',
      name: 'Pack Business — 2 plaques NFC',
      price: '65,88 €',
      description: '2 plaques discrètes pour couvrir accueil + salle d\'attente. Design sobre, configuration personnalisée incluse.',
    },
    faq: faqSecteurs['cabinet-medical'],
    // Renvoyait vers un article generaliste alors qu'un guide dedie a la
    // deontologie medicale existe : c'est lui qui repond aux objections
    // specifiques de cette audience.
    relatedBlogSlug: 'plaque-nfc-cabinet-medical',
    relatedBlogLabel: 'Plaque NFC cabinet médical : le guide déontologie',
  },
}

export function generateStaticParams() {
  return Object.keys(sectors).map((slug) => ({ slug }))
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sector = sectors[params.slug]
  if (!sector) notFound()

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 to-transparent pt-36 pb-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <span className="text-gray-700">{sector.h1.split(':')[0].trim()}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                {sector.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
                {sector.h1}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
                {sector.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/product/${sector.recommendedPack.slug}`}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white rounded-xl font-semibold text-base shadow-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Commander dès 35,88 €
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href={`/blog/${sector.relatedBlogSlug}`}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-gray-900 rounded-xl font-semibold text-base border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  Lire le guide complet
                </Link>
              </div>
              <p className="mt-8 text-sm text-gray-500">
                Sans abonnement · Garantie à vie · Livraison gratuite en 2-5 jours
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gray-900 rounded-2xl p-8 sm:p-10 text-white">
                <p className="text-5xl sm:text-6xl font-bold text-accent leading-none mb-3">
                  {sector.heroStat.value}
                </p>
                <p className="text-base text-gray-300">{sector.heroStat.label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 space-y-20">
        {/* Problème */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{sector.problemTitle}</h2>
          <ul className="space-y-3">
            {sector.problemPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-gray-700 leading-relaxed">
                <span className="text-red-500 font-bold mt-0.5">✗</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Solution */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">{sector.solutionTitle}</h2>
          <ol className="space-y-6">
            {sector.solutionSteps.map((step, i) => (
              <li key={i} className="flex gap-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Étude de cas — affichée uniquement si réelle et validée par le client */}
        {sector.caseStudy && (
          <section className="bg-gray-50 rounded-2xl p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Étude de cas</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{sector.caseStudy.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{sector.caseStudy.location} · {sector.caseStudy.profile}</p>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Avant</dt>
                <dd className="text-base text-gray-700">{sector.caseStudy.before}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Action</dt>
                <dd className="text-base text-gray-700">{sector.caseStudy.action}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Résultat</dt>
                <dd className="text-base text-gray-900 font-medium">{sector.caseStudy.result}</dd>
              </div>
            </dl>
          </section>
        )}

        {/* Clients réels de ce secteur */}
        {sector.montrerClients && (
          <section className="bg-gray-50 rounded-2xl p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Ils utilisent déjà Swiipx
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Des établissements de votre secteur
            </h2>
            {/* Logos plutot que noms en clair : seuls les clients nous ayant
                transmis leur logo sont montres. */}
            <ClientLogos titre={null} />
          </section>
        )}

        {/* Meilleurs emplacements */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Meilleurs emplacements</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {sector.bestPlacements.map((p, i) => (
              <li key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-base text-gray-800">
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Quel format ? — repond a « plaque nfc CARTE restaurant » (117
            impressions/trimestre) et « MAGNET nfc restaurant » (33). Ces
            requetes n'avaient aucune reponse sur le site. */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Plaque, carte ou magnet&nbsp;: quel format choisir&nbsp;?
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{sector.formats.intro}</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {sector.formats.options.map((o) => (
              <div key={o.nom} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">{o.nom}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{o.pour}</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-600">Limite&nbsp;: </span>
                  {o.limite}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base text-gray-700 leading-relaxed bg-blue-50 border border-blue-100 rounded-xl p-5">
            {sector.formats.conclusion}
          </p>
        </section>

        {/* Fiche Google Business Profile — repond a « plaque nfc google my
            business » (34 impressions) et explique le mecanisme reel du
            produit, que la plupart des prospects ignorent. */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Le lien avec votre fiche Google Business Profile
          </h2>
          <div className="space-y-4">
            {sector.googleBusiness.paragraphes.map((para, i) => (
              <p key={i} className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Pack recommandé */}
        <section className="bg-blue-50 rounded-2xl p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Notre recommandation</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{sector.recommendedPack.name}</h2>
          <p className="text-3xl font-bold text-primary mb-4">{sector.recommendedPack.price}</p>
          <p className="text-base text-gray-700 mb-6 leading-relaxed">
            {sector.recommendedPack.description}
          </p>
          <Link
            href={`/product/${sector.recommendedPack.slug}`}
            className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white rounded-xl font-semibold text-base shadow-lg hover:bg-blue-700 transition-colors"
          >
            Voir le pack
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Questions fréquentes</h2>
          <div className="space-y-6">
            {sector.faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-base text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA fin de page */}
        <section className="bg-blue-50/40 border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Une question sur la plaque NFC ?</h2>
          <p className="text-gray-600 mb-5">Notre équipe répond en moins de 24h.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:bonjour@swiipx.fr"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Envoyer un email
            </a>
            <Link
              href={`/blog/${sector.relatedBlogSlug}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm border border-gray-200 hover:border-gray-400 transition-colors"
            >
              {sector.relatedBlogLabel}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
