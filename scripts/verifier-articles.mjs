#!/usr/bin/env node
/**
 * Contrôle des articles du blog avant leur mise en ligne.
 *
 * POURQUOI CE SCRIPT EXISTE : les articles sont rédigés et publiés sans
 * relecture humaine, par une routine Claude Code qui tourne dans le cloud le
 * lundi, le mercredi et le vendredi (docs/articles/CONSIGNES.md). Ce script est
 * le garde-fou entre cette rédaction et le site : la routine le lance avant
 * d'envoyer son article, puis l'action GitHub « Publication des articles » le
 * relance et ne publie que s'il passe.
 *
 * TROIS FAMILLES DE CONTRÔLES
 *
 * 1. Sécurité, sur tout le blog. Le contenu est injecté tel quel dans la page
 *    (dangerouslySetInnerHTML) : une balise <script>, un attribut onclick ou un
 *    lien javascript: s'exécuterait chez chaque visiteur. Seules les balises,
 *    attributs et classes déjà employés par les articles sont admis. Les
 *    fichiers de données doivent rester des données (aucun appel, aucune
 *    expression), et rien d'autre ne doit changer dans ces fichiers : related.ts
 *    et page.tsx contiennent aussi du code, exécuté au build.
 *
 * 2. Cohérence, sur tout le blog : chaque article présent partout où il doit
 *    l'être, dates concordantes, sommaire et ancres valides, liens internes vers
 *    des pages qui existent.
 *
 * 3. Règles éditoriales, sur les articles ajoutés ou modifiés depuis la
 *    référence : prix en HT, livraison et garantie conformes au site,
 *    compatibilité iPhone exacte, aucun pourcentage sans source, aucun nom de
 *    l'équipe, FAQ identique au balisage, longueurs SEO. Ces règles viennent de
 *    corrections réelles : chiffres inventés retirés de 14 articles le
 *    13 septembre 2026, compatibilité iPhone corrigée le même jour, prix passés
 *    en HT le 1er octobre.
 *
 * Usage : node scripts/verifier-articles.mjs [--depuis <ref>] [--liens] [--tous]
 *   --depuis <ref>  ce que l'article change est mesuré depuis le point où la
 *                   branche quitte <ref> (défaut : origin/main)
 *   --liens         vérifie aussi que les liens externes des articles contrôlés
 *                   répondent (à lancer là où internet est accessible : GitHub)
 *   --tous          applique les règles éditoriales à tous les articles (audit)
 * Sortie : 0 sans erreur, 1 avec erreurs, 2 si le contrôle n'a pas pu tourner.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const FICHIERS = {
  articles: 'app/blog/[slug]/articles.ts',
  seo: 'app/blog/[slug]/seo-data.ts',
  related: 'app/blog/[slug]/related.ts',
  blog: 'app/blog/page.tsx',
}
const LLMS = 'public/llms.txt'
const AUTEUR = 'Équipe Swiipx'
const CATEGORIES_NOUVELLES = ['Secteur', 'Comparatif', 'SEO Local', 'Statistiques', 'Conseils']
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

// ── Ce que le HTML d'un article peut contenir ───────────────────────────────
// Relevé sur les 48 articles en ligne le 1er octobre 2026 : rien d'autre n'y
// figure. Une balise ou une classe nouvelle n'a donc aucune raison légitime
// d'apparaître dans un article rédigé automatiquement.
const BALISES = new Set(['section', 'h2', 'h3', 'h4', 'p', 'div', 'span', 'strong', 'em', 'a', 'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'code', 'pre', 'sup', 'sub', 'blockquote', 'br'])
const VIDES = new Set(['br'])
const ATTRIBUTS = {
  '*': new Set(['id', 'class']),
  a: new Set(['href', 'target', 'rel']),
  td: new Set(['colspan', 'rowspan']),
  th: new Set(['colspan', 'rowspan', 'scope']),
}
const REL_ADMIS = new Set(['noopener', 'noreferrer', 'nofollow', 'sponsored', 'ugc'])
const BLOCS = new Set(['p', 'li', 'h2', 'h3', 'h4', 'blockquote', 'td', 'th', 'pre'])
const CLASSES = new Set(('bg-amber-50 bg-blue-100 bg-blue-50 bg-emerald-50 bg-gray-100 bg-gray-50 bg-green-100 ' +
  'bg-green-50 bg-red-50 bg-yellow-50 border border-amber-200 border-b border-b-2 border-blue-200 border-collapse ' +
  'border-emerald-200 border-gray-100 border-gray-200 border-gray-300 border-green-200 border-red-200 border-t ' +
  'border-yellow-200 flex flex-shrink-0 font-bold font-medium font-semibold h-8 italic items-center items-start ' +
  'justify-center mb-0 mb-16 mb-2 mb-3 mb-6 min-w-full mt-6 my-6 not-prose overflow-hidden overflow-x-auto p-2 ' +
  'p-3 p-4 p-6 px-3 px-4 py-2 py-3 rounded-lg rounded-xl scroll-mt-28 space-x-4 space-y-2 space-y-3 ' +
  'text-amber-900 text-blue-700 text-blue-900 text-center text-emerald-900 text-gray-500 text-gray-600 ' +
  'text-gray-700 text-gray-800 text-gray-900 text-green-700 text-green-900 text-left text-red-900 text-sm ' +
  'text-xs text-yellow-900 underline w-16 w-full').split(' '))

// ── Arguments ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const indexDepuis = args.indexOf('--depuis')
const REF = indexDepuis >= 0 && args[indexDepuis + 1] ? args[indexDepuis + 1] : 'origin/main'
const LIENS = args.includes('--liens')
const TOUS = args.includes('--tous')
const EN_ACTIONS = process.env.GITHUB_ACTIONS === 'true'

const erreurs = []
const avertissements = []
const erreur = (message) => erreurs.push(message)
const avertir = (message) => avertissements.push(message)

const require = createRequire(path.join(RACINE, 'package.json'))
let ts
try {
  ts = require('typescript')
} catch {
  console.error("Module typescript introuvable : lancez d'abord npm ci.")
  process.exit(2)
}

function git(...a) {
  return execFileSync('git', a, { cwd: RACINE, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * 1024 * 1024 })
}

/** Point de départ de ce qu'il faut contrôler : là où HEAD a quitté REF. */
function base() {
  try {
    return git('merge-base', REF, 'HEAD').trim()
  } catch {
    return null
  }
}

