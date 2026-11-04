"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const ARC = "M380 196 Q470 70 560 196";

/** Flight search widget, a route arc with a moving plane and a boarding pass. */
export default function Travel({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);
      const arc = svg.querySelector<SVGPathElement>(".arc")!;
      const plane = svg.querySelector<SVGGElement>(".plane")!;
      const len = arc.getTotalLength();
      const pos = { d: 0 };
      const place = () => {
        const a = arc.getPointAtLength(pos.d * len);
        const b = arc.getPointAtLength(Math.min(len, pos.d * len + 1));
        const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        plane.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${ang})`);
      };
      gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
      place();

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .fromTo(pos, { d: 0 }, { d: 1, duration: 3.6, ease: "power1.inOut", onUpdate: place }, 0)
        .to(q(".pass"), { y: -6, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 3.4)
        .to(q(".seat"), { fill: "#E1013B", duration: 0.3, yoyo: true, repeat: 1 }, 3.6);

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
        .from(q(".field"), { x: -16, opacity: 0, stagger: 0.08, duration: 0.7 }, 0.3)
        .to(arc, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.6)
        .from(q(".pass"), { y: 120, opacity: 0, duration: 1.2 }, 1);

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Flight booking widget, route map and boarding pass">
      {/* Search widget */}
      <g className="card">
        <rect x="40" y="40" width="280" height="290" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="60" y="74" fontFamily={F} fontSize="16" fontWeight="700" fill="#00020A">Where to?</text>
        {[
          { l: "From", v: "New York (JFK)", y: 92 },
          { l: "To", v: "Lisbon (LIS)", y: 148 },
        ].map((f) => (
          <g key={f.l} className="field">
            <rect x="60" y={f.y} width="240" height="46" rx="8" fill="#F3F3F5" />
            <text x="74" y={f.y + 18} fontFamily={F} fontSize="10" fill="#9093A1">{f.l}</text>
            <text x="74" y={f.y + 35} fontFamily={F} fontSize="13" fontWeight="600" fill="#00020A">{f.v}</text>
          </g>
        ))}
        {[
          { l: "Depart", v: "Fri 12 Sep", x: 60 },
          { l: "Return", v: "Sun 21 Sep", x: 184 },
        ].map((f) => (
          <g key={f.l} className="field">
            <rect x={f.x} y="204" width="116" height="46" rx="8" fill="#F3F3F5" />
            <text x={f.x + 12} y="222" fontFamily={F} fontSize="10" fill="#9093A1">{f.l}</text>
            <text x={f.x + 12} y="239" fontFamily={F} fontSize="12" fontWeight="600" fill="#00020A">{f.v}</text>
          </g>
        ))}
        <rect x="60" y="266" width="240" height="44" rx="8" fill="#E1013B" />
        <text x="180" y="293" textAnchor="middle" fontFamily={F} fontSize="13" fontWeight="600" fill="#FFFFFF">Search flights</text>
      </g>

      {/* Route */}
      <g className="card">
        <rect x="340" y="40" width="260" height="200" rx="14" fill="#F3F3F5" />
        <path d="M380 196 Q470 70 560 196" fill="none" stroke="#D9DAE0" strokeWidth="2" strokeDasharray="3 6" />
        <path className="arc" d={ARC} fill="none" stroke="#00020A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="380" cy="196" r="6" fill="#00020A" />
        <circle cx="560" cy="196" r="6" fill="#E1013B" />
        <text x="380" y="222" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="700" fill="#00020A">JFK</text>
        <text x="560" y="222" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="700" fill="#00020A">LIS</text>
        <text x="470" y="70" textAnchor="middle" fontFamily={F} fontSize="11" fill="#5D606C">7h 05m · Nonstop</text>
        <g className="plane" transform="translate(380 196)">
          <polygon points="10,0 -8,-7 -4,0 -8,7" fill="#E1013B" />
        </g>
      </g>

      {/* Boarding pass */}
      <g className="pass">
        <rect x="340" y="256" width="260" height="184" rx="14" fill="#00020A" />
        <text x="360" y="284" fontFamily={F} fontSize="11" fill="#9093A1">Boarding pass</text>
        <text x="360" y="322" fontFamily={F} fontSize="30" fontWeight="700" fill="#FFFFFF">JFK</text>
        <text x="470" y="320" textAnchor="middle" fontFamily={F} fontSize="18" fill="#E1013B">→</text>
        <text x="580" y="322" textAnchor="end" fontFamily={F} fontSize="30" fontWeight="700" fill="#FFFFFF">LIS</text>
        <line x1="352" y1="342" x2="588" y2="342" stroke="#5D606C" strokeDasharray="4 5" />
        {[
          { l: "Gate", v: "B12", x: 360 },
          { l: "Seat", v: "14A", x: 430 },
          { l: "Boards", v: "21:40", x: 500 },
        ].map((f) => (
          <g key={f.l}>
            <text x={f.x} y="364" fontFamily={F} fontSize="10" fill="#9093A1">{f.l}</text>
            <text className={f.l === "Seat" ? "seat" : undefined} x={f.x} y="382" fontFamily={F} fontSize="14" fontWeight="700" fill="#FFFFFF">{f.v}</text>
          </g>
        ))}
        {Array.from({ length: 34 }, (_, i) => (
          <rect key={i} x={360 + i * 6.6} y="398" width={i % 3 === 0 ? 3 : 1.6} height="26" fill="#FFFFFF" opacity="0.85" />
        ))}
      </g>
    </svg>
  );
}
