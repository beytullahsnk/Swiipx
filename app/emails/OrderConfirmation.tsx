import React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
  Link,
} from '@react-email/components'

interface OrderItem {
  name: string
  quantity: number
  amount: number
}

interface OrderConfirmationProps {
  customerName: string
  businessName?: string
  businessAddress?: string
  items: OrderItem[]
  totalAmount: number
  shippingAddress?: string
}

export default function OrderConfirmation({
  customerName = 'Client',
  businessName,
  businessAddress,
  items = [],
  totalAmount = 0,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>

          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://swiipx.fr/logo.png"
              width="120"
              alt="Swiipx"
              style={logo}
            />
          </Section>

          {/* Header */}
          <Text style={heading}>Commande confirmée</Text>
          <Text style={paragraph}>
            Bonjour {customerName},
          </Text>
          <Text style={paragraph}>
            Merci pour votre commande. Elle sera expédiée sous 24h.
          </Text>

          <Hr style={hr} />

          {/* Products */}
          <Text style={subheading}>Récapitulatif</Text>
          {items.map((item, i) => (
            <Section key={i} style={itemRow}>
              <Text style={itemName}>{item.name} × {item.quantity}</Text>
              <Text style={itemPrice}>{(item.amount / 100).toFixed(2).replace('.', ',')} €</Text>
            </Section>
          ))}

          <Hr style={hr} />

          <Section style={itemRow}>
            <Text style={totalLabel}>Total</Text>
            <Text style={totalValue}>{(totalAmount / 100).toFixed(2).replace('.', ',')} €</Text>
          </Section>

          <Hr style={hr} />

          {/* Business info */}
          {businessName && (
            <>
              <Text style={subheading}>Entreprise associée</Text>
              <Text style={paragraph}>{businessName}</Text>
              {businessAddress && <Text style={smallText}>{businessAddress}</Text>}
              <Hr style={hr} />
            </>
          )}

          {/* Shipping */}
          {shippingAddress && (
            <>
              <Text style={subheading}>Adresse de livraison</Text>
              <Text style={paragraph}>{shippingAddress}</Text>
              <Hr style={hr} />
            </>
          )}

          {/* Next steps */}
          <Text style={subheading}>Prochaines étapes</Text>
          <Text style={paragraph}>
            1. Vous recevrez un email avec votre numéro de suivi dès l&apos;expédition.
          </Text>
          <Text style={paragraph}>
            2. Livraison estimée sous 2-3 jours ouvrés.
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footer}>
            Une question ?{' '}
            <Link href="https://swiipx.fr/contact" style={link}>
              Contactez-nous
            </Link>
          </Text>
          <Text style={footer}>
            Swiipx — La plaque NFC pour booster vos avis Google
          </Text>
          <Text style={footerSmall}>
            swiipx.fr
          </Text>

        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '40px 32px',
  maxWidth: '520px',
  borderRadius: '8px',
}

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '24px',
}

const logo = {
  margin: '0 auto',
}

const heading = {
  fontSize: '22px',
  fontWeight: '700' as const,
  color: '#111827',
  textAlign: 'center' as const,
  margin: '0 0 16px',
}

const subheading = {
  fontSize: '14px',
  fontWeight: '600' as const,
  color: '#111827',
  margin: '0 0 8px',
}

const paragraph = {
  fontSize: '14px',
  color: '#4b5563',
  lineHeight: '24px',
  margin: '0 0 8px',
}

const smallText = {
  fontSize: '13px',
  color: '#6b7280',
  margin: '0 0 8px',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
}

const itemRow = {
  display: 'flex' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
}

const itemName = {
  fontSize: '14px',
  color: '#374151',
  margin: '0',
}

const itemPrice = {
  fontSize: '14px',
  color: '#374151',
  fontWeight: '600' as const,
  margin: '0',
  textAlign: 'right' as const,
}

const totalLabel = {
  fontSize: '15px',
  fontWeight: '700' as const,
  color: '#111827',
  margin: '0',
}

const totalValue = {
  fontSize: '15px',
  fontWeight: '700' as const,
  color: '#111827',
  margin: '0',
  textAlign: 'right' as const,
}

const footer = {
  fontSize: '13px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '0 0 4px',
}

const footerSmall = {
  fontSize: '11px',
  color: '#9ca3af',
  textAlign: 'center' as const,
  margin: '8px 0 0',
}

const link = {
  color: '#2563eb',
  textDecoration: 'underline' as const,
}
