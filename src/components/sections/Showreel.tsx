"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { studio } from "@/data/images";
import type { CaseStudy } from "@/data/work";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** A montage of product screens that grows to full width while you scroll past it. */
export default function Showreel({ shots }: { shots: CaseStudy[] }) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=120%", pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        tl.fromTo(frame.current, { scale: 0.62, "--cut": "60px" }, { scale: 1, "--cut": "0px", ease: "none" })
          .fromTo("[data-reel-col='0']", { yPercent: 12 }, { yPercent: -6, ease: "none" }, 0)
          .fromTo("[data-reel-col='1']", { yPercent: -10 }, { yPercent: 8, ease: "none" }, 0)
          .fromTo("[data-reel-col='2']", { yPercent: 16 }, { yPercent: -10, ease: "none" }, 0)
          .fromTo("[data-reel-caption]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, 0.55);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  type Tile = { kind: "shot"; p: CaseStudy } | { kind: "photo"; src: string; alt: string };
  const P = (x: { src: string; alt: string }): Tile => ({ kind: "photo", ...x });
  const S = (p: CaseStudy): Tile => ({ kind: "shot", p });
  const cols: Tile[][] = [
    [S(shots[0]), P(studio.trading), S(shots[3])],
    [P(studio.ui), S(shots[2]), P(studio.sketch)],
    [S(shots[1]), P(studio.travel), S(shots[4])],
  ];

  return (
    <section ref={root} className="theme-dark relative h-[100svh] overflow-hidden" aria-label="Product screens we've built">
      <div ref={frame} className="cut-tl absolute inset-0 origin-center overflow-hidden bg-navy-2 will-change-transform">
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4 md:gap-6 md:p-6">
          {cols.map((col, ci) => (
            <div key={ci} data-reel-col={ci} className="flex flex-col gap-4 md:gap-6">
              {col.map((t, i) =>
                t.kind === "shot" ? (
                  <ProjectVisual key={t.p.slug} project={t.p} className="aspect-[4/5] w-full shrink-0" />
                ) : (
                  <div key={t.src + i} className="relative aspect-[4/5] w-full shrink-0 overflow-hidden">
                    <Image src={t.src} alt={t.alt} fill sizes="33vw" className="object-cover" />
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        <div data-reel-caption className="absolute bottom-8 left-0 right-0">
          <div className="wrap flex flex-wrap items-end justify-between gap-6">
            <p className="display-lg max-w-[14ch]">Screens from projects we’ve shipped.</p>
            <p className="max-w-xs text-white/70">Telehealth, fintech, delivery, logistics, education and real estate. Designed and built in-house.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
