import { NextRequest, NextResponse } from 'next/server'
import { construireAlerteHorsLigne, envoyerTelegram } from '@/lib/tawk-telegram'

/**
 * Alerte Telegram pour les messages laissés via le formulaire hors ligne du
 * chat tawk.to. Ces messages ne déclenchent aucun webhook (voir
 * lib/tawk-telegram.ts) : c'est le rappel Tawk_API.onOfflineSubmit, posé dans
 * app/components/WhatsAppButton.tsx, qui appelle cette route.
 *
 * ROUTE PUBLIQUE, SANS SECRET POSSIBLE : l'appel part du navigateur du
 * visiteur, qui ne peut rien garder de secret. Le pire abus reste l'envoi de
 * fausses alertes vers le Telegram du marchand, d'où ces garde-fous :
 * - origine swiipx.fr exigée (un script peut la falsifier, pas un navigateur) ;
 * - corps et champs bornés ;
 * - plafond d'alertes par adresse IP et par instance.
 * Rien n'est enregistré, et aucune donnée du visiteur n'est journalisée.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ORIGINES = new Set(['https://swiipx.fr', 'https://www.swiipx.fr'])
const TAILLE_MAX = 6000
const FENETRE_MS = 10 * 60 * 1000
const MAX_PAR_IP = 3
const MAX_PAR_INSTANCE = 30

// Mémoire de l'instance, remise à zéro à chaque démarrage à froid : assez pour
// arrêter une rafale, pas un attaquant patient — qui n'obtiendrait de toute
// façon que des messages dans un Telegram privé.
const envois: Array<{ ip: string; t: number }> = []

function quotaAtteint(ip: string, maintenant: number): boolean {
  while (envois.length && maintenant - envois[0].t > FENETRE_MS) envois.shift()
  const parIp = envois.filter((envoi) => envoi.ip === ip).length
  return parIp >= MAX_PAR_IP || envois.length >= MAX_PAR_INSTANCE
}

/** Chaîne nettoyée des caractères de contrôle (sauts de ligne gardés) et bornée. */
function champ(valeur: unknown, longueur: number): string | undefined {
  if (typeof valeur !== 'string') return undefined
  const propre = valeur.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
  return propre ? propre.slice(0, longueur) : undefined
}

export async function POST(request: NextRequest) {
  if (!ORIGINES.has(request.headers.get('origin') ?? '')) {
    return NextResponse.json({ error: 'Origine refusée' }, { status: 403 })
  }

  const jeton = process.env.TELEGRAM_BOT_TOKEN
  const conversation = process.env.TELEGRAM_CHAT_ID
  if (!jeton || !conversation) {
    console.error('[tawk.to hors ligne] Relais non configuré')
    return NextResponse.json({ error: 'Relais non configuré' }, { status: 503 })
  }

  const brut = await request.text()
  if (brut.length > TAILLE_MAX) {
    return NextResponse.json({ error: 'Corps trop volumineux' }, { status: 413 })
  }

  let donnees: Record<string, unknown>
  try {
    const lu: unknown = JSON.parse(brut)
    if (!lu || typeof lu !== 'object' || Array.isArray(lu)) throw new Error('pas un objet')
    donnees = lu as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Corps illisible' }, { status: 400 })
  }

  const message = champ(donnees.message, 3000)
  if (!message) {
    return NextResponse.json({ error: 'Message vide' }, { status: 400 })
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'inconnue'
  const maintenant = Date.now()
  if (quotaAtteint(ip, maintenant)) {
    console.warn('[tawk.to hors ligne] Plafond d\'alertes atteint')
    return NextResponse.json({ error: 'Trop de messages' }, { status: 429 })
  }
  envois.push({ ip, t: maintenant })

  const page = champ(donnees.page, 200)
  try {
    await envoyerTelegram(
      construireAlerteHorsLigne({
        name: champ(donnees.name, 100),
        email: champ(donnees.email, 200),
        message,
        page: page?.startsWith('/') ? page : undefined,
      }),
      jeton,
      conversation,
    )
  } catch (erreur) {
    console.error('[tawk.to hors ligne] Envoi Telegram en échec :', erreur instanceof Error ? erreur.message : erreur)
    return NextResponse.json({ error: 'Envoi Telegram en échec' }, { status: 502 })
  }

  console.log('[tawk.to hors ligne] Alerte envoyée')
  return NextResponse.json({ ok: true })
}
