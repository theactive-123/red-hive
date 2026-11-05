"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Phone from "@/components/ui/Phone";
import { caseStudies } from "@/data/work";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const apps = caseStudies.filter((c) => c.category === "Mobile App" && c.phones?.length);

/**
 * Mobile app showcase. Desktop: the section pins and a row of phones per app slides
 * sideways as you scroll, with phones rising into place. Mobile: swipeable rows.
 */
export default function MobileShowcase({ title = "Mobile apps we’ve shipped", dark = true }: { title?: string; dark?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth + 48;
        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        gsap.utils.toArray<HTMLElement>("[data-phone]").forEach((p, i) => {
          gsap.fromTo(
            p,
            { y: 120, rotate: i % 2 ? 4 : -4, opacity: 0.4 },
            { y: i % 2 ? 40 : 0, rotate: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 105%", end: "left 60%", scrub: true } },
          );
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  if (!apps.length) return null;

  return (
    <section ref={root} className={`${dark ? "theme-dark" : "theme-light bg-card"} relative overflow-hidden lg:h-screen`} aria-label="Mobile app portfolio">
      <div className="flex h-full flex-col justify-center py-24 lg:py-0">
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 data-split className="display-md max-w-[14ch]">
            {title}
          </h2>
          <Link href="/work/mobile-apps" className="font-semibold underline decoration-red decoration-2 underline-offset-[6px] hover:text-red">
            All mobile work
          </Link>
        </div>
        <div ref={track} className="flex flex-col gap-16 lg:w-max lg:flex-row lg:items-center lg:gap-24 lg:pl-12 lg:pr-24">
          {apps.map((a) => (
            <div key={a.slug} className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
              <div className="wrap lg:w-[340px] lg:shrink-0 lg:px-0">
                <p className="text-sm font-semibold" style={{ color: a.accent }}>
                  {a.platforms.join(" + ")}
                </p>
                <h3 className="display-md mt-2">{a.name}</h3>
                <p className="mt-4 leading-relaxed text-muted">{a.summary}</p>
                <Link
                  href={`/work/${a.slug}`}
                  className="cut mt-6 inline-flex h-12 items-center px-6 text-sm font-semibold text-white [--cut:10px]"
                  style={{ background: a.accent === "#70e000" ? "#00020a" : a.accent }}
                >
                  View case study
                </Link>
              </div>
              <div className="flex gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] lg:overflow-visible lg:px-0 lg:pb-0" data-lenis-prevent>
                {a.phones!.slice(0, 6).map((cap, i) => (
                  <figure key={cap} data-phone className="shrink-0">
                    <Phone src={`/images/work/screens/${a.slug}-${i + 1}.webp`} alt={`${a.name}: ${cap}`} className="w-[200px] md:w-[230px] lg:w-[min(240px,15vw)]" />
                    <figcaption className="mt-4 text-center text-sm text-muted">{cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
