import { LEGAL, SITE } from "@/lib/site";
import { PageHeader, Section } from "@/components/site/ui";

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales et données personnelles du site marcantoinecourbon.dev.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <>
      <PageHeader label="Informations" title="Mentions légales" />
      <Section>
        <div className="prose prose-site mx-auto max-w-3xl">
          <h2>Éditeur du site</h2>
          <p>
            {SITE.name}, {LEGAL.status.toLowerCase()}
            <br />
            {LEGAL.address}
            {LEGAL.siret && (
              <>
                <br />
                SIRET : {LEGAL.siret}
              </>
            )}
            <br />
            E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p>Directeur de la publication : {SITE.name}.</p>

          <h2>Hébergement</h2>
          <p>
            {LEGAL.host.name}, {LEGAL.host.address}. <a href={LEGAL.host.url}>{LEGAL.host.url.replace("https://", "")}</a>
          </p>

          <h2 id="donnees">Données personnelles</h2>
          <p>
            Ce site ne dépose aucun cookie de mesure d'audience ni de publicité. Le formulaire de contact transmet votre
            nom, votre e-mail et votre message par le service FormSubmit, uniquement pour vous répondre. Ces messages
            sont conservés dans ma boîte mail le temps de notre échange, puis au plus 3 ans.
          </p>
          <p>
            La prise de rendez-vous se fait sur Cal.com, qui applique sa propre politique de confidentialité.
          </p>
          <p>
            Vous pouvez demander l'accès, la rectification ou la suppression de vos données en m'écrivant à{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Vous pouvez aussi adresser une réclamation à la CNIL.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes et le code de ce site sont la propriété de {SITE.name}. Les captures des sites présentés dans les
            réalisations appartiennent à leurs propriétaires respectifs.
          </p>
        </div>
      </Section>
    </>
  );
}
