"use client";

import { Children, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FILTERS = [
  { key: "all", label: "All work" },
  { key: "Web App", label: "Web apps" },
  { key: "SaaS", label: "SaaS" },
  { key: "Mobile App", label: "Mobile apps" },
];

/** Category filter for the work grid. Children are the cards, `categories[i]` is each card's category. */
export default function WorkFilter({ categories, children }: { categories: string[]; children: React.ReactNode }) {
  const [active, setActive] = useState("all");
  const items = Children.toArray(children);
  const count = (k: string) => (k === "all" ? categories.length : categories.filter((c) => c === k).length);

  const pick = (k: string) => {
    setActive(k);
    requestAnimationFrame(() => {
      // Cards that were hidden never ran their scroll reveal, so show them fully before animating in.
      gsap.set("[data-work-item]:not([hidden]) [data-clip]", { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set("[data-work-item]:not([hidden]) [data-reveal]", { opacity: 1, y: 0 });
      gsap.fromTo("[data-work-item]:not([hidden])", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" });
      ScrollTrigger.refresh();
    });
  };

  return (
    <div>
      <div role="tablist" aria-label="Filter work by type" className="mb-12 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const n = count(f.key);
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={active === f.key}
              disabled={n === 0}
              onClick={() => pick(f.key)}
              className={`cut inline-flex h-11 items-center gap-2 px-5 text-sm font-semibold transition-colors [--cut:8px] disabled:cursor-not-allowed disabled:opacity-40 ${
                active === f.key ? "bg-navy text-white" : "bg-card hover:bg-navy hover:text-white"
              }`}
            >
              {f.label}
              <span className={active === f.key ? "text-white/60" : "text-muted"}>{n}</span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
        {items.map((child, i) => (
          <div key={i} data-work-item hidden={active !== "all" && categories[i] !== active} className={i % 2 && active === "all" ? "md:mt-32" : ""}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
