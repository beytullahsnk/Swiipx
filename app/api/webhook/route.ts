import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import OrderConfirmation from '../../emails/OrderConfirmation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Lazy init — évite crash au build si la clé n'est pas encore configurée
let resend: Resend | null = null
function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY || '')
  }
  return resend
}

// ─── Calcul du poids et choix du shipment ID Sendcloud ──────────────────────
// Poids unitaire par produit (avec enveloppe d'envoi), en grammes
const ITEM_WEIGHT_GRAMS: Record<string, number> = {
  plaque1: 65,   // 1 plaque + enveloppe
  plaque2: 115,  // 2 plaques + enveloppe
  plaque5: 275,  // 5 plaques + enveloppe
}

function calculateOrderWeightKg(itemsJson: string): { kg: string; grams: number } {
  let totalGrams = 0
  try {
    const items = JSON.parse(itemsJson || '[]') as Array<{ id: string; qty: number }>
    for (const item of items) {
      const w = ITEM_WEIGHT_GRAMS[item.id] ?? 100
      totalGrams += w * (item.qty || 1)
    }
  } catch {
    // fallback si parse échoue
    totalGrams = 100
  }
  // Sendcloud attend le poids en kg avec 3 décimales (ex: "0.275")
  return { kg: (totalGrams / 1000).toFixed(3), grams: totalGrams }
}

// Mondial Relay Point Relais (FR domestic) — IDs depuis le compte Sendcloud
function getMondialRelayPointRelaisShipmentId(grams: number): number {
  if (grams <= 250) return 28035   // 0-0.25kg
  if (grams <= 500) return 28036   // 0.25-0.5kg
  if (grams <= 1000) return 28037  // 0.5-1kg
  if (grams <= 2000) return 28038  // 1-2kg
  if (grams <= 3000) return 28039  // 2-3kg
  if (grams <= 5000) return 28040  // 3-5kg
  if (grams <= 7000) return 28041  // 5-7kg
  if (grams <= 10000) return 28042 // 7-10kg
  return 28043                      // 10-15kg (fallback haut)
}

// Colissimo Home (FR domestic) — IDs depuis le compte Sendcloud
function getColissimoHomeShipmentId(grams: number): number {
  if (grams <= 250) return 371    // 0-0.25kg
  if (grams <= 500) return 366    // 0.25-0.5kg
  if (grams <= 750) return 367    // 0.5-0.75kg
  if (grams <= 1000) return 364   // 0.75-1kg
  if (grams <= 2000) return 1066  // 1-2kg
  if (grams <= 3000) return 1067  // 2-3kg
  if (grams <= 5000) return 1069  // 4-5kg (approx)
  return 1074                      // 9-10kg (fallback haut)
}

// Sendcloud API helper
async function createSendcloudParcel(
  shipping: Stripe.Checkout.Session.ShippingDetails,
  customerEmail: string,
  orderNumber: string,
  customerPhone?: string,
  itemsJson?: string
) {
  const publicKey = process.env.SENDCLOUD_PUBLIC_KEY
  const secretKey = process.env.SENDCLOUD_SECRET_KEY

  if (!publicKey || !secretKey) {
    console.error('[Sendcloud domicile] Missing API keys (SENDCLOUD_PUBLIC_KEY or SENDCLOUD_SECRET_KEY)')
    return null
  }

  // Calcul dynamique du poids et choix de la tranche Colissimo
  const { kg, grams } = calculateOrderWeightKg(itemsJson || '[]')
  const shipmentId = getColissimoHomeShipmentId(grams)
  console.log(`[Sendcloud domicile] Weight: ${grams}g (${kg}kg) → shipment ID ${shipmentId}`)

  const parcelData = {
    parcel: {
      name: shipping.name || 'Client',
      company_name: '',
      address: shipping.address?.line1 || '',
      address_2: shipping.address?.line2 || '',
      city: shipping.address?.city || '',
      postal_code: shipping.address?.postal_code || '',
      country: shipping.address?.country || 'FR',
      email: customerEmail,
      telephone: customerPhone || '',
      order_number: orderNumber,
      weight: kg,
      request_label: false,
      shipment: {
        id: shipmentId,
      },
    },
  }

  try {
    const response = await fetch('https://panel.sendcloud.sc/api/v2/parcels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${publicKey}:${secretKey}`).toString('base64')}`,
      },
      body: JSON.stringify(parcelData),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[Sendcloud domicile] HTTP', response.status, JSON.stringify(data))
      return null
    }

    return data.parcel
  } catch (error: any) {
    console.error('[Sendcloud domicile] Network error:', error?.message || error)
    return null
  }
}

