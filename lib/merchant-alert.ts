/**
 * Notification de commande envoyée au marchand.
 *
 * POURQUOI CE FICHIER EXISTE : le webhook envoyait un email de confirmation au
 * CLIENT et créait le colis Sendcloud, mais n'avertissait personne côté Swiipx.
 * Les échecs (Sendcloud indisponible, clé expirée, adresse refusée, email
 * client absent des métadonnées) partaient uniquement dans les logs Vercel.
 *
 * Le scénario redouté : le client paie, reçoit « Commande confirmée », le colis
 * n'est jamais créé, et personne ne s'en aperçoit avant sa réclamation.
 *
 * Cet email part donc à CHAQUE commande payée, y compris — et surtout — quand
 * quelque chose a échoué. Il contient tout le nécessaire pour traiter la
 * commande à la main : l'établissement à programmer et l'adresse d'expédition.
 */

export interface MerchantAlertInput {
  orderNumber: string
  amountCents: number
  paymentIntentId: string
  /** Métadonnées Stripe brutes de la commande. */
  metadata: Record<string, string>
  items: { name: string; quantity: number; amount: number }[]
  /** Résultat de la création du colis. */
  parcel: { ok: boolean; detail?: string }
  /** Résultat de l'email de confirmation client. */
  customerEmailSent: boolean
}

const echappe = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const euros = (cents: number) => `${(cents / 100).toFixed(2).replace('.', ',')} €`

function ligne(label: string, valeur: string | undefined, important = false) {
  if (!valeur) return ''
  const style = important
    ? 'font-weight:700;color:#111827;font-size:15px'
    : 'color:#374151'
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${echappe(label)}</td>
    <td style="padding:6px 0;${style};font-size:14px">${echappe(valeur)}</td>
  </tr>`
}

/** Corps HTML de la notification marchand. */
export function buildMerchantAlertHtml(input: MerchantAlertInput): string {
  const { orderNumber, amountCents, paymentIntentId, metadata: m, items, parcel, customerEmailSent } = input

  const problemes: string[] = []
  if (!parcel.ok) problemes.push(`Le colis Sendcloud n'a PAS été créé${parcel.detail ? ` — ${parcel.detail}` : ''}. À créer à la main.`)
  if (!customerEmailSent) problemes.push("L'email de confirmation n'est PAS parti chez le client. À renvoyer à la main.")
  if (!m.business_place_id) problemes.push("Aucun établissement Google n'est rattaché : impossible de savoir quel lien d'avis programmer. Contacter le client.")

  const modeLivraison = m.shipping_method === 'point_relais' ? 'Point relais' : 'Domicile'

  const adresse =
    m.shipping_method === 'point_relais'
      ? [m.sp_name, `${m.sp_street || ''} ${m.sp_house_number || ''}`.trim(), `${m.sp_postal_code || ''} ${m.sp_city || ''}`.trim(), m.sp_carrier ? `(${m.sp_carrier})` : '']
          .filter(Boolean).join(' · ')
      : [m.shipping_name, m.shipping_line1, m.shipping_line2, `${m.shipping_postal_code || ''} ${m.shipping_city || ''}`.trim(), m.shipping_country]
          .filter(Boolean).join(', ')

  const facturation = [m.billing_line1, m.billing_line2, `${m.billing_postal_code || ''} ${m.billing_city || ''}`.trim(), m.billing_country]
    .filter(Boolean).join(', ')

  const lignesArticles = items
    .map((i) => `<li style="margin:0 0 4px">${echappe(i.name)} × ${i.quantity} — ${euros(i.amount)}</li>`)
    .join('')

  const bandeauAlerte = problemes.length
    ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-left:4px solid #dc2626;border-radius:8px;padding:14px 16px;margin:0 0 20px">
         <p style="margin:0 0 8px;font-weight:700;color:#991b1b;font-size:15px">Action requise</p>
         <ul style="margin:0;padding-left:18px;color:#7f1d1d;font-size:14px;line-height:1.6">
           ${problemes.map((p) => `<li>${echappe(p)}</li>`).join('')}
         </ul>
       </div>`
    : `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;margin:0 0 20px;color:#166534;font-size:14px">
         Colis créé et email client envoyé. Rien à faire, sauf la programmation de la plaque.
       </div>`

  return `<!doctype html>
<html lang="fr"><body style="margin:0;padding:24px;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px">

    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;font-weight:600">Nouvelle commande</p>
    <h1 style="margin:0 0 2px;font-size:24px;color:#111827">${echappe(orderNumber)}</h1>
    <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#2563EB">${euros(amountCents)}</p>

    ${bandeauAlerte}

    <h2 style="margin:0 0 8px;font-size:15px;color:#111827;border-bottom:2px solid #2563EB;padding-bottom:6px;display:inline-block">
      Établissement à programmer
    </h2>
    <table style="width:100%;border-collapse:collapse;margin:8px 0 20px">
      ${ligne('Nom', m.business_name, true)}
      ${ligne('Adresse', m.business_address)}
      ${ligne('Place ID', m.business_place_id, true)}
      ${ligne('Téléphone', m.business_phone)}
    </table>

    <h2 style="margin:0 0 8px;font-size:15px;color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:6px;display:inline-block">
      Expédition — ${echappe(modeLivraison)}
    </h2>
    <table style="width:100%;border-collapse:collapse;margin:8px 0 20px">
      ${ligne('Destination', adresse, true)}
      ${m.shipping_method === 'point_relais' ? ligne('ID point relais', m.sp_id) : ''}
    </table>

    <h2 style="margin:0 0 8px;font-size:15px;color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:6px;display:inline-block">
      Client
    </h2>
    <table style="width:100%;border-collapse:collapse;margin:8px 0 20px">
      ${ligne('Nom', m.customer_name)}
      ${ligne('Email', m.customer_email)}
      ${ligne('Téléphone', m.customer_phone)}
      ${ligne('Facturation', facturation)}
    </table>

    <h2 style="margin:0 0 8px;font-size:15px;color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:6px;display:inline-block">
      Articles
    </h2>
    <ul style="margin:8px 0 12px;padding-left:18px;color:#374151;font-size:14px">${lignesArticles}</ul>

    ${m.option_remplacement === 'oui'
      ? `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 14px;margin:0 0 20px;color:#1e40af;font-size:14px">
           <strong>Option souscrite&nbsp;:</strong> remplacement en cas de casse, perte ou vol.
           A honorer si le client le demande.
         </div>`
      : ''}

    <p style="margin:0;padding-top:14px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px">
      Paiement Stripe&nbsp;: <a href="https://dashboard.stripe.com/payments/${echappe(paymentIntentId)}" style="color:#6b7280">${echappe(paymentIntentId)}</a>
    </p>
  </div>
</body></html>`
}

/** Objet de l'email : l'alerte doit être lisible sans ouvrir le message. */
export function buildMerchantAlertSubject(input: MerchantAlertInput): string {
  const enEchec = !input.parcel.ok || !input.customerEmailSent || !input.metadata.business_place_id
  const prefixe = enEchec ? '[ACTION REQUISE] ' : ''
  return `${prefixe}Commande ${input.orderNumber} — ${euros(input.amountCents)}`
}

/** Destinataire de la notification. */
export const MERCHANT_EMAIL = process.env.MERCHANT_EMAIL || 'bonjour@swiipx.fr'
