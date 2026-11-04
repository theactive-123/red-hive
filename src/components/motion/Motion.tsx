"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * Declarative scroll animations. Server components opt in with data attributes:
 *  data-reveal="up|fade|left|right|scale"   (+ data-delay="0.2")
 *  data-split="lines|words|hero"           headline mask reveal (hero = no scroll trigger)
 *  data-scrub-text                          words light up while scrolling
 *  data-parallax="0.15"                     vertical parallax amount (fraction of viewport)
 *  data-counter="150"                       count-up number (+ data-suffix)
 *  data-draw="x|y"                          line grows while scrolling through its parent
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("js-motion");
      document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        el.textContent = (el.dataset.counter ?? "") + (el.dataset.suffix ?? "");
      });
      return;
    }

    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        // Generic reveals, batched so siblings stagger nicely.
        const from: Record<string, gsap.TweenVars> = {
          up: { y: 48 },
          fade: {},
          left: { x: -60 },
          right: { x: 60 },
          scale: { scale: 0.92, y: 24 },
        };
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        reveals.forEach((el) => gsap.set(el, { opacity: 0, ...from[el.dataset.reveal || "up"] }));
        ScrollTrigger.batch(reveals, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.1,
              stagger: 0.09,
              delay: Number((batch[0] as HTMLElement).dataset.delay || 0),
              overwrite: true,
            }),
        });

        // Headline mask reveals.
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const mode = el.dataset.split;
          const split = SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            linesClass: "split-line",
            wordsClass: "split-word",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.words, {
                yPercent: 115,
                rotate: 4,
                duration: 1.25,
                stagger: mode === "lines" ? 0.03 : 0.045,
                delay: mode === "hero" ? 0.25 : 0,
                scrollTrigger: mode === "hero" ? undefined : { trigger: el, start: "top 88%", once: true },
              });
            },
          });
          splits.push(split);
        });

        // Words that light up as you scroll.
        gsap.utils.toArray<HTMLElement>("[data-scrub-text]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          splits.push(split);
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 0.15);
          gsap.fromTo(
            el,
            { yPercent: -amount * 100 },
            {
              yPercent: amount * 100,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const target = Number(el.dataset.counter);
          const suffix = el.dataset.suffix ?? "";
          const obj = { v: 0 };
          el.textContent = "0" + suffix;
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => (el.textContent = Math.round(obj.v) + suffix),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          const axis = el.dataset.draw === "x" ? "scaleX" : "scaleY";
          gsap.fromTo(
            el,
            { [axis]: 0 },
            {
              [axis]: 1,
              ease: "none",
              transformOrigin: axis === "scaleX" ? "left center" : "center top",
              scrollTrigger: { trigger: el.parentElement || el, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
            },
          );
        });
      });
      ScrollTrigger.refresh();
    };

    // Wait for fonts so split lines are measured correctly.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => requestAnimationFrame(run));

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
