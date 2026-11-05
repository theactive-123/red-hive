"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { PreloaderSceneApi } from "@/components/three/PreloaderScene";

const PreloaderScene = dynamic(() => import("@/components/three/PreloaderScene"), { ssr: false });

/**
 * First-visit intro: a 3D honeycomb assembles while the site loads, then the camera
 * flies into the red centre cell and the red lifts away along the logo's angle.
 * Server-rendered so nothing flashes underneath; an inline script in <head> hides it
 * on repeat visits (sessionStorage), for reduced motion and without JavaScript.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const api = useRef<PreloaderSceneApi | null>(null);

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
      new Promise((r) => setTimeout(r, 4000)),
    ]);

    const p = { v: 0 };
    const render = () => {
      progress.current = p.v / 100;
      if (count.current) count.current.textContent = String(Math.round(p.v)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${p.v / 100})`;
    };

    const tl = gsap.timeline();
    tl.from("[data-pl-in]", { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.06 }).to(
      p,
      { v: 74, duration: 1.6, ease: "power2.inOut", onUpdate: render },
      0.15,
    );

    let cancelled = false;
    ready.then(async () => {
      if (cancelled) return;
      await tl.to(p, { v: 100, duration: 0.55, ease: "power2.out", onUpdate: render });
      await gsap.delayedCall(0.25, () => {});
      if (cancelled) return;
      gsap.to("[data-pl-in]", { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.03 });
      gsap.to("[data-pl-bar]", { opacity: 0, duration: 0.3 });
      const dive = api.current ? api.current.exit() : Promise.resolve();
      gsap.to("[data-pl-flood]", { opacity: 1, duration: 0.45, ease: "power2.in", delay: api.current ? 0.65 : 0.1 });
      await Promise.all([dive, new Promise((r) => setTimeout(r, 1100))]);
      if (cancelled) return;
      gsap.set("[data-pl-stage]", { display: "none" });
      finish();
      gsap.to("[data-pl-flood]", {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        duration: 1.05,
        ease: "expo.inOut",
        onComplete: () => void gsap.set(el, { display: "none" }),
      });
    });

    // Never leave the page covered.
    const safety = setTimeout(() => {
      if (window.__rhIntroDone === false) {
        finish();
        el.style.display = "none";
      }
    }, 9000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="rh-preloader fixed inset-0 z-[400]" aria-hidden>
      <div data-pl-stage className="absolute inset-0 bg-navy text-white">
        <PreloaderScene progress={progress} apiRef={api} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,2,10,0.75)_100%)]" />

        <div className="wrap relative flex h-full flex-col justify-between py-8 md:py-10">
          <div className="flex items-center gap-4 overflow-hidden">
            <span data-pl-in className="block">
              <Image src="/mark.png" alt="" width={128} height={128} priority className="h-11 w-11 md:h-12 md:w-12" />
            </span>
            <span className="overflow-hidden font-display text-lg font-bold leading-tight md:text-xl">
              <span data-pl-in className="block">
                Red Hive
              </span>
              <span data-pl-in className="block">
                Digital
              </span>
            </span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="max-w-[17rem] overflow-hidden text-sm leading-snug text-white/60">
              <span data-pl-in className="block">
                Web apps, mobile apps
              </span>
              <span data-pl-in className="block">
                and SaaS products.
              </span>
            </div>
            <div className="overflow-hidden">
              <span data-pl-in className="block font-display text-[clamp(4rem,12vw,11rem)] font-extrabold leading-[0.8] tracking-[-0.04em] tabular-nums">
                <span ref={count}>000</span>
              </span>
            </div>
          </div>
        </div>

        <div data-pl-bar className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-red" />
        </div>
      </div>

      {/* Red flood that the camera dives into, then lifts away along the logo's angle */}
      <div
        data-pl-flood
        className="absolute inset-0 bg-red opacity-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_calc(100%-8vw))]"
      />
    </div>
  );
}
