'use client'

import { motion } from 'framer-motion'
import {
  Calendar, Clock, ArrowRight, CheckCircle2, TrendingUp, Users,
  Target, Zap, MessageSquare, BarChart3, AlertTriangle,
  ThumbsUp, Award, Rocket, ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────
   Table of Contents - sections de l'article
   ───────────────────────────────────────────── */
const tocSections = [
  { id: 'probleme', label: 'Le problème' },
  { id: 'phase-1', label: 'Phase 1 : GMB' },
  { id: 'phase-2', label: 'Phase 2 : Outil NFC' },
  { id: 'phase-3', label: 'Phase 3 : Scripts' },
  { id: 'phase-4', label: 'Phase 4 : Répondre' },
  { id: 'cas-pratique', label: 'Cas pratique' },
  { id: 'faq', label: 'FAQ' },
]

export const dynamic = 'force-static'

export default function DoublerAvisGoogle30Jours() {
  const [activeSection, setActiveSection] = useState('probleme')
  const articleRef = useRef<HTMLElement>(null)
  const [currentAd, setCurrentAd] = useState(-1)

  /* Observer pour highlight la section active dans le TOC */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          )
          setActiveSection(mostVisible.target.id)
        }
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  /* Scroll listener : une seule pub visible à la fois, les autres disparaissent */
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return
      const rect = articleRef.current.getBoundingClientRect()
      const articleHeight = rect.height
      const scrolledInArticle = -rect.top + window.innerHeight * 0.3
      const progress = Math.max(0, Math.min(1, scrolledInArticle / articleHeight))

      if (progress < 0.08) setCurrentAd(-1)
      else if (progress < 0.38) setCurrentAd(0)
      else if (progress < 0.62) setCurrentAd(1)
      else setCurrentAd(2)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════
          BANNIÈRE PUB SWIIPX (haut de page)
          ═══════════════════════════════════════════ */}
      <section className="bg-accent pt-32 pb-10 relative overflow-hidden">
        <div className="absolute left-6 top-32 hidden lg:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-2.jpg" alt="Plaque NFC Swiipx pour collecter des avis Google" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute right-6 top-32 hidden lg:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-1.jpg" alt="Plaque NFC Swiipx vue de face" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <p className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">
            Boostez vos avis Google<br />avec Swiipx dès aujourd&apos;hui
          </p>
          <p className="text-gray-800 mb-6 max-w-xl mx-auto">
            Commandez votre plaque NFC et commencez à collecter des avis en 10 secondes. Utilisé par 500+ entreprises en France.
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
            Méthode complète en 4 phases pour passer de 10 à 100+ avis Google. Cas pratique (+740&nbsp;%), scripts prêts à copier, templates de réponses et outils NFC indispensables.
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
            <div className="sticky top-28">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                SOMMAIRE
              </h3>
              <nav aria-label="Table des matières" className="space-y-0.5 max-h-[calc(100vh-340px)] overflow-y-auto pr-2 mb-8">
                {tocSections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block py-2 px-0 text-sm transition-colors ${
                      activeSection === section.id
                        ? 'text-primary font-medium'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-2 text-gray-400">{idx + 1}.</span>
                    {section.label}
                  </a>
                ))}
              </nav>

              {/* Bloc CTA Produit */}
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/product-main.jpg"
                      alt="Plaque NFC Swiipx pour avis Google"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Plaque NFC Swiipx
                  </p>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Doublez vos avis Google avec la plaque NFC n°1 en France. Installation en 30 secondes.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-primary">39,90 €</span>
                    <span className="text-xs text-gray-400 line-through">59,90 €</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">-33%</span>
                  </div>
                  <Link
                    href="/#product"
                    className="block w-full py-3 bg-primary text-white text-center font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-md hover:shadow-lg"
                  >
                    Voir la plaque avis Google →
                  </Link>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                    <span className="text-xs text-gray-500">4.9/5 — 200+ avis</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ── COLONNE CENTRE : CONTENU ── */}
          <article ref={articleRef} className="max-w-none">

            {/* ────────────────────────────────────
                Section 1 : Le problème
                ──────────────────────────────────── */}
            <section id="probleme" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                1. Le vrai problème : pourquoi vous stagnez à 2-3 avis par mois
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Les <strong>avis Google</strong> sont devenus le premier critère de choix des consommateurs. Selon BrightLocal 2025, <strong>87&nbsp;% des Français consultent les avis en ligne</strong> avant de visiter un commerce local. Pourtant, la grande majorité des entreprises ne récoltent qu&apos;une poignée d&apos;avis chaque mois. Ce décalage entre l&apos;importance des avis et le nombre réellement collecté est le problème numéro 1 des commerces de proximité en France.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Le constat est universel, quel que soit votre secteur : restaurants, salons de coiffure, cabinets médicaux, boutiques ou garages. Vos clients sont satisfaits — ils reviennent, ils vous recommandent à leurs proches — mais ils ne laissent jamais d&apos;avis en ligne. Et sans ces avis, Google ne sait pas que vous existez, ou pire, il met en avant vos concurrents qui en ont plus que vous.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Pourquoi si peu d&apos;avis spontanés ?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                La raison est simple : la <strong>friction</strong>. Pour laisser un avis Google, un client satisfait doit ouvrir son navigateur, chercher votre établissement, trouver votre fiche Google, cliquer sur &ldquo;Donner un avis&rdquo;, se connecter à son compte Google, rédiger un texte et enfin publier. Ce parcours prend en moyenne <strong>5 à 7 minutes</strong>. Résultat : seulement 2&nbsp;% de vos clients satisfaits franchissent toutes ces étapes.
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
                  <span><strong>Perte de clients</strong> : 70&nbsp;% des consommateurs choisissent le commerce le mieux noté ET le plus commenté dans les résultats de recherche.</span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-4">
                Concrètement, si vous servez 100 clients satisfaits par mois et que vous ne récoltez que 2-3 avis, votre concurrent qui en obtient 25 capte la majorité de vos futurs prospects. Pour comprendre en profondeur ce mécanisme, consultez notre guide complet sur <Link href="/blog/avis-clients-influencent-business" className="text-primary font-medium hover:underline">pourquoi les avis clients influencent votre business</Link>.
              </p>

              <div className="bg-blue-50 border-l-4 border-primary p-4 my-6 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-primary">La bonne nouvelle</strong><br/>
                  Avec la bonne stratégie et les bons outils, vous pouvez <strong>doubler vos avis Google en 30 jours</strong>. C&apos;est exactement ce que nous allons détailler dans les 4 phases suivantes.
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
                Avant de collecter plus d&apos;avis, il faut s&apos;assurer que votre <strong>fiche Google Business Profile</strong> (anciennement Google My Business) est optimisée à 100&nbsp;%. Une fiche incomplète fait fuir les clients et réduit votre visibilité dans les recherches locales. Selon Moz Local 2025, les fiches entièrement complétées reçoivent <strong>2,7x plus d&apos;avis</strong> que les fiches partielles.
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
                  <span><strong>15+ photos professionnelles</strong> : façade, intérieur, produits/services, équipe. Les fiches avec photos obtiennent 42&nbsp;% de demandes d&apos;itinéraire en plus.</span>
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
                Le secret des commerces qui explosent leurs avis Google : <strong>rendre le processus instantané</strong>. Quand un client doit chercher votre fiche et naviguer dans Google, vous perdez 95&nbsp;% du potentiel. Avec une <strong>plaque NFC</strong>, le client approche simplement son smartphone et arrive directement sur votre page d&apos;avis Google. Le parcours passe de 7 étapes à 1 seul geste.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Le principe est celui de la &ldquo;loi du moindre effort&rdquo; : plus une action est facile à réaliser, plus les gens la font. C&apos;est exactement pour cette raison que les plateformes comme Amazon ou Uber ont simplifié le paiement en un clic. Le même principe s&apos;applique à la collecte d&apos;avis : si le client n&apos;a qu&apos;un geste à faire, il le fait. S&apos;il doit chercher, taper, se connecter et rédiger, il abandonne.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                C&apos;est la raison pour laquelle la technologie NFC (Near Field Communication) a changé la donne pour les commerces de proximité. Utilisée depuis des années dans le paiement sans contact, elle permet une communication instantanée entre deux appareils à courte portée. Appliquée à la collecte d&apos;avis, elle transforme un processus de 7 minutes en un geste de 10 secondes.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Comparatif des méthodes de collecte d&apos;avis</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Méthode</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Temps client</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Taux de conversion</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border border-gray-200">Coût</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-200 text-gray-700">Email de relance</td>
                      <td className="p-3 border border-gray-200 text-gray-700">5-7 min</td>
                      <td className="p-3 border border-gray-200 text-gray-700">3-5&nbsp;%</td>
                      <td className="p-3 border border-gray-200 text-gray-700">Gratuit (mais chronophage)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border border-gray-200 text-gray-700">QR code imprimé</td>
                      <td className="p-3 border border-gray-200 text-gray-700">30-60 s</td>
                      <td className="p-3 border border-gray-200 text-gray-700">8-12&nbsp;%</td>
                      <td className="p-3 border border-gray-200 text-gray-700">~5 €</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">Plaque NFC Swiipx</td>
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">10 s</td>
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">35-45&nbsp;%</td>
                      <td className="p-3 border border-gray-200 font-semibold text-green-800">À partir de 39,90 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Pourquoi le NFC convertit 4x mieux que le QR code</h3>
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
                  <span><strong>Compatibilité universelle</strong> : tous les iPhone depuis le 7 (2016) et 95&nbsp;% des Android supportent le NFC nativement.</span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-4">
                En résumé, le NFC supprime l&apos;obstacle principal qui empêche vos clients de laisser un avis : l&apos;effort. Pas d&apos;application à télécharger, pas de QR code à scanner avec l&apos;appareil photo, pas de recherche Google à effectuer. Le client pose son téléphone sur la plaque, la page d&apos;avis s&apos;ouvre automatiquement, et il n&apos;a plus qu&apos;à écrire et publier. Le taux de conversion moyen de 35 à 45&nbsp;% parle de lui-même : c&apos;est 4 à 5 fois plus que n&apos;importe quelle autre méthode.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Pour tout savoir sur le fonctionnement technique, les placements optimaux par métier et les retours d&apos;expérience de nos clients, consultez notre article dédié : <Link href="/blog/nfc-avis-clients" className="text-primary font-medium hover:underline">NFC : la nouvelle arme pour vos avis clients</Link>.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 my-6 rounded-r-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-900">Meilleurs emplacements par métier</strong><br/>
                  <strong>Restaurant</strong> : sur la table ou à la caisse, après le dessert. <strong>Salon de coiffure</strong> : devant le miroir au poste de coiffage. <strong>Cabinet médical</strong> : à l&apos;accueil, lors de la prise du prochain rendez-vous. <strong>Boutique</strong> : au comptoir, lors de la remise du sac.
                </p>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 text-center my-8">
                <p className="text-white font-bold text-lg mb-3">Prêt à passer au NFC ?</p>
                <p className="text-gray-400 text-sm mb-4">Le pack 2 plaques est le plus populaire : 59,90&nbsp;€, aucun abonnement.</p>
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
                Même avec la meilleure plaque NFC du marché, si personne dans votre équipe ne demande d&apos;avis, vous perdez 80&nbsp;% du potentiel. La <strong>demande orale</strong> est le déclencheur : la plaque NFC n&apos;est que le facilitateur. Voici 4 scripts testés sur le terrain avec leurs taux de conversion mesurés.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                La psychologie derrière la demande est importante. Un client qui vient de vivre une bonne expérience est dans un état émotionnel positif. C&apos;est le moment idéal pour lui demander un avis, car il a envie de prolonger cette émotion. Si vous attendez qu&apos;il rentre chez lui, l&apos;émotion retombe et la probabilité qu&apos;il laisse un avis chute drastiquement. Le bon script, au bon moment, change tout.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                L&apos;objectif n&apos;est pas de forcer la main, mais de rendre la démarche naturelle. Votre client vient de vous complimenter sur votre travail ? C&apos;est le signal. Il suffit alors de transformer ce compliment en action concrète. Les scripts ci-dessous ont été testés dans plus de 200 commerces en France et affinés pour maximiser le taux de conversion sans jamais mettre le client mal à l&apos;aise.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
                Script #1 : Le Classique — 40&nbsp;% de conversion
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;Je suis ravi que votre [service/plat] vous ait plu ! Si vous avez 30 secondes, un petit avis Google nous aiderait énormément. Vous pouvez simplement approcher votre téléphone ici, c&apos;est instantané !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Idéal juste après une expérience positive confirmée par le client.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Script #2 : L&apos;Altruiste — 45&nbsp;% de conversion
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;Merci pour votre visite ! Votre retour aide d&apos;autres clients à nous découvrir ET nous aide à nous améliorer. Un petit tap ici suffit !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Fait appel à l&apos;entraide. Très efficace avec les clients réguliers et fidèles.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Script #3 : Le Challenger — 38&nbsp;% de conversion
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;On a un petit challenge en équipe ce mois-ci : atteindre 50 avis Google. Vous nous aidez ? Ça prend 10 secondes avec votre téléphone ici !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Crée de l&apos;engagement et de la complicité. Fonctionne très bien en restauration.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Script #4 : Le Personnalisé — 50&nbsp;% de conversion
              </h3>
              <blockquote className="border-l-4 border-primary bg-gray-50 rounded-r-xl pl-4 pr-4 py-3 mb-2 text-gray-700 italic">
                &ldquo;[Prénom], ça me fait plaisir que vous ayez aimé [détail spécifique]. Si vous pouviez le mentionner dans un petit avis Google, ça nous aiderait beaucoup. Tenez, un petit tap ici et c&apos;est fait !&rdquo;
              </blockquote>
              <p className="text-sm text-gray-600 mb-6">Le plus performant : la personnalisation crée un lien émotionnel. Le client se sent valorisé et rédige un avis plus détaillé.</p>

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
                Collecter des avis ne suffit pas : <strong>répondre à chaque avis</strong> est tout aussi important. Google confirme que les entreprises qui répondent à leurs avis sont perçues comme 1,7x plus fiables. De plus, les réponses contenant des mots-clés locaux améliorent votre <strong>SEO local</strong> et votre positionnement dans le pack local.
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
                6. Cas pratique : de 8 à 67 avis Google en 30 jours
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                La théorie, c&apos;est bien. Mais rien ne vaut un exemple concret pour comprendre comment la méthode fonctionne dans la réalité. Voici l&apos;histoire d&apos;un salon de coiffure bordelais qui a appliqué les 4 phases à la lettre, et les résultats obtenus semaine après semaine.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Ce salon était dans une situation classique : un service de qualité reconnu par ses clients fidèles, mais une quasi-invisibilité sur Google. Avec seulement 8 avis, il n&apos;apparaissait jamais dans le pack local lorsque les prospects cherchaient &ldquo;coiffeur Bordeaux&rdquo; ou &ldquo;salon de coiffure Bordeaux centre&rdquo;. Les nouveaux clients venaient exclusivement par le bouche-à-oreille physique, ce qui limitait fortement la croissance.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Le contexte</h3>
                <ul className="space-y-1 text-gray-700">
                  <li><strong>Commerce</strong> : Salon de coiffure à Bordeaux</li>
                  <li><strong>Équipe</strong> : 3 coiffeurs + 1 réceptionniste</li>
                  <li><strong>Fréquentation</strong> : ~200 clients/mois</li>
                  <li><strong>Situation initiale</strong> : 8 avis Google, note 4.2/5</li>
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
                    <p className="text-gray-700"><strong>Semaine 2</strong> : Réception et installation des plaques NFC (miroir + comptoir). Formation de l&apos;équipe aux scripts. <strong>Résultat</strong> : +12 avis en 7 jours.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-20 flex-shrink-0 text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">S3</span>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>Semaine 3</strong> : L&apos;équipe est rodée, les scripts deviennent naturels. Réponse systématique à chaque avis. <strong>Résultat</strong> : +19 avis en 7 jours.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-20 flex-shrink-0 text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">S4</span>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>Semaine 4</strong> : Le bouche-à-oreille digital s&apos;enclenche. Le salon apparaît dans le top 3 du pack local. <strong>Résultat</strong> : +28 avis en 7 jours.</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-6 mb-4">
                L&apos;accélération entre la semaine 2 et la semaine 4 est typique. Les premières semaines servent à mettre en place le système et à roder l&apos;équipe. Ensuite, un cercle vertueux s&apos;enclenche : plus vous avez d&apos;avis, plus Google vous met en avant, plus de nouveaux clients vous trouvent, et plus vous pouvez collecter d&apos;avis. C&apos;est l&apos;effet boule de neige du <strong>SEO local</strong>.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Ce qui a surpris la gérante, c&apos;est la qualité des avis obtenus. Grâce au script personnalisé (script #4), les clients ne se contentaient pas de mettre 5 étoiles : ils rédigeaient des avis détaillés mentionnant le nom du coiffeur, le type de prestation et leur satisfaction. Ces avis riches en mots-clés ont considérablement amélioré le référencement du salon sur des requêtes comme &ldquo;balayage Bordeaux&rdquo; ou &ldquo;coupe homme Bordeaux centre&rdquo;.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Résultats après 30 jours</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900">8 → 67</p>
                  <p className="text-sm text-gray-600">avis Google (+740&nbsp;%)</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900">4.2 → 4.8</p>
                  <p className="text-sm text-gray-600">note moyenne</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                  <Rocket className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900">+58&nbsp;%</p>
                  <p className="text-sm text-gray-600">réservations/mois</p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-5 text-center">
                <p className="text-white font-bold text-lg">Impact financier : <span className="text-accent">+12 400&nbsp;€/mois</span></p>
                <p className="text-gray-400 text-sm mt-1">pour un investissement de 59,90&nbsp;€ (pack 2 plaques NFC, aucun abonnement)</p>
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
                  <p className="text-gray-700 leading-relaxed">Oui. Restaurants, salons de coiffure, cabinets médicaux, boutiques, garages, hôtels, instituts de beauté… La méthode fonctionne pour tout commerce ayant des clients physiques. Le NFC convertit en moyenne à 35-45&nbsp;% quel que soit le secteur, car le mécanisme psychologique est le même : réduire la friction au maximum.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Combien de temps par jour faut-il y consacrer ?</h3>
                  <p className="text-gray-700 leading-relaxed">10 à 15 minutes maximum pour répondre aux avis et vérifier les statistiques. La collecte elle-même est automatisée grâce à la plaque NFC et aux scripts de demande. L&apos;effort principal se situe dans la première semaine (optimisation de la fiche et formation de l&apos;équipe).</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Que faire si je reçois un avis négatif ?</h3>
                  <p className="text-gray-700 leading-relaxed">Un avis négatif bien géré devient une opportunité de montrer votre professionnalisme. Répondez sous 24 heures de façon empathique et constructive. 89&nbsp;% des prospects lisent vos réponses aux avis négatifs avant de faire leur choix. Une réponse soignée rassure davantage qu&apos;une fiche avec uniquement des 5 étoiles.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Ça marche sans plaque NFC ?</h3>
                  <p className="text-gray-700 leading-relaxed">Oui, mais avec un taux de conversion 4 à 5 fois inférieur. Le QR code convertit à environ 10&nbsp;%, l&apos;email à 3-5&nbsp;%. La plaque NFC atteint 35-45&nbsp;% car elle supprime toute friction. Si votre budget est limité, commencez par le QR code et passez au NFC dès que possible.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Combien coûte une plaque NFC Swiipx ?</h3>
                  <p className="text-gray-700 leading-relaxed">À partir de 39,90&nbsp;€ pour une plaque. Le <Link href="/#product" className="text-primary font-medium hover:underline">pack 2 plaques</Link> (le plus populaire) est à 59,90&nbsp;€ et le pack 5 plaques à 89,90&nbsp;€. Aucun abonnement mensuel, aucun frais caché. La plaque fonctionne immédiatement et dure plusieurs années.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Combien de temps pour voir les premiers résultats ?</h3>
                  <p className="text-gray-700 leading-relaxed">Les premiers avis supplémentaires arrivent dès la première semaine d&apos;utilisation. En moyenne, nos clients constatent un doublement de leurs avis en 3 à 4 semaines en appliquant la méthode complète (fiche optimisée + NFC + scripts + réponses).</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Google pénalise-t-il la collecte d&apos;avis par NFC ?</h3>
                  <p className="text-gray-700 leading-relaxed">Non. La plaque NFC redirige simplement le client vers la page d&apos;avis Google officielle. Il n&apos;y a aucune manipulation : le client rédige son propre avis librement avec ses propres mots. Cette méthode est 100&nbsp;% conforme aux conditions d&apos;utilisation de Google.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Est-ce que le NFC fonctionne avec tous les smartphones ?</h3>
                  <p className="text-gray-700 leading-relaxed">Oui. Tous les iPhone depuis le modèle 7 (2016) et la quasi-totalité des smartphones Android supportent le NFC nativement. Cela couvre plus de 95&nbsp;% des appareils en circulation en France. Pour les rares téléphones sans NFC, un QR code de secours est imprimé au dos de chaque plaque Swiipx.</p>
                </div>
              </div>
            </section>

          </article>

          {/* ── COLONNE DROITE : ADS carousel au scroll ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative">

                {/* Ad 0: Swiipx */}
                <div className={`transition-all duration-500 ease-out ${
                  currentAd === 0
                    ? 'relative opacity-100 translate-y-0 scale-100'
                    : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none translate-y-4 scale-95'
                }`}>
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Sponsorisé</div>
                    <h4 className="font-bold text-lg mb-2">
                      La plaque NFC pour chaque commerce.
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      +250&nbsp;% d&apos;avis en moyenne. Installation en 2 minutes.
                    </p>
                    <Link
                      href="/#product"
                      className="block w-full py-3 bg-accent text-gray-900 text-center font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm"
                    >
                      Commander maintenant
                    </Link>
                  </div>
                </div>

                {/* Ad 1: Partenaire */}
                <div className={`transition-all duration-500 ease-out ${
                  currentAd === 1
                    ? 'relative opacity-100 translate-y-0 scale-100'
                    : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none translate-y-4 scale-95'
                }`}>
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Partenaire</div>
                    <div className="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                      <Target className="w-12 h-12 text-indigo-400" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Besoin d&apos;un site web pro ?
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      Nos partenaires créent votre site vitrine ou e-commerce optimisé SEO.
                    </p>
                    <a
                      href="https://skyaksa.fr"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block w-full py-3 bg-indigo-600 text-white text-center font-bold rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                    >
                      Demander un devis gratuit
                    </a>
                  </div>
                </div>

                {/* Ad 2: Guides */}
                <div className={`transition-all duration-500 ease-out ${
                  currentAd === 2
                    ? 'relative opacity-100 translate-y-0 scale-100'
                    : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none translate-y-4 scale-95'
                }`}>
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3">
                      📚 Guides gratuits Swiipx
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/blog/obtenir-plus-avis-google" className="flex items-start space-x-2 text-sm text-gray-700 hover:text-primary transition-colors group">
                          <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span>10 méthodes pour obtenir plus d&apos;avis Google</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/nfc-avis-clients" className="flex items-start space-x-2 text-sm text-gray-700 hover:text-primary transition-colors group">
                          <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span>NFC : la nouvelle arme pour vos avis</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/seo-local-recherches-google" className="flex items-start space-x-2 text-sm text-gray-700 hover:text-primary transition-colors group">
                          <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span>SEO Local : grimper en tête des recherches</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
