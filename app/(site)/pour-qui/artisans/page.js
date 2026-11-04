import Link from "next/link";
import PageMetier from "@/components/site/PageMetier";

export const metadata = {
  title: { absolute: "Site internet pour artisans et indépendants à Lyon" },
  description:
    "Menuisier, plombier, électricien, paysagiste : un site qui montre vos réalisations et vous amène des demandes de devis dans votre zone. Dès 1 200 €.",
  alternates: { canonical: "/pour-qui/artisans" },
};

export default function Artisans() {
  return (
    <PageMetier
      label="Artisans et indépendants"
      titre="Des demandes de devis, *près de chez vous*"
      intro="Menuisier, plombier, électricien, paysagiste, coach, consultant : quand on a besoin de vous, on tape votre métier et sa ville sur Google. Je crée des sites qui sortent sur ces recherches, et qui donnent envie de vous appeler."
      probleme={{
        titre: "Le bouche-à-oreille, c'est bien. Mais il *ne se voit pas* sur Google.",
        textes: [
          "Vos clients sont contents et vous recommandent. Mais la personne qui vient d'emménager, ou dont l'entourage ne vous connaît pas, ouvre Google et appelle l'une des entreprises qui apparaissent en premier.",
          "Et quand on vous recommande, la première chose qu'on fait, c'est de vous chercher en ligne. Sans site, ou avec un site vide, vous perdez une partie de ces clients-là aussi.",
        ],
      }}
      besoins={[
        {
          title: "Apparaître dans votre zone",
          text: "Votre fiche Google, et des pages pensées pour les villes et les quartiers où vous intervenez, chacune avec son propre contenu.",
        },
        {
          title: "Montrer vos réalisations",
          text: "Des photos avant et après, des chantiers racontés en quelques lignes : c'est ce qui convainc le plus, bien avant les belles phrases.",
        },
        {
          title: "Recevoir des demandes complètes",
          text: "Un formulaire qui demande les bonnes informations (type de travaux, adresse, photos, délai), pour chiffrer sans rappeler trois fois.",
        },
        {
          title: "Inspirer confiance",
          text: "Vos qualifications, vos assurances, vos garanties et les avis de vos clients, bien visibles. On sait à qui on ouvre sa porte.",
        },
      ]}
      bandeau="votre entreprise"
      offres={{ titre: "Ce que je propose *aux artisans*", ids: ["essentiel", "visibilite"], enAvant: "visibilite" }}
      apresOffres={
        <>
          Une fois le site en ligne, la{" "}
          <Link href="/offres#maintenance" className="font-medium text-terre hover:underline">Maintenance</Link> à 49 € par mois
          le garde à jour, et le{" "}
          <Link href="/offres#suivi" className="font-medium text-terre hover:underline">Suivi</Link> à 290 € par mois s'occupe
          aussi de votre fiche Google et de vos réalisations. Ou voir{" "}
          <Link href="/offres" className="font-medium text-terre hover:underline">toutes les offres</Link>.
        </>
      }
      faq={[
        {
          q: "J'ai déjà assez de travail, pourquoi un site ?",
          a: "Pour choisir vos chantiers plutôt que les subir : plus de demandes, c'est pouvoir garder celles qui vous intéressent, dans votre zone et à votre prix. Et un site se prépare avant d'en avoir besoin, pas le jour où le carnet se vide.",
        },
        {
          q: "Je n'ai pas le temps de m'en occuper.",
          a: "Je m'occupe de tout. Il me faut des photos de vos chantiers (celles de votre téléphone suffisent souvent) et un appel pour parler de votre activité. Vous relisez, vous validez.",
        },
        {
          q: "Les plateformes de mise en relation, ça ne suffit pas ?",
          a: "Elles amènent des contacts, mais vous les payez, et vous êtes comparé à vos concurrents sur la même page. Votre site amène des demandes qui viennent directement à vous, sans commission.",
        },
        {
          q: "En combien de temps serai-je visible sur Google ?",
          a: "Une fiche Google bien remplie peut apparaître en quelques semaines. Pour le site, comptez en général 2 à 6 mois pour bien se placer sur les recherches locales, selon votre métier et la concurrence dans votre zone.",
        },
        {
          q: "J'interviens sur plusieurs villes, comment faire ?",
          a: "C'est le cas typique de l'offre Visibilité : une page par zone ou par prestation, chacune avec un vrai contenu (vos chantiers dans le secteur, vos délais), pas la même page copiée où seule la ville change.",
        },
      ]}
      final="Parlons de *vos chantiers*"
    />
  );
}
