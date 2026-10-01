#!/usr/bin/env node
/**
 * Insère un nouvel article dans les cinq fichiers du blog.
 *
 * POURQUOI CE SCRIPT EXISTE : un article vit à cinq endroits (contenu, données
 * SEO, liens connexes, liste du blog, llms.txt), avec des formats différents :
 * date ISO ici, date en toutes lettres là, texte sans accents dans llms.txt,
 * apostrophes à échapper en JavaScript, FAQ du balisage à recopier mot pour mot
 * depuis la page. Les écrire à la main, c'était s'exposer à l'oubli d'un
 * fichier ou à une FAQ qui diverge du texte affiché, ce que Google sanctionne.
 * Ce script dérive tout d'une seule fiche, et refuse un slug déjà publié.
 *
 * Usage : node scripts/ajouter-article.mjs <fiche.json>
 *
 * La fiche (JSON) :
 *   slug            identifiant de l'URL, ex. « plaque-nfc-fleuriste »
 *   date            AAAA-MM-JJ, facultatif (défaut : aujourd'hui, heure de Paris)
 *   categorie       Secteur, Comparatif, SEO Local, Statistiques ou Conseils
 *   titre           titre affiché (h1 et carte du blog)
 *   extrait         chapeau, sous le titre et sur la carte du blog
 *   titreSeo        balise <title>, 65 caractères au plus
 *   descriptionSeo  meta description, 110 à 170 caractères
 *   motsCles        mots-clés séparés par des virgules
 *   libelleLien     texte court des liens « Articles connexes », 70 caractères au plus
 *   resumeLlms      résumé détaillé pour public/llms.txt (les accents sont retirés ici)
 *   sommaire        [{ id, label }], une entrée par <section>, dans l'ordre
 *   contenu         chemin du fichier HTML de l'article, relatif à la fiche
 * La FAQ du balisage (seo-data.ts) est extraite de la section FAQ du HTML, et
 * la durée de lecture est calculée : il n'y a rien à recopier.
 *
 * Ensuite : npx tsc --noEmit, puis node scripts/verifier-articles.mjs.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const F = {
  articles: 'app/blog/[slug]/articles.ts',
  seo: 'app/blog/[slug]/seo-data.ts',
  related: 'app/blog/[slug]/related.ts',
  blog: 'app/blog/page.tsx',
  llms: 'public/llms.txt',
}
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const MOTS_PAR_MINUTE = 280 // relevé sur les articles existants (≈ 4 200 mots pour « 15 min »)

function arreter(message) {
  console.error(`Article non inséré : ${message}`)
  process.exit(1)
}

const cheminFiche = process.argv[2]
if (!cheminFiche) arreter('indiquez le chemin de la fiche JSON (voir l\'en-tête du script)')
let fiche
try {
  fiche = JSON.parse(readFileSync(cheminFiche, 'utf8'))
} catch (e) {
  arreter(`fiche illisible (${e.message})`)
}

const aujourdhui = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
const date = fiche.date ?? aujourdhui
const requis = ['slug', 'categorie', 'titre', 'extrait', 'titreSeo', 'descriptionSeo', 'motsCles', 'libelleLien', 'resumeLlms', 'sommaire', 'contenu']
for (const champ of requis) if (fiche[champ] === undefined || fiche[champ] === '') arreter(`champ « ${champ} » manquant`)
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fiche.slug)) arreter('slug invalide (minuscules, chiffres et tirets)')
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) arreter('date au format AAAA-MM-JJ attendue')
if (!Array.isArray(fiche.sommaire) || !fiche.sommaire.every((s) => s && s.id && s.label)) arreter('sommaire : liste de { id, label } attendue')

const html = readFileSync(path.resolve(path.dirname(cheminFiche), fiche.contenu), 'utf8').trim()
if (html.includes('`') || html.includes('${')) arreter('le HTML ne doit contenir ni accent grave ni « ${ »')

const lire = (f) => readFileSync(path.join(RACINE, f), 'utf8')
const sources = Object.fromEntries(Object.entries(F).map(([cle, f]) => [cle, lire(f)]))
for (const [cle, f] of Object.entries(F)) {
  if (sources[cle].includes(`'${fiche.slug}'`) || sources[cle].includes(`/blog/${fiche.slug})`)) arreter(`le slug « ${fiche.slug} » existe déjà dans ${f}`)
}

// ── Mise en forme ───────────────────────────────────────────────────────────
const ENTITES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', laquo: '«', raquo: '»', eacute: 'é', egrave: 'è', agrave: 'à', ccedil: 'ç', times: '×', euro: '€' }
const decoder = (t) => t
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, nom) => ENTITES[nom.toLowerCase()] ?? m)
/** Même extraction que scripts/verifier-articles.mjs : les deux doivent concorder. */
const texte = (h) => decoder(h.replace(/<[^>]*>/g, ' ')).replace(/[\s  ]+/g, ' ').trim()

