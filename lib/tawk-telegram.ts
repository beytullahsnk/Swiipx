import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Relais des alertes tawk.to vers Telegram.
 *
 * POURQUOI : tawk.to ne prévient un agent que par son application mobile, son
 * tableau de bord ouvert ou l'e-mail. Son intégration « Telegram » est un canal
 * CLIENT — elle permet à un visiteur d'écrire depuis Telegram — et n'envoie
 * aucune alerte au marchand. Sans ce relais, un message laissé sur le site
 * n'alertait personne tant que le tableau de bord restait fermé.
 *
 * Données transmises : nom, e-mail et message du visiteur, rien d'autre. La
 * ville et le pays figurent dans la charge utile mais ne servent pas à répondre.
 *
 * DEUX ENTRÉES. Le webhook signé (app/api/tawk-webhook/route.ts) couvre les
 * discussions en direct et les tickets. Mais un message laissé via le
 * formulaire hors ligne — le cas courant, puisque personne n'est connecté la
 * plupart du temps — ne déclenche aucun webhook : ce n'est ni une discussion
 * démarrée, ni un ticket (tawk.to ne le convertit qu'au clic d'un agent).
 * Constaté le 2026-09-14 : deux messages hors ligne arrivés dans la boîte
 * tawk.to, aucun appel au webhook. Ceux-là passent par le rappel navigateur
 * onOfflineSubmit et app/api/tawk-alerte/route.ts.
 *
 * Aucune clé ici : les routes lisent le secret du webhook, le jeton du bot et
 * la conversation dans les variables Vercel.
 */

/** Charge utile des webhooks tawk.to — https://developer.tawk.to/webhooks/ */
export interface EvenementTawk {
  event?: string
  chatId?: string
  time?: string
  message?: { text?: string; sender?: { type?: string } }
  visitor?: { name?: string; email?: string }
  requester?: { name?: string; email?: string }
  ticket?: { humanId?: number; subject?: string; message?: string }
  property?: { id?: string; name?: string }
}

/**
 * tawk.to signe le corps brut en HMAC-SHA1 (hexadécimal, en-tête
 * X-Tawk-Signature). On vérifie les octets reçus, jamais le JSON relu puis
 * resérialisé : l'ordre des clés, un espace ou l'échappement d'un accent
 * suffiraient à changer la signature.
 */
export function signatureValide(corps: Buffer, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const attendue = createHmac('sha1', secret).update(corps).digest()
  const recue = Buffer.from(signature.trim(), 'hex')
  return recue.length === attendue.length && timingSafeEqual(recue, attendue)
}

// Telegram refuse les messages de plus de 4 096 caractères.
const LIMITE_TEXTE = 3000

function extrait(texte: string | undefined): string {
  const propre = (texte ?? '').trim()
  if (!propre) return '(message vide)'
  return propre.length > LIMITE_TEXTE ? `${propre.slice(0, LIMITE_TEXTE)}…` : propre
}

/** tawk.to nomme « V1561719148780935 » le visiteur qui n'a pas donné son nom. */
function expediteur(nom: string | undefined, email: string | undefined): string {
  const qui = !nom || /^V\d{8,}$/.test(nom) ? 'Visiteur anonyme' : nom
  return email ? `${qui} <${email}>` : qui
}

function lienBoiteDeReception(evenement: EvenementTawk): string {
  const propriete = evenement.property?.id
  return propriete
    ? `https://dashboard.tawk.to/#/inbox/${encodeURIComponent(propriete)}/all`
    : 'https://dashboard.tawk.to/#/inbox'
}

/**
 * Texte de l'alerte, ou null pour un événement qui n'en mérite pas (fin de
 * discussion, transcription). Envoyé en texte brut, sans parse_mode : le
 * message du visiteur n'a ainsi rien à échapper.
 */
export function construireMessage(evenement: EvenementTawk): string | null {
  let lignes: Array<string | null>

  if (evenement.event === 'chat:start') {
    lignes = [
      'Nouvelle discussion sur swiipx.fr',
      `De : ${expediteur(evenement.visitor?.name, evenement.visitor?.email)}`,
      '',
      extrait(evenement.message?.text),
    ]
  } else if (evenement.event === 'ticket:create') {
    // Un ticket naît d'un e-mail envoyé à l'adresse de transfert tawk.to, ou
    // d'un message hors ligne qu'un agent a converti.
    const numero = evenement.ticket?.humanId
    lignes = [
      numero ? `Nouveau ticket #${numero}` : 'Nouveau ticket',
      `De : ${expediteur(evenement.requester?.name, evenement.requester?.email)}`,
      evenement.ticket?.subject ? `Objet : ${evenement.ticket.subject}` : null,
      '',
      extrait(evenement.ticket?.message),
    ]
  } else {
    return null
  }

  lignes.push('', `Répondre : ${lienBoiteDeReception(evenement)}`)
  return lignes.filter((ligne): ligne is string => ligne !== null).join('\n')
}

/** Propriété tawk.to du site. Publique : elle figure aussi dans le widget. */
const PROPRIETE_SWIIPX = '698f027e1f51081c3676f34d'

/** Ce que le navigateur transmet quand un visiteur envoie le formulaire hors ligne. */
export interface MessageHorsLigne {
  name?: string
  email?: string
  message?: string
  page?: string
}

/** Alerte pour un message laissé via le formulaire hors ligne du widget. */
export function construireAlerteHorsLigne(saisie: MessageHorsLigne): string {
  return [
    'Nouveau message hors ligne sur swiipx.fr',
    `De : ${expediteur(saisie.name, saisie.email)}`,
    saisie.page ? `Page : ${saisie.page}` : null,
    '',
    extrait(saisie.message),
    '',
    `Répondre : ${lienBoiteDeReception({ property: { id: PROPRIETE_SWIIPX } })}`,
  ].filter((ligne): ligne is string => ligne !== null).join('\n')
}

/** Ne jamais journaliser l'URL : elle contient le jeton du bot. */
export async function envoyerTelegram(texte: string, jeton: string, conversation: string): Promise<void> {
  const reponse = await fetch(`https://api.telegram.org/bot${jeton}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: conversation,
      text: texte,
      link_preview_options: { is_disabled: true },
    }),
    // tawk.to coupe à 30 s puis rejoue : mieux vaut échouer avant, et bien
    // avant la limite de durée de la fonction Vercel.
    signal: AbortSignal.timeout(8000),
  })
  if (!reponse.ok) {
    const detail = await reponse.text().catch(() => '')
    throw new Error(`Telegram a répondu ${reponse.status} : ${detail.slice(0, 300)}`)
  }
}
