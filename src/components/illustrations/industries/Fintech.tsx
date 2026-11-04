"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const tx = [
  { name: "Coffee Lab", meta: "Today, 08:14", amt: "-£3.40" },
  { name: "Salary", meta: "Yesterday", amt: "+£3,200.00" },
  { name: "Rent", meta: "1 May", amt: "-£1,150.00" },
  { name: "Fresh Grocer", meta: "30 Apr", amt: "-£42.18" },
];
const fmt = (v: number) => "£" + v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Bank card, counting balance, transactions list and a transfer toast. */
export default function Fintech({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);
      const bal = svg.querySelector<SVGTextElement>(".bal")!;
      const n = { v: 0 };
      bal.textContent = fmt(0);

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .to(q(".toast"), { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 0)
        .to(n, { v: 12230.5, duration: 0.9, ease: "power2.out", onUpdate: () => void (bal.textContent = fmt(n.v)) }, 0.2)
        .to(q(".row0"), { fill: "#F3F3F5", duration: 0.3 }, 0.2)
        .to(q(".row0"), { fill: "#FFFFFF", duration: 0.6 }, 1.2)
        .to(q(".toast"), { y: 30, opacity: 0, duration: 0.5, ease: "power3.in" }, 2.6)
        .to(n, { v: 12480.5, duration: 0.6, ease: "power2.out", onUpdate: () => void (bal.textContent = fmt(n.v)) }, 3);

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
        .from(q(".tx"), { x: 40, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.4)
        .to(n, { v: 12480.5, duration: 1.6, ease: "power3.out", onUpdate: () => void (bal.textContent = fmt(n.v)) }, 0.3)
        .from(q(".toast"), { y: 30, opacity: 0, duration: 0.8 }, 1.1)
        .to(q(".toast"), { y: 30, opacity: 0, duration: 0.5, ease: "power3.in" }, 2.2);

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Banking app with card, balance, transactions and transfer confirmation">
      {/* Bank card */}
      <g className="card">
        <rect x="40" y="60" width="280" height="172" rx="16" fill="#00020A" />
        <polygon points="320,190 320,232 278,232" fill="#E1013B" />
        <text x="62" y="96" fontFamily={F} fontSize="14" fontWeight="700" fill="#FFFFFF">Ledger</text>
        <text x="298" y="96" textAnchor="end" fontFamily={F} fontSize="11" fill="#9093A1">Debit</text>
        <rect x="62" y="116" width="40" height="30" rx="5" fill="#D9DAE0" />
        <line x1="62" y1="131" x2="102" y2="131" stroke="#9093A1" />
        <line x1="82" y1="116" x2="82" y2="146" stroke="#9093A1" />
        <text x="62" y="186" fontFamily={F} fontSize="16" fontWeight="600" letterSpacing="2" fill="#FFFFFF">•••• •••• •••• 4821</text>
        <text x="62" y="212" fontFamily={F} fontSize="11" fill="#9093A1">M. ORTIZ</text>
        <text x="190" y="212" fontFamily={F} fontSize="11" fill="#9093A1">09/29</text>
      </g>

      {/* Balance */}
      <g className="card">
        <rect x="40" y="256" width="280" height="164" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="62" y="290" fontFamily={F} fontSize="12" fill="#5D606C">Available balance</text>
        <text className="bal" x="62" y="326" fontFamily={F} fontSize="28" fontWeight="700" fill="#00020A">£12,480.50</text>
        {["Send", "Request", "Top up"].map((l, i) => (
          <g key={l}>
            <rect x={62 + i * 80} y="356" width="72" height="36" rx="8" fill={i === 0 ? "#E1013B" : "#F3F3F5"} />
            <text x={98 + i * 80} y="379" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="600" fill={i === 0 ? "#FFFFFF" : "#00020A"}>{l}</text>
          </g>
        ))}
      </g>

      {/* Transactions */}
      <g className="card">
        <rect x="344" y="60" width="256" height="272" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="364" y="94" fontFamily={F} fontSize="15" fontWeight="700" fill="#00020A">Recent activity</text>
        <text x="580" y="94" textAnchor="end" fontFamily={F} fontSize="11" fill="#E1013B">See all</text>
        {tx.map((t, i) => (
          <g key={t.name} className="tx">
            <rect className={`row${i}`} x="352" y={110 + i * 54} width="240" height="48" rx="8" fill="#FFFFFF" />
            <rect x="364" y={120 + i * 54} width="28" height="28" rx="7" fill="#F3F3F5" />
            <text x="378" y={139 + i * 54} textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="700" fill="#5D606C">{t.name[0]}</text>
            <text x="404" y={132 + i * 54} fontFamily={F} fontSize="13" fontWeight="600" fill="#00020A">{t.name}</text>
            <text x="404" y={149 + i * 54} fontFamily={F} fontSize="10" fill="#9093A1">{t.meta}</text>
            <text x="580" y={139 + i * 54} textAnchor="end" fontFamily={F} fontSize="13" fontWeight="600" fill={t.amt.startsWith("+") ? "#E1013B" : "#00020A"}>{t.amt}</text>
          </g>
        ))}
      </g>

      {/* Toast */}
      <g className="toast">
        <rect x="344" y="356" width="256" height="64" rx="12" fill="#00020A" />
        <circle cx="374" cy="388" r="13" fill="#E1013B" />
        <path d="M368 388 l4 4 l8 -9" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="398" y="383" fontFamily={F} fontSize="13" fontWeight="700" fill="#FFFFFF">Transfer sent ✓</text>
        <text x="398" y="401" fontFamily={F} fontSize="11" fill="#9093A1">£250.00 to J. Patel</text>
      </g>
    </svg>
  );
}
