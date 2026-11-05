import Link from "next/link";
import { OFFRES, SUIVIS } from "@/lib/offres";
import { PROJETS } from "@/lib/projets";
import { SITE } from "@/lib/site";
import { CallBanner, CallButton, OfferCard, PageHeader, ProjectCard, Section, Titre } from "@/components/site/ui";
import { Etoile } from "@/components/site/desert";

export const metadata = {
  title: { absolute: "Site internet pour thérapeutes et praticiens à Lyon" },
  description:
    "Naturopathe, sophrologue, ostéopathe : un site qui vous rend visible sur Google dans votre ville et rassure vos patients avant le rendez-vous. Dès 1 200 €.",
  alternates: { canonical: "/pour-qui/therapeutes" },
};

const BESOINS = [
  {
    title: "Être trouvé dans votre ville",
    text: "Quand quelqu'un tape « sophrologue Villeurbanne » ou « naturopathe Lyon 7 », c'est votre site et votre fiche Google qui doivent sortir. Les pages sont construites autour de ces recherches.",
  },
  {
    title: "Rassurer avant le premier contact",
    text: "Votre parcours, votre approche, le déroulement d'une séance, vos tarifs. Pour un accompagnement souvent intime, on a besoin de savoir à qui on s'adresse avant de réserver.",
  },
  {
    title: "Faciliter la prise de rendez-vous",
    text: "Un bouton clair sur chaque page, vers l'outil que vous utilisez déjà (Doctolib, Resalib, Calendly…) ou un simple formulaire.",
  },
  {
    title: "Donner les infos pratiques",
    text: "Adresse, accès, stationnement, horaires, accessibilité, séances en visio : tout ce qu'on vous demande au téléphone, au même endroit.",
  },
];

const FAQ = [
  {
    q: "J'ai déjà une fiche Doctolib ou Resalib. Ai-je besoin d'un site ?",
    a: "Ces plateformes sont pratiques pour la prise de rendez-vous, gardez-les si elles vous conviennent. Mais votre fiche y est rangée au milieu de celles de vos confrères, avec peu de place pour vous présenter. Le site est l'endroit qui vous appartient : il raconte votre approche, il se positionne sur Google à votre nom, et il renvoie vers votre outil de réservation.",
  },
  {
    q: "En combien de temps serai-je visible sur Google ?",
    a: "Une fiche Google bien remplie peut apparaître en quelques semaines. Pour le site, comptez en général 2 à 6 mois pour bien se placer sur les recherches locales, selon votre ville et la concurrence. C'est pour ça que je fais un état des lieux au départ, pour mesurer les progrès.",
  },
  {
    q: "Est-ce que je dois écrire les textes ?",
    a: "Vous me donnez la matière : votre parcours, vos séances, vos tarifs, ce qui vous rend différent. Par écrit ou au téléphone. Je les mets en forme et je les optimise pour Google, puis vous relisez.",
  },
  {
    q: "Les textes respecteront-ils le cadre de ma pratique ?",
    a: "Oui. Pas de promesse de guérison ni de résultat, et les précisions d'usage quand votre pratique ne remplace pas un suivi médical. On les relit ensemble.",
  },
  {
    q: "Pourrai-je modifier mon site moi-même ?",
    a: "C'est possible : on peut prévoir une interface simple pour vos articles ou vos horaires, comme pour La Villa du Rocher. On en parle pendant l'appel. Sinon, la formule Suivi s'en charge pour vous.",
  },
];

