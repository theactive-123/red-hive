"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Icon from "@/components/ui/Icon";
import type { IconKey } from "@/data/types";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Item = { slug: string; name: string; tagline: string; icon: IconKey; capabilities: string[] };

/** Desktop: pinned section that scrolls cards horizontally. Mobile: normal vertical list. */
export default function ServicesScroller({ items }: { items: Item[] }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: tween.scrollTrigger ? { trigger: section.current, start: "top top", end: () => "+=" + distance(), scrub: true } : undefined });
      // Cards lean in as they enter.
      gsap.utils.toArray<HTMLElement>("[data-svc-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: -18, opacity: 0.35 },
          { rotateY: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true } },
        );
      });
      return () => ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden lg:h-screen">
      <div className="flex h-full flex-col justify-center py-24 lg:py-0">
        <div className="container-x mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-red clip-hex" /> What we do
            </p>
            <h2 className="max-w-2xl text-[clamp(2.1rem,4.6vw,4rem)] font-semibold text-white">
              End-to-end product engineering<span className="text-red">.</span>
            </h2>
          </div>
          <Link href="/services" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white">
            All services →
          </Link>
        </div>
        <div ref={track} className="flex flex-col gap-4 px-4 [perspective:1400px] sm:px-7 lg:w-max lg:flex-row lg:gap-6 lg:px-10">
          {items.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-svc-card
              data-cursor="Open"
              className="group relative flex shrink-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-red/50 lg:h-[60vh] lg:max-h-[560px] lg:w-[400px] lg:p-9"
            >
              <span className="absolute inset-0 bg-gradient-to-b from-red/0 via-red/0 to-red/0 transition-all duration-700 group-hover:from-red/20 group-hover:to-red-deep/30" />
              <span className="bg-hex absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="relative flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-ink text-red-hot transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-red group-hover:text-white">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <span className="font-mono text-sm text-white/30">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span className="relative mt-8 block font-display text-2xl font-semibold text-white lg:mt-auto lg:text-3xl">{s.name}</span>
              <span className="relative mt-3 block text-sm leading-relaxed text-muted">{s.tagline}</span>
              <span className="relative mt-6 flex flex-wrap gap-2">
                {s.capabilities.slice(0, 3).map((c) => (
                  <span key={c} className="rounded-full border border-line px-3 py-1 text-[0.7rem] text-white/60">
                    {c}
                  </span>
                ))}
              </span>
            </Link>
          ))}
        </div>
        <div className="container-x mt-10 hidden lg:block">
          <div className="h-px w-full bg-line">
            <div ref={bar} className="h-px origin-left scale-x-0 bg-red" />
          </div>
        </div>
      </div>
    </section>
  );
}
