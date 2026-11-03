import { LinkButton, PageHeader } from "@/components/site/ui";

export const metadata = {
  title: "Message envoyé",
  robots: { index: false },
};

export default function Merci() {
  return (
    <PageHeader label="Message envoyé" title="Merci, j'ai bien reçu votre message">
      <p>Je vous réponds sous 48 heures, par e-mail.</p>
      <LinkButton href="/" className="mt-8">Retour à l'accueil</LinkButton>
    </PageHeader>
  );
}
