import {
  Calendar, Clock, ArrowRight, CheckCircle2, TrendingUp, Users,
  Target, Zap, MessageSquare, BarChart3, AlertTriangle,
  ThumbsUp, Award, Rocket, ChevronRight, PenLine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ArticleToc from '../[slug]/ArticleToc'
import ArticleAds from '../[slug]/ArticleAds'
import { getRelatedArticles } from '../[slug]/related'

/* ─────────────────────────────────────────────
   Table of Contents - sections de l'article
   ───────────────────────────────────────────── */
const tocSections = [
  { id: 'probleme', label: 'Le problème' },
  { id: 'phase-1', label: 'Phase 1 : GMB' },
  { id: 'phase-2', label: 'Phase 2 : Outil NFC' },
  { id: 'phase-3', label: 'Phase 3 : Scripts' },
  { id: 'phase-4', label: 'Phase 4 : Répondre' },
  { id: 'cas-pratique', label: 'Exemple de calcul' },
  { id: 'faq', label: 'FAQ' },
]

const SLUG = 'doubler-avis-google-30-jours'

export const dynamic = 'force-static'

export default function DoublerAvisGoogle30Jours() {
  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════
          BANNIÈRE PUB SWIIPX (haut de page)
          ═══════════════════════════════════════════ */}
      <section className="bg-accent pt-32 pb-10 relative overflow-hidden">
        <div className="absolute left-6 top-32 hidden lg:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-2.jpg" alt="Plaque Swiipx « Laissez-nous votre avis » : logo Google, zone NFC et QR code de secours" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute right-6 top-32 hidden lg:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-1.jpg" alt="Un client approche son iPhone de la plaque Swiipx posée sur le comptoir, à côté du terminal de paiement : la notification NFC s'affiche à l'écran" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <p className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">
            Boostez vos avis Google<br />avec Swiipx dès aujourd&apos;hui
          </p>
          <p className="text-gray-800 mb-6 max-w-xl mx-auto">
            Commandez votre plaque NFC et commencez à collecter des avis en 10 secondes. 
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#product"
              className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            >
              Découvrir nos plaques avis Google
            </Link>
            <Link
              href="/#how-it-works"
              className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <span>▶</span>
              <span>Comment ça marche ?</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HEADER DE L'ARTICLE
          ═══════════════════════════════════════════ */}
      <section className="border-b border-gray-200 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6 uppercase tracking-wider font-semibold">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>|</span>
            <span className="text-primary">Stratégie</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Comment doubler vos avis Google en 30 jours
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Méthode complète en 4 phases : optimiser votre fiche Google Business, supprimer la friction avec une plaque NFC, demander l&apos;avis au bon moment et répondre à chacun. Avec un exemple de calcul à refaire avec vos propres chiffres.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>19 janvier 2026</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>10 min de lecture</span>
            </div>
            {/* Cet article a sa propre route et n'heritait donc pas de la
                signature ajoutee a /blog/[slug] : son JSON-LD declarait un
                author sans equivalent visible, l'ecart meme qu'on corrigeait
                ailleurs. */}
            <div className="flex items-center space-x-2">
              <PenLine className="w-4 h-4" />
              <span>
                Par{' '}
                <Link href="/a-propos" className="text-gray-600 hover:text-primary underline underline-offset-2">
                  Équipe Swiipx
                </Link>
              </span>
            </div>
          </div>

          {/* Ligne jaune décorative */}
          <div className="w-24 h-1 bg-accent mx-auto mt-8 rounded-full"></div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LAYOUT 3 COLONNES : TOC | CONTENU | ADS
          ═══════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-10">

          {/* ── COLONNE GAUCHE : TOC sticky (style Shopify) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <p id="sommaire-titre" className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                SOMMAIRE
              </p>
              <ArticleToc sections={tocSections} />

              {/* Bloc CTA Produit */}
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/product-main.jpg"
                      alt="Plaque Swiipx « Laissez-nous votre avis » : logo Google, zone NFC et QR code de secours"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Plaque NFC Swiipx
                  </p>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Livrée déjà programmée avec le lien d&apos;avis de votre établissement. Installation en 30 secondes.
                  </p>
                  {/* Aucun prix barre : les tarifs ont augmente, afficher une
                      reduction serait une reduction fictive. */}
                  <p className="text-lg font-bold text-primary mb-3">35,88 €</p>
                  <Link
                    href="/#product"
                    className="block w-full py-3 bg-primary text-white text-center font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-md hover:shadow-lg"
                  >
                    Voir la plaque avis Google →
                  </Link>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Livraison offerte en point relais · Garantie à vie
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* ── COLONNE CENTRE : CONTENU ── */}
          <article data-article className="max-w-none">

            {/* ────────────────────────────────────
                Section 1 : Le problème
                ──────────────────────────────────── */}
            <section id="probleme" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                1. Le vrai problème : pourquoi vous stagnez à 2-3 avis par mois
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Les <strong>avis Google</strong> sont devenus un critère de choix majeur. L&apos;enquête <a href="https://www.brightlocal.com/research/local-consumer-review-survey/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary font-medium hover:underline">BrightLocal « Local Consumer Review Survey » 2026</a>, menée auprès de 1 002 consommateurs américains, indique que <strong>97&nbsp;% d&apos;entre eux lisent des avis avant de choisir un commerce local</strong>. Côté français, l&apos;<a href="https://presence.fr/les-avis-en-ligne-en-2026-83-des-francais-les-consultent-80-en-deposent-un-incontournable-de-lexperience-client/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary font-medium hover:underline">étude PRESENCE 2026</a>, menée auprès de 1 350 Français représentatifs, donne un repère comparable sur notre marché : <strong>83&nbsp;% des Français déclarent consulter les avis avant de se rendre dans un point de vente</strong>, et 80&nbsp;% déclarent avoir déjà déposé un avis. Pourtant, la plupart des commerces ne récoltent qu&apos;une poignée d&apos;avis chaque mois, et c&apos;est ce décalage qui est le vrai problème.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Le constat est universel, quel que soit votre secteur : restaurants, salons de coiffure, cabinets médicaux, boutiques ou garages. Vos clients sont satisfaits — ils reviennent, ils vous recommandent à leurs proches — mais ils ne laissent jamais d&apos;avis en ligne. Et sans ces avis, Google ne sait pas que vous existez, ou pire, il met en avant vos concurrents qui en ont plus que vous.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Pourquoi si peu d&apos;avis spontanés ?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                La raison est simple : la <strong>friction</strong>. Pour laisser un avis Google de sa propre initiative, un client satisfait doit sortir son téléphone, ouvrir son navigateur, chercher votre établissement, distinguer votre fiche de celle d&apos;un homonyme, cliquer sur &ldquo;Donner un avis&rdquo;, vérifier qu&apos;il est connecté au bon compte Google, choisir une note, rédiger un texte et publier. <strong>Neuf étapes dont aucune n&apos;est difficile</strong> — mais neuf occasions d&apos;abandonner, dans un moment où le client a déjà autre chose en tête.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Pensez-y : quand vous quittez un restaurant après un excellent repas, est-ce que vous prenez votre téléphone pour rédiger un avis ? Probablement pas. Vous êtes pressé, vous avez autre chose en tête, et vous vous dites &ldquo;je le ferai plus tard&rdquo;. Sauf que &ldquo;plus tard&rdquo; n&apos;arrive jamais. C&apos;est exactement ce que vivent vos clients chaque jour. La satisfaction est là, mais le passage à l&apos;action ne suit pas.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Les conséquences directes sur votre chiffre d&apos;affaires</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start space-x-2 text-gray-700">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Perte de visibilité locale</strong> : Google favorise les fiches avec un volume élevé d&apos;avis récents dans le pack local (les 3 premiers résultats sur Google Maps).</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Perte de confiance</strong> : un commerce avec 8 avis inspire moins confiance qu&apos;un concurrent à 120 avis, même si votre note est supérieure.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Perte de clients</strong> : à quelques rues de distance et à prestation comparable, le prospect qui hésite tranche sur ce qu&apos;il voit à l&apos;écran. Une fiche à 8 avis et une fiche à 120 n&apos;offrent pas la même matière pour se décider.</span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-4">
                Concrètement, si vous servez 100 clients satisfaits par mois et que vous n&apos;en récoltez que deux ou trois, l&apos;écart avec un concurrent qui en obtient 25 se creuse de plus de 250 avis en un an. Ce n&apos;est pas un écart de qualité de service, c&apos;est un écart de méthode — et il finit par se voir sur la fiche. Pour comprendre en profondeur ce mécanisme, consultez notre guide complet sur <Link href="/blog/avis-clients-influencent-business" className="text-primary font-medium hover:underline">pourquoi les avis clients influencent votre business</Link>.
              </p>

              <div className="bg-blue-50 border-l-4 border-primary p-4 my-6 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-primary">La bonne nouvelle</strong><br/>
                  Cette friction se supprime, et elle se supprime vite. Les 4 phases qui suivent tiennent en 30 jours de mise en place : optimiser la fiche, poser la plaque, roder la demande orale, installer la routine de réponse. <strong>Le nombre d&apos;avis obtenu au bout dépend ensuite de votre fréquentation et de la constance de votre équipe</strong> : personne, nous compris, ne peut vous le garantir à l&apos;avance.
                </p>
              </div>
            </section>

            {/* ────────────────────────────────────
                Section 2 : Phase 1 — GMB
                ──────────────────────────────────── */}
            <section id="phase-1" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Phase 1 : Optimisez votre fiche Google Business Profile
              </h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">Jour 1 à 3 — Fondation indispensable</p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Avant de collecter plus d&apos;avis, il faut s&apos;assurer que votre <strong>fiche Google Business Profile</strong> (anciennement Google My Business) est complète. Une fiche à moitié remplie coûte deux fois : elle donne moins d&apos;éléments à Google pour comprendre ce que vous faites, et moins de raisons au prospect de vous choisir. Horaires absents, catégorie approximative, aucune photo de la façade : chacun de ces manques est une porte de sortie offerte au visiteur, et aucun ne demande plus de dix minutes à combler.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Votre fiche Google Business Profile est votre vitrine numérique. C&apos;est souvent la première chose que vos prospects voient avant même de visiter votre site web. Si votre fiche affiche des horaires erronés, aucune photo, ou une description vide, le message envoyé est clair : ce commerce ne prend pas soin de son image. Et un prospect qui doute ira chez le concurrent dont la fiche est impeccable.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                L&apos;optimisation de votre fiche prend entre 1 et 3 heures, mais c&apos;est un investissement qui rapporte pendant des années. Chaque élément que vous ajoutez — photos, services, description — envoie un signal de confiance à Google et à vos futurs clients. C&apos;est la base sur laquelle tout le reste de la stratégie repose.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Checklist d&apos;optimisation Google Business Profile</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Informations complètes</strong> : nom, adresse, téléphone, horaires (y compris jours fériés), site web, catégorie principale et catégories secondaires.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>15+ photos réelles</strong> : façade, intérieur, produits ou prestations, équipe. La photo de façade est la plus utile des quinze : c&apos;est elle qui évite au client arrivé sur place de passer devant sans vous reconnaître.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Description optimisée</strong> : 750 caractères max, incluez vos mots-clés locaux (ville, quartier, services principaux).</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Services &amp; attributs</strong> : listez chaque prestation avec un prix si possible. Cochez tous les attributs pertinents (Wi-Fi, accès PMR, paiement CB…).</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Messagerie &amp; posts</strong> : activez la messagerie instantanée et publiez votre premier post Google (actualité, offre ou événement).</span>
                </li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-amber-800">Astuce SEO local</strong><br/>
                  Ajoutez votre mot-clé principal dans le nom de votre fiche uniquement s&apos;il fait partie de votre raison sociale officielle. Sinon, Google pourrait suspendre votre fiche. Pour approfondir le sujet, lisez notre guide <Link href="/blog/seo-local-recherches-google" className="text-primary font-medium hover:underline">SEO Local : comment grimper en tête des recherches</Link>.
                </p>
              </div>
            </section>

            {/* ────────────────────────────────────
                Section 3 : Phase 2 — NFC
                ──────────────────────────────────── */}
            <section id="phase-2" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Phase 2 : Éliminez la friction avec une plaque NFC
              </h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">Jour 4 à 5 — Le levier le plus puissant</p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Tout se joue sur un point : <strong>rendre le geste instantané</strong>. Tant que le client doit chercher votre fiche lui-même, l&apos;écart entre son intention et son action reste entier. Avec une <strong>plaque NFC</strong>, il approche son smartphone et arrive directement sur votre page d&apos;avis Google. Le parcours passe des neuf étapes décrites plus haut à une seule, et il se déroule devant vous, pas plus tard chez lui.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Le principe est celui de la &ldquo;loi du moindre effort&rdquo; : plus une action est facile à réaliser, plus les gens la font. C&apos;est exactement pour cette raison que les plateformes comme Amazon ou Uber ont simplifié le paiement en un clic. Le même principe s&apos;applique à la collecte d&apos;avis : si le client n&apos;a qu&apos;un geste à faire, il le fait. S&apos;il doit chercher, taper, se connecter et rédiger, il abandonne.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                C&apos;est la raison pour laquelle la technologie NFC (Near Field Communication) a changé la donne pour les commerces de proximité. Utilisée depuis des années dans le paiement sans contact, elle permet une communication instantanée entre deux appareils à courte portée. Appliquée à la collecte d&apos;avis, elle transforme un processus de 7 minutes en un geste de 10 secondes.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Ce que chaque méthode demande au client</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous ne publions pas de taux de conversion comparés : nous ne les mesurons pas. Ce qui est en revanche vérifiable, et qui explique l&apos;essentiel de l&apos;écart, c&apos;est le nombre de gestes demandés au client et le moment où on les lui demande.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Méthode</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Ce que le client doit faire</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Quand</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Coût</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-200 text-gray-700">Email de relance</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Ouvrir sa boîte mail, retrouver le message, cliquer, se connecter</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Plusieurs heures ou jours après</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Gratuit (mais chronophage)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border border-gray-200 text-gray-700">QR code imprimé</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Déverrouiller, ouvrir l&apos;appareil photo, viser, confirmer le lien</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Sur place, s&apos;il pense à le faire</td>
                      <td className="p-3 border border-gray-200 text-gray-700">~5 €</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">Plaque NFC Swiipx</td>
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">Approcher le téléphone de la plaque</td>
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">Sur place, au moment où vous la lui montrez</td>
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">À partir de 35,88 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Ce que le NFC supprime, concrètement, par rapport au QR code</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start space-x-2 text-gray-700">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Zéro friction</strong> : pas besoin d&apos;ouvrir l&apos;appareil photo, de scanner, ni de cliquer sur un lien. Un simple contact suffit.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Effet &ldquo;wow&rdquo;</strong> : le geste NFC surprend positivement le client, ce qui renforce la mémorabilité et l&apos;envie de participer.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Compatibilité</strong> : tous les iPhone depuis le 7 (2016) et la quasi-totalité des Android récents lisent le NFC sans réglage ni application à installer. Un QR code imprimé au dos couvre les rares exceptions.</span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-4">
                En résumé, le NFC supprime l&apos;obstacle principal qui empêche vos clients de laisser un avis : l&apos;effort. Pas d&apos;application à télécharger, pas de QR code à scanner avec l&apos;appareil photo, pas de recherche Google à effectuer. Le client pose son téléphone sur la plaque, la page d&apos;avis s&apos;ouvre, et il n&apos;a plus qu&apos;à écrire et publier. Le geste dure une dizaine de secondes et se fait pendant qu&apos;il est encore chez vous, au moment où il est content : c&apos;est là toute la différence.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Pour tout savoir sur le fonctionnement technique de la puce et les placements adaptés à chaque métier, consultez notre article dédié : <Link href="/blog/nfc-avis-clients" className="text-primary font-medium hover:underline">NFC : la nouvelle arme pour vos avis clients</Link>.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 my-6 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-900">Meilleurs emplacements par métier</strong><br/>
                  <strong>Restaurant</strong> : sur la table ou à la caisse, après le dessert. <strong>Salon de coiffure</strong> : devant le miroir au poste de coiffage. <strong>Cabinet médical</strong> : à l&apos;accueil, lors de la prise du prochain rendez-vous. <strong>Boutique</strong> : au comptoir, lors de la remise du sac.
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 text-center my-8">
                <p className="text-white font-bold text-lg mb-3">Prêt à passer au NFC ?</p>
                <p className="text-gray-400 text-sm mb-4">Le pack 2 plaques est le plus populaire : 65,88&nbsp;€, aucun abonnement.</p>
                <Link href="/#product" className="inline-block px-6 py-3 bg-accent text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors">
                  Voir les packs Swiipx →
                </Link>
              </div>
            </section>

            {/* ────────────────────────────────────
                Section 4 : Phase 3 — Scripts
                ──────────────────────────────────── */}
            <section id="phase-3" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Phase 3 : Les scripts qui convertissent vos clients en ambassadeurs
              </h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">Jour 6 à 10 — Formez votre équipe</p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Même avec la meilleure plaque du marché, une plaque que personne ne mentionne reste un objet décoratif. La <strong>demande orale</strong> est le déclencheur ; la plaque n&apos;est que le facilitateur. Voici 4 formulations, à choisir selon le moment et selon la personne qui parle.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                La psychologie derrière la demande est importante. Un client qui vient de vivre une bonne expérience est dans un état émotionnel positif. C&apos;est le moment idéal pour lui demander un avis, car il a envie de prolonger cette émotion. Si vous attendez qu&apos;il rentre chez lui, l&apos;émotion retombe et la probabilité qu&apos;il laisse un avis chute drastiquement. Le bon script, au bon moment, change tout.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                L&apos;objectif n&apos;est pas de forcer la main, mais de rendre la démarche naturelle. Votre client vient de vous complimenter sur votre travail ? C&apos;est le signal. Il suffit alors de transformer ce compliment en action concrète. Les quatre formulations ci-dessous reposent toutes sur le même principe : nommer le bénéfice pour vous, annoncer d&apos;emblée que cela prend dix secondes, et montrer la plaque du doigt plutôt que de laisser le client la chercher.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
                Script #1 : Le Classique — juste après un compliment
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;Je suis ravi que votre [service/plat] vous ait plu ! Si vous avez 30 secondes, un petit avis Google nous aiderait énormément. Vous pouvez simplement approcher votre téléphone ici, c&apos;est instantané !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Idéal juste après une expérience positive confirmée par le client.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Script #2 : L&apos;Altruiste — quand on mise sur l&apos;entraide
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;Merci pour votre visite ! Votre retour aide d&apos;autres clients à nous découvrir ET nous aide à nous améliorer. Un petit tap ici suffit !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Fait appel à l&apos;entraide. Très efficace avec les clients réguliers et fidèles.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Script #3 : Le Challenger — quand l&apos;équipe est nombreuse
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;On a un petit challenge en équipe ce mois-ci : atteindre 50 avis Google. Vous nous aidez ? Ça prend 10 secondes avec votre téléphone ici !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Crée de l&apos;engagement et de la complicité. Fonctionne très bien en restauration.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Script #4 : Le Personnalisé — quand vous connaissez le client
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;[Prénom], ça me fait plaisir que vous ayez aimé [détail spécifique]. Si vous pouviez le mentionner dans un petit avis Google, ça nous aiderait beaucoup. Tenez, un petit tap ici et c&apos;est fait !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Le plus exigeant, parce qu&apos;il demande de se souvenir d&apos;un détail. En contrepartie, le client reprend souvent ce détail dans son avis, ce qui donne un texte plus riche qu&apos;un « très bien, merci ».</p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Comment former votre équipe en 30 minutes</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                La formation de votre équipe ne nécessite pas une journée entière. Réunissez votre équipe 30 minutes et suivez ces étapes : présentez l&apos;objectif (doubler les avis en 30 jours), expliquez pourquoi c&apos;est important pour le commerce et pour eux, faites lire les 4 scripts à voix haute, faites des jeux de rôle (un employé joue le client, l&apos;autre teste le script), et définissez un objectif quotidien par personne (ex : 2 demandes/jour).
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Le point clé : chaque membre de l&apos;équipe doit choisir le script avec lequel il se sent le plus à l&apos;aise. Certains préféreront le Classique, d&apos;autres le Challenger. L&apos;important est que la demande soit naturelle et sincère. Un script récité de façon mécanique aura l&apos;effet inverse : le client sentira la manipulation et refusera. Encouragez vos équipes à adapter le script à leur personnalité et à leur façon de parler.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Quand demander un avis ? Le timing parfait</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Restaurant</strong> : après le dessert ou au moment de l&apos;addition, quand le client exprime sa satisfaction.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Salon de coiffure</strong> : quand le client se regarde dans le miroir et sourit.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Cabinet médical</strong> : à la prise du prochain rendez-vous, quand le patient remercie.</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Boutique / garage</strong> : au moment de la remise du produit ou du véhicule, quand le client est le plus content.</span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-4">
                Pour découvrir 10 méthodes supplémentaires de collecte d&apos;avis, consultez notre guide <Link href="/blog/obtenir-plus-avis-google" className="text-primary font-medium hover:underline">Comment obtenir plus d&apos;avis Google en 2025</Link>.
              </p>

              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-900">Erreurs à éviter absolument</strong><br/>
                  Ne jamais offrir de récompense en échange d&apos;un avis (interdit par Google), ne jamais harceler un client qui refuse, et ne jamais rédiger un avis à la place du client. Découvrez toutes les pratiques interdites dans notre article <Link href="/blog/erreurs-demander-avis" className="text-primary font-medium hover:underline">Les erreurs fatales à éviter avec vos avis Google</Link>.
                </p>
              </div>
            </section>

            {/* ────────────────────────────────────
                Section 5 : Phase 4 — Répondre
                ──────────────────────────────────── */}
            <section id="phase-4" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Phase 4 : Répondez à chaque avis et amplifiez votre visibilité
              </h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">Jour 11 à 30 — La routine qui transforme tout</p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Collecter des avis ne suffit pas : <strong>répondre à chaque avis</strong> compte tout autant. Dans l&apos;enquête BrightLocal 2026 déjà citée, <strong>89&nbsp;% des répondants attendent qu&apos;une entreprise réponde à ses avis</strong>. Vos réponses sont par ailleurs du texte public et indexable, dans lequel vous pouvez nommer naturellement votre ville et votre prestation.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Beaucoup de commerçants font l&apos;erreur de se concentrer uniquement sur la collecte et d&apos;ignorer les réponses. C&apos;est une occasion manquée considérable. Chaque réponse que vous rédigez est une vitrine publique de votre service client. Quand un prospect hésite entre vous et un concurrent, il lit vos réponses. Un commerce qui répond à chaque avis avec attention et personnalisation inspire immédiatement confiance.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Les réponses aux avis ont aussi un impact direct sur votre référencement. Google analyse le contenu de vos réponses pour mieux comprendre votre activité. Si vous mentionnez régulièrement votre ville, vos services et votre spécialité dans vos réponses, Google associe plus fortement votre fiche à ces termes de recherche. C&apos;est du <strong>SEO local gratuit</strong> que très peu de commerces exploitent.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Votre routine quotidienne (10 minutes/jour)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Heure</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Action</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-200 text-gray-700 font-medium">9h00</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Vérifier les nouveaux avis reçus</td>
                      <td className="p-3 border border-gray-200 text-gray-700">2 min</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border border-gray-200 text-gray-700 font-medium">9h05</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Répondre à chaque avis (positif et négatif)</td>
                      <td className="p-3 border border-gray-200 text-gray-700">5 min</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200 text-gray-700 font-medium">18h00</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Rappeler l&apos;objectif avis à l&apos;équipe</td>
                      <td className="p-3 border border-gray-200 text-gray-700">1 min</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border border-gray-200 text-gray-700 font-medium">Dimanche</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Bilan hebdomadaire : nombre d&apos;avis, note moyenne, taux de réponse</td>
                      <td className="p-3 border border-gray-200 text-gray-700">5 min</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Templates de réponses prêts à copier</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Répondre à un avis ne devrait pas prendre plus de 2 minutes. Pour vous aider, voici 3 templates adaptés à chaque situation. L&apos;astuce : personnalisez toujours votre réponse en mentionnant un détail spécifique de l&apos;avis du client. Une réponse générique du type &ldquo;Merci pour votre avis&rdquo; n&apos;a aucun impact. Une réponse qui reprend un élément concret montre que vous avez lu et que vous vous souciez réellement de l&apos;expérience de chaque client.
              </p>

              <p className="text-gray-700 font-medium mb-2">Pour un avis 5 étoiles :</p>
              <blockquote className="border-l-4 border-green-500 bg-green-50 rounded-r-xl pl-4 pr-4 py-3 mb-4 text-gray-700 italic">
                &ldquo;Merci infiniment [Prénom] pour ces mots qui nous touchent ! Toute l&apos;équipe de [nom du commerce] est ravie que [élément spécifique mentionné dans l&apos;avis] vous ait plu. On a hâte de vous revoir à [ville] ! — [Votre prénom], gérant&rdquo;
              </blockquote>

              <p className="text-gray-700 font-medium mb-2">Pour un avis 4 étoiles :</p>
              <blockquote className="border-l-4 border-amber-500 bg-amber-50 rounded-r-xl pl-4 pr-4 py-3 mb-4 text-gray-700 italic">
                &ldquo;Merci [Prénom] pour votre retour positif ! On note votre suggestion sur [point mentionné] et on travaille dessus. Au plaisir de vous revoir très vite ! — [Votre prénom]&rdquo;
              </blockquote>

              <p className="text-gray-700 font-medium mb-2">Pour un avis négatif :</p>
              <blockquote className="border-l-4 border-red-500 bg-red-50 rounded-r-xl pl-4 pr-4 py-3 mb-4 text-gray-700 italic">
                &ldquo;Merci [Prénom] pour ce retour honnête. Nous sommes sincèrement désolés que votre expérience n&apos;ait pas été à la hauteur de nos standards. Contactez-nous à [email/tel] pour que nous puissions rectifier cela personnellement. — [Votre prénom], gérant de [nom] à [ville]&rdquo;
              </blockquote>

              <div className="bg-blue-50 border-l-4 border-primary p-4 my-6 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-primary">Astuce SEO</strong><br/>
                  Incluez naturellement votre <strong>nom de commerce</strong>, votre <strong>ville</strong> et votre <strong>service principal</strong> dans chaque réponse. Google indexe ces réponses et elles contribuent à votre référencement local. Pour aller plus loin, consultez notre guide <Link href="/blog/seo-local-recherches-google" className="text-primary font-medium hover:underline">SEO Local : comment grimper en tête des recherches</Link>.
                </p>
              </div>
            </section>

            {/* ────────────────────────────────────
                Section 6 : Cas pratique
                ──────────────────────────────────── */}
            <section id="cas-pratique" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                6. Exemple de calcul : ce que donnerait un salon de 200 clients par mois
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Ce qui suit n&apos;est pas un cas client. C&apos;est un <strong>exemple de calcul</strong>, construit sur des hypothèses que nous posons ouvertement et que vous pouvez contester ligne par ligne. Aucun de ces chiffres n&apos;est un relevé : ce sont des projections. L&apos;intérêt est ailleurs — la méthode de calcul, elle, est refaisable avec vos propres chiffres en cinq minutes, et c&apos;est le seul résultat qui vous concerne.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Prenons un salon de coiffure fictif, dans une situation courante : un travail apprécié de ses habitués, mais une fiche Google presque vide. Avec 8 avis, il n&apos;a aucune chance d&apos;apparaître dans le pack local face à des concurrents qui en affichent une centaine, et les nouveaux clients arrivent uniquement par le bouche-à-oreille physique. Poser les hypothèses de départ, c&apos;est déjà voir où se trouve le levier — et à quelle vitesse il peut jouer.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Les hypothèses de départ</h3>
                <ul className="space-y-1 text-gray-700">
                  <li><strong>Type de commerce</strong> : salon de coiffure, 3 coiffeurs et une personne à l&apos;accueil</li>
                  <li><strong>Fréquentation supposée</strong> : 200 clients par mois, soit environ 50 par semaine</li>
                  <li><strong>Point de départ supposé</strong> : 8 avis Google</li>
                  <li><strong>Hypothèse de collecte</strong> : 1 client sur 10 accepte de laisser un avis quand on le lui demande et qu&apos;il n&apos;a qu&apos;un geste à faire — soit 5 avis par semaine. Si vous trouvez ce taux optimiste, divisez-le par deux et refaites la suite</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Déroulement semaine par semaine</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 flex-shrink-0 text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">S1</span>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>Semaine 1</strong> : Optimisation complète de la fiche Google Business Profile. Ajout de 20 photos, mise à jour des horaires et services. Commande du <Link href="/#product" className="text-primary font-medium hover:underline">pack 2 plaques NFC Swiipx</Link>.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-20 flex-shrink-0 text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">S2</span>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>Semaine 2</strong> : réception et installation des plaques (miroir de coiffage + comptoir), puis 30 minutes avec l&apos;équipe pour caler la formulation. La plaque n&apos;est opérationnelle qu&apos;en milieu de semaine. <strong>Projection</strong> : environ 4 avis.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-20 flex-shrink-0 text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">S3</span>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>Semaine 3</strong> : la phrase devient un réflexe de fin de prestation et la réponse aux avis passe dans la routine du matin. <strong>Projection</strong> : environ 5 avis, soit 1 client sur 10 sur les 50 de la semaine.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-20 flex-shrink-0 text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">S4</span>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>Semaine 4</strong> : rythme de croisière, même hypothèse. <strong>Projection</strong> : environ 5 avis. En revanche, rien ne permet de projeter une place dans le pack local au bout de 30 jours : cela dépend du nombre d&apos;avis des trois concurrents déjà classés, qu&apos;il faut aller relever soi-même.</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-6 mb-4">
                Refaites ce calcul avec vos chiffres, c&apos;est le seul qui vous concerne. Remplacez les 50 clients par semaine par votre fréquentation réelle, et le « 1 sur 10 » par le taux qui vous paraît crédible pour votre clientèle. Vous obtenez un rythme mensuel, donc une date approximative à laquelle vous atteindrez le nombre d&apos;avis de vos concurrents. C&apos;est une projection, pas une promesse — mais elle vous appartient, et vous pourrez la corriger chaque mois avec le nombre réellement observé sur votre fiche.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Un point mérite attention au passage, même s&apos;il ne se chiffre pas : la formulation de la demande influence ce qui est écrit. Quand on cite un détail précis de la prestation, le client le reprend souvent dans son avis. Un avis qui mentionne « balayage » ou « coupe homme » et le prénom du coiffeur donne à Google du texte exploitable sur votre fiche, là où un « Très bien, merci » n&apos;en donne aucun. Cela ne se pilote pas, mais cela s&apos;encourage — et c&apos;est gratuit.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Ce que donne la projection au bout de 30 jours</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <Award className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900">50 / sem.</p>
                  <p className="text-sm text-gray-600">clients — hypothèse de fréquentation</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <Rocket className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900">1 sur 10</p>
                  <p className="text-sm text-gray-600">hypothèse de collecte</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <TrendingUp className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900">8 → ~22</p>
                  <p className="text-sm text-gray-600">avis projetés (3 semaines de collecte)</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
                <p className="text-gray-900 font-semibold">Ces trois chiffres sont des hypothèses et leur conséquence arithmétique, pas un résultat client.</p>
                <p className="text-gray-600 text-sm mt-2">Nous ne mesurons pas le nombre d&apos;avis collectés par les commerces que nous équipons : la plaque ne contient aucun traqueur et nous n&apos;avons pas accès à leur fiche Google. Le seul chiffre certain de cet exemple est le coût : 65,88&nbsp;€ pour le pack 2 plaques, une fois, sans abonnement.</p>
              </div>
            </section>

            {/* ────────────────────────────────────
                Section 7 : FAQ
                ──────────────────────────────────── */}
            <section id="faq" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                7. Questions fréquentes sur les avis Google
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Voici les questions les plus posées par les commerçants qui souhaitent augmenter leurs avis Google. Si votre question n&apos;apparaît pas ici, n&apos;hésitez pas à <Link href="/contact" className="text-primary font-medium hover:underline">nous contacter directement</Link> — notre équipe répond sous 24 heures.
              </p>

              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Est-ce que cette méthode fonctionne pour tous les secteurs ?</h3>
                  <p className="text-gray-700 leading-relaxed">Oui. Restaurants, salons de coiffure, cabinets médicaux, boutiques, garages, hôtels, instituts de beauté… La méthode fonctionne pour tout commerce qui reçoit ses clients sur place, parce que le mécanisme est le même partout : réduire la friction au moment où le client est satisfait. Le seul prérequis est qu&apos;il existe un instant identifiable — l&apos;encaissement, la remise des clés, la prise du prochain rendez-vous — où l&apos;on peut montrer la plaque sans interrompre le service.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Combien de temps par jour faut-il y consacrer ?</h3>
                  <p className="text-gray-700 leading-relaxed">10 à 15 minutes maximum pour répondre aux avis et vérifier les statistiques. La collecte elle-même est automatisée grâce à la plaque NFC et aux scripts de demande. L&apos;effort principal se situe dans la première semaine (optimisation de la fiche et formation de l&apos;équipe).</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Que faire si je reçois un avis négatif ?</h3>
                  <p className="text-gray-700 leading-relaxed">Répondez sous 24 à 48 heures, de façon factuelle et sans polémique. Votre réponse est publique et permanente : c&apos;est le seul endroit de votre fiche où vous pouvez montrer comment vous traitez un problème, ce qu&apos;aucun avis positif ne démontre. Dans l&apos;enquête BrightLocal 2026 (1 002 consommateurs américains), 89&nbsp;% des répondants déclarent attendre qu&apos;une entreprise réponde à ses avis.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Ça marche sans plaque NFC ?</h3>
                  <p className="text-gray-700 leading-relaxed">Oui, mais chaque étape ajoutée entre l&apos;envie et l&apos;avis publié fait perdre des clients. Le QR code demande de déverrouiller le téléphone, d&apos;ouvrir l&apos;appareil photo, de viser puis de confirmer l&apos;ouverture d&apos;un lien ; l&apos;e-mail de relance arrive quand le client est déjà passé à autre chose. Si votre budget est limité, commencez par un QR code imprimé : c&apos;est mieux que rien, et vous verrez par vous-même où ça bloque.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Combien coûte une plaque NFC Swiipx ?</h3>
                  <p className="text-gray-700 leading-relaxed">À partir de 35,88&nbsp;€ pour une plaque. Le <Link href="/#product" className="text-primary font-medium hover:underline">pack 2 plaques</Link> (le plus populaire) est à 65,88&nbsp;€ et le pack 5 plaques à 107,88&nbsp;€. Aucun abonnement mensuel, aucun frais caché. La plaque fonctionne immédiatement et dure plusieurs années.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Combien de temps pour voir les premiers résultats ?</h3>
                  <p className="text-gray-700 leading-relaxed">La plaque fonctionne dès sa réception, puisqu&apos;elle arrive déjà programmée avec le lien de votre fiche. Le rythme, en revanche, dépend de votre fréquentation et de la régularité de la demande, et nous ne le mesurons pas : faites le calcul de la section précédente avec vos deux chiffres à vous (clients par semaine, proportion que vous jugez crédible). Vous obtiendrez une projection honnête, que la réalité corrigera dans un sens ou dans l&apos;autre au bout d&apos;un mois.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Google pénalise-t-il la collecte d&apos;avis par NFC ?</h3>
                  <p className="text-gray-700 leading-relaxed">Non. La plaque NFC redirige simplement le client vers la page d&apos;avis Google officielle. Il n&apos;y a aucune manipulation : le client rédige son propre avis librement avec ses propres mots. Cette méthode est 100&nbsp;% conforme aux conditions d&apos;utilisation de Google.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Est-ce que le NFC fonctionne avec tous les smartphones ?</h3>
                  <p className="text-gray-700 leading-relaxed">Oui. Tous les iPhone depuis le modèle 7 (2016) lisent les puces NFC sans réglage ni application, et la quasi-totalité des smartphones Android vendus depuis le milieu des années 2010 également. Pour les rares téléphones qui ne le font pas, un QR code de secours est imprimé au dos de chaque plaque Swiipx.</p>
                </div>
              </div>
            </section>

          </article>

          {/* ── COLONNE DROITE : ADS carousel au scroll ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <ArticleAds related={getRelatedArticles(SLUG)} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
