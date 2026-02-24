'use client'

import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, Star, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────
   Articles data (à remplacer par un CMS)
   ───────────────────────────────────────────── */
const articles: Record<string, {
  title: string
  category: string
  date: string
  readTime: string
  author: string
  excerpt: string
  tocSections: { id: string; label: string }[]
  content: string
}> = {
  'obtenir-plus-avis-google': {
    title: 'Comment obtenir plus d\'avis Google en 2025 : le guide complet (+ 10 méthodes)',
    category: 'Stratégie',
    date: '15 janvier 2026',
    readTime: '7 min',
    author: 'Équipe Swiipx',
    excerpt: 'Découvrez 10 méthodes testées pour obtenir plus d\'avis Google rapidement. Guide pratique avec scripts, exemples et résultats concrets.',
    tocSections: [
      { id: 'pourquoi-avis', label: 'Pourquoi les avis comptent' },
      { id: 'methode-nfc', label: 'Méthode 1 : Le NFC' },
      { id: 'methode-timing', label: 'Méthode 2 : Le timing' },
      { id: 'methode-script', label: 'Méthode 3 : Le script' },
      { id: 'methode-equipe', label: 'Méthode 4 : L\'équipe' },
      { id: 'methode-qr', label: 'Méthode 5 : QR Code' },
      { id: 'methode-repondre', label: 'Méthode 6 : Répondre' },
      { id: 'methode-email', label: 'Méthode 7 : Email' },
      { id: 'methode-preuve', label: 'Méthode 8 : Preuve sociale' },
      { id: 'methode-routine', label: 'Méthode 9 : Routine' },
      { id: 'methode-sms', label: 'Méthode 10 : SMS' },
      { id: 'erreurs', label: 'Les 7 erreurs à éviter' },
      { id: 'cas-pratique', label: 'Cas pratique' },
      { id: 'faq-avis', label: 'FAQ' },
    ],
    content: `
<section id="pourquoi-avis" class="scroll-mt-28 mb-16">
<h2>Pourquoi les avis Google sont essentiels en 2026</h2>
<p>Avant de parler stratégie, comprenons <strong>pourquoi les avis Google sont devenus incontournables</strong> :</p>
<ul>
<li><strong>93% des consommateurs</strong> lisent les avis en ligne avant d'acheter (BrightLocal 2025)</li>
<li><strong>87% des Français</strong> font autant confiance aux avis qu'aux recommandations personnelles</li>
<li>Une entreprise avec <strong>50+ avis</strong> apparaît <strong>3x plus souvent</strong> dans le pack local Google</li>
<li>Passer de 3,5 à 4,5 étoiles = <strong>+25% de chiffre d'affaires</strong> en moyenne</li>
</ul>
<div class="bg-blue-50 rounded-xl p-4 border border-blue-200 not-prose">
<p class="text-sm text-blue-900"><strong>💡 Impact SEO :</strong> Google utilise les avis comme facteur de classement majeur. Plus vous avez d'avis récents et positifs, plus Google vous met en avant.</p>
</div>
</section>

<section id="methode-nfc" class="scroll-mt-28 mb-16">
<h2>Méthode 1 : Éliminez la friction avec le NFC (la plus efficace)</h2>
<p><strong>Le problème :</strong> 95% des clients satisfaits ne laissent jamais d'avis car c'est trop long (ouvrir Google, chercher votre entreprise, cliquer sur avis...).</p>
<p><strong>La solution :</strong> Utilisez une <strong>plaque NFC</strong> qui redirige instantanément vers votre page d'avis.</p>
<ol>
<li>Le client approche son téléphone de la plaque</li>
<li>Une notification s'affiche</li>
<li>Il clique et arrive directement sur la page d'avis</li>
<li>Il note et commente en 30 secondes</li>
</ol>
<div class="bg-green-50 rounded-xl p-4 border border-green-200 not-prose">
<p class="text-sm text-green-900"><strong>📊 Résultat :</strong> Nos utilisateurs passent de 2-3 avis/mois à <strong>15-25 avis/mois</strong>.</p>
</div>
<blockquote><p>💡 <strong>Astuce pro :</strong> Placez la plaque là où le client est le plus satisfait (après le dessert, en sortant du salon, à la remise du produit).</p></blockquote>
</section>

<section id="methode-timing" class="scroll-mt-28 mb-16">
<h2>Méthode 2 : Demandez au bon moment</h2>
<p>Le timing est <strong>crucial</strong>. Un client satisfait oublie son expérience en quelques heures.</p>
<h3>Les 3 meilleurs moments pour demander un avis :</h3>
<ol>
<li><strong>Immédiatement après</strong> une expérience positive</li>
<li><strong>Au moment du paiement</strong></li>
<li><strong>À la sortie</strong></li>
</ol>
<h3>Les pires moments :</h3>
<ul>
<li>❌ Plusieurs jours après (trop tard)</li>
<li>❌ Pendant le service (intrusif)</li>
<li>❌ Par email 1 semaine après (taux < 5%)</li>
</ul>
</section>

<section id="methode-script" class="scroll-mt-28 mb-16">
<h2>Méthode 3 : Utilisez le script parfait</h2>
<p>Ne dites JAMAIS "Pouvez-vous nous laisser un avis ?". Trop générique.</p>
<h3>Script qui convertit à 40% :</h3>
<blockquote><p>"Je suis ravi que votre [plat/coupe/achat] vous ait plu ! Si vous avez 30 secondes, un petit avis Google nous aiderait énormément. Vous pouvez simplement approcher votre téléphone ici, c'est instantané !"</p></blockquote>
<p><strong>Pourquoi ça marche :</strong></p>
<ul>
<li>Personnalisé (on cite ce qu'il a aimé)</li>
<li>Donne une raison altruiste (aider les autres)</li>
<li>Minimise l'effort ("30 secondes", "instantané")</li>
<li>Action claire (approcher le téléphone)</li>
</ul>
</section>

<section id="methode-equipe" class="scroll-mt-28 mb-16">
<h2>Méthode 4 : Formez votre équipe</h2>
<p>Vos employés sont en première ligne. S'ils ne demandent pas d'avis, vous en perdez <strong>des dizaines chaque mois</strong>.</p>
<h3>Formation en 3 points :</h3>
<ol>
<li><strong>Expliquez le POURQUOI :</strong> "Plus d'avis = plus de clients = plus de pourboires"</li>
<li><strong>Donnez-leur un script :</strong> Cf. méthode 3</li>
<li><strong>Fixez un objectif :</strong> "3 avis par jour et par employé"</li>
</ol>
<div class="bg-yellow-50 rounded-xl p-4 border border-yellow-200 not-prose">
<p class="text-sm text-yellow-900"><strong>🏆 Astuce :</strong> Créez un mini-challenge avec récompense pour l'employé qui génère le plus d'avis du mois.</p>
</div>
</section>

<section id="methode-qr" class="scroll-mt-28 mb-16">
<h2>Méthode 5 : Créez un QR code de secours</h2>
<p>Tous les téléphones n'ont pas le NFC activé. Ayez toujours un <strong>plan B</strong>.</p>
<ol>
<li>Allez sur votre fiche Google My Business</li>
<li>Cliquez sur "Obtenir plus d'avis"</li>
<li>Copiez le lien</li>
<li>Générez un QR code</li>
<li>Imprimez et placez à côté de votre plaque NFC</li>
</ol>
</section>

<section id="methode-repondre" class="scroll-mt-28 mb-16">
<h2>Méthode 6 : Répondez à TOUS les avis</h2>
<p><strong>89% des consommateurs</strong> lisent les réponses aux avis. Ne pas répondre envoie un mauvais signal.</p>
<h3>Template avis positif (5★) :</h3>
<blockquote><p>"Merci infiniment [Prénom] pour ces mots qui nous touchent ! 🙏 Toute l'équipe est ravie que [élément mentionné] vous ait plu. On a hâte de vous revoir ! - [Votre prénom]"</p></blockquote>
<h3>Template avis négatif :</h3>
<blockquote><p>"Merci [Prénom] pour ce retour. Nous sommes sincèrement désolés. Pourriez-vous nous contacter à [email] ? Nous aimerions comprendre et rectifier cela. - [Votre prénom], gérant"</p></blockquote>
</section>

<section id="methode-email" class="scroll-mt-28 mb-16">
<h2>Méthode 7 : Exploitez l'email post-visite</h2>
<h3>Template email :</h3>
<blockquote>
<p><strong>Objet :</strong> [Prénom], merci pour votre visite ! (30 sec)</p>
<p>Bonjour [Prénom],<br>Merci d'avoir choisi [Entreprise] !<br>Si vous avez apprécié votre expérience, un avis Google nous aiderait énormément :<br>👉 [Lien direct]<br>Merci d'avance,<br>L'équipe [Entreprise]</p>
</blockquote>
<p><strong>Règles :</strong> Envoyez dans les 24h, UN seul email, lien direct vers la page d'avis.</p>
</section>

<section id="methode-preuve" class="scroll-mt-28 mb-16">
<h2>Méthode 8 : Affichez vos avis existants</h2>
<p>Les clients laissent plus facilement un avis quand ils voient que d'autres l'ont fait.</p>
<ul>
<li>Widget Google sur votre site web</li>
<li>Écran dans votre établissement</li>
<li>Stories Instagram avec captures d'écran</li>
<li>Stickers "4.8★ sur Google" en vitrine</li>
</ul>
</section>

<section id="methode-routine" class="scroll-mt-28 mb-16">
<h2>Méthode 9 : Créez une routine quotidienne</h2>
<div class="not-prose overflow-x-auto mb-6">
<table class="w-full text-sm border-collapse">
<thead><tr class="border-b-2 border-gray-200"><th class="text-left py-3 px-4 font-bold text-gray-900">Moment</th><th class="text-left py-3 px-4 font-bold text-gray-900">Action</th></tr></thead>
<tbody>
<tr class="border-b border-gray-100"><td class="py-3 px-4">Ouverture</td><td class="py-3 px-4">Vérifier que la plaque NFC est bien visible</td></tr>
<tr class="border-b border-gray-100"><td class="py-3 px-4">Chaque client satisfait</td><td class="py-3 px-4">Demander un avis (script)</td></tr>
<tr class="border-b border-gray-100"><td class="py-3 px-4">Fin de journée</td><td class="py-3 px-4">Répondre aux nouveaux avis</td></tr>
<tr class="border-b border-gray-100"><td class="py-3 px-4">Chaque semaine</td><td class="py-3 px-4">Analyser les retours et ajuster</td></tr>
</tbody>
</table>
</div>
</section>

<section id="methode-sms" class="scroll-mt-28 mb-16">
<h2>Méthode 10 : Utilisez les SMS (taux d'ouverture 98%)</h2>
<p>Le SMS a un taux d'ouverture de <strong>98%</strong> contre 20% pour l'email.</p>
<h3>Template SMS :</h3>
<blockquote><p>"Merci pour votre visite chez [Entreprise] ! Un avis Google nous aiderait beaucoup 🙏 → [lien court] Merci !"</p></blockquote>
<div class="bg-red-50 rounded-xl p-4 border border-red-200 not-prose">
<p class="text-sm text-red-900"><strong>⚠️ Important :</strong> N'envoyez qu'aux clients qui ont donné leur accord (RGPD).</p>
</div>
</section>

<section id="erreurs" class="scroll-mt-28 mb-16">
<h2>Les 7 erreurs qui peuvent vous faire BANNIR de Google</h2>
<ol>
<li><strong>❌ Acheter des faux avis</strong> — Google les détecte. Sanctions : suppression de tous vos avis, suspension de votre fiche.</li>
<li><strong>❌ Offrir des récompenses</strong> — "1 avis = 10€ de réduction" est interdit par les CGU Google.</li>
<li><strong>❌ Filtrer les clients</strong> — Ne demandez pas qu'aux satisfaits. Google détecte les patterns.</li>
<li><strong>❌ Harceler vos clients</strong> — 1 demande max sinon avis négatifs de frustration.</li>
<li><strong>❌ Ignorer les avis négatifs</strong> — Un avis sans réponse fait fuir 94% des prospects.</li>
<li><strong>❌ Répondre agressivement</strong> — Restez professionnel, les prospects vous jugent.</li>
<li><strong>❌ Utiliser de faux profils</strong> — Google croise les données.</li>
</ol>
</section>

<section id="cas-pratique" class="scroll-mt-28 mb-16">
<h2>Cas pratique : De 12 à 89 avis en 3 mois</h2>
<div class="bg-green-50 rounded-2xl p-6 border border-green-200 not-prose">
<h3 class="font-bold text-gray-900 mb-3">📍 Restaurant "La Table Française" — Lyon</h3>
<div class="grid sm:grid-cols-2 gap-4 mb-4">
<div>
<p class="text-sm text-gray-600 mb-1">Situation initiale :</p>
<ul class="text-sm text-gray-700 space-y-1">
<li>• 12 avis, note 4,1 ⭐</li>
<li>• Position pack local : 8ème</li>
</ul>
</div>
<div>
<p class="text-sm text-gray-600 mb-1">Après 3 mois :</p>
<ul class="text-sm text-gray-700 space-y-1">
<li>• <strong class="text-green-700">89 avis (+640%)</strong>, note 4,7 ⭐</li>
<li>• Position pack local : <strong class="text-green-700">2ème</strong></li>
<li>• <strong class="text-green-700">+45% de réservations</strong></li>
</ul>
</div>
</div>
</div>
</section>

<section id="faq-avis" class="scroll-mt-28 mb-16">
<h2>FAQ : Vos questions sur les avis Google</h2>
<h3>Combien d'avis faut-il pour bien se classer ?</h3>
<p><strong>Minimum 50 avis</strong> pour apparaître dans le top 5. Idéalement 100+ pour dominer.</p>
<h3>Est-ce que Google supprime les avis ?</h3>
<p>Oui : langage offensant, faux avis, sans rapport avec l'entreprise, ou laissés par des bots.</p>
<h3>Les avis anciens comptent-ils encore ?</h3>
<p>Oui mais moins. Google privilégie les avis récents (moins de 3 mois).</p>
<h3>Quelle est la meilleure note à avoir ?</h3>
<p><strong>4,5-4,8 étoiles</strong> convertit mieux que 5,0. Une note parfaite paraît suspecte.</p>
</section>
    `,
  },
  'avis-clients-influencent-business': {
    title: 'Pourquoi les avis clients influencent votre business (Guide 2026)',
    category: 'Business',
    date: '8 novembre 2025',
    readTime: '12 min',
    author: 'Équipe Swiipx',
    excerpt: 'Guide pilier 2026 : impact des avis sur le CA, conversion, SEO local, parcours client, psychologie, gestion des avis négatifs, stratégies par secteur, ROI et FAQ complète.',
    tocSections: [
      { id: 'introduction', label: 'Pourquoi c\'est devenu critique' },
      { id: 'stats-cles', label: 'Les chiffres qui parlent (2026)' },
      { id: 'impact-ca', label: 'Impact direct sur le CA' },
      { id: 'seo-local', label: 'Impact SEO local & visibilité' },
      { id: 'parcours-client', label: 'Parcours client (découverte → achat)' },
      { id: 'psychologie', label: 'Psychologie & confiance' },
      { id: 'negatifs', label: 'Avis négatifs : risques & opportunités' },
      { id: 'reponses', label: 'Répondre aux avis (templates)' },
      { id: 'secteurs', label: 'Impact par secteur (resto, santé, etc.)' },
      { id: 'strategie', label: 'Stratégie complète (collecter + gérer)' },
      { id: 'cas-pratiques', label: 'Cas pratiques & ROI' },
      { id: 'faq', label: 'FAQ complète' },
    ],
    content: `
<section id="introduction" class="scroll-mt-28 mb-16">
<h2>Pourquoi c'est devenu critique en 2026</h2>
<p>Les avis clients ne sont plus un "plus" : ils sont devenus le facteur de décision numéro 1 pour la majorité des consommateurs. En 2026, ignorer les avis, c'est ignorer la façon dont vos clients vous trouvent, vous évaluent et vous choisissent.</p>
<p>Voici la réalité simple : plus de 99% des consommateurs américains lisent des avis avant d'acheter, et 93% déclarent que les avis influencent directement leur décision. En France, les chiffres sont similaires : 87% des Français font autant confiance aux avis en ligne qu'aux recommandations de leurs proches.</p>
<p>Cette confiance n'est pas anecdotique : elle se traduit par du chiffre d'affaires, de la visibilité, et de la crédibilité. Ce guide explore en profondeur pourquoi et comment les avis influencent chaque aspect de votre business.</p>
</section>

<section id="stats-cles" class="scroll-mt-28 mb-16">
<h2>Les chiffres qui parlent (données 2026)</h2>
<h3>Confiance et comportement d'achat</h3>
<ul>
<li><strong>99%</strong> des consommateurs américains lisent des avis avant d'acheter (Capital One Shopping 2026).</li>
<li><strong>93%</strong> disent que les avis influencent leur décision d'achat.</li>
<li><strong>42%</strong> font autant confiance aux avis qu'aux recommandations personnelles (ce chiffre monte à 91% chez les 18-34 ans).</li>
<li>Les consommateurs passent en moyenne <strong>13 minutes 45 secondes</strong> à lire des avis avant de faire confiance à une entreprise locale.</li>
<li>Ils lisent en moyenne <strong>10 avis</strong> avant de prendre une décision.</li>
</ul>
<h3>Impact conversion et revenus</h3>
<ul>
<li>Afficher des avis augmente les ventes de <strong>19,8%</strong> en moyenne.</li>
<li>Passer de 0 à 5 avis augmente la conversion de <strong>270%</strong>.</li>
<li>Les avis vérifiés augmentent la conversion de <strong>15%</strong> supplémentaires.</li>
<li>Les produits de luxe voient leur conversion augmenter de <strong>380%</strong> avec des avis (contre 190% pour les produits bas de gamme).</li>
<li>Une augmentation d'une étoile génère <strong>5 à 9% de revenus supplémentaires</strong> (Harvard Business School).</li>
</ul>
<h3>Comportement face aux avis négatifs</h3>
<ul>
<li><strong>96%</strong> des consommateurs lisent des avis avant d'acheter.</li>
<li><strong>94%</strong> disent qu'un avis négatif les a convaincus d'éviter une entreprise.</li>
<li><strong>76%</strong> trouvent les avis mixtes (positifs + négatifs) plus crédibles que les avis uniquement positifs.</li>
<li><strong>86%</strong> hésitent à acheter si l'entreprise a des avis négatifs non répondus.</li>
</ul>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose">
<p class="text-sm text-gray-700"><strong>À retenir :</strong> les avis ne sont pas une option, ils sont le principal signal de confiance que vos prospects utilisent pour vous évaluer.</p>
</div>
</section>

<section id="impact-ca" class="scroll-mt-28 mb-16">
<h2>Impact direct sur le chiffre d'affaires</h2>
<h3>La formule simple : plus d'avis = plus de CA</h3>
<p>L'effet des avis sur les revenus est direct et mesurable. Une augmentation d'une étoile sur votre note moyenne génère entre 5% et 9% de revenus supplémentaires. Pour une entreprise locale qui fait 300 000€ de CA annuel, passer de 4,0 à 4,5 étoiles peut représenter 15 000€ à 27 000€ de revenus additionnels.</p>
<h3>La note optimale : 4,9/5 (pas 5,0)</h3>
<p>Contre-intuitivement, le taux de conversion atteint son pic à <strong>4,9 étoiles</strong>, pas 5,0. Pourquoi ? Les consommateurs se méfient des notes "trop parfaites" et cherchent l'authenticité. Un profil 4,9 avec quelques avis négatifs bien gérés est plus crédible qu'un profil 5,0 sans faille.</p>
<h3>Le seuil des 5 premiers avis</h3>
<p>Les 5 premiers avis ont l'impact le plus fort : ils augmentent la conversion de 270%. Après ce seuil, chaque avis additionnel continue d'aider, mais avec un effet décroissant. L'objectif : atteindre rapidement 10–20 avis, puis maintenir un flux régulier.</p>
<h3>Avis avec photos : +19,8% de ventes</h3>
<p>Les avis accompagnés de photos renforcent encore plus la confiance. Les photos prouvent que le client a vraiment utilisé le service/produit. L'impact est direct : +19,8% de ventes en moyenne quand les avis incluent des photos.</p>
</section>

<section id="seo-local" class="scroll-mt-28 mb-16">
<h2>Impact SEO local & visibilité (Google Maps)</h2>
<p>Les avis ne se contentent pas de convaincre les clients : ils influencent aussi votre <strong>classement sur Google Maps</strong> et dans le pack local.</p>
<h3>Les avis = 20% du classement local</h3>
<p>Selon le rapport Whitespark 2026 (Local Search Ranking Factors), les signaux d'avis représentent environ <strong>20%</strong> du poids dans l'algorithme de classement local. C'est le 2ème facteur le plus important, juste derrière Google Business Profile (32%).</p>
<p>Concrètement, cela signifie qu'une entreprise avec 50 avis récents et une note de 4,7 va souvent surpasser un concurrent mieux placé géographiquement mais avec seulement 8 avis et une note de 4,1.</p>
<h3>Volume, régularité et récence</h3>
<p>Google valorise trois aspects des avis :</p>
<ul>
<li><strong>Volume total</strong> : plus vous en avez, plus vous semblez établi.</li>
<li><strong>Régularité</strong> : 1 avis/semaine sur 6 mois bat 20 avis d'un coup puis plus rien.</li>
<li><strong>Récence</strong> : les avis récents (moins de 3 mois) pèsent plus lourd.</li>
</ul>
<h3>Les entreprises avec 50+ avis apparaissent 3x plus souvent</h3>
<p>Les données montrent qu'au-delà de 50 avis, votre probabilité d'apparaître dans le pack local (les 3 résultats avec carte) augmente drastiquement. Vous devenez visible sur plus de requêtes, plus de quartiers, plus de variantes de mots-clés.</p>
<div class="bg-green-50 rounded-xl p-4 border border-green-200 not-prose">
<p class="text-sm text-gray-700"><strong>Bonne pratique :</strong> visez un objectif hebdo (ex : 2 avis/semaine), pas un rush ponctuel. C'est la régularité qui envoie le signal le plus fort à Google.</p>
</div>
</section>

<section id="parcours-client" class="scroll-mt-28 mb-16">
<h2>Impact à chaque étape du parcours client</h2>
<h3>Étape 1 : Découverte (recherche locale)</h3>
<p>Votre prospect tape "coiffeur près de moi" ou "restaurant bordeaux". Google affiche 3 entreprises dans le pack local. Les critères de classement incluent les avis. Résultat : si vous avez peu d'avis ou une note faible, vous n'apparaissez même pas.</p>
<p><strong>Statistique clé :</strong> Les entreprises avec 50+ avis apparaissent 3x plus souvent dans le pack local.</p>
<h3>Étape 2 : Évaluation (comparaison)</h3>
<p>Le prospect compare 2–3 entreprises. Il lit les avis pour se faire une idée. À ce stade, la note et le volume comptent, mais surtout : les <strong>détails</strong>. Un avis qui mentionne "pizza napolitaine délicieuse" ou "balayage parfaitement réalisé" est bien plus convaincant qu'un simple "super".</p>
<p><strong>Statistique clé :</strong> 92% des consommateurs hésitent à contacter une entreprise avec moins de 4 étoiles.</p>
<h3>Étape 3 : Décision (confiance finale)</h3>
<p>Le prospect est presque convaincu. Il lit les avis les plus récents (pour vérifier que le niveau est constant), puis vérifie les avis négatifs (pour voir comment l'entreprise réagit). Si tout est cohérent, il passe à l'action.</p>
<p><strong>Statistique clé :</strong> 63% de chances supplémentaires de convertir si les avis récents sont positifs.</p>
<h3>Étape 4 : Post-achat (advocacy)</h3>
<p>Si l'expérience est bonne, le client peut devenir ambassadeur. Mais seulement 2% le font spontanément. Votre job : rendre ce processus simple (NFC, QR, lien direct).</p>
</section>

<section id="psychologie" class="scroll-mt-28 mb-16">
<h2>Psychologie & confiance : pourquoi ça marche</h2>
<h3>1) Preuve sociale</h3>
<p>Les humains prennent des décisions en observant les autres. Si 50 personnes disent que votre restaurant est excellent, le prospect se dit : "ils ne peuvent pas tous se tromper".</p>
<h3>2) Réduction du risque perçu</h3>
<p>Acheter/réserver = prendre un risque (temps, argent). Les avis rassurent : "d'autres ont testé avant moi, et ça s'est bien passé".</p>
<h3>3) Authenticité vs publicité</h3>
<p>Un avis est perçu comme <strong>12x plus crédible</strong> qu'une description produit rédigée par la marque. C'est une voix "neutre", extérieure, qui décrit l'expérience réelle.</p>
<h3>4) Le biais de négativité</h3>
<p>Les consommateurs lisent les avis négatifs pour "se protéger". Un seul avis négatif mal géré peut annuler l'effet de 10 avis positifs. D'où l'importance de répondre.</p>
<h3>5) Temps de lecture et objectivité</h3>
<p>Les consommateurs passent en moyenne 13 minutes 45 secondes à lire des avis. Ils cherchent des <strong>faits</strong>, pas des superlatifs. Les avis détaillés (avec contexte, points positifs ET négatifs) sont les plus convaincants.</p>
</section>

<section id="negatifs" class="scroll-mt-28 mb-16">
<h2>Avis négatifs : risques réels & opportunités cachées</h2>
<h3>Les risques (si mal gérés)</h3>
<ul>
<li><strong>94%</strong> des consommateurs disent qu'un avis négatif les a convaincus d'éviter une entreprise.</li>
<li><strong>86%</strong> hésitent à acheter si les avis négatifs ne sont pas répondus.</li>
<li>Un avis négatif non géré peut nécessiter jusqu'à <strong>40 expériences positives</strong> pour compenser l'impact.</li>
</ul>
<h3>Les opportunités (si bien gérés)</h3>
<ul>
<li><strong>67%</strong> des clients qui laissent un avis négatif reviennent si vous répondez rapidement.</li>
<li><strong>97%</strong> des prospects lisent vos réponses aux avis : c'est une opportunité de montrer votre professionnalisme.</li>
<li>Un avis négatif bien géré peut <strong>renforcer</strong> la confiance (preuve que vous écoutez et corrigez).</li>
</ul>
<h3>La règle d'or : répondre sous 48h</h3>
<p>Plus de 50% des consommateurs attendent une réponse dans la semaine. Mais les entreprises qui répondent sous 48h gagnent un avantage énorme : elles montrent qu'elles sont actives, attentives et professionnelles.</p>
<div class="bg-red-50 rounded-xl p-4 border border-red-200 not-prose">
<p class="text-sm text-red-900"><strong>Erreur fatale :</strong> ignorer les avis négatifs ou répondre de façon défensive ("ce n'est pas notre faute"). Reconnaissez, proposez une solution, et gardez le ton professionnel.</p>
</div>
</section>

<section id="reponses" class="scroll-mt-28 mb-16">
<h2>Répondre aux avis : templates et bonnes pratiques</h2>
<h3>Template avis positif (5 étoiles)</h3>
<blockquote><p>Merci [Prénom] pour votre retour ! Nous sommes ravis que [élément concret mentionné] vous ait plu. Toute l'équipe vous remercie et espère vous revoir bientôt à [Ville]. — [Votre prénom]</p></blockquote>
<h3>Template avis positif (4 étoiles avec suggestion)</h3>
<blockquote><p>Merci [Prénom] pour ces 4 étoiles. Heureux que [point positif] ait été à la hauteur. Concernant [point à améliorer], nous prenons note et travaillons déjà dessus. À très vite !</p></blockquote>
<h3>Template avis négatif (réponse constructive)</h3>
<blockquote><p>Bonjour [Prénom], merci d'avoir pris le temps de nous écrire. Nous sommes vraiment désolés que [problème] n'ait pas été à la hauteur. Pouvez-vous nous contacter au [téléphone] ou par email à [email] pour qu'on puisse corriger cela rapidement ? — [Votre prénom], [fonction]</p></blockquote>
<h3>Les 5 règles des bonnes réponses</h3>
<ul>
<li>Personnalisez (utilisez le prénom, mentionnez un détail de l'avis).</li>
<li>Remerciez toujours (même pour un avis négatif : "merci pour ce retour").</li>
<li>Soyez spécifique (citez le service, le produit, la ville).</li>
<li>Proposez une action concrète (pour les avis négatifs).</li>
<li>Restez professionnel (jamais défensif, jamais agressif).</li>
</ul>
</section>

<section id="secteurs" class="scroll-mt-28 mb-16">
<h2>Impact par secteur d'activité</h2>
<h3>Restauration</h3>
<p>Les avis sont critiques : 59% des consommateurs lisent des avis avant de choisir un restaurant. Les photos dans les avis augmentent les réservations. L'impact d'une étoile : +5–9% de CA.</p>
<h3>Santé (dentistes, kinés, médecins)</h3>
<p>59% des patients consultent des avis en ligne avant de prendre rendez-vous. 49% utilisent Google, 32% WebMD/Doctolib. La confiance est primordiale dans ce secteur : un seul avis négatif peut faire fuir 10 patients.</p>
<h3>Beauté & bien-être (salons, spas, esthétique)</h3>
<p>36% des consommateurs cherchent des avis pour choisir un salon. Les avis avec photos (avant/après) sont particulièrement efficaces. L'impact d'une bonne réputation : +180% de nouveaux clients dans certains cas.</p>
<h3>Services à domicile (plombiers, électriciens, serruriers)</h3>
<p>96% des consommateurs consultent des avis avant de choisir un prestataire à domicile. Le volume d'avis est moins important que la récence et la note : les clients veulent être sûrs que le service est toujours bon aujourd'hui.</p>
<h3>Commerce de détail</h3>
<p>87% des consommateurs lisent des avis pour des achats locaux. Les avis influencent surtout les achats moyens/élevés (bijoux, électronique, meubles). L'impact : +31% de dépenses pour les entreprises avec d'excellents avis.</p>
<h3>Hôtellerie & tourisme</h3>
<p>Les voyageurs d'affaires lisent en moyenne 5 avis, les voyageurs loisirs en lisent 6–7. 78% se concentrent sur les avis les plus récents. L'impact d'une étoile sur Booking/TripAdvisor : jusqu'à 11% de revenus.</p>
</section>

<section id="strategie" class="scroll-mt-28 mb-16">
<h2>Stratégie complète : collecter ET gérer vos avis</h2>
<h3>1) Collecter régulièrement (objectif : 1–2 avis/semaine)</h3>
<p>La régularité bat le volume ponctuel. Mettez en place un système simple :</p>
<ul>
<li>Demande sur place au bon moment (post-satisfaction).</li>
<li>Outil simple (plaque NFC, QR, lien direct).</li>
<li>Script court pour l'équipe.</li>
<li>1 relance maximum (24–48h) si besoin.</li>
</ul>
<h3>2) Répondre à TOUS les avis (sous 48h)</h3>
<p>Créez une routine : 10 minutes par jour pour lire et répondre. Utilisez des templates, mais personnalisez toujours.</p>
<h3>3) Encourager les avis détaillés (sans forcer)</h3>
<p>Un avis détaillé aide la conversion ET le SEO. Comment ? En mentionnant naturellement vos services, votre ville, et des mots-clés que vos prospects recherchent.</p>
<h3>4) Diversifier les plateformes (si pertinent)</h3>
<p>Google est prioritaire, mais selon votre secteur, travaillez aussi : Facebook (commerce local), TripAdvisor (resto/hôtel), Trustpilot (e-commerce/services), plateformes métier (Doctolib, Yelp…).</p>
<h3>5) Suivre les KPI</h3>
<ul>
<li>Nombre d'avis / semaine</li>
<li>Note moyenne</li>
<li>Taux de réponse (objectif : 100%)</li>
<li>Délai moyen de réponse</li>
<li>Mots-clés cités dans les avis</li>
</ul>
</section>

<section id="cas-pratiques" class="scroll-mt-28 mb-16">
<h2>Cas pratiques & ROI réels</h2>
<h3>Cas #1 : Restaurant "Le Petit Gourmet" (Bordeaux)</h3>
<p><strong>Avant :</strong> 12 avis, note 4,1 étoiles, 180 couverts/semaine.</p>
<p><strong>Actions :</strong> Plaque NFC sur les tables, script simple pour les serveurs, réponses systématiques.</p>
<p><strong>Après 6 mois :</strong> 67 avis, note 4,7 étoiles, 285 couverts/semaine (+58%).</p>
<p><strong>ROI :</strong> +105 couverts/semaine = environ +18 000€/mois (ticket moyen 40€). Investissement : 89€ (2 plaques NFC).</p>
<h3>Cas #2 : Salon "Beauty Studio" (Lyon)</h3>
<p><strong>Avant :</strong> 8 avis, note 4,2 étoiles, 45 clientes/semaine.</p>
<p><strong>Actions :</strong> Plaque NFC devant le miroir, demande systématique à la caisse.</p>
<p><strong>Après 4 mois :</strong> 89 avis, note 4,8 étoiles, 78 clientes/semaine (+73%).</p>
<p><strong>ROI :</strong> +33 clientes/semaine = environ +7 900€/mois (panier moyen 60€). Investissement : 59€ (pack 2 plaques).</p>
<h3>Cas #3 : Plombier "Dépann'Express" (Toulouse)</h3>
<p><strong>Avant :</strong> 5 avis, note 4,0 étoiles, 15 interventions/semaine.</p>
<p><strong>Actions :</strong> Carte NFC remise en fin d'intervention, SMS de suivi avec lien.</p>
<p><strong>Après 3 mois :</strong> 42 avis, note 4,6 étoiles, 28 interventions/semaine (+87%).</p>
<p><strong>ROI :</strong> +13 interventions/semaine = environ +10 400€/mois (ticket moyen 200€). Investissement : 39€ (cartes NFC).</p>
</section>

<section id="faq" class="scroll-mt-28 mb-16">
<h2>FAQ complète</h2>
<h3>Combien d'avis faut-il pour être crédible ?</h3>
<p>Il n'y a pas de chiffre magique. En général : 10 avis minimum pour inspirer confiance, 20–30 pour être compétitif, 50+ pour dominer votre zone. Mais la régularité compte plus que le total.</p>
<h3>Est-ce qu'une note de 5,0/5 est suspecte ?</h3>
<p>Oui, souvent. 76% des consommateurs trouvent les avis mixtes (4,7–4,9) plus crédibles qu'un 5,0 parfait. Quelques avis négatifs bien gérés renforcent l'authenticité.</p>
<h3>Que faire si je reçois un avis injuste ou faux ?</h3>
<p>Répondez professionnellement, expliquez les faits, puis signalez l'avis à Google si c'est vraiment abusif. Ne jamais insulter ou menacer : ça se retourne toujours contre vous.</p>
<h3>Dois-je répondre aux avis positifs ?</h3>
<p>Oui : 97% des prospects lisent vos réponses. Même un simple "Merci [Prénom], à très bientôt !" montre que vous êtes actif et reconnaissant.</p>
<h3>Les avis anciens comptent-ils encore ?</h3>
<p>Oui, mais moins. 85% des consommateurs considèrent qu'un avis de plus de 3 mois est moins pertinent. Visez un flux régulier d'avis récents.</p>
<h3>Combien de temps pour voir un impact business ?</h3>
<p>En général : 2–4 semaines pour un impact conversion (plus de clics, plus d'appels), 6–12 semaines pour un impact SEO local (meilleur classement Maps).</p>
<h3>Peut-on supprimer un avis négatif ?</h3>
<p>Seulement s'il viole les règles de la plateforme (spam, faux, hors sujet, insultes). Sinon, il faut répondre et transformer le négatif en opportunité.</p>
<h3>Quelle plateforme prioriser ?</h3>
<p>Google en priorité (64% des consommateurs vont d'abord sur Google). Ensuite, selon votre secteur : Facebook, TripAdvisor, Yelp, Trustpilot, plateformes métier.</p>
<h3>Acheter des avis, c'est risqué ?</h3>
<p>Oui : c'est illégal (300 000€ d'amende + 2 ans de prison en France), et Google détecte et supprime les faux avis. Vous risquez une suspension de fiche. Mieux vaut faciliter les avis authentiques.</p>
<h3>Les avis sur Facebook comptent-ils pour Google ?</h3>
<p>Pas directement pour le classement Maps, mais indirectement : si un prospect compare vos profils et voit une incohérence (5,0 sur Google, 3,2 sur Facebook), la confiance baisse.</p>
</section>
    `,
  },
  'booster-visibilite-locale': {
    title: '5 astuces pour booster votre visibilité locale (Guide 2026)',
    category: 'SEO Local',
    date: '5 novembre 2025',
    readTime: '11 min',
    author: 'Équipe Swiipx',
    excerpt: 'Guide pilier 2026 : Google Business Profile, avis, citations NAP, pages locales, backlinks. Avec checklists, plan 30/60/90 jours, cas pratiques et FAQ pour dominer le pack local.',
    tocSections: [
      { id: 'intro', label: 'Pourquoi la visibilité locale compte' },
      { id: 'piliers-google', label: 'Les 3 piliers du classement local' },
      { id: 'optimiser-gmb', label: 'Astuce 1 : Google Business Profile' },
      { id: 'collecter-avis', label: 'Astuce 2 : Collecter des avis' },
      { id: 'citations-locales', label: 'Astuce 3 : Citations & NAP' },
      { id: 'site-web-local', label: 'Astuce 4 : Site web local' },
      { id: 'backlinks-locaux', label: 'Astuce 5 : Backlinks locaux' },
      { id: 'bonus', label: 'Bonus : Posts, Q&A, photos' },
      { id: 'plan-action', label: 'Plan d\'action 30/60/90 jours' },
      { id: 'cas-pratiques', label: 'Cas pratiques & résultats' },
      { id: 'erreurs', label: 'Erreurs à éviter' },
      { id: 'faq', label: 'FAQ visibilité locale' },
    ],
    content: `
<section id="intro" class="scroll-mt-28 mb-16">
<h2>Pourquoi la visibilité locale compte (et plus que jamais en 2026)</h2>
<p>Quand un prospect tape "plombier Lyon", "coiffeur Bordeaux" ou "restaurant près de moi", Google affiche en priorité le <strong>pack local</strong> : les 3 entreprises avec la carte. Apparaître dans ce pack, c'est capter la majorité des clics, des appels et des demandes d'itinéraire. En 2026, la visibilité locale n'est plus optionnelle : c'est le canal numéro 1 pour les commerces de proximité.</p>
<p>Ce guide détaille les 5 astuces les plus efficaces pour booster votre visibilité locale, avec des checklists actionnables, un plan sur 30/60/90 jours, des cas pratiques et une FAQ complète. Objectif : vous positionner en tête des recherches de votre zone.</p>
<h3>Ce que vous allez apprendre</h3>
<ul>
<li>Comment optimiser votre fiche Google Business Profile (le levier à 32% du classement).</li>
<li>Comment collecter des avis réguliers (20% du classement).</li>
<li>Comment maîtriser les citations et le NAP (6%).</li>
<li>Comment structurer votre site pour le local (15%).</li>
<li>Comment obtenir des backlinks locaux (8%).</li>
</ul>
</section>

<section id="piliers-google" class="scroll-mt-28 mb-16">
<h2>Les 3 piliers du classement local (Google Maps & Pack local)</h2>
<p>Google évalue chaque entreprise locale sur trois dimensions : <strong>Proximité</strong>, <strong>Pertinence</strong> et <strong>Notoriété</strong>. Vous ne contrôlez pas la proximité (adresse du prospect), mais vous contrôlez la pertinence (fiche, site, mots-clés) et la notoriété (avis, liens, citations).</p>
<h3>Répartition des facteurs (rapport Whitespark 2026)</h3>
<ul>
<li><strong>Google Business Profile : 32%</strong> — Catégorie, complétude, horaires, attributs, photos, fraîcheur.</li>
<li><strong>Signaux d'avis : 20%</strong> — Volume, régularité, récence, qualité des avis.</li>
<li><strong>On-page (site) : 15%</strong> — Pages locales, schema, NAP, contenu structuré.</li>
<li><strong>Comportement : 9%</strong> — Clics, appels, itinéraires, popular times.</li>
<li><strong>Liens : 8%</strong> — Autorité et backlinks locaux.</li>
<li><strong>Citations : 6%</strong> — NAP cohérent sur annuaires.</li>
<li><strong>Personnalisation : 6%</strong> — Lieu, appareil, historique.</li>
<li><strong>Social : 4%</strong> — Engagement et signaux sociaux.</li>
</ul>
<p>En ciblant les 5 premières catégories (GBP, avis, site, liens, citations), vous couvrez plus de 80% des leviers actionnables. C'est exactement ce que ce guide détaille.</p>
</section>

<section id="optimiser-gmb" class="scroll-mt-28 mb-16">
<h2>Astuce 1 : Optimiser votre Google Business Profile à 100%</h2>
<p>Votre fiche Google Business Profile (ex-Google My Business) est votre vitrine sur Maps. Un profil incomplet ou approximatif vous fait perdre des positions, même avec un bon site et des avis.</p>
<h3>Checklist complète (30 minutes)</h3>
<ul>
<li><strong>Catégorie principale</strong> : choisir la plus précise (ex. "Salon de coiffure" et non "Beauté").</li>
<li><strong>Catégories secondaires</strong> : ajouter uniquement ce que vous faites vraiment.</li>
<li><strong>Nom</strong> : nom réel de l'entreprise, sans bourrage de mots-clés.</li>
<li><strong>Adresse & téléphone</strong> : identiques partout (site, annuaires).</li>
<li><strong>Horaires</strong> : à jour, y compris jours fériés et vacances.</li>
<li><strong>Zone de service</strong> : si vous vous déplacez (SAB), définir les villes/rayon.</li>
<li><strong>Description</strong> : 600–750 caractères, ville + services + mots-clés naturels.</li>
<li><strong>Services / Produits</strong> : lister chaque prestation avec les termes clients.</li>
<li><strong>Attributs</strong> : PMR, parking, WiFi, paiement, etc.</li>
<li><strong>Liens</strong> : site, prise de RDV, menu, avec UTM pour mesurer les clics.</li>
</ul>
<h3>Photos : le booster visibilité</h3>
<p>Les entreprises avec des photos reçoivent <strong>42% de demandes d'itinéraire en plus</strong>. À avoir : logo, couverture, façade, intérieur, équipe, réalisations, produits. Idéal : 3–10 nouvelles photos par mois pour signaler l'activité.</p>
<h3>Erreurs fréquentes à éviter</h3>
<ul>
<li>Nom avec mots-clés ("Entreprise + Ville + Service") : risque de modification/signalement.</li>
<li>Horaires approximatifs ou non mis à jour.</li>
<li>Catégorie trop large ou inadaptée.</li>
<li>Description vide ou copiée-collée.</li>
</ul>
<div class="bg-green-50 rounded-xl p-4 border border-green-200 not-prose">
<p class="text-sm text-gray-700"><strong>Bonne pratique :</strong> faites un audit une fois par trimestre. Vérifiez que toutes les infos sont à jour et cohérentes avec votre site.</p>
</div>
</section>

<section id="collecter-avis" class="scroll-mt-28 mb-16">
<h2>Astuce 2 : Collecter des avis de manière systématique</h2>
<p>Les avis représentent <strong>20% du classement local</strong>. Volume, régularité et récence comptent. Une entreprise avec 50 avis récents et une note de 4,7 surpasse souvent un concurrent mieux placé avec 8 avis et 4,1.</p>
<h3>Objectifs réalistes</h3>
<ul>
<li><strong>Minimum</strong> : 1 avis par semaine.</li>
<li><strong>Idéal</strong> : 2 avis par semaine pour accélérer la visibilité.</li>
<li><strong>Seuil pack local</strong> : au-delà de 50 avis, vous apparaissez 3x plus souvent.</li>
</ul>
<h3>Comment collecter sans harceler</h3>
<ul>
<li>Demander au bon moment (juste après une expérience positive).</li>
<li>Réduire la friction : lien direct (plaque NFC, QR, lien court).</li>
<li>Un script court pour l'équipe ("Si vous êtes content, un avis Google nous aide énormément, vous pouvez le faire en 10 secondes ici").</li>
<li>Une seule relance (24–48h) si besoin, pas plus.</li>
</ul>
<h3>Répondre à chaque avis</h3>
<p>97% des prospects lisent vos réponses. Répondre sous 48h renforce la confiance et envoie un signal d'activité à Google. Personnalisez (prénom, détail), remerciez, restez professionnel.</p>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose">
<p class="text-sm text-gray-700"><strong>Stat 2026 :</strong> la qualité des avis (détails, mots-clés) pèse de plus en plus face au simple volume. Encouragez des avis détaillés sans les dicter.</p>
</div>
</section>

<section id="citations-locales" class="scroll-mt-28 mb-16">
<h2>Astuce 3 : Citations locales et NAP cohérent</h2>
<p>Les citations = mentions de votre entreprise (nom, adresse, téléphone) sur d'autres sites. Elles représentent <strong>6%</strong> du classement et valident votre identité auprès de Google. Une incohérence répétée (adresse différente sur GMB, site et annuaires) crée du doute et peut nuire au classement.</p>
<h3>NAP = Name, Address, Phone</h3>
<p>Choisissez <strong>un seul format</strong> et gardez-le partout : même orthographe, même ponctuation, même numéro (fixe ou mobile, mais stable).</p>
<h3>Où créer des citations (priorité)</h3>
<ul>
<li>PagesJaunes / Pages Blanches</li>
<li>Yelp</li>
<li>TripAdvisor (restaurants, hôtels, activités)</li>
<li>Annuaires de votre ville (office du tourisme, CCI)</li>
<li>Annuaires métier (ex. annuaires des plombiers, des coiffeurs)</li>
<li>Facebook (page entreprise à jour)</li>
</ul>
<h3>Audit NAP rapide (45 min)</h3>
<ol>
<li>Recherchez votre numéro de téléphone et votre adresse sur Google.</li>
<li>Listez les 10–20 premiers résultats (annuaires, réseaux, partenaires).</li>
<li>Corrigez d'abord les 5 plus visibles.</li>
<li>Supprimez ou fusionnez les doublons (anciennes adresses, anciennes fiches).</li>
</ol>
<div class="bg-red-50 rounded-xl p-4 border border-red-200 not-prose">
<p class="text-sm text-red-900"><strong>À éviter :</strong> changer l'adresse ou le téléphone sur un seul canal. Faites une mise à jour globale le même jour partout.</p>
</div>
</section>

<section id="site-web-local" class="scroll-mt-28 mb-16">
<h2>Astuce 4 : Optimiser votre site web pour le local</h2>
<p>Le site renforce la <strong>pertinence</strong> (15% du classement). Google croise les infos de votre fiche avec celles de votre site. Un site flou ou sans ancrage local vous fait perdre des positions.</p>
<h3>Structure recommandée</h3>
<ul>
<li><strong>Page d'accueil</strong> : ville + activité dans le titre et l'intro.</li>
<li><strong>Pages "Ville + service"</strong> : une page par combinaison rentable (ex. "Coiffeur Bordeaux Centre", "Plombier Lyon 3").</li>
<li><strong>Page Contact</strong> : adresse, carte Google Maps, horaires, NAP.</li>
<li><strong>Footer</strong> : NAP sur toutes les pages.</li>
</ul>
<h3>On-page locale</h3>
<ul>
<li>Title : <strong>Service + Ville</strong> (ex. "Plombier à Lyon – Dépannage 7j/7").</li>
<li>H1 cohérent avec le title.</li>
<li>Contenu utile (pas de remplissage), avec preuves (photos, avis, cas).</li>
<li>Schema <strong>LocalBusiness</strong> (nom, adresse, téléphone, horaires).</li>
<li>Lien vers votre fiche Google (bouton "Nous laisser un avis").</li>
</ul>
<h3>Éviter les "doorway pages"</h3>
<p>Créer 50 pages "plombier ville X" en copier-coller nuit plus qu'autre chose. Mieux vaut moins de pages, mais solides : contenu unique, photos, témoignages, infos locales.</p>
</section>

<section id="backlinks-locaux" class="scroll-mt-28 mb-16">
<h2>Astuce 5 : Obtenez des backlinks locaux</h2>
<p>Les liens représentent <strong>8%</strong> du classement local. Un lien depuis un site local crédible (presse, partenaire, association) a plus de poids qu'un lien national générique.</p>
<h3>Idées concrètes</h3>
<ul>
<li><strong>Partenariats croisés</strong> : coiffeur ↔ esthéticienne ↔ photographe (page "Partenaires" ou "Recommandations").</li>
<li><strong>Sponsoring local</strong> : club sportif, événement de quartier, association.</li>
<li><strong>CCI, associations professionnelles</strong> : annuaires et actualités.</li>
<li><strong>Presse locale</strong> : sujet réel (ouverture, initiative, collaboration, chiffre, étude).</li>
<li><strong>Mentions non liées</strong> : si un site parle de vous sans lien, un message poli permet souvent d'obtenir le lien.</li>
</ul>
<h3>Objectif réaliste</h3>
<p>1–2 bons liens locaux par mois valent mieux que 50 liens faibles. Privilégiez la qualité et la pertinence.</p>
</section>

<section id="bonus" class="scroll-mt-28 mb-16">
<h2>Bonus : Posts GMB, Q&A et fraîcheur</h2>
<p>En 2026, la <strong>fraîcheur</strong> du profil compte plus : Google favorise les entreprises actives. Les posts et la section Q&A envoient ce signal.</p>
<h3>Posts Google Business Profile</h3>
<p>1 post par semaine minimum : offre, actualité, nouveauté, événement. Format court + image + CTA (site, RDV, avis).</p>
<h3>Section Questions / Réponses</h3>
<p>Répondez aux questions des utilisateurs et ajoutez vous-même les questions fréquentes (horaires, parking, prix, services). Cela enrichit la fiche et renforce la pertinence.</p>
<h3>Photos régulières</h3>
<p>3–10 nouvelles photos par mois : réalisations, équipe, nouveautés. Pas besoin d'un shooting pro : l'authenticité et la régularité suffisent.</p>
</section>

<section id="plan-action" class="scroll-mt-28 mb-16">
<h2>Plan d'action 30 / 60 / 90 jours</h2>
<h3>J1–J30 : Fondations</h3>
<ul>
<li>Audit et optimisation complète de la fiche GBP (checklist ci-dessus).</li>
<li>Correction NAP sur les 5–10 citations les plus visibles.</li>
<li>Mise en place du process d'avis (outil + script + objectif 1–2/semaine).</li>
<li>Réponses à tous les avis existants.</li>
<li>2–4 pages locales sur le site (si pertinent).</li>
</ul>
<h3>J31–J60 : Accélération</h3>
<ul>
<li>Maintenir 1–2 avis/semaine + réponses sous 48h.</li>
<li>1 post GBP/semaine.</li>
<li>Obtenir 1–2 backlinks locaux (partenariat, presse, événement).</li>
<li>Enrichir les pages locales (témoignages, photos, FAQ).</li>
</ul>
<h3>J61–J90 : Consolidation</h3>
<ul>
<li>Révision trimestrielle de la fiche GBP.</li>
<li>Extension des citations (autres annuaires, réseaux).</li>
<li>Suivi des KPI : positions Maps, clics, appels, itinéraires.</li>
<li>Ajustements selon les résultats (mots-clés dans les réponses, nouvelles pages).</li>
</ul>
</section>

<section id="cas-pratiques" class="scroll-mt-28 mb-16">
<h2>Cas pratiques & résultats attendus</h2>
<h3>Ce que vous pouvez attendre (ordres de grandeur)</h3>
<ul>
<li><strong>2–4 semaines</strong> : plus de clics sur la fiche, plus d'appels (effet optimisation + premiers avis).</li>
<li><strong>6–12 semaines</strong> : amélioration visible dans le pack local (selon concurrence et secteur).</li>
<li><strong>3–6 mois</strong> : consolidation des positions et augmentation du trafic "local" (recherches par ville/quartier).</li>
</ul>
<h3>Exemple : commerce local (Bordeaux)</h3>
<p>Avant : fiche à 60%, 15 avis, pas de posts. Actions : fiche à 100%, objectif 2 avis/semaine (NFC), 1 post/semaine, correction NAP sur 8 annuaires, 2 pages "Bordeaux" sur le site. Après 3 mois : +150% de visibilité dans le pack local, +60% de clics site, +35% d'appels et itinéraires.</p>
<h3>Exemple : prestataire SAB (Lyon)</h3>
<p>Avant : zone de service floue, 6 avis. Actions : zone définie (10 villes), cartes NFC, page "Zones desservies" + 5 pages ville sur le site, 1 lien presse locale. Après 4 mois : apparition dans le pack sur 4 des 10 villes, +80% de demandes de devis.</p>
</section>

<section id="erreurs" class="scroll-mt-28 mb-16">
<h2>Erreurs à éviter (sous peine de stagner ou régresser)</h2>
<ul>
<li><strong>Fiche GBP incomplète ou approximative</strong> : vous partez avec un handicap.</li>
<li><strong>Nom optimisé (keywords stuffing)</strong> : risque de modification par Google ou signalement.</li>
<li><strong>Pas de collecte d'avis</strong> : vous ne profitez pas du levier à 20%.</li>
<li><strong>Ne pas répondre aux avis</strong> : perte de confiance et signal d'inactivité.</li>
<li><strong>NAP incohérent</strong> : doute sur l'identité de l'entreprise.</li>
<li><strong>Site sans ancrage local</strong> : pertinence faible pour les requêtes "ville + service".</li>
<li><strong>Doorway pages</strong> : des dizaines de pages identiques = risque de pénalité.</li>
<li><strong>Acheter des avis ou des liens</strong> : risque de sanction et perte de crédibilité.</li>
</ul>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose">
<p class="text-sm text-gray-700"><strong>Règle simple :</strong> tout ce qui est "artificiel" (faux avis, liens achetés, contenu dupliqué) finit par se retourner contre vous. Travaillez la qualité et la régularité.</p>
</div>
</section>

<section id="faq" class="scroll-mt-28 mb-16">
<h2>FAQ visibilité locale</h2>
<h3>Combien de temps pour apparaître dans le pack local ?</h3>
<p>En général 4 à 12 semaines selon la concurrence. Les premiers signaux (plus de clics, plus d'actions) peuvent arriver en 2–4 semaines.</p>
<h3>Faut-il une page par ville sur le site ?</h3>
<p>Seulement si vous avez du contenu unique (zone desservie, cas, preuves). Évitez les pages dupliquées.</p>
<h3>Adresse masquée (SAB) : est-ce possible ?</h3>
<p>Oui. Travaillez une zone de service claire, un site optimisé, des avis réguliers et des citations cohérentes.</p>
<h3>Les avis Google suffisent-ils ou faut-il d'autres plateformes ?</h3>
<p>Google est prioritaire (64% des gens vont d'abord sur Google). Selon le secteur, complétez avec TripAdvisor, Yelp, Facebook, plateformes métier.</p>
<h3>Comment mesurer la visibilité locale ?</h3>
<p>Positions sur des requêtes cibles (plusieurs points de la ville), clics/appels/itinéraires depuis la fiche (GBP Insights), trafic organique sur les pages locales (GA4 avec segments géo).</p>
<h3>Un mauvais avis fait-il tomber mon classement ?</h3>
<p>Pas directement. En revanche, une note qui baisse réduit les clics et la confiance, donc les signaux comportementaux. Répondre et corriger le service limite la casse.</p>
<h3>Les posts GMB sont-ils vraiment utiles pour le classement ?</h3>
<p>Oui : ils signalent l'activité et la fraîcheur. En 2026, les profils "actifs" sont favorisés. 1 post/semaine est un bon rythme.</p>
<h3>Puis-je avoir plusieurs fiches pour plusieurs adresses ?</h3>
<p>Oui, une fiche par établissement physique. Chaque fiche doit avoir sa propre page sur le site avec NAP et contenu dédié.</p>
</section>
    `,
  },
  'nfc-avis-clients': {
    title: 'NFC : la nouvelle arme pour vos avis clients',
    category: 'Technologie',
    date: '2 novembre 2025',
    readTime: '8 min',
    author: 'Équipe Swiipx',
    excerpt: 'Guide 2026 pour collecter plus d\'avis Google avec une plaque NFC : fonctionnement, mise en place, placements par métier, scripts, erreurs à éviter, ROI et FAQ.',
    tocSections: [
      { id: 'intro', label: 'Pourquoi le NFC explose les avis' },
      { id: 'quest-ce-nfc', label: 'NFC : définition simple' },
      { id: 'pourquoi-ca-marche', label: 'Pourquoi ça convertit (psychologie)' },
      { id: 'nfc-vs-autres', label: 'NFC vs QR / SMS / Email' },
      { id: 'setup', label: 'Mise en place (pas à pas)' },
      { id: 'placements', label: 'Où placer la plaque (par métier)' },
      { id: 'scripts', label: 'Scripts & process équipe' },
      { id: 'suivi', label: 'Suivi, UTM & KPI' },
      { id: 'erreurs', label: 'Erreurs à éviter (règles Google)' },
      { id: 'cas-usage', label: 'Cas pratique & ROI' },
      { id: 'faq', label: 'FAQ' },
    ],
    content: `
<section id="intro" class="scroll-mt-28 mb-16">
<h2>Pourquoi le NFC explose les avis clients (et pourquoi Google adore ça)</h2>
<p>Vous pouvez avoir un service irréprochable et pourtant stagner à <strong>3–10 avis par mois</strong>. Le problème n’est pas la satisfaction : c’est la <strong>friction</strong>.</p>
<p>Le NFC (plaque, carte ou sticker) réduit le parcours de l’avis à un geste. Pour un client, c’est la différence entre “je le ferai plus tard” et “je le fais maintenant”.</p>
<h3>Ce que vous gagnez réellement</h3>
<ul>
<li><strong>Plus d’avis</strong> : un volume régulier, semaine après semaine.</li>
<li><strong>Plus de conversion</strong> : une fiche Google Business Profile plus convaincante.</li>
<li><strong>Plus de SEO local</strong> : les avis et l’activité de fiche sont des signaux importants.</li>
<li><strong>Moins d’effort</strong> : l’équipe a un script simple et un outil visible.</li>
</ul>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose">
<p class="text-sm text-gray-700"><strong>À retenir :</strong> le NFC ne “crée” pas la satisfaction. Il transforme une satisfaction existante en preuve publique, au bon moment.</p>
</div>
</section>

<section id="quest-ce-nfc" class="scroll-mt-28 mb-16">
<h2>NFC : définition simple (Near Field Communication)</h2>
<p><strong>NFC</strong> signifie Near Field Communication : c’est une technologie qui permet à un smartphone de lire une information quand il est à quelques centimètres d’une puce NFC.</p>
<p>Dans notre cas, la puce envoie un lien : <strong>la page d’avis Google</strong>, votre site, un menu, une page de prise de rendez-vous…</p>
<h3>Avant : un parcours trop long</h3>
<ol>
<li>Sortir le téléphone</li>
<li>Ouvrir Google</li>
<li>Chercher votre entreprise</li>
<li>Choisir la bonne fiche</li>
<li>Trouver “Avis”</li>
<li>Cliquer “Laisser un avis”</li>
<li>Rédiger (ou abandonner)</li>
</ol>
<h3>Avec une plaque NFC</h3>
<ol>
<li>Approcher le téléphone</li>
<li>Ouvrir la notification</li>
<li>Écrire l’avis</li>
</ol>
<p class="mb-0">Moins d’étapes = plus d’avis. C’est mécanique.</p>
</section>

<section id="pourquoi-ca-marche" class="scroll-mt-28 mb-16">
<h2>Pourquoi ça convertit : la psychologie derrière le “tap”</h2>
<h3>1) Le moment de satisfaction est court</h3>
<p>Après une bonne expérience, la motivation est forte… mais elle retombe vite. Si vous attendez un email le lendemain, vous perdez la majorité des avis potentiels.</p>
<h3>2) Un geste visible = une action plus simple</h3>
<p>Une plaque NFC posée au bon endroit agit comme un rappel naturel : le client n’a pas besoin de “se souvenir”.</p>
<h3>3) L’équipe demande sans gêne</h3>
<p>Beaucoup d’équipes n’osent pas demander un avis. Avec le NFC, la demande devient “technique” et courte : “vous pouvez le faire en 10 secondes”.</p>
<h3>4) Le client ne se sent pas harcelé</h3>
<p>Le NFC est non intrusif : pas de relances multiples, pas de pression. Vous proposez une option immédiate, et le client choisit.</p>
</section>

<section id="nfc-vs-autres" class="scroll-mt-28 mb-16">
<h2>NFC vs QR Code vs SMS vs Email : le comparatif réaliste</h2>
<p>Le NFC n’est pas la seule méthode, mais c’est souvent la plus efficace <strong>sur place</strong>.</p>
<h3>NFC</h3>
<ul>
<li>Meilleur quand : vous avez un lieu physique et un “moment satisfaction”.</li>
<li>Point fort : 1 geste, peu de friction.</li>
<li>Point faible : nécessite que le client ait son téléphone compatible (la majorité).</li>
</ul>
<h3>QR Code</h3>
<ul>
<li>Meilleur quand : vous voulez une solution universelle, sans “tap”.</li>
<li>Point faible : scanner est moins naturel, surtout en faible lumière ou si le code est abîmé.</li>
</ul>
<h3>SMS / WhatsApp</h3>
<ul>
<li>Meilleur quand : vous avez une base clients et un consentement clair.</li>
<li>Point faible : le client reçoit 50 messages par jour, et remet à plus tard.</li>
</ul>
<h3>Email</h3>
<ul>
<li>Meilleur quand : B2B ou prestations longues avec suivi.</li>
<li>Point faible : taux de réponse plus faible, et délai trop long.</li>
</ul>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose">
<p class="text-sm text-gray-700"><strong>Recommandation simple :</strong> NFC (sur place) + 1 relance (email ou message) uniquement pour les clients qui n’ont pas pu le faire sur le moment.</p>
</div>
</section>

<section id="setup" class="scroll-mt-28 mb-16">
<h2>Mise en place en 20 minutes (pas à pas)</h2>
<h3>Étape 1 : récupérer le lien direct “Laisser un avis”</h3>
<ol>
<li>Ouvrez votre fiche Google Business Profile</li>
<li>Trouvez “Partager le profil” / “Demander des avis”</li>
<li>Copiez le lien (il ouvre directement l’écran d’avis)</li>
</ol>
<h3>Étape 2 : ajouter du tracking (option recommandé)</h3>
<p>Ajoutez des paramètres UTM au lien pour savoir combien d’avis viennent du NFC.</p>
<pre><code>https://g.page/r/XXXX/review?utm_source=nfc&utm_medium=offline&utm_campaign=reviews</code></pre>
<h3>Étape 3 : tester sur 3 téléphones</h3>
<ul>
<li>iPhone récent</li>
<li>Android récent</li>
<li>Un téléphone “milieu de gamme”</li>
</ul>
<p>Le test doit ouvrir la page d’avis en 1–2 secondes, sans confusion.</p>
<h3>Étape 4 : décider du support</h3>
<ul>
<li><strong>Plaque</strong> : stable, premium, idéale pour caisse / comptoir.</li>
<li><strong>Sticker</strong> : discret, parfait sur miroir, comptoir, vitrine.</li>
<li><strong>Carte</strong> : utile si vous vous déplacez (service à domicile).</li>
</ul>
</section>

<section id="placements" class="scroll-mt-28 mb-16">
<h2>Où placer la plaque NFC (par métier)</h2>
<p>Le placement est le vrai “hack”. Un bon emplacement peut multiplier les avis sans changer votre service.</p>
<h3>Restaurants / cafés</h3>
<ul>
<li>Sur la table au moment du dessert</li>
<li>Sur le comptoir au moment du paiement</li>
<li>Sur le terminal de paiement (à côté, pas dessus)</li>
</ul>
<h3>Salon de coiffure / esthétique</h3>
<ul>
<li>Devant le miroir (au moment où le client voit le résultat)</li>
<li>À la caisse (sortie)</li>
</ul>
<h3>Commerces</h3>
<ul>
<li>À la caisse (après “merci, bonne journée”)</li>
<li>Sur le comptoir SAV (clients souvent satisfaits après résolution)</li>
</ul>
<h3>Artisans / services à domicile</h3>
<ul>
<li>Carte NFC : au moment où vous terminez et que le client valide</li>
<li>Sticker NFC sur la mallette / classeur devis (si professionnel)</li>
</ul>
<div class="bg-green-50 rounded-xl p-4 border border-green-200 not-prose">
<p class="text-sm text-gray-700"><strong>Bonne pratique :</strong> placez le NFC là où la satisfaction est la plus visible : résultat final, moment “merci”, moment paiement.</p>
</div>
</section>

<section id="scripts" class="scroll-mt-28 mb-16">
<h2>Scripts & process équipe : passer de “on oublie” à “on le fait”</h2>
<h3>Script #1 (universel, 10 secondes)</h3>
<blockquote><p>Si vous êtes content, un avis Google nous aide énormément. Vous pouvez le faire tout de suite : il suffit de poser votre téléphone ici.</p></blockquote>
<h3>Script #2 (client régulier)</h3>
<blockquote><p>Merci encore. Si vous avez 30 secondes, votre avis aide vraiment les clients du quartier à nous trouver.</p></blockquote>
<h3>Script #3 (engagement équipe)</h3>
<blockquote><p>On a un objectif d’avis ce mois-ci. Vous nous aidez ? C’est immédiat avec votre téléphone ici.</p></blockquote>
<h3>Le process simple à mettre en place</h3>
<ul>
<li>1 personne responsable par shift (ou 1 personne par jour)</li>
<li>Objectif hebdo (ex : 10 avis)</li>
<li>Rappel quotidien à l’équipe (30 secondes)</li>
<li>Réponses aux avis 2 fois par semaine</li>
</ul>
</section>

<section id="suivi" class="scroll-mt-28 mb-16">
<h2>Suivi, UTM & KPI : savoir si ça marche vraiment</h2>
<h3>Les KPI utiles</h3>
<ul>
<li>Nombre d’avis / semaine</li>
<li>Note moyenne</li>
<li>Nombre de réponses aux avis</li>
<li>Actions sur la fiche (appels, itinéraires, clics site)</li>
</ul>
<h3>Mesurer les clics NFC (facile)</h3>
<p>Si vous utilisez des UTM dans le lien, vous pouvez suivre le trafic dans votre analytics (source = nfc). Ce n’est pas parfait pour mesurer les avis, mais c’est un bon indicateur d’usage réel.</p>
<h3>Le signal qui compte</h3>
<p>Le KPI le plus important : la <strong>régularité</strong>. 1 avis/semaine pendant 6 mois bat 20 avis d’un coup, puis plus rien.</p>
</section>

<section id="erreurs" class="scroll-mt-28 mb-16">
<h2>Erreurs à éviter (et règles Google)</h2>
<h3>1) Offrir une récompense en échange d’un avis</h3>
<p>C’est risqué et souvent contre les règles des plateformes. Votre meilleure stratégie : réduire la friction, pas acheter l’avis.</p>
<h3>2) Filtrer les avis (“review gating”)</h3>
<p>Évitez les systèmes qui ne demandent un avis qu’aux clients satisfaits. Demandez à tous, et gérez les retours négatifs proprement.</p>
<h3>3) Harceler le client</h3>
<p>Un rappel maximum suffit. Au-delà, vous créez des avis de frustration.</p>
<h3>4) Ne pas répondre aux avis</h3>
<p>Répondre construit la confiance et augmente la conversion. Même un “merci” personnalisé fait une différence.</p>
<div class="bg-red-50 rounded-xl p-4 border border-red-200 not-prose">
<p class="text-sm text-red-900"><strong>Règle simple :</strong> le NFC doit faciliter un avis authentique, pas manipuler l’avis.</p>
</div>
</section>

<section id="cas-usage" class="scroll-mt-28 mb-16">
<h2>Cas pratique & ROI : à quoi s’attendre</h2>
<h3>Cas #1 : salon de coiffure</h3>
<p>Avant : 3–4 avis/mois. Après mise en place du NFC + script : <strong>25–30 avis/mois</strong>. Effet : hausse de visibilité locale + augmentation des prises de rendez-vous.</p>
<h3>Cas #2 : restaurant</h3>
<p>Avant : note 4,2 (18 avis). Après : <strong>4,7 (89 avis)</strong>. Effet : plus de réservations, surtout sur les requêtes “près de moi”.</p>
<h3>Calcul ROI simple</h3>
<ul>
<li>1 nouvel avis peut convaincre plusieurs prospects hésitants</li>
<li>Plus d’avis = plus de confiance = plus de conversions</li>
<li>Plus d’avis récents = meilleure traction sur Maps</li>
</ul>
<p class="mb-0">Le NFC devient rentable dès que vous transformez quelques clients “hésitants” en clients réels grâce à votre fiche.</p>
</section>

<section id="faq" class="scroll-mt-28 mb-16">
<h2>FAQ</h2>
<h3>Est-ce que ça marche sur iPhone ?</h3>
<p>Oui. Les iPhone récents lisent le NFC nativement. Aucun téléchargement nécessaire.</p>
<h3>Est-ce que le NFC marche si le client n’a pas internet ?</h3>
<p>Non : il faut une connexion pour ouvrir la page d’avis. Mais le tap fonctionne quand même, et le client peut le faire juste après.</p>
<h3>Que faire si un client ne sait pas où poser le téléphone ?</h3>
<p>Ajoutez un marquage simple (“Posez votre téléphone ici”) et utilisez un script court.</p>
<h3>Peut-on combiner NFC et QR ?</h3>
<p>Oui, c’est même recommandé : NFC pour la majorité, QR en secours.</p>
<h3>Combien de plaques faut-il ?</h3>
<p>En général : 1 plaque pour un point de contact principal. Si vous avez deux zones (caisse + sortie), 2 plaques augmentent les avis sans effort.</p>
</section>
    `,
  },
  'seo-local-recherches-google': {
    title: 'SEO Local : comment grimper en tête des recherches',
    category: 'SEO Local',
    date: '28 octobre 2025',
    readTime: '10 min',
    author: 'Équipe Swiipx',
    excerpt: 'Méthode 2026 (très complète) pour gagner Google Maps : Google Business Profile, avis, pages locales, citations, schema, backlinks et plan d’action 30 jours. Avec templates et checklists.',
    tocSections: [
      { id: 'algorithme', label: 'Comment Google classe en local' },
      { id: 'gbp', label: 'Optimiser votre Google Business Profile' },
      { id: 'site-pages-locales', label: 'Pages locales sur votre site' },
      { id: 'avis', label: 'Avis Google (volume + qualité + réponses)' },
      { id: 'citations', label: 'Citations & NAP (cohérence)' },
      { id: 'schema', label: 'Schema LocalBusiness + FAQ' },
      { id: 'liens-locaux', label: 'Backlinks & partenariats locaux' },
      { id: 'suivi', label: 'Suivi, KPI & outils' },
      { id: 'plan-30j', label: 'Plan d’action sur 30 jours' },
      { id: 'faq', label: 'FAQ SEO local' },
    ],
    content: `
<section id="algorithme" class="scroll-mt-28 mb-16">
<h2>Comment Google classe en SEO local (Maps + Pack local)</h2>
<p>Quand quelqu’un tape <strong>“coiffeur Bordeaux”</strong>, <strong>“plombier Lyon”</strong> ou <strong>“dentiste près de moi”</strong>, Google doit choisir quelles entreprises afficher dans le <strong>pack local</strong> (les 3 résultats avec la carte) et sur <strong>Google Maps</strong>.</p>
<p>La logique reste simple : Google veut afficher l’entreprise la plus <strong>pertinente</strong> pour la requête, la plus <strong>proche</strong> (ou la mieux positionnée sur la zone), et la plus <strong>fiable</strong>. En pratique, cela veut dire : <strong>fiche Google Business Profile</strong> propre, <strong>preuves</strong> (avis/mentions/liens), et <strong>site</strong> clair.</p>
<h3>Les 3 piliers à retenir</h3>
<ul>
<li><strong>Pertinence</strong> : catégories, services, contenu, mots-clés et cohérence entre votre fiche et votre site.</li>
<li><strong>Proximité</strong> : adresse / zone de service / rayon réel où Google vous “fait monter”.</li>
<li><strong>Notoriété</strong> : avis, liens, mentions locales, citations, signaux de confiance.</li>
</ul>
<p>En 2026, les rapports de référence (comme <strong>Whitespark – Local Search Ranking Factors 2026</strong>) confirment que <strong>Google Business Profile</strong> et les <strong>avis</strong> pèsent très lourd. La bonne nouvelle : ce sont des leviers actionnables, même sans “gros budget SEO”.</p>
<h3>Local Pack vs résultats naturels : ce n’est pas la même bataille</h3>
<p>Une même recherche peut afficher un pack local + des résultats naturels. Pour grimper sur Maps, on travaille surtout : la fiche, la régularité d’avis, les signaux locaux et la cohérence. Pour grimper en naturel, on travaille plus : contenu, architecture, maillage, performance, backlinks.</p>
<h3>Les requêtes locales qui rapportent le plus</h3>
<ul>
<li><strong>Service + ville</strong> : “coiffeur bordeaux”, “plombier lyon”.</li>
<li><strong>Service + quartier</strong> : “coiffeur bordeaux chartrons”, “dentiste paris 15”.</li>
<li><strong>Intent urgence</strong> : “dépannage plomberie lyon”, “serrurier urgence”.</li>
<li><strong>“près de moi”</strong> : Google interprète la position de l’utilisateur.</li>
<li><strong>Marque</strong> : votre nom + “avis”, “horaires”, “adresse”.</li>
<li><strong>Spécialité</strong> : “balayage”, “invisalign”, “pizzas napolitaines”.</li>
</ul>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose">
<p class="text-sm text-gray-700"><strong>Diagnostic express si vous n’apparaissez pas :</strong> (1) mauvaise catégorie, (2) adresse/zone incohérente, (3) pas assez d’avis récents, (4) site trop vague, (5) concurrence “spam” dans Maps.</p>
</div>
</section>

<section id="gbp" class="scroll-mt-28 mb-16">
<h2>Optimiser votre Google Business Profile (le levier n°1)</h2>
<p>Votre <strong>Google Business Profile</strong> (ex-Google My Business) est votre “fiche produit” sur Google Maps. Si elle est floue, incomplète ou incohérente, vous perdrez des positions, même avec un bon site.</p>
<h3>1) Catégories, services et description (mots-clés locaux)</h3>
<ul>
<li><strong>Catégorie principale</strong> : choisissez la plus précise (ex : “Salon de coiffure” plutôt que “Beauté”).</li>
<li><strong>Catégories secondaires</strong> : ajoutez uniquement ce que vous faites vraiment.</li>
<li><strong>Services / Produits</strong> : listez vos prestations avec des termes clients (ex : “balayage”, “brushing”, “coupe homme”).</li>
<li><strong>Description</strong> : utilisez 600–750 caractères et placez naturellement ville/quartier + services phares.</li>
</ul>
<h3>2) Nom, adresse, téléphone : gardez ça clean</h3>
<p>Le nom doit être votre <strong>nom réel</strong> (pas une liste de mots-clés). L’adresse doit correspondre à votre emplacement réel (ou à votre modèle “zone de service” si vous vous déplacez). Le téléphone doit être unique et stable.</p>
<div class="bg-red-50 rounded-xl p-4 border border-red-200 not-prose">
<p class="text-sm text-red-900"><strong>Erreur fréquente :</strong> “Entreprise + Ville + mot-clé” dans le nom. Cela peut fonctionner quelques jours… puis retomber (ou provoquer des modifications/signalements).</p>
</div>
<h3>2) Horaires, attributs, liens et suivi</h3>
<ul>
<li>Horaires à jour (y compris jours fériés).</li>
<li>Attributs utiles (PMR, parking, paiement, etc.).</li>
<li>Lien de prise de RDV / site / menu.</li>
<li><strong>Conseil</strong> : ajoutez des UTM sur le lien du site pour mesurer les clics venant de Maps.</li>
</ul>
<h3>3) Photos et vidéos (vraie preuve)</h3>
<p>Les médias augmentent la confiance et les interactions. Pour une base solide : logo, couverture, façade, intérieur, équipe, réalisations, produits, avant/après (si pertinent).</p>
<h3>Quelle cadence de photos ?</h3>
<p>Idéalement : 3 à 10 nouvelles photos par mois (pas besoin d’un shooting). Une seule règle : <strong>authentique</strong> et <strong>régulier</strong>. C’est un signal d’activité et ça aide la conversion.</p>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose">
<p class="text-sm text-gray-700"><strong>À retenir :</strong> l’objectif n’est pas “beau”, c’est <strong>crédible</strong>. Montrez le lieu, les personnes et des exemples concrets du résultat.</p>
</div>
<h3>4) Posts, Q/R, et signaux “activité”</h3>
<p>Publiez 1 post/semaine (actu, offre, nouveauté) et alimentez la fiche : questions/réponses, événements, mises à jour. Google valorise les profils vivants.</p>
<h3>Templates de posts GBP (rapide)</h3>
<ul>
<li><strong>Offre</strong> : “-10% sur [prestation] jusqu’au [date]”.</li>
<li><strong>Nouveauté</strong> : “Nouveau : [service] – disponible sur RDV”.</li>
<li><strong>Preuve</strong> : “Avant/Après : [résultat] (photo)”.</li>
<li><strong>FAQ</strong> : “Combien coûte [prestation] ? voici nos prix”.</li>
</ul>
<h3>Gérer la concurrence “spam” (sans se prendre la tête)</h3>
<p>Dans certaines villes, vous verrez des fiches qui trichent (nom bourré de mots-clés, fausses adresses). Ne copiez pas. À la place : renforcez votre profil (avis, preuves, contenu, liens) et documentez les abus si besoin.</p>
</section>

<section id="site-pages-locales" class="scroll-mt-28 mb-16">
<h2>Pages locales sur votre site : le booster de pertinence</h2>
<p>Google croise la fiche avec votre site. Si votre site n’explique pas clairement <strong>qui vous êtes</strong>, <strong>où vous êtes</strong> et <strong>ce que vous faites</strong>, la pertinence sera plus faible.</p>
<h3>La structure qui marche (sans spam)</h3>
<ul>
<li><strong>1 page “Ville + service”</strong> par activité rentable (ex : “Coiffeur Bordeaux Centre”, “Extension de cils Bordeaux”).</li>
<li>Une page “Zones desservies” si vous êtes en déplacement (SAB).</li>
<li>Une page “Tarifs” / “Prestations” claire et à jour (utile pour la conversion et la confiance).</li>
<li>Un bloc “FAQ locale” : questions que vos clients tapent vraiment (parking, horaires, quartier, prix, urgences).</li>
</ul>
<h3>Template de page “Ville + service” (copiable)</h3>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose space-y-2">
<p class="text-sm text-gray-700"><strong>Title :</strong> [Service] à [Ville] – [Bénéfice] | [Marque]</p>
<p class="text-sm text-gray-700"><strong>H1 :</strong> [Service] à [Ville] (et [quartier] si utile)</p>
<p class="text-sm text-gray-700"><strong>Intro :</strong> 4–6 lignes : pour qui, quel résultat, délais, zone, promesse.</p>
<p class="text-sm text-gray-700"><strong>Preuves :</strong> 3 photos + 3 avis + 1 mini cas client.</p>
<p class="text-sm text-gray-700"><strong>FAQ :</strong> 6–10 questions (prix, durée, parking, urgences, RDV).</p>
<p class="text-sm text-gray-700"><strong>CTA :</strong> bouton RDV / appel + lien vers Google Maps.</p>
</div>
<h3>Éviter les pages “porte d’entrée” (doorway pages)</h3>
<p>Créer 50 pages “plombier ville X” copiées-collées est rarement une bonne idée. Faites moins de pages, mais plus solides : photos différentes, cas locaux, témoignages, infos de zone.</p>
<h3>Checklist on-page locale</h3>
<ul>
<li>Title : <strong>Service + Ville</strong> (ex : “Plombier à Lyon 3 – Dépannage rapide”).</li>
<li>H1 cohérent, texte utile (pas du remplissage), preuves (photos, cas, avis).</li>
<li>Adresse/NAP en footer + page contact + lien vers la fiche Google Maps.</li>
<li>Maillage interne : reliez pages services ↔ pages zones ↔ blog.</li>
</ul>
<h3>Bonus conversion (qui aide aussi le SEO)</h3>
<ul>
<li>Prix “à partir de” + fourchette (si possible).</li>
<li>Délais (ex : “intervention sous 2h”).</li>
<li>Zones précises (quartiers/arrondissements) sans sur-optimiser.</li>
<li>Photos réelles (pas stock).</li>
</ul>
</section>

<section id="avis" class="scroll-mt-28 mb-16">
<h2>Avis Google : volume + qualité + réponses (et régularité)</h2>
<p>Les avis ont un double impact : ils influencent le classement et surtout la conversion. BrightLocal (Local Consumer Review Survey 2025) rappelle que <strong>seuls 4%</strong> des consommateurs disent ne jamais lire d’avis : vous jouez donc votre visibilité… et votre confiance.</p>
<p>Autre point intéressant : une part importante des gens ne consulte pas qu’un seul site d’avis. Cela renforce l’idée de garder des profils cohérents (Google, Facebook, plateformes métier) et de répondre partout où vos clients vous trouvent.</p>
<h3>Objectif simple</h3>
<p><strong>1–2 avis/semaine</strong> est souvent plus efficace qu’un “gros rush” tous les 6 mois. La régularité envoie un signal fort.</p>
<h3>La qualité d’un avis (ce que Google et vos prospects aiment)</h3>
<ul>
<li>Un avis <strong>détaillé</strong> (pas juste “super”).</li>
<li>Une mention d’éléments concrets (service, résultat, délai, accueil).</li>
<li>Si possible : une photo (quand c’est pertinent).</li>
</ul>
<h3>Comment obtenir des avis sans harceler</h3>
<ul>
<li>Demande au bon moment (juste après un “moment satisfaction”).</li>
<li>Un lien direct d’avis (QR / NFC) + une phrase claire.</li>
<li>1 relance maximum (24–48h) si besoin, pas plus.</li>
</ul>
<div class="bg-green-50 rounded-xl p-4 border border-green-200 not-prose">
<p class="text-sm text-gray-700"><strong>Script (30 secondes) :</strong> “Si vous avez apprécié, un avis Google nous aide énormément. Ça prend 10 secondes : vous pouvez le faire tout de suite.”</p>
</div>
<h3>Demande d’avis : 3 canaux qui marchent</h3>
<ul>
<li><strong>Sur place</strong> (le meilleur) : oral + QR/NFC.</li>
<li><strong>Message</strong> (SMS/WhatsApp) : 1 lien + 1 phrase.</li>
<li><strong>Email</strong> : utile si vous avez un bon taux d’ouverture.</li>
</ul>
<div class="bg-red-50 rounded-xl p-4 border border-red-200 not-prose">
<p class="text-sm text-red-900"><strong>Interdit / risqué :</strong> filtrer les avis (“review gating”), acheter de faux avis, offrir une récompense en échange d’un avis. À long terme, vous perdez plus que vous ne gagnez.</p>
</div>
<h3>Répondre à chaque avis (et utiliser vos mots-clés sans forcer)</h3>
<p>Répondez sous 24–48h, remerciez, ajoutez un détail réel (“balayage”, “dépannage”, “pizza napolitaine”), mentionnez la ville une fois de temps en temps. C’est naturel, et ça renforce la pertinence.</p>
<h3>Templates de réponses (copier/coller)</h3>
<p><strong>Avis 5 étoiles</strong> :</p>
<blockquote><p>Merci [Prénom] pour votre retour. Ravi que [détail concret] vous ait plu. À très vite au salon à [Ville].</p></blockquote>
<p><strong>Avis négatif</strong> :</p>
<blockquote><p>Bonjour [Prénom], merci d’avoir pris le temps. Nous sommes désolés que [point] n’ait pas été à la hauteur. Pouvez-vous nous contacter au [téléphone] afin qu’on règle cela rapidement ?</p></blockquote>
</section>

<section id="citations" class="scroll-mt-28 mb-16">
<h2>Citations & NAP : cohérence partout</h2>
<p>NAP = <strong>Name, Address, Phone</strong>. Google compare les infos de votre fiche avec celles de votre site et des annuaires. Une incohérence répétée = moins de confiance.</p>
<h3>Ce qu’il faut faire</h3>
<ul>
<li>Choisissez <strong>un format</strong> d’adresse et gardez-le partout.</li>
<li>Corrigez les doublons d’anciennes fiches / anciennes adresses.</li>
<li>Priorisez les sites locaux utiles : pages jaunes, annuaires de la ville, sites de métiers, associations, partenaires.</li>
</ul>
<h3>Mini méthode en 45 minutes (audit NAP)</h3>
<ol>
<li>Recherchez votre <strong>numéro</strong> + votre <strong>adresse</strong> sur Google.</li>
<li>Listez les 10–20 résultats les plus visibles (annuaires, réseaux sociaux, partenaires).</li>
<li>Corrigez d’abord les 5 plus importants (ceux qui rankent eux-mêmes).</li>
<li>Supprimez/mergez les doublons (anciennes fiches, ancienne adresse).</li>
</ol>
<div class="bg-red-50 rounded-xl p-4 border border-red-200 not-prose">
<p class="text-sm text-red-900"><strong>À éviter :</strong> changer le téléphone / l’adresse sur un canal et “oublier” les autres. Faites une mise à jour globale le même jour.</p>
</div>
</section>

<section id="schema" class="scroll-mt-28 mb-16">
<h2>Schema LocalBusiness + FAQ : aidez Google à comprendre</h2>
<p>Le <strong>schema markup</strong> (JSON-LD) n’est pas une baguette magique, mais c’est un excellent “signal de clarté”. Implémentez au minimum <strong>LocalBusiness</strong> avec nom, adresse, téléphone, horaires, url, et (si possible) les coordonnées.</p>
<p>Vous pouvez aussi baliser votre FAQ locale (si elle est présente sur la page) avec un <strong>FAQPage schema</strong>.</p>
<h3>Version plus complète (recommandée)</h3>
<pre><code>{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Votre entreprise",
  "url": "https://votre-site.fr/",
  "telephone": "+33...",
  "priceRange": "€€",
  "geo": { "@type": "GeoCoordinates", "latitude": 48.8566, "longitude": 2.3522 },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue Exemple",
    "addressLocality": "Paris",
    "postalCode": "75001",
    "addressCountry": "FR"
  }
}</code></pre>
<p>Ajoutez aussi vos réseaux sociaux en <strong>sameAs</strong> (Facebook, Instagram, LinkedIn…) si vous voulez renforcer la cohérence de marque.</p>
</section>

<section id="liens-locaux" class="scroll-mt-28 mb-16">
<h2>Backlinks & partenariats locaux : le levier “notoriété”</h2>
<p>Les liens restent un accélérateur. En local, ce qui marche le mieux, ce sont les liens <strong>proches de chez vous</strong>, crédibles, et liés à votre activité.</p>
<h3>Idées concrètes</h3>
<ul>
<li>Partenariats croisés (ex : coiffeur ↔ esthéticienne ↔ photographe).</li>
<li>Sponsoring local (club sportif, événement de quartier).</li>
<li>Associations professionnelles / chambres de commerce.</li>
<li>Presse locale : un vrai sujet (nouvelle ouverture, initiative, collaboration).</li>
</ul>
<p>Objectif : 1–2 bons liens/mois, plutôt que 50 liens faibles.</p>
<h3>Template de message simple (partenaire)</h3>
<blockquote><p>Bonjour [Nom], on travaille souvent avec des clients du quartier. Ça vous dit qu’on se recommande mutuellement sur nos sites (page partenaires) ? Je peux aussi vous envoyer 2-3 photos/texte si besoin.</p></blockquote>
<h3>Le “hack” le plus simple : récupérer les mentions non liées</h3>
<p>Parfois, un site parle de vous (article local, événement, partenaire) sans lien cliquable. Un message poli suffit souvent pour transformer ça en backlink.</p>
</section>

<section id="suivi" class="scroll-mt-28 mb-16">
<h2>Suivi, KPI & outils (sinon vous pilotez à l’aveugle)</h2>
<h3>Les KPI à suivre</h3>
<ul>
<li>Positions sur Google Maps (sur plusieurs points de la ville, pas “un seul test”).</li>
<li>Clics site / appels / demandes d’itinéraire depuis la fiche.</li>
<li>Nombre d’avis, note moyenne, répartition des mots-clés cités (qualitatif).</li>
<li>Trafic organique local sur les pages “Ville + service”.</li>
</ul>
<h3>Comment mesurer proprement les clics depuis la fiche</h3>
<p>Ajoutez des UTM sur le lien du site dans votre fiche, puis suivez dans GA4 (source/medium). C’est le moyen le plus simple de savoir si vos optimisations Maps ramènent du business.</p>
<h3>Rythme</h3>
<p>Une revue hebdomadaire rapide (30 minutes) + une optimisation mensuelle (2 heures) suffit dans la plupart des cas.</p>
</section>

<section id="plan-30j" class="scroll-mt-28 mb-16">
<h2>Plan d’action SEO local sur 30 jours</h2>
<div class="not-prose space-y-3">
<div class="flex items-start space-x-4 bg-gray-50 rounded-xl p-4">
<div class="w-16 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">J1–J3</div>
<div><div class="font-semibold text-gray-900">Audit + Google Business Profile</div><div class="text-sm text-gray-600">Catégories, services, description, horaires, photos.</div></div>
</div>
<div class="flex items-start space-x-4 bg-gray-50 rounded-xl p-4">
<div class="w-16 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">J4–J10</div>
<div><div class="font-semibold text-gray-900">Pages locales</div><div class="text-sm text-gray-600">Créer/optimiser 2–4 pages “Ville + service”, contact, FAQ locale.</div></div>
</div>
<div class="flex items-start space-x-4 bg-gray-50 rounded-xl p-4">
<div class="w-16 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold text-xs flex-shrink-0">J11–J20</div>
<div><div class="font-semibold text-gray-900">Avis + routine</div><div class="text-sm text-gray-600">Mettre en place un process + réponses sous 48h.</div></div>
</div>
<div class="flex items-start space-x-4 bg-gray-50 rounded-xl p-4">
<div class="w-16 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold text-xs flex-shrink-0">J21–J30</div>
<div><div class="font-semibold text-gray-900">Citations + liens locaux</div><div class="text-sm text-gray-600">Corriger NAP, obtenir 1–2 liens locaux, publier 4 posts GBP.</div></div>
</div>
</div>
<div class="bg-gray-50 rounded-xl p-4 border border-gray-200 not-prose mt-6">
<p class="text-sm text-gray-700"><strong>Routine hebdo (à garder après J30) :</strong> 1 post GBP, 1 action avis (collecte + réponses), 1 amélioration site (FAQ/photo/cas), 1 action “notoriété” (partenaire/mention/lien).</p>
</div>
</section>

<section id="faq" class="scroll-mt-28 mb-16">
<h2>FAQ SEO local</h2>
<h3>Combien de temps pour voir des résultats ?</h3>
<p>Souvent 2 à 4 semaines pour des premiers signaux (plus de clics, plus d’actions). Le pack local peut bouger en 4 à 12 semaines selon la concurrence.</p>
<h3>Est-ce que les avis “avec mots-clés” aident ?</h3>
<p>Oui, mais ne forcez jamais. Le meilleur avis est détaillé, authentique, et décrit l’expérience. Les mots-clés viennent naturellement.</p>
<h3>Faut-il créer une page par ville ?</h3>
<p>Seulement si vous avez <strong>quelque chose d’unique</strong> à dire (zone desservie, cas, preuves, photos). Les pages copiées/collées font souvent plus de mal que de bien.</p>
<h3>Adresse masquée (service à domicile) : c’est possible ?</h3>
<p>Oui. Travaillez une zone de service cohérente, un site très clair, des avis réguliers et des preuves. Les liens locaux et la cohérence NAP restent importants.</p>
<h3>Dois-je publier des posts GBP ?</h3>
<p>Oui : 1/semaine est une bonne cadence. C’est simple, ça montre de l’activité et ça vous donne des opportunités de clics.</p>
<h3>Le plus gros levier si je dois choisir ?</h3>
<p>Une fiche GBP parfaitement optimisée + un système d’avis régulier. C’est la base sur laquelle tout le reste devient plus efficace.</p>
<h3>Combien d’avis faut-il pour être crédible ?</h3>
<p>Il n’y a pas de chiffre magique : tout dépend de votre marché. Visez d’abord la régularité, puis rattrapez progressivement les leaders de votre zone. Le combo qui convertit : note solide + avis récents + réponses.</p>
<h3>Que faire si je déménage ?</h3>
<p>Mettez à jour l’adresse partout le même jour (fiche, site, annuaires). Surveillez ensuite la visibilité pendant 2–6 semaines : Google doit “recalibrer” la proximité.</p>
<h3>Multi-sites : une fiche ou plusieurs ?</h3>
<p>Une fiche par lieu réel. Chaque site doit avoir une page dédiée avec NAP, horaires, photos et contenu propre.</p>
</section>
    `,
  },
  'erreurs-demander-avis': {
    title: 'Les erreurs fatales à éviter quand on demande des avis Google (guide 2026)',
    category: 'Bonnes pratiques',
    date: '25 octobre 2025',
    readTime: '5 min',
    author: 'Équipe Swiipx',
    excerpt: 'Acheter des faux avis, harceler vos clients, ignorer les avis négatifs... Ces erreurs critiques peuvent vous faire bannir de Google et détruire votre e-réputation. Guide complet avec exemples réels.',
    tocSections: [
      { id: 'intro-impact', label: 'Pourquoi c\'est critique' },
      { id: 'faux-avis', label: 'Acheter de faux avis' },
      { id: 'harceler', label: 'Harceler les clients' },
      { id: 'recompenses', label: 'Offrir des récompenses' },
      { id: 'pas-repondre', label: 'Ne pas répondre' },
      { id: 'mal-gerer', label: 'Mal gérer le négatif' },
      { id: 'bonne-pratique', label: 'Bonnes pratiques' },
      { id: 'faq-erreurs', label: 'FAQ' },
    ],
    content: `
<section id="intro-impact" class="scroll-mt-28 mb-16">
<h2>Pourquoi ces erreurs sont critiques</h2>
<p>La gestion des avis Google peut sembler simple, mais une seule erreur peut ruiner des mois d'efforts. Voici les conséquences réelles que j'ai observées :</p>
<p>Suspension de votre fiche Google My Business (perte totale de visibilité), suppression de tous vos avis même les vrais, avis négatifs de frustration par des clients harcelés, perte de confiance massive des prospects.</p>
<p>Les études BrightLocal 2025 montrent qu'une mauvaise gestion des avis fait perdre jusqu'à 40% de clients potentiels. Ce guide vous révèle les 10 erreurs les plus courantes et comment les éviter.</p>
</section>

<section id="faux-avis" class="scroll-mt-28 mb-16">
<h2>Acheter de faux avis</h2>
<p>C'est la pire erreur possible. L'algorithme de Google en 2026 détecte les faux avis via l'analyse des adresses IP, les patterns de rédaction grâce à l'IA, les profils Google récents sans historique, le timing suspect et la géolocalisation incohérente.</p>
<p>Exemple concret d'un restaurant parisien qui a acheté 25 faux avis pour 80€ : Google les a supprimés en 3 jours, puis a supprimé TOUS les avis y compris les 12 vrais, et a suspendu la fiche pendant 30 jours. Impact final : -67% de réservations pendant 2 mois.</p>
<h3>Les conséquences légales</h3>
<p>Acheter des faux avis est illégal en France depuis 2023. Les sanctions peuvent aller jusqu'à 300 000€ d'amende pour l'entreprise et 2 ans de prison pour le dirigeant. L'obligation de publier le jugement détruit ensuite complètement votre réputation.</p>
<p><strong>Alternative :</strong> Facilitez simplement le processus avec une plaque NFC qui permet aux clients de laisser un avis authentique en 10 secondes. Le taux de conversion passe de 2% à 35-45%.</p>
</section>

<section id="harceler" class="scroll-mt-28 mb-16">
<h2>Harceler vos clients</h2>
<p>Voici le scénario classique qui se termine mal : le client achète, vous envoyez un email de remerciement avec demande d'avis le lendemain, puis une relance 2 jours après, une autre à J+7, une à J+10 avec un SMS en prime, et une dernière à J+14. Résultat à J+15 : le client agacé laisse un avis 1 étoile disant qu'il est harcelé.</p>
<p>Les études ReviewTrackers 2025 montrent qu'au-delà de 2 relances, le taux d'avis négatifs de frustration passe de 3% à 28%. C'est énorme.</p>
<h3>La bonne approche</h3>
<p>Une demande verbale sur place au bon moment (juste après une expérience positive), et éventuellement un email de suivi dans les 24-48h. C'est tout. Pas de SMS, pas de relances multiples.</p>
<p>Mieux encore : une plaque NFC que le client voit naturellement lui permet de laisser un avis quand il le souhaite, sans pression. C'est la méthode la moins intrusive et la plus efficace.</p>
</section>

<section id="recompenses" class="scroll-mt-28 mb-16">
<h2>Offrir des récompenses</h2>
<p>C'est formellement interdit par les CGU de Google (section 4.2.7). Voici ce que vous ne devez jamais faire : proposer 10€ de réduction contre un avis, offrir un café, organiser un tirage au sort ou donner accès à un club VIP en échange d'un avis.</p>
<p>Ce qui est autorisé par contre : demander poliment sans contrepartie, faciliter le processus avec un lien direct ou une plaque NFC, remercier après coup sans avoir conditionné quoi que ce soit, et afficher une signalétique neutre du type "Votre avis compte".</p>
<p>Google surveille activement les avis incentivés via l'analyse sémantique qui détecte les mots comme "réduction" ou "cadeau" dans les avis, les signalements d'utilisateurs, et les patterns suspects comme un pic d'avis après une campagne promo. La sanction est directe : suppression des avis concernés et risque de suspension de votre fiche.</p>
</section>

<section id="pas-repondre" class="scroll-mt-28 mb-16">
<h2>Ne pas répondre aux avis</h2>
<p>88% des consommateurs lisent vos réponses avant de choisir votre entreprise selon BrightLocal 2025. Ne pas répondre fait baisser votre taux de conversion de 35%, diminue votre note perçue de 22%, et multiplie par 3 le risque de recevoir d'autres avis négatifs.</p>
<p>Les délais recommandés : moins de 2 heures pour un avis négatif (c'est urgent), moins de 12 heures pour un avis moyen, et moins de 24 heures pour un avis positif. Configurez les alertes Google My Business sur votre téléphone pour être notifié immédiatement.</p>
<h3>Comment répondre</h3>
<p>Pour un avis positif : remerciez sincèrement en citant un élément spécifique mentionné par le client. Pour un avis moyen : remerciez pour le retour constructif et expliquez comment vous allez améliorer le point soulevé. Pour un avis négatif : excusez-vous sincèrement et proposez de discuter en privé pour trouver une solution.</p>
<p>L'important est d'être rapide, personnel et de montrer que vous vous souciez vraiment de l'expérience client.</p>
</section>

<section id="mal-gerer" class="scroll-mt-28 mb-16">
<h2>Mal gérer les avis négatifs</h2>
<p>Un avis négatif n'est pas une catastrophe si vous le gérez bien. 89% des prospects lisent vos réponses et se font une opinion dessus.</p>
<p>Les réactions à éviter : l'agressivité ("Votre avis est mensonger, nous allons vous poursuivre"), le déni total ("Cela ne s'est jamais produit, vous mentez"), l'excuse bateau ("Désolé. Bonne journée"), le silence radio complet, et la sur-justification où vous rejetez toute la faute sur le client.</p>
<h3>La bonne méthode</h3>
<p>Utilisez la méthode ACER : Accusez réception en remerciant pour le retour, montrez que vous Comprenez la frustration avec empathie, Expliquez le contexte si pertinent sans vous justifier excessivement, et proposez une Résolution concrète en invitant à discuter en privé.</p>
<p>Exemple : "Merci Sophie pour ce retour. Nous comprenons votre déception concernant le temps d'attente. Nous avons connu un afflux exceptionnel ce jour-là, mais cela ne justifie pas votre expérience. Pouvez-vous nous contacter à contact@entreprise.fr pour qu'on puisse rectifier cela ?"</p>
<p>Un chiffre important : 78% des consommateurs font PLUS confiance à une entreprise qui répond professionnellement aux critiques selon Harvard Business Review. Un avis négatif bien géré peut donc améliorer votre image.</p>
</section>


<section id="bonne-pratique" class="scroll-mt-28 mb-16">
<h2>Comment bien demander un avis</h2>
<p>Le script qui fonctionne (testé avec 40%+ de conversion) : "[Prénom], je suis vraiment content que votre [plat/coupe/séance] vous ait plu ! Si vous avez 30 secondes, un petit avis Google nous aiderait énormément à faire découvrir [nom entreprise] à d'autres personnes comme vous. Vous pouvez simplement approcher votre téléphone ici, c'est instantané !"</p>
<h3>Pourquoi ça marche</h3>
<p>Personnalisation en utilisant le prénom et en citant ce qu'il a aimé, raison altruiste d'aider les autres à découvrir, minimisation de l'effort avec "30 secondes" et "instantané", gratitude sincère, action claire et outil visible.</p>
<h3>Sur place vs email</h3>
<p>Sur place, une demande verbale avec une plaque NFC visible donne le meilleur ROI. Par email si nécessaire : "Merci pour votre visite ! Si vous avez apprécié votre expérience, un avis Google nous aiderait énormément : [lien direct]. Ça prend 30 secondes."</p>
</section>

<section id="faq-erreurs" class="scroll-mt-28 mb-16">
<h2>Questions fréquentes</h2>

<h3>Puis-je offrir un cadeau après qu'un client ait laissé un avis ?</h3>
<p>Non, Google interdit toute forme d'incentive même rétroactive. Si un client mentionne dans son avis qu'il a reçu un cadeau, Google peut le détecter et supprimer l'avis.</p>

<h3>Combien d'avis puis-je recevoir par jour sans être suspect ?</h3>
<p>Il n'y a pas de limite fixe mais une augmentation brutale est suspecte. Règle simple : ne dépassez pas 10 fois votre moyenne mensuelle habituelle. Si vous aviez 5 avis par mois, ne montez pas directement à 50 par mois. Progressez graduellement.</p>

<h3>Que faire si Google supprime un avis légitime ?</h3>
<p>Contactez Google My Business Support et demandez une révision en fournissant des preuves que le client est réel : facture, email de confirmation. Délai de réponse : 2 à 4 semaines.</p>

<h3>Un concurrent laisse de faux avis négatifs, que faire ?</h3>
<p>Signalez chaque avis suspect via "Signaler comme inapproprié". Si vous avez des preuves tangibles, contactez le support Google. En parallèle, la meilleure défense est de générer massivement de vrais avis positifs pour noyer les faux.</p>

<h3>Est-ce que répondre améliore mon SEO local ?</h3>
<p>Oui indirectement. Google observe votre taux et votre rapidité de réponse. Les entreprises réactives sont favorisées dans le classement. Vos réponses contiennent aussi des mots-clés qui renforcent votre pertinence locale.</p>
</section>
    `,
  },
}

