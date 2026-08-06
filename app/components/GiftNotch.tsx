'use client'

import { BookOpen } from 'lucide-react'

interface GiftNotchProps {
  onClick: () => void
  isVisible: boolean
}

export default function GiftNotch({ onClick, isVisible }: GiftNotchProps) {
  return (
    /* Glissement en CSS, element toujours monte : la transition joue a l'entree
       comme a la sortie, sans AnimatePresence. GiftNotch et Navbar etaient les
       deux seuls consommateurs de framer-motion dans le layout, et suffisaient
       donc a charger 129 Ko sur toutes les pages du site, articles compris. */
    <button
          onClick={onClick}
          tabIndex={isVisible ? 0 : -1}
          aria-hidden={!isVisible}
          aria-label="Télécharger le guide gratuit"
          /* AFFICHE UNIQUEMENT A PARTIR DE 1296 px.
             Etant en `fixed` au bord gauche, cet onglet recouvrait en
             permanence le debut des lignes situees a sa hauteur, quel que soit
             le defilement : on lisait "ctiver" au lieu de "activer" dans le
             hero, "rogrammee" dans la fiche produit, et le pied de page perdait
             le "l'" de "l'emploi".
             Le deplacer verticalement ne change rien — un element fixe reste au
             meme endroit pendant le defilement — et le retrecir non plus, la
             section produit commencant a 16 px sur mobile.
             Le seuil vient du gabarit : le conteneur fait max-w-7xl (1280 px)
             centre avec 32 px de marge interne, donc le contenu commence a
             (largeur - 1280) / 2 + 32. Pour qu'un onglet de 40 px ne morde
             jamais dessus, il faut au moins 1296 px.
             En dessous, la fonction reste accessible : la popup e-book s'ouvre
             automatiquement. */
          className={`hidden min-[1296px]:block fixed left-0 top-1/2 -translate-y-1/2 z-[300] bg-black text-white px-3 py-5 rounded-r-2xl shadow-xl hover:bg-gray-900 group transition-[transform,opacity,background-color] duration-300 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0 -translate-x-full pointer-events-none'
          }`}
          style={{ writingMode: 'vertical-rl' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" aria-hidden="true" />
            <span className="font-bold text-[10px] sm:text-xs tracking-wide">E-BOOK GRATUIT</span>
          </div>
    </button>
  )
}

