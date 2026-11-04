"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const steps = [
  { label: "Picked up", time: "09:12" },
  { label: "In transit", time: "09:40" },
  { label: "Delivered", time: "ETA 10:05" },
];
const ROUTE = "M84 396 L84 300 L196 300 L196 196 L300 196 L300 104 L356 104";

/** Live route map with a moving van, delivery timeline and ETA tile. */
export default function Logistics({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);
      const path = svg.querySelector<SVGPathElement>(".route")!;
      const van = svg.querySelector<SVGGElement>(".van")!;
      const len = path.getTotalLength();
      const pos = { d: 0 };
      const place = () => {
        const pt = path.getPointAtLength(pos.d * len);
        van.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      };
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      place();

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .to(pos, { d: 1, duration: 4, ease: "power1.inOut", onUpdate: place }, 0)
        .to(q(".dot2"), { fill: "#E1013B", duration: 0.3 }, 3.8)
        .to(q(".prog"), { attr: { y2: 216 }, duration: 0.6, ease: "power2.out" }, 3.6)
        .to(q(".pin"), { y: -6, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }, 4)
        .set(pos, { d: 0, onComplete: place }, 5.5)
        .set(q(".dot2"), { fill: "#FFFFFF" }, 5.5)
        .set(q(".prog"), { attr: { y2: 160 } }, 5.5);

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
        .to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.4)
        .from(q(".pin"), { y: -40, opacity: 0, duration: 0.8, ease: "bounce.out" }, 1.4)
        .from(q(".step"), { x: 16, opacity: 0, stagger: 0.15, duration: 0.7 }, 0.6)
        .from(q(".prog"), { attr: { y2: 104 }, duration: 1, ease: "power2.out" }, 0.8);

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Delivery tracking map with route, status timeline and ETA">
      {/* Map */}
      <g className="card">
        <rect x="40" y="40" width="360" height="400" rx="14" fill="#F3F3F5" />
        {[100, 196, 300].map((y) => (
          <rect key={`h${y}`} x="40" y={y - 6} width="360" height="12" fill="#FFFFFF" />
        ))}
        {[84, 196, 300].map((x) => (
          <rect key={`v${x}`} x={x - 6} y="40" width="12" height="400" fill="#FFFFFF" />
        ))}
        <rect x="104" y="120" width="76" height="60" rx="4" fill="#D9DAE0" />
        <rect x="216" y="216" width="68" height="70" rx="4" fill="#D9DAE0" />
        <rect x="316" y="216" width="68" height="120" rx="4" fill="#D9DAE0" opacity="0.6" />
        <rect x="104" y="316" width="76" height="100" rx="4" fill="#D9DAE0" opacity="0.6" />
        <path className="route" d={ROUTE} fill="none" stroke="#E1013B" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="84" cy="396" r="8" fill="#00020A" />
        <g className="pin">
          <path d="M356 104 c-11 0 -18 -8 -18 -17 c0 -12 18 -27 18 -27 s18 15 18 27 c0 9 -7 17 -18 17z" fill="#E1013B" transform="translate(0 -6)" />
          <circle cx="356" cy="81" r="6" fill="#FFFFFF" />
        </g>
        <g className="van" transform="translate(84 396)">
          <rect x="-14" y="-9" width="28" height="18" rx="5" fill="#00020A" />
          <rect x="2" y="-5" width="8" height="6" rx="1.5" fill="#FFFFFF" />
        </g>
      </g>

      {/* Timeline */}
      <g className="card">
        <rect x="420" y="40" width="180" height="250" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="440" y="72" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">Order #48213</text>
        <text x="440" y="90" fontFamily={F} fontSize="10" fill="#9093A1">2 parcels · 14 kg</text>
        <line x1="448" y1="114" x2="448" y2="216" stroke="#D9DAE0" strokeWidth="2" />
        <line className="prog" x1="448" y1="114" x2="448" y2="160" stroke="#E1013B" strokeWidth="2" />
        {steps.map((s, i) => (
          <g key={s.label} className="step">
            <circle className={`dot${i}`} cx="448" cy={114 + i * 51} r="7" fill={i < 2 ? "#E1013B" : "#FFFFFF"} stroke={i < 2 ? "#E1013B" : "#D9DAE0"} strokeWidth="2" />
            <text x="466" y={113 + i * 51} fontFamily={F} fontSize="12" fontWeight="600" fill="#00020A">{s.label}</text>
            <text x="466" y={128 + i * 51} fontFamily={F} fontSize="10" fill="#9093A1">{s.time}</text>
          </g>
        ))}
        <rect x="440" y="242" width="140" height="30" rx="7" fill="#F3F3F5" />
        <text x="510" y="261" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill="#00020A">Share tracking</text>
      </g>

      {/* ETA */}
      <g className="card">
        <rect x="420" y="310" width="180" height="130" rx="14" fill="#00020A" />
        <text x="440" y="340" fontFamily={F} fontSize="12" fill="#9093A1">Arriving</text>
        <text x="440" y="380" fontFamily={F} fontSize="32" fontWeight="700" fill="#FFFFFF">10:05</text>
        <text x="440" y="414" fontFamily={F} fontSize="11" fill="#D9DAE0">Van 14 · Driver Sam K.</text>
      </g>
    </svg>
  );
}
