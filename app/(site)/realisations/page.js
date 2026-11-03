import { PROJETS } from "@/lib/projets";
import { CallBanner, PageHeader, ProjectCard, Section } from "@/components/site/ui";

export const metadata = {
  title: "Réalisations",
  description:
    "Sites vitrines, boutique en ligne, démos : des exemples de sites que j'ai conçus et développés, avec ce qu'est vraiment chaque projet.",
  alternates: { canonical: "/realisations" },
};

export default function Realisations() {
  return (
    <>
      <PageHeader
        label="Réalisations"
        title={
          <>
            Des sites que j'ai faits, <span className="accent !text-[#ffd59a]">de A à Z</span>
          </>
        }
      >
        <p>Sites clients, projets personnels et démos : chaque projet dit clairement ce qu'il est.</p>
      </PageHeader>

      <Section>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {PROJETS.map((projet, index) => (
            <ProjectCard key={projet.slug} projet={projet} priority={index < 3} />
          ))}
        </div>
      </Section>

      <CallBanner
        title={
          <>
            Le prochain, <span className="accent !text-dune">c'est le vôtre ?</span>
          </>
        }
      />
    </>
  );
}
