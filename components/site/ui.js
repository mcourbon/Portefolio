import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { Desert, Etoile, Ornement } from "@/components/site/desert";
import { RdvLink } from "@/components/site/RendezVous";

export function CallButton({ children = "Réserver un appel", className = "" }) {
  return (
    <RdvLink
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-terre px-7 py-3.5 text-center font-medium text-creme shadow-[0_8px_24px_-10px_rgba(143,61,29,0.7)] transition-colors hover:bg-terre-fonce ${className}`}
    >
      {children}
    </RdvLink>
  );
}

export function LinkButton({ href, children, clair = false, className = "" }) {
  const style = clair ? "border-creme/70 text-creme hover:bg-creme hover:text-brun" : "border-brun/40 text-brun hover:border-brun hover:bg-brun hover:text-creme";
  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-center font-medium transition-colors ${style} ${className}`}>
      {children}
    </Link>
  );
}

// En-tête de section centré : petit libellé, ornement, titre.
export function Titre({ label, children, intro, clair = false, className = "" }) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {label && <p className={`text-sm font-medium uppercase tracking-[0.25em] ${clair ? "text-or" : "text-terre"}`}>{label}</p>}
      <Ornement className="mt-4 justify-center" />
      <h2 className={`mt-5 font-titre text-4xl font-bold leading-tight sm:text-5xl ${clair ? "text-creme" : "text-brun"}`}>{children}</h2>
      {intro && <p className={`mx-auto mt-5 max-w-2xl text-lg leading-relaxed ${clair ? "text-sable/80" : "text-brun-doux"}`}>{intro}</p>}
    </div>
  );
}

export function Section({ id, className = "", motif = false, children }) {
  return (
    <section id={id} className={`relative ${motif ? "bg-sable-fonce/50" : ""} ${className}`}>
      {motif && <div aria-hidden="true" className="motif absolute inset-0 opacity-[0.12]" />}
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">{children}</div>
    </section>
  );
}

// Haut de page des pages intérieures : un ciel de fin de journée sur les dunes.
export function PageHeader({ label, title, children }) {
  return (
    <Desert className="pb-40 pt-16 sm:pb-52 sm:pt-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {label && <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#ffe1a6]">{label}</p>}
        <h1 className="mt-5 font-titre text-4xl font-bold leading-tight text-creme drop-shadow-[0_2px_12px_rgba(59,35,72,0.35)] sm:text-6xl">
          {title}
        </h1>
        {children && <div className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-creme/90">{children}</div>}
      </div>
    </Desert>
  );
}

// Une offre dans une arche : étoile en haut, nom, prix, contenu.
export function OfferCard({ offre, className = "" }) {
  return (
    <article
      id={offre.id}
      className={`arche-basse relative flex scroll-mt-24 flex-col border bg-creme px-7 pb-8 pt-20 text-center ${
        offre.featured ? "border-terre shadow-[0_20px_50px_-25px_rgba(143,61,29,0.6)]" : "border-or/50"
      } ${className}`}
    >
      <Etoile className={`absolute left-1/2 top-9 h-6 w-6 -translate-x-1/2 ${offre.featured ? "text-terre" : "text-or"}`} />
      {offre.featured && <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-terre">La plus demandée</p>}
      <h3 className="font-titre text-3xl font-bold">{offre.name}</h3>
      <p className="mt-2 font-titre text-2xl font-semibold text-terre">{offre.price}</p>
      <p className="mt-1 text-xs text-brun-doux">{offre.delay}</p>
      <p className="mt-5 text-sm leading-relaxed text-brun-doux">{offre.forWho}</p>
      <div className="mx-auto my-6 h-px w-16 bg-or/60" />
      {offre.intro && <p className="mb-3 text-left text-sm font-semibold">{offre.intro}</p>}
      <ul className="space-y-2.5 text-left text-sm leading-relaxed">
        {offre.items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Etoile className="mt-1 h-3 w-3 flex-shrink-0 text-or" />
            {item}
          </li>
        ))}
      </ul>
      {offre.note && <p className="mt-5 font-calli text-lg italic text-brun-doux">{offre.note}</p>}
    </article>
  );
}

// Un projet comme un tableau encadré : la capture d'abord, un cadre décalé derrière, le texte dessous.
export function ProjectCard({ projet, priority = false }) {
  return (
    <article className="group flex flex-col">
      <a href={projet.url} target="_blank" rel="noopener" className="relative mr-3 mb-3 block">
        <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-terre/45 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
        <span className="relative block overflow-hidden rounded-2xl border border-or/50 bg-sable-fonce shadow-[0_18px_40px_-24px_rgba(43,27,23,0.55)]">
        <Image
          src={projet.image}
          alt={`Page d'accueil du site ${projet.title}`}
          width={projet.width}
          height={projet.height}
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        </span>
      </a>
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-terre">{projet.kind}</p>
      <h3 className="mt-1.5 font-titre text-2xl font-bold">{projet.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brun-doux">{projet.text}</p>
      <a href={projet.url} target="_blank" rel="noopener" className="mt-4 self-start text-sm font-medium text-terre hover:underline">
        Voir le site ↗
      </a>
    </article>
  );
}

// Bandeau final, sous un ciel de nuit étoilé (la V2).
export function CallBanner({ title, children }) {
  return (
    <section className="ciel-nuit relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
        <Etoile className="mx-auto h-8 w-8 text-or" />
        <h2 className="mt-6 font-titre text-4xl font-bold leading-tight text-creme sm:text-5xl">
          {title ?? (
            <>
              On en parle <span className="accent !text-dune">vingt minutes</span> ?
            </>
          )}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sable/80">
          {children ??
            `Un appel de ${SITE.callLength}, gratuit. Vous me parlez de votre activité, je vous dis honnêtement ce dont vous avez besoin. Même si la réponse, c'est que vous n'avez pas besoin de moi.`}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CallButton>Choisir un créneau</CallButton>
          <LinkButton href="/contact" clair>Écrire un message</LinkButton>
        </div>
      </div>
    </section>
  );
}
