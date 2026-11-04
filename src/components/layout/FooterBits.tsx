"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Giant wordmark: letters rise in when the footer comes into view; each fills red on hover. */
export function Wordmark({ text = "RED HIVE" }: { text?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-letter]", {
        yPercent: 100,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} aria-hidden className="flex select-none justify-between overflow-hidden font-display text-[21vw] font-extrabold leading-[0.78] tracking-[-0.05em] md:text-[19vw]">
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-[0.2em]" />
        ) : (
          <span
            key={i}
            data-letter
            className="inline-block text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.28)] hover:text-red hover:[-webkit-text-stroke:1.5px_#e1013b]"
          >
            {ch}
          </span>
        ),
      )}
    </p>
  );
}

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-3 text-sm font-semibold"
    >
      Back to top
      <span className="grid h-10 w-10 place-items-center bg-white/10 transition-colors group-hover:bg-red">
        <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden>
          <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </button>
  );
}
