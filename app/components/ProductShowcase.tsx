'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Building2, Check, ChevronDown, ChevronLeft, ChevronRight, Gift, MapPin, Package, Shield, ShoppingCart, Truck } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useCart } from '../store/cart'
import { useCompanyStore } from '../store/company'
import BusinessAutocomplete, { BusinessInfo } from './BusinessAutocomplete'
import ClientLogos from './ClientLogos'
import { track } from '../../lib/analytics'
import Link from 'next/link'
import { PACKS, formatHt, formatTtc, unitPriceCents } from '../../lib/pricing'

// Packs : prix issus de lib/pricing.ts (source unique).
//
// Les montants affiches ici sont HT : la clientele est professionnelle et
// recupere la TVA. Le TTC n'est PAS repete sous chaque pack, mais une mention
// "TVA 20 % en sus" figure sous le selecteur, et le montant TTC exact est
// affiche au panier puis au checkout avant tout paiement.
//
// Les pages produit, elles, continuent d'afficher le TTC : ce sont les pages
// d'atterrissage declarees dans le flux Merchant Center, et Google exige que
// le prix declare (TTC en France) soit visible sur la page d'arrivee.
const productPacks = [
  { pack: PACKS.plaque1, name: '1 Plaque', badge: null, popular: false },
  { pack: PACKS.plaque2, name: '2 Plaques', badge: '+ Guide Gratuit 🎁', popular: true },
  { pack: PACKS.plaque5, name: '5 Plaques', badge: '+ Guide & Cadeau Mystère 🎁', popular: false },
].map(({ pack, name, badge, popular }) => ({
  id: pack.id,
  slug: pack.slug,
  quantity: pack.plaques,
  name,
  badge,
  popular,
  price: pack.priceCents / 100,
  prixHt: formatHt(pack.priceCents),
  prixTtc: formatTtc(pack.priceCents),
  formerPriceHT: pack.formerPriceCents ? formatHt(pack.formerPriceCents) : null,
  unitPriceHT: pack.plaques > 1 ? formatHt(unitPriceCents(pack)) : null,
}))

// Arguments propres a Swiipx : ce que les concurrents a application
// ne peuvent PAS dire. Chaque ligne est verifiable.
const productBenefits = [
  { text: 'Arrive déjà programmée : collez-la, elle fonctionne' },
  { text: 'Aucune application à installer, aucun code à activer' },
  { text: 'Pointe directement vers votre fiche Google, sans intermédiaire' },
  { text: 'Paiement unique, sans abonnement ni frais mensuels' },
]

