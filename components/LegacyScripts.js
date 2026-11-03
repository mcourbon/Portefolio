"use client";

import { useEffect } from "react";

let started = false;

// Lance une seule fois les scripts des V1 et V2 (animations Three.js et interface), après l'affichage du HTML.
export default function LegacyScripts({ version }) {
  useEffect(() => {
    if (started) return;
    started = true;
    import("@/legacy/ui").then(({ initLegacyUI }) => initLegacyUI(version));
    import("@/legacy/main");
  }, [version]);

  return null;
}
