'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { track } from '@/lib/analytics'
import { LOWEST_PRICE_CENTS, PACK_LIST, formatHt } from '@/lib/pricing'
import { NOM_PACK } from '@/lib/product-schema'

/**
 * Parcours de conversion des articles de blog.
 *
 * POURQUOI — mesures du 1er octobre 2026 (Clarity et GA4, 28 à 30 jours) :
 * - les lecteurs partent tôt : sur mobile, 4 sur 5 quittent l'article avant
 *   15 % de la page et aucun ne dépasse 30 % ; sur ordinateur, la moitié
 *   s'arrête avant 25 % et personne n'atteint 80 %. Engagement moyen : 20 à
 *   30 secondes ;
 * - sur mobile, le seul élément de conversion était une bannière AVANT le
 *   titre, vue avant de lire, et le premier lien d'achat arrivait à 56 % de la
 *   page ;
 * - sur ordinateur, quatre encarts se concurrençaient, dont une publicité
 *   pour un autre site au milieu de l'article ;
 * - le seul acheteur venu d'un article l'a quitté au bout de 37 secondes par
 *   le menu « Produit » : aucun bouton d'achat n'était à l'écran.
 *
 * D'où quatre éléments, chacun avec un rôle :
 * 1. l'encart, après la première section : la proposition arrive quand le
 *    lecteur a compris le problème, dans la zone que la plupart voient ;
 * 2. la barre mobile : une fois l'encart dépassé, l'achat reste à un geste
 *    pendant toute la lecture ; on peut la masquer ;
 * 3. la carte en colonne, sur ordinateur : masquée tant que l'encart est à
 *    l'écran, pour ne jamais afficher deux fois le même message ;
 * 4. la fin d'article : le choix du pack, pour ceux qui lisent jusqu'au bout.
 *
 * MESURE : événements e-commerce standard de GA4, view_promotion à
 * l'affichage et select_promotion au clic, avec l'emplacement en
 * creative_slot. Ils permettent de comparer les quatre emplacements et de
 * supprimer celui qui ne sert pas.
 */

type Emplacement = 'encart_article' | 'colonne_article' | 'barre_mobile_article' | 'fin_article'
type Position = 'avant' | 'visible' | 'apres'

const PRIX_MINIMUM = formatHt(LOWEST_PRICE_CENTS)
const PHOTO = '/product-main.jpg'
const ALT_PHOTO = 'Plaque Swiipx « Laissez-nous votre avis » : logo Google, zone NFC et QR code de secours'
const CLE_BARRE_MASQUEE = 'swiipx-barre-article-masquee'

function promotion(emplacement: Emplacement, slug: string) {
  return { creative_slot: emplacement, promotion_id: slug, promotion_name: 'plaque_nfc' }
}

function clicPromotion(emplacement: Emplacement, slug: string, destination: string) {
  track('select_promotion', { ...promotion(emplacement, slug), destination })
}

/** Envoie view_promotion une seule fois, quand la moitié de l'élément est à l'écran. */
function useAffichage<T extends Element>(emplacement: Emplacement, slug: string, actif = true) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !actif || typeof IntersectionObserver === 'undefined') return
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          track('view_promotion', promotion(emplacement, slug))
          observateur.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observateur.observe(element)
    return () => observateur.disconnect()
  }, [emplacement, slug, actif])
  return ref
}

/** Position d'un repère de la page par rapport à l'écran : pas encore atteint, à l'écran, ou dépassé. */
function usePosition(selecteur: string, siAbsent: Position): Position {
  const [position, setPosition] = useState<Position>('avant')
  useEffect(() => {
    const element = document.querySelector(selecteur)
    if (!element || typeof IntersectionObserver === 'undefined') {
      setPosition(siAbsent)
      return
    }
    const observateur = new IntersectionObserver(([entree]) => {
      if (entree.isIntersecting) setPosition('visible')
      else setPosition(entree.boundingClientRect.top < 0 ? 'apres' : 'avant')
    })
    observateur.observe(element)
    return () => observateur.disconnect()
  }, [selecteur, siAbsent])
  return position
}

