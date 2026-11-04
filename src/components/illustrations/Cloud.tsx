"use client";

import { useEffect, useId, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const stages = ["Build", "Test", "Deploy"];

/** Cloud & DevOps: git push in a terminal, a CI pipeline and containers scaling out. */
export default function Cloud({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const clip = `cl-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const healthy = svg.querySelector<SVGTextElement>(".cd-healthy");
      const setHealthy = (t: string) => () => void (healthy && (healthy.textContent = t));
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1 } });
      intro
        .from(".cd-term", { y: 30, opacity: 0 })
        .from(".cd-type", { attr: { width: 0 }, duration: 0.9, ease: "steps(22)" }, "-=0.5")
        .from(".cd-out", { opacity: 0, stagger: 0.15, duration: 0.3 })
        .from(".cd-pipe", { y: 24, opacity: 0 }, "-=0.6")
        .from(".cd-dot", { fill: "#FFFFFF", stagger: 0.25, duration: 0.3, ease: "none" }, "-=0.4")
        .from(".cd-check", { opacity: 0, stagger: 0.25, duration: 0.3 }, "<")
        .from(".cd-box", { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.12, ease: "power3.out", duration: 0.7 }, "-=1");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .set(".cd-dot", { fill: "#FFFFFF" })
        .set(".cd-check", { opacity: 0 })
        .set(".cd-box-new", { scaleY: 0, transformOrigin: "50% 100%" })
        .call(setHealthy("2 / 2 healthy"))
        .fromTo(".cd-type", { attr: { width: 0 } }, { attr: { width: 230 }, duration: 0.9, ease: "steps(22)" })
        .to(".cd-dot", { fill: "#E1013B", stagger: 0.45, duration: 0.25 }, "+=0.2")
        .to(".cd-check", { opacity: 1, stagger: 0.45, duration: 0.25 }, "<")
        .to(".cd-box-new", { scaleY: 1, duration: 0.7, ease: "back.out(1.6)" }, "-=0.2")
        .call(setHealthy("3 / 3 healthy"));

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Terminal running git push, a build-test-deploy pipeline and containers scaling">
      <defs>
        <clipPath id={clip}>
          <rect className="cd-type" x="58" y="84" width="230" height="22" />
        </clipPath>
      </defs>

      <g className="cd-term">
        <rect x="36" y="40" width="360" height="200" rx="12" fill="#00020A" />
        <circle cx="56" cy="60" r="4" fill="#5D606C" />
        <circle cx="70" cy="60" r="4" fill="#5D606C" />
        <circle cx="84" cy="60" r="4" fill="#5D606C" />
        <text x="216" y="64" textAnchor="middle" fontFamily={F} fontSize="11" fill="#9093A1">~/app — zsh</text>
        <text x="58" y="100" fontFamily={F} fontSize="15" fill="#FFFFFF" clipPath={`url(#${clip})`}>
          <tspan fill="#E1013B">$</tspan> git push origin main
        </text>
        <text className="cd-out" x="58" y="128" fontFamily={F} fontSize="12" fill="#9093A1">Enumerating objects: 14, done.</text>
        <text className="cd-out" x="58" y="148" fontFamily={F} fontSize="12" fill="#9093A1">To github.com:acme/app.git</text>
        <text className="cd-out" x="58" y="168" fontFamily={F} fontSize="12" fill="#9093A1">   4f2a1c9..b81e0d3  main → main</text>
        <text className="cd-out" x="58" y="196" fontFamily={F} fontSize="12" fill="#FFFFFF">CI triggered: pipeline #482</text>
        <rect className="cd-out" x="58" y="208" width="8" height="14" fill="#E1013B" />
      </g>

      <g>
        <text x="430" y="62" fontFamily={F} fontSize="13" fontWeight="700" fill="#00020A">Instances</text>
        <text className="cd-healthy" x="604" y="62" textAnchor="end" fontFamily={F} fontSize="11" fill="#5D606C">3 / 3 healthy</text>
        {[0, 1, 2].map((i) => (
          <g key={i} className={`cd-box ${i === 2 ? "cd-box-new" : ""}`}>
            <rect x={430 + i * 60} y="80" width="50" height="120" rx="6" fill={i === 2 ? "#E1013B" : "#00020A"} />
            {[0, 1, 2, 3].map((r) => (
              <rect key={r} x={438 + i * 60} y={94 + r * 18} width="34" height="6" rx="3" fill="#FFFFFF" opacity={r === 0 ? 0.9 : 0.35} />
            ))}
            <circle cx={455 + i * 60} cy="182" r="4" fill="#FFFFFF" />
          </g>
        ))}
        <line x1="420" y1="208" x2="612" y2="208" stroke="#D9DAE0" />
        <text x="430" y="228" fontFamily={F} fontSize="11" fill="#9093A1">CPU 64% · autoscale on</text>
      </g>

      <g className="cd-pipe">
        <rect x="36" y="276" width="568" height="150" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="60" y="308" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">Pipeline #482</text>
        <text x="580" y="308" textAnchor="end" fontFamily={F} fontSize="11" fill="#5D606C">main · b81e0d3</text>
        <line x1="130" y1="366" x2="510" y2="366" stroke="#D9DAE0" strokeWidth="3" />
        {stages.map((s, i) => {
          const cx = 130 + i * 190;
          return (
            <g key={s}>
              <circle className="cd-dot" cx={cx} cy="366" r="20" fill="#E1013B" stroke="#00020A" strokeWidth="2" />
              <path className="cd-check" d={`M${cx - 8} ${366}l6 6 11-12`} fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x={cx} y="408" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="600" fill="#00020A">{s}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
