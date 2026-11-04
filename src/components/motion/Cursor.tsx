"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Small blend-mode dot; grows into a labelled red disc over [data-cursor] elements. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    let mode = "";

    const move = (e: PointerEvent) => {
      gsap.to(el, { opacity: 1, duration: 0.2, overwrite: "auto" });
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, summary, [role=tab]");
      const next = labelled ? "label" : link ? "link" : "";
      if (next === mode && (!labelled || label.current?.textContent === labelled.dataset.cursor)) return;
      mode = next;
      if (label.current) label.current.textContent = labelled?.dataset.cursor ?? "";
      gsap.to(el, {
        width: labelled ? 92 : link ? 44 : 10,
        height: labelled ? 92 : link ? 44 : 10,
        backgroundColor: labelled ? "#e1013b" : "#ffffff",
        mixBlendMode: labelled ? "normal" : "difference",
        duration: 0.45,
        ease: "expo.out",
      });
      gsap.to(label.current, { opacity: labelled ? 1 : 0, duration: 0.25 });
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });

    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    html.addEventListener("pointerleave", leave);
    return () => {
      html.classList.remove("has-cursor");
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      html.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-2.5 w-2.5 items-center justify-center rounded-full bg-white mix-blend-difference [@media(pointer:fine)]:flex"
    >
      <span ref={label} className="text-[12px] font-medium text-white opacity-0" />
    </div>
  );
}
