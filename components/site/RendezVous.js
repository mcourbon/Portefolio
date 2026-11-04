"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SITE } from "@/lib/site";
import { Etoile } from "@/components/site/desert";

// Prise de rendez-vous maison, aux couleurs du site : les créneaux et la réservation passent par Cal.com
// (via /api/creneaux et /api/reservation), qui gère l'agenda Google, le lien Meet et les e-mails.
// Les créneaux sont demandés dès le survol du bouton, pour s'afficher tout de suite au clic.
// Sans JavaScript, ou si Cal.com ne répond pas, on renvoie vers la page Cal.com.

let demande = null;
let depuis = 0;

function chargerCreneaux() {
  // Les créneaux sont gardés une minute, puis redemandés.
  if (!demande || Date.now() - depuis > 60000) {
    depuis = Date.now();
    demande = fetch("/api/creneaux")
      .then((reponse) => (reponse.ok ? reponse.json() : Promise.reject()))
      .then(({ jours }) => jours)
      .catch((erreur) => {
        demande = null;
        throw erreur;
      });
  }
  return demande;
}

const prechargement = () => chargerCreneaux().catch(() => {});

const PARIS = { timeZone: "Europe/Paris" };
const heure = (iso) => new Date(iso).toLocaleTimeString("fr-FR", { ...PARIS, hour: "2-digit", minute: "2-digit" });
const jourCourt = (date) => {
  const d = new Date(`${date}T12:00:00`);
  return {
    semaine: d.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", ""),
    numero: d.getDate(),
    mois: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
  };
};
const jourLong = (iso) =>
  new Date(iso).toLocaleDateString("fr-FR", { ...PARIS, weekday: "long", day: "numeric", month: "long" });

const champ =
  "mt-1.5 w-full rounded-2xl border border-or/50 bg-white/70 px-4 py-3 text-brun placeholder:text-brun-doux/60 focus:border-terre focus:outline-none focus:ring-2 focus:ring-terre/20";

