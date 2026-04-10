'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Combien de temps pour la livraison ?',
      answer: 'Nous expédions sous 24h ouvrées. La livraison prend entre 2 à 3 jours ouvrés en France métropolitaine. Vous recevrez un numéro de suivi par email dès l\'expédition de votre commande.',
    },
    {
      question: 'La plaque avis Google est-elle personnalisable ?',
      answer: 'Oui, absolument ! Vous pouvez personnaliser votre plaque avis Google avec votre logo, vos couleurs et même un message personnalisé. La personnalisation est gratuite pour les packs Business et Pro. Contactez-nous après votre commande pour nous envoyer vos fichiers.',
    },
    {
      question: 'Y a-t-il un abonnement ?',
      answer: 'Non, aucun abonnement ! Vous payez une seule fois pour votre plaque NFC et elle fonctionne à vie. Pas de frais cachés, pas de renouvellement mensuel. C\'est un investissement unique pour booster vos avis Google.',
    },
    {
      question: 'Comment fonctionne une plaque avis Google NFC ?',
      answer: 'La plaque avis Google NFC fonctionne grâce à la technologie NFC (Near Field Communication). Vos clients approchent leur smartphone de la plaque et sont redirigés directement vers votre page avis Google. Aucune application nécessaire, compatible iPhone et Android. Un QR code est aussi présent en secours.',
    },
    {
      question: 'Puis-je modifier le lien de redirection plus tard ?',
      answer: 'Oui ! Vous pouvez modifier le lien de redirection à tout moment depuis votre espace client. C\'est très pratique si vous changez de page Google ou si vous voulez rediriger vers une autre plateforme d\'avis.',
    },
    {
      question: 'Quelle est la garantie ?',
      answer: 'Nos plaques sont garanties 2 ans contre tout défaut de fabrication. En cas de problème, contactez notre support client qui se fera un plaisir de vous aider.',
    },
    {
      question: 'La plaque avis Google résiste-t-elle à l\'extérieur ?',
      answer: 'Oui, nos plaques avis Google sont conçues pour résister aux intempéries. Fabriquées en matériau résistant à l\'eau, aux UV et aux températures extrêmes. Installation en extérieur sans problème.',
    },
    {
      question: 'Puis-je commander plusieurs plaques pour différents lieux ?',
      answer: 'Bien sûr ! Nos packs sont justement conçus pour ça. Le pack Pro (5 plaques) est idéal si vous avez plusieurs points de vente ou emplacements stratégiques. Chaque plaque peut être configurée avec un lien différent si besoin.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 sm:py-32 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Questions fréquentes sur nos plaques avis Google
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Tout ce que vous devez savoir sur nos plaques avis Google NFC
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 text-left transition-all duration-300 border-2 border-transparent hover:border-primary/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-center bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 sm:p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vous avez d&apos;autres questions ?
          </h3>
          <p className="text-gray-600 mb-6">
            Notre équipe est là pour vous aider. Contactez-nous par email ou via le chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:bonjour@swiipx.fr"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Envoyer un email
            </a>
            <button
              onClick={() => { if ((window as any).Tawk_API) (window as any).Tawk_API.maximize() }}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-primary transition-all duration-300"
            >
              Ouvrir le chat
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

