import { OFFRES, SUIVIS, ETAPES, NON_COMPRIS } from "@/lib/offres";
import { SITE } from "@/lib/site";
import { CallBanner, CallButton, OfferCard, PageHeader, Section, Titre } from "@/components/site/ui";
import { Etoile } from "@/components/site/desert";

export const metadata = {
  title: "Offres et prix",
  description:
    "Site vitrine dès 1 200 €, site pensé pour Google dès 3 500 €, boutique en ligne dès 8 000 €, suivi mensuel : les prix et le contenu de chaque offre.",
  alternates: { canonical: "/offres" },
};

export default function Offres() {
  return (
    <>
      <PageHeader
        label="Offres et prix"
        title={
          <>
            Ce que je fais, et <span className="accent !text-[#ffd59a]">combien</span> ça coûte
          </>
        }
      >
        <p>
          Chaque site est fait sur mesure, mais les prix de départ sont les mêmes pour tout le monde. Le montant exact
          dépend du nombre de pages et des fonctions : on le fixe ensemble, avant de commencer.
        </p>
      </PageHeader>

      <Section>
        <Titre label="Créer votre site">Trois offres, selon votre projet</Titre>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {OFFRES.map((offre) => (
            <OfferCard key={offre.id} offre={offre} />
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-brun-doux">Vous hésitez entre deux offres ? On en parle {SITE.callLength}.</p>
          <CallButton />
        </div>
      </Section>

      <Section motif>
        <Titre
          label="Après la mise en ligne"
          intro="Un site bien construit peut très bien vivre seul. Mais le référencement se gagne dans la durée : si vous voulez continuer à progresser sur Google sans y passer de temps, je peux m'en occuper chaque mois."
        >
          Faire <span className="accent">vivre</span> votre site
        </Titre>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {SUIVIS.map((offre) => (
            <OfferCard key={offre.id} offre={offre} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Titre label="Comment on travaille" className="lg:text-left [&>div]:lg:justify-start">
              Six étapes, <span className="accent">zéro surprise</span>
            </Titre>
            <ol className="mt-10 space-y-6">
              {ETAPES.map(({ title, text }, index) => (
                <li key={title} className="flex gap-4">
                  <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center">
                    <Etoile className="absolute inset-0 h-11 w-11 text-sable-fonce" />
                    <span className="relative font-titre font-bold text-terre">{index + 1}</span>
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-titre text-xl font-bold">{title}</h3>
                    <p className="mt-1 leading-relaxed text-brun-doux">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="self-start rounded-3xl border-2 border-dashed border-or/60 bg-creme/50 px-7 py-9 sm:px-10">
            <h2 className="font-titre text-3xl font-bold">Ce qui n'est pas compris</h2>
            <p className="mt-2 text-brun-doux">Pour que tout soit clair dès le départ.</p>
            <ul className="mt-8 space-y-4">
              {NON_COMPRIS.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <Etoile className="mt-1.5 h-3 w-3 flex-shrink-0 text-or" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CallBanner
        title={
          <>
            Pas sûr de <span className="accent !text-dune">l'offre</span> qu'il vous faut ?
          </>
        }
      >
        Réservez un appel de {SITE.callLength}. On fait le point sur votre situation et je vous dis honnêtement ce dont
        vous avez besoin, même si la réponse est que vous n'avez pas besoin de moi.
      </CallBanner>
    </>
  );
}
