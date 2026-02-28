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

interface EbookDownloadProps {
  email: string
}

export default function EbookDownload({ email }: EbookDownloadProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Logo */}
          <Section style={styles.logoSection}>
            <Img
              src="https://swiipx.fr/logo.png"
              width="120"
              alt="Swiipx"
              style={styles.logo}
            />
          </Section>

          {/* Header */}
          <Text style={styles.title}>
            Votre guide est prêt !
          </Text>

          <Text style={styles.text}>
            Merci pour votre intérêt ! Voici votre e-book gratuit :
          </Text>

          <Text style={styles.highlight}>
            &laquo; 3x plus d&apos;avis Google en 30 jours &raquo;
          </Text>

          {/* Contenu du guide */}
          <Section style={styles.guideBox}>
            <Text style={styles.guideTitle}>Ce que vous allez apprendre :</Text>
            <Text style={styles.guideItem}>1. Optimiser votre fiche Google Business Profile</Text>
            <Text style={styles.guideItem}>2. Les 4 scripts pour demander un avis naturellement</Text>
            <Text style={styles.guideItem}>3. Comment utiliser une plaque NFC pour automatiser la collecte</Text>
            <Text style={styles.guideItem}>4. Répondre aux avis (positifs et négatifs)</Text>
            <Text style={styles.guideItem}>5. Plan d&apos;action semaine par semaine</Text>
          </Section>

          <Text style={styles.text}>
            Le guide complet est disponible sur notre blog :
          </Text>

          {/* CTA */}
          <Section style={styles.ctaSection}>
            <Link
              href="https://swiipx.fr/blog/doubler-avis-google-30-jours"
              style={styles.ctaButton}
            >
              Lire le guide complet
            </Link>
          </Section>

          <Hr style={styles.hr} />

          {/* Découvrir les plaques */}
          <Text style={styles.text}>
            Envie de passer à l&apos;action ? Découvrez nos plaques NFC pour collecter des avis Google en 3 secondes :
          </Text>

          <Section style={styles.ctaSection}>
            <Link
              href="https://swiipx.fr/#product"
              style={styles.ctaButtonSecondary}
            >
              Voir les plaques Swiipx
            </Link>
          </Section>

          <Hr style={styles.hr} />

          {/* Footer */}
          <Text style={styles.footer}>
            Swiipx — Plaques Avis Google NFC
          </Text>
          <Text style={styles.footer}>
            9 Rue Marcel Sembat, 93100 Montreuil
          </Text>
          <Text style={styles.footerSmall}>
            Cet email a été envoyé à {email}. Vous recevez ce message car vous avez demandé notre guide gratuit sur swiipx.fr.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#f9fafb',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as React.CSSProperties,
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '40px 20px',
  } as React.CSSProperties,
  logoSection: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  } as React.CSSProperties,
  logo: {
    margin: '0 auto',
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center' as const,
    marginBottom: '16px',
  } as React.CSSProperties,
  text: {
    fontSize: '15px',
    color: '#4b5563',
    lineHeight: '1.6',
    marginBottom: '16px',
  } as React.CSSProperties,
  highlight: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center' as const,
    marginBottom: '24px',
  } as React.CSSProperties,
  guideBox: {
    backgroundColor: '#eff6ff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  } as React.CSSProperties,
  guideTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '12px',
  } as React.CSSProperties,
  guideItem: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '4px',
  } as React.CSSProperties,
  ctaSection: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  } as React.CSSProperties,
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '14px 32px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '15px',
    textDecoration: 'none',
  } as React.CSSProperties,
  ctaButtonSecondary: {
    display: 'inline-block',
    backgroundColor: '#111827',
    color: '#ffffff',
    padding: '12px 28px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
  } as React.CSSProperties,
  hr: {
    borderColor: '#e5e7eb',
    margin: '24px 0',
  } as React.CSSProperties,
  footer: {
    fontSize: '13px',
    color: '#9ca3af',
    textAlign: 'center' as const,
    marginBottom: '4px',
  } as React.CSSProperties,
  footerSmall: {
    fontSize: '11px',
    color: '#d1d5db',
    textAlign: 'center' as const,
    marginTop: '16px',
    lineHeight: '1.5',
  } as React.CSSProperties,
}
