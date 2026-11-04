"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * Declarative scroll motion. Server components opt in with data attributes:
 *  data-reveal            fade + rise when scrolled into view (data-delay="0.2")
 *  data-split / ="hero"   headline revealed line by line (hero = on load)
 *  data-clip              media wipes up into view (child [data-clip-inner] de-zooms)
 *  data-parallax="0.1"    vertical drift while scrolling
 *  data-scrub-text        words brighten as you read
 *  data-counter="150"     count up (+ data-suffix)
 *  data-draw="x|y"        line grows with scroll
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.remove("js-motion");
      return;
    }

    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { opacity: 0, y: 28 });
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.08,
              delay: Number((batch[0] as HTMLElement).dataset.delay || 0),
              overwrite: true,
            }),
        });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const hero = el.dataset.split === "hero";
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.09,
                delay: hero ? 0.15 : 0,
                scrollTrigger: hero ? undefined : { trigger: el, start: "top 88%", once: true },
              });
            },
          });
          splits.push(split);
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const inner = el.querySelector("[data-clip-inner]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
          tl.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut" });
          if (inner) tl.from(inner, { scale: 1.18, duration: 1.8, ease: "expo.out" }, 0.1);
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 0.1);
          gsap.fromTo(
            el,
            { yPercent: -amount * 100 },
            { yPercent: amount * 100, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub-text]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          splits.push(split);
          gsap.fromTo(
            split.words,
            { opacity: 0.18 },
            { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 50%", scrub: true } },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const target = Number(el.dataset.counter);
          const suffix = el.dataset.suffix ?? "";
          const o = { v: 0 };
          gsap.to(o, {
            v: target,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onStart: () => void (el.textContent = "0" + suffix),
            onUpdate: () => void (el.textContent = Math.round(o.v) + suffix),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          const x = el.dataset.draw === "x";
          gsap.fromTo(
            el,
            { [x ? "scaleX" : "scaleY"]: 0 },
            {
              [x ? "scaleX" : "scaleY"]: 1,
              ease: "none",
              transformOrigin: x ? "left center" : "center top",
              scrollTrigger: { trigger: el.parentElement || el, start: "top 75%", end: "bottom 55%", scrub: 0.5 },
            },
          );
        });
      });
      ScrollTrigger.refresh();
    };

    (document.fonts?.ready ?? Promise.resolve()).then(() => requestAnimationFrame(run));

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
