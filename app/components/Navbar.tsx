'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../store/cart'
import SideCart from './SideCart'
import AnnouncementBar from './AnnouncementBar'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const { totalItems, openCart, hasHydrated, isOpen: isCartOpen } = useCart()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Produit', href: '/#product' },
    { name: 'Comment ça marche', href: '/#how-it-works' },
    { name: 'Témoignages', href: '/#testimonials' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${
        isScrolled || isCartOpen
          ? 'bg-white shadow-md'
          : 'bg-white'
      }`}
    >
      {/* Announcement Bar */}
      <AnnouncementBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" prefetch={true} className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              {/* Logo Image (si disponible) - Fallback vers SVG si logo.png n'existe pas */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                {!logoError ? (
                  <Image
                    src="/logo.png"
                    alt="Swiipx Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                )}
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                Swiipx
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="text-gray-700 hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={openCart}
              aria-label="Ouvrir le panier"
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {hasHydrated && totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs font-bold rounded-full flex items-center justify-center text-gray-900">
                  {totalItems()}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <a
              href="/#product"
              className="hidden sm:block px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Commander
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) =>
                item.href.startsWith('/') && !item.href.includes('#') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              )}
              <a
                href="/#product"
                className="block w-full text-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Commander
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Cart */}
      <SideCart />
    </nav>
  )
}