/** 1. Encart placé après la première section de l'article. */
export function EncartProduit({ slug }: { slug: string }) {
  const ref = useAffichage<HTMLElement>('encart_article', slug)
  return (
    <aside
      ref={ref}
      data-encart-produit
      aria-label="La plaque NFC avis Google Swiipx"
      className="my-10 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-white sm:h-24 sm:w-24">
          <Image src={PHOTO} alt={ALT_PHOTO} fill sizes="96px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">La solution Swiipx</p>
          <p className="font-bold leading-snug text-gray-900">
            Une plaque NFC livrée déjà programmée avec votre lien d&apos;avis Google
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Vos clients approchent leur téléphone, la page d&apos;avis s&apos;ouvre. Sans application, sans abonnement.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          <span className="font-bold text-gray-900">Dès {PRIX_MINIMUM}</span> · expédiée sous 24 h ouvrées
        </p>
        <Link
          href="/#product"
          onClick={() => clicPromotion('encart_article', slug, '/#product')}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          Voir les packs
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}

/** 2. Barre mobile : visible une fois l'encart dépassé, jusqu'à la fin de l'article. */
export function BarreProduitMobile({ slug }: { slug: string }) {
  const encart = usePosition('[data-encart-produit]', 'apres')
  const fin = usePosition('[data-fin-article]', 'avant')
  const [masquee, setMasquee] = useState(true)

  useEffect(() => {
    try {
      setMasquee(sessionStorage.getItem(CLE_BARRE_MASQUEE) === '1')
    } catch {
      setMasquee(false)
    }
  }, [])

  const visible = !masquee && encart === 'apres' && fin === 'avant'
  const ref = useAffichage<HTMLDivElement>('barre_mobile_article', slug, visible)

  const masquer = () => {
    setMasquee(true)
    try {
      sessionStorage.setItem(CLE_BARRE_MASQUEE, '1')
    } catch {
      /* stockage indisponible : la barre restera masquée jusqu'au rechargement */
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[140] lg:hidden motion-safe:transition-transform motion-safe:duration-300 ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg">
          <Image src={PHOTO} alt="" fill sizes="44px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-gray-900">Plaque NFC avis Google</p>
          <p className="truncate text-xs text-gray-600">Dès {PRIX_MINIMUM} · livrée programmée</p>
        </div>
        <Link
          href="/#product"
          tabIndex={visible ? 0 : -1}
          onClick={() => clicPromotion('barre_mobile_article', slug, '/#product')}
          className="flex-shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white"
        >
          Voir
        </Link>
        <button
          type="button"
          onClick={masquer}
          tabIndex={visible ? 0 : -1}
          aria-label="Masquer"
          className="-mr-1 flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

/** 3. Carte en colonne, sur ordinateur : masquée tant que l'encart est à l'écran. */
export function CarteProduitColonne({ slug }: { slug: string }) {
  const encart = usePosition('[data-encart-produit]', 'avant')
  const visible = encart !== 'visible'
  const ref = useAffichage<HTMLDivElement>('colonne_article', slug, visible)

  return (
    <div
      ref={ref}
      aria-hidden={!visible}
      className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm motion-safe:transition-opacity motion-safe:duration-300 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
        <Image src={PHOTO} alt={ALT_PHOTO} fill sizes="280px" className="object-cover" />
      </div>
      <p className="font-bold text-gray-900">Plaque NFC avis Google</p>
      <p className="mt-1 text-sm leading-relaxed text-gray-600">
        Livrée déjà programmée avec le lien d&apos;avis de votre établissement. Sans application, sans abonnement.
      </p>
      <p className="mt-3 text-lg font-bold text-primary">Dès {PRIX_MINIMUM}</p>
      <Link
        href="/#product"
        tabIndex={visible ? 0 : -1}
        onClick={() => clicPromotion('colonne_article', slug, '/#product')}
        className="mt-3 block w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-white transition-colors hover:bg-blue-700"
      >
        Voir les packs
      </Link>
      <p className="mt-2 text-center text-xs text-gray-500">Livraison offerte en point relais · Garantie à vie</p>
    </div>
  )
}

/** 4. Fin d'article : le choix du pack, et la page du secteur quand elle existe. */
export function FinArticle({ slug, secteur }: { slug: string; secteur: { slug: string; label: string } | null }) {
  const ref = useAffichage<HTMLElement>('fin_article', slug)
  return (
    <section
      ref={ref}
      data-fin-article
      aria-labelledby="fin-article-titre"
      className="mt-12 rounded-2xl border border-gray-200 p-5 sm:p-6"
    >
      <h2 id="fin-article-titre" className="text-xl font-bold text-gray-900 sm:text-2xl">
        Équipez votre établissement
      </h2>
      <p className="mt-2 leading-relaxed text-gray-600">
        Chaque plaque arrive programmée avec le lien d&apos;avis Google de votre établissement. Choisissez selon le
        nombre d&apos;emplacements à équiper :
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {PACK_LIST.map((pack) => (
          <Link
            key={pack.slug}
            href={`/product/${pack.slug}`}
            onClick={() => clicPromotion('fin_article', slug, `/product/${pack.slug}`)}
            className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-primary hover:bg-blue-50"
          >
            <span className="block font-bold text-gray-900">{NOM_PACK[pack.slug]}</span>
            <span className="block text-sm text-gray-600">
              {pack.plaques} plaque{pack.plaques > 1 ? 's' : ''}
            </span>
            <span className="mt-2 block font-bold text-primary">{formatHt(pack.priceCents)}</span>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">Paiement unique, sans abonnement · Livraison offerte en point relais</p>
      {secteur && (
        <Link
          href={`/secteur/${secteur.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          {secteur.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </section>
  )
}
