"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/** Endless marquee whose speed and direction follow the scroll velocity. */
export default function VelocityMarquee({ children, speed = 60, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0;
    let dir = 1;
    let boost = 0;
    const half = () => el.scrollWidth / 2;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 40, 25);
      },
    });
    const tick = (_t: number, dt: number) => {
      boost *= 0.92;
      x -= ((speed + boost * 20) * dt * dir) / 1000;
      const w = half();
      if (w) x = ((x % w) - w) % w;
      gsap.set(el, { x });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
