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
      return null
    }

    return data.parcel
  } catch (error) {
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
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Get customer email and name
      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name || 'Client'

      if (!customerEmail) {
        return NextResponse.json({ received: true })
      }

      // Get line items from Stripe (avec fallback si ça échoue)
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
      } catch (lineItemsError: any) {
        // Utilisation du fallback par défaut
      }

      // Get business info from metadata
      const businessName = session.metadata?.business_name || ''
      const businessAddress = session.metadata?.business_address || ''

      // Get shipping address
      const shipping = session.shipping_details

      const shippingAddress = shipping
        ? [
            shipping.name,
            shipping.address?.line1,
            shipping.address?.line2,
            `${shipping.address?.postal_code} ${shipping.address?.city}`,
            shipping.address?.country,
          ]
            .filter(Boolean)
            .join(', ')
        : ''

      // 1. Send confirmation email via Resend
      const emailHtml = await render(OrderConfirmation({
        customerName,
        businessName,
        businessAddress,
        items,
        totalAmount: session.amount_total || 0,
        shippingAddress,
      }))
      await getResend().emails.send({
        from: 'Swiipx <bonjour@swiipx.fr>',
        to: customerEmail,
        subject: 'Commande confirmée — Swiipx',
        html: emailHtml,
      })

      // 2. Créer le colis sur Sendcloud
      if (shipping) {
        const orderNumber = `SW-${session.id.slice(-8).toUpperCase()}`
        await createSendcloudParcel(shipping, customerEmail, orderNumber)
      }

    } catch (error: any) {
      // Erreur silencieuse côté serveur — ne pas exposer les détails
    }
  }

  return NextResponse.json({ received: true })
}
