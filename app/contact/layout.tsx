import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Swiipx par chat en direct ou par email. Notre équipe vous répond sous 24h pour toute question sur nos plaques NFC avis Google.',
  alternates: {
    canonical: 'https://swiipx.fr/contact',
  },
  openGraph: {
    title: 'Contact — Swiipx',
    description: 'Contactez Swiipx par chat en direct ou par email. Notre équipe vous répond sous 24h.',
    url: 'https://swiipx.fr/contact',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact — Swiipx',
    description: 'Contactez Swiipx par chat en direct ou par email. Notre équipe vous répond sous 24h.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
