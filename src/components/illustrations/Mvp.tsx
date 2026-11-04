"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const cols = ["Later", "Next", "Now", "Done"];
const COL_X = (i: number) => 22 + i * 152;

function Card({ x, y, title, tag, className = "", hot = false }: { x: number; y: number; title: string; tag: string; className?: string; hot?: boolean }) {
  return (
    <g className={className} fontFamily={F}>
      <rect x={x} y={y} width="136" height="58" rx="8" fill="#FFFFFF" stroke={hot ? "#E1013B" : "#D9DAE0"} strokeWidth="1.5" />
      <text x={x + 12} y={y + 23} fontSize="11.5" fontWeight="600" fill="#00020A">{title}</text>
      <rect x={x + 12} y={y + 33} width={tag.length * 6 + 12} height="16" rx="8" fill="#F3F3F5" />
      <text x={x + 18} y={y + 44.5} fontSize="9.5" fill="#5D606C">{tag}</text>
    </g>
  );
}

/** MVP: a roadmap board. Cards move from Now to Done, then v1.0 goes live. */
export default function Mvp({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(".v-col", { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 })
        .from(".v-card", { y: 16, opacity: 0, stagger: 0.05, duration: 0.6 }, "-=0.5")
        .from(".v-bar", { scaleX: 0, transformOrigin: "0% 50%", duration: 1, ease: "power3.out" }, "-=0.3");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .set([".v-move-a", ".v-move-b"], { x: 0, y: 0, opacity: 1 })
        .set(".v-bar", { attr: { width: 330 } })
        .to(".v-move-a", { x: 152, y: 136, duration: 0.9, ease: "power3.inOut" })
        .to(".v-move-b", { x: 152, y: 0, duration: 0.9, ease: "power3.inOut" }, "-=0.5")
        .to(".v-bar", { attr: { width: 430 }, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .fromTo(".v-live", { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" })
        .to(".v-live", { opacity: 0, duration: 0.4 }, "+=1.8")
        .to([".v-move-a", ".v-move-b"], { opacity: 0, duration: 0.4 }, "<");

      tl.eventCallback("onComplete", () => loop.play());
      ScrollTrigger.create({ trigger: svg, start: "top 85%", once: true, onEnter: () => tl.play() });
      const io = new IntersectionObserver(([e]) => {
        if (tl.progress() < 1) return;
        if (e.isIntersecting) loop.resume();
        else loop.pause();
      });
      io.observe(svg);
      return () => io.disconnect();
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Product roadmap board with tasks moving to done and version 1.0 going live">
      <g fontFamily={F}>
        <text x="22" y="40" fontSize="18" fontWeight="700" fill="#00020A">MVP roadmap</text>
        <text x="22" y="60" fontSize="11" fill="#9093A1">Sprint 4 of 6 · launch in 3 weeks</text>
        <rect x="186" y="50" width="430" height="8" rx="4" fill="#F3F3F5" />
        <rect className="v-bar" x="186" y="50" width="330" height="8" rx="4" fill="#00020A" />
      </g>

      {cols.map((c, i) => (
        <g key={c} className="v-col" fontFamily={F}>
          <rect x={COL_X(i) - 8} y="82" width="152" height="372" rx="10" fill="#F3F3F5" />
          <text x={COL_X(i)} y="106" fontSize="12" fontWeight="700" fill="#00020A">{c}</text>
          <text x={COL_X(i) + 128} y="106" textAnchor="end" fontSize="11" fill="#9093A1">{[2, 2, 2, 3][i]}</text>
        </g>
      ))}

      <Card className="v-card" x={COL_X(0)} y={120} title="Referral codes" tag="Growth" />
      <Card className="v-card" x={COL_X(0)} y={188} title="Dark mode" tag="UI" />
      <Card className="v-card" x={COL_X(1)} y={188} title="Admin exports" tag="Backend" />
      <g className="v-move-b">
        <Card className="v-card" x={COL_X(1)} y={120} title="Push reminders" tag="Mobile" />
      </g>
      <Card className="v-card" x={COL_X(2)} y={188} title="Stripe checkout" tag="Payments" />
      <g className="v-move-a">
        <Card className="v-card" x={COL_X(2)} y={120} title="Onboarding flow" tag="Design" hot />
      </g>
      <Card className="v-card" x={COL_X(3)} y={120} title="Sign up & login" tag="Auth" />
      <Card className="v-card" x={COL_X(3)} y={188} title="Booking API" tag="Backend" />
      <Card className="v-card" x={COL_X(3)} y={324} title="Store listing" tag="Release" />

      <g className="v-live" opacity="0" fontFamily={F}>
        <rect x="400" y="392" width="128" height="40" rx="20" fill="#E1013B" />
        <circle cx="422" cy="412" r="5" fill="#FFFFFF" />
        <text x="472" y="417" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFFFFF">v1.0 live</text>
      </g>
    </svg>
  );
}
