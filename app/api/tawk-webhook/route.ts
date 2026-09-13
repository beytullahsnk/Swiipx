import { NextRequest, NextResponse } from 'next/server'
import {
  construireMessage,
  envoyerTelegram,
  signatureValide,
  type EvenementTawk,
} from '@/lib/tawk-telegram'

/**
 * Webhook tawk.to → bot Telegram du marchand (voir lib/tawk-telegram.ts).
 *
 * Trois variables à définir dans Vercel, jamais dans le code — le dépôt est
 * public :
 *   TAWK_WEBHOOK_SECRET  clé secrète affichée par tawk.to sur le webhook
 *   TELEGRAM_BOT_TOKEN   jeton du bot, donné par @BotFather
 *   TELEGRAM_CHAT_ID     identifiant de la conversation avec le bot
 *
 * CODES DE RÉPONSE : tawk.to rejoue pendant 12 h tout événement qui n'a pas
 * reçu de 2xx. On ne répond donc 2xx que si l'alerte est partie, ou si
 * l'événement n'en demandait pas. Une variable oubliée ou une panne de
 * Telegram ne fait perdre aucun message, pourvu qu'elle soit réglée dans les
 * 12 h.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const secret = process.env.TAWK_WEBHOOK_SECRET
  const jeton = process.env.TELEGRAM_BOT_TOKEN
  const conversation = process.env.TELEGRAM_CHAT_ID

  if (!secret || !jeton || !conversation) {
    const manquantes = [
      !secret && 'TAWK_WEBHOOK_SECRET',
      !jeton && 'TELEGRAM_BOT_TOKEN',
      !conversation && 'TELEGRAM_CHAT_ID',
    ].filter(Boolean)
    console.error('[tawk.to] Relais non configuré, variables manquantes :', manquantes.join(', '))
    return NextResponse.json({ error: 'Relais non configuré' }, { status: 503 })
  }

  const corps = Buffer.from(await request.arrayBuffer())
  if (!signatureValide(corps, request.headers.get('x-tawk-signature'), secret)) {
    console.error('[tawk.to] Signature invalide')
    return NextResponse.json({ error: 'Signature invalide' }, { status: 401 })
  }

  let evenement: EvenementTawk
  try {
    evenement = JSON.parse(corps.toString('utf8'))
  } catch {
    console.error('[tawk.to] Corps illisible')
    return NextResponse.json({ error: 'Corps illisible' }, { status: 400 })
  }

  // Identifiant stable d'un rejeu à l'autre : il permet de recouper les logs.
  const idEvenement = request.headers.get('x-hook-event-id') ?? '?'
  const texte = construireMessage(evenement)
  if (!texte) {
    console.log('[tawk.to] Événement sans alerte :', evenement.event, idEvenement)
    return NextResponse.json({ ok: true, alerte: false })
  }

  try {
    await envoyerTelegram(texte, jeton, conversation)
  } catch (erreur) {
    console.error('[tawk.to] Envoi Telegram en échec :', idEvenement, erreur instanceof Error ? erreur.message : erreur)
    return NextResponse.json({ error: 'Envoi Telegram en échec' }, { status: 502 })
  }

  // Ni nom, ni e-mail, ni message dans les logs : ils sont déjà sur Telegram.
  console.log('[tawk.to] Alerte envoyée :', evenement.event, idEvenement)
  return NextResponse.json({ ok: true, alerte: true })
}
