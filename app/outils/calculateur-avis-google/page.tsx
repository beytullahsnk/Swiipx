import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Calculateur from './Calculateur'
import { avisNecessaires, virgule } from './calcul'

/**
 * Calculateur d'avis Google.
 *
 * POURQUOI CETTE PAGE : Search Console (juillet à octobre 2026) montrait des
 * recherches réelles sans page pour y répondre : « calculateur avis google »,
 * « calcul note google », « simulateur avis google », « combien d'avis google
 * pour augmenter la note ». Swiipx n'apparaissait qu'en 30e à 48e position,
 * via un article. Un outil est aussi ce que les moteurs génératifs ne peuvent
 * pas simplement réécrire : il apporte une réponse chiffrée propre à chaque
 * visiteur.
 *
 * Tout ce qui est chiffré ici est un calcul (calcul.ts), aucune statistique
 * externe n'est avancée.
 */
const URL_PAGE = 'https://swiipx.fr/outils/calculateur-avis-google'
const TITRE = "Calculateur d'avis Google : combien d'avis pour remonter sa note"
const DESCRIPTION =
  "Calculez combien d'avis 5 étoiles il vous faut pour passer de votre note Google actuelle à la note visée, et ce que coûte un seul avis à 1 étoile. Gratuit."

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PAGE },
  openGraph: { title: TITRE, description: DESCRIPTION, url: URL_PAGE, siteName: 'Swiipx', locale: 'fr_FR', type: 'website' },
}

const EXEMPLES: Array<{ de: number; a: number }> = [
  { de: 4.0, a: 4.5 },
  { de: 4.2, a: 4.6 },
  { de: 4.5, a: 4.8 },
]
const VOLUMES = [10, 25, 50, 100, 200]

const FAQ = [
  {
    q: "Combien d'avis 5 étoiles pour passer de 4,0 à 4,5 sur Google ?",
    a: `Autant d'avis à 5 étoiles que vous en avez déjà. Avec ${VOLUMES[2]} avis à 4,0, il en faut ${avisNecessaires(4, 50, 4.5)} à 5 étoiles pour atteindre 4,5 ; avec 200 avis, il en faut ${avisNecessaires(4, 200, 4.5)}. La formule : nombre d'avis actuel multiplié par (note visée moins note actuelle), divisé par (5 moins note visée).`,
  },
  {
    q: 'Un avis à 1 étoile fait-il beaucoup baisser une note Google ?',
    a: "Tout dépend du nombre d'avis déjà publiés. Avec 10 avis à 4,5, un avis à 1 étoile fait tomber la moyenne à 4,18 ; avec 200 avis à 4,5, à 4,48. Plus une fiche a d'avis, moins un avis isolé déplace sa note.",
  },
  {
    q: 'Peut-on atteindre une moyenne de 5 sur Google ?',
    a: "Une moyenne exacte de 5 suppose que tous les avis soient à 5 étoiles : dès qu'un avis est plus bas, aucune quantité d'avis à 5 étoiles ne la ramène exactement à 5. C'est pourquoi le calculateur demande une note visée inférieure à la moyenne de vos prochains avis.",
  },
  {
    q: 'Le calculateur tient-il compte des avis qui ne sont pas à 5 étoiles ?',
    a: "Oui : renseignez la note moyenne attendue de vos prochains avis, par exemple 4,8 si quelques avis à 4 étoiles sont probables. Le nombre d'avis nécessaire augmente alors, et il devient impossible d'atteindre une note visée égale ou supérieure à cette moyenne.",
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: "Calculateur d'avis Google",
    url: URL_PAGE,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr-FR',
    description: DESCRIPTION,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@id': 'https://swiipx.fr/#organization' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://swiipx.fr' },
      { '@type': 'ListItem', position: 2, name: "Calculateur d'avis Google", item: URL_PAGE },
    ],
  },
]

