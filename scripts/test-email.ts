// Script de test — lance avec: npx tsx scripts/test-email.ts
import React from 'react'
import { Resend } from 'resend'
import { render } from '@react-email/components'
import OrderConfirmation from '../app/emails/OrderConfirmation'

const resend = new Resend('re_GLo1DwLC_3gcmbc7BnFPKwZzcVX27UyZt')

async function main() {
  const emailHtml = await render(
    React.createElement(OrderConfirmation, {
      customerName: 'Beytullah',
      businessName: 'Chicken City',
      businessAddress: '9 Pl. de l\'Église, 41500 Mer, France',
      items: [
        { name: 'Swiipx — 2 Plaques', quantity: 1, amount: 5990 },
        { name: 'Swiipx — 5 Plaques', quantity: 1, amount: 8990 },
      ],
      totalAmount: 14980,
      shippingAddress: 'Beytullah Sonkaya, 9 Rue Marcel Sembat, 93100 Montreuil, FR',
    })
  )

  const { data, error } = await resend.emails.send({
    from: 'Swiipx Test <onboarding@resend.dev>',
    to: ['bonjour@swiipx.fr', 'beytullahsonkaya@gmail.com'],
    subject: '[TEST] Commande confirmée — Swiipx',
    html: emailHtml,
  })

  if (error) {
    console.error('❌ Erreur:', error)
  } else {
    console.log('✅ Email envoyé ! Vérifie ta boîte bonjour@swiipx.fr')
    console.log('ID:', data)
  }
}

main()
