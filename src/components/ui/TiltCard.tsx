"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Subtle 3D tilt toward the pointer. */
export default function TiltCard({ children, max = 8, className = "h-full" }: { children: React.ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: px * max, rotateX: -py * max, duration: 0.6, ease: "power3.out", transformPerspective: 800 });
  };
  const leave = () => ref.current && gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1,0.5)" });
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`[transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  );
}
