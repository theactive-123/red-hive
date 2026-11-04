"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const slots = ["09:00", "09:30", "10:30", "11:00", "14:00", "15:30"];

/** Booking card, video consult window and a live heart-rate chart. */
export default function Healthcare({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg);
      const line = svg.querySelector<SVGPathElement>(".hr");
      const len = line?.getTotalLength() ?? 0;
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });

      let started = false;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .to(q(".live"), { opacity: 0.2, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0)
        .fromTo(line, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.8, ease: "none" }, 0)
        .to(q(".bpm"), { opacity: 0, duration: 0.2, onComplete: () => void (q(".bpm")[0].textContent = "74 bpm") }, 0.9)
        .to(q(".bpm"), { opacity: 1, duration: 0.3 }, 1.1)
        .to(q(".bpm"), { opacity: 0, duration: 0.2, onComplete: () => void (q(".bpm")[0].textContent = "72 bpm") }, 2.6)
        .to(q(".bpm"), { opacity: 1, duration: 0.3 }, 2.8);

      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1.1 }, onComplete: () => {
        started = true;
        loop.play();
      } });
      intro
        .from(q(".card"), { y: 40, opacity: 0, stagger: 0.15 })
        .from(q(".slot"), { scale: 0.6, opacity: 0, transformOrigin: "50% 50%", stagger: 0.06, duration: 0.7 }, 0.35)
        .to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power3.out" }, 0.5)
        .from(q(".ctrl"), { y: 14, opacity: 0, stagger: 0.07, duration: 0.6 }, 0.7);

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Telehealth booking, video consultation and heart-rate chart">
      {/* Booking card */}
      <g className="card">
        <rect x="40" y="60" width="250" height="330" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="62" y="98" fontFamily={F} fontSize="17" fontWeight="700" fill="#00020A">Book a visit</text>
        <text x="62" y="118" fontFamily={F} fontSize="11" fill="#9093A1">Dr. Okafor · Cardiology</text>
        <rect x="62" y="136" width="206" height="36" rx="8" fill="#F3F3F5" />
        <text x="76" y="159" fontFamily={F} fontSize="12" fontWeight="600" fill="#00020A">Tue 14 May</text>
        <text x="236" y="159" fontFamily={F} fontSize="12" fill="#5D606C">›</text>
        {slots.map((s, i) => {
          const x = 62 + (i % 2) * 106;
          const y = 190 + Math.floor(i / 2) * 46;
          const on = i === 2;
          return (
            <g key={s} className="slot">
              <rect x={x} y={y} width="100" height="36" rx="8" fill={on ? "#E1013B" : "#FFFFFF"} stroke={on ? "#E1013B" : "#D9DAE0"} />
              <text x={x + 50} y={y + 23} textAnchor="middle" fontFamily={F} fontSize="13" fontWeight="600" fill={on ? "#FFFFFF" : "#00020A"}>{s}</text>
            </g>
          );
        })}
        <rect x="62" y="336" width="206" height="38" rx="8" fill="#00020A" />
        <text x="165" y="360" textAnchor="middle" fontFamily={F} fontSize="13" fontWeight="600" fill="#FFFFFF">Confirm 10:30</text>
      </g>

      {/* Video consult */}
      <g className="card">
        <rect x="316" y="40" width="284" height="206" rx="14" fill="#00020A" />
        <rect x="332" y="56" width="252" height="132" rx="8" fill="#5D606C" opacity="0.35" />
        <circle className="live" cx="350" cy="74" r="4" fill="#E1013B" />
        <text x="360" y="78" fontFamily={F} fontSize="11" fill="#FFFFFF">Live · 08:42</text>
        <text x="344" y="178" fontFamily={F} fontSize="12" fontWeight="600" fill="#FFFFFF">Dr. Okafor</text>
        <rect x="510" y="128" width="62" height="48" rx="6" fill="#9093A1" opacity="0.6" />
        <text x="541" y="157" textAnchor="middle" fontFamily={F} fontSize="10" fill="#FFFFFF">You</text>
        {[0, 1, 2].map((i) => (
          <g key={i} className="ctrl">
            <circle cx={410 + i * 48} cy="216" r="15" fill={i === 2 ? "#E1013B" : "#5D606C"} />
            {i === 0 && <rect x="406" y="209" width="8" height="12" rx="4" fill="#FFFFFF" />}
            {i === 1 && <rect x="450" y="210" width="16" height="11" rx="2" fill="#FFFFFF" />}
            {i === 2 && <rect x="498" y="214" width="16" height="5" rx="2.5" fill="#FFFFFF" />}
          </g>
        ))}
      </g>

      {/* Vitals */}
      <g className="card">
        <rect x="316" y="266" width="284" height="174" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="336" y="296" fontFamily={F} fontSize="12" fill="#5D606C">Heart rate</text>
        <text className="bpm" x="336" y="324" fontFamily={F} fontSize="22" fontWeight="700" fill="#00020A">72 bpm</text>
        <text x="580" y="296" textAnchor="end" fontFamily={F} fontSize="11" fill="#9093A1">Last 30 min</text>
        <line x1="336" y1="400" x2="580" y2="400" stroke="#F3F3F5" strokeWidth="2" />
        <path
          className="hr"
          d="M336 392 L370 392 L382 380 L392 404 L404 352 L416 410 L426 392 L470 392 L480 384 L490 398 L500 362 L512 412 L522 392 L580 392"
          fill="none"
          stroke="#E1013B"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
