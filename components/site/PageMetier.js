import Link from "next/link";
import { OFFRES, SUIVIS } from "@/lib/offres";
import { PROJETS } from "@/lib/projets";
import { SITE } from "@/lib/site";
import { CallBanner, CallButton, OfferCard, PageHeader, ProjectCard, Section, Titre } from "@/components/site/ui";
import { Etoile } from "@/components/site/desert";

// Les mots entre astérisques passent en italique calligraphique : « Un site *qui vous ressemble* ».
export function Accent({ texte, className = "" }) {
  return texte.split("*").map((morceau, index) =>
    index % 2 ? (
      <span key={index} className={`accent ${className}`}>
        {morceau}
      </span>
    ) : (
      morceau
    )
  );
}

const TOUTES_OFFRES = [...OFFRES, ...SUIVIS];

// Gabarit commun des pages métier (artistes, artisans, boutiques). Chaque page apporte son propre contenu.
export default function PageMetier({ label, titre, intro, probleme, besoins, bandeau, offres, apresOffres, exemples = [], faq, lecture, final }) {
  const projets = exemples.map((slug) => PROJETS.find((projet) => projet.slug === slug)).filter(Boolean);

  return (
    <>
      <PageHeader label={label} title={<Accent texte={titre} className="!text-[#ffd59a]" />}>
        <p>{intro}</p>
        <div className="mt-8 flex justify-center">
          <CallButton>Réserver un appel gratuit</CallButton>
        </div>
      </PageHeader>

      <Section>
        <Titre label="Le problème">
          <Accent texte={probleme.titre} />
        </Titre>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 text-lg leading-relaxed md:grid-cols-2">
          <p>{probleme.textes[0]}</p>
          <p className="text-brun-doux">{probleme.textes[1]}</p>
        </div>
      </Section>

      <Section motif>
        <Titre label="Ce que fait votre site">Quatre choses, bien faites</Titre>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {besoins.map(({ title, text }) => (
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
            Vous vous reconnaissez ? On en parle {SITE.callLength}, gratuitement, et je vous dis ce que je ferais pour {bandeau}.
          </p>
          <CallButton className="flex-shrink-0" />
        </div>
      </Section>

      <Section>
        <Titre label="L'offre">
          <Accent texte={offres.titre} />
        </Titre>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {offres.ids.map((id) => {
            const offre = TOUTES_OFFRES.find((o) => o.id === id);
            return <OfferCard key={id} offre={{ ...offre, featured: id === offres.enAvant }} />;
          })}
        </div>
        {apresOffres && <p className="mx-auto mt-10 max-w-2xl text-center leading-relaxed text-brun-doux">{apresOffres}</p>}
      </Section>

      {projets.length > 0 && (
        <Section motif>
          <Titre label="Exemple">Ce que ça donne</Titre>
          <div className={`mx-auto mt-14 grid gap-x-8 gap-y-14 ${projets.length > 1 ? "max-w-4xl md:grid-cols-2" : "max-w-xl"}`}>
            {projets.map((projet) => (
              <ProjectCard key={projet.slug} projet={projet} />
            ))}
          </div>
        </Section>
      )}

      <Section>
        <Titre label="Questions fréquentes">Ce qu'on me demande souvent</Titre>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-or/40 border-y border-or/40">
          {faq.map(({ q, a }) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-titre text-xl font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <Etoile className="mt-1 h-4 w-4 flex-shrink-0 text-or transition-transform duration-300 group-open:rotate-45 group-open:text-terre" />
              </summary>
              <p className="mt-4 leading-relaxed text-brun-doux">{a}</p>
            </details>
          ))}
        </div>
        {lecture && (
          <p className="mt-10 text-center">
            À lire aussi :{" "}
            <Link href={lecture.href} className="font-medium text-terre hover:underline">
              {lecture.label}
            </Link>
          </p>
        )}
      </Section>

      <CallBanner title={<Accent texte={final} className="!text-dune" />} />
    </>
  );
}
