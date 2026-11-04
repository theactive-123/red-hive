"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { gsap } from "@/lib/gsap";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const quote = useRef<HTMLDivElement>(null);

  const go = (d: number) => {
    const next = (i + d + testimonials.length) % testimonials.length;
    if (!quote.current) return setI(next);
    gsap.to(quote.current, {
      opacity: 0,
      y: -16,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setI(next);
        gsap.fromTo(quote.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
      },
    });
  };
  const t = testimonials[i];

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="flex items-start justify-between md:col-span-3 md:flex-col md:justify-between">
        <p className="display-sm">What clients say</p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg">
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg">
            →
          </button>
          <span className="ml-2 text-sm tabular-nums text-muted">
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      <figure ref={quote} className="md:col-span-9" aria-live="polite">
        <blockquote className="font-display text-[clamp(1.6rem,3vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.02em]">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4">
          <span className="cut grid h-12 w-12 place-items-center bg-red text-sm font-semibold text-white [--cut:10px]">
            {t.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <span>
            <span className="block font-medium">{t.name}</span>
            <span className="block text-sm text-muted">{t.role}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
