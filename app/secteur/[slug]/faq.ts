/**
 * FAQ des pages secteur — source unique.
 *
 * Elle etait dupliquee : une liste dans page.tsx pour l'affichage, une autre
 * dans layout.tsx pour le balisage FAQPage. Les deux ont diverge des la
 * premiere modification — la page affichait 7 questions, le JSON-LD n'en
 * declarait que 4. Google demande que les donnees structurees refletent le
 * contenu visible ; un ecart peut faire ignorer le resultat enrichi.
 *
 * Les questions sont calquees sur les requetes reelles de Search Console
 * (fiche Google Business Profile, choix du format plaque/carte/magnet).
 */
export interface QuestionReponse {
  q: string
  a: string
}

export const faqSecteurs: Record<string, QuestionReponse[]> = {
  'restaurant': [
      { q: 'Combien d\'avis Google peut collecter mon restaurant ?', a: 'Nous ne promettons pas de chiffre : cela dépend de votre fréquentation et de ce que dit votre équipe. Le calcul vous appartient. Avec 300 couverts par semaine et un client sur vingt qui accepte quand on le lui propose, cela ferait une quinzaine d\'avis par semaine. Divisez par deux si la plaque n\'est mentionnée qu\'une fois sur deux.' },
      { q: 'La plaque résiste-t-elle au nettoyage quotidien ?', a: 'Oui. L\'acrylique 3 mm résiste à l\'eau, aux désinfectants, aux UV et aux rayures. Vous pouvez la nettoyer comme une table normale.' },
      { q: 'Faut-il former mes serveurs ?', a: 'Oui, c\'est le point décisif. Sans un mot du serveur, la plaque reste un objet que le client ne sait pas identifier. Comptez 15 à 30 minutes de briefing pour expliquer le moment et la phrase à utiliser.' },
      { q: 'Quel pack pour un restaurant de 80 couverts ?', a: 'Pack Pro (5 plaques) : 1 plaque par groupe de 15-20 couverts. C\'est le ratio optimal pour ne pas créer de "bouchon" sur une seule plaque.' },
      { q: "Faut-il une fiche Google Business Profile pour utiliser la plaque ?", a: "Oui, c'est indispensable. La plaque ouvre le formulaire d'avis de votre fiche : sans fiche validée par Google, il n'existe aucun lien vers lequel envoyer vos clients. Si vous ne l'avez pas encore revendiquée, faites-le avant de commander — c'est gratuit." },
      { q: "Plaque, carte ou magnet NFC : quelle différence pour un restaurant ?", a: "La plaque reste posée à un emplacement fixe et se voit sans qu'on la tende au client. La carte se plie et se tache au fil du service. Le magnet impose une surface métallique, rare en salle. Swiipx fabrique la plaque, en acrylique 3 mm avec adhésif 3M." },
      { q: "Peut-on changer le lien d'avis après l'achat ?", a: "Oui. La puce NTAG215 est réinscriptible : si vous changez d'établissement ou si votre fiche Google évolue, écrivez-nous et nous vous indiquons la marche à suivre." },
  ],
  'salon-coiffure': [
      { q: 'Mes clientes seniors vont-elles savoir utiliser le NFC ?', a: 'Oui. Le NFC fonctionne avec tout smartphone récent. La cliente n\'a rien à comprendre : elle approche son téléphone, ça s\'ouvre automatiquement. Plus simple qu\'un QR code.' },
      { q: 'La plaque résiste-t-elle aux produits capillaires ?', a: 'Oui. L\'acrylique 3 mm résiste à l\'eau, aux laques, colorations et shampoings. Nettoyage avec un chiffon humide ou un spray désinfectant.' },
      { q: 'Quel pack pour un institut multi-cabines ?', a: 'Pack Pro (5 plaques) : une par cabine, ou quatre en cabine et une à l\'accueil selon votre configuration. L\'idée est qu\'aucune praticienne n\'ait à faire traverser le salon à sa cliente pour laisser son avis.' },
      { q: 'Combien d\'avis attendre par mois ?', a: 'Nous ne promettons aucun chiffre : cela dépend de votre fréquentation, de l\'endroit où la plaque est posée et du fait qu\'on en parle ou non à la cliente. Le calcul se pose ainsi : un salon qui reçoit 200 clientes par mois et dont une cliente sur dix laisse un avis en obtiendrait une vingtaine par mois. Remplacez ces deux hypothèses par vos propres chiffres, puis vérifiez sur votre fiche.' },
      { q: "Faut-il une fiche Google Business Profile pour utiliser la plaque ?", a: "Oui. La plaque ouvre le formulaire d'avis de votre fiche : sans fiche validée par Google, il n'existe aucun lien de destination. Si votre salon n'est pas encore revendiqué sur Google, faites-le avant de commander — c'est gratuit." },
      { q: "Plaque, carte ou magnet NFC : que choisir pour un salon ?", a: "La plaque se fixe près du miroir et reste dans le champ de vision pendant toute la prestation. La carte n'est remise qu'au départ, quand l'effet est retombé. Le magnet suppose une surface métallique bien placée. Swiipx fabrique la plaque, résistante aux laques et colorations." },
      { q: "Peut-on changer le lien d'avis après l'achat ?", a: "Oui. La puce NTAG215 est réinscriptible : en cas de changement d'enseigne ou d'adresse, écrivez-nous et nous vous indiquons la marche à suivre." },
  ],
  'cabinet-medical': [
      { q: 'Est-ce conforme à mon code de déontologie ?', a: 'Oui. La plaque est discrète, sans message commercial agressif, et le patient choisit librement de l\'utiliser. C\'est l\'équivalent d\'un panneau "votre avis nous intéresse" classique. Aucune contrepartie offerte, aucune incitation = conforme.' },
      { q: 'Puis-je demander verbalement à mes patients ?', a: 'Évitez la sollicitation directe ("laissez-nous un avis"). Préférez une mention factuelle : "Nous avons mis une plaque à l\'accueil si vous souhaitez laisser un retour." Le patient décide.' },
      { q: 'Quel pack pour un cabinet pluridisciplinaire ?', a: 'Pack Pro (5 plaques) : 1 par cabine de consultation + accueil. Adapté aux cabinets avec 3+ praticiens.' },
      { q: 'Que faire d\'un avis négatif (RGPD, secret médical) ?', a: 'Répondez de manière générale ("Nous sommes désolés que votre expérience n\'ait pas été à la hauteur, contactez-nous à [email]") sans mentionner de détail médical. Si l\'avis viole le secret médical du patient, signalez-le à Google pour suppression.' },
      { q: "Faut-il une fiche Google Business Profile pour utiliser la plaque ?", a: "Oui. La plaque ouvre le formulaire d'avis de votre fiche : sans fiche validée par Google, il n'existe aucun lien de destination. La plupart des cabinets ont une fiche créée automatiquement par Google — il suffit de la revendiquer, gratuitement." },
      { q: "Plaque, carte ou magnet NFC : lequel respecte le mieux la déontologie ?", a: "La plaque, posée à l'accueil, laisse le patient la remarquer de lui-même. Remettre une carte en main propre s'apparente à une sollicitation directe, ce que la déontologie déconseille. Swiipx fabrique la plaque, dans un format sobre et sans message commercial." },
      { q: "Peut-on changer le lien d'avis après l'achat ?", a: "Oui. La puce NTAG215 est réinscriptible : en cas de changement de cabinet ou d'adresse, écrivez-nous et nous vous indiquons la marche à suivre." },
  ],
}
