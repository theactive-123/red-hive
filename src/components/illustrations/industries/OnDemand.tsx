"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const stages = ["Order placed", "Preparing", "On the way", "Delivered"];
const NODES = [80, 213, 346, 479];

/** Customer, courier and store apps linked by one order moving between them. */
export default function OnDemand({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);
      const label = svg.querySelector<SVGTextElement>(".tok-label")!;
      const links = svg.querySelectorAll<SVGPathElement>(".link");
      links.forEach((l) => gsap.set(l, { strokeDasharray: "4 6", strokeDashoffset: 0 }));

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      NODES.forEach((x, i) => {
        loop.to(q(".token"), { x: x - NODES[0], duration: i ? 0.9 : 0.01, ease: "power2.inOut" }, i * 1.3);
        loop.call(() => void (label.textContent = stages[i]), [], i * 1.3 + (i ? 0.45 : 0));
        loop.to(q(`.node${i}`), { fill: "#E1013B", duration: 0.3 }, i * 1.3 + (i ? 0.8 : 0));
      });
      loop.to(links, { strokeDashoffset: -40, duration: 5.2, ease: "none" }, 0);
      loop.set(q(".node1, .node2, .node3"), { fill: "#D9DAE0" }, 5.4);

      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 1.1 },
        onComplete: () => {
          started = true;
          loop.play();
        },
      });
      intro
        .from(q(".panel"), { y: 40, opacity: 0, stagger: 0.15 })
        .from(links, { opacity: 0, duration: 0.6, stagger: 0.1 }, 0.6)
        .from(q(".track, .token"), { opacity: 0, y: 12, duration: 0.7 }, 0.8)
        .from(q(".eta"), { x: 30, opacity: 0, duration: 0.8 }, 1);

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

  const panel = (x: number, title: string, body: React.ReactNode) => (
    <g className="panel">
      <rect x={x} y="40" width="176" height="300" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
      <rect x={x} y="40" width="176" height="40" rx="14" fill="#00020A" />
      <rect x={x} y="66" width="176" height="14" fill="#00020A" />
      <text x={x + 16} y="65" fontFamily={F} fontSize="12" fontWeight="700" fill="#FFFFFF">{title}</text>
      {body}
    </g>
  );

  return (
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="On-demand delivery: customer, courier and store apps sharing one order">
      {panel(
        24,
        "Customer",
        <>
          <text x="40" y="106" fontFamily={F} fontSize="13" fontWeight="700" fill="#00020A">Order #2041</text>
          {["2x Chicken wrap", "1x Lemonade", "Delivery fee"].map((t, i) => (
            <text key={t} x="40" y={134 + i * 24} fontFamily={F} fontSize="11" fill="#5D606C">{t}</text>
          ))}
          <line x1="40" y1="206" x2="184" y2="206" stroke="#D9DAE0" />
          <text x="40" y="228" fontFamily={F} fontSize="12" fontWeight="700" fill="#00020A">Total</text>
          <text x="184" y="228" textAnchor="end" fontFamily={F} fontSize="12" fontWeight="700" fill="#00020A">AED 46</text>
          <rect x="40" y="290" width="144" height="34" rx="8" fill="#F3F3F5" />
          <text x="112" y="311" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill="#00020A">Track order</text>
        </>,
      )}
      {panel(
        232,
        "Courier",
        <>
          <rect x="246" y="94" width="148" height="110" rx="8" fill="#F3F3F5" />
          <path d="M246 140 H394 M300 94 V204" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M262 186 L300 140 L372 140 L372 110" fill="none" stroke="#E1013B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="262" cy="186" r="5" fill="#00020A" />
          <text x="248" y="230" fontFamily={F} fontSize="13" fontWeight="700" fill="#00020A">Pickup in 4 min</text>
          <text x="248" y="248" fontFamily={F} fontSize="11" fill="#5D606C">Al Reef Grill · 1.2 km</text>
          <rect x="248" y="290" width="144" height="34" rx="8" fill="#00020A" />
          <text x="320" y="311" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill="#FFFFFF">Arrived at store</text>
        </>,
      )}
      {panel(
        440,
        "Store",
        <>
          <rect x="456" y="94" width="144" height="96" rx="8" fill="#F3F3F5" />
          <text x="468" y="118" fontFamily={F} fontSize="12" fontWeight="700" fill="#00020A">New order</text>
          <text x="468" y="138" fontFamily={F} fontSize="11" fill="#5D606C">#2041 · 3 items</text>
          <text x="468" y="174" fontFamily={F} fontSize="20" fontWeight="700" fill="#00020A">05:42</text>
          <text x="456" y="230" fontFamily={F} fontSize="11" fill="#5D606C">Prep time</text>
          <rect x="456" y="240" width="144" height="6" rx="3" fill="#F3F3F5" />
          <rect x="456" y="240" width="92" height="6" rx="3" fill="#00020A" />
          <rect x="456" y="290" width="144" height="34" rx="8" fill="#E1013B" />
          <text x="528" y="311" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill="#FFFFFF">Accept</text>
        </>,
      )}
      <path className="link" d="M200 190 H232" stroke="#9093A1" strokeWidth="2" />
      <path className="link" d="M408 190 H440" stroke="#9093A1" strokeWidth="2" />

      {/* Status track */}
      <g className="track">
        <line x1={NODES[0]} y1="396" x2={NODES[3]} y2="396" stroke="#D9DAE0" strokeWidth="3" />
        {NODES.map((x, i) => (
          <circle key={x} className={`node${i}`} cx={x} cy="396" r="7" fill={i < 2 ? "#E1013B" : "#D9DAE0"} />
        ))}
      </g>
      <g className="token" transform={`translate(${NODES[1] - NODES[0]} 0)`}>
        <rect x={NODES[0] - 48} y="414" width="96" height="26" rx="13" fill="#00020A" />
        <text className="tok-label" x={NODES[0]} y="431" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="600" fill="#FFFFFF">Preparing</text>
      </g>
      <g className="eta">
        <rect x="528" y="370" width="88" height="70" rx="12" fill="#E1013B" />
        <text x="572" y="396" textAnchor="middle" fontFamily={F} fontSize="11" fill="#FFFFFF">ETA</text>
        <text x="572" y="424" textAnchor="middle" fontFamily={F} fontSize="18" fontWeight="700" fill="#FFFFFF">12 min</text>
      </g>
    </svg>
  );
}
