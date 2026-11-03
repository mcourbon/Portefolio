// Offres affichées sur /offres, l'accueil et les pages métier. Les délais courent à réception des contenus.
export const OFFRES = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: "À partir de 1 200 €",
    delay: "Livré en 2 semaines à réception de vos textes et photos",
    forWho: "Indépendant ou artisan sans site, ou avec un site daté qui ne vous amène rien.",
    items: [
      "Site vitrine de 4 à 6 pages, conçu sur mesure",
      "Affichage soigné sur mobile, tablette et ordinateur",
      "Formulaire de contact relié à votre boîte mail",
      "Pages légales rédigées et adaptées à votre activité",
      "Fiche Google Business créée et optimisée (vous la validez auprès de Google)",
      "Bases SEO : titres, descriptions, structure, sitemap",
      "Mise en ligne accompagnée",
      "Le code vous appartient",
    ],
  },
  {
    id: "visibilite",
    name: "Visibilité",
    price: "À partir de 3 500 €",
    delay: "Livré en 3 à 4 semaines à réception de vos contenus",
    forWho: "Professionnel établi qui veut que ses clients le trouvent sur Google, pas seulement avoir une carte de visite en ligne.",
    intro: "Tout ce que contient l'Essentiel, plus :",
    featured: true,
    items: [
      "Recherche des mots que tapent vos clients, pour votre métier et votre zone",
      "3 à 5 pages construites chacune autour d'une recherche précise, par prestation ou par zone, avec un contenu propre (pas de pages copiées où seule la ville change)",
      "5 articles de blog rédigés et optimisés",
      "Avis clients : lien et QR code pour laisser un avis en deux clics, modèles de messages, méthode pour répondre aux avis",
      "Google Search Console et statistiques de visites configurées",
      "État des lieux au départ, puis bilan de positionnement à 90 jours",
    ],
  },
  {
    id: "boutique",
    name: "Boutique",
    price: "À partir de 8 000 €",
    delay: "Livrée en 6 à 8 semaines à réception de vos contenus",
    forWho: "Vous vendez des produits et voulez une boutique que vous pilotez vous-même, qui amène du trafic sans publicité.",
    items: [
      "Boutique en ligne complète, conçue sur mesure",
      "Paiement sécurisé par Stripe et PayPal",
      "Tunnel de commande optimisé",
      "Back-office simple : produits, stocks et photos, sans compétence technique",
      "Fiches produits rédigées et optimisées pour le référencement",
      "Architecture pensée pour le SEO dès la conception",
      "5 articles de blog au lancement",
      "Demande d'avis automatique après livraison",
      "Compte Pinterest créé et alimenté",
      "Search Console, statistiques et suivi des ventes",
      "Une heure de formation à la prise en main",
      "Le code vous appartient",
    ],
  },
];

export const SUIVIS = [
  {
    id: "suivi",
    name: "Suivi",
    price: "290 € par mois",
    delay: "Engagement de 3 mois minimum",
    forWho: "Praticien ou artisan seul : votre site est en ligne, vous voulez qu'il reste à jour et progresse doucement.",
    items: [
      "Fiche Google suivie : horaires, photos, publications",
      "1 article de blog par mois",
      "Petites mises à jour du site : textes, photos, horaires",
      "Bilan tous les 3 mois : ce qui a été fait, ce que ça a donné",
    ],
  },
  {
    id: "accompagnement",
    name: "Accompagnement",
    price: "900 à 1 500 € par mois",
    delay: "Engagement de 3 mois minimum",
    forWho: "Votre site est en ligne, maintenant il faut qu'il monte. Le référencement se construit dans la durée.",
    items: [
      "2 articles de blog par mois, choisis à partir de vos données Search Console",
      "Optimisation continue des pages : titres, descriptions, liens internes",
      "Correction des pages qui apparaissent sur Google sans être cliquées",
      "Suivi des positions et détection des problèmes techniques",
      "15 à 20 épingles Pinterest par mois (pour les boutiques)",
      "Rapport mensuel clair : ce qui a été fait, ce que ça a produit",
      "Réponse sous 48 h à vos questions",
    ],
    note: "Formule Intensive à 2 000 € par mois : 4 articles par mois au lieu de 2.",
  },
];

export const ETAPES = [
  { title: "On cadre", text: "Un appel pour comprendre votre activité, vos clients et vos objectifs." },
  { title: "Vous validez la maquette", text: "Avant la moindre ligne de code, vous voyez la structure du site et vous donnez votre avis." },
  { title: "Vous validez le design", text: "Couleurs, typographie, ambiance : on ajuste jusqu'à ce que ça vous ressemble." },
  { title: "Je construis", text: "Vous suivez l'avancement sur un lien de prévisualisation." },
  { title: "On affine", text: "3 séries de modifications sont incluses. Une série, c'est une liste de retours groupés." },
  { title: "On met en ligne", text: "Et je vous montre comment vous en servir." },
];

export const NON_COMPRIS = [
  "Les textes et photos de votre activité sont fournis par vous. Je les mets en forme et je les optimise.",
  "Le nom de domaine est à votre charge : environ 15 € par an.",
  "Hébergement d'un site vitrine : gratuit chez Cloudflare, dont l'offre gratuite suffit largement. Pour une boutique, comptez de 0 à 25 € par mois selon le trafic.",
  "Les évolutions demandées après la mise en ligne font l'objet d'un devis séparé.",
  "Pour une activité de services, l'envoi des demandes d'avis à vos clients vous revient. Je vous fournis les outils et la méthode.",
  "La gestion d'Instagram ou de Facebook n'est pas incluse.",
];