function sourceAu(commit, fichier) {
  try {
    return git('show', `${commit}:${fichier}`)
  } catch {
    return null
  }
}

// ── Données : lues dans l'arbre syntaxique, jamais exécutées ────────────────
class DonneeInvalide extends Error {}

function litteral(noeud, ou) {
  if (ts.isStringLiteral(noeud) || ts.isNoSubstitutionTemplateLiteral(noeud)) return noeud.text
  if (ts.isNumericLiteral(noeud)) return Number(noeud.text)
  if (ts.isArrayLiteralExpression(noeud)) return noeud.elements.map((e, i) => litteral(e, `${ou}[${i}]`))
  if (ts.isObjectLiteralExpression(noeud)) {
    const objet = {}
    for (const p of noeud.properties) {
      if (!ts.isPropertyAssignment(p) || !(ts.isIdentifier(p.name) || ts.isStringLiteral(p.name))) {
        throw new DonneeInvalide(`${ou} : seules des propriétés littérales sont admises (trouvé ${ts.SyntaxKind[p.kind]})`)
      }
      const cle = p.name.text
      if (Object.prototype.hasOwnProperty.call(objet, cle)) throw new DonneeInvalide(`${ou} : clé « ${cle} » en double`)
      objet[cle] = litteral(p.initializer, `${ou}.${cle}`)
    }
    return objet
  }
  throw new DonneeInvalide(`${ou} : expression interdite (${ts.SyntaxKind[noeud.kind]}), une donnée littérale est attendue`)
}

/**
 * Valeur d'une déclaration du fichier, et le fichier privé de cette valeur
 * (le « cadre ») : une publication ne doit changer que la valeur.
 */
function lireDonnees(fichier, source, variable) {
  const genre = fichier.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const sf = ts.createSourceFile(fichier, source, ts.ScriptTarget.Latest, true, genre)
  let init = null
  for (const st of sf.statements) {
    if (!ts.isVariableStatement(st)) continue
    for (const d of st.declarationList.declarations) {
      if (ts.isIdentifier(d.name) && d.name.text === variable) init = d.initializer ?? null
    }
  }
  if (!init) throw new DonneeInvalide(`${fichier} : déclaration « ${variable} » introuvable`)
  return {
    valeur: litteral(init, `${fichier} › ${variable}`),
    cadre: source.slice(0, init.getStart(sf)) + '\u0000' + source.slice(init.getEnd()),
  }
}

const VARIABLES = { articles: 'articles', seo: 'seoData', related: 'relatedArticles', blog: 'blogPosts' }

function chargerTout(lire) {
  const resultat = {}
  for (const [cle, fichier] of Object.entries(FICHIERS)) {
    const source = lire(fichier)
    if (source === null) return null
    resultat[cle] = lireDonnees(fichier, source, VARIABLES[cle])
  }
  resultat.llms = lire(LLMS) ?? ''
  return resultat
}

// ── Texte ───────────────────────────────────────────────────────────────────
const ENTITES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', laquo: '«', raquo: '»', mdash: '—', ndash: '–', eacute: 'é', egrave: 'è', agrave: 'à', ccedil: 'ç', times: '×', euro: '€', deg: '°' }

function decoder(texte) {
  return texte
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, nom) => ENTITES[nom.toLowerCase()] ?? m)
}

/** Texte visible d'un fragment HTML, espaces normalisés (insécables compris). */
function texte(html) {
  return decoder(html.replace(/<[^>]*>/g, ' ')).replace(/[\s  ]+/g, ' ').trim()
}

function dateFr(iso) {
  const [annee, mois, jour] = iso.split('-').map(Number)
  return `${jour === 1 ? '1er' : jour} ${MOIS[mois - 1]} ${annee}`
}

function ascii(t) {
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

const ISO = /^\d{4}-\d{2}-\d{2}$/
// « vs » vaut « ou » : « plaque nfc vs qr code » et « Plaque NFC ou QR code » visent la même recherche.
const MOTS_VIDES = new Set('de la le les des du d l un une et ou vs versus a au aux en dans chez pour par sur avec sans quel quelle quels quelles comment pourquoi combien est ce qui que qu vos votre nos notre mon ma mes son sa ses leur leurs'.split(' '))
/** Mots porteurs de sens, sans accents ni pluriel en « s » : « Plaques NFC » et « plaque nfc » se valent. */
function motsSignificatifs(t) {
  return ascii(t.toLowerCase()).split(/[^a-z0-9]+/).filter((w) => w && !MOTS_VIDES.has(w)).map((w) => w.replace(/s$/, ''))
}
const aujourdhui = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
const hier = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.now() - 86400000))