// Sendcloud API helper — Point Relais (Mondial Relay)
async function createSendcloudServicePointParcel(metadata: Record<string, string>, customerEmail: string, orderNumber: string) {
  const publicKey = process.env.NEXT_PUBLIC_SENDCLOUD_PUBLIC_KEY || process.env.SENDCLOUD_PUBLIC_KEY
  const secretKey = process.env.SENDCLOUD_SECRET_KEY

  if (!publicKey || !secretKey) {
    console.error('[Sendcloud point-relais] Missing API keys (SENDCLOUD_PUBLIC_KEY or SENDCLOUD_SECRET_KEY)')
    return null
  }

  // Calcul dynamique du poids et choix de la tranche Mondial Relay
  const { kg, grams } = calculateOrderWeightKg(metadata.items || '[]')
  const shipmentId = getMondialRelayPointRelaisShipmentId(grams)
  console.log(`[Sendcloud point-relais] Weight: ${grams}g (${kg}kg) → shipment ID ${shipmentId}`)

  const parcelData = {
    parcel: {
      // Pour un point relais, le "name" du parcel doit rester celui du destinataire (le client),
      // pas celui du point relais — le transporteur a besoin de savoir qui doit récupérer.
      name: metadata.customer_name || metadata.sp_name || 'Client',
      company_name: '',
      address: metadata.sp_street || '',
      address_2: metadata.sp_house_number || '',
      city: metadata.sp_city || '',
      postal_code: metadata.sp_postal_code || '',
      country: metadata.sp_country || 'FR',
      email: customerEmail,
      telephone: metadata.customer_phone || '',
      order_number: orderNumber,
      weight: kg,
      request_label: false,
      to_service_point: parseInt(metadata.sp_id),
      shipment: {
        id: shipmentId,
      },
    },
  }

  try {
    const response = await fetch('https://panel.sendcloud.sc/api/v2/parcels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${publicKey}:${secretKey}`).toString('base64')}`,
      },
      body: JSON.stringify(parcelData),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[Sendcloud point-relais] HTTP', response.status, JSON.stringify(data))
      return null
    }

    return data.parcel
  } catch (error: any) {
    console.error('[Sendcloud point-relais] Network error:', error?.message || error)
    return null
  }
}

