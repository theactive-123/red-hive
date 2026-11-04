"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const lessons = ["Introduction", "Widgets", "Layouts", "State", "Testing"];

/** Course player, lesson checklist, quiz score and a learning streak. */
export default function Education({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);
      const ticks = svg.querySelectorAll<SVGPathElement>(".tick");
      ticks.forEach((t) => gsap.set(t, { strokeDasharray: 18, strokeDashoffset: 18 }));
      const time = svg.querySelector<SVGTextElement>(".time")!;
      const p = { v: 0 };
      const showTime = () => {
        const s = Math.round(p.v * 1215);
        time.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} / 20:15`;
      };

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .to(q(".fill"), { attr: { width: 296 }, duration: 3, ease: "none" }, 0)
        .to(p, { v: 1, duration: 3, ease: "none", onUpdate: showTime }, 0)
        .to(ticks[3], { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, 3)
        .to(q(".box3"), { fill: "#00020A", stroke: "#00020A", duration: 0.3 }, 3)
        .to(q(".streak6"), { fill: "#E1013B", duration: 0.3 }, 3.3)
        .set(q(".fill"), { attr: { width: 184 } }, 5)
        .set(p, { v: 0.62, onComplete: showTime }, 5)
        .set(ticks[3], { strokeDashoffset: 18 }, 5)
        .set(q(".box3"), { fill: "#FFFFFF", stroke: "#D9DAE0" }, 5)
        .set(q(".streak6"), { fill: "#D9DAE0" }, 5);

      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 1.1 },
        onComplete: () => {
          started = true;
          loop.play();
        },
      });
      intro
        .from(q(".card"), { y: 40, opacity: 0, stagger: 0.14 })
        .from(q(".fill"), { attr: { width: 0 }, duration: 1.4, ease: "power3.out" }, 0.4)
        .fromTo(p, { v: 0 }, { v: 0.62, duration: 1.4, ease: "power3.out", onUpdate: showTime }, 0.4)
        .to([ticks[0], ticks[1], ticks[2]], { strokeDashoffset: 0, duration: 0.4, stagger: 0.18, ease: "power2.out" }, 0.8)
        .from(q(".sq"), { scale: 0, transformOrigin: "50% 50%", stagger: 0.05, duration: 0.5 }, 0.9);

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="E-learning course player with lessons, quiz score and streak">
      {/* Player */}
      <g className="card">
        <rect x="40" y="40" width="360" height="236" rx="14" fill="#00020A" />
        <rect x="56" y="56" width="328" height="150" rx="8" fill="#5D606C" opacity="0.3" />
        <circle cx="220" cy="131" r="26" fill="#FFFFFF" />
        <polygon points="212,118 212,144 234,131" fill="#00020A" />
        <text x="56" y="232" fontFamily={F} fontSize="13" fontWeight="600" fill="#FFFFFF">Lesson 4: State management</text>
        <text className="time" x="384" y="232" textAnchor="end" fontFamily={F} fontSize="10" fill="#9093A1">12:33 / 20:15</text>
        <rect x="56" y="248" width="296" height="6" rx="3" fill="#5D606C" />
        <rect className="fill" x="56" y="248" width="184" height="6" rx="3" fill="#E1013B" />
        <text x="384" y="255" textAnchor="end" fontFamily={F} fontSize="10" fill="#D9DAE0">1x</text>
      </g>

      {/* Checklist */}
      <g className="card">
        <rect x="420" y="40" width="180" height="236" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="438" y="72" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">Module 2</text>
        <text x="438" y="90" fontFamily={F} fontSize="10" fill="#9093A1">3 of 5 complete</text>
        {lessons.map((l, i) => (
          <g key={l}>
            <rect className={`box${i}`} x="438" y={108 + i * 32} width="18" height="18" rx="4" fill={i < 3 ? "#00020A" : "#FFFFFF"} stroke={i < 3 ? "#00020A" : "#D9DAE0"} />
            <path className="tick" d={`M442 ${117 + i * 32} l4 4 l7 -8`} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="466" y={121 + i * 32} fontFamily={F} fontSize="12" fill={i === 3 ? "#E1013B" : "#00020A"} fontWeight={i === 3 ? 700 : 500}>{l}</text>
          </g>
        ))}
      </g>

      {/* Quiz */}
      <g className="card">
        <rect x="40" y="296" width="360" height="144" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="60" y="326" fontFamily={F} fontSize="12" fill="#5D606C">Quiz result</text>
        <text x="60" y="370" fontFamily={F} fontSize="36" fontWeight="700" fill="#00020A">8/10</text>
        <rect x="292" y="310" width="90" height="28" rx="14" fill="#E1013B" />
        <text x="337" y="329" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="600" fill="#FFFFFF">Passed</text>
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} className="sq" x={60 + i * 32} y="396" width="24" height="24" rx="5" fill={i < 8 ? "#00020A" : "#D9DAE0"} />
        ))}
      </g>

      {/* Streak */}
      <g className="card">
        <rect x="420" y="296" width="180" height="144" rx="14" fill="#F3F3F5" />
        <text x="438" y="326" fontFamily={F} fontSize="12" fill="#5D606C">Learning streak</text>
        <text x="438" y="364" fontFamily={F} fontSize="28" fontWeight="700" fill="#00020A">6 days</text>
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} className={i === 6 ? "streak6" : undefined} cx={446 + i * 22} cy="410" r="7" fill={i < 6 ? "#00020A" : "#D9DAE0"} />
        ))}
      </g>
    </svg>
  );
}
