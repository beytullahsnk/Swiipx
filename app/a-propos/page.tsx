import Link from 'next/link'
import { Mail, MapPin, Package, Wrench } from 'lucide-react'
import { LOWEST_PRICE_CENTS, formatHtTtc } from '../../lib/pricing'

/**
 * Page « À propos ».
 *
 * POURQUOI ELLE EXISTE : le site donne des conseils sur 25 guides sans que
 * personne ne sache qui les écrit. L'audit a relevé qu'aucune page auteur,
 * aucune page à propos et aucune signature n'existait — l'EEAT ne reposait donc
 * sur rien. Les 24 articles servis par /blog/[slug] pointent désormais vers
 * cette page depuis leur signature.
 *
 * RESTE À FAIRE : /blog/doubler-avis-google-30-jours a sa propre route et
 * n'affiche aucune signature, alors que son JSON-LD déclare un `author`. C'est
 * exactement l'écart que la signature corrigeait ailleurs — donnée structurée
 * sans équivalent visible.
 *
 * RÈGLE D'ÉCRITURE : tout ce qui figure ici est vérifiable. L'identité et
 * l'adresse viennent des mentions légales, la date de création et le SIRET du
 * JSON-LD Organization, les caractéristiques produit des fiches. Rien n'est
 * romancé : une page honnête de 300 mots vaut mieux qu'un récit inventé.
 *
 * CE QUI MANQUE ENCORE est marqué par un commentaire À COMPLÉTER : seul
 * Beytullah peut l'écrire, et il vaut mieux une page courte qu'une page fausse.
 */

const faits = [
  { icone: Wrench, titre: 'Programmée avant expédition', texte: "Chaque plaque est encodée avec le lien d'avis Google de votre établissement avant son envoi. Vous n'avez ni compte à créer, ni application à installer, ni code à activer." },
  { icone: Package, titre: 'Acrylique 120 × 120 × 3 mm', texte: 'Puce NTAG215 passive, sans batterie, avec un QR code de secours imprimé pour les téléphones sans NFC. Adhésif 3M fourni.' },
  { icone: MapPin, titre: 'Expédiée sous 24 h ouvrées', texte: "Après validation du paiement. Livraison en point relais offerte, 4,90 € à domicile, en 2 à 5 jours ouvrés en France métropolitaine." },
]

export default function AProposPage() {
  /* HT et TTC ensemble, comme partout ailleurs sur le site : la clientèle
     raisonne en HT, mais le TTC est ce que Stripe débite et son affichage est
     obligatoire dès qu'un particulier peut commander (art. L112-1). */
  const { ht, ttc } = formatHtTtc(LOWEST_PRICE_CENTS)

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-gray-700">À propos</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Qui est derrière Swiipx
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          Swiipx est édité par <strong className="text-gray-900">SKYAKSA</strong>, une entreprise
          individuelle établie à Montreuil et créée en février 2026. Une seule personne derrière :{' '}
          <strong className="text-gray-900">Beytullah Sonkaya</strong>.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ce que nous faisons</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Nous fabriquons une seule chose : une plaque NFC qui redirige vos clients vers la page
              d&apos;avis Google de votre établissement. Ils approchent leur téléphone, la page
              s&apos;ouvre, ils écrivent. Il n&apos;y a rien d&apos;autre à comprendre.
            </p>
            <p>
              Nous ne vendons pas d&apos;abonnement, pas de tableau de bord, pas de service de
              gestion de réputation. Vous payez la plaque une fois, à partir de {ht} ({ttc}).
            </p>
            <p>
              La puce NFC est garantie à vie : si la plaque cesse de fonctionner sans mauvaise
              utilisation de votre part, nous la remplaçons gratuitement, sans limite de durée.
              C&apos;est l&apos;article 6 de nos{' '}
              <Link href="/cgv" className="text-primary hover:underline">conditions générales de vente</Link>,
              et non une formule commerciale.
            </p>
            {/* À COMPLÉTER PAR BEYTULLAH : pourquoi tu t'es lancé là-dedans, et
                ce que tu as constaté chez les commerçants avant de fabriquer la
                plaque. Deux ou trois phrases suffisent, mais elles doivent être
                les tiennes — je ne peux pas les écrire à ta place sans inventer. */}

            {/* À COMPLÉTER PAR BEYTULLAH : ton parcours, en une phrase, et
                uniquement s'il est vrai et vérifiable (métier précédent,
                formation, expérience du commerce). Si tu n'as rien à dire ici,
                supprime ce bloc : une page courte vaut mieux qu'un parcours
                étoffé pour faire joli. */}

            {/* À COMPLÉTER PAR BEYTULLAH, OPTIONNEL : les onze commerces déjà
                équipés et les quatre avis clients (4,8/5) sont des faits réels.
                Tu peux les citer ici — mais alors dis « onze » et « quatre »,
                sans arrondir vers le haut et sans en déduire un résultat
                moyen que personne n'a mesuré. */}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Le produit, en trois faits</h2>
          <div className="space-y-5">
            {faits.map(({ icone: Icone, titre, texte }) => (
              <div key={titre} className="flex gap-4">
                <Icone className="w-5 h-5 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{titre}</h3>
                  <p className="text-gray-600 leading-relaxed">{texte}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Qui écrit les guides</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Les guides publiés sur ce blog sont écrits en interne, sous la signature
              « Équipe Swiipx ». Ils portent sur ce que nous connaissons : la collecte d&apos;avis
              Google en commerce de proximité, le fonctionnement du NFC, et le référencement local.
            </p>
            <p>
              Quand un chiffre y figure, sa source est citée et le lien vers l&apos;étude est
              donné. Quand nous n&apos;avons pas de source, nous n&apos;avançons pas de chiffre —
              c&apos;est aussi simple que ça, et c&apos;est ce qui distingue nos guides de la
              plupart de ceux qu&apos;on trouve sur ce sujet.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nous joindre</h2>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
              <a href="mailto:bonjour@swiipx.fr" className="text-primary hover:underline">
                bonjour@swiipx.fr
              </a>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
              <span>SKYAKSA — 9 rue Marcel Sembat, 93100 Montreuil</span>
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-5 pt-4 border-t border-gray-200">
            SIRET 948 165 717 00026 · TVA FR02948165717 ·{' '}
            <Link href="/mentions-legales" className="text-gray-600 hover:text-primary underline underline-offset-2">
              Mentions légales
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
