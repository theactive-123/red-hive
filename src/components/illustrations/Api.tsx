"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const HUB = { x: 320, y: 220 };
const nodes = [
  { label: "Stripe", x: 40, y: 58 },
  { label: "CRM", x: 40, y: 198 },
  { label: "Email", x: 40, y: 338 },
  { label: "Maps", x: 490, y: 58 },
  { label: "Mobile app", x: 490, y: 198 },
];
const W = 110;
const H = 44;
const anchor = (n: { x: number; y: number }) => ({ x: n.x < HUB.x ? n.x + W : n.x, y: n.y + H / 2 });

/** APIs & integrations: one hub API talking to five services, packets flowing both ways. */
export default function Api({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGLineElement>(".ap-line");
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1 } });
      intro
        .from(".ap-hub", { scale: 0.6, opacity: 0, transformOrigin: "center", ease: "back.out(1.8)" })
        .from(".ap-node", { opacity: 0, x: (i: number) => (nodes[i].x < HUB.x ? -30 : 30), stagger: 0.1 }, "-=0.7");
      lines.forEach((l) => {
        const len = Math.hypot(+l.getAttribute("x2")! - +l.getAttribute("x1")!, +l.getAttribute("y2")! - +l.getAttribute("y1")!);
        intro.fromTo(l, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" }, "-=0.5");
      });
      intro.from(".ap-json", { y: 24, opacity: 0 }, "-=0.4");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      nodes.forEach((n, i) => {
        const a = anchor(n);
        loop.fromTo(
          `.ap-pkt-${i}`,
          { attr: { cx: HUB.x, cy: HUB.y }, opacity: 1 },
          { attr: { cx: a.x, cy: a.y }, duration: 0.7, ease: "power1.inOut", yoyo: true, repeat: 1 },
          i * 0.25,
        );
      });
      loop
        .set(".ap-pkt", { opacity: 0 })
        .fromTo(".ap-status", { fill: "#FFFFFF" }, { fill: "#E1013B", duration: 0.4 }, "-=0.3")
        .fromTo(".ap-hub", { scale: 1 }, { scale: 1.04, transformOrigin: "center", duration: 0.2, yoyo: true, repeat: 1 }, "<");

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Central API connected to Stripe, CRM, email, maps and a mobile app">
      {nodes.map((n, i) => {
        const a = anchor(n);
        return <line key={`l${i}`} className="ap-line" x1={HUB.x} y1={HUB.y} x2={a.x} y2={a.y} stroke="#D9DAE0" strokeWidth="2" />;
      })}

      <g className="ap-hub">
        <rect x={HUB.x - 74} y={HUB.y - 52} width="148" height="104" rx="16" fill="#00020A" />
        <text x={HUB.x} y={HUB.y + 4} textAnchor="middle" fontFamily={F} fontSize="26" fontWeight="800" fill="#FFFFFF">API</text>
        <text x={HUB.x} y={HUB.y + 26} textAnchor="middle" fontFamily={F} fontSize="11" fill="#9093A1">/v1 · 38 endpoints</text>
        <rect x={HUB.x + 46} y={HUB.y - 40} width="16" height="6" rx="3" fill="#E1013B" />
      </g>

      {nodes.map((n, i) => (
        <circle key={`p${i}`} className={`ap-pkt ap-pkt-${i}`} cx={HUB.x} cy={HUB.y} r="6" fill="#E1013B" opacity="0" />
      ))}

      {nodes.map((n) => (
        <g key={n.label} className="ap-node">
          <rect x={n.x} y={n.y} width={W} height={H} rx="10" fill="#FFFFFF" stroke="#D9DAE0" />
          <rect x={n.x + 12} y={n.y + 14} width="16" height="16" rx="4" fill={n.label === "Stripe" ? "#E1013B" : "#F3F3F5"} stroke="#9093A1" strokeWidth={n.label === "Stripe" ? 0 : 1} />
          <text x={n.x + 36} y={n.y + 27} fontFamily={F} fontSize="13" fontWeight="600" fill="#00020A">{n.label}</text>
        </g>
      ))}

      <g className="ap-json">
        <rect x="400" y="300" width="212" height="132" rx="12" fill="#00020A" />
        <text x="418" y="326" fontFamily={F} fontSize="11" fill="#9093A1">POST /v1/orders</text>
        <text x="418" y="352" fontFamily={F} fontSize="13" fill="#FFFFFF">{"{"}</text>
        <text x="434" y="372" fontFamily={F} fontSize="13" fill="#FFFFFF">
          &quot;status&quot;: <tspan className="ap-status" fontWeight="700" fill="#E1013B">200</tspan>,
        </text>
        <text x="434" y="392" fontFamily={F} fontSize="13" fill="#D9DAE0">&quot;id&quot;: &quot;ord_9F2K&quot;</text>
        <text x="418" y="412" fontFamily={F} fontSize="13" fill="#FFFFFF">{"}"}</text>
      </g>
    </svg>
  );
}
