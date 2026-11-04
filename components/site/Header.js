"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { METIERS, NAV, SITE } from "@/lib/site";
import { Etoile } from "@/components/site/desert";
import VersionSwitcher from "@/components/site/VersionSwitcher";
import { RdvLink } from "@/components/site/RendezVous";

const isActive = (pathname, { href, actif }) => (href === "/" ? pathname === "/" : pathname.startsWith(actif ?? href));

// « Pour qui » sur ordinateur : la liste des pages métier s'ouvre au survol, au clic ou au clavier.
function MenuMetiers({ item, pathname }) {
  const [ouvert, setOuvert] = useState(false);
  const zone = useRef(null);
  const actif = isActive(pathname, item);

  useEffect(() => setOuvert(false), [pathname]);

  useEffect(() => {
    if (!ouvert) return;
    const fermer = (event) => {
      if (event.type === "keydown" ? event.key === "Escape" : !zone.current?.contains(event.target)) setOuvert(false);
    };
    document.addEventListener("pointerdown", fermer);
    document.addEventListener("keydown", fermer);
    return () => {
      document.removeEventListener("pointerdown", fermer);
      document.removeEventListener("keydown", fermer);
    };
  }, [ouvert]);

  return (
    <div ref={zone} className="relative" onMouseEnter={() => setOuvert(true)} onMouseLeave={() => setOuvert(false)}>
      <button
        type="button"
        aria-expanded={ouvert}
        aria-controls="menu-metiers"
        onClick={() => setOuvert(!ouvert)}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.95rem] transition-colors ${
          actif ? "bg-sable-fonce text-brun" : "text-brun-doux hover:text-brun"
        }`}
      >
        {item.label}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform ${ouvert ? "rotate-180" : ""}`}>
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {ouvert && (
        <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3">
          <ul id="menu-metiers" className="rounded-3xl border border-or/50 bg-creme p-2 shadow-[0_24px_50px_-24px_rgba(43,27,23,0.45)]">
            {METIERS.map(({ href, title, resume }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="group flex gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-sable"
                >
                  <Etoile className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-or transition-transform duration-500 group-hover:rotate-90 group-hover:text-terre" />
                  <span>
                    <span className="block font-titre text-lg font-bold leading-tight">{title}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-brun-doux">{resume}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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
            {NAV.slice(1).map((item) =>
              item.metiers ? (
                <MenuMetiers key={item.href} item={item} pathname={pathname} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.95rem] transition-colors ${
                    isActive(pathname, item) ? "bg-sable-fonce text-brun" : "text-brun-doux hover:text-brun"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
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
            {NAV.map((item) =>
              item.metiers ? (
                <div key={item.href} className="border-b border-or/30 py-4">
                  <p className="flex items-center gap-4 font-titre text-3xl font-bold">
                    <Etoile className={`h-3.5 w-3.5 ${isActive(pathname, item) ? "text-terre" : "text-or/50"}`} />
                    {item.label}
                  </p>
                  <ul className="mt-2 space-y-1 pl-[1.875rem]">
                    {METIERS.map(({ href, short }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          aria-current={pathname === href ? "page" : undefined}
                          className={`block py-1.5 text-lg ${pathname === href ? "font-medium text-terre" : "text-brun-doux"}`}
                        >
                          {short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item) ? "page" : undefined}
                  className="flex items-center gap-4 border-b border-or/30 py-4 font-titre text-3xl font-bold"
                >
                  <Etoile className={`h-3.5 w-3.5 ${isActive(pathname, item) ? "text-terre" : "text-or/50"}`} />
                  {item.label}
                </Link>
              )
            )}
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
