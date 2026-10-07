'use client'

import { useEffect, useRef, useState } from 'react'
import { track } from '@/lib/analytics'
import { avisNecessaires, noteApres, virgule } from './calcul'

const CHAMP =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-lg font-semibold text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

function nombre(valeur: string): number {
  return Number(valeur.replace(',', '.'))
}

export default function Calculateur() {
  const [note, setNote] = useState('4,2')
  const [avis, setAvis] = useState('40')
  const [cible, setCible] = useState('4,6')
  const [moyenne, setMoyenne] = useState('5')
  const mesure = useRef(false)

  const A = nombre(note)
  const N = Math.round(nombre(avis))
  const T = nombre(cible)
  const M = nombre(moyenne)
  const valide = [A, T, M].every((x) => x >= 1 && x <= 5) && N >= 1 && N <= 100000
  const besoin = valide ? avisNecessaires(A, N, T, M) : null

  // Une mesure par visite, au premier calcul différent de l'exemple affiché.
  useEffect(() => {
    if (mesure.current || !valide) return
    if (note === '4,2' && avis === '40' && cible === '4,6' && moyenne === '5') return
    mesure.current = true
    track('calculator_used', { outil: 'calculateur_avis_google' })
  }, [note, avis, cible, moyenne, valide])

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-700">Note actuelle sur Google</span>
          <input inputMode="decimal" value={note} onChange={(e) => setNote(e.target.value)} className={CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-700">Nombre d&apos;avis actuel</span>
          <input inputMode="numeric" value={avis} onChange={(e) => setAvis(e.target.value)} className={CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-700">Note visée</span>
          <input inputMode="decimal" value={cible} onChange={(e) => setCible(e.target.value)} className={CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-700">Note moyenne de vos prochains avis</span>
          <input inputMode="decimal" value={moyenne} onChange={(e) => setMoyenne(e.target.value)} className={CHAMP} />
          <span className="mt-1 block text-xs text-gray-500">5 si tous vos prochains avis sont à 5 étoiles.</span>
        </label>
      </div>

      <div role="status" aria-live="polite" className="mt-5 rounded-xl bg-white p-4 sm:p-5 border border-gray-200">
        {!valide ? (
          <p className="text-gray-700">Indiquez des notes entre 1 et 5 et un nombre d&apos;avis d&apos;au moins 1.</p>
        ) : besoin === 0 ? (
          <p className="text-lg font-bold text-gray-900">Votre note atteint déjà {virgule(T)} : aucun avis supplémentaire n&apos;est nécessaire.</p>
        ) : besoin === null ? (
          <p className="text-gray-700">
            Impossible d&apos;atteindre {virgule(T)} si vos prochains avis ont en moyenne {virgule(M)} : il faut que leur
            moyenne dépasse la note visée.
          </p>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Résultat</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {besoin.toLocaleString('fr-FR')} nouveaux avis{M === 5 ? ' à 5 étoiles' : ` (moyenne ${virgule(M)})`}
            </p>
            <p className="mt-1 text-gray-700">
              pour passer de {virgule(A)} à {virgule(T)} avec {N.toLocaleString('fr-FR')} avis aujourd&apos;hui, soit
              environ {Math.ceil(besoin / 6).toLocaleString('fr-FR')} par mois sur 6 mois.
            </p>
          </>
        )}
        {valide && (
          <p className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-600">
            À l&apos;inverse, un seul avis à 1 étoile ferait passer votre moyenne de {virgule(A, 2)} à{' '}
            {virgule(noteApres(A, N, 1), 2)}.
          </p>
        )}
      </div>
    </div>
  )
}
