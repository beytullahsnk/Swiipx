/**
 * Signale les URL du site à IndexNow (Bing, Yandex, Naver, Seznam).
 *
 * POURQUOI : sans signalement, une nouvelle page attend le passage naturel du
 * robot — souvent plusieurs semaines sur un site sans autorité. IndexNow
 * ramène ce délai à quelques heures, gratuitement.
 *
 * L'enjeu n'est pas Bing en lui-même (moins de 5 % des recherches en France),
 * mais son index : c'est lui qui alimente ChatGPT Search et Copilot. Être
 * indexé rapidement par Bing, c'est pouvoir être cité dans ces réponses.
 *
 * Utilisation :
 *   node scripts/indexnow.mjs            # toutes les URL du sitemap
 *   node scripts/indexnow.mjs /blog/xxx  # une ou plusieurs URL précises
 */

const HOTE = 'swiipx.fr'
const CLE = '9af3815a7fae4bc6b16e2caff88c2dda'
const EMPLACEMENT_CLE = `https://${HOTE}/${CLE}.txt`

async function urlsDuSitemap() {
  const res = await fetch(`https://${HOTE}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml inaccessible (HTTP ${res.status})`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

const args = process.argv.slice(2)
const urls = args.length
  ? args.map((u) => (u.startsWith('http') ? u : `https://${HOTE}${u.startsWith('/') ? '' : '/'}${u}`))
  : await urlsDuSitemap()

if (!urls.length) {
  console.error('Aucune URL à signaler.')
  process.exit(1)
}

console.log(`Signalement de ${urls.length} URL à IndexNow…`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOTE, key: CLE, keyLocation: EMPLACEMENT_CLE, urlList: urls }),
})

// 200 = accepté, 202 = accepté mais clé en cours de vérification.
if (res.status === 200 || res.status === 202) {
  console.log(`OK (HTTP ${res.status}) — ${urls.length} URL transmises.`)
  urls.slice(0, 5).forEach((u) => console.log('   ', u))
  if (urls.length > 5) console.log(`    … et ${urls.length - 5} autres`)
} else {
  console.error(`Échec (HTTP ${res.status}) : ${await res.text()}`)
  process.exit(1)
}
