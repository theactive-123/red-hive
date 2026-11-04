"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import type { IconKey } from "@/data/types";
import { gsap } from "@/lib/gsap";

type Item = { slug: string; name: string; tagline: string; icon: IconKey; tags: string[] };

/** Large typographic service rows with a preview card that follows the cursor. */
export default function ServicesList({ items, compact = false }: { items: Item[]; compact?: boolean }) {
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = preview.current;
    if (!el || !matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX + 28);
      y(e.clientY - 110);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (!preview.current) return;
    gsap.to(preview.current, { scale: active === null ? 0 : 1, opacity: active === null ? 0 : 1, duration: 0.5, ease: "expo.out" });
  }, [active]);

  const cur = active !== null ? items[active] : null;

  return (
    <div onMouseLeave={() => setActive(null)}>
      <ul className="border-b border-line">
        {items.map((s, i) => (
          <li key={s.slug} data-reveal className="border-t border-line">
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              className={`group grid grid-cols-12 items-center gap-4 transition-colors duration-300 ${compact ? "py-5" : "py-6 md:py-8"}`}
            >
              <span className="col-span-2 text-sm text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`col-span-9 font-display font-semibold tracking-[-0.03em] [font-stretch:108%] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:col-span-6 ${
                  compact ? "text-2xl md:text-3xl" : "text-[1.75rem] leading-tight md:text-[2.6rem]"
                } ${active !== null && active !== i ? "opacity-35" : ""} transition-opacity`}
              >
                {s.name}
              </span>
              <span className="col-span-4 hidden text-[0.95rem] leading-relaxed text-muted md:block">{s.tagline}</span>
              <span className="col-span-1 hidden justify-self-end md:block">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-line transition-all duration-500 group-hover:border-red group-hover:bg-red group-hover:text-white">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[300px] origin-top-left scale-0 overflow-hidden rounded-2xl bg-red p-6 text-white opacity-0 shadow-2xl [@media(pointer:fine)]:block"
      >
        {cur && (
          <>
            <Icon name={cur.icon} className="h-10 w-10" />
            <p className="mt-10 font-display text-xl font-semibold leading-tight tracking-tight">{cur.tagline}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {cur.tags.slice(0, 3).map((t) => (
                <li key={t} className="rounded-full border border-white/40 px-2.5 py-1 text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
