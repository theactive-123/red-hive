"use client";

import { useId, useState } from "react";
import { gsap } from "@/lib/gsap";

/** Accessible tabs; panels are rendered on the server and passed in as children. */
export default function Tabs({ labels, children }: { labels: string[]; children: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  const select = (i: number) => {
    setActive(i);
    requestAnimationFrame(() => {
      const panel = document.getElementById(`${id}-p${i}`);
      if (panel) gsap.fromTo(panel.querySelectorAll("[data-tab-item]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.7 });
    });
  };

  return (
    <div>
      <div role="tablist" aria-label="Technology categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {labels.map((l, i) => (
          <button
            key={l}
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-p${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") select((i + 1) % labels.length);
              if (e.key === "ArrowLeft") select((i - 1 + labels.length) % labels.length);
            }}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              active === i ? "border-red bg-red text-white shadow-[0_8px_30px_-8px_rgba(225,1,59,0.8)]" : "border-line-strong text-white/65 hover:text-white"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      {children.map((panel, i) => (
        <div key={i} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={active !== i} className="mt-10">
          {panel}
        </div>
      ))}
    </div>
  );
}
