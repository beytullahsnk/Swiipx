'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Lock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Nos plaques avis Google', href: '/#product' },
      { name: 'Pack Starter — 1 plaque', href: '/product/starter' },
      { name: 'Pack Business — 2 plaques', href: '/product/business' },
      { name: 'Pack Pro — 5 plaques', href: '/product/pro' },
      { name: 'Comment ça marche', href: '/#how-it-works' },
      { name: 'FAQ', href: '/#faq' },
    ],
    livraison: [
      { name: 'Expédition et Livraison', href: '/livraison' },
      { name: 'Retours et échanges', href: '/retours' },
    ],
    swiipx: [
      { name: 'Blog', href: '/blog' },
      { name: 'Contactez-nous', href: '/contact' },
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'CGV', href: '/cgv' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo.png"
                alt="Swiipx"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <span className="text-2xl font-bold text-white">Swiipx</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              La solution NFC la plus simple pour booster vos avis Google et votre visibilité locale.
              Rejoignez plus de 500 entreprises satisfaites.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Produit</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Livraison Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Livraison</h3>
            <ul className="space-y-3">
              {footerLinks.livraison.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Swiipx Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Swiipx</h3>
            <ul className="space-y-3">
              {footerLinks.swiipx.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust signals row (au-dessus du copyright) */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* SSL */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Paiement sécurisé SSL</span>
            </div>

            <span className="hidden sm:inline text-gray-700" aria-hidden="true">·</span>

            {/* Logos paiement */}
            <div className="flex items-center gap-1.5">
              {['Visa', 'MC', 'CB', 'Amex'].map(p => (
                <div
                  key={p}
                  className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-[10px] font-bold text-gray-300 tracking-wide"
                  aria-label={`${p} accepté`}
                >
                  {p}
                </div>
              ))}
            </div>

            <span className="hidden sm:inline text-gray-700" aria-hidden="true">·</span>

            {/* Garantie */}
            <div className="text-xs text-gray-400">
              Garantie 2 ans
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-500 text-xs">
              © {currentYear} Swiipx. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs">
              Une marque <span className="text-gray-400 font-medium">SKYAKSA</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