/** Chaîne JavaScript entre apostrophes, comme dans le reste des fichiers. */
const js = (t) => `'${String(t).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ')}'`
const ascii = (t) => String(t)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/œ/g, 'oe').replace(/Œ/g, 'OE').replace(/æ/g, 'ae').replace(/Æ/g, 'AE')
  .replace(/[’‘]/g, "'").replace(/[«»“”]/g, '"').replace(/[  ]/g, ' ')
  .replace(/[—–]/g, '-').replace(/…/g, '...').replace(/€/g, 'EUR').replace(/×/g, 'x')
  .replace(/[^\x20-\x7e]/g, '').replace(/\s+/g, ' ').trim()
const [annee, mois, jour] = date.split('-').map(Number)
const dateFr = `${jour === 1 ? '1er' : jour} ${MOIS[mois - 1]} ${annee}`
const mots = texte(html).split(' ').length
const dureeLecture = `${Math.max(5, Math.round(mots / MOTS_PAR_MINUTE))} min`

// FAQ du balisage : les <h3> de la section FAQ et le texte qui suit chacun.
const debutFaq = html.search(/<section id="faq[^"]*"/)
if (debutFaq < 0) arreter('section FAQ introuvable (<section id="faq-…">)')
const blocFaq = html.slice(debutFaq, html.indexOf('</section>', debutFaq))
const faq = [...blocFaq.matchAll(/<h3>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3>|$)/g)].map((m) => ({ q: texte(m[1]), a: texte(m[2]) }))
if (faq.length < 5) arreter(`la section FAQ ne contient que ${faq.length} question(s) en <h3> (5 à 8 attendues)`)

// ── Insertions, toujours en tête de liste : l'article le plus récent d'abord ─
function inserer(cle, repere, bloc) {
  const i = sources[cle].indexOf(repere)
  if (i < 0) arreter(`repère introuvable dans ${F[cle]} : « ${repere.trim()} »`)
  const apres = i + repere.length
  sources[cle] = sources[cle].slice(0, apres) + bloc + sources[cle].slice(apres)
}

inserer('articles', '}> = {\n', [
  `  ${js(fiche.slug)}: {`,
  `    title: ${js(fiche.titre)},`,
  `    category: ${js(fiche.categorie)},`,
  `    date: ${js(dateFr)},`,
  `    readTime: ${js(dureeLecture)},`,
  `    author: 'Équipe Swiipx',`,
  `    excerpt: ${js(fiche.extrait)},`,
  '    tocSections: [',
  ...fiche.sommaire.map((s) => `      { id: ${js(s.id)}, label: ${js(s.label)} },`),
  '    ],',
  `    content: \`\n${html.replace(/\\/g, '\\\\')}\n\`,`,
  '  },',
  '',
].join('\n'))

inserer('seo', 'export const seoData: Record<string, ArticleSeo> = {\n', [
  `  ${js(fiche.slug)}: {`,
  `    title: ${js(fiche.titreSeo)},`,
  `    description: ${js(fiche.descriptionSeo)},`,
  `    keywords: ${js(fiche.motsCles)},`,
  `    date: ${js(date)},`,
  `    dateModified: ${js(date)},`,
  `    category: ${js(fiche.categorie)},`,
  '    faq: [',
  ...faq.map((f) => `      { q: ${js(f.q)}, a: ${js(f.a)} },`),
  '    ],',
  '  },',
  '',
].join('\n'))

inserer('related', 'export const relatedArticles: RelatedArticle[] = [\n', `  { slug: ${js(fiche.slug)}, label: ${js(fiche.libelleLien)} },\n`)

const ids = [...sources.blog.matchAll(/^\s{4}id: (\d+),$/gm)].map((m) => Number(m[1]))
inserer('blog', 'const blogPosts: BlogPost[] = [\n', [
  '  {',
  `    id: ${Math.max(0, ...ids) + 1},`,
  `    title: ${js(fiche.titre)},`,
  `    excerpt: ${js(fiche.extrait)},`,
  `    category: ${js(fiche.categorie)},`,
  `    date: ${js(dateFr)},`,
  `    dateIso: ${js(date)},`,
  `    readTime: ${js(dureeLecture)},`,
  `    slug: ${js(fiche.slug)},`,
  '  },',
  '',
].join('\n'))

// llms.txt : avant le premier article de la liste.
const lignes = sources.llms.split('\n')
const premier = lignes.findIndex((l) => l.startsWith('- [') && l.includes('](https://swiipx.fr/blog/'))
if (premier < 0) arreter('liste des articles introuvable dans public/llms.txt')
lignes.splice(premier, 0, `- [${ascii(fiche.titre)}](https://swiipx.fr/blog/${fiche.slug}) (publie le ${ascii(dateFr)}): ${ascii(fiche.resumeLlms)}`)
sources.llms = lignes.join('\n')

for (const [cle, f] of Object.entries(F)) writeFileSync(path.join(RACINE, f), sources[cle])
console.log(`Article « ${fiche.slug} » inséré dans les 5 fichiers : ${dateFr}, ${mots} mots (${dureeLecture}), ${faq.length} questions de FAQ.`)
console.log('Étapes suivantes : npx tsc --noEmit, puis node scripts/verifier-articles.mjs')
