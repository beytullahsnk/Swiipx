#!/usr/bin/env node
/**
 * Renvoie le sitemap à Google Search Console, pour qu'il relise la liste des
 * pages après la publication d'un article.
 *
 * POURQUOI CETTE VOIE ET PAS UNE AUTRE :
 * - Google ne lit pas IndexNow (c'est Bing qui en profite, voir indexnow.mjs) ;
 * - l'adresse de « ping » du sitemap a été supprimée par Google en 2023 ;
 * - l'Indexing API est réservée aux offres d'emploi et aux vidéos en direct :
 *   l'utiliser pour des articles enfreint ses conditions ;
 * - le bouton « Demander l'indexation » de Search Console n'a pas d'API.
 * Reste l'API Search Console, qui permet de soumettre un sitemap. Google
 * relit alors la liste, où chaque article porte sa date de modification
 * (app/sitemap.ts) : c'est ce qui lui signale ce qui est nouveau. Le moment
 * de l'indexation reste à sa discrétion.
 *
 * IDENTIFIANTS, deux façons :
 * - GOOGLE_ACCESS_TOKEN (celle en place depuis le 2026-10-07) : un accès
 *   Google d'une heure, obtenu sans clé par le workflow (étape « Google —
 *   identité de GitHub », fédération d'identité du projet Google Cloud
 *   « swiipx »). Il agit au nom du compte technique
 *   swiipx-sitemap@swiipx.iam.gserviceaccount.com, utilisateur « Accès total »
 *   de swiipx.fr dans Search Console ;
 * - à défaut, GSC_SERVICE_ACCOUNT_JSON : la clé JSON d'un compte de service,
 *   en secret GitHub, jamais dans le dépôt, qui est public.
 * Sans l'un ni l'autre, le script s'arrête sans erreur : il ne doit pas faire
 * échouer la notification de Bing.
 *
 * Usage : node scripts/google-sitemap.mjs [--simulation]
 */
import { createSign } from 'node:crypto'

const PROPRIETE = 'sc-domain:swiipx.fr'
const SITEMAP = 'https://swiipx.fr/sitemap.xml'
const PORTEE = 'https://www.googleapis.com/auth/webmasters'
const JETON_URL = 'https://oauth2.googleapis.com/token'
const API = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPRIETE)}/sitemaps/${encodeURIComponent(SITEMAP)}`

const simulation = process.argv.includes('--simulation')

const base64url = (texte) => Buffer.from(texte).toString('base64url')

/** Jeton d'accès OAuth d'un compte de service, signé localement (RS256). */
export async function jetonDAcces(cle, maintenant = Math.floor(Date.now() / 1000)) {
  const entete = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const revendications = base64url(JSON.stringify({
    iss: cle.client_email,
    scope: PORTEE,
    aud: JETON_URL,
    iat: maintenant,
    exp: maintenant + 3600,
  }))
  const aSigner = `${entete}.${revendications}`
  const signature = createSign('RSA-SHA256').update(aSigner).sign(cle.private_key, 'base64url')
  const reponse = await fetch(JETON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${aSigner}.${signature}`,
    }),
  })
  const corps = await reponse.json().catch(() => ({}))
  if (!reponse.ok || !corps.access_token) {
    throw new Error(`Google a refusé le compte de service (${reponse.status}) : ${corps.error_description || corps.error || 'réponse illisible'}`)
  }
  return corps.access_token
}

export async function renvoyerSitemap(jeton, compte) {
  const envoi = await fetch(API, { method: 'PUT', headers: { Authorization: `Bearer ${jeton}` } })
  if (!envoi.ok) {
    const detail = await envoi.text().catch(() => '')
    const conseil = envoi.status === 403
      ? ` Vérifiez que ${compte} est utilisateur « Accès total » de ${PROPRIETE} dans Search Console.`
      : ''
    throw new Error(`Search Console a répondu ${envoi.status}.${conseil} ${detail.slice(0, 300)}`)
  }
  // Relecture de l'état connu par Google : dernière soumission, dernier
  // téléchargement, erreurs. Facultatif, d'où l'absence d'échec si elle rate.
  const etat = await fetch(API, { headers: { Authorization: `Bearer ${jeton}` } })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
  return etat
}

const COMPTE_SANS_CLE = 'swiipx-sitemap@swiipx.iam.gserviceaccount.com'

async function principal() {
  const jetonFourni = (process.env.GOOGLE_ACCESS_TOKEN || '').trim()
  if (jetonFourni) {
    if (simulation) {
      console.log(`Simulation : le sitemap ${SITEMAP} serait renvoyé à ${PROPRIETE} par ${COMPTE_SANS_CLE} (accès sans clé).`)
      return
    }
    const etat = await renvoyerSitemap(jetonFourni, COMPTE_SANS_CLE)
    afficher(etat, 'accès sans clé')
    return
  }
  const brut = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (!brut || !brut.trim()) {
    const message = "Search Console non prévenu : ni accès sans clé (voir l'étape « Google — identité de GitHub »), ni secret GSC_SERVICE_ACCOUNT_JSON."
    console.log(process.env.GITHUB_ACTIONS === 'true' ? `::warning::${message}` : message)
    return
  }
  let cle
  try {
    cle = JSON.parse(brut)
  } catch {
    throw new Error('Le secret GSC_SERVICE_ACCOUNT_JSON n\'est pas un JSON valide : recopiez le fichier de clé en entier.')
  }
  if (!cle.client_email || !cle.private_key) {
    throw new Error('Le secret GSC_SERVICE_ACCOUNT_JSON ne contient pas client_email et private_key : est-ce bien une clé de compte de service ?')
  }
  if (simulation) {
    console.log(`Simulation : le sitemap ${SITEMAP} serait renvoyé à ${PROPRIETE} par ${cle.client_email}.`)
    return
  }
  const etat = await renvoyerSitemap(await jetonDAcces(cle), cle.client_email)
  afficher(etat, 'clé de compte de service')
}

function afficher(etat, moyen) {
  console.log(`Sitemap renvoyé à Google Search Console (${PROPRIETE}, ${moyen}).`)
  if (etat) {
    console.log(`   Dernière soumission : ${etat.lastSubmitted || '-'} | dernier téléchargement par Google : ${etat.lastDownloaded || '-'} | erreurs : ${etat.errors ?? 0} | avertissements : ${etat.warnings ?? 0}`)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  principal().catch((erreur) => {
    console.error(erreur.message)
    process.exit(1)
  })
}
