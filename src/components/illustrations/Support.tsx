"use client";

import { useEffect, useId, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const INCIDENT = 21;
const pts = [12, 30, 22, 38, 26, 44, 34, 30, 52, 40, 36, 28, 34, 24, 30, 20];
const linePath = pts.map((p, i) => `${i ? "L" : "M"}${64 + i * 19} ${400 - p * 1.6}`).join(" ");

/** Maintenance & support: uptime strip, response-time chart, incident alert and current release. */
export default function Support({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const grad = `sp-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const line = svg.querySelector<SVGPathElement>(".sp-line");
      const len = line?.getTotalLength() ?? 400;
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1 } });
      intro
        .from(".sp-card", { y: 26, opacity: 0, stagger: 0.12 })
        .from(".sp-bar", { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.02, duration: 0.5, ease: "power3.out" }, "-=0.8")
        .fromTo(".sp-line", { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.6")
        .from(".sp-area", { opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".sp-alert", { x: 30, opacity: 0, ease: "back.out(1.6)", duration: 0.7 }, "-=0.6");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .fromTo(".sp-line", { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" })
        .fromTo(".sp-incident", { scaleY: 1 }, { scaleY: 1.25, transformOrigin: "50% 100%", duration: 0.25, yoyo: true, repeat: 3 }, "-=0.4")
        .fromTo(".sp-alert", { scale: 1 }, { scale: 1.04, transformOrigin: "center", duration: 0.2, yoyo: true, repeat: 1 })
        .fromTo(".sp-live", { opacity: 1 }, { opacity: 0.2, duration: 0.5, yoyo: true, repeat: 3 }, "<");

      let done = false;
      intro.eventCallback("onComplete", () => {
        done = true;
        loop.play();
      });
      ScrollTrigger.create({ trigger: svg, start: "top 85%", once: true, onEnter: () => void intro.play() });
      io = new IntersectionObserver(([e]) => {
        if (!done) return;
        if (e.isIntersecting) loop.play();
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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Uptime monitor with response-time chart, a resolved incident and the current release">
      <defs>
        <linearGradient id={grad} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E1013B" stopOpacity="0.16" />
          <stop offset="1" stopColor="#E1013B" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="sp-card">
        <rect x="36" y="36" width="568" height="150" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <circle className="sp-live" cx="60" cy="66" r="5" fill="#E1013B" />
        <text x="74" y="70" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">Uptime · last 30 days</text>
        <text x="580" y="72" textAnchor="end" fontFamily={F} fontSize="18" fontWeight="800" fill="#00020A">99.98%</text>
        {Array.from({ length: 30 }, (_, i) => (
          <rect
            key={i}
            className={`sp-bar ${i === INCIDENT ? "sp-incident" : ""}`}
            x={64 + i * 17.2}
            y={i === INCIDENT ? 110 : 96}
            width="12"
            height={i === INCIDENT ? 40 : 54}
            rx="3"
            fill={i === INCIDENT ? "#E1013B" : i % 7 === 3 ? "#5D606C" : "#00020A"}
          />
        ))}
        <text x="64" y="170" fontFamily={F} fontSize="10" fill="#9093A1">30 days ago</text>
        <text x="580" y="170" textAnchor="end" fontFamily={F} fontSize="10" fill="#9093A1">Today</text>
      </g>

      <g className="sp-card">
        <rect x="36" y="206" width="360" height="236" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="60" y="238" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">Response time</text>
        <text x="372" y="238" textAnchor="end" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">142 ms</text>
        <text x="60" y="256" fontFamily={F} fontSize="10" fill="#9093A1">p95 · all regions</text>
        {[0, 1, 2, 3].map((r) => (
          <line key={r} x1="60" x2="372" y1={290 + r * 36} y2={290 + r * 36} stroke="#F3F3F5" />
        ))}
        <path className="sp-area" d={`${linePath} L${64 + 15 * 19} 410 L64 410 Z`} fill={`url(#${grad})`} />
        <path className="sp-line" d={linePath} fill="none" stroke="#E1013B" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <text x="60" y="430" fontFamily={F} fontSize="10" fill="#9093A1">09:00</text>
        <text x="372" y="430" textAnchor="end" fontFamily={F} fontSize="10" fill="#9093A1">15:00</text>
      </g>

      <g className="sp-alert sp-card">
        <rect x="414" y="206" width="190" height="104" rx="14" fill="#00020A" />
        <circle cx="436" cy="234" r="6" fill="#E1013B" />
        <path d="M433 234l2 2 4-4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <text x="448" y="238" fontFamily={F} fontSize="11" fontWeight="600" fill="#FFFFFF">Incident resolved · 4 min</text>
        <text x="432" y="266" fontFamily={F} fontSize="11" fill="#9093A1">Checkout API latency</text>
        <text x="432" y="286" fontFamily={F} fontSize="11" fill="#9093A1">Rolled back · on-call: Sam</text>
      </g>

      <g className="sp-card">
        <rect x="414" y="326" width="190" height="116" rx="14" fill="#F3F3F5" />
        <text x="432" y="354" fontFamily={F} fontSize="11" fill="#5D606C">Deployed to production</text>
        <text x="432" y="386" fontFamily={F} fontSize="24" fontWeight="800" fill="#00020A">v2.14.1</text>
        <text x="432" y="414" fontFamily={F} fontSize="11" fill="#9093A1">Today 09:12</text>
        <rect x="530" y="400" width="56" height="22" rx="11" fill="#E1013B" />
        <text x="558" y="415" textAnchor="middle" fontFamily={F} fontSize="10" fontWeight="700" fill="#FFFFFF">Latest</text>
      </g>
    </svg>
  );
}
