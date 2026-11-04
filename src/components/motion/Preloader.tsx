"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * First-visit intro. Server-rendered so nothing flashes underneath; an inline
 * script in <head> hides it straight away on repeat visits (sessionStorage).
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
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
    if (window.__rhIntroDone !== false) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      finish();
      return;
    }

    const ready = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === "complete" ? Promise.resolve() : new Promise((r) => addEventListener("load", r, { once: true })),
      ]),
      new Promise((r) => setTimeout(r, 3500)),
    ]);

    const progress = { v: 0 };
    const render = () => {
      const v = Math.round(progress.v);
      if (count.current) count.current.textContent = String(v).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${progress.v / 100})`;
    };

    const tl = gsap.timeline();
    tl.from("[data-pl-mark]", { yPercent: 110, duration: 0.9, ease: "expo.out" })
      .from("[data-pl-word]", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.06 }, "<0.1")
      .to(progress, { v: 72, duration: 1.1, ease: "power2.inOut", onUpdate: render }, 0.2);

    let cancelled = false;
    ready.then(() => {
      if (cancelled) return;
      tl.to(progress, { v: 100, duration: 0.45, ease: "power2.out", onUpdate: render })
        .to("[data-pl-mark], [data-pl-word], [data-pl-count]", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.03 }, "+=0.15")
        .to("[data-pl-bar]", { opacity: 0, duration: 0.3 }, "<")
        // lift the navy layer along the logo's angle, then the red one behind it
        .to("[data-pl-navy]", { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", duration: 1, ease: "expo.inOut" }, "-=0.2")
        .to("[data-pl-red]", { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", duration: 1, ease: "expo.inOut" }, "-=0.82")
        .add(finish, "-=0.55")
        .set(el, { display: "none" });
    });

    // Safety net: never leave the page covered.
    const safety = setTimeout(() => {
      if (window.__rhIntroDone === false) {
        finish();
        el.style.display = "none";
      }
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="rh-preloader fixed inset-0 z-[400]" aria-hidden>
      <div data-pl-red className="absolute inset-0 bg-red [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]" />
      <div data-pl-navy className="absolute inset-0 bg-navy text-white [clip-path:polygon(0_0,100%_0,100%_100%,0_calc(100%-9vw))]">
        <div className="wrap flex h-full flex-col justify-between py-8 md:py-10">
          <div className="flex items-center gap-4 overflow-hidden">
            <span data-pl-mark className="block">
              <Image src="/mark.png" alt="" width={128} height={128} priority className="h-11 w-11 md:h-14 md:w-14" />
            </span>
            <span className="overflow-hidden font-display text-lg font-bold leading-tight tracking-tight md:text-xl">
              <span data-pl-word className="block">Red Hive</span>
              <span data-pl-word className="block">Digital</span>
            </span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <p className="max-w-[16rem] overflow-hidden text-sm leading-snug text-white/60">
              <span data-pl-word className="block">Web apps, mobile apps</span>
              <span data-pl-word className="block">and SaaS products.</span>
            </p>
            <div className="overflow-hidden">
              <span data-pl-count className="block font-display text-[clamp(5rem,16vw,15rem)] font-extrabold leading-[0.8] tracking-[-0.04em] tabular-nums">
                <span ref={count}>000</span>
              </span>
            </div>
          </div>
        </div>
        <div data-pl-bar className="absolute bottom-[calc(9vw+1.5rem)] left-0 right-0 hidden md:block">
          <div className="wrap">
            <div className="relative h-[2px] bg-white/15">
              <div ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
