import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PACKS, type PackId } from '@/lib/pricing'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Prix : source unique dans lib/pricing.ts (jamais de montant en dur ici,
// sinon le client peut être débité d'un montant différent de l'affiché).
const PRODUCT_MAP = PACKS

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
      const product = PRODUCT_MAP[item.id as PackId]
      if (!product) {
        return NextResponse.json({ error: `Produit invalide: ${item.id}` }, { status: 400 })
      }
      totalCents += product.priceCents * (item.qty || 1)
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