function Fenetre({ fermer }) {
  const [jours, setJours] = useState(null);
  const [erreur, setErreur] = useState(false);
  const [jour, setJour] = useState(null);
  const [creneau, setCreneau] = useState(null);
  const [envoi, setEnvoi] = useState("attente"); // attente, envoi, fait
  const [message, setMessage] = useState("");
  const boite = useRef(null);

  const charger = () => {
    setErreur(false);
    chargerCreneaux()
      .then((liste) => {
        setJours(liste);
        setJour((actuel) => actuel ?? liste[0]?.date ?? null);
      })
      .catch(() => setErreur(true));
  };

  useEffect(charger, []);

  useEffect(() => {
    const precedent = document.activeElement;
    boite.current?.focus();
    const touche = (event) => event.key === "Escape" && fermer();
    document.addEventListener("keydown", touche);
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", touche);
      document.body.style.overflow = defilement;
      precedent?.focus?.();
    };
  }, [fermer]);

  const reserver = async (event) => {
    event.preventDefault();
    const donnees = Object.fromEntries(new FormData(event.currentTarget));
    setEnvoi("envoi");
    setMessage("");
    try {
      const reponse = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...donnees, debut: creneau }),
      });
      const resultat = await reponse.json().catch(() => ({}));
      if (!reponse.ok) {
        setEnvoi("attente");
        setMessage(resultat.erreur ?? "La réservation n'a pas pu aboutir.");
        if (reponse.status === 409) {
          demande = null;
          setCreneau(null);
          charger();
        }
        return;
      }
      demande = null;
      setEnvoi("fait");
    } catch {
      setEnvoi("attente");
      setMessage("La réservation n'a pas pu aboutir. Vérifiez votre connexion et réessayez.");
    }
  };

  const creneauxDuJour = jours?.find((j) => j.date === jour)?.creneaux ?? [];

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-brun/50 backdrop-blur-sm sm:items-center sm:p-6" onClick={fermer}>
      <div
        ref={boite}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rdv-titre"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-or/50 bg-creme shadow-[0_30px_80px_-30px_rgba(43,27,23,0.7)] outline-none sm:rounded-3xl"
      >
        <div aria-hidden="true" className="motif pointer-events-none absolute inset-x-0 top-0 h-28 opacity-[0.1]" />
        <button
          type="button"
          onClick={fermer}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-brun-doux transition-colors hover:bg-sable hover:text-brun"
        >
          <span className="sr-only">Fermer</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative px-6 pb-8 pt-8 sm:px-9">
          <div className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.2em] text-terre">
            <Etoile className="h-3.5 w-3.5" />
            Appel découverte
          </div>
          <h2 id="rdv-titre" className="mt-3 pr-10 font-titre text-3xl font-bold leading-tight sm:text-4xl">
            {envoi === "fait" ? (
              <>
                C'est <span className="accent">noté !</span>
              </>
            ) : creneau ? (
              "Vos coordonnées"
            ) : (
              <>
                Choisissez <span className="accent">un créneau</span>
              </>
            )}
          </h2>
          <p className="mt-2 text-sm text-brun-doux">
            {SITE.callLength} en visio Google Meet · gratuit et sans engagement · heure de Paris
          </p>

          {envoi === "fait" ? (
            <div className="mt-8">
              <p className="text-lg leading-relaxed">
                Rendez-vous le <strong>{jourLong(creneau)}</strong> à <strong>{heure(creneau)}</strong>.
              </p>
              <p className="mt-3 leading-relaxed text-brun-doux">
                Vous allez recevoir un e-mail de confirmation avec le lien de l'appel. Vous pourrez y déplacer ou annuler le
                rendez-vous si besoin. À bientôt !
              </p>
              <button type="button" onClick={fermer} className="mt-8 rounded-full bg-terre px-7 py-3.5 font-medium text-creme transition-colors hover:bg-terre-fonce">
                Fermer
              </button>
            </div>
          ) : erreur ? (
            <div className="mt-8 rounded-2xl border border-or/50 bg-sable/60 p-6">
              <p className="leading-relaxed">Les créneaux n'ont pas pu se charger.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={charger} className="rounded-full bg-terre px-5 py-2.5 text-sm font-medium text-creme hover:bg-terre-fonce">
                  Réessayer
                </button>
                <a href={SITE.rdv} target="_blank" rel="noopener" className="rounded-full border border-brun/40 px-5 py-2.5 text-sm font-medium hover:bg-brun hover:text-creme">
                  Réserver sur Cal.com
                </a>
              </div>
            </div>
          ) : !jours ? (
            <div className="mt-8 space-y-4" aria-busy="true" aria-label="Chargement des créneaux">
              <div className="flex gap-2.5 overflow-hidden">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="h-[4.5rem] w-16 flex-shrink-0 animate-pulse rounded-2xl bg-sable-fonce/60" />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="h-12 animate-pulse rounded-full bg-sable-fonce/60" />
                ))}
              </div>
            </div>
          ) : jours.length === 0 ? (
            <p className="mt-8 leading-relaxed">
              Plus aucun créneau libre ces trois prochaines semaines. Écrivez-moi depuis la{" "}
              <a href="/contact" className="font-medium text-terre underline">page contact</a>, je vous réponds sous 48 heures.
            </p>
          ) : !creneau ? (
            <>
              <div className="-mx-6 mt-7 flex gap-2.5 overflow-x-auto px-6 pb-2 sm:-mx-9 sm:px-9" role="listbox" aria-label="Jour">
                {jours.map(({ date }) => {
                  const { semaine, numero, mois } = jourCourt(date);
                  const actif = date === jour;
                  return (
                    <button
                      key={date}
                      type="button"
                      role="option"
                      aria-selected={actif}
                      onClick={() => setJour(date)}
                      className={`flex w-16 flex-shrink-0 flex-col items-center rounded-2xl border py-2.5 transition-colors ${
                        actif ? "border-terre bg-terre text-creme" : "border-or/50 bg-white/50 hover:border-terre"
                      }`}
                    >
                      <span className={`text-xs uppercase ${actif ? "text-creme/80" : "text-brun-doux"}`}>{semaine}</span>
                      <span className="font-titre text-2xl font-bold leading-tight">{numero}</span>
                      <span className={`text-xs ${actif ? "text-creme/80" : "text-brun-doux"}`}>{mois}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {creneauxDuJour.map((debut) => (
                  <button
                    key={debut}
                    type="button"
                    onClick={() => setCreneau(debut)}
                    className="rounded-full border border-or/60 bg-white/50 py-3 font-medium transition-colors hover:border-terre hover:bg-terre hover:text-creme"
                  >
                    {heure(debut)}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={reserver} className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-sable/70 px-5 py-4">
                <p>
                  <span className="inline-block first-letter:uppercase">{jourLong(creneau)}</span> à <strong>{heure(creneau)}</strong>
                </p>
                <button type="button" onClick={() => setCreneau(null)} className="text-sm font-medium text-terre hover:underline">
                  Changer
                </button>
              </div>
              <div className="mt-6 space-y-5">
                <label className="block">
                  <span className="text-sm font-medium">Nom</span>
                  <input type="text" name="nom" required autoComplete="name" className={champ} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">E-mail</span>
                  <input type="email" name="email" required autoComplete="email" className={champ} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Votre activité, et votre site si vous en avez un</span>
                  <textarea name="message" rows={3} className={champ} placeholder="Ex. : sophrologue à Villeurbanne, pas encore de site" />
                </label>
                <input type="text" name="siteweb" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              </div>
              {envoi === "envoi" && (
                <p aria-live="polite" className="sr-only">
                  Réservation en cours, merci de patienter.
                </p>
              )}
              {message && <p role="alert" className="mt-5 rounded-2xl bg-terre/10 px-4 py-3 text-sm text-terre-fonce">{message}</p>}
              <button
                type="submit"
                disabled={envoi === "envoi"}
                className="mt-6 w-full rounded-full bg-terre px-6 py-4 font-medium text-creme transition-colors hover:bg-terre-fonce disabled:opacity-60"
              >
                {envoi === "envoi" ? (
                  <span className="inline-flex items-center justify-center gap-3">
                    <Etoile className="h-5 w-5 animate-spin [animation-duration:1.4s]" />
                    Réservation en cours…
                  </span>
                ) : (
                  "Confirmer le rendez-vous"
                )}
              </button>
              <p className="mt-4 text-center text-xs leading-relaxed text-brun-doux">
                La réservation passe par Cal.com. Voir les{" "}
                <a href="/mentions-legales#donnees" className="underline">mentions légales</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// Une seule fenêtre pour tout le site, placée dans le layout : les boutons l'ouvrent par un événement.
// Elle ne disparaît donc pas quand le bouton qui l'a ouverte disparaît (menu mobile qui se ferme, par exemple).
export default function RendezVous() {
  const [ouvert, setOuvert] = useState(false);
  const fermer = useCallback(() => setOuvert(false), []);

  useEffect(() => {
    const ouvrir = () => setOuvert(true);
    window.addEventListener("rendez-vous", ouvrir);
    return () => window.removeEventListener("rendez-vous", ouvrir);
  }, []);

  return ouvert ? <Fenetre fermer={fermer} /> : null;
}

export function RdvLink({ className = "", onOuvre, children }) {
  const ouvrir = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
    event.preventDefault();
    onOuvre?.();
    window.dispatchEvent(new Event("rendez-vous"));
  };

  return (
    <a
      href={SITE.rdv}
      target="_blank"
      rel="noopener"
      onClick={ouvrir}
      onPointerEnter={prechargement}
      onFocus={prechargement}
      onTouchStart={prechargement}
      className={className}
    >
      {children}
    </a>
  );
}
