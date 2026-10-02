import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Demande de devis multi-établissements : relayée par e-mail à
 * bonjour@swiipx.fr, avec l'adresse du demandeur en réponse directe.
 *
 * POURQUOI : le plus gros panier observé (8 agences, 174,70 € HT, près de six
 * Packs Starter) est arrivé par un e-mail spontané, pas par le site, qui
 * s'arrêtait au Pack Pro de 5 plaques. Un réseau d'agences ou de franchises a
 * besoin d'une plaque par établissement, chacune avec son propre lien d'avis :
 * c'est un devis, pas un panier.
 *
 * Aucun accusé de réception n'est envoyé au demandeur : un formulaire qui
 * écrit à une adresse saisie par n'importe qui servirait à envoyer des mails
 * à des tiers. La confirmation s'affiche à l'écran ; la réponse part de
 * bonjour@swiipx.fr.
 */
export const dynamic = 'force-dynamic'

const DESTINATAIRE = 'bonjour@swiipx.fr'
const ORIGINES = new Set(['https://swiipx.fr', 'https://www.swiipx.fr'])
const TAILLE_MAX = 8000
const FENETRE_MS = 10 * 60 * 1000
const MAX_PAR_IP = 3
const MAX_PAR_INSTANCE = 20

// Mémoire de l'instance, remise à zéro à chaque démarrage à froid : assez pour
// arrêter une rafale, et le pire cas reste des messages dans la boîte Swiipx.
const envois: Array<{ ip: string; t: number }> = []

function quotaAtteint(ip: string, maintenant: number): boolean {
  while (envois.length && maintenant - envois[0].t > FENETRE_MS) envois.shift()
  return envois.filter((envoi) => envoi.ip === ip).length >= MAX_PAR_IP || envois.length >= MAX_PAR_INSTANCE
}

/** Chaîne nettoyée des caractères de contrôle (sauts de ligne gardés) et bornée. */
function champ(valeur: unknown, longueur: number): string {
  if (typeof valeur !== 'string') return ''
  return valeur.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, longueur)
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const origine = request.headers.get('origin')
  const enDev = process.env.NODE_ENV !== 'production'
  if (origine && !ORIGINES.has(origine) && !(enDev && origine.startsWith('http://localhost'))) {
    return NextResponse.json({ error: 'Origine refusée' }, { status: 403 })
  }

  const brut = await request.text()
  if (brut.length > TAILLE_MAX) return NextResponse.json({ error: 'Demande trop longue' }, { status: 413 })
  let donnees: Record<string, unknown>
  try {
    donnees = JSON.parse(brut)
  } catch {
    return NextResponse.json({ error: 'Demande illisible' }, { status: 400 })
  }

  // Champ invisible pour un humain : rempli, c'est un robot. On lui répond
  // comme si tout allait bien, pour ne rien lui apprendre.
  if (champ(donnees.site, 200)) return NextResponse.json({ ok: true })

  const entreprise = champ(donnees.entreprise, 120)
  const nom = champ(donnees.nom, 120)
  const email = champ(donnees.email, 200)
  const telephone = champ(donnees.telephone, 40)
  const liste = champ(donnees.liste, 3000)
  const message = champ(donnees.message, 2000)
  const etablissements = Math.trunc(Number(donnees.etablissements))

  if (!entreprise || !nom) return NextResponse.json({ error: 'Indiquez votre nom et celui de votre entreprise.' }, { status: 400 })
  if (!EMAIL.test(email)) return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 })
  if (!Number.isFinite(etablissements) || etablissements < 2 || etablissements > 500) {
    return NextResponse.json({ error: "Indiquez le nombre d'établissements (2 au moins)." }, { status: 400 })
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'inconnue'
  const maintenant = Date.now()
  if (quotaAtteint(ip, maintenant)) {
    return NextResponse.json({ error: 'Trop de demandes. Réessayez dans quelques minutes ou écrivez à bonjour@swiipx.fr.' }, { status: 429 })
  }
  envois.push({ ip, t: maintenant })

  if (!process.env.RESEND_API_KEY) {
    console.error('[Devis] RESEND_API_KEY manquant : demande non transmise')
    return NextResponse.json({ error: 'Envoi indisponible. Écrivez-nous à bonjour@swiipx.fr.' }, { status: 503 })
  }

  const texte = [
    `Nouvelle demande de devis depuis swiipx.fr/devis`,
    '',
    `Entreprise : ${entreprise}`,
    `Contact : ${nom}`,
    `E-mail : ${email}`,
    `Téléphone : ${telephone || 'non indiqué'}`,
    `Établissements à équiper : ${etablissements}`,
    '',
    'Liste des établissements :',
    liste || 'non fournie',
    '',
    'Message :',
    message || 'aucun',
    '',
    'Répondre à ce mail écrit directement au demandeur. Réponse promise sous 24 h ouvrées.',
  ].join('\n')

  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: 'Swiipx <bonjour@swiipx.fr>',
      to: [DESTINATAIRE],
      replyTo: email,
      subject: `Devis : ${etablissements} établissements, ${entreprise}`.replace(/\s+/g, ' '),
      text: texte,
    })
    if (error) {
      console.error('[Devis] Refus de Resend :', error.message)
      return NextResponse.json({ error: 'Envoi impossible pour le moment. Écrivez-nous à bonjour@swiipx.fr.' }, { status: 502 })
    }
  } catch (e) {
    console.error('[Devis] Erreur d’envoi :', e instanceof Error ? e.message : e)
    return NextResponse.json({ error: 'Envoi impossible pour le moment. Écrivez-nous à bonjour@swiipx.fr.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
