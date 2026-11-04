"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const swatches = ["#00020A", "#E1013B", "#5D606C", "#D9DAE0", "#F3F3F5"];

/** UI/UX: a wireframe card turns into the finished design; swatches and a type scale sit beside it. */
export default function Design({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".d-reveal", { attr: { width: 0 } });
      gsap.set(".d-scan", { x: 0, opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(".d-board", { y: 30, opacity: 0, duration: 1 })
        .from(".d-wire > *", { opacity: 0, y: 10, stagger: 0.06, duration: 0.6 }, "-=0.6")
        .from(".d-swatch", { scale: 0, transformOrigin: "50% 50%", stagger: 0.07, duration: 0.6, ease: "back.out(2)" }, "-=0.6")
        .from(".d-type > *", { x: 20, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.6");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .set(".d-scan", { x: 0, opacity: 1 })
        .to(".d-scan", { x: 236, duration: 1.4, ease: "power2.inOut" })
        .to(".d-reveal", { attr: { width: 240 }, duration: 1.4, ease: "power2.inOut" }, "<")
        .to(".d-scan", { opacity: 0, duration: 0.2 })
        .fromTo(".d-note", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" })
        .to(".d-note", { opacity: 0, duration: 0.4 }, "+=1.8")
        .to(".d-reveal", { attr: { width: 0 }, duration: 0.8, ease: "power2.inOut" }, "<");

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="A wireframe becoming a finished interface, with colour swatches and a type scale">
      <defs>
        <clipPath id="design-reveal">
          <rect className="d-reveal" x="60" y="70" width="240" height="360" />
        </clipPath>
      </defs>

      <g className="d-board" fontFamily={F}>
        <text x="60" y="56" fontSize="11" fill="#9093A1">Home · v2</text>
        <rect x="60" y="70" width="240" height="360" rx="10" fill="#FFFFFF" stroke="#D9DAE0" strokeWidth="1.5" />
      </g>

      {/* Wireframe layer */}
      <g className="d-wire">
        <rect x="80" y="92" width="80" height="10" rx="5" fill="#D9DAE0" />
        <rect x="80" y="118" width="200" height="110" rx="8" fill="#F3F3F5" stroke="#D9DAE0" strokeWidth="1.5" strokeDasharray="5 4" />
        <path d="M80 118l200 110M280 118L80 228" stroke="#D9DAE0" strokeWidth="1.5" />
        <rect x="80" y="246" width="160" height="12" rx="6" fill="#D9DAE0" />
        <rect x="80" y="268" width="190" height="8" rx="4" fill="#F3F3F5" />
        <rect x="80" y="284" width="150" height="8" rx="4" fill="#F3F3F5" />
        <rect x="80" y="316" width="200" height="40" rx="8" fill="#F3F3F5" stroke="#D9DAE0" strokeWidth="1.5" strokeDasharray="5 4" />
        <rect x="80" y="370" width="200" height="40" rx="8" fill="#F3F3F5" stroke="#D9DAE0" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>

      {/* Finished layer, revealed by the clip */}
      <g clipPath="url(#design-reveal)" fontFamily={F}>
        <rect x="61" y="71" width="238" height="358" rx="9" fill="#FFFFFF" />
        <text x="80" y="102" fontSize="13" fontWeight="700" fill="#00020A">Stayline</text>
        <rect x="80" y="118" width="200" height="110" rx="8" fill="#00020A" />
        <circle cx="236" cy="150" r="22" fill="#E1013B" />
        <path d="M80 228l60-50 40 30 30-20 70 40z" fill="#5D606C" />
        <text x="80" y="257" fontSize="15" fontWeight="700" fill="#00020A">Lisbon, 3 nights</text>
        <text x="80" y="276" fontSize="10.5" fill="#5D606C">12 to 15 May · 2 guests</text>
        <text x="80" y="292" fontSize="10.5" fill="#5D606C">Free cancellation until Friday</text>
        <rect x="80" y="316" width="200" height="40" rx="8" fill="#F3F3F5" />
        <text x="94" y="341" fontSize="11" fill="#5D606C">Total</text>
        <text x="266" y="341" textAnchor="end" fontSize="14" fontWeight="700" fill="#00020A">€486</text>
        <rect x="80" y="370" width="200" height="40" rx="8" fill="#E1013B" />
        <text x="180" y="395" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF">Book now</text>
      </g>
      <rect className="d-scan" x="60" y="66" width="3" height="368" fill="#E1013B" opacity="0" />

      {/* Swatches */}
      <g fontFamily={F}>
        <text x="340" y="96" fontSize="11" fill="#9093A1">Colour</text>
        {swatches.map((c, i) => (
          <g key={c} className="d-swatch">
            <rect x={340 + i * 50} y="108" width="40" height="40" rx="8" fill={c} stroke="#D9DAE0" strokeWidth={c === "#F3F3F5" ? 1.5 : 0} />
          </g>
        ))}
      </g>

      {/* Type scale */}
      <g className="d-type" fontFamily={F}>
        <text x="340" y="196" fontSize="11" fill="#9093A1">Type</text>
        <text x="340" y="262" fontSize="64" fontWeight="700" fill="#00020A">Aa</text>
        <text x="440" y="226" fontSize="18" fontWeight="700" fill="#00020A">Heading 32</text>
        <text x="440" y="250" fontSize="14" fill="#00020A">Body 16 / 1.5</text>
        <text x="440" y="270" fontSize="11" fill="#5D606C">Caption 12</text>
        <line x1="340" x2="580" y1="296" y2="296" stroke="#D9DAE0" strokeWidth="1.5" />
        <text x="340" y="326" fontSize="11" fill="#9093A1">Components</text>
        <rect x="340" y="338" width="96" height="32" rx="6" fill="#00020A" />
        <text x="388" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="#FFFFFF">Primary</text>
        <rect x="446" y="338" width="96" height="32" rx="6" fill="#FFFFFF" stroke="#00020A" strokeWidth="1.5" />
        <text x="494" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="#00020A">Secondary</text>
        <rect x="340" y="384" width="40" height="22" rx="11" fill="#E1013B" />
        <circle cx="369" cy="395" r="8" fill="#FFFFFF" />
        <text x="392" y="399" fontSize="11" fill="#5D606C">Toggle</text>
      </g>

      <g className="d-note" opacity="0" fontFamily={F}>
        <rect x="200" y="420" width="190" height="34" rx="8" fill="#00020A" />
        <text x="295" y="441" textAnchor="middle" fontSize="11" fill="#FFFFFF">Tested with 6 users ✓</text>
      </g>
    </svg>
  );
}
