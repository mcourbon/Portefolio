import Link from "next/link";
import { SITE, METIERS } from "@/lib/site";
import { OFFRES, SUIVIS, ETAPES } from "@/lib/offres";
import { PROJETS } from "@/lib/projets";
import { formatDate, getPosts } from "@/lib/blog";
import { CallBanner, CallButton, LinkButton, OfferCard, ProjectCard, Section, Titre } from "@/components/site/ui";
import { Desert, Etoile } from "@/components/site/desert";

export const metadata = {
  title: { absolute: `Création de site internet à Lyon · ${SITE.name}` },
  alternates: { canonical: "/" },
};

const CONSTATS = [
  {
    title: "On vous cherche, on trouve les autres",
    text: "Vos futurs clients tapent votre métier et votre ville sur Google. Si vous n'apparaissez pas, ils appellent quelqu'un d'autre.",
  },
  {
    title: "Votre site ne vous ressemble plus",
    text: "Daté, lent, illisible sur téléphone : il fait fuir avant le premier contact. Ou alors il n'y a pas de site du tout.",
  },
  {
    title: "Vous n'avez pas le temps",
    text: "Votre métier, c'est soigner, construire, conseiller. Pas passer vos soirées sur Wix. Je m'occupe de tout, vous validez.",
  },
];


export default async function Home() {
  const posts = (await getPosts()).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    areaServed: "France",
    address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "FR" },
    founder: { "@type": "Person", name: SITE.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Desert className="flex min-h-[calc(100svh-61px)] items-start pb-44 pt-16 sm:pt-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#ffe1a6]">Développeur web à {SITE.city}</p>
          <h1 className="mt-6 font-titre text-5xl font-bold leading-[1.05] text-creme drop-shadow-[0_2px_14px_rgba(59,35,72,0.4)] sm:text-7xl">
            Votre métier, ce n'est pas internet. <span className="accent !text-[#ffd59a]">Le mien, si.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-creme/90 sm:text-xl">
            Je suis Marc-Antoine. Je crée des sites sur mesure pour les indépendants : thérapeutes, artistes,
            photographes, artisans. Des sites clairs, rapides, et construits pour qu'on vous trouve sur Google.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CallButton>Réserver un appel gratuit</CallButton>
            <LinkButton href="/offres" clair>Voir les prix</LinkButton>
          </div>
          <p className="mt-5 text-sm font-medium text-brun/75">Premier appel de {SITE.callLength}, offert et sans engagement</p>
        </div>
      </Desert>

      <Section>
        <Titre label="Le constat">
          Vous êtes bon dans votre métier. Encore faut-il qu'on <span className="accent">vous trouve.</span>
        </Titre>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-or/40">
          {CONSTATS.map(({ title, text }) => (
            <div key={title} className="text-center md:px-8">
              <Etoile className="mx-auto h-6 w-6 text-terre" />
              <h3 className="mt-4 font-titre text-2xl font-bold leading-snug">{title}</h3>
              <p className="mt-3 leading-relaxed text-brun-doux">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section motif>
        <Titre label="Pour qui">Des sites pensés pour votre métier</Titre>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {METIERS.map(({ href, short, text }) => (
            <Link key={href} href={href} className="group rounded-3xl border border-or/50 bg-creme p-8 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(143,61,29,0.55)]">
              <h3 className="font-titre text-3xl font-bold">{short}</h3>
              <p className="mt-3 leading-relaxed text-brun-doux">{text}</p>
              <p className="mt-5 font-medium text-terre">
                Ce que je propose <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <Titre label="Réalisations">
          Des sites <span className="accent">en ligne</span>, pas des maquettes
        </Titre>
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {PROJETS.slice(0, 3).map((projet) => (
            <ProjectCard key={projet.slug} projet={projet} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <LinkButton href="/realisations">Toutes les réalisations</LinkButton>
        </div>
      </Section>

      <Section motif>
        <Titre label="Les offres" intro="Pas de devis mystère : vous savez ce que ça coûte avant même de m'appeler.">
          Des prix <span className="accent">affichés</span>
        </Titre>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {OFFRES.map((offre) => (
            <OfferCard key={offre.id} offre={offre} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center leading-relaxed text-brun-doux">
          Et après la mise en ligne, la formule <strong className="text-brun">{SUIVIS[0].name}</strong> à {SUIVIS[0].price} garde votre
          site et votre fiche Google à jour.{" "}
          <Link href="/offres" className="font-medium text-terre hover:underline">Toutes les offres</Link>
        </p>
      </Section>

      <Section>
        <Titre label="Comment ça se passe">
          Vous validez <span className="accent">à chaque étape</span>
        </Titre>
        <ol className="relative mx-auto mt-14 max-w-3xl">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 border-l-2 border-dashed border-or/60" />
          {ETAPES.map(({ title, text }, index) => (
            <li key={title} className="relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center">
                <Etoile className="absolute inset-0 h-12 w-12 text-sable-fonce" />
                <span className="relative font-titre text-lg font-bold text-terre">{index + 1}</span>
              </span>
              <div className="pt-2">
                <h3 className="font-titre text-2xl font-bold">{title}</h3>
                <p className="mt-1 leading-relaxed text-brun-doux">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {posts.length > 0 && (
        <Section motif>
          <Titre label="Le blog">Des réponses honnêtes à vos questions</Titre>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-3xl border border-or/50 bg-creme p-8 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(143,61,29,0.55)]">
                <p className="text-sm text-brun-doux">{formatDate(post.date)}</p>
                <h3 className="mt-2 font-titre text-3xl font-bold group-hover:text-terre">{post.title}</h3>
                <p className="mt-3 leading-relaxed text-brun-doux">{post.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CallBanner />
    </>
  );
}
