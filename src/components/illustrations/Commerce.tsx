"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const F = "var(--ff-body), sans-serif";

/** E-commerce: product grid, add to cart, cart badge and a paid checkout. */
export default function Commerce({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const count = svg.querySelector<SVGTextElement>(".cm-count");
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1 } });
      intro
        .from(".cm-browser", { y: 30, opacity: 0 })
        .from(".cm-card", { y: 24, opacity: 0, stagger: 0.12 }, "-=0.7")
        .from(".cm-checkout", { x: 40, opacity: 0 }, "-=0.6")
        .from(".cm-cursor", { x: 60, y: 50, opacity: 0, ease: "power3.out" }, "-=0.6")
        .from(".cm-paid", { scale: 0.6, opacity: 0, transformOrigin: "center", ease: "back.out(2)", duration: 0.6 }, "-=0.3");

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      loop
        .set(".cm-paid", { opacity: 0, scale: 0.6, transformOrigin: "center" })
        .call(() => void (count && (count.textContent = "1")))
        .fromTo(".cm-cursor", { x: 60, y: 40 }, { x: 0, y: 0, duration: 0.8, ease: "power3.inOut" })
        .to(".cm-add", { scale: 0.94, transformOrigin: "center", duration: 0.12, yoyo: true, repeat: 1 })
        .call(() => void (count && (count.textContent = "2")))
        .fromTo(".cm-badge", { scale: 1.5, transformOrigin: "center" }, { scale: 1, duration: 0.5, ease: "back.out(3)" })
        .to(".cm-pay", { scale: 0.96, transformOrigin: "center", duration: 0.12, yoyo: true, repeat: 1 }, "+=0.4")
        .to(".cm-paid", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" });

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
    <svg ref={ref} viewBox="0 0 640 480" className={className} role="img" aria-label="Online store with product grid, cart and a paid checkout">
      <g className="cm-browser">
        <rect x="30" y="36" width="420" height="320" rx="12" fill="#FFFFFF" stroke="#D9DAE0" />
        <path d="M30 48a12 12 0 0 1 12-12h396a12 12 0 0 1 12 12v18H30z" fill="#F3F3F5" />
        <circle cx="48" cy="51" r="4" fill="#D9DAE0" />
        <circle cx="62" cy="51" r="4" fill="#D9DAE0" />
        <circle cx="76" cy="51" r="4" fill="#D9DAE0" />
        <rect x="96" y="44" width="150" height="14" rx="7" fill="#FFFFFF" />
        <text x="106" y="55" fontFamily={F} fontSize="10" fill="#9093A1">yourstore.com/shop</text>
        <path d="M398 47h16l-2 14h-12z" fill="none" stroke="#00020A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M402 47a4 4 0 0 1 8 0" fill="none" stroke="#00020A" strokeWidth="2" />
        <g className="cm-badge">
          <circle cx="420" cy="45" r="9" fill="#E1013B" />
          <text className="cm-count" x="420" y="49" textAnchor="middle" fontFamily={F} fontSize="11" fontWeight="700" fill="#FFFFFF">2</text>
        </g>
        <text x="54" y="92" fontFamily={F} fontSize="16" fontWeight="700" fill="#00020A">New arrivals</text>
      </g>

      <g className="cm-card">
        <rect x="54" y="106" width="176" height="232" rx="10" fill="#FFFFFF" stroke="#D9DAE0" />
        <rect x="64" y="116" width="156" height="118" rx="6" fill="#F3F3F5" />
        <path d="M96 204c10-30 30-46 54-46 18 0 30 10 40 22l10 24z" fill="#00020A" />
        <rect x="96" y="204" width="104" height="10" rx="3" fill="#E1013B" />
        <text x="66" y="256" fontFamily={F} fontSize="13" fontWeight="600" fill="#00020A">Trail Runner</text>
        <text x="66" y="274" fontFamily={F} fontSize="15" fontWeight="700" fill="#00020A">$129</text>
        <g className="cm-add">
          <rect x="64" y="290" width="156" height="34" rx="6" fill="#E1013B" />
          <text x="142" y="311" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="600" fill="#FFFFFF">Add to cart</text>
        </g>
      </g>
      <g className="cm-card">
        <rect x="244" y="106" width="176" height="232" rx="10" fill="#FFFFFF" stroke="#D9DAE0" />
        <rect x="254" y="116" width="156" height="118" rx="6" fill="#F3F3F5" />
        <rect x="300" y="144" width="64" height="74" rx="14" fill="#5D606C" />
        <rect x="312" y="160" width="40" height="22" rx="5" fill="#9093A1" />
        <text x="256" y="256" fontFamily={F} fontSize="13" fontWeight="600" fill="#00020A">Day Pack</text>
        <text x="256" y="274" fontFamily={F} fontSize="15" fontWeight="700" fill="#00020A">$89</text>
        <rect x="254" y="290" width="156" height="34" rx="6" fill="#FFFFFF" stroke="#00020A" />
        <text x="332" y="311" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="600" fill="#00020A">Add to cart</text>
      </g>

      <g className="cm-checkout">
        <rect x="346" y="236" width="268" height="208" rx="14" fill="#00020A" opacity="0.06" transform="translate(6 8)" />
        <rect x="346" y="236" width="268" height="208" rx="14" fill="#FFFFFF" stroke="#D9DAE0" />
        <text x="366" y="266" fontFamily={F} fontSize="15" fontWeight="700" fill="#00020A">Checkout</text>
        <text x="366" y="296" fontFamily={F} fontSize="12" fill="#5D606C">Trail Runner</text>
        <text x="594" y="296" textAnchor="end" fontFamily={F} fontSize="12" fill="#00020A">$129</text>
        <text x="366" y="318" fontFamily={F} fontSize="12" fill="#5D606C">Day Pack</text>
        <text x="594" y="318" textAnchor="end" fontFamily={F} fontSize="12" fill="#00020A">$89</text>
        <line x1="366" y1="332" x2="594" y2="332" stroke="#D9DAE0" />
        <text x="366" y="354" fontFamily={F} fontSize="13" fontWeight="700" fill="#00020A">Total</text>
        <text x="594" y="354" textAnchor="end" fontFamily={F} fontSize="13" fontWeight="700" fill="#00020A">$218</text>
        <g className="cm-pay">
          <rect x="366" y="372" width="140" height="36" rx="6" fill="#00020A" />
          <text x="436" y="394" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="600" fill="#FFFFFF">Pay $218</text>
        </g>
        <g className="cm-paid">
          <rect x="516" y="374" width="78" height="32" rx="16" fill="#E1013B" />
          <text x="555" y="394" textAnchor="middle" fontFamily={F} fontSize="12" fontWeight="700" fill="#FFFFFF">Paid ✓</text>
        </g>
      </g>

      <path className="cm-cursor" d="M150 300l0 26 7-6 5 11 6-3-5-11 9-1z" fill="#00020A" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
