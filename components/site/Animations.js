"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Animations du site, relancées à chaque page (même principe que La Villa du Rocher) :
// - le haut de page apparaît élément par élément, les dunes se lèvent et le soleil descend ;
// - au défilement, les dunes bougent à des vitesses différentes (parallaxe) ;
// - au défilement, quelques éléments seulement, chacun avec son animation (voir plus bas).
// Rien ne bouge si le visiteur a demandé à réduire les animations.
export default function Animations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const desert = document.querySelector("[data-desert]");
        if (desert) {
          const titre = desert.querySelectorAll("[data-desert-contenu] > div > *");
          gsap.fromTo(titre, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out", delay: 0.05 });
          gsap.from(desert.querySelectorAll('[data-dune="0"], [data-dune="1"]'), { yPercent: 35, duration: 1.4, stagger: 0.15, ease: "power3.out" });
          gsap.from(desert.querySelector("[data-soleil]"), { y: -70, opacity: 0, duration: 1.8, ease: "power2.out" });

          gsap
            .timeline({ scrollTrigger: { trigger: desert, start: "top top", end: "bottom top", scrub: true } })
            .to(desert.querySelector('[data-dune="0"]'), { yPercent: 22, ease: "none" }, 0)
            .to(desert.querySelector('[data-dune="1"]'), { yPercent: 10, ease: "none" }, 0)
            .to(desert.querySelector("[data-soleil]"), { y: 90, ease: "none" }, 0)
            .to(desert.querySelector("[data-desert-contenu]"), { y: 70, opacity: 0.25, ease: "none" }, 0);
        }

        // Peu d'éléments animés, chacun à sa façon, et seulement transform, opacity et clip-path (fluide même sur un petit téléphone).
        // Une fois l'entrée finie, on rend la main au CSS : sinon GSAP garde la position, la rotation et le zoom
        // en ligne et les effets au survol ne marchent plus.
        const RENDRE = "transform,translate,rotate,scale";
        const rendre = (cibles) => gsap.set(cibles, { clearProps: RENDRE });

        const auDefilement = (cible, vars, start = "top 85%") =>
          gsap.from(cible, { ...vars, scrollTrigger: { trigger: cible, start, once: true } });

        // Titres de section : un simple fondu qui monte.
        gsap.utils.toArray('main [data-anim="titre"]').forEach((titre) =>
          auDefilement(titre, { opacity: 0, y: 24, duration: 0.8, ease: "power2.out" }, "top 88%")
        );

        // Réalisations : la capture se dévoile de bas en haut en dézoomant, puis le cadre glisse derrière.
        gsap.utils.toArray('[data-anim="projet"]').forEach((projet) => {
          const image = projet.querySelector("[data-anim-image]");
          gsap
            .timeline({
              scrollTrigger: { trigger: projet, start: "top 85%", once: true },
              onComplete: () => rendre([image.querySelector("img"), projet.querySelector("[data-anim-cadre]")]),
            })
            .from(image, { clipPath: "inset(100% 0% 0% 0% round 1rem)", duration: 1.1, ease: "power3.inOut" })
            .from(image.querySelector("img"), { scale: 1.3, duration: 1.4, ease: "power3.out" }, 0)
            .from(projet.querySelector("[data-anim-cadre]"), { opacity: 0, x: -12, y: -12, duration: 0.7, ease: "power2.out" }, 0.6);
        });

        // Offres : les cartes montent ensemble, en léger décalé.
        // (On les cache d'abord, sinon elles seraient visibles un instant avant de démarrer.)
        gsap.set('[data-anim="offre"]', { opacity: 0, y: 70 });
        ScrollTrigger.batch('[data-anim="offre"]', {
          start: "top 88%",
          once: true,
          onEnter: (cartes) => gsap.to(cartes, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", clearProps: RENDRE }),
        });

        // Métiers : les étoiles arrivent en tournant, une par une.
        gsap.set('[data-anim="etoile"]', { opacity: 0, scale: 0.6 });
        gsap.set('[data-anim="etoile"] > svg', { rotation: -135 });
        ScrollTrigger.batch('[data-anim="etoile"]', {
          start: "top 88%",
          once: true,
          onEnter: (etoiles) => {
            gsap.to(etoiles, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "back.out(1.5)", clearProps: RENDRE });
            gsap.to(etoiles.map((etoile) => etoile.querySelector("svg")), { rotation: 0, duration: 1.2, stagger: 0.12, ease: "power3.out", clearProps: RENDRE });
          },
        });

        // Étapes : la ligne pointillée se dessine au fil du défilement, chaque étape apparaît en l'atteignant.
        gsap.utils.toArray('[data-anim="etapes"]').forEach((liste) => {
          const ligne = liste.querySelector("[data-anim-ligne]");
          if (ligne) {
            gsap.from(ligne, {
              scaleY: 0,
              transformOrigin: "top",
              ease: "none",
              scrollTrigger: { trigger: liste, start: "top 75%", end: "bottom 60%", scrub: true },
            });
          }
          liste.querySelectorAll(":scope > li").forEach((etape) =>
            auDefilement(etape, { opacity: 0, x: -24, duration: 0.7, ease: "power2.out" }, "top 82%")
          );
        });
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return null;
}
