import { Calendar, Clock, ArrowRight, PenLine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles } from './articles'
import { getRelatedArticles, secteurDeLArticle } from './related'
import ArticleToc from './ArticleToc'
import ArticleAds from './ArticleAds'

/**
 * Server Component.
 *
 * Le contenu des articles (~370 Ko) reste cote serveur : il est rendu en HTML
 * au build et n'apparait jamais dans le bundle navigateur. Seuls le sommaire
 * (ArticleToc) et la colonne de pub (ArticleAds) sont interactifs, et ne
 * recoivent que quelques centaines d'octets de props.
 */
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]

  if (!article) {
    notFound()
  }

  const filteredRelated = getRelatedArticles(params.slug)
  const secteur = secteurDeLArticle(params.slug)

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════
          BANNIÈRE PUB SWIIPX (haut de page)
          ═══════════════════════════════════════════ */}
      <section className="bg-accent pt-32 pb-10 relative overflow-hidden">
        <div className="absolute left-6 top-32 hidden xl:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-2.jpg" alt="Plaque Swiipx « Laissez-nous votre avis » : logo Google, zone NFC et QR code de secours" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute right-6 top-32 hidden xl:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-1.jpg" alt="Un client approche son iPhone de la plaque Swiipx posée sur le comptoir, à côté du terminal de paiement : la notification NFC s'affiche à l'écran" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <p className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">
            Boostez vos avis Google<br />avec Swiipx dès aujourd&apos;hui
          </p>
          <p className="text-gray-800 mb-6 max-w-xl mx-auto">
            Commandez votre plaque avis Google NFC et commencez à collecter des avis en 10 secondes.
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
            <span className="text-primary">{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} de lecture</span>
            </div>
            {/* Signature visible. Le JSON-LD Article declarait deja un author,
                mais aucun nom n'apparaissait sur la page : Google exige que les
                donnees structurees refletent le contenu visible, et un guide de
                conseil sans auteur identifiable n'inspire rien a personne. */}
            <div className="flex items-center space-x-2">
              <PenLine className="w-4 h-4" />
              <span>
                Par{' '}
                <Link href="/a-propos" className="text-gray-600 hover:text-primary underline underline-offset-2">
                  {article.author}
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

          {/* ── COLONNE GAUCHE : TOC sticky ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <p id="sommaire-titre" className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                SOMMAIRE
              </p>

              <ArticleToc sections={article.tocSections} />

              {/* Bloc CTA Produit */}
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/product-main.jpg"
                      alt="Plaque Swiipx « Laissez-nous votre avis » : logo Google, zone NFC et QR code de secours"
                      fill
                      /* Colonne laterale de 240 px : sans sizes, `fill` fait
                         telecharger la variante 3840 px. */
                      sizes="240px"
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
                  <p className="text-lg font-bold text-primary mb-3">29,90 €</p>
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
          <article data-article className="max-w-none min-w-0">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-0 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-gray-900
                prose-ul:my-4 prose-ol:my-4
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:not-italic
                prose-code:text-primary prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-gray-200 prose-td:p-3
                prose-img:rounded-2xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Lien contextuel vers la page secteur.
                Ces pages commerciales ne recevaient que des liens de pied de
                page, que Google devalue. Un lien depuis le corps d'un article
                de fond, sur le meme sujet, porte un signal bien plus fort. */}
            {secteur && (
              <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Aller plus loin
                </p>
                <p className="text-gray-800 leading-relaxed mb-4">
                  Cet article détaille la méthode. Pour voir le produit appliqué à votre
                  activité — formats, emplacements, pack recommandé et lien avec votre fiche
                  Google Business Profile —&nbsp;:
                </p>
                <Link
                  href={`/secteur/${secteur.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                >
                  {secteur.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Section Articles Connexes (visible sur tous les écrans) */}
            <div className="mt-16 pt-10 border-t-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Articles connexes
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredRelated.map((relArticle) => (
                  <Link
                    key={relArticle.slug}
                    href={`/blog/${relArticle.slug}`}
                    className="group block p-5 bg-gray-50 rounded-xl hover:bg-blue-50 border border-gray-200 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      <span className="text-gray-800 font-medium group-hover:text-primary transition-colors">
                        {relArticle.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </article>

          {/* ── COLONNE DROITE : ADS carousel au scroll ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <ArticleAds related={filteredRelated} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