export default function CalculateurAvisGooglePage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="mx-2 h-4 w-4" aria-hidden="true" />
          <span className="font-medium text-gray-900">Calculateur d&apos;avis Google</span>
        </nav>

        <h1 className="mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
          Calculateur d&apos;avis Google : combien d&apos;avis pour atteindre votre note ?
        </h1>
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
          <p className="text-sm leading-relaxed">
            <strong>En bref :</strong> pour remonter une note Google, il faut N × (note visée − note actuelle) ÷ (5 − note
            visée) nouveaux avis à 5 étoiles, N étant votre nombre d&apos;avis actuel. Le calculateur fait ce calcul pour
            vous, y compris si vos prochains avis ne sont pas tous à 5 étoiles.
          </p>
        </div>

        <Calculateur />

        <div className="prose prose-lg mt-12 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <h2>Comment se calcule le nombre d&apos;avis nécessaire ?</h2>
          <p>
            La note Google affichée est la moyenne de vos avis. Pour l&apos;amener à une note visée, chaque nouvel avis à 5
            étoiles compense l&apos;écart entre votre moyenne et cette cible. Le nombre d&apos;avis nécessaire est donc
            proportionnel au nombre d&apos;avis déjà publiés : une fiche de 200 avis bouge quatre fois moins vite qu&apos;une
            fiche de 50.
          </p>
          <p>
            Avec N avis à la moyenne A, il faut n nouveaux avis de moyenne M pour atteindre la note T, avec n ≥ N × (T −
            A) ÷ (M − T). Exemple de calcul : 40 avis à 4,2, objectif 4,6, nouveaux avis tous à 5 étoiles : 40 × 0,4 ÷ 0,4,
            soit {avisNecessaires(4.2, 40, 4.6)} avis.
          </p>

          <h2>Combien d&apos;avis pour gagner un demi-point ?</h2>
          <p>
            Le tableau applique la formule à des cas courants, avec des nouveaux avis tous à 5 étoiles. Il se lit ainsi :
            plus la fiche a d&apos;avis, plus il en faut pour la faire bouger, et plus on vise haut, plus chaque dixième
            coûte cher. Ces valeurs sont des résultats de calcul, pas des moyennes observées.
          </p>
          <div className="not-prose my-6 overflow-x-auto">
            <table className="w-full rounded-xl border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b p-3 text-left">Avis actuels</th>
                  {EXEMPLES.map(({ de, a }) => (
                    <th key={`${de}-${a}`} className="border-b p-3 text-left">
                      De {virgule(de)} à {virgule(a)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VOLUMES.map((n) => (
                  <tr key={n}>
                    <td className="border-b p-3 font-semibold">{n}</td>
                    {EXEMPLES.map(({ de, a }) => (
                      <td key={`${n}-${de}-${a}`} className="border-b p-3">
                        {avisNecessaires(de, n, a)} avis
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Pourquoi la note bouge vite au début, puis lentement ?</h2>
          <p>
            Chaque avis pèse 1 divisé par le nombre total d&apos;avis. Avec 10 avis, un nouvel avis représente près
            d&apos;un dixième de la note ; avec 200, moins d&apos;un deux-centième. C&apos;est aussi pourquoi un avis négatif
            isolé fait chuter une jeune fiche et passe presque inaperçu sur une fiche ancienne. Viser la régularité compte
            donc plus qu&apos;une campagne ponctuelle : voir notre article sur{' '}
            <Link href="/blog/velocite-avis-google">la vélocité des avis Google</Link>.
          </p>

          <h2>Ce que le calcul ne dit pas</h2>
          <p>
            Le calcul suppose que les avis existants restent en ligne. Google peut en retirer, ce qui modifie la moyenne
            sans action de votre part. Les nouveaux avis doivent par ailleurs être spontanés : les{' '}
            <a href="https://support.google.com/contributionpolicy/answer/7400114?hl=fr" target="_blank" rel="noopener noreferrer">
              règles de Google
            </a>{' '}
            interdisent les contreparties et la sollicitation réservée aux clients satisfaits. La seule façon durable
            d&apos;atteindre la note visée est de demander l&apos;avis à tous vos clients, au bon moment.
          </p>

          <h2>Comment obtenir ces avis ?</h2>
          <p>
            En supprimant les étapes entre l&apos;intention du client et le formulaire d&apos;avis. Une{' '}
            <Link href="/">plaque NFC avis Google</Link> posée là où le client paie ouvre ce formulaire d&apos;un geste,
            sans application. Pour aller plus loin : <Link href="/blog/ameliorer-note-google">améliorer sa note Google</Link>,{' '}
            <Link href="/blog/note-google-ideale">la note Google idéale</Link> et{' '}
            <Link href="/blog/obtenir-plus-avis-google">obtenir plus d&apos;avis Google</Link>.
          </p>

          <h2>Questions fréquentes</h2>
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
