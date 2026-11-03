export const SITE = {
  url: "https://marcantoinecourbon.dev",
  name: "Marc-Antoine Courbon",
  shortName: "Marc-Antoine Courbon",
  role: "Création de sites internet à Lyon",
  description:
    "Sites internet sur mesure pour les indépendants de Lyon et d'ailleurs : thérapeutes, artistes, photographes, artisans : un site clair, rapide, et pensé pour être trouvé sur Google.",
  city: "Lyon",
  email: "courbon.marcantoine@gmail.com",
  rdv: "https://cal.com/marc-antoine-courbon-yimfo5/appel-decouverte",
  callLength: "20 minutes",
  github: "https://github.com/mcourbon",
};

// Mentions légales : à compléter avant la mise en ligne (une ligne vide n'est pas affichée).
export const LEGAL = {
  status: "Entrepreneur individuel (micro-entreprise)",
  siret: "882 784 242 00019",
  address: "2 bis rue du Bac, 69600 Oullins-Pierre-Bénite",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
};

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/offres", label: "Offres" },
  { href: "/pour-qui", label: "Pour qui" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Une page par cible. `text` sert sur l'accueil, `resume` (court) dans les étoiles de la page « Pour qui ».
export const METIERS = [
  {
    slug: "therapeutes",
    href: "/pour-qui/therapeutes",
    title: "Thérapeutes et praticiens du bien-être",
    short: "Thérapeutes",
    text: "Naturopathes, sophrologues, ostéopathes, hypnothérapeutes : un site qui rassure avant le premier rendez-vous.",
    resume: "Un site qui rassure vos patients avant le premier rendez-vous.",
  },
  {
    slug: "artistes-photographes",
    href: "/pour-qui/artistes-photographes",
    title: "Artistes et photographes",
    short: "Artistes & photographes",
    text: "Peintre, illustrateur, photographe, musicien : une vitrine qui met votre travail en valeur et vous apporte des commandes.",
    resume: "Une vitrine qui met vos œuvres en valeur et vous amène des commandes.",
  },
  {
    slug: "artisans",
    href: "/pour-qui/artisans",
    title: "Artisans et indépendants",
    short: "Artisans & indépendants",
    text: "Menuisier, plombier, coach, consultant : montrer votre savoir-faire et être visible dans votre zone.",
    resume: "Vos réalisations en avant, et des demandes de devis dans votre zone.",
  },
  {
    slug: "boutiques-en-ligne",
    href: "/pour-qui/boutiques-en-ligne",
    title: "Boutiques en ligne",
    short: "Boutiques en ligne",
    text: "Une boutique que vous gérez seul, avec paiement sécurisé, qui attire du monde sans publicité.",
    resume: "Une boutique sur mesure que vous pilotez, trouvée sur Google.",
  },
];
