"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll story: on desktop the left column stays pinned and tracks which item
 * you're reading (big counter + progress); items light up as they pass the middle.
 */
export default function StickyStory({ title, intro, items, dark = false }: { title: string; intro?: string; items: { title: string; text: string }[]; dark?: boolean }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const els = list.current ? Array.from(list.current.children) : [];
    const triggers = els.map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActive(i) }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, [items.length]);

  const pct = ((active + 1) / items.length) * 100;

  return (
    <section className={`${dark ? "theme-dark" : "theme-light"} py-24 md:py-32`}>
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 data-split className="display-md max-w-[12ch]">
              {title}
            </h2>
            {intro && (
              <p data-reveal className="mt-6 max-w-sm text-muted">
                {intro}
              </p>
            )}
            <div className="mt-14 hidden md:block" aria-hidden>
              <div className="flex items-end gap-4">
                <span className="font-display text-[8rem] font-extrabold leading-[0.8] tracking-[-0.04em] tabular-nums text-red">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="pb-3 text-muted">/ {String(items.length).padStart(2, "0")}</span>
              </div>
              <div className="mt-6 h-[3px] w-full max-w-sm bg-line">
                <div className="h-full bg-red transition-[width] duration-700 ease-out-expo" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-4 max-w-sm font-semibold">{items[active]?.title}</p>
            </div>
          </div>
        </div>
        <ol ref={list} className="md:col-span-7">
          {items.map((it, i) => (
            <li
              key={it.title}
              className={`flex min-h-[38vh] flex-col justify-center border-t border-line py-10 transition-opacity duration-500 md:min-h-[46vh] ${
                i === active ? "md:opacity-100" : "md:opacity-25"
              }`}
            >
              <span className="text-sm font-semibold text-red md:hidden">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display-sm mt-2 md:mt-0">{it.title}</h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{it.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
