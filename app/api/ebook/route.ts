import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import EbookDownload from '../../emails/EbookDownload'

// Lazy init — évite crash au build si la clé n'est pas encore configurée
let resend: Resend | null = null
function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY || '')
  }
  return resend
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Rendre le template email en HTML
    const html = await render(EbookDownload({ email }))

    // Envoyer l'email via Resend
    const { data, error } = await getResend().emails.send({
      from: 'Swiipx <bonjour@swiipx.fr>',
      to: email,
      subject: 'Votre guide gratuit — 3x plus d\'avis Google en 30 jours',
      html,
    })

    if (error) {
      console.error('[EBOOK] Erreur Resend:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi' },
        { status: 500 }
      )
    }

    console.log(`[EBOOK] Guide envoyé à ${email} — ID: ${data?.id}`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[EBOOK] Erreur:', err)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
