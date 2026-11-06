"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Lightweight first-visit intro: logo, a counter and a thin progress line, then the
 * panel slides up. No WebGL, only transforms and opacity, so it stays smooth on any device.
 * Server-rendered so nothing flashes underneath; the inline script in <head> hides it on
 * repeat visits (sessionStorage), with reduced motion and without JavaScript.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.__rhIntroDone !== false) return;
    const html = document.documentElement;
    const finish = () => {
      html.classList.remove("is-loading");
      html.classList.add("intro-done");
      window.__rhIntroDone = true;
      try {
        sessionStorage.setItem("rh-intro", "1");
      } catch {}
      window.dispatchEvent(new Event("rh:intro-done"));
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const ready = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === "complete" ? Promise.resolve() : new Promise((r) => addEventListener("load", r, { once: true })),
      ]),
      new Promise((r) => setTimeout(r, 2500)),
    ]);

    const p = { v: 0 };
    const render = () => {
      if (count.current) count.current.textContent = String(Math.round(p.v));
      if (bar.current) bar.current.style.transform = `scaleX(${p.v / 100})`;
    };

    const tl = gsap.timeline();
    tl.from("[data-pl-in]", { yPercent: 100, duration: 0.8, ease: "power3.out", stagger: 0.06 }).to(
      p,
      { v: 80, duration: 1, ease: "power2.inOut", onUpdate: render },
      0.1,
    );

    let cancelled = false;
    ready.then(async () => {
      if (cancelled) return;
      await tl.to(p, { v: 100, duration: 0.35, ease: "power1.out", onUpdate: render });
      if (cancelled) return;
      gsap
        .timeline({ delay: 0.15 })
        .to("[data-pl-in]", { yPercent: -100, duration: 0.45, ease: "power2.in", stagger: 0.03 })
        .add(finish, 0.35)
        .to(el, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, 0.3)
        .set(el, { display: "none" });
    });

    // Never leave the page covered.
    const safety = setTimeout(() => {
      if (window.__rhIntroDone === false) {
        finish();
        el.style.display = "none";
      }
    }, 6000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="rh-preloader fixed inset-0 z-[400] bg-navy text-white will-change-transform" aria-hidden>
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <div className="overflow-hidden">
          <span data-pl-in className="flex items-center gap-4">
            <Image src="/mark.png" alt="" width={128} height={128} priority className="h-12 w-12" />
            <span className="font-display text-2xl font-bold leading-tight">Red Hive Digital</span>
          </span>
        </div>
        <div className="w-48 overflow-hidden">
          <div data-pl-in className="flex items-center gap-4">
            <div className="h-[2px] flex-1 bg-white/15">
              <div ref={bar} className="h-full origin-left scale-x-0 bg-red" />
            </div>
            <span className="w-9 text-right text-sm tabular-nums text-white/60">
              <span ref={count}>0</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
