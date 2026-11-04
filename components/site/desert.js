import SableVolant from "@/components/site/SableVolant";

// Étoile à huit branches (deux carrés croisés), l'ornement du site.
export function Etoile({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="5" y="5" width="14" height="14" fill="currentColor" />
      <rect x="5" y="5" width="14" height="14" fill="currentColor" transform="rotate(45 12 12)" />
    </svg>
  );
}

// Séparateur : un filet, une étoile, un filet.
export function Ornement({ className = "" }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 text-or ${className}`}>
      <span className="h-px w-10 bg-current" />
      <Etoile className="h-3.5 w-3.5" />
      <span className="h-px w-10 bg-current" />
    </div>
  );
}

// Les trois dunes de la V2. La dernière prend la couleur de ce qui suit, pour que le ciel coule dans la page.
export function Dunes({ suite = "var(--color-sable)", className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 -bottom-px h-[42%] overflow-hidden ${className}`}>
      <svg data-dune="0" viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-0 left-[-8%] h-[100%] w-[116%]">
        <path d="M0,400 L0,260 C120,230 240,200 360,210 C480,220 600,260 720,250 C840,240 960,190 1080,195 C1200,200 1320,230 1440,215 L1440,400 Z" fill="#8a4a35" />
      </svg>
      <svg data-dune="1" viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-0 left-[-8%] h-[80%] w-[116%]">
        <path d="M0,400 L0,300 C160,260 320,340 480,300 C640,260 800,220 960,260 C1120,300 1280,340 1440,290 L1440,400 Z" fill="#d48a50" />
      </svg>
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-0 left-[-8%] h-[62%] w-[116%]">
        <path d="M0,400 L0,340 C100,300 220,220 340,240 C460,260 520,340 640,330 C760,320 820,240 940,230 C1060,220 1140,300 1260,320 C1340,335 1400,350 1440,340 L1440,400 Z" fill={suite} />
      </svg>
    </div>
  );
}

// Ciel de fin de journée, soleil bas, dunes et sable qui vole. `children` se place au-dessus.
export function Desert({ children, className = "", suite }) {
  return (
    <div data-desert className={`relative isolate overflow-x-clip ${className}`}>
      {/* Le décor est coupé à la taille du désert (le soleil et sa lueur ne débordent pas sur la suite). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#3b2348_0%,#8c3f45_30%,#d8703f_58%,#f2b36a_78%,#f6d39a_100%)]" />
        <div data-soleil className="absolute bottom-[20%] left-[86%] h-24 w-24 sm:left-[72%] sm:bottom-[22%] sm:h-40 sm:w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#ffe1a6] opacity-90 shadow-[0_0_100px_50px_rgba(255,206,130,0.5)] lg:h-52 lg:w-52" />
        <Dunes suite={suite} />
        <SableVolant />
      </div>
      {/* Bande pleine qui dépasse sous le désert : sur certains téléphones, l'arrondi des pixels laissait voir une ligne sombre
          à la jonction. Elle est hors du décor coupé, donc elle recouvre cette jonction. */}
      <div aria-hidden="true" className="absolute inset-x-0 -bottom-1 -z-10 h-3" style={{ background: suite ?? "var(--color-sable)" }} />
      <div data-desert-contenu className="relative w-full">
        {children}
      </div>
    </div>
  );
}
