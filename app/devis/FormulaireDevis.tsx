'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { track } from '@/lib/analytics'

type Etat = { statut: 'saisie' } | { statut: 'envoi' } | { statut: 'envoye'; email: string } | { statut: 'erreur'; message: string }

const CHAMP = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export default function FormulaireDevis() {
  const [etat, setEtat] = useState<Etat>({ statut: 'saisie' })

  async function envoyer(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault()
    const donnees = Object.fromEntries(new FormData(evenement.currentTarget).entries())
    setEtat({ statut: 'envoi' })
    try {
      const reponse = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donnees),
      })
      const corps = await reponse.json().catch(() => ({}))
      if (!reponse.ok) {
        setEtat({ statut: 'erreur', message: corps.error || 'Envoi impossible. Écrivez-nous à bonjour@swiipx.fr.' })
        return
      }
      // Aucune donnée personnelle dans la mesure : seulement le nombre d'établissements.
      track('generate_lead', { lead_type: 'devis', etablissements: Number(donnees.etablissements) || 0 })
      setEtat({ statut: 'envoye', email: String(donnees.email) })
    } catch {
      setEtat({ statut: 'erreur', message: 'Connexion impossible. Réessayez, ou écrivez-nous à bonjour@swiipx.fr.' })
    }
  }

  if (etat.statut === 'envoye') {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" aria-hidden="true" />
        <p className="font-bold text-gray-900">Merci, votre demande est partie.</p>
        <p className="text-gray-700 mt-1">
          Nous vous répondons sous 24 h ouvrées à <strong>{etat.email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={envoyer} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="block text-sm font-semibold text-gray-900 mb-1.5">Entreprise ou réseau *</span>
          <input name="entreprise" required maxLength={120} autoComplete="organization" className={CHAMP} />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-gray-900 mb-1.5">Votre nom *</span>
          <input name="nom" required maxLength={120} autoComplete="name" className={CHAMP} />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-gray-900 mb-1.5">E-mail *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={CHAMP} />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-gray-900 mb-1.5">Téléphone</span>
          <input name="telephone" type="tel" maxLength={40} autoComplete="tel" className={CHAMP} />
        </label>
      </div>

      <label className="block sm:w-1/2">
        <span className="block text-sm font-semibold text-gray-900 mb-1.5">Nombre d&apos;établissements *</span>
        <input name="etablissements" type="number" required min={2} max={500} defaultValue={6} className={CHAMP} />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold text-gray-900 mb-1.5">Vos établissements</span>
        <span className="block text-sm text-gray-500 mb-1.5">
          Un par ligne : nom et adresse, ou lien de la fiche Google. Vous pourrez aussi l&apos;envoyer plus tard.
        </span>
        <textarea name="liste" rows={5} maxLength={3000} className={CHAMP} />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold text-gray-900 mb-1.5">Message</span>
        <textarea name="message" rows={3} maxLength={2000} className={CHAMP} />
      </label>

      {/* Piège à robots : invisible pour un humain, ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {etat.statut === 'erreur' && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {etat.message}
        </p>
      )}

      <button
        type="submit"
        disabled={etat.statut === 'envoi'}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-primary px-8 py-3.5 font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
      >
        {etat.statut === 'envoi' && <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />}
        Recevoir mon devis
      </button>

      <p className="text-xs text-gray-500">
        Vos coordonnées servent uniquement à répondre à votre demande. Voir les{' '}
        <Link href="/mentions-legales" className="underline hover:text-primary">
          mentions légales
        </Link>
        .
      </p>
    </form>
  )
}
