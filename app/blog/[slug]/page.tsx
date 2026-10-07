import { Calendar, Clock, ArrowRight, PenLine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles } from './articles'
import { getRelatedArticles, secteurDeLArticle } from './related'
import ArticleToc from './ArticleToc'
import { BarreProduitMobile, CarteProduitColonne, EncartProduit, FinArticle } from './ConversionArticle'
import { contexteArticle } from './contexte'

/**
 * Server Component.
 *
 * Le contenu des articles (~370 Ko) reste cote serveur : il est rendu en HTML
 * au build et n'apparait jamais dans le bundle navigateur. Seuls le sommaire
 * (ArticleToc) et le parcours de conversion (ConversionArticle) sont
 * interactifs, et ne recoivent que quelques centaines d'octets de props.
 */
const PROSE = `prose prose-lg max-w-none
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
  prose-img:rounded-2xl prose-img:shadow-lg`

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]

  if (!article) {
    notFound()
  }

  const filteredRelated = getRelatedArticles(params.slug)
  const secteur = secteurDeLArticle(params.slug)
  const contexte = contexteArticle(params.slug, article.category)

  // L'encart produit s'insere apres la premiere section (6 a 17 % du contenu
  // selon l'article) : assez tot pour etre vu, la plupart des lecteurs partant
  // avant le quart de la page, assez tard pour suivre l'explication.
  const FIN_SECTION = '</section>'
  const coupure = article.content.indexOf(FIN_SECTION)
  const debutContenu = coupure > 0 ? article.content.slice(0, coupure + FIN_SECTION.length) : article.content
  const suiteContenu = coupure > 0 ? article.content.slice(coupure + FIN_SECTION.length) : ''

  return (
    <div className="min-h-screen bg-white">

      {/* La banniere jaune qui precedait le titre a ete retiree : le lecteur
          arrive de Google pour une reponse, et lui montrait une publicite
          avant meme le titre. Sur mobile, elle occupait le premier ecran.
          Le produit est desormais presente dans le fil de lecture
          (ConversionArticle). */}
      {/* ═══════════════════════════════════════════
          HEADER DE L'ARTICLE
          ═══════════════════════════════════════════ */}
      <section className="border-b border-gray-200 pt-28 pb-12 sm:pt-32 sm:pb-16">
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
            </div>
          </aside>

          {/* ── COLONNE CENTRE : CONTENU ── */}
          <article data-article className="max-w-none min-w-0">
            {/* Sommaire sur téléphone et tablette : la colonne de gauche n'apparaît
                qu'à partir de 1024 px, ces lecteurs n'avaient donc aucun sommaire.
                Replié, il ne prend qu'une ligne ; ses ancres servent aussi à Google,
                qui peut proposer un accès direct à une section dans ses résultats. */}
            {article.tocSections.length > 0 && (
              <details className="mb-8 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 lg:hidden">
                <summary className="cursor-pointer text-sm font-bold uppercase tracking-wider text-gray-900">Sommaire</summary>
                <ol className="mt-3 space-y-2 text-sm">
                  {article.tocSections.map((section, i) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="text-gray-700 hover:text-primary">
                        {i + 1}. {section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <div className={PROSE} dangerouslySetInnerHTML={{ __html: debutContenu }} />
            <EncartProduit slug={params.slug} contexte={contexte} />
            {suiteContenu && <div className={PROSE} dangerouslySetInnerHTML={{ __html: suiteContenu }} />}

            {/* Le choix du pack, puis la page du secteur. Le lien vers la page
                secteur reste dans le corps de l'article : depuis un article de
                fond sur le meme sujet, il porte plus qu'un lien de pied de page. */}
            <FinArticle slug={params.slug} secteur={secteur} contexte={contexte} />

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

          {/* ── COLONNE DROITE : carte produit ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <CarteProduitColonne slug={params.slug} contexte={contexte} />
            </div>
          </aside>

        </div>
      </div>

      <BarreProduitMobile slug={params.slug} contexte={contexte} />
    </div>
  )
}
