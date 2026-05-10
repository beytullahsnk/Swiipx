import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const PRODUCT_MAP: Record<string, { amountCents: number }> = {
  plaque1: { amountCents: 3990 },
  plaque2: { amountCents: 5990 },
  plaque5: { amountCents: 8990 },
}

const SHIPPING_DOMICILE_CENTS = 490

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      paymentIntentId,
      items,
      shippingMethod,
      servicePoint,
      customer,
      billingAddress,
      shippingAddress,
      business,
    } = body

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'PaymentIntent ID manquant' }, { status: 400 })
    }

    // Recalculer le montant total
    let totalCents = 0
    for (const item of items || []) {
      const product = PRODUCT_MAP[item.id]
      if (product) {
        totalCents += product.amountCents * (item.qty || 1)
      }
    }
    if (shippingMethod === 'domicile') {
      totalCents += SHIPPING_DOMICILE_CENTS
    }

    // Construire les metadata
    const metadata: Record<string, string> = {
      shipping_method: shippingMethod || 'point_relais',
      items: JSON.stringify((items || []).map((i: any) => ({ id: i.id, qty: i.qty }))),
    }

    // Customer info
    if (customer) {
      metadata.customer_email = customer.email || ''
      metadata.customer_name = customer.name || ''
      metadata.customer_phone = customer.phone || ''
    }

    // Business info
    if (business) {
      metadata.business_name = business.name || ''
      metadata.business_address = business.address || ''
      metadata.business_place_id = business.placeId || business.place_id || ''
      metadata.business_phone = business.phone || ''
      metadata.business_lat = business.lat?.toString() || ''
      metadata.business_lng = business.lng?.toString() || ''
    }

    // Service Point info
    if (shippingMethod === 'point_relais' && servicePoint) {
      metadata.sp_id = servicePoint.id || ''
      metadata.sp_name = servicePoint.name || ''
      metadata.sp_carrier = servicePoint.carrier || ''
      metadata.sp_street = servicePoint.street || ''
      metadata.sp_house_number = servicePoint.houseNumber || ''
      metadata.sp_postal_code = servicePoint.postalCode || ''
      metadata.sp_city = servicePoint.city || ''
      metadata.sp_country = servicePoint.country || ''
      metadata.sp_post_number = servicePoint.postNumber || ''
    }

    // Billing address
    if (billingAddress) {
      metadata.billing_line1 = billingAddress.line1 || ''
      metadata.billing_line2 = billingAddress.line2 || ''
      metadata.billing_city = billingAddress.city || ''
      metadata.billing_postal_code = billingAddress.postalCode || ''
      metadata.billing_country = billingAddress.country || 'FR'
    }

    // Shipping address (domicile)
    if (shippingMethod === 'domicile' && shippingAddress) {
      metadata.shipping_name = shippingAddress.name || ''
      metadata.shipping_line1 = shippingAddress.line1 || ''
      metadata.shipping_line2 = shippingAddress.line2 || ''
      metadata.shipping_city = shippingAddress.city || ''
      metadata.shipping_postal_code = shippingAddress.postalCode || ''
      metadata.shipping_country = shippingAddress.country || 'FR'
    }

    // Mettre à jour le PaymentIntent
    await stripe.paymentIntents.update(paymentIntentId, {
      amount: totalCents,
      metadata,
      receipt_email: customer?.email || undefined,
      shipping: shippingMethod === 'domicile' && shippingAddress ? {
        name: shippingAddress.name || customer?.name || '',
        address: {
          line1: shippingAddress.line1 || '',
          line2: shippingAddress.line2 || '',
          city: shippingAddress.city || '',
          postal_code: shippingAddress.postalCode || '',
          country: shippingAddress.country || 'FR',
        },
      } : undefined,
    })

    return NextResponse.json({ success: true, amount: totalCents })
  } catch (error: any) {
    const isDev = process.env.NODE_ENV === 'development'
    return NextResponse.json(
      { error: isDev ? error.message : 'Erreur lors de la mise à jour du paiement' },
      { status: 500 }
    )
  }
}
