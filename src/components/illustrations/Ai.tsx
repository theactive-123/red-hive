"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const reply = ["Open Customers, pick the account,", "then choose Security › Reset 2FA.", "They'll get an email to set it up again."];
const hot = [9, 16, 29];

/** AI: a support assistant answering from retrieved docs, plus the vector search behind it. */
export default function Ai({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1 } });
      intro
        .from(".ai-chat", { y: 30, opacity: 0 })
        .from(".ai-vec", { x: 30, opacity: 0 }, "-=0.8")
        .from(".ai-user", { y: 16, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".ai-bot", { opacity: 0, duration: 0.3 })
        .from(".ai-w", { opacity: 0, stagger: 0.04, duration: 0.15, ease: "none" })
        .from(".ai-src", { scale: 0.7, opacity: 0, transformOrigin: "left center", duration: 0.5, ease: "back.out(2)" });

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .set(".ai-w", { opacity: 0 })
        .set(".ai-src", { opacity: 0 })
        .set(".ai-hot", { fill: "#5D606C", attr: { r: 3 } })
        .to(".ai-typing", { opacity: 1, duration: 0.2 })
        .to(".ai-hot", { fill: "#E1013B", attr: { r: 5 }, stagger: 0.15, duration: 0.3 })
        .to(".ai-typing", { opacity: 0, duration: 0.2 })
        .to(".ai-w", { opacity: 1, stagger: 0.04, duration: 0.15, ease: "none" })
        .to(".ai-src", { opacity: 1, duration: 0.4 });

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="AI assistant answering a support question using three source documents">
      <g className="ai-chat">
        <rect x="30" y="34" width="410" height="412" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <rect x="30" y="34" width="410" height="54" rx="14" fill="#F3F3F5" />
        <rect x="30" y="74" width="410" height="14" fill="#F3F3F5" />
        <rect x="50" y="48" width="26" height="26" rx="7" fill="#00020A" />
        <path d="M58 66l5-10 5 10" fill="none" stroke="#E1013B" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="88" y="59" fontFamily={F} fontSize="14" fontWeight="700" fill="#00020A">Help assistant</text>
        <text x="88" y="75" fontFamily={F} fontSize="11" fill="#5D606C">Answers from your docs</text>

        <g className="ai-user">
          <rect x="196" y="110" width="224" height="58" rx="12" fill="#00020A" />
          <text x="212" y="134" fontFamily={F} fontSize="13" fill="#FFFFFF">How do I reset a</text>
          <text x="212" y="154" fontFamily={F} fontSize="13" fill="#FFFFFF">customer&apos;s 2FA?</text>
        </g>

        <g className="ai-bot">
          <rect x="50" y="190" width="300" height="94" rx="12" fill="#F3F3F5" />
          <g className="ai-typing" opacity="0">
            <circle cx="72" cy="214" r="4" fill="#9093A1" />
            <circle cx="86" cy="214" r="4" fill="#9093A1" />
            <circle cx="100" cy="214" r="4" fill="#9093A1" />
          </g>
          {reply.map((line, li) => (
            <text key={li} x="66" y={218 + li * 22} fontFamily={F} fontSize="13" fill="#00020A">
              {line.split(" ").map((w, wi) => (
                <tspan key={wi} className="ai-w">
                  {w}{" "}
                </tspan>
              ))}
            </text>
          ))}
        </g>
        <g className="ai-src">
          <rect x="50" y="296" width="132" height="28" rx="14" fill="#FFFFFF" stroke="#E1013B" />
          <text x="116" y="314" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="600" fill="#E1013B">Sources: 3 docs</text>
        </g>

        <rect x="50" y="384" width="370" height="42" rx="10" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="66" y="410" fontFamily={F} fontSize="12" fill="#9093A1">Ask anything about your account…</text>
        <rect x="380" y="390" width="32" height="30" rx="7" fill="#E1013B" />
        <path d="M389 405h14m-5-5 5 5-5 5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g className="ai-vec">
        <rect x="462" y="110" width="150" height="230" rx="12" fill="#00020A" />
        <text x="478" y="136" fontFamily={F} fontSize="12" fontWeight="600" fill="#FFFFFF">Vector search</text>
        <text x="478" y="152" fontFamily={F} fontSize="10" fill="#9093A1">12,480 chunks</text>
        {Array.from({ length: 42 }, (_, i) => {
          const isHot = hot.includes(i);
          return (
            <circle
              key={i}
              className={isHot ? "ai-hot" : undefined}
              cx={486 + (i % 6) * 21}
              cy={178 + Math.floor(i / 6) * 20}
              r={isHot ? 5 : 3}
              fill={isHot ? "#E1013B" : "#5D606C"}
            />
          );
        })}
        <text x="478" y="328" fontFamily={F} fontSize="10" fill="#9093A1">top-k: 3 · 84 ms</text>
      </g>
    </svg>
  );
}