// Disable body parsing — Stripe webhook needs raw body
export const runtime = 'nodejs'
// Vercel : laisse le temps au webhook de faire Resend + Sendcloud (défaut = 10s)
export const maxDuration = 30
// Toujours exécuté à la demande, jamais mis en cache
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  console.log('[Webhook] Received POST request, signature present:', !!signature)

  if (!signature) {
    console.error('[Webhook] Missing signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET env var is missing')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('[Webhook] Invalid signature:', err?.message || err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log('[Webhook] Event received:', event.type, '| ID:', event.id)

  // ─── Handler pour le checkout custom (PaymentIntent) ─────────────────────
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const metadata = paymentIntent.metadata || {}

    console.log('[Webhook] payment_intent.succeeded | PI:', paymentIntent.id, '| Amount:', paymentIntent.amount, '| Metadata keys:', Object.keys(metadata).join(','))

    try {
      const customerEmail = metadata.customer_email || paymentIntent.receipt_email
      const customerName = metadata.customer_name || 'Client'

      console.log('[Webhook] customerEmail:', customerEmail ? `${customerEmail.slice(0, 3)}***` : 'MISSING', '| receipt_email:', paymentIntent.receipt_email ? 'present' : 'missing')

      if (!customerEmail) {
        console.warn('[Webhook] No customer email — skipping email + sendcloud. PI metadata:', JSON.stringify(metadata))
        return NextResponse.json({ received: true })
      }

      // Reconstruire les items depuis les metadata
      let items = [{ name: 'Plaque Swiipx', quantity: 1, amount: paymentIntent.amount }]
      try {
        const parsedItems = JSON.parse(metadata.items || '[]')
        const PRODUCT_NAMES: Record<string, string> = {
          plaque1: 'Swiipx — 1 Plaque',
          plaque2: 'Swiipx — 2 Plaques',
          plaque5: 'Swiipx — 5 Plaques',
        }
        const PRODUCT_PRICES: Record<string, number> = {
          plaque1: 3990,
          plaque2: 5990,
          plaque5: 8990,
        }
        if (parsedItems.length > 0) {
          items = parsedItems.map((i: any) => ({
            name: PRODUCT_NAMES[i.id] || 'Plaque Swiipx',
            quantity: i.qty || 1,
            amount: (PRODUCT_PRICES[i.id] || 0) * (i.qty || 1),
          }))
        }
      } catch {}

      const businessName = metadata.business_name || ''
      const businessAddress = metadata.business_address || ''
      const shippingMethod = metadata.shipping_method || 'domicile'

      // Construire l'adresse de livraison
      let shippingAddress = ''
      if (shippingMethod === 'point_relais') {
        shippingAddress = `Point Relais : ${metadata.sp_name || ''}, ${metadata.sp_street || ''} ${metadata.sp_house_number || ''}, ${metadata.sp_postal_code || ''} ${metadata.sp_city || ''}`
      } else {
        shippingAddress = [
          metadata.shipping_name,
          metadata.shipping_line1,
          metadata.shipping_line2,
          `${metadata.shipping_postal_code || ''} ${metadata.shipping_city || ''}`,
          metadata.shipping_country,
        ].filter(Boolean).join(', ')
      }

      // 1. Email de confirmation (isolé : si Resend échoue, on continue avec Sendcloud)
      console.log('[Webhook] Sending confirmation email via Resend...')
      try {
        if (!process.env.RESEND_API_KEY) {
          console.error('[Webhook] RESEND_API_KEY env var is missing')
        } else {
          const emailHtml = await render(OrderConfirmation({
            customerName,
            businessName,
            businessAddress,
            items,
            totalAmount: paymentIntent.amount,
            shippingAddress,
          }))
          const { data: resendData, error: resendError } = await getResend().emails.send({
            from: 'Swiipx <bonjour@swiipx.fr>',
            to: customerEmail,
            subject: 'Commande confirmée — Swiipx',
            html: emailHtml,
          })
          if (resendError) {
            console.error('[Webhook] Resend error:', JSON.stringify(resendError))
          } else {
            console.log('[Webhook] Resend OK — email ID:', resendData?.id)
          }
        }
      } catch (emailErr: any) {
        console.error('[Webhook] Email render/send failed:', emailErr?.message || emailErr)
      }

      // 2. Créer le colis Sendcloud (isolé : indépendant de l'email)
      const orderNumber = `SW-${paymentIntent.id.slice(-8).toUpperCase()}`
      console.log('[Webhook] Creating Sendcloud parcel | order:', orderNumber, '| method:', shippingMethod)
      try {
        if (shippingMethod === 'point_relais' && metadata.sp_id) {
          await createSendcloudServicePointParcel(metadata, customerEmail, orderNumber)
        } else if (shippingMethod === 'domicile' && metadata.shipping_line1) {
          const shippingDetails = {
            name: metadata.shipping_name || customerName,
            address: {
              line1: metadata.shipping_line1 || '',
              line2: metadata.shipping_line2 || '',
              city: metadata.shipping_city || '',
              postal_code: metadata.shipping_postal_code || '',
              country: metadata.shipping_country || 'FR',
            },
          } as Stripe.Checkout.Session.ShippingDetails
          await createSendcloudParcel(shippingDetails, customerEmail, orderNumber, metadata.customer_phone, metadata.items)
        } else {
          console.warn(`[Webhook] No shipping data for order ${orderNumber} (method=${shippingMethod})`)
        }
      } catch (parcelErr: any) {
        console.error('[Webhook] Sendcloud parcel creation failed:', parcelErr?.message || parcelErr)
      }

    } catch (error: any) {
      console.error('[Webhook] Order processing error:', error?.message || error)
    }
  }

  // ─── Handler legacy pour Stripe Checkout (rétrocompatibilité) ───────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name || 'Client'

      if (!customerEmail) {
        return NextResponse.json({ received: true })
      }

      let items = [{ name: 'Plaque Swiipx', quantity: 1, amount: session.amount_total || 0 }]
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        if (lineItems.data.length > 0) {
          items = lineItems.data.map((item) => ({
            name: item.description || 'Plaque Swiipx',
            quantity: item.quantity || 1,
            amount: item.amount_total || 0,
          }))
        }
      } catch {}

      const businessName = session.metadata?.business_name || ''
      const businessAddress = session.metadata?.business_address || ''
      const shippingMethod = session.metadata?.shipping_method || 'domicile'

      const shipping = session.shipping_details
      let shippingAddress = ''

      if (shippingMethod === 'point_relais') {
        shippingAddress = `Point Relais : ${session.metadata?.sp_name || ''}, ${session.metadata?.sp_street || ''} ${session.metadata?.sp_house_number || ''}, ${session.metadata?.sp_postal_code || ''} ${session.metadata?.sp_city || ''}`
      } else if (shipping) {
        shippingAddress = [
          shipping.name,
          shipping.address?.line1,
          shipping.address?.line2,
          `${shipping.address?.postal_code} ${shipping.address?.city}`,
          shipping.address?.country,
        ].filter(Boolean).join(', ')
      }

      // Email isolé
      try {
        const emailHtml = await render(OrderConfirmation({
          customerName,
          businessName,
          businessAddress,
          items,
          totalAmount: session.amount_total || 0,
          shippingAddress,
        }))
        const { error: resendError } = await getResend().emails.send({
          from: 'Swiipx <bonjour@swiipx.fr>',
          to: customerEmail,
          subject: 'Commande confirmée — Swiipx',
          html: emailHtml,
        })
        if (resendError) {
          console.error('[Webhook legacy] Resend error:', resendError)
        }
      } catch (emailErr: any) {
        console.error('[Webhook legacy] Email render/send failed:', emailErr?.message || emailErr)
      }

      // Sendcloud isolé
      const orderNumber = `SW-${session.id.slice(-8).toUpperCase()}`
      // Récupérer le téléphone depuis customer_details Stripe (legacy mode collecte le téléphone)
      const customerPhone = session.customer_details?.phone || session.metadata?.customer_phone || undefined
      try {
        if (shippingMethod === 'point_relais' && session.metadata?.sp_id) {
          // Pour le legacy, on enrichit metadata avec customer_phone si dispo
          const enrichedMetadata = { ...session.metadata, customer_phone: customerPhone || session.metadata?.customer_phone || '' }
          await createSendcloudServicePointParcel(enrichedMetadata, customerEmail, orderNumber)
        } else if (shipping) {
          await createSendcloudParcel(shipping, customerEmail, orderNumber, customerPhone, session.metadata?.items)
        }
      } catch (parcelErr: any) {
        console.error('[Webhook legacy] Sendcloud parcel creation failed:', parcelErr?.message || parcelErr)
      }

    } catch (error: any) {
      console.error('[Webhook] Order processing error:', error?.message || error)
    }
  }

  return NextResponse.json({ received: true })
}
