import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retours & Remboursements',
  description: 'Politique de retours Swiipx. Retour gratuit sous 14 jours, remboursement intégral. Découvrez la procédure simple pour retourner votre plaque NFC.',
  alternates: {
    canonical: 'https://swiipx.fr/retours',
  },
  openGraph: {
    title: 'Retours & Remboursements — Swiipx',
    description: 'Retour gratuit sous 14 jours, remboursement intégral pour vos plaques NFC Swiipx.',
    url: 'https://swiipx.fr/retours',
    siteName: 'Swiipx',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/product-main.jpg', width: 1200, height: 630, alt: 'Swiipx — Plaques avis Google NFC' }],
  },
  twitter: {
    card: 'summary',
    title: 'Retours & Remboursements — Swiipx',
    description: 'Retour gratuit sous 14 jours, remboursement intégral pour vos plaques NFC Swiipx.',
  },
}

export default function RetoursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
