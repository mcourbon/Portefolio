"use client";

import { useEffect, useRef } from "react";

// Grains de sable poussés par le vent au-dessus des dunes, repris de la V2 (canvas 2D léger).
// Taille prise sur le bloc parent, et rien n'est animé si le visiteur préfère réduire les animations.
export default function SableVolant({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let mobile = false;
    let frame;

    const resize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      mobile = window.matchMedia("(max-width: 768px)").matches;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const grain = (partout) => {
      const depth = Math.random();
      const speedScale = mobile ? 0.45 : 1;
      return {
        x: partout ? Math.random() * width : -20,
        y: height * ((mobile ? 0.7 : 0.55) + Math.random() * (mobile ? 0.28 : 0.42)),
        size: 0.6 + depth * 2.2,
        speed: (18 + depth * 55) * speedScale,
        phase: Math.random() * Math.PI * 2,
        drift: 0.5 + Math.random(),
        opacity: 0.15 + depth * 0.35,
      };
    };
    const grains = Array.from({ length: 70 }, () => grain(true));

    let last = performance.now();
    const draw = (now) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#fbf4e6";
      for (const g of grains) {
        g.x += g.speed * dt;
        g.y += Math.sin(now * 0.001 * g.drift + g.phase) * 0.3;
        if (g.x > width + 20) Object.assign(g, grain(false));
        ctx.globalAlpha = g.opacity;
        ctx.beginPath();
        ctx.ellipse(g.x, g.y, g.size, g.size * 0.4, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