/* ─────────────────────────────────────────────
   Related articles pour la sidebar
   ───────────────────────────────────────────── */
const relatedArticles = [
  { slug: 'doubler-avis-google-30-jours', label: 'Doubler vos avis Google en 30 jours' },
  { slug: 'obtenir-plus-avis-google', label: '10 méthodes pour obtenir plus d\'avis Google' },
  { slug: 'nfc-avis-clients', label: 'NFC : la nouvelle arme pour vos avis' },
  { slug: 'seo-local-recherches-google', label: 'SEO Local : grimper en tête des recherches' },
  { slug: 'avis-clients-influencent-business', label: 'Les avis influencent votre business' },
  { slug: 'booster-visibilite-locale', label: '5 astuces visibilité locale' },
  { slug: 'erreurs-demander-avis', label: 'Les erreurs à éviter' },
]

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]
  const [activeSection, setActiveSection] = useState('')
  const articleRef = useRef<HTMLElement>(null)
  const [currentAd, setCurrentAd] = useState(-1)

  /* Scroll listener pour highlight la section active dans le TOC.
     On utilise un scroll listener plutôt qu'un IntersectionObserver
     car le contenu est injecté via dangerouslySetInnerHTML. */
  useEffect(() => {
    if (!article) return

    const handleScroll = () => {
      const ids = article.tocSections.map(s => s.id)
      let current = ids[0] || ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Si le haut de la section est au-dessus de 40% du viewport, elle est "active"
          if (rect.top <= window.innerHeight * 0.4) {
            current = id
          }
        }
      }

      setActiveSection(current)
    }

    // Petit délai pour laisser dangerouslySetInnerHTML peupler le DOM
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // état initial
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [article])

  /* Scroll listener : une seule pub visible à la fois, les autres disparaissent */
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return
      const rect = articleRef.current.getBoundingClientRect()
      const articleHeight = rect.height
      const scrolledInArticle = -rect.top + window.innerHeight * 0.3
      const progress = Math.max(0, Math.min(1, scrolledInArticle / articleHeight))

      if (progress < 0.08) setCurrentAd(-1)
      else if (progress < 0.38) setCurrentAd(0)
      else if (progress < 0.62) setCurrentAd(1)
      else setCurrentAd(2)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!article) {
    notFound()
  }

  // Related articles (filter out current)
  const filteredRelated = relatedArticles.filter(a => a.slug !== params.slug).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════
          BANNIÈRE PUB SWIIPX (haut de page)
          ═══════════════════════════════════════════ */}
      <section className="bg-accent pt-32 pb-10 relative overflow-hidden">
        <div className="absolute left-6 top-32 hidden xl:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-2.jpg" alt="Plaque NFC Swiipx" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute right-6 top-32 hidden xl:block">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/product-thumb-1.jpg" alt="Plaque NFC Swiipx vue" width={192} height={192} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <p className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">
            Boostez vos avis Google<br />avec Swiipx dès aujourd&apos;hui
          </p>
          <p className="text-gray-800 mb-6 max-w-xl mx-auto">
            Commandez votre plaque avis Google NFC et commencez à collecter des avis en 10 secondes. Utilisé par 500+ entreprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#product"
              className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            >
              Découvrir nos plaques avis Google
            </Link>
            <Link
              href="/#how-it-works"
              className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <span>▶</span>
              <span>Comment ça marche ?</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HEADER DE L'ARTICLE
          ═══════════════════════════════════════════ */}
      <section className="border-b border-gray-200 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6 uppercase tracking-wider font-semibold">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>|</span>
            <span className="text-primary">{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>

          {/* Ligne jaune décorative */}
          <div className="w-24 h-1 bg-accent mx-auto mt-8 rounded-full"></div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LAYOUT 3 COLONNES : TOC | CONTENU | ADS
          ═══════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-10">

          {/* ── COLONNE GAUCHE : TOC sticky (style Shopify) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                SOMMAIRE
              </h3>
              <nav aria-label="Table des matières" className="space-y-0.5 max-h-[calc(100vh-340px)] overflow-y-auto pr-2 mb-8">
                {article.tocSections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
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

              {/* Bloc CTA Produit */}
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/product-main.jpg"
                      alt="Plaque NFC Swiipx pour avis Google"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Plaque NFC Swiipx
                  </p>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Doublez vos avis Google avec la plaque NFC n°1 en France. Installation en 30 secondes.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-primary">39,90 €</span>
                    <span className="text-xs text-gray-400 line-through">59,90 €</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">-33%</span>
                  </div>
                  <Link
                    href="/#product"
                    className="block w-full py-3 bg-primary text-white text-center font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-md hover:shadow-lg"
                  >
                    Voir la plaque avis Google →
                  </Link>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                    <span className="text-xs text-gray-500">4.9/5 — 200+ avis</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ── COLONNE CENTRE : CONTENU ── */}
          <article ref={articleRef} className="max-w-none min-w-0">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-0 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-gray-900
                prose-ul:my-4 prose-ol:my-4
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:not-italic
                prose-code:text-primary prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-gray-200 prose-td:p-3
                prose-img:rounded-2xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Section Articles Connexes (visible sur tous les écrans) */}
            <div className="mt-16 pt-10 border-t-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Articles connexes
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredRelated.map((relArticle) => (
                  <Link
                    key={relArticle.slug}
                    href={`/blog/${relArticle.slug}`}
                    className="group block p-5 bg-gray-50 rounded-xl hover:bg-blue-50 border border-gray-200 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      <span className="text-gray-800 font-medium group-hover:text-primary transition-colors">
                        {relArticle.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </article>

          {/* ── COLONNE DROITE : ADS carousel au scroll ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative">

                {/* Ad 0: Swiipx */}
                <div className={`transition-all duration-500 ease-out ${
                  currentAd === 0
                    ? 'relative opacity-100 translate-y-0 scale-100'
                    : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none translate-y-4 scale-95'
                }`}>
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Sponsorisé</div>
                    <h4 className="font-bold text-lg mb-2">
                      La plaque NFC pour chaque commerce.
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      +250% d&apos;avis en moyenne. Installation en 2 minutes.
                    </p>
                    <Link
                      href="/#product"
                      className="block w-full py-3 bg-accent text-gray-900 text-center font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm"
                    >
                      Commander maintenant
                    </Link>
                  </div>
                </div>

                {/* Ad 1: Partenaire */}
                <div className={`transition-all duration-500 ease-out ${
                  currentAd === 1
                    ? 'relative opacity-100 translate-y-0 scale-100'
                    : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none translate-y-4 scale-95'
                }`}>
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Partenaire</div>
                    <div className="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                      <Target className="w-12 h-12 text-indigo-400" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Besoin d&apos;un site web pro ?
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      Nos partenaires créent votre site vitrine ou e-commerce optimisé SEO.
                    </p>
                    <a
                      href="https://skyaksa.fr"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block w-full py-3 bg-indigo-600 text-white text-center font-bold rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                    >
                      Demander un devis gratuit
                    </a>
                  </div>
                </div>

                {/* Ad 2: Articles liés */}
                <div className={`transition-all duration-500 ease-out ${
                  currentAd === 2
                    ? 'relative opacity-100 translate-y-0 scale-100'
                    : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none translate-y-4 scale-95'
                }`}>
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3">
                      📚 Guides gratuits Swiipx
                    </h4>
                    <ul className="space-y-3">
                      {filteredRelated.map((relArticle) => (
                        <li key={relArticle.slug}>
                          <Link
                            href={`/blog/${relArticle.slug}`}
                            className="flex items-start space-x-2 text-sm text-gray-700 hover:text-primary transition-colors group"
                          >
                            <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                            <span>{relArticle.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
