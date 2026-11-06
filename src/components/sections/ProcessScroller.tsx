"use client";

import { useRef } from "react";
import Illustration from "@/components/illustrations/Illustration";
import { processSteps } from "@/data/process";

const scenes = ["mvp-development", "ui-ux-design", "web-application-development", "cloud-devops", "maintenance-support"];

/**
 * The five project stages as a horizontal row of cards. Native horizontal scrolling with
 * snap points and arrow buttons: no pinning, so the page never jumps while scrolling.
 */
export default function ProcessScroller({ title = "How a project runs" }: { title?: string }) {
  const track = useRef<HTMLOListElement>(null);
  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 600) + 24), behavior: "smooth" });
  };

  return (
    <section className="theme-light overflow-hidden bg-card py-24 md:py-32">
      <div className="wrap mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 data-split className="display-md">
            {title}
          </h2>
          <p data-reveal className="mt-4 max-w-md text-muted">
            Five stages, two-week sprints and a demo at the end of every one.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous stage" className="grid h-12 w-12 place-items-center bg-white transition-colors hover:bg-navy hover:text-white">
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next stage" className="grid h-12 w-12 place-items-center bg-white transition-colors hover:bg-navy hover:text-white">
            →
          </button>
        </div>
      </div>
      <ol
        ref={track}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] md:px-10 lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {processSteps.map((s, i) => (
          <li key={s.n} className="grid w-[86vw] shrink-0 snap-start bg-white sm:w-[560px] lg:w-[820px] lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-8 p-8 lg:p-10">
              <div>
                <p className="text-sm text-muted">
                  <span className="font-semibold text-red">{s.n}</span>&nbsp;&nbsp;{s.time}
                </p>
                <h3 className="display-md mt-4">{s.title}</h3>
              </div>
              <p className="text-lg leading-relaxed text-muted">{s.text}</p>
            </div>
            <div className="flex items-center bg-snow p-6">
              <Illustration name={scenes[i]} className="h-auto w-full" />
            </div>
          </li>
        ))}
        <li aria-hidden className="w-1 shrink-0" />
      </ol>
    </section>
  );
}
