import Link from 'next/link'
import { ArrowRight, BadgeCheck, CreditCard, PackageCheck, RotateCcw, Truck } from 'lucide-react'

/**
 * Réassurance au point de décision, juste sous le bouton d'achat.
 *
 * Chaque ligne est un engagement vérifiable, avec sa source :
 * - expédition sous 24 h ouvrées, déjà programmée : page À propos ;
 * - livraison offerte en point relais : lib/pricing.ts (le domicile est payant) ;
 * - garantie à vie sur la puce NFC : CGV, article 6 ;
 * - satisfait ou remboursé 90 jours, plaque ni utilisée ni collée : CGV, article 5 ;
 * - paiement unique : aucun abonnement n'existe.
 *
 * Elle remplace un encart « Offre spéciale » qui promettait un « guide complet
 * offert (valeur 29 €) », un « support prioritaire 7j/7 » et un « retour
 * gratuit », trois engagements que rien ne garantissait ; les CGV laissent
 * même les frais de retour à la charge du client.
 */
const ENGAGEMENTS = [
  { icone: PackageCheck, texte: 'Expédiée sous 24 h ouvrées, déjà programmée' },
  { icone: Truck, texte: 'Livraison offerte en point relais' },
  { icone: BadgeCheck, texte: 'Puce NFC garantie à vie' },
  { icone: RotateCcw, texte: 'Satisfait ou remboursé 90 jours (plaque ni utilisée ni collée)' },
  { icone: CreditCard, texte: 'Paiement unique, sans abonnement' },
]

export default function Reassurance({ devis = true, className = '' }: { devis?: boolean; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-gray-50 p-4 ${className}`}>
      <ul className="space-y-2">
        {ENGAGEMENTS.map(({ icone: Icone, texte }) => (
          <li key={texte} className="flex items-start gap-2.5 text-sm text-gray-700">
            <Icone className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
            <span>{texte}</span>
          </li>
        ))}
      </ul>
      {devis && (
        <Link
          href="/devis"
          className="mt-3 inline-flex items-center gap-1.5 border-t border-gray-200 pt-3 text-sm font-semibold text-primary hover:underline"
        >
          Plus de 5 établissements ? Devis sous 24 h ouvrées
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
