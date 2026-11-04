"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Illustration from "@/components/illustrations/Illustration";
import { navIndustries } from "@/data/nav";
import { gsap } from "@/lib/gsap";

type Item = { slug: string; name: string; tagline: string };

/** Industry rows; on desktop an animated preview of the industry follows the cursor. */
export default function IndustriesList({ items }: { items?: Item[] }) {
  const list: Item[] = items ?? navIndustries.map(([slug, name]) => ({ slug, name, tagline: "" }));
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || !matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX + 30);
      y(e.clientY - 140);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (box.current) gsap.to(box.current, { scale: active ? 1 : 0.6, opacity: active ? 1 : 0, duration: 0.45, ease: "expo.out" });
  }, [active]);

  return (
    <div onMouseLeave={() => setActive(null)}>
      <ul className="grid border-b border-line md:grid-cols-2 md:gap-x-12">
        {list.map((ind) => (
          <li key={ind.slug} data-reveal className="border-t border-line">
            <Link href={`/industries/${ind.slug}`} onMouseEnter={() => setActive(ind.slug)} className="group flex items-center justify-between gap-6 py-6">
              <span>
                <span className="block font-display text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-red md:text-[2rem]">{ind.name}</span>
                {ind.tagline && <span className="mt-1 block text-sm text-muted">{ind.tagline}</span>}
              </span>
              <span className="tri text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
      <div
        ref={box}
        aria-hidden
        className="cut-tl pointer-events-none fixed left-0 top-0 z-30 hidden w-[340px] origin-top-left bg-white p-4 opacity-0 shadow-2xl [--cut:24px] [@media(pointer:fine)]:block"
      >
        {active && <Illustration key={active} name={active} className="h-auto w-full" />}
      </div>
    </div>
  );
}
