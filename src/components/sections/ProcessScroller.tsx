"use client";

import { useEffect, useRef } from "react";
import Illustration from "@/components/illustrations/Illustration";
import { processSteps } from "@/data/process";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const scenes = ["mvp-development", "ui-ux-design", "web-application-development", "cloud-devops", "maintenance-support"];

/** Desktop: pinned, scrolls sideways through the five stages. Mobile: stacked. */
export default function ProcessScroller({ title = "How a project runs" }: { title?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth;
        gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
        })
          .to(el, { x: () => -dist(), ease: "none" }, 0)
          .fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="theme-light relative overflow-hidden bg-card lg:h-screen">
      <div className="flex h-full flex-col justify-center py-24 lg:py-0">
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
          <h2 data-split className="display-md">
            {title}
          </h2>
          <p className="max-w-sm text-muted">Five stages, two-week sprints and a demo at the end of every one.</p>
        </div>
        <div ref={track} className="flex flex-col gap-6 px-5 md:px-10 lg:w-max lg:flex-row lg:gap-8 lg:px-12">
          {processSteps.map((s, i) => (
            <article key={s.n} className="grid shrink-0 bg-white lg:w-[min(860px,72vw)] lg:grid-cols-2">
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
            </article>
          ))}
        </div>
        <div className="wrap mt-10 hidden lg:block">
          <div className="h-[3px] bg-navy/10">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-red" />
          </div>
        </div>
      </div>
    </section>
  );
}
