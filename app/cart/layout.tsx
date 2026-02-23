import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mon panier',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
