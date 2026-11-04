import { SITE } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Réserve l'appel découverte chez Cal.com, qui gère l'agenda Google, le lien Meet et les e-mails de confirmation.
export async function POST(request) {
  const corps = await request.json().catch(() => null);
  if (!corps) return Response.json({ erreur: "Demande invalide." }, { status: 400 });

  // Champ piège invisible : un humain le laisse vide.
  if (corps.siteweb) return Response.json({ ok: true });

  const nom = String(corps.nom ?? "").trim().slice(0, 100);
  const email = String(corps.email ?? "").trim().slice(0, 200);
  const message = String(corps.message ?? "").trim().slice(0, 1000);
  const debut = new Date(corps.debut);

  if (!nom || !EMAIL.test(email) || Number.isNaN(debut.getTime()) || debut < new Date()) {
    return Response.json({ erreur: "Vérifiez votre nom, votre e-mail et le créneau choisi." }, { status: 400 });
  }

  try {
    const reponse = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: { "cal-api-version": "2024-08-13", "Content-Type": "application/json" },
      body: JSON.stringify({
        start: debut.toISOString(),
        eventTypeId: SITE.rdvEventId,
        attendee: { name: nom, email, timeZone: "Europe/Paris", language: "fr" },
        ...(message && { bookingFieldsResponses: { notes: message } }),
      }),
      cache: "no-store",
    });
    const resultat = await reponse.json().catch(() => null);
    if (!reponse.ok || resultat?.status !== "success") {
      console.error("Réservation Cal.com refusée", reponse.status, JSON.stringify(resultat?.error ?? resultat));
      const pris = reponse.status === 409 || /no longer available|already|unavailable/i.test(JSON.stringify(resultat ?? ""));
      return Response.json(
        { erreur: pris ? "Ce créneau vient d'être pris. Choisissez-en un autre." : "La réservation n'a pas pu aboutir." },
        { status: pris ? 409 : 502 }
      );
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ erreur: "La réservation n'a pas pu aboutir." }, { status: 502 });
  }
}
