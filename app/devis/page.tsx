import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Link2, Package, ShieldCheck } from 'lucide-react'
import FormulaireDevis from './FormulaireDevis'

export const metadata: Metadata = {
  title: 'Devis plaques NFC avis Google pour plusieurs établissements | Swiipx',
  description:
    "Réseau, franchise, agences : une plaque NFC par établissement, chacune programmée avec son propre lien d'avis Google. Devis sous 24 h ouvrées.",
  alternates: { canonical: 'https://swiipx.fr/devis' },
}

const POINTS = [
  {
    icone: Link2,
    titre: 'Une plaque, une fiche',
    texte: "Chaque plaque est programmée avec le lien d'avis Google de l'établissement où elle sera posée.",
  },
  {
    icone: Package,
    titre: 'Expédition sous 24 h ouvrées',
    texte: 'Après réception du paiement et de la liste de vos établissements.',
  },
  {
    icone: ShieldCheck,
    titre: 'Paiement unique',
    texte: 'Sans abonnement, et la puce de chaque plaque est garantie à vie.',
  },
]

export default function DevisPage() {
  return (
    <div className="min-h-screen bg-white pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Fil d'Ariane" className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <span className="text-gray-900 font-medium">Devis multi-établissements</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Plusieurs établissements à équiper ?</h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          Agences, franchises, réseau de magasins : indiquez-nous vos établissements, nous vous envoyons un devis sous
          24 h ouvrées.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {POINTS.map(({ icone: Icone, titre, texte }) => (
            <div key={titre} className="rounded-xl border border-gray-200 p-4">
              <Icone className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
              <p className="font-semibold text-gray-900 text-sm">{titre}</p>
              <p className="text-sm text-gray-600 mt-1">{texte}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-xl p-4 mb-10">
          Jusqu&apos;à 5 établissements, le{' '}
          <Link href="/product/pro" className="font-semibold text-primary hover:underline">
            Pack Pro
          </Link>{' '}
          suffit : chacune de ses 5 plaques peut pointer vers un établissement différent, et vous commandez directement en
          ligne.
        </p>

        <FormulaireDevis />
      </div>
    </div>
  )
}
