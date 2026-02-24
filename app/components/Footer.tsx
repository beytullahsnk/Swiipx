'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Nos plaques avis Google', href: '/#product' },
      { name: 'Comment ça marche', href: '/#how-it-works' },
      { name: 'Témoignages', href: '/#testimonials' },
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

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} Swiipx. Tous droits réservés.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span>Paiement sécurisé</span>
              <span>·</span>
              <span>Garantie 2 ans</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
