"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const products = [
  { name: "Trail Runner", price: "£89" },
  { name: "Canvas Tote", price: "£34" },
  { name: "Field Jacket", price: "£120" },
];
const stock = [
  { size: "S", a: 0.72, b: 0.55 },
  { size: "M", a: 0.9, b: 0.62 },
  { size: "L", a: 0.48, b: 0.81 },
  { size: "XL", a: 0.25, b: 0.4 },
];

/** Storefront product cards, live stock levels and an order counter. */
export default function Retail({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);
      const count = svg.querySelector<SVGTextElement>(".orders")!;
      const n = { v: 0 };
      const show = () => void (count.textContent = Math.round(n.v).toLocaleString("en-US"));
      show();
      const bars = q(".bar");

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      stock.forEach((s, i) => {
        loop.to(bars[i], { attr: { width: 296 * s.b }, duration: 1.2, ease: "power2.inOut" }, i * 0.1);
        loop.to(bars[i], { attr: { width: 296 * s.a }, duration: 1.2, ease: "power2.inOut" }, 2.4 + i * 0.1);
      });
      loop
        .to(n, { v: 1285, duration: 0.4, ease: "none", onUpdate: show }, 0.6)
        .to(n, { v: 1287, duration: 0.6, ease: "none", onUpdate: show }, 2)
        .to(q(".cta1"), { fill: "#00020A", duration: 0.3, yoyo: true, repeat: 1 }, 1.4)
        .set(n, { v: 1284 }, 3.8);

      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 1.1 },
        onComplete: () => {
          started = true;
          loop.play();
        },
      });
      intro
        .from(q(".prod"), { y: 40, opacity: 0, stagger: 0.12 })
        .from(q(".card"), { y: 30, opacity: 0, stagger: 0.15 }, 0.3)
        .from(bars, { attr: { width: 0 }, stagger: 0.08, duration: 1.2, ease: "power3.out" }, 0.6)
        .to(n, { v: 1284, duration: 1.6, ease: "power3.out", onUpdate: show }, 0.5);

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Online store with products, stock levels and orders">
      {products.map((p, i) => {
        const x = 40 + i * 192;
        return (
          <g key={p.name} className="prod">
            <rect x={x} y="40" width="176" height="220" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
            <rect x={x + 12} y="52" width="152" height="112" rx="8" fill="#F3F3F5" />
            {i === 0 && <path d={`M${x + 42} 134 q4 -26 26 -30 l20 -14 q8 10 22 12 l20 6 q8 4 8 14 v12 z`} fill="#00020A" />}
            {i === 0 && <rect x={x + 42} y="134" width="96" height="8" rx="4" fill="#E1013B" />}
            {i === 1 && <path d={`M${x + 58} 88 h60 l8 60 h-76 z`} fill="#D9DAE0" />}
            {i === 1 && <path d={`M${x + 72} 88 v-10 a16 16 0 0 1 32 0 v10`} fill="none" stroke="#5D606C" strokeWidth="4" />}
            {i === 2 && <path d={`M${x + 56} 76 l20 -10 h24 l20 10 l14 30 l-14 6 v40 h-64 v-40 l-14 -6 z`} fill="#5D606C" />}
            {i === 2 && <line x1={x + 88} y1="70" x2={x + 88} y2="152" stroke="#D9DAE0" strokeWidth="2" />}
            <text x={x + 14} y="188" fontFamily={F} fontSize="13" fontWeight="600" fill="#00020A">{p.name}</text>
            <text x={x + 14} y="206" fontFamily={F} fontSize="12" fill="#5D606C">{p.price}</text>
            <rect className={i === 1 ? "cta1" : undefined} x={x + 14} y="218" width="148" height="30" rx="7" fill={i === 1 ? "#E1013B" : "#F3F3F5"} />
            <text x={x + 88} y="237" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill={i === 1 ? "#FFFFFF" : "#00020A"}>
              {i === 1 ? "Added to bag" : "Add to bag"}
            </text>
          </g>
        );
      })}

      {/* Stock levels */}
      <g className="card">
        <rect x="40" y="280" width="368" height="160" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="60" y="310" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">Stock levels</text>
        <text x="388" y="310" textAnchor="end" fontFamily={F} fontSize="11" fill="#9093A1">Trail Runner</text>
        {stock.map((s, i) => (
          <g key={s.size}>
            <text x="60" y={340 + i * 24} fontFamily={F} fontSize="11" fontWeight="600" fill="#5D606C">{s.size}</text>
            <rect x="92" y={331 + i * 24} width="296" height="10" rx="5" fill="#F3F3F5" />
            <rect className="bar" x="92" y={331 + i * 24} width={296 * s.a} height="10" rx="5" fill={s.a < 0.3 ? "#E1013B" : "#00020A"} />
          </g>
        ))}
      </g>

      {/* Orders */}
      <g className="card">
        <rect x="424" y="280" width="176" height="160" rx="14" fill="#00020A" />
        <text x="444" y="312" fontFamily={F} fontSize="12" fill="#9093A1">Orders today</text>
        <text className="orders" x="444" y="356" fontFamily={F} fontSize="32" fontWeight="700" fill="#FFFFFF">1,284</text>
        <circle cx="450" cy="400" r="4" fill="#E1013B" />
        <text x="462" y="404" fontFamily={F} fontSize="11" fill="#D9DAE0">12 in the last hour</text>
      </g>
    </svg>
  );
}
