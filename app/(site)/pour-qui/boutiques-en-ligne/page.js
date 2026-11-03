import Link from "next/link";
import PageMetier from "@/components/site/PageMetier";

export const metadata = {
  title: { absolute: "Création de boutique en ligne sur mesure à Lyon" },
  description:
    "Une boutique sur mesure que vous gérez vous-même : paiement Stripe et PayPal, back-office simple, référencement pensé dès le départ. Dès 8 000 €.",
  alternates: { canonical: "/pour-qui/boutiques-en-ligne" },
};

export default function BoutiquesEnLigne() {
  return (
    <PageMetier
      label="Boutiques en ligne"
      titre="Une boutique en ligne qui *vous appartient*"
      intro="Vous vendez vos produits, vos créations ou ceux que vous sélectionnez : je crée des boutiques sur mesure, rapides, que vous pilotez vous-même, et construites pour être trouvées sur Google."
      probleme={{
        titre: "Les plateformes prennent leur part. *À chaque vente.*",
        textes: [
          "Abonnements, applications payantes, commissions : sur les solutions toutes faites, les frais s'additionnent mois après mois, et vos fiches produits ressemblent à celles de tout le monde.",
          "Pour avoir du monde, on finit souvent par payer de la publicité, qui s'arrête le jour où on arrête de payer. Le référencement naturel, lui, continue de travailler : chaque fiche et chaque article bien écrits ramènent des visiteurs, mois après mois.",
        ],
      }}
      besoins={[
        {
          title: "Une boutique rapide et rassurante",
          text: "Des pages qui s'affichent vite sur téléphone, des photos soignées, une commande en peu d'étapes et un paiement sécurisé par Stripe et PayPal.",
        },
        {
          title: "Un back-office à votre main",
          text: "Produits, stocks, photos, commandes, e-mails d'expédition, textes du site : vous gérez tout depuis une interface simple, sans compétence technique.",
        },
        {
          title: "Des visiteurs sans publicité",
          text: "Une structure pensée pour Google dès la conception, des fiches produits écrites pour les recherches de vos clients, et un blog qui répond à leurs questions.",
        },
        {
          title: "Des clients qui reviennent",
          text: "Demande d'avis après livraison, e-mails de commande soignés, et des statistiques pour savoir ce qui se vend et d'où viennent vos visiteurs.",
        },
      ]}
      bandeau="votre boutique"
      offres={{ titre: "Ce que je propose *aux boutiques*", ids: ["boutique", "accompagnement"], enAvant: "boutique" }}
      apresOffres={
        <>
          Quelques pièces à vendre seulement ? Un site{" "}
          <Link href="/offres#essentiel" className="font-medium text-terre hover:underline">Essentiel</Link> avec un lien de
          paiement suffit souvent. Ou voir <Link href="/offres" className="font-medium text-terre hover:underline">toutes les offres</Link>.
        </>
      }
      exemples={["rangements-chaussures"]}
      faq={[
        {
          q: "Pourquoi pas Shopify ou Wix ?",
          a: "Ce sont de bons outils pour démarrer seul. Mais les frais s'additionnent (abonnement, applications, commissions) et vous êtes limité à ce que propose la plateforme. Une boutique sur mesure vous appartient : pas d'abonnement à une plateforme, seulement un hébergement de 0 à 25 € par mois selon votre trafic.",
        },
        {
          q: "Combien de produits peut-on mettre ?",
          a: "Il n'y a pas de limite technique. Le prix dépend surtout des fonctionnalités dont vous avez besoin et du nombre de fiches à rédiger : on fait le point pendant l'appel.",
        },
        {
          q: "Saurai-je gérer la boutique seul ?",
          a: "Oui, c'est le rôle du back-office : ajouter un produit ou expédier une commande se fait en quelques clics. Une heure de formation est comprise, et la formule Accompagnement existe si vous voulez être suivi.",
        },
        {
          q: "J'ai déjà une boutique. Pouvez-vous la refaire ?",
          a: "Oui. On reprend vos produits et, surtout, on garde les adresses de vos pages ou on les redirige proprement, pour ne pas perdre le référencement déjà acquis.",
        },
        {
          q: "En combien de temps la boutique attire-t-elle des visiteurs ?",
          a: "Le référencement naturel prend du temps : comptez plusieurs mois avant que les fiches et les articles se placent bien. C'est un investissement qui dure, pas un robinet qu'on ouvre et qu'on ferme.",
        },
      ]}
      final="Parlons de *votre boutique*"
    />
  );
}
