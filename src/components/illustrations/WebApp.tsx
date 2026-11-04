"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const rows = [
  ["#1038", "Harlow Ltd", "Paid", "$1,240"],
  ["#1039", "Brightway", "Pending", "$860"],
  ["#1040", "Okafor & Co", "Paid", "$2,115"],
  ["#1041", "Nordline", "Shipped", "$540"],
];

/** Web app: browser dashboard, rows fill in, cursor clicks "New order", toast confirms. */
export default function WebApp({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(".w-win", { y: 30, opacity: 0, duration: 1 })
        .from(".w-side > *", { x: -16, opacity: 0, stagger: 0.06, duration: 0.8 }, "-=0.6")
        .from(".w-head", { y: -10, opacity: 0, duration: 0.7 }, "-=0.6")
        .from(".w-row", { x: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".w-cursor", { x: 120, y: 160, opacity: 0, duration: 0.9 }, "-=0.4");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .to(".w-cursor", { x: 0, y: 0, duration: 0.01 })
        .to(".w-cursor", { x: -70, y: -170, duration: 1, ease: "power2.inOut" })
        .to(".w-btn", { scale: 0.92, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 })
        .fromTo(".w-new", { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" })
        .fromTo(".w-toast", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" }, "<")
        .to(".w-cursor", { x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, "+=0.4")
        .to(".w-toast", { y: 40, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.6")
        .to(".w-new", { opacity: 0, duration: 0.4 }, "<");

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Web application dashboard with an orders table">
      <g className="w-win">
        <rect x="30" y="40" width="580" height="400" rx="10" fill="#FFFFFF" stroke="#D9DAE0" strokeWidth="1.5" />
        <path d="M30 50a10 10 0 0 1 10-10h560a10 10 0 0 1 10 10v22H30z" fill="#F3F3F5" />
        <circle cx="48" cy="56" r="4.5" fill="#D9DAE0" />
        <circle cx="62" cy="56" r="4.5" fill="#D9DAE0" />
        <circle cx="76" cy="56" r="4.5" fill="#D9DAE0" />
        <rect x="200" y="48" width="240" height="16" rx="8" fill="#FFFFFF" />
        <text x="320" y="60" textAnchor="middle" fontFamily={F} fontSize="10" fill="#9093A1">app.yourcompany.com/orders</text>
        <rect x="30" y="72" width="130" height="368" fill="#F3F3F5" />
      </g>
      <g className="w-side" fontFamily={F} fontSize="12">
        <rect x="46" y="90" width="14" height="14" rx="3" fill="#00020A" />
        <text x="68" y="101" fontWeight="700" fill="#00020A">Northdesk</text>
        <text x="48" y="140" fill="#9093A1">Overview</text>
        <rect x="40" y="152" width="112" height="26" rx="6" fill="#FFFFFF" />
        <text x="48" y="169" fontWeight="600" fill="#00020A">Orders</text>
        <text x="48" y="200" fill="#9093A1">Customers</text>
        <text x="48" y="226" fill="#9093A1">Inventory</text>
        <text x="48" y="252" fill="#9093A1">Reports</text>
        <text x="48" y="278" fill="#9093A1">Settings</text>
      </g>
      <g className="w-head" fontFamily={F}>
        <text x="184" y="108" fontSize="18" fontWeight="700" fill="#00020A">Orders</text>
        <text x="184" y="126" fontSize="11" fill="#9093A1">142 this month · $48,210</text>
        <g className="w-btn">
          <rect x="488" y="92" width="102" height="30" rx="6" fill="#E1013B" />
          <text x="539" y="111" textAnchor="middle" fontSize="12" fontWeight="600" fill="#FFFFFF">+ New order</text>
        </g>
      </g>
      <g fontFamily={F} fontSize="11">
        <g className="w-row">
          <rect x="184" y="146" width="406" height="28" rx="6" fill="#F3F3F5" />
          <text x="196" y="164" fill="#5D606C">Order</text>
          <text x="262" y="164" fill="#5D606C">Customer</text>
          <text x="400" y="164" fill="#5D606C">Status</text>
          <text x="578" y="164" textAnchor="end" fill="#5D606C">Total</text>
        </g>
        <g className="w-new" opacity="0">
          <rect x="184" y="180" width="406" height="34" rx="6" fill="#FFFFFF" stroke="#E1013B" strokeWidth="1.5" />
          <text x="196" y="201" fontWeight="600" fill="#00020A">#1042</text>
          <text x="262" y="201" fill="#00020A">Maple Studio</text>
          <text x="400" y="201" fill="#E1013B" fontWeight="600">New</text>
          <text x="578" y="201" textAnchor="end" fontWeight="600" fill="#00020A">$3,400</text>
        </g>
        {rows.map((r, i) => (
          <g key={r[0]} className="w-row" transform={`translate(0 ${i * 42})`}>
            <line x1="184" x2="590" y1="256" y2="256" stroke="#D9DAE0" strokeWidth="1" />
            <text x="196" y="241" fontWeight="600" fill="#00020A">{r[0]}</text>
            <text x="262" y="241" fill="#00020A">{r[1]}</text>
            <rect x="396" y="229" width={r[2].length * 7 + 14} height="18" rx="9" fill={r[2] === "Pending" ? "#F3F3F5" : "#D9DAE0"} />
            <text x="403" y="242" fill="#00020A">{r[2]}</text>
            <text x="578" y="241" textAnchor="end" fill="#00020A">{r[3]}</text>
          </g>
        ))}
      </g>
      <g className="w-toast" opacity="0" fontFamily={F}>
        <rect x="388" y="388" width="202" height="36" rx="8" fill="#00020A" />
        <circle cx="406" cy="406" r="7" fill="#E1013B" />
        <path d="M402.5 406l2.5 2.5 4.5-5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
        <text x="422" y="410" fontSize="11.5" fill="#FFFFFF">Order #1042 created</text>
      </g>
      <g className="w-cursor" transform="translate(0 0)">
        <path d="M600 280l0 22 6-6 5 11 4-2-5-11 8 0z" fill="#00020A" stroke="#FFFFFF" strokeWidth="1.5" transform="translate(0 0)" />
      </g>
    </svg>
  );
}
