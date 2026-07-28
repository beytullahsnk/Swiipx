'use client'

import { useEffect, useState } from 'react'

export interface TocSection {
  id: string
  label: string
}

/**
 * Sommaire avec surlignage de la section courante.
 *
 * Seul ce composant est client : il ne recoit que la liste des sections
 * (quelques centaines d'octets), pas le contenu de l'article.
 */
export default function ArticleToc({ sections }: { sections: TocSection[] }) {
  const [activeSection, setActiveSection] = useState('')

  /* Scroll listener plutot qu'un IntersectionObserver : le contenu est injecte
     via dangerouslySetInnerHTML, les noeuds n'existent pas au premier rendu. */
  useEffect(() => {
    const handleScroll = () => {
      const ids = sections.map((s) => s.id)
      let current = ids[0] || ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = id
        }
      }

      setActiveSection(current)
    }

    // Petit delai pour laisser dangerouslySetInnerHTML peupler le DOM
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // etat initial
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections])

  return (
    <nav
      aria-labelledby="sommaire-titre"
      className="space-y-0.5 max-h-[calc(100vh-340px)] overflow-y-auto pr-2 mb-8"
    >
      {sections.map((section, idx) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={activeSection === section.id ? 'true' : undefined}
          className={`block py-2 px-0 text-sm transition-colors ${
            activeSection === section.id
              ? 'text-primary font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="mr-2 text-gray-400">{idx + 1}.</span>
          {section.label}
        </a>
      ))}
    </nav>
  )
}
