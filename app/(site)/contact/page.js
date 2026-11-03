import { SITE } from "@/lib/site";
import { CallButton, PageHeader, Section } from "@/components/site/ui";
import { Etoile } from "@/components/site/desert";

export const metadata = {
  title: "Contact",
  description: `Réservez un appel découverte de ${SITE.callLength} ou envoyez-moi un message pour parler de votre site.`,
  alternates: { canonical: "/contact" },
};

const champ =
  "mt-1.5 w-full rounded-2xl border border-or/50 bg-creme px-4 py-3 text-brun placeholder:text-brun-doux/60 focus:border-terre focus:outline-none focus:ring-2 focus:ring-terre/20";

export default function Contact() {
  return (
    <>
      <PageHeader
        label="Contact"
        title={
          <>
            Parlons de <span className="accent !text-[#ffd59a]">votre site</span>
          </>
        }
      >
        <p>Le plus simple, c'est un appel. Mais si vous préférez écrire, je réponds sous 48 heures.</p>
      </PageHeader>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div className="ciel-nuit self-start rounded-3xl px-8 py-12 text-center text-sable sm:px-10">
            <Etoile className="mx-auto h-7 w-7 text-or" />
            <h2 className="mt-5 font-titre text-4xl font-bold text-creme">Un appel de {SITE.callLength}</h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-sable/80">
              Gratuit et sans engagement. Vous me parlez de votre activité, je vous dis ce que je ferais et combien ça
              coûterait. Choisissez le créneau qui vous arrange.
            </p>
            <CallButton className="mt-8">Choisir un créneau</CallButton>
          </div>

          <form action={`https://formsubmit.co/${SITE.email}`} method="POST" className="rounded-3xl border border-or/50 bg-creme px-7 py-10 shadow-[0_20px_50px_-30px_rgba(143,61,29,0.5)] sm:px-10">
            <h2 className="text-center font-titre text-3xl font-bold">Vous préférez écrire ?</h2>
            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-medium">Nom</span>
                <input type="text" name="name" required autoComplete="name" className={champ} />
              </label>
              <label className="block">
                <span className="text-sm font-medium">E-mail</span>
                <input type="email" name="email" required autoComplete="email" className={champ} />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Votre activité et votre projet</span>
                <textarea name="message" rows={5} required className={champ} />
              </label>
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nouveau message depuis marcantoinecourbon.dev" />
              <input type="hidden" name="_next" value={`${SITE.url}/contact/merci`} />
            </div>
            <button type="submit" className="mt-7 w-full rounded-full bg-terre px-6 py-3.5 font-medium text-creme transition-colors hover:bg-terre-fonce">
              Envoyer le message
            </button>
            <p className="mt-4 text-center text-xs leading-relaxed text-brun-doux">
              Vos informations servent uniquement à vous répondre. Voir les{" "}
              <a href="/mentions-legales#donnees" className="underline">mentions légales</a>.
            </p>
          </form>
        </div>
      </Section>
    </>
  );
}
