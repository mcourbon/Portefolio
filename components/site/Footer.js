import Link from "next/link";
import { METIERS, NAV, SITE } from "@/lib/site";
import { Etoile } from "@/components/site/desert";
import VersionSwitcher from "@/components/site/VersionSwitcher";

export default function Footer() {
  return (
    <footer className="ciel-nuit relative overflow-hidden text-sable/80">
      <div className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="grid gap-10 border-t border-or/25 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="flex items-center gap-2.5 font-titre text-2xl font-bold text-creme">
              <Etoile className="h-5 w-5 text-or" />
              {SITE.name}
            </p>
            <p className="mt-3 max-w-sm leading-relaxed">
              Développeur web à {SITE.city}. Des sites clairs, rapides, et faits pour être trouvés.
            </p>
            <a href={`mailto:${SITE.email}`} className="mt-5 inline-block text-dune hover:text-creme">
              {SITE.email}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-or">Le site</p>
            <ul className="mt-4 space-y-2">
              {NAV.slice(1).map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-creme">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-or">Pour qui</p>
            <ul className="mt-4 space-y-2">
              {METIERS.map(({ href, title }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-creme">{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-12 flex flex-col gap-4 pb-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · <Link href="/mentions-legales" className="hover:text-creme">Mentions légales</Link> ·{" "}
            <a href={SITE.github} target="_blank" rel="noopener" className="hover:text-creme">GitHub</a>
          </p>
          <div className="flex items-center gap-3">
            <span>Les anciennes versions du site</span>
            <VersionSwitcher />
          </div>
        </div>
      </div>

      {/* Silhouette des dunes sous le ciel de nuit */}
      <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-16 w-full sm:h-24">
        <path d="M0,120 L0,70 C160,40 320,100 480,70 C640,40 800,20 960,50 C1120,80 1280,100 1440,60 L1440,120 Z" fill="#2a1c3f" />
        <path d="M0,120 L0,95 C100,80 220,50 340,60 C460,70 520,100 640,95 C760,90 820,60 940,58 C1060,55 1140,85 1260,92 C1340,96 1400,100 1440,96 L1440,120 Z" fill="#3a2440" />
      </svg>
    </footer>
  );
}
