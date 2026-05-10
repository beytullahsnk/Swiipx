import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Product mapping
const PRODUCT_MAP: Record<string, { name: string; amountCents: number }> = {
  plaque1: { name: 'Swiipx — 1 Plaque', amountCents: 3990 },
  plaque2: { name: 'Swiipx — 2 Plaques', amountCents: 5990 },
  plaque5: { name: 'Swiipx — 5 Plaques', amountCents: 8990 },
}

const SHIPPING_DOMICILE_CENTS = 490

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, shippingMethod } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide ou invalide' }, { status: 400 })
    }

    // Calculer le montant total
    let totalCents = 0
    const itemDescriptions: string[] = []

    for (const item of items) {
      const product = PRODUCT_MAP[item.id]
      if (!product) {
        return NextResponse.json({ error: `Produit invalide: ${item.id}` }, { status: 400 })
      }
      totalCents += product.amountCents * (item.qty || 1)
      itemDescriptions.push(`${product.name} x${item.qty || 1}`)
    }

    // Ajouter les frais de livraison à domicile
    if (shippingMethod === 'domicile') {
      totalCents += SHIPPING_DOMICILE_CENTS
    }

    // Créer le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items.map((i: any) => ({ id: i.id, qty: i.qty }))),
        items_description: itemDescriptions.join(', '),
        shipping_method: shippingMethod || 'point_relais',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalCents,
    })
  } catch (error: any) {
    const isDev = process.env.NODE_ENV === 'development'
    return NextResponse.json(
      { error: isDev ? error.message : 'Erreur lors de la création du paiement' },
      { status: 500 }
    )
  }
}
