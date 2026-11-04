import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const JOURS = 21;
const jour = (date) => date.toISOString().slice(0, 10);

// Créneaux libres de l'appel découverte sur les trois prochaines semaines, lus chez Cal.com (heure de Paris).
export async function GET() {
  const debut = new Date();
  const fin = new Date(debut.getTime() + JOURS * 86400000);
  const url = `https://api.cal.com/v2/slots?eventTypeId=${SITE.rdvEventId}&start=${jour(debut)}&end=${jour(fin)}&timeZone=Europe/Paris`;

  try {
    const reponse = await fetch(url, { headers: { "cal-api-version": "2024-09-04" }, cache: "no-store" });
    if (!reponse.ok) throw new Error(`Cal.com ${reponse.status}`);
    const { data } = await reponse.json();
    const jours = Object.entries(data ?? {})
      .map(([date, creneaux]) => ({ date, creneaux: creneaux.map(({ start }) => start) }))
      .filter(({ creneaux }) => creneaux.length > 0);
    return Response.json({ jours }, { headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=40" } });
  } catch {
    return Response.json({ erreur: true }, { status: 502 });
  }
}