// ── Routes du site, pour valider les liens internes ─────────────────────────
function routes(slugsArticles) {
  const statiques = new Set()
  const parcourir = (dossier, url) => {
    for (const entree of readdirSync(path.join(RACINE, dossier), { withFileTypes: true })) {
      if (!entree.isDirectory() || entree.name.startsWith('[') || entree.name.startsWith('(') || entree.name.startsWith('_') || entree.name === 'api' || entree.name === 'components') continue
      const sous = `${dossier}/${entree.name}`
      if (existsSync(path.join(RACINE, sous, 'page.tsx'))) statiques.add(`${url}/${entree.name}`)
      parcourir(sous, `${url}/${entree.name}`)
    }
  }
  statiques.add('/')
  parcourir('app', '')
  const produits = [...readFileSync(path.join(RACINE, 'lib/pricing.ts'), 'utf8').matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1])
  const secteurs = (readFileSync(path.join(RACINE, 'app/sitemap.ts'), 'utf8').match(/const sectorSlugs = \[([^\]]*)\]/)?.[1] ?? '')
    .match(/'([a-z0-9-]+)'/g)?.map((s) => s.slice(1, -1)) ?? []
  const toutes = new Set(statiques)
  for (const s of slugsArticles) toutes.add(`/blog/${s}`)
  for (const s of produits) toutes.add(`/product/${s}`)
  for (const s of secteurs) toutes.add(`/secteur/${s}`)
  const dediees = [...statiques].filter((r) => r.startsWith('/blog/')).map((r) => r.slice('/blog/'.length))
  return { toutes, dediees }
}

