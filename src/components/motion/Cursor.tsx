"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Dot + lagging ring cursor. Elements with data-cursor="Label" expand the ring and show the label. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role=tab], summary");
      const text = t?.dataset.cursor ?? "";
      if (label.current) label.current.textContent = text;
      gsap.to(ring.current, {
        width: text ? 96 : t ? 58 : 34,
        height: text ? 96 : t ? 58 : 34,
        backgroundColor: text ? "rgba(225,1,59,0.92)" : t ? "rgba(225,1,59,0.12)" : "rgba(225,1,59,0)",
        borderColor: text ? "rgba(225,1,59,0)" : "rgba(255,255,255,0.45)",
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dot.current, { scale: t ? 0 : 1, duration: 0.25 });
    };

    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3, onComplete: () => void (shown = false) });
    const down = () => gsap.to(ring.current, { scale: 0.82, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.35 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block">
      <div ref={dot} className="fixed left-0 top-0 h-2 w-2 rounded-full bg-red-hot" />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/45"
      >
        <span ref={label} className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white" />
      </div>
    </div>
  );
}
