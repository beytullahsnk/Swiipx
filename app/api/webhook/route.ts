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

// Sendcloud API helper
async function createSendcloudParcel(shipping: Stripe.Checkout.Session.ShippingDetails, customerEmail: string, orderNumber: string) {
  const publicKey = process.env.SENDCLOUD_PUBLIC_KEY
  const secretKey = process.env.SENDCLOUD_SECRET_KEY

  if (!publicKey || !secretKey) {
    return null
  }

  // Parse le nom en prénom/nom
  const nameParts = (shipping.name || 'Client').split(' ')
  const firstName = nameParts[0] || 'Client'
  const lastName = nameParts.slice(1).join(' ') || '-'

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
      telephone: '',
      order_number: orderNumber,
      weight: '0.100', // 100g — poids d'une plaque NFC
      request_label: false, // Ne pas générer l'étiquette automatiquement
      shipment: {
        id: 8, // Colissimo domicile (tu pourras changer l'ID selon le transporteur)
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
  const publicKey = process.env.SENDCLOUD_PUBLIC_KEY
  const secretKey = process.env.SENDCLOUD_SECRET_KEY

  if (!publicKey || !secretKey) {
    return null
  }

  const parcelData = {
    parcel: {
      name: metadata.sp_name || 'Client',
      company_name: '',
      address: metadata.sp_street || '',
      address_2: metadata.sp_house_number || '',
      city: metadata.sp_city || '',
      postal_code: metadata.sp_postal_code || '',
      country: metadata.sp_country || 'FR',
      email: customerEmail,
      telephone: '',
      order_number: orderNumber,
      weight: '0.100',
      request_label: false,
      to_service_point: parseInt(metadata.sp_id),
      shipment: {
        id: 465, // Mondial Relay — vérifier l'ID dans le dashboard Sendcloud
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

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
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

  // ─── Handler pour le checkout custom (PaymentIntent) ─────────────────────
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const metadata = paymentIntent.metadata || {}

    try {
      const customerEmail = metadata.customer_email || paymentIntent.receipt_email
      const customerName = metadata.customer_name || 'Client'

      if (!customerEmail) {
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
          plaque1: 50, // TEST PROD — remettre à 3990
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
      try {
        const emailHtml = await render(OrderConfirmation({
          customerName,
          businessName,
          businessAddress,
          items,
          totalAmount: paymentIntent.amount,
          shippingAddress,
        }))
        const { error: resendError } = await getResend().emails.send({
          from: 'Swiipx <bonjour@swiipx.fr>',
          to: customerEmail,
          subject: 'Commande confirmée — Swiipx',
          html: emailHtml,
        })
        if (resendError) {
          console.error('[Webhook] Resend error:', resendError)
        }
      } catch (emailErr: any) {
        console.error('[Webhook] Email render/send failed:', emailErr?.message || emailErr)
      }

      // 2. Créer le colis Sendcloud (isolé : indépendant de l'email)
      const orderNumber = `SW-${paymentIntent.id.slice(-8).toUpperCase()}`
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
          await createSendcloudParcel(shippingDetails, customerEmail, orderNumber)
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
      try {
        if (shippingMethod === 'point_relais' && session.metadata?.sp_id) {
          await createSendcloudServicePointParcel(session.metadata!, customerEmail, orderNumber)
        } else if (shipping) {
          await createSendcloudParcel(shipping, customerEmail, orderNumber)
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
