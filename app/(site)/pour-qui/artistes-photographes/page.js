import Link from "next/link";
import PageMetier from "@/components/site/PageMetier";

export const metadata = {
  title: { absolute: "Site internet pour artistes et photographes à Lyon" },
  description:
    "Peintre, illustrateur, photographe : un site portfolio qui met vos œuvres en valeur, reste rapide malgré les images et vous amène des commandes. Dès 1 200 €.",
  alternates: { canonical: "/pour-qui/artistes-photographes" },
};

export default function ArtistesPhotographes() {
  return (
    <PageMetier
      label="Artistes et photographes"
      titre="Un site qui laisse *toute la place* à votre travail"
      intro="Peintre, illustrateur, céramiste, photographe, musicien : votre travail se regarde avant de se lire. Je crée des sites qui le montrent bien, sur tous les écrans, et qui donnent envie de vous contacter."
      probleme={{
        titre: "Instagram montre vos œuvres. Il ne vous *appartient pas.*",
        textes: [
          "Vos images défilent au milieu de celles des autres, l'algorithme décide qui les voit, et la galerie, le client ou le journaliste qui veut en savoir plus tombe sur un fil sans fin, sans tarifs ni démarche.",
          "Un site, c'est votre galerie à vous : vos séries rangées comme vous le voulez, votre démarche, vos expositions, et un moyen simple de vous passer commande. Et on le trouve quand on cherche votre nom sur Google.",
        ],
      }}
      besoins={[
        {
          title: "Des images à la hauteur de votre travail",
          text: "Grandes, nettes, fidèles à vos couleurs, et pourtant rapides à charger : chaque image est préparée en plusieurs tailles, et chaque écran reçoit celle qu'il lui faut.",
        },
        {
          title: "Des séries rangées comme une exposition",
          text: "Par projet, par technique ou par année, avec quelques lignes pour chaque série. On visite votre travail comme une galerie, pas comme un fil d'actualité.",
        },
        {
          title: "Faciliter les commandes",
          text: "Prestations, tarifs, commandes sur mesure, œuvres disponibles : la personne sait ce qu'elle peut vous demander, et comment.",
        },
        {
          title: "Être trouvé pour ce que vous faites",
          text: "« Photographe mariage Lyon », « portrait peint sur commande » : les pages sont construites autour des recherches de vos futurs clients, pas seulement de votre nom.",
        },
      ]}
      bandeau="votre travail"
      offres={{ titre: "Ce que je propose *aux artistes*", ids: ["essentiel", "visibilite"], enAvant: "essentiel" }}
      apresOffres={
        <>
          Vous voulez vendre vos tirages ou vos œuvres en ligne, avec paiement et livraison ? C'est l'offre{" "}
          <Link href="/pour-qui/boutiques-en-ligne" className="font-medium text-terre hover:underline">Boutique</Link>. Pour
          ajouter vos nouvelles œuvres sans vous en occuper, il y a la{" "}
          <Link href="/offres#maintenance" className="font-medium text-terre hover:underline">Maintenance</Link> à 49 € par
          mois. Ou voir <Link href="/offres" className="font-medium text-terre hover:underline">toutes les offres</Link>.
        </>
      }
      faq={[
        {
          q: "J'ai déjà Instagram, ça ne suffit pas ?",
          a: "Gardez-le, c'est un très bon moyen d'être découvert. Le site vient en complément : vous y renvoyez depuis votre bio, il présente votre travail en entier, et il reste à vous si l'application change ses règles.",
        },
        {
          q: "Mes images ne vont-elles pas alourdir le site ?",
          a: "C'est justement le travail : chaque image est compressée et déclinée en plusieurs tailles, et un téléphone ne charge que celle dont il a besoin. Vos fichiers d'origine restent chez vous.",
        },
        {
          q: "Pourrai-je ajouter mes nouvelles œuvres moi-même ?",
          a: "Oui, on peut prévoir une interface simple pour ajouter une série ou une image, sans toucher au code. On en parle pendant l'appel.",
        },
        {
          q: "Peut-on protéger mes images ?",
          a: "Aucun site ne peut empêcher complètement une capture d'écran. On peut en revanche publier vos images en taille écran plutôt qu'en haute définition, et ajouter une signature discrète si vous le souhaitez.",
        },
        {
          q: "Puis-je vendre mes œuvres sur le site ?",
          a: "Pour quelques pièces, une demande de réservation ou un lien de paiement suffit souvent, et ça rentre dans l'offre Essentiel. Pour un vrai catalogue avec stocks et livraisons, c'est l'offre Boutique.",
        },
      ]}
      final="Parlons de *votre travail*"
    />
  );
}