export default function ProductShowcase() {
  const { addItem, openCart } = useCart()
  const { company } = useCompanyStore()
  const [selectedPack, setSelectedPack] = useState<typeof productPacks[0]['id']>('plaque2') // Default to pack 2 (most popular) — overridden to 'plaque1' on mobile in useEffect below
  const [selectedImage, setSelectedImage] = useState(0)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [business, setBusiness] = useState<BusinessInfo | null>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)

  // Sur mobile (<768px), pré-sélectionner le pack 1 plaque pour afficher le prix le plus bas par défaut
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      setSelectedPack('plaque1')
    }
  }, [])

  // Restaurer l'entreprise depuis le store Zustand au montage
  useEffect(() => {
    if (company && company.placeId && !business) {
      setBusiness({
        name: company.name,
        address: company.address,
        place_id: company.placeId,
        phone: company.phone,
        lat: company.lat,
        lng: company.lng,
      })
    }
  }, [company, business])

  // Sticky CTA bar : visible sur mobile quand le bouton principal est hors viewport
  useEffect(() => {
    if (!ctaButtonRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(ctaButtonRef.current)
    return () => observer.disconnect()
  }, [])

  // Product images - Chaque miniature a sa propre grande image
  const productImages = [
    { id: 0, src: '/product-main.jpg', alt: 'Plaque avis Google NFC Swiipx', mainSrc: '/product-main.jpg' },
    { id: 1, src: '/product-thumb-1.jpg', alt: 'Plaque avis Google NFC — vue principale', mainSrc: '/product-thumb-1.jpg' },
    { id: 2, src: '/product-thumb-2.jpg', alt: 'Plaque avis Google NFC — vue de côté', mainSrc: '/product-thumb-2.jpg' },
    { id: 3, src: '/product-thumb-3.jpg', alt: 'Plaque avis Google NFC — en utilisation', mainSrc: '/product-thumb-3.jpg' },
    { id: 4, src: '/product-thumb-4.jpg', alt: 'Pack complet plaques avis Google Swiipx', mainSrc: '/product-thumb-4.jpg' },
  ]

  const handleAddToCart = () => {
    const selectedProduct = productPacks.find(p => p.id === selectedPack)
    if (selectedProduct) {
      addItem(selectedProduct.id, business || undefined)
      track('add_to_cart', {
        item_id: selectedProduct.id,
        item_name: selectedProduct.name,
        value: selectedProduct.price,
        currency: 'EUR',
        // Permet de mesurer si l'entreprise est choisie avant ou après l'ajout
        has_business: !!business?.place_id,
      })
      toast.success(`${selectedProduct.name} ajouté au panier ! 🎉`)
      setTimeout(() => {
        openCart()
      }, 500)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Collapsible sections
  const infoSections = [
    {
      id: 'how-it-works',
      title: 'Comment ça marche',
      icon: Package,
      content: 'Scannez simplement la plaque NFC avec votre smartphone pour rediriger instantanément vos clients vers votre page d\'avis Google. Aucune application nécessaire, compatible avec tous les smartphones récents.',
    },
    {
      id: 'delivery',
      title: 'Livraison',
      icon: Truck,
      content: 'Livraison en point relais offerte, 4,90 € à domicile. France métropolitaine sous 2-5 jours ouvrés. Vous recevrez un numéro de suivi par email dès l\'expédition de votre commande.',
    },
    {
      id: 'guarantee',
      title: 'Garantie & Retours',
      icon: Shield,
      content: 'Garantie à vie contre tout défaut de fabrication. Support client prioritaire inclus. Guide d\'utilisation et templates de scripts offerts.',
    },
  ]

  return (
    <section id="product" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT COLUMN - Product Images (Sticky) */}
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              
              {/* Product Image */}
              <div className="relative z-10 w-full h-full">
                <Image
                  src={productImages[selectedImage]?.mainSrc || '/product-main.jpg'}
                  alt={productImages[selectedImage]?.alt || 'Plaque NFC Swiipx'}
                  width={800}
                  height={800}
                  className="w-full h-full object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Navigation Arrows - Subtle & Elegant */}
              <button
                onClick={() => setSelectedImage(prev => prev === 0 ? productImages.length - 1 : prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedImage(prev => prev === productImages.length - 1 ? 0 : prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Counter Dots */}
              {/* Pastilles. Elles etaient en opacity-0 group-hover:opacity-100 :
                  sans survol sur mobile, elles y restaient invisibles en
                  permanence. Elles sont desormais toujours visibles sous lg.
                  La cible tactile fait 44x44 (bouton transparent) alors que la
                  pastille visible reste petite : au doigt, 8x8 etait inatteignable. */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="w-11 h-11 flex items-center justify-center"
                    aria-label={`Voir l'image ${index + 1} sur ${productImages.length}`}
                    aria-current={selectedImage === index ? 'true' : undefined}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selectedImage === index
                          ? 'bg-primary w-4'
                          : 'bg-gray-400/60 w-2'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-20">
                POINT RELAIS OFFERT
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    selectedImage === index
                      ? 'ring-2 ring-primary shadow-lg scale-105 border-primary'
                      : 'border-gray-200 hover:border-gray-300 hover:ring-2 hover:ring-gray-200'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-medium">Fabriqué en France</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Garantie à vie</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-medium">Livraison offerte en point relais</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Product Information */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Plaque Avis Google
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Programmée avec le lien d&apos;avis Google de votre établissement.
                Vos clients approchent leur téléphone, l&apos;avis se rédige en 10 secondes.
              </p>
            </div>

            {/* Caractéristiques factuelles (remplace la note inventée) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <span className="font-medium">Acrylique premium 120×120 mm</span>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <span className="font-medium">NFC NTAG215</span>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <span className="font-medium">QR code de secours</span>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 bg-blue-50 rounded-xl p-6">
              {productBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Pack Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Choisissez votre pack</h3>
              
              {productPacks.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => {
                    setSelectedPack(pack.id)
                    track('select_pack', { item_id: pack.id, value: pack.price, currency: 'EUR' })
                  }}
                  className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPack === pack.id
                      ? 'border-primary bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Radio Button */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedPack === pack.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedPack === pack.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>

                      {/* Pack Info */}
                      <div>
                        <p className="font-bold text-gray-900">{pack.name}</p>
                        {pack.badge && (
                          <p className="text-sm text-green-700 font-medium">{pack.badge}</p>
                        )}
                        {/* Seul lien editorial de l'accueil vers les fiches
                            produit : elles ne recevaient que des liens de pied
                            de page, que Google devalue. Le clic est stoppe pour
                            ne pas declencher la selection du pack. */}
                        <Link
                          href={`/product/${pack.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-primary hover:underline underline-offset-2"
                        >
                          Voir le détail du {pack.name === '1 Plaque' ? 'pack 1 plaque' : `pack ${pack.name.toLowerCase()}`}
                        </Link>
                      </div>
                    </div>

                    {/* Prix : barre = ancien prix reellement pratique */}
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-2">
                        {pack.formerPriceHT && (
                          <span className="text-sm text-gray-600 line-through">{pack.formerPriceHT}</span>
                        )}
                        <p className="text-2xl font-bold text-gray-900 whitespace-nowrap">{pack.prixHt}</p>
                      </div>
                      {/* Le TTC est affiche ici : le balisage Product annonce
                          35,88 EUR a Google, la page ne montrait que 29,90 EUR HT.
                          Un ecart entre le prix balise et le prix visible fait
                          desapprouver la fiche par Merchant Center. */}
                      <p className="text-xs text-gray-500 mt-0.5">{pack.prixTtc}</p>
                      {pack.unitPriceHT && (
                        <p className="text-xs text-gray-600 mt-0.5">soit {pack.unitPriceHT} la plaque HT</p>
                      )}
                    </div>
                  </div>

                  {/* Popular Badge */}
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-bold text-xs shadow-lg">
                        LE PLUS POPULAIRE
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Mention de TVA — pas un prix, mais evite qu'un visiteur
                decouvre le montant reel seulement au moment de payer. */}
            <p className="text-xs text-gray-600">
              Prix hors taxes. TVA 20 % ajoutée au paiement.
            </p>

            {/* Price justification — pourquoi ce prix ? */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Pourquoi ce prix ?
              </p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Programmation incluse</strong> — nous encodons votre lien d&apos;avis avant expédition. Rien à faire à réception.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Aucune application</strong> — pas de compte à créer, pas de code à saisir, pas de service dont dépendre.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Acrylique premium 3 mm, puce NTAG215</strong> — résiste à l&apos;eau, aux UV et aux rayures.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Garantie à vie</strong> + 90 jours satisfait ou remboursé + livraison offerte en point relais dès la première plaque.</span>
                </li>
              </ul>
            </div>

            {/* Business Selection (optionnel) */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" aria-hidden="true" />
                  Votre entreprise
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Optionnel — vous pourrez le faire au checkout
                </p>
              </div>

              <BusinessAutocomplete
                onSelect={(businessData) => {
                  setBusiness(businessData)
                  if (businessData?.place_id) {
                    track('business_selected', { source: 'homepage' })
                  }
                }}
                placeholder="Tapez le nom de votre entreprise ici.."
              />
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                ref={ctaButtonRef}
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 bg-primary text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Ajouter au panier
              </button>

              {/* Preuve sociale : logos clients, pas de noms en clair */}
              <ClientLogos
                variante="compact"
                afficherSecteurs={false}
                className="flex justify-center"
              />

              {/* Garantie 14 jours */}
              <div className="flex items-start space-x-2.5 p-3 bg-green-50 border border-green-200 rounded-lg">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-sm">
                  <p className="font-semibold text-green-900">Satisfait ou remboursé sous 90 jours</p>
                  <p className="text-green-700 text-xs">Retour gratuit, plaque non collée — remboursement intégral.</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center justify-center space-x-4 py-4 border-t border-gray-200">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">Paiement sécurisé via Stripe</span>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-6 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">VISA</div>
                <div className="w-10 h-6 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">MC</div>
                <div className="w-10 h-6 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">CB</div>
              </div>
            </div>

            {/* Collapsible Info Sections */}
            <div className="space-y-2 border-t border-gray-200 pt-6">
              {infoSections.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={expandedSection === section.id}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-gray-900">{section.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        expandedSection === section.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSection === section.id ? 'auto' : 0,
                      opacity: expandedSection === section.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                      {section.content}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Additional Trust Signals */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 space-y-3">
              <p className="font-bold text-gray-900 flex items-center space-x-2">
                <Gift className="w-5 h-5 text-primary" />
                <span>Offre spéciale livraison offerte en point relais</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Guide complet offert (valeur 29€)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Configuration personnalisée incluse</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Support prioritaire 7j/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-3 lg:hidden">
          <div className="flex items-center justify-between max-w-lg mx-auto gap-3">
            <div className="flex-shrink-0">
              <p className="text-lg font-bold text-gray-900">
                {productPacks.find(p => p.id === selectedPack)?.prixHt}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold text-base bg-primary text-white hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

