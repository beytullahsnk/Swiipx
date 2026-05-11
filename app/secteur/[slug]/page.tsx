import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, ChevronRight, Star } from 'lucide-react'

interface SectorContent {
  eyebrow: string
  h1: string
  intro: string
  heroStat: { value: string; label: string }
  problemTitle: string
  problemPoints: string[]
  solutionTitle: string
  solutionSteps: { title: string; description: string }[]
  caseStudy: {
    name: string
    location: string
    profile: string
    before: string
    action: string
    result: string
  }
  bestPlacements: string[]
  recommendedPack: { slug: string; name: string; price: string; description: string }
  faq: { q: string; a: string }[]
  relatedBlogSlug: string
  relatedBlogLabel: string
}

const sectors: Record<string, SectorContent> = {
  restaurant: {
    eyebrow: 'Plaque NFC · Restaurants & cafés',
    h1: 'Plaque NFC pour restaurants : multipliez vos avis Google par 7',
    intro: '500+ restaurants français utilisent la plaque NFC Swiipx pour collecter +30 avis Google par mois. Sans abonnement, livraison gratuite, garantie 2 ans.',
    heroStat: { value: '+488 %', label: 'd\'avis Google en 4 mois (cas client)' },
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
    caseStudy: {
      name: 'Le Petit Bistrot',
      location: 'Lyon 7e',
      profile: '35 couverts, 2 services, ticket moyen 28 €',
      before: '47 avis Google, 4,2/5, 8 avis/mois',
      action: '2 plaques NFC déployées (porte-addition + caisse) + formation des serveurs',
      result: '178 avis, 4,7/5, 33 avis/mois en moyenne. Position 1 pack local "bistrot Lyon 7", +28 % de couverts midi.',
    },
    bestPlacements: [
      '🍽️ Sur la table (taux : 40-50 %)',
      '💳 À la caisse (taux : 25-35 %)',
      '📋 Sur le porte-addition (taux : 35-45 %)',
      '🚪 À la sortie (taux : 20-30 %)',
    ],
    recommendedPack: {
      slug: 'business',
      name: 'Pack Business — 2 plaques NFC',
      price: '59,90 €',
      description: 'Le pack idéal pour un restaurant moyen : 1 plaque sur le porte-addition + 1 plaque à la caisse. Configuration incluse, livraison gratuite, garantie 2 ans.',
    },
    faq: [
      { q: 'Combien d\'avis Google peut collecter mon restaurant ?', a: 'En moyenne, les restaurants utilisateurs passent de 5-8 avis/mois à 25-40 avis/mois, soit une multiplication par 4-7. Les meilleurs résultats observés : 60 avis/mois sur des brasseries 80+ couverts.' },
      { q: 'La plaque résiste-t-elle au nettoyage quotidien ?', a: 'Oui. L\'acrylique 3 mm résiste à l\'eau, aux désinfectants, aux UV et aux rayures. Vous pouvez la nettoyer comme une table normale.' },
      { q: 'Faut-il former mes serveurs ?', a: 'Oui, c\'est crucial. Une plaque NFC sans communication verbale convertit 3-4 fois moins. Comptez 15-30 min de briefing pour expliquer le script aux serveurs.' },
      { q: 'Quel pack pour un restaurant de 80 couverts ?', a: 'Pack Pro (5 plaques) : 1 plaque par groupe de 15-20 couverts. C\'est le ratio optimal pour ne pas créer de "bouchon" sur une seule plaque.' },
    ],
    relatedBlogSlug: 'plaque-nfc-restaurant',
    relatedBlogLabel: 'Guide complet : plaque NFC restaurant',
  },
  'salon-coiffure': {
    eyebrow: 'Plaque NFC · Salons de coiffure & instituts',
    h1: 'Plaque NFC pour salons de coiffure : 40-55 % de taux de conversion',
    intro: 'Le secteur N°1 du NFC : vos clientes sont captives, satisfaites, leur téléphone à portée. Conditions parfaites pour collecter +150 avis par an.',
    heroStat: { value: '+660 %', label: 'd\'avis Google en 4 mois (cas client salon)' },
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
    caseStudy: {
      name: 'Salon Élégance',
      location: 'Bordeaux Centre',
      profile: '3 fauteuils, 180 clientes/mois, ticket moyen 60 €',
      before: '52 avis Google, 4,3/5, 4-5 avis/mois',
      action: '2 plaques NFC (1 par poste principal + caisse) + formation script',
      result: '191 avis, 4,8/5, 38 avis/mois. +28 nouvelles clientes/mois, position 2 pack local Bordeaux, CA +22 %.',
    },
    bestPlacements: [
      '💇 Sur le miroir du poste de coiffage (taux record : 45-55 %)',
      '🪞 Près du miroir d\'accueil (30-40 %)',
      '💳 À la caisse (25-35 %)',
      '🎁 Dans le sac de revente produit (15-25 %)',
    ],
    recommendedPack: {
      slug: 'business',
      name: 'Pack Business — 2 plaques NFC',
      price: '59,90 €',
      description: 'Le pack le plus populaire chez les salons : 1 plaque sur le poste principal + 1 plaque à la caisse. Logo et nom de salon inclus.',
    },
    faq: [
      { q: 'Mes clientes seniors vont-elles savoir utiliser le NFC ?', a: 'Oui. Le NFC fonctionne avec tout smartphone récent. La cliente n\'a rien à comprendre : elle approche son téléphone, ça s\'ouvre automatiquement. Plus simple qu\'un QR code.' },
      { q: 'La plaque résiste-t-elle aux produits capillaires ?', a: 'Oui. L\'acrylique 3 mm résiste à l\'eau, aux laques, colorations et shampoings. Nettoyage avec un chiffon humide ou un spray désinfectant.' },
      { q: 'Quel pack pour un institut multi-cabines ?', a: 'Pack Pro (5 plaques) : 1 plaque par cabine + 1 à l\'accueil. Maximisation du taux d\'avis par tranche de clientèle.' },
      { q: 'Combien d\'avis attendre par mois ?', a: 'En moyenne, multiplication par 5-10. Pour un salon avec 5 avis/mois actuellement, comptez 25-50 avis/mois avec une plaque NFC bien placée + script.' },
    ],
    relatedBlogSlug: 'plaque-nfc-salon-coiffure',
    relatedBlogLabel: 'Guide complet : plaque NFC salon de coiffure',
  },
  'cabinet-medical': {
    eyebrow: 'Plaque NFC · Cabinets médicaux & professionnels libéraux',
    h1: 'Plaque NFC pour cabinets médicaux : discrète, déontologique, efficace',
    intro: 'Pour médecins, dentistes, kinés, ostéos, vétérinaires : une solution conforme aux règles déontologiques qui aide à collecter des avis Google de patients satisfaits.',
    heroStat: { value: '+22 avis/mois', label: 'sur un cabinet dentaire (Toulouse)' },
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
    caseStudy: {
      name: 'Cabinet dentaire Sourire Plus',
      location: 'Toulouse',
      profile: '2 praticiens, 300 patients/mois',
      before: 'Aucune solution de collecte. 1-2 avis spontanés par mois',
      action: '2 plaques NFC discrètes (accueil + salle d\'attente) + QR de secours',
      result: '22 avis/mois. Passage de la page 2 à position 1 du pack local pour "dentiste Toulouse centre" en 5 mois.',
    },
    bestPlacements: [
      '🏥 À l\'accueil, à côté du paiement (taux : 25-35 %)',
      '🪑 Dans la salle d\'attente, sur la table basse (15-25 %)',
      '📋 Sur le bureau, en fin de consultation (20-30 %)',
      '🚪 À la sortie, sur le mur ou présentoir discret (15-25 %)',
    ],
    recommendedPack: {
      slug: 'business',
      name: 'Pack Business — 2 plaques NFC',
      price: '59,90 €',
      description: '2 plaques discrètes pour couvrir accueil + salle d\'attente. Design sobre, configuration personnalisée incluse.',
    },
    faq: [
      { q: 'Est-ce conforme à mon code de déontologie ?', a: 'Oui. La plaque est discrète, sans message commercial agressif, et le patient choisit librement de l\'utiliser. C\'est l\'équivalent d\'un panneau "votre avis nous intéresse" classique. Aucune contrepartie offerte, aucune incitation = conforme.' },
      { q: 'Puis-je demander verbalement à mes patients ?', a: 'Évitez la sollicitation directe ("laissez-nous un avis"). Préférez une mention factuelle : "Nous avons mis une plaque à l\'accueil si vous souhaitez laisser un retour." Le patient décide.' },
      { q: 'Quel pack pour un cabinet pluridisciplinaire ?', a: 'Pack Pro (5 plaques) : 1 par cabine de consultation + accueil. Adapté aux cabinets avec 3+ praticiens.' },
      { q: 'Que faire d\'un avis négatif (RGPD, secret médical) ?', a: 'Répondez de manière générale ("Nous sommes désolés que votre expérience n\'ait pas été à la hauteur, contactez-nous à [email]") sans mentionner de détail médical. Si l\'avis viole le secret médical du patient, signalez-le à Google pour suppression.' },
    ],
    relatedBlogSlug: 'avis-clients-influencent-business',
    relatedBlogLabel: 'Pourquoi les avis influencent votre business',
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
                  Commander dès 39,90 €
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href={`/blog/${sector.relatedBlogSlug}`}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-gray-900 rounded-xl font-semibold text-base border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  Lire le guide complet
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" aria-hidden="true" />
                ))}
                <span className="font-medium">4,9/5 · 500+ entreprises</span>
              </div>
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

        {/* Étude de cas */}
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