// ── Analyse du HTML d'un article ────────────────────────────────────────────
function analyserHtml(slug, html, { routesSite, strict }) {
  const ou = `${slug}`
  const resultat = { ids: new Set(), sections: [], liens: [], blocs: [], tableaux: [], listes: [], horsSection: false }

  for (const motif of ['<!--', '<!', '<?']) {
    if (html.includes(motif)) erreur(`${ou} : « ${motif} » interdit dans le contenu`)
  }
  if (html.includes('`') || html.includes('${')) erreur(`${ou} : le contenu ne doit contenir ni accent grave ni « \${ » (il est écrit dans un gabarit JavaScript)`)

  const pile = []
  const balise = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^<>]*)>/g
  let reste = ''
  let dernier = 0
  let m
  while ((m = balise.exec(html))) {
    const [complet, fermante, nomBrut, brut] = m
    const nom = nomBrut.toLowerCase()
    const entre = html.slice(dernier, m.index)
    reste += entre
    if (strict && pile.length === 0 && entre.trim()) resultat.horsSection = true
    dernier = m.index + complet.length

    if (!BALISES.has(nom)) {
      erreur(`${ou} : balise <${nom}> interdite`)
      continue
    }
    if (fermante) {
      if (brut.trim()) erreur(`${ou} : </${nom}> ne doit pas porter d'attribut`)
      const ouvert = pile.pop()
      if (!ouvert || ouvert.nom !== nom) {
        erreur(`${ou} : </${nom}> ferme ${ouvert ? `<${ouvert.nom}>` : 'rien'} : HTML déséquilibré`)
        return resultat
      }
      if (BLOCS.has(nom)) {
        const interieur = html.slice(ouvert.finOuverture, m.index)
        resultat.blocs.push({ nom, debut: ouvert.debut, fin: dernier, html: interieur, texte: texte(interieur), tableau: pile.some((e) => e.nom === 'table') })
      }
      if (nom === 'table') resultat.tableaux.push({ debut: ouvert.debut, fin: dernier, html: html.slice(ouvert.debut, dernier) })
      if (nom === 'ul' || nom === 'ol') resultat.listes.push({ debut: ouvert.debut, fin: dernier })
      continue
    }

    // Attributs : uniquement nom="valeur", entre guillemets droits.
    const attrs = {}
    const corps = brut.replace(/\s*\/\s*$/, '')
    const attribut = /\s+([a-zA-Z][a-zA-Z0-9-]*)="([^"<>]*)"/y
    let position = 0
    let a
    while (position < corps.length && (attribut.lastIndex = position, (a = attribut.exec(corps)))) {
      const cle = a[1].toLowerCase()
      if (attrs[cle] !== undefined) erreur(`${ou} : attribut ${cle} en double sur <${nom}>`)
      attrs[cle] = a[2]
      position = attribut.lastIndex
    }
    if (corps.slice(position).trim()) erreur(`${ou} : attribut mal formé sur <${nom}> : « ${corps.slice(position).trim().slice(0, 60)} »`)
    for (const cle of Object.keys(attrs)) {
      if (!ATTRIBUTS['*'].has(cle) && !ATTRIBUTS[nom]?.has(cle)) erreur(`${ou} : attribut ${cle} interdit sur <${nom}>`)
    }
    if (attrs.class !== undefined) {
      const inconnues = attrs.class.split(/\s+/).filter((c) => c && !CLASSES.has(c))
      if (inconnues.length) erreur(`${ou} : classe(s) inconnue(s) ${inconnues.join(', ')} : réutilisez les styles des articles existants`)
    }
    if (attrs.id !== undefined) {
      if (!/^[a-z0-9-]+$/.test(attrs.id)) erreur(`${ou} : id « ${attrs.id} » invalide (minuscules, chiffres, tirets)`)
      if (resultat.ids.has(attrs.id)) erreur(`${ou} : id « ${attrs.id} » en double`)
      resultat.ids.add(attrs.id)
    }
    if (nom === 'section') {
      if (pile.length === 0) resultat.sections.push(attrs.id ?? '')
    } else if (strict && pile.length === 0) {
      resultat.horsSection = true
    }
    if (attrs.colspan !== undefined && !/^\d{1,2}$/.test(attrs.colspan)) erreur(`${ou} : colspan invalide`)
    if (attrs.rowspan !== undefined && !/^\d{1,2}$/.test(attrs.rowspan)) erreur(`${ou} : rowspan invalide`)
    if (attrs.scope !== undefined && !['col', 'row', 'colgroup', 'rowgroup'].includes(attrs.scope)) erreur(`${ou} : scope invalide`)
    if (nom === 'a') resultat.liens.push({ ...attrs, position: m.index })

    if (!VIDES.has(nom) && !/\/\s*$/.test(brut)) pile.push({ nom, debut: m.index, finOuverture: dernier })
  }
  reste += html.slice(dernier)
  if (strict && html.slice(dernier).trim()) resultat.horsSection = true
  if (pile.length) erreur(`${ou} : balise(s) non fermée(s) : ${pile.map((e) => `<${e.nom}>`).join(' ')}`)
  if (/<[a-zA-Z/!?]/.test(reste)) erreur(`${ou} : balise incomplète dans le texte`)
  if (strict && resultat.horsSection) erreur(`${ou} : du contenu se trouve hors des <section>`)

  for (const lien of resultat.liens) {
    const href = lien.href
    if (href === undefined || href === '') {
      erreur(`${ou} : lien sans href`)
      continue
    }
    if (href.startsWith('https://')) {
      let url
      try {
        url = new URL(href)
      } catch {
        erreur(`${ou} : lien externe invalide ${href}`)
        continue
      }
      if (url.username || url.password || !url.hostname.includes('.')) erreur(`${ou} : lien externe suspect ${href}`)
      if (url.hostname === 'swiipx.fr' || url.hostname === 'www.swiipx.fr') erreur(`${ou} : lien absolu vers swiipx.fr, écrire le chemin seul (${url.pathname})`)
      if (lien.target !== '_blank') erreur(`${ou} : lien externe sans target="_blank" (${href})`)
      const rel = (lien.rel ?? '').split(/\s+/).filter(Boolean)
      if (!rel.includes('noopener')) erreur(`${ou} : lien externe sans rel="noopener" (${href})`)
      const relInconnus = rel.filter((r) => !REL_ADMIS.has(r))
      if (relInconnus.length) erreur(`${ou} : rel inconnu ${relInconnus.join(' ')}`)
    } else if (href.startsWith('/')) {
      const chemin = href.split(/[?#]/)[0].replace(/\/$/, '') || '/'
      if (!routesSite.toutes.has(chemin)) erreur(`${ou} : lien interne vers une page qui n'existe pas : ${href}`)
    } else if (href.startsWith('#')) {
      // Vérifié plus bas, une fois tous les id connus.
    } else {
      erreur(`${ou} : lien interdit « ${href.slice(0, 60)} » (seuls https://, /chemin et #ancre sont admis)`)
    }
    if (lien.target !== undefined && lien.target !== '_blank') erreur(`${ou} : target invalide`)
  }
  for (const lien of resultat.liens) {
    if (lien.href?.startsWith('#') && !resultat.ids.has(lien.href.slice(1))) erreur(`${ou} : ancre ${lien.href} introuvable dans l'article`)
  }
  return resultat
}

// ── Règles éditoriales ──────────────────────────────────────────────────────
const HYPOTHESE = /hypoth[èe]se|exemple|supposons|imaginons|prenons|simulation|sc[ée]nario|illustrati|fictif|fictive|à titre indicatif|calcul|\bsoit\s+(?:environ\s+|près de\s+)?\d/i
const POURCENTAGE = /\d\s?%/
const MULTIPLICATEUR = /\b\d+(?:[,.]\d+)?\s*fois\s+(?:plus|moins)\b|(?:^|[\s(])[x×]\s?\d+(?:[,.]\d+)?\b(?!\s*(?:mm|cm|m)\b)/i
const contientChiffre = (t) => POURCENTAGE.test(t) || MULTIPLICATEUR.test(t)
const lienExterne = (html) => /<a\s[^>]*href="https:\/\//.test(html)

function reglesTexte(ou, t) {
  if (/beytullah|sonkaya/i.test(t)) erreur(`${ou} : nom d'un membre de l'équipe, l'auteur est « ${AUTEUR} »`)
  if (/[—–]/.test(t)) erreur(`${ou} : tiret long (— ou –) : utilisez deux-points, virgules ou parenthèses`)

  for (const m of t.matchAll(/\b(29|54|89)[,.]90\b(.{0,12})/g)) {
    if (/^\s?(?:€\s?)?(?:à|et|ou)\s/.test(m[2])) continue // fourchette : le dernier prix porte la mention
    if (!/^\s?(?:€|EUR)\s?HT\b/.test(m[2])) erreur(`${ou} : prix « ${m[0].trim()} » : les prix Swiipx s'écrivent « ${m[1]},90 € HT »`)
  }
  for (const m of t.matchAll(/\b(35[,.]88|65[,.]88|107[,.]88)\b/g)) erreur(`${ou} : montant TTC « ${m[1]} » : les articles affichent les prix HT`)
  for (const m of t.matchAll(/\b(?:livraisons?|frais de port|ports?|exp[ée]ditions?)\s+(?:gratuite?s?|offerte?s?|inclus(?:e|es)?)(.{0,60})/gi)) {
    if (!/point[s]? relais/i.test(m[1])) erreur(`${ou} : « ${m[0].slice(0, 40)} » : seule la livraison en point relais est offerte (le domicile est payant)`)
  }
  for (const m of t.matchAll(/garantie?s?\s+(?:de\s+|d['’]une durée de\s+)?\d+\s*(?:ans?|mois)\b/gi)) erreur(`${ou} : « ${m[0]} » : la puce NFC est garantie à vie`)
  for (const m of t.matchAll(/(\d+)\s*jours?[^.]{0,40}satisfait ou rembours|satisfait ou rembours[^.]{0,40}?(\d+)\s*jours?/gi)) {
    if ((m[1] ?? m[2]) !== '90') erreur(`${ou} : « ${m[0].slice(0, 60)} » : le satisfait ou remboursé est de 90 jours`)
  }
  for (const phrase of t.split(/(?<=[.!?])\s+/)) {
    if (/iPhone\s?(?:6|7|8|X)(?![RS\w])/.test(phrase) && !/centre de contr[ôo]le|lecteur de tags?|lecteur nfc/i.test(phrase)) {
      erreur(`${ou} : compatibilité iPhone : sans application, la lecture se fait dès les iPhone XR et XS ; les iPhone 7, 8 et X passent par le Lecteur de tag NFC du centre de contrôle (phrase : « ${phrase.slice(0, 90)}… »)`)
    }
    if (/(?:dès|depuis|à partir de)\s+l['’]iPhone\s?(?:6|7|8|X)(?![RS\w])/i.test(phrase)) erreur(`${ou} : « ${phrase.slice(0, 80)}… » : la lecture sans application commence à l'iPhone XR / XS`)
  }
}

/** Chaque pourcentage ou multiplicateur du contenu doit être sourcé ou présenté comme une hypothèse. */
function reglesSources(slug, analyse) {
  const feuilles = analyse.blocs.filter((b) => !analyse.blocs.some((x) => x !== b && x.debut > b.debut && x.fin < b.fin))
  const voisins = (debut, fin) => {
    const avant = feuilles.filter((b) => !b.tableau && b.fin <= debut).at(-1)
    const apres = feuilles.find((b) => !b.tableau && b.debut >= fin)
    return [avant, apres].filter(Boolean)
  }
  for (const b of feuilles) {
    if (b.tableau || !contientChiffre(b.texte)) continue
    if (lienExterne(b.html) || HYPOTHESE.test(b.texte)) continue
    const liste = b.nom === 'li' && analyse.listes.filter((l) => l.debut < b.debut && l.fin > b.fin).sort((x, y) => x.debut - y.debut)[0]
    if (liste && voisins(liste.debut, liste.fin).slice(0, 1).some((v) => v.fin <= liste.debut && (lienExterne(v.html) || HYPOTHESE.test(v.texte)))) continue
    const extrait = (b.texte.match(/.{0,50}(?:\d\s?%|fois\s+(?:plus|moins)|[x×]\s?\d).{0,30}/i)?.[0] ?? b.texte.slice(0, 80)).trim()
    erreur(`${slug} : chiffre sans source dans <${b.nom}> : « ${extrait} ». Ajoutez dans ce même paragraphe le lien vers la source, présentez-le comme une hypothèse de calcul, ou retirez-le`)
  }
  for (const tableau of analyse.tableaux) {
    const t = texte(tableau.html)
    if (!contientChiffre(t)) continue
    if (lienExterne(tableau.html) || HYPOTHESE.test(t)) continue
    if (voisins(tableau.debut, tableau.fin).some((b) => lienExterne(b.html) || HYPOTHESE.test(b.texte))) continue
    erreur(`${slug} : tableau chiffré sans source : mettez le lien de la source (ou la mention « hypothèse ») dans le paragraphe qui précède ou suit le tableau`)
  }
  return feuilles
}

// ── Vérification des liens externes ─────────────────────────────────────────
const AGENT = 'Mozilla/5.0 (compatible; SwiipxVerificationLiens/1.0; +https://swiipx.fr)'

async function tenter(url) {
  const controle = new AbortController()
  const minuterie = setTimeout(() => controle.abort(), 20000)
  const options = { redirect: 'follow', signal: controle.signal, headers: { 'user-agent': AGENT, accept: 'text/html,application/xhtml+xml,*/*' } }
  try {
    let r = await fetch(url, { ...options, method: 'HEAD' })
    if (r.status >= 400) {
      // Beaucoup de serveurs répondent mal à HEAD : confirmation en GET.
      r = await fetch(url, { ...options, method: 'GET' })
      await r.body?.cancel().catch(() => {})
    }
    if (r.headers.get('x-deny-reason')) return { etat: 'reseau' }
    if (r.status === 404 || r.status === 410) return { etat: 'mort', detail: `HTTP ${r.status}` }
    if (r.ok) return { etat: 'ok' }
    return { etat: 'douteux', detail: `HTTP ${r.status}` }
  } catch (e) {
    const code = e.cause?.code ?? e.name
    if (code === 'ENOTFOUND') return { etat: 'mort', detail: 'domaine inexistant' }
    return { etat: 'douteux', detail: code }
  } finally {
    clearTimeout(minuterie)
  }
}

async function verifierLiens(liensParSlug) {
  const urls = new Map()
  for (const [slug, liens] of liensParSlug) for (const l of liens) if (l.href?.startsWith('https://')) urls.set(l.href, slug)
  const liste = [...urls.keys()]
  for (let i = 0; i < liste.length; i += 6) {
    await Promise.all(liste.slice(i, i + 6).map(async (url) => {
      let r = await tenter(url)
      if (r.etat === 'mort') {
        await new Promise((ok) => setTimeout(ok, 4000))
        r = await tenter(url)
      }
      const slug = urls.get(url)
      if (r.etat === 'mort') erreur(`${slug} : lien mort (${r.detail}) : ${url}. Une source doit exister : retrouvez la bonne adresse ou retirez l'affirmation`)
      else if (r.etat === 'reseau') avertir(`${slug} : lien non vérifiable depuis ce réseau (il le sera sur GitHub) : ${url}`)
      else if (r.etat === 'douteux') avertir(`${slug} : lien non confirmé (${r.detail}) : ${url}`)
    }))
  }
  return liste.length
}

// ── Contrôle ────────────────────────────────────────────────────────────────
async function principal() {
  let actuel
  try {
    actuel = chargerTout((f) => (existsSync(path.join(RACINE, f)) ? readFileSync(path.join(RACINE, f), 'utf8') : null))
  } catch (e) {
    if (e instanceof DonneeInvalide) {
      erreur(e.message)
      return null
    }
    throw e
  }
  if (!actuel) {
    erreur('fichier du blog introuvable')
    return null
  }

  const commitBase = base()
  let reference = null
  if (commitBase) {
    try {
      reference = chargerTout((f) => sourceAu(commitBase, f))
    } catch (e) {
      if (!(e instanceof DonneeInvalide)) throw e
      avertir(`version de référence illisible (${e.message})`)
    }
  }
  if (!reference && !TOUS) avertir(`référence ${REF} introuvable : règles éditoriales appliquées à tous les articles`)

  // 1. Hors des données, rien ne doit bouger.
  if (reference) {
    for (const [cle, fichier] of Object.entries(FICHIERS)) {
      if (actuel[cle].cadre !== reference[cle].cadre) {
        erreur(`${fichier} : le fichier a changé en dehors de ses données (${VARIABLES[cle]}) ; une publication d'article ne modifie que les données`)
      }
    }
  }

  const articles = actuel.articles.valeur
  const seo = actuel.seo.valeur
  const related = actuel.related.valeur
  const posts = actuel.blog.valeur
  const llms = actuel.llms
  const slugs = Object.keys(seo)
  const routesSite = routes(slugs)

  // Portée des règles éditoriales : articles ajoutés ou modifiés.
  const json = (v) => JSON.stringify(v ?? null)
  const portee = new Set()
  for (const slug of new Set([...Object.keys(articles), ...slugs])) {
    if (TOUS || !reference) {
      portee.add(slug)
      continue
    }
    const avant = (cle, trouver) => json(trouver(reference[cle].valeur))
    const apres = (cle, trouver) => json(trouver(actuel[cle].valeur))
    const parSlug = (v) => (Array.isArray(v) ? v.find((x) => x.slug === slug) : v[slug])
    if (['articles', 'seo', 'related', 'blog'].some((cle) => avant(cle, parSlug) !== apres(cle, parSlug))) portee.add(slug)
  }
  const nouveaux = new Set([...portee].filter((s) => !reference || !(s in reference.seo.valeur)))

  // 2. Cohérence de l'ensemble.
  for (const slug of Object.keys(articles)) if (!(slug in seo)) erreur(`${slug} : présent dans articles.ts mais absent de seo-data.ts`)
  for (const slug of slugs) if (!(slug in articles)) erreur(`${slug} : présent dans seo-data.ts mais absent de articles.ts`)
  const connus = new Set([...slugs, ...routesSite.dediees])

  const vusRelated = new Set()
  for (const r of related) {
    if (!r || typeof r.slug !== 'string' || typeof r.label !== 'string') { erreur('related.ts : entrée mal formée'); continue }
    if (vusRelated.has(r.slug)) erreur(`related.ts : ${r.slug} en double`)
    vusRelated.add(r.slug)
    if (!connus.has(r.slug)) erreur(`related.ts : ${r.slug} ne correspond à aucun article`)
  }
  const ids = new Set()
  const vusPosts = new Set()
  for (const p of posts) {
    if (!p || typeof p.slug !== 'string') { erreur('page.tsx : entrée de blogPosts mal formée'); continue }
    if (!Number.isInteger(p.id) || ids.has(p.id)) erreur(`page.tsx : id ${p.id} invalide ou en double (${p.slug})`)
    ids.add(p.id)
    if (vusPosts.has(p.slug)) erreur(`page.tsx : ${p.slug} en double`)
    vusPosts.add(p.slug)
    if (!connus.has(p.slug)) erreur(`page.tsx : ${p.slug} ne correspond à aucun article`)
  }

  const liensParSlug = new Map()
  for (const slug of slugs) {
    const a = articles[slug]
    const s = seo[slug]
    if (!a) continue
    const strict = portee.has(slug)
    const ou = slug
    if (!vusRelated.has(slug)) erreur(`${ou} : absent de related.ts`)
    if (!vusPosts.has(slug)) erreur(`${ou} : absent de la liste du blog (app/blog/page.tsx)`)
    if (a.author !== AUTEUR) erreur(`${ou} : auteur « ${a.author} », attendu « ${AUTEUR} »`)
    if (!ISO.test(s.date) || !ISO.test(s.dateModified)) erreur(`${ou} : dates de seo-data.ts au format AAAA-MM-JJ attendues`)
    else if (s.dateModified < s.date) erreur(`${ou} : dateModified antérieure à la date de publication`)
    if (a.category !== s.category) erreur(`${ou} : catégorie différente entre articles.ts et seo-data.ts`)
    for (const champ of [s.title, s.description, s.keywords, ...s.faq.flatMap((f) => [f.q, f.a])]) {
      if (/[<>]/.test(champ)) { erreur(`${ou} : seo-data.ts contient < ou > (texte brut attendu)`); break }
    }

    const analyse = analyserHtml(slug, a.content, { routesSite, strict })
    const sections = new Set(analyse.sections)
    for (const t of a.tocSections) if (!sections.has(t.id)) erreur(`${ou} : le sommaire pointe vers #${t.id}, section introuvable`)
    if (!strict) continue

    // 3. Règles éditoriales de l'article ajouté ou modifié.
    liensParSlug.set(slug, analyse.liens)
    const post = posts.find((p) => p.slug === slug)
    const rel = related.find((r) => r.slug === slug)
    const ligneLlms = llms.split('\n').find((l) => l.includes(`](https://swiipx.fr/blog/${slug})`))
    const nouveau = nouveaux.has(slug)

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 70) erreur(`${ou} : slug invalide (minuscules, chiffres et tirets, 70 caractères au plus)`)
    if (nouveau && !CATEGORIES_NOUVELLES.includes(s.category)) erreur(`${ou} : catégorie « ${s.category} » : choisir parmi ${CATEGORIES_NOUVELLES.join(', ')}`)
    if (a.date !== dateFr(s.date)) erreur(`${ou} : date affichée « ${a.date} », attendue « ${dateFr(s.date)} »`)
    if (!/^\d{1,2} min$/.test(a.readTime)) erreur(`${ou} : durée de lecture « ${a.readTime} » invalide`)
    if (nouveau) {
      if (s.dateModified !== s.date) erreur(`${ou} : un nouvel article a dateModified = date`)
      if (s.date !== aujourdhui && s.date !== hier) erreur(`${ou} : date de publication ${s.date}, attendue ${aujourdhui} (aujourd'hui, heure de Paris)`)
    } else if (reference && json(reference.articles.valeur[slug]?.content) !== json(a.content) && s.dateModified === reference.seo.valeur[slug]?.dateModified) {
      erreur(`${ou} : contenu modifié sans mettre à jour dateModified (c'est elle qui signale le changement à Google et Bing)`)
    }
    if (s.dateModified > aujourdhui) erreur(`${ou} : dateModified dans le futur`)
    if (s.title.length > 65) erreur(`${ou} : titre SEO de ${s.title.length} caractères (65 au plus)`)
    if (s.description.length < 110 || s.description.length > 170) erreur(`${ou} : description SEO de ${s.description.length} caractères (110 à 170)`)
    if (!s.keywords.trim()) erreur(`${ou} : mots-clés vides`)
    if (a.title.length > 110) erreur(`${ou} : titre de ${a.title.length} caractères (110 au plus)`)
    if (!rel || rel.label.length > 70) erreur(`${ou} : libellé de related.ts absent ou trop long (70 caractères au plus)`)
    if (post && (post.title !== a.title || post.excerpt !== a.excerpt || post.date !== a.date || post.dateIso !== s.date || post.readTime !== a.readTime || post.category !== s.category)) {
      erreur(`${ou} : la carte du blog (app/blog/page.tsx) ne reprend pas exactement titre, extrait, date, durée et catégorie de l'article`)
    }
    if (!ligneLlms) erreur(`${ou} : absent de public/llms.txt`)
    else {
      if (/[^\x20-\x7e]/.test(ligneLlms)) erreur(`${ou} : la ligne de llms.txt doit être sans accents ni caractères spéciaux (ASCII)`)
      if (nouveau && !ligneLlms.includes(`(publie le ${ascii(dateFr(s.date))})`)) erreur(`${ou} : la ligne de llms.txt doit indiquer « (publie le ${ascii(dateFr(s.date))}) »`)
    }

    // Structure : sections, sommaire, FAQ, conclusion.
    const toc = a.tocSections.map((t) => t.id)
    if (json(toc) !== json(analyse.sections)) erreur(`${ou} : le sommaire doit lister exactement les sections, dans l'ordre (sommaire : ${toc.join(', ')} ; sections : ${analyse.sections.join(', ')})`)
    if (analyse.sections.at(-1) !== 'conclusion') erreur(`${ou} : la dernière section doit avoir l'id « conclusion »`)
    const idFaq = analyse.sections.find((id) => id.startsWith('faq'))
    if (!idFaq) erreur(`${ou} : section FAQ absente (id commençant par « faq »)`)
    else {
      const debut = a.content.indexOf(`<section id="${idFaq}"`)
      const bloc = a.content.slice(debut, a.content.indexOf('</section>', debut))
      const questions = [...bloc.matchAll(/<h3>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3>|$)/g)].map((m) => ({ q: texte(m[1]), a: texte(m[2]) }))
      if (s.faq.length < 5 || s.faq.length > 8) erreur(`${ou} : ${s.faq.length} questions dans seo-data.ts (5 à 8)`)
      if (json(questions.map((x) => x.q)) !== json(s.faq.map((f) => texte(f.q)))) erreur(`${ou} : les questions de seo-data.ts doivent être exactement les <h3> de la section FAQ, dans l'ordre`)
      else questions.forEach((x, i) => { if (x.a !== texte(s.faq[i].a)) erreur(`${ou} : la réponse FAQ n° ${i + 1} de seo-data.ts diffère du texte affiché`) })
    }

    // GEO, depuis le 2026-10-07 (docs/articles/CONSIGNES.md, partie 5) :
    // les moteurs génératifs reprennent des réponses courtes et autonomes,
    // placées sous des titres explicites, et Google classe une page sur une
    // intention : le titre porte le mot-clé principal.
    const motCle = s.keywords.split(',')[0].trim()
    const motsTitre = new Set(motsSignificatifs(s.title))
    const absents = motsSignificatifs(motCle).filter((w) => !motsTitre.has(w))
    if (!motCle) erreur(`${ou} : aucun mot-clé principal (premier de la liste des mots-clés)`)
    else if (absents.length) erreur(`${ou} : le titre SEO doit contenir le mot-clé principal « ${motCle} » (manque : ${absents.join(', ')})`)
    const premiereSection = a.content.slice(0, a.content.indexOf('</section>'))
    if (!/En une phrase|En bref/i.test(premiereSection)) erreur(`${ou} : la première section doit contenir l'encadré « En une phrase » (la réponse directe)`)
    for (const m of a.content.matchAll(/<section id="([^"]+)"[^>]*>\s*<h2>[\s\S]*?<\/h2>\s*(<[a-z0-9]+)/g)) {
      if (m[1].startsWith('faq')) continue
      if (m[2] !== '<p') {
        erreur(`${ou} : sous le titre de #${m[1]}, commencer par un paragraphe-réponse de 40 à 60 mots avant la liste ou les sous-titres`)
        continue
      }
      const debut = m.index + m[0].length - m[2].length
      const n = texte(a.content.slice(debut, a.content.indexOf('</p>', debut))).split(' ').length
      if (n < 25 || n > 110) erreur(`${ou} : le paragraphe sous le titre de #${m[1]} fait ${n} mots : viser 40 à 60 (25 à 110 tolérés)`)
    }

    // Maillage : d'autres articles, et l'offre.
    const internes = new Set(analyse.liens.map((l) => l.href ?? '').filter((h) => h.startsWith('/blog/') && h !== `/blog/${slug}`).map((h) => h.split('#')[0]))
    if (internes.size < 3) erreur(`${ou} : ${internes.size} lien(s) vers d'autres articles du blog (3 au moins)`)
    if (!analyse.liens.some((l) => /^\/(?:product\/|#product)/.test(l.href ?? ''))) erreur(`${ou} : aucun lien vers l'offre (/product/… ou /#product)`)
    const mots = texte(a.content).split(' ').length
    if (mots < 2500) erreur(`${ou} : ${mots} mots (2 500 au moins)`)

    // Texte : prix, livraison, garantie, iPhone, noms, tirets ; puis sources.
    reglesTexte(ou, texte(a.content))
    for (const [champ, valeur] of [['titre', a.title], ['extrait', a.excerpt], ['titre SEO', s.title], ['description SEO', s.description], ['mots-clés', s.keywords], ['libellé related', rel?.label ?? ''], ['llms.txt', ligneLlms ?? '']]) {
      reglesTexte(`${ou} (${champ})`, valeur)
    }
    const feuilles = reglesSources(slug, analyse)
    for (const [champ, valeur] of [['titre', a.title], ['extrait', a.excerpt], ['titre SEO', s.title], ['description SEO', s.description]]) {
      for (const m of valeur.matchAll(/\d+(?:[,.]\d+)?\s?%/g)) {
        const chiffre = m[0].replace(/\s/g, '')
        const sourceDansLeTexte = feuilles.some((b) => b.texte.replace(/\s/g, '').includes(chiffre) && (lienExterne(b.html) || HYPOTHESE.test(b.texte)))
        if (!sourceDansLeTexte) erreur(`${ou} (${champ}) : « ${m[0]} » doit figurer, avec sa source, dans le corps de l'article`)
      }
    }
  }

  let nombreLiens = 0
  if (LIENS && liensParSlug.size) nombreLiens = await verifierLiens(liensParSlug)
  return { total: slugs.length, portee: [...portee], nouveaux: [...nouveaux], commitBase, nombreLiens }
}

const bilan = await principal().catch((e) => {
  console.error(`Le contrôle n'a pas pu tourner : ${e.stack ?? e.message}`)
  process.exit(2)
})

if (bilan) {
  const base = bilan.commitBase ? `${REF} (${bilan.commitBase.slice(0, 7)})` : 'aucune'
  console.log(`Contrôle des articles : ${bilan.total} articles, référence ${base}.`)
  console.log(bilan.portee.length
    ? `Règles éditoriales appliquées à : ${bilan.portee.join(', ')}${bilan.nouveaux.length ? ` (nouveau : ${bilan.nouveaux.join(', ')})` : ''}.`
    : 'Aucun article ajouté ou modifié : règles éditoriales sans objet.')
  if (LIENS) console.log(`Liens externes vérifiés : ${bilan.nombreLiens}.`)
}
if (avertissements.length) {
  console.log(`\nAvertissements (${avertissements.length}) :`)
  for (const a of avertissements) {
    console.log(`  - ${a}`)
    if (EN_ACTIONS) console.log(`::warning::${a}`)
  }
}
if (erreurs.length) {
  console.log(`\nErreurs (${erreurs.length}) :`)
  for (const e of erreurs) {
    console.log(`  - ${e}`)
    if (EN_ACTIONS) console.log(`::error::${e}`)
  }
  console.log('\nArticle non publiable en l\'état : corrigez ces points puis relancez le contrôle.')
  process.exit(1)
}
console.log('\nAucune erreur.')
