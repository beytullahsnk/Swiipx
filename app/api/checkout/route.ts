import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Product mapping with Stripe product IDs
const PRODUCT_MAP = {
  plaque1: {
    productId: 'prod_TOht805NFJflwU', // prod_TOht805NFJflwU
    name: 'Swiipx — 1 Plaque',
    amountCents: 50, // TEST PROD — remettre à 3990 (39,90€ TTC)
  },
  plaque2: {
    productId: 'prod_TOhuRHDGoAwXmX', // prod_TOhuRHDGoAwXmX
    name: 'Swiipx — 2 Plaques',
    amountCents: 5990, // 59,90€ TTC
  },
  plaque5: {
    productId: 'prod_TOiZBuKlMrDfpR', // prod_TOhuUHZ3CPLbUw
    name: 'Swiipx — 5 Plaques',
    amountCents: 8990, // 89,90€ TTC
  },
} as const

type ProductId = keyof typeof PRODUCT_MAP

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { items, company, shippingMethod, servicePoint } = body

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide ou invalide' },
        { status: 400 }
      )
    }

    // Build line items for Stripe with metadata
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { 
        id: string
        qty: number
        businessInfo?: {
          name?: string
          address?: string
          place_id?: string
          phone?: string
          lat?: number
          lng?: number
        }
      }) => {
        // Validate product ID
        if (!(item.id in PRODUCT_MAP)) {
          throw new Error(`Produit invalide: ${item.id}`)
        }

        const product = PRODUCT_MAP[item.id as ProductId]

        return {
          price_data: {
            currency: 'eur',
            product: product.productId,
            unit_amount: product.amountCents,
          },
          quantity: item.qty,
        }
      }
    )

    // Build metadata: priorité businessInfo du premier item, fallback sur company global
    const firstItem = items[0]
    const biz = firstItem.businessInfo || company || null
    const metadata: Record<string, string> = {}

    if (biz) {
      metadata.business_name = biz.name || ''
      metadata.business_address = biz.address || ''
      metadata.business_place_id = biz.place_id || biz.placeId || ''
      metadata.business_phone = biz.phone || ''
      metadata.business_lat = biz.lat?.toString() || ''
      metadata.business_lng = biz.lng?.toString() || ''
    }

    // Ajouter les infos de livraison
    metadata.shipping_method = shippingMethod || 'domicile'

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

    // Get base URL : env var → request headers (host + protocol) → localhost
    // En prod, même si NEXT_PUBLIC_URL n'est pas configuré, on dérive du header Host
    const envUrl = process.env.NEXT_PUBLIC_URL
    let baseUrl: string
    if (envUrl && !envUrl.includes('localhost')) {
      baseUrl = envUrl
    } else {
      const host = request.headers.get('host') || 'swiipx.fr'
      const proto = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https')
      baseUrl = `${proto}://${host}`
    }

    // Ajouter les frais de livraison à domicile (4,90€)
    if (shippingMethod === 'domicile') {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison à domicile',
          },
          unit_amount: 490, // 4,90€
        },
        quantity: 1,
      })
    }

    // Paramètres de la session Stripe
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      billing_address_collection: 'required',
      payment_method_types: ['card'],
      locale: 'fr',
      metadata: metadata,
      payment_intent_data: {
        metadata: metadata,
      },
    }

    // Collecter l'adresse de livraison uniquement pour la livraison à domicile
    if (shippingMethod !== 'point_relais') {
      sessionParams.shipping_address_collection = {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create(sessionParams)

    // Return checkout URL
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    // En dev, renvoyer le détail de l'erreur Stripe
    const isDev = process.env.NODE_ENV === 'development'
    const errorMessage = isDev
      ? `[Stripe] ${error?.type || 'unknown'}: ${error?.raw?.message || error?.message || 'Erreur inconnue'}`
      : 'Erreur lors de la création de la session de paiement'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

