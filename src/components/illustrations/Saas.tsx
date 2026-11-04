"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const seats = ["MK", "AJ", "SL", "RP"];

/** SaaS: multi-panel dashboard with an MRR chart, a billing card and team seats. */
export default function Saas({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const line = svg.querySelector<SVGPathElement>(".s-line");
      const len = line?.getTotalLength() ?? 400;
      gsap.set(".s-line", { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(".s-area", { opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(".s-panel", { y: 30, opacity: 0, stagger: 0.12, duration: 1 })
        .to(".s-line", { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, "-=0.6")
        .to(".s-area", { opacity: 1, duration: 0.8 }, "-=0.6")
        .from(".s-seat", { scale: 0, transformOrigin: "50% 50%", stagger: 0.07, duration: 0.6, ease: "back.out(2)" }, "-=1")
        .from(".s-bar", { scaleX: 0, transformOrigin: "0% 50%", duration: 1, ease: "power3.out" }, "-=0.8");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .to(".s-line", { strokeDashoffset: len, duration: 0.01 })
        .to(".s-area", { opacity: 0, duration: 0.3 }, "<")
        .to(".s-line", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })
        .to(".s-area", { opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(".s-seat-new", { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.2")
        .fromTo(".s-tip", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" }, "<")
        .to(".s-tip", { opacity: 0, duration: 0.4 }, "+=1.6")
        .to(".s-seat-new", { scale: 0, opacity: 0, duration: 0.3 }, "<");

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="SaaS dashboard with revenue chart, billing plan and team seats">
      <defs>
        <linearGradient id="saas-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E1013B" stopOpacity="0.18" />
          <stop offset="1" stopColor="#E1013B" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* MRR panel */}
      <g className="s-panel" fontFamily={F}>
        <rect x="28" y="40" width="376" height="260" rx="10" fill="#FFFFFF" stroke="#D9DAE0" strokeWidth="1.5" />
        <text x="50" y="74" fontSize="11" fill="#9093A1">Monthly recurring revenue</text>
        <text x="50" y="104" fontSize="26" fontWeight="700" fill="#00020A">$84,320</text>
        <rect x="186" y="86" width="56" height="20" rx="10" fill="#F3F3F5" />
        <text x="214" y="100" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#00020A">+12.4%</text>
        {[150, 190, 230, 270].map((y) => (
          <line key={y} x1="50" x2="382" y1={y} y2={y} stroke="#F3F3F5" strokeWidth="1.5" />
        ))}
        <path className="s-area" d="M50 262 L98 248 L146 252 L194 220 L242 226 L290 184 L338 176 L382 140 L382 270 L50 270Z" fill="url(#saas-fill)" />
        <path className="s-line" d="M50 262 L98 248 L146 252 L194 220 L242 226 L290 184 L338 176 L382 140" fill="none" stroke="#E1013B" strokeWidth="2.5" strokeLinejoin="round" />
        {["Jan", "Mar", "May", "Jul", "Sep"].map((m, i) => (
          <text key={m} x={50 + i * 83} y="290" fontSize="9.5" fill="#9093A1">{m}</text>
        ))}
        <g className="s-tip" opacity="0">
          <rect x="300" y="108" width="82" height="24" rx="6" fill="#00020A" />
          <text x="341" y="124" textAnchor="middle" fontSize="10" fill="#FFFFFF">Sep · $84.3k</text>
        </g>
      </g>

      {/* Billing panel */}
      <g className="s-panel" fontFamily={F}>
        <rect x="420" y="40" width="192" height="160" rx="10" fill="#00020A" />
        <text x="440" y="70" fontSize="10.5" fill="#9093A1">Current plan</text>
        <text x="440" y="96" fontSize="18" fontWeight="700" fill="#FFFFFF">Pro plan</text>
        <text x="440" y="116" fontSize="12" fill="#D9DAE0">$49/mo per workspace</text>
        <text x="440" y="146" fontSize="10" fill="#9093A1">API usage · 72%</text>
        <rect x="440" y="154" width="152" height="6" rx="3" fill="#5D606C" />
        <rect className="s-bar" x="440" y="154" width="110" height="6" rx="3" fill="#E1013B" />
        <rect x="440" y="172" width="70" height="16" rx="8" fill="#FFFFFF" />
        <text x="475" y="183.5" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#00020A">Upgrade</text>
      </g>

      {/* Seats panel */}
      <g className="s-panel" fontFamily={F}>
        <rect x="420" y="214" width="192" height="86" rx="10" fill="#FFFFFF" stroke="#D9DAE0" strokeWidth="1.5" />
        <text x="440" y="240" fontSize="10.5" fill="#9093A1">Seats · 5 of 10</text>
        {seats.map((s, i) => (
          <g key={s} className="s-seat">
            <circle cx={454 + i * 26} cy="270" r="14" fill={i === 0 ? "#00020A" : "#D9DAE0"} stroke="#FFFFFF" strokeWidth="2" />
            <text x={454 + i * 26} y="274" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={i === 0 ? "#FFFFFF" : "#00020A"}>
              {s}
            </text>
          </g>
        ))}
        <g className="s-seat-new" opacity="0">
          <circle cx="558" cy="270" r="14" fill="#E1013B" stroke="#FFFFFF" strokeWidth="2" />
          <text x="558" y="274" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#FFFFFF">DN</text>
        </g>
      </g>

      {/* Tenants table */}
      <g className="s-panel" fontFamily={F} fontSize="11">
        <rect x="28" y="316" width="584" height="132" rx="10" fill="#FFFFFF" stroke="#D9DAE0" strokeWidth="1.5" />
        <text x="50" y="344" fontSize="12" fontWeight="700" fill="#00020A">Workspaces</text>
        <text x="590" y="344" textAnchor="end" fill="#9093A1">218 active</text>
        {[
          ["Harlow Ltd", "Pro", "12 seats", "$588"],
          ["Brightway", "Team", "4 seats", "$196"],
          ["Okafor & Co", "Pro", "9 seats", "$441"],
        ].map((r, i) => (
          <g key={r[0]}>
            <line x1="50" x2="590" y1={358 + i * 28} y2={358 + i * 28} stroke="#F3F3F5" strokeWidth="1.5" />
            <text x="50" y={377 + i * 28} fontWeight="600" fill="#00020A">{r[0]}</text>
            <text x="230" y={377 + i * 28} fill="#5D606C">{r[1]}</text>
            <text x="350" y={377 + i * 28} fill="#5D606C">{r[2]}</text>
            <text x="590" y={377 + i * 28} textAnchor="end" fontWeight="600" fill="#00020A">{r[3]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
