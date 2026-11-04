"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const nodes = [
  { id: "ERP", sub: "Orders · stock", x: 40, y: 60 },
  { id: "CRM", sub: "Accounts · deals", x: 450, y: 60 },
  { id: "Warehouse", sub: "Picks · shipments", x: 40, y: 340 },
  { id: "Finance", sub: "Invoices · ledger", x: 450, y: 340 },
];
const paths = [
  "M190 100 C 250 100, 250 200, 262 222",
  "M450 100 C 390 100, 390 200, 378 222",
  "M190 380 C 250 380, 250 280, 262 258",
  "M450 380 C 390 380, 390 280, 378 258",
];

/** Enterprise: four systems connected through one integration hub, with data moving between them. */
export default function Enterprise({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray<SVGPathElement>(".e-link", svg);
      links.forEach((p) => {
        const l = p.getTotalLength();
        gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
      });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(".e-hub", { scale: 0.6, opacity: 0, transformOrigin: "50% 50%", duration: 1 })
        .from(".e-node", { y: 20, opacity: 0, stagger: 0.1, duration: 0.9 }, "-=0.6")
        .to(".e-link", { strokeDashoffset: 0, stagger: 0.1, duration: 0.9, ease: "power2.inOut" }, "-=0.5");

      // Packets travel along each connector toward the hub, then the approval pops.
      const packets = gsap.utils.toArray<SVGCircleElement>(".e-packet", svg);
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      packets.forEach((dot, i) => {
        const path = links[i];
        const len = path.getTotalLength();
        const o = { t: 0 };
        loop.fromTo(
          o,
          { t: 0 },
          {
            t: 1,
            duration: 1.1,
            ease: "power1.inOut",
            onStart: () => void gsap.set(dot, { opacity: 1 }),
            onUpdate: () => {
              const p = path.getPointAtLength(o.t * len);
              dot.setAttribute("cx", String(p.x));
              dot.setAttribute("cy", String(p.y));
            },
            onComplete: () => void gsap.set(dot, { opacity: 0 }),
          },
          i * 0.35,
        );
      });
      loop
        .to(".e-hub-ring", { scale: 1.12, transformOrigin: "50% 50%", duration: 0.25, yoyo: true, repeat: 1 }, "-=0.2")
        .fromTo(".e-approve", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" })
        .to(".e-approve", { opacity: 0, duration: 0.4 }, "+=1.8");

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Workflow connecting ERP, CRM, warehouse and finance systems through one hub">
      {paths.map((d) => (
        <path key={d} className="e-link" d={d} fill="none" stroke="#9093A1" strokeWidth="2" />
      ))}

      {nodes.map((n) => (
        <g key={n.id} className="e-node" fontFamily={F}>
          <rect x={n.x} y={n.y} width="150" height="80" rx="10" fill="#FFFFFF" stroke="#D9DAE0" strokeWidth="1.5" />
          <rect x={n.x + 14} y={n.y + 16} width="22" height="22" rx="6" fill="#F3F3F5" />
          <rect x={n.x + 20} y={n.y + 22} width="10" height="10" rx="2" fill="#00020A" />
          <text x={n.x + 46} y={n.y + 32} fontSize="13" fontWeight="700" fill="#00020A">{n.id}</text>
          <text x={n.x + 14} y={n.y + 60} fontSize="10.5" fill="#5D606C">{n.sub}</text>
          <circle cx={n.x + 136} cy={n.y + 16} r="4" fill="#9093A1" />
        </g>
      ))}

      <g className="e-hub" fontFamily={F}>
        <rect className="e-hub-ring" x="250" y="200" width="140" height="80" rx="12" fill="#00020A" />
        <text x="320" y="234" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#FFFFFF">Integration hub</text>
        <text x="320" y="254" textAnchor="middle" fontSize="10" fill="#9093A1">1,284 events today</text>
      </g>

      {paths.map((d) => (
        <circle key={`p-${d}`} className="e-packet" r="5" cx="-20" cy="-20" fill="#E1013B" opacity="0" />
      ))}

      <g className="e-approve" opacity="0" fontFamily={F}>
        <rect x="230" y="296" width="180" height="58" rx="10" fill="#FFFFFF" stroke="#E1013B" strokeWidth="1.5" />
        <circle cx="254" cy="325" r="11" fill="#E1013B" />
        <path d="M249 325l4 4 7-8" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="274" y="321" fontSize="12" fontWeight="700" fill="#00020A">Approved</text>
        <text x="274" y="337" fontSize="10" fill="#5D606C">PO-2291 · $12,400</text>
      </g>
    </svg>
  );
}
