import Link from "next/link";
import { METIERS } from "@/lib/site";

// Contour de l'étoile à huit branches (deux carrés croisés), centrée sur 0 dans un carré de 200.
const ETOILE = "98,0 69.3,28.7 69.3,69.3 28.7,69.3 0,98 -28.7,69.3 -69.3,69.3 -69.3,28.7 -98,0 -69.3,-28.7 -69.3,-69.3 -28.7,-69.3 0,-98 28.7,-69.3 69.3,-69.3 69.3,-28.7";

// Les métiers dans des étoiles aux couleurs du couchant, qui tournent au survol (accueil et page « Pour qui »).
// `titre` : la balise du nom de métier, selon le niveau de titre de la page (h2 ou h3).
export default function EtoilesMetiers({ titre: Titre = "h3", className = "" }) {
  return (
    <div className={`mx-auto grid max-w-3xl justify-items-center gap-4 sm:grid-cols-2 ${className}`}>
      {METIERS.map(({ href, title, resume }) => (
        <Link key={href} href={href} data-anim="etoile" className="group relative flex aspect-square w-full max-w-[22rem] items-center justify-center">
          <svg
            viewBox="-100 -100 200 200"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full drop-shadow-[0_18px_30px_rgba(143,61,29,0.35)] transition-[rotate] duration-700 ease-out group-hover:rotate-90 group-focus-visible:rotate-90"
          >
            <defs>
              {/* Les couleurs du coucher de soleil, comme le ciel en haut de page. */}
              <linearGradient id="etoile-ciel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5a2a44" />
                <stop offset="55%" stopColor="#8f3d1d" />
                <stop offset="100%" stopColor="#b4532a" />
              </linearGradient>
            </defs>
            <polygon points={ETOILE} fill="url(#etoile-ciel)" stroke="#c8963e" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="relative w-[62%] text-center">
            <Titre className="font-titre text-2xl font-bold leading-tight text-creme sm:text-[1.7rem]">{title}</Titre>
            <p className="mt-2 text-sm leading-snug text-creme/85">{resume}</p>
            <p className="mt-3 text-sm font-medium text-[#ffd59a]">
              Découvrir <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
