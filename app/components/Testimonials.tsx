'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      business: 'Restaurant Le Petit Bistro',
      location: 'Paris',
      rating: 5,
      text: 'Depuis que j\'ai installé les plaques Swiipx, mes avis Google ont explosé ! +180% en 2 mois. Mes clients trouvent ça super pratique et ça me démarque vraiment de la concurrence.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      id: 2,
      name: 'Thomas Bernard',
      business: 'Salon de Coiffure Élégance',
      location: 'Lyon',
      rating: 5,
      text: 'Un investissement qui s\'est payé en quelques semaines ! Mes clients adorent scanner la plaque, c\'est moderne et ça me donne une image professionnelle. Je recommande à 200% !',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
    {
      id: 3,
      name: 'Sophie Martin',
      business: 'Boulangerie Artisanale',
      location: 'Bordeaux',
      rating: 5,
      text: 'Simple, efficace et ultra rapide à mettre en place. Mes clients réguliers laissent enfin des avis et ça attire de nouveaux clients. Le retour sur investissement est impressionnant !',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
    {
      id: 4,
      name: 'Alexandre Petit',
      business: 'Cabinet Dentaire',
      location: 'Marseille',
      rating: 5,
      text: 'Enfin une solution qui fonctionne ! Mes patients scannent la plaque en sortant, c\'est devenu automatique. Ma note Google est passée de 4.2 à 4.8 en 3 mois.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
      id: 5,
      name: 'Isabelle Rousseau',
      business: 'Hotel Boutique Le Charme',
      location: 'Nice',
      rating: 5,
      text: 'Nos clients adorent la technologie NFC ! C\'est tellement plus facile que de leur demander de chercher notre établissement sur Google. Un must-have pour tout commerce.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    },
  ]

  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-gradient-to-br from-blue-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ils ont boosté leurs avis avec Swiipx
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez 500+ restaurants, salons, cabinets et boutiques qui ont doublé leurs avis Google en 3 mois
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary',
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-accent fill-accent"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                      {testimonial.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        testimonial.name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-700 font-medium truncate">
                        {testimonial.business}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '500+', label: 'Clients satisfaits' },
            { value: '4.9/5', label: 'Note moyenne' },
            { value: '+200%', label: 'Avis en moyenne' },
            { value: '10s', label: 'Pour laisser un avis' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #2563EB !important;
          background: white;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }

        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: #D1D5DB !important;
          opacity: 1 !important;
        }

        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

