"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";
const items = [
  ["Video consult", "Today · 10:30", "Join"],
  ["Lab results", "Ready to view", "Open"],
  ["Refill: Lisinopril", "Ready Thursday", "Track"],
];

/** Mobile: two phones. A push notification slides in on one, a payment completes on the other. */
export default function Mobile({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const route = svg.querySelector<SVGPathElement>(".m-route");
      const len = route?.getTotalLength() ?? 300;
      gsap.set(".m-route", { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(".m-phone-a", { y: 60, opacity: 0, duration: 1.1 })
        .from(".m-phone-b", { y: 80, opacity: 0, duration: 1.1 }, "-=0.85")
        .from(".m-item", { x: -18, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.6")
        .to(".m-route", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.5");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .fromTo(".m-push", { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" })
        .to(".m-pin", { scale: 1.25, transformOrigin: "50% 100%", duration: 0.3, yoyo: true, repeat: 1 }, "<0.2")
        .to(".m-pay", { scale: 0.94, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, "+=0.6")
        .fromTo(".m-done", { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" })
        .to(".m-push", { y: -70, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=1.4")
        .to(".m-done", { scale: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, "<");

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Two mobile app screens with a notification and a payment">
      {/* Phone A: list + push */}
      <g className="m-phone-a" fontFamily={F}>
        <rect x="118" y="24" width="208" height="432" rx="34" fill="#00020A" />
        <rect x="127" y="33" width="190" height="414" rx="27" fill="#F3F3F5" />
        <rect x="190" y="41" width="64" height="16" rx="8" fill="#00020A" />
        <text x="146" y="92" fontSize="11" fill="#9093A1">Pulsecare</text>
        <text x="146" y="114" fontSize="18" fontWeight="700" fill="#00020A">Good morning, Maya</text>
        <rect x="143" y="130" width="158" height="74" rx="10" fill="#E1013B" />
        <text x="157" y="152" fontSize="10.5" fill="#FFFFFF" opacity="0.8">Heart rate</text>
        <text x="157" y="184" fontSize="26" fontWeight="700" fill="#FFFFFF">72 bpm</text>
        {items.map((it, i) => (
          <g key={it[0]} className="m-item" transform={`translate(0 ${i * 56})`}>
            <rect x="143" y="218" width="158" height="46" rx="9" fill="#FFFFFF" />
            <circle cx="164" cy="241" r="10" fill="#D9DAE0" />
            <text x="181" y="238" fontSize="11" fontWeight="600" fill="#00020A">{it[0]}</text>
            <text x="181" y="252" fontSize="9.5" fill="#9093A1">{it[1]}</text>
            <text x="291" y="245" textAnchor="end" fontSize="10.5" fontWeight="600" fill={i === 0 ? "#E1013B" : "#5D606C"}>
              {it[2]}
            </text>
          </g>
        ))}
        <rect x="143" y="398" width="158" height="34" rx="17" fill="#00020A" />
        <text x="222" y="419" textAnchor="middle" fontSize="11" fontWeight="600" fill="#FFFFFF">Book a visit</text>
        <g className="m-push" opacity="0">
          <rect x="135" y="62" width="174" height="52" rx="12" fill="#FFFFFF" stroke="#D9DAE0" strokeWidth="1.5" />
          <rect x="145" y="74" width="16" height="16" rx="4" fill="#E1013B" />
          <text x="168" y="83" fontSize="10" fontWeight="700" fill="#00020A">Dr. Okafor is ready</text>
          <text x="168" y="98" fontSize="9.5" fill="#5D606C">Tap to join your video call</text>
        </g>
      </g>

      {/* Phone B: route + payment */}
      <g className="m-phone-b" fontFamily={F}>
        <rect x="350" y="64" width="190" height="392" rx="31" fill="#00020A" />
        <rect x="358" y="72" width="174" height="376" rx="24" fill="#FFFFFF" />
        <rect x="415" y="79" width="60" height="15" rx="7.5" fill="#00020A" />
        <text x="374" y="124" fontSize="16" fontWeight="700" fill="#00020A">Order on the way</text>
        <text x="374" y="141" fontSize="10" fill="#9093A1">Omar is 4 min away</text>
        <rect x="370" y="154" width="150" height="132" rx="10" fill="#F3F3F5" />
        <path d="M370 196h150M370 238h150M412 154v132M470 154v132" stroke="#D9DAE0" strokeWidth="6" />
        <path className="m-route" d="M388 272 C 400 240, 430 250, 440 214 S 480 180, 500 170" fill="none" stroke="#00020A" strokeWidth="3" strokeLinecap="round" />
        <circle cx="388" cy="272" r="5" fill="#00020A" />
        <g className="m-pin">
          <path d="M500 152c-7 0-12 5-12 11 0 8 12 19 12 19s12-11 12-19c0-6-5-11-12-11z" fill="#E1013B" />
          <circle cx="500" cy="163" r="4" fill="#FFFFFF" />
        </g>
        <text x="374" y="314" fontSize="10.5" fill="#5D606C">Total</text>
        <text x="516" y="314" textAnchor="end" fontSize="13" fontWeight="700" fill="#00020A">AED 46.00</text>
        <g className="m-pay">
          <rect x="370" y="330" width="150" height="36" rx="18" fill="#00020A" />
          <text x="445" y="352" textAnchor="middle" fontSize="11" fontWeight="600" fill="#FFFFFF">Pay with card</text>
        </g>
        <g className="m-done" opacity="0">
          <circle cx="445" cy="404" r="20" fill="#E1013B" />
          <path d="M436 404l6 6 12-13" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
