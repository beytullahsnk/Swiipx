/**
 * Prévient Bing (IndexNow) des articles publiés, modifiés ou supprimés par un
 * push, une fois le déploiement réellement en ligne.
 *
 * POURQUOI CE SCRIPT EXISTE : les articles sont publiés en continu, et aucun
 * n'était signalé — quatorze articles en ligne depuis un mois sans que Bing en
 * soit prévenu. Le signalement manuel (npm run indexnow) dépend de quelqu'un
 * qui y pense. Une tâche macOS dépendait d'un Mac allumé, d'une installation
 * jamais faite, et d'un node installé via nvm, donc absent du PATH de launchd.
 * Ce script tourne sur GitHub Actions à chaque push : il ne dépend que du push.
 *
 * CE QU'IL SIGNALE : les articles dont l'entrée dans seo-data.ts est nouvelle,
 * dont le `dateModified` a changé, ou qui ont disparu — plus /blog dès qu'un
 * article apparaît ou disparaît. Retoucher un article SANS changer son
 * dateModified ne déclenche rien : c'est voulu, dateModified est aussi ce que
 * Google lit pour savoir qu'une page a bougé. Changer le texte, c'est changer
 * la date.
 *
 * POURQUOI IL ATTEND : signaler une URL avant la fin du déploiement, c'est
 * envoyer Bing lire l'ancienne version — ou une 404 pour un article neuf, qu'il
 * ne reviendra pas voir avant longtemps. Le script interroge donc la production
 * jusqu'à ce que chaque page porte son nouveau dateModified, ou renvoie 404 si
 * elle a été supprimée. Un déploiement Vercel est atomique : quand un article
 * est à jour, /blog l'est aussi.
 *
 * Utilisation :
 *   node scripts/indexnow-apres-deploiement.mjs <sha-avant> <sha-après> [--simulation]
 */
import { execFileSync } from 'node:child_process'

const HOTE = 'https://swiipx.fr'
const FICHIER = 'app/blog/[slug]/seo-data.ts'
const ATTENTE_MAX_MS = 15 * 60 * 1000
const INTERVALLE_MS = 20 * 1000

const simulation = process.argv.includes('--simulation')
const [avant, apres] = process.argv.slice(2).filter((a) => !a.startsWith('--'))

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
}

function existe(ref) {
  if (!ref || /^0+$/.test(ref)) return false
  try {
    git('cat-file', '-e', `${ref}^{commit}`)
    return true
  } catch {
    return false
  }
}

/** slug -> dateModified, tel que seo-data.ts le déclarait au commit donné. */
function datesAu(ref) {
  let source
  try {
    source = git('show', `${ref}:${FICHIER}`)
  } catch {
    return new Map()
  }
  const dates = new Map()
  for (const bloc of source.split(/\n(?=  '[a-z0-9-]+': \{)/)) {
    const slug = bloc.match(/^  '([a-z0-9-]+)': \{/)?.[1]
    if (!slug) continue
    dates.set(slug, bloc.match(/dateModified:\s*(['"])([^'"]+)\1/)?.[2] ?? '')
  }
  return dates
}

if (!existe(apres)) {
  console.error(`Commit inconnu : ${apres}`)
  process.exit(1)
}
// Premier push d'une branche ou push forcé : l'ancien SHA n'existe pas, on
// compare au commit précédent.
const base = existe(avant) ? avant : `${apres}~1`
if (!existe(base)) {
  console.log('Aucun commit de référence : rien à comparer.')
  process.exit(0)
}

const datesAvant = datesAu(base)
const datesApres = datesAu(apres)

const pages = []
for (const [slug, date] of datesApres) {
  const ancienne = datesAvant.get(slug)
  if (ancienne === date) continue
  pages.push({
    url: `${HOTE}/blog/${slug}`,
    motif: ancienne === undefined ? 'nouveau' : `modifié (${ancienne} → ${date})`,
    changeLaListe: ancienne === undefined,
    estAJour: (statut, html) => statut === 200 && html.includes(`"dateModified":"${date}"`),
  })
}
for (const slug of datesAvant.keys()) {
  if (datesApres.has(slug)) continue
  pages.push({
    url: `${HOTE}/blog/${slug}`,
    motif: 'supprimé',
    changeLaListe: true,
    estAJour: (statut) => statut === 404,
  })
}

if (!pages.length) {
  console.log('Aucun article nouveau, modifié ou supprimé : rien à signaler.')
  process.exit(0)
}

console.log(`${pages.length} article(s) concerné(s) entre ${base.slice(0, 7)} et ${apres.slice(0, 7)} :`)
for (const p of pages) console.log(`   ${p.motif.padEnd(34)} ${p.url}`)

async function lire(url) {
  try {
    // Paramètre anti-cache pour la LECTURE seulement : c'est l'URL canonique,
    // sans paramètre, qui est transmise à IndexNow.
    const res = await fetch(`${url}?verif=${Date.now()}`, {
      headers: { 'User-Agent': 'swiipx-indexnow-ci' },
      cache: 'no-store',
    })
    return { statut: res.status, html: res.status === 200 ? await res.text() : '' }
  } catch {
    return { statut: 0, html: '' }
  }
}

const debut = Date.now()
let enAttente = pages
for (;;) {
  const etats = await Promise.all(enAttente.map(async (p) => ({ p, ...(await lire(p.url)) })))
  enAttente = etats.filter((e) => !e.p.estAJour(e.statut, e.html)).map((e) => e.p)
  if (!enAttente.length || Date.now() - debut > ATTENTE_MAX_MS) break
  console.log(`   déploiement pas encore en ligne pour ${enAttente.length} page(s), nouvel essai dans ${INTERVALLE_MS / 1000} s…`)
  await new Promise((r) => setTimeout(r, INTERVALLE_MS))
}

const prets = pages.filter((p) => !enAttente.includes(p))
const urls = prets.map((p) => p.url)
if (prets.some((p) => p.changeLaListe)) urls.push(`${HOTE}/blog`)

if (urls.length) {
  try {
    execFileSync(process.execPath, ['scripts/indexnow.mjs', ...urls, ...(simulation ? ['--simulation'] : [])], {
      stdio: 'inherit',
    })
  } catch {
    process.exit(1)
  }
}

if (enAttente.length) {
  console.error(`\n${enAttente.length} page(s) toujours pas à jour après ${ATTENTE_MAX_MS / 60000} min : déploiement échoué ou très lent.`)
  for (const p of enAttente) console.error(`   ${p.url}`)
  console.error('Relancer à la main une fois le site déployé : npm run indexnow')
  process.exit(1)
}
