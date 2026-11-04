"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Cycles through words with a vertical mask + scramble effect. */
export default function RotatingWords({ words, className = "" }: { words: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let i = 0;
    const tl = gsap.timeline({ repeat: -1, delay: 2.2 });
    words.forEach(() => {
      tl.to(el, { yPercent: -110, opacity: 0, duration: 0.5, ease: "power3.in" })
        .add(() => {
          i = (i + 1) % words.length;
          el.textContent = words[i];
        })
        .fromTo(el, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" })
        .to({}, { duration: 1.8 });
    });
    return () => {
      tl.kill();
    };
  }, [words]);

  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <span ref={ref} className={`inline-block ${className}`}>
        {words[0]}
      </span>
    </span>
  );
}
