"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";

/** Property listing card, a map with a dropping pin and a booked viewing. */
export default function RealEstate({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .to(q(".pin"), { y: -14, duration: 0.35, ease: "power2.out" }, 0)
        .to(q(".pin"), { y: 0, duration: 0.6, ease: "bounce.out" }, 0.35)
        .to(q(".bubble"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1, stagger: 0.2 }, 0.4)
        .to(q(".save"), { fill: "#E1013B", duration: 0.3 }, 1.4)
        .to(q(".chip"), { scale: 1.03, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1 }, 1.8)
        .to(q(".save"), { fill: "#D9DAE0", duration: 0.3 }, 3.2);

      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 1.1 },
        onComplete: () => {
          started = true;
          loop.play();
        },
      });
      intro
        .from(q(".card"), { y: 40, opacity: 0, stagger: 0.15 })
        .from(q(".house > *"), { y: 20, opacity: 0, stagger: 0.07, duration: 0.7 }, 0.3)
        .from(q(".pin"), { y: -90, opacity: 0, duration: 1, ease: "bounce.out" }, 0.8)
        .from(q(".bubble"), { scale: 0, transformOrigin: "50% 50%", stagger: 0.1, duration: 0.6 }, 1)
        .from(q(".chip"), { y: 30, opacity: 0, duration: 0.8 }, 1.2);

      ScrollTrigger.create({ trigger: svg, start: "top 85%", once: true, onEnter: () => void intro.play() });
      io = new IntersectionObserver(([e]) => {
        if (!started) return;
        if (e.isIntersecting) loop.resume();
        else loop.pause();
      });
      io.observe(svg);
    }, svg);
    return () => {
      io?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Property listing with price, map pin and booked viewing">
      {/* Listing */}
      <g className="card">
        <rect x="40" y="40" width="300" height="400" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <rect x="54" y="54" width="272" height="180" rx="8" fill="#F3F3F5" />
        <g className="house">
          <rect x="54" y="206" width="272" height="28" fill="#D9DAE0" />
          <rect x="120" y="134" width="140" height="74" fill="#FFFFFF" stroke="#00020A" strokeWidth="2" />
          <polygon points="108,136 190,82 272,136" fill="#00020A" />
          <rect x="228" y="88" width="16" height="30" fill="#00020A" />
          <rect x="176" y="164" width="28" height="44" fill="#E1013B" />
          <rect x="134" y="150" width="28" height="24" fill="#D9DAE0" />
          <rect x="218" y="150" width="28" height="24" fill="#D9DAE0" />
        </g>
        <rect x="64" y="64" width="64" height="22" rx="11" fill="#00020A" />
        <text x="96" y="79" textAnchor="middle" fontFamily={F} fontSize="10" fontWeight="600" fill="#FFFFFF">For sale</text>
        <circle className="save" cx="306" cy="76" r="12" fill="#D9DAE0" />
        <text x="58" y="272" fontFamily={F} fontSize="26" fontWeight="700" fill="#00020A">$540,000</text>
        <text x="58" y="296" fontFamily={F} fontSize="12" fill="#5D606C">42 Elm Street, Austin TX</text>
        {["3 bd", "2 ba", "1,850 sqft"].map((t, i) => (
          <g key={t}>
            <rect x={58 + i * 82} y="314" width="74" height="28" rx="6" fill="#F3F3F5" />
            <text x={95 + i * 82} y="332" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill="#00020A">{t}</text>
          </g>
        ))}
        <rect x="58" y="372" width="264" height="44" rx="8" fill="#E1013B" />
        <text x="190" y="399" textAnchor="middle" fontFamily={F} fontSize="13" fontWeight="600" fill="#FFFFFF">Schedule a viewing</text>
      </g>

      {/* Map */}
      <g className="card">
        <rect x="360" y="40" width="240" height="250" rx="14" fill="#F3F3F5" />
        <path d="M360 120 H600 M360 214 H600 M440 40 V290 M530 40 V290" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M360 270 L600 96" stroke="#FFFFFF" strokeWidth="6" />
        <rect x="452" y="134" width="64" height="66" rx="4" fill="#D9DAE0" />
        <rect x="372" y="54" width="56" height="54" rx="4" fill="#D9DAE0" opacity="0.6" />
        {[
          { x: 384, y: 160, t: "$480k" },
          { x: 548, y: 64, t: "$615k" },
          { x: 548, y: 240, t: "$399k" },
        ].map((b) => (
          <g key={b.t} className="bubble">
            <rect x={b.x - 10} y={b.y - 14} width="52" height="22" rx="11" fill="#00020A" />
            <text x={b.x + 16} y={b.y + 1} textAnchor="middle" fontFamily={F} fontSize="10" fontWeight="600" fill="#FFFFFF">{b.t}</text>
          </g>
        ))}
        <g className="pin">
          <path d="M485 210 c-13 0 -22 -10 -22 -21 c0 -15 22 -33 22 -33 s22 18 22 33 c0 11 -9 21 -22 21z" fill="#E1013B" />
          <circle cx="485" cy="188" r="7" fill="#FFFFFF" />
        </g>
      </g>

      {/* Viewing chip */}
      <g className="chip">
        <rect x="360" y="310" width="240" height="130" rx="14" fill="#00020A" />
        <circle cx="390" cy="346" r="13" fill="#E1013B" />
        <path d="M384 346 l4 4 l8 -9" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="414" y="351" fontFamily={F} fontSize="14" fontWeight="700" fill="#FFFFFF">Viewing booked</text>
        <text x="380" y="386" fontFamily={F} fontSize="12" fill="#D9DAE0">Sat 18 May · 11:00</text>
        <text x="380" y="410" fontFamily={F} fontSize="11" fill="#9093A1">Agent: L. Moreno</text>
      </g>
    </svg>
  );
}
