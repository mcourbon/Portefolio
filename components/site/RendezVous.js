"use client";

import { SITE } from "@/lib/site";

// Prise de rendez-vous Cal.com, ouverte par-dessus la page aux couleurs du site.
// Le script n'est chargé qu'au survol ou au premier contact d'un bouton, puis le calendrier est préchargé
// pour s'afficher vite au clic. Sans JavaScript, le lien mène à la page Cal.com.
const NAMESPACE = "appel-decouverte";
const CAL_LINK = new URL(SITE.rdv).pathname.slice(1);
const CONFIG = { layout: "month_view", theme: "light" };

let pret = false;

function preparer() {
  if (pret) return window.Cal.ns[NAMESPACE];
  pret = true;

  // Chargeur officiel de Cal.com : il met les appels en file d'attente jusqu'à l'arrivée du script.
  (function (C, A, L) {
    const p = (a, ar) => a.q.push(ar);
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  window.Cal("init", NAMESPACE, { origin: "https://cal.com" });
  const cal = window.Cal.ns[NAMESPACE];
  cal("ui", { cssVarsPerTheme: { light: { "cal-brand": "#b4532a" } }, hideEventTypeDetails: false, layout: "month_view" });
  cal("preload", { calLink: CAL_LINK });
  return cal;
}

export function RdvLink({ className = "", onOuvre, children }) {
  const ouvrir = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
    event.preventDefault();
    onOuvre?.();
    preparer()("modal", { calLink: CAL_LINK, config: CONFIG });
  };

  return (
    <a
      href={SITE.rdv}
      target="_blank"
      rel="noopener"
      onClick={ouvrir}
      onPointerEnter={preparer}
      onFocus={preparer}
      onTouchStart={preparer}
      className={className}
    >
      {children}
    </a>
  );
}
