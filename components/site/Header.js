"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Etoile } from "@/components/site/desert";
import VersionSwitcher from "@/components/site/VersionSwitcher";
import { RdvLink } from "@/components/site/RendezVous";

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Le menu mobile est rendu hors du <header> : le flou du header ferait de lui le repère du `fixed`.
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-or/30 bg-sable/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 font-titre text-xl font-bold">
            <Etoile className="h-5 w-5 text-terre" />
            {SITE.name}
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {NAV.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(pathname, href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[0.95rem] transition-colors ${
                  isActive(pathname, href) ? "bg-sable-fonce text-brun" : "text-brun-doux hover:text-brun"
                }`}
              >
                {label}
              </Link>
            ))}
            <RdvLink className="ml-3 rounded-full bg-terre px-5 py-2.5 text-sm font-medium text-creme transition-colors hover:bg-terre-fonce">
              Réserver un appel
            </RdvLink>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="rounded-full p-2 lg:hidden"
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <nav id="menu-mobile" aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 top-[61px] z-40 flex flex-col overflow-y-auto bg-sable px-6 pb-8 pt-6 lg:hidden">
          <div aria-hidden="true" className="motif absolute inset-0 opacity-[0.1]" />
          <div className="relative flex flex-col">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(pathname, href) ? "page" : undefined}
                className="flex items-center gap-4 border-b border-or/30 py-4 font-titre text-3xl font-bold"
              >
                <Etoile className={`h-3.5 w-3.5 ${isActive(pathname, href) ? "text-terre" : "text-or/50"}`} />
                {label}
              </Link>
            ))}
            <RdvLink onOuvre={() => setOpen(false)} className="mt-8 rounded-full bg-terre px-4 py-4 text-center text-lg font-medium text-creme">
              Réserver un appel de {SITE.callLength}
            </RdvLink>
            <div className="mt-8 flex items-center justify-between gap-3 text-sm text-brun-doux">
              <span>Anciennes versions</span>
              <VersionSwitcher />
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
