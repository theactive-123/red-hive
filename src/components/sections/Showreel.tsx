"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { caseGallery, covers } from "@/data/images";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** A full-width montage of product screens; columns drift at different speeds while scrolling. */
export default function Showreel() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        // Columns drift at different speeds (transform only, no pin, no clip-path repaint).
        const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo("[data-reel-col='0']", { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: st });
        gsap.fromTo("[data-reel-col='1']", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { ...st } });
        gsap.fromTo("[data-reel-col='2']", { yPercent: 10 }, { yPercent: -10, ease: "none", scrollTrigger: { ...st } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const cols = [
    [covers.sbh, caseGallery["stockflow-pro"][1], covers.chat],
    [covers.videeo, covers.stockflow, covers.flubr],
    [covers.printgraphi, caseGallery["videeo"][0], covers.spendshift],
  ];

  return (
    <section ref={root} className="theme-dark relative h-[100svh] overflow-hidden" aria-label="Product screens we've built">
      <div className="absolute inset-0 overflow-hidden bg-navy-2">
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4 md:gap-6 md:p-6">
          {cols.map((col, ci) => (
            <div key={ci} data-reel-col={ci} className="flex flex-col gap-4 will-change-transform md:gap-6">
              {col.map((t) => (
                <div key={t.src} className="relative aspect-[6/5] w-full shrink-0 overflow-hidden">
                  <Image src={t.src} alt={t.alt} fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="wrap flex flex-wrap items-end justify-between gap-6">
            <p className="display-lg max-w-[14ch]">Screens from projects we’ve shipped.</p>
            <p className="max-w-xs text-white/70">Streaming, printing, healthcare, retail, AI and finance. Designed and built in-house.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