export default function Therapeutes() {
  const essentiel = OFFRES.find((offre) => offre.id === "essentiel");
  const suivi = SUIVIS.find((offre) => offre.id === "suivi");
  const exemples = PROJETS.filter((projet) => projet.sector === "Bien-être");

  return (
    <>
      <PageHeader
        label="Thérapeutes et praticiens du bien-être"
        title={
          <>
            Un site qui rassure vos patients <span className="accent !text-[#ffd59a]">avant</span> le premier rendez-vous
          </>
        }
      >
        <p>
          Naturopathe, sophrologue, ostéopathe, hypnothérapeute, praticien en soins énergétiques : vos futurs patients
          vous cherchent sur Google. Je crée des sites qui leur répondent, et qui vous amènent des rendez-vous.
        </p>
        <div className="mt-8 flex justify-center">
          <CallButton>Réserver un appel gratuit</CallButton>
        </div>
      </PageHeader>

      <Section>
        <Titre label="Le problème">
          Vous existez sur internet. Mais sur la page de <span className="accent">quelqu'un d'autre.</span>
        </Titre>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 text-lg leading-relaxed md:grid-cols-2">
          <p>
            Tapez votre métier et votre ville sur Google. Vous verrez des annuaires, des fiches Doctolib ou Resalib, et
            votre profil y est rangé au milieu de ceux de vos confrères, avec trois lignes pour vous présenter.
          </p>
          <p className="text-brun-doux">
            Vous apparaissez, mais sur une page que vous ne contrôlez pas, à côté de vos concurrents. Et la personne qui
            hésite à consulter n'y trouve pas ce qui la déciderait : qui vous êtes, comment se passe une séance,
            pourquoi vous plutôt qu'un autre.
          </p>
        </div>
      </Section>

      <Section motif>
        <Titre label="Ce que fait votre site">Quatre choses, bien faites</Titre>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {BESOINS.map(({ title, text }) => (
            <div key={title} className="flex gap-5 rounded-3xl border border-or/50 bg-creme p-7">
              <Etoile className="mt-1 h-6 w-6 flex-shrink-0 text-terre" />
              <div>
                <h3 className="font-titre text-2xl font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-brun-doux">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-brun p-8 text-center text-sable sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-lg leading-relaxed">
            Vous vous reconnaissez ? On en parle {SITE.callLength}, gratuitement, et je vous dis ce que je ferais pour
            votre cabinet.
          </p>
          <CallButton className="flex-shrink-0" />
        </div>
      </Section>

      <Section>
        <Titre label="L'offre">
          Ce que je propose <span className="accent">aux praticiens</span>
        </Titre>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <OfferCard offre={{ ...essentiel, featured: true }} />
          <OfferCard offre={suivi} />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center leading-relaxed text-brun-doux">
          Vous voulez juste que votre site reste à jour, sans le blog ni la fiche Google ? La{" "}
          <Link href="/offres#maintenance" className="font-medium text-terre hover:underline">Maintenance</Link> à 49 € par mois
          suffit. Vous voulez apparaître sur plusieurs prestations ou plusieurs villes, avec des articles de blog ? C'est l'offre{" "}
          <Link href="/offres#visibilite" className="font-medium text-terre hover:underline">Visibilité</Link>, à partir de
          3 500 €. Ou voir <Link href="/offres" className="font-medium text-terre hover:underline">toutes les offres</Link>.
        </p>
      </Section>

      <Section motif>
        <Titre label="Exemples">{exemples.length > 1 ? "Des sites dans le bien-être" : "Un site dans le bien-être"}</Titre>
        <div className={`mx-auto mt-14 grid gap-x-8 gap-y-14 ${exemples.length > 1 ? "max-w-4xl md:grid-cols-2" : "max-w-xl"}`}>
          {exemples.map((projet) => (
            <ProjectCard key={projet.slug} projet={projet} />
          ))}
        </div>
      </Section>

      <Section>
        <Titre label="Questions fréquentes">Ce qu'on me demande souvent</Titre>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-or/40 border-y border-or/40">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-titre text-xl font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <Etoile className="mt-1 h-4 w-4 flex-shrink-0 text-or transition-transform duration-300 group-open:rotate-45 group-open:text-terre" />
              </summary>
              <p className="mt-4 leading-relaxed text-brun-doux">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center">
          À lire aussi :{" "}
          <Link href="/blog/prix-site-internet-praticien" className="font-medium text-terre hover:underline">
            combien coûte un site internet pour un praticien ?
          </Link>
        </p>
      </Section>

      <CallBanner
        title={
          <>
            Parlons de <span className="accent !text-dune">votre cabinet</span>
          </>
        }
      />
    </>
  );
}
