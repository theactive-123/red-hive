import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Stats from "@/components/sections/Stats";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { ArrowUpRight } from "@/components/ui/Icon";
import { caseStudies } from "@/data/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work — Web App, Mobile App & SaaS Case Studies",
  description: "Case studies of web applications, mobile apps, SaaS platforms and AI products designed and engineered by Red Hive Digital.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }]}
        eyebrow="Case studies"
        title={<>Products built to perform in the real world</>}
        text="From telehealth to fintech to AI assistants — a selection of platforms we’ve designed, engineered and scaled."
      />
      <section className="container-x pb-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((p, i) => (
            <li key={p.slug} data-reveal="up" className={i % 3 === 0 ? "md:col-span-2" : ""}>
              <Link href={`/work/${p.slug}`} data-cursor="View" className="group block overflow-hidden rounded-[1.75rem] border border-line bg-surface">
                <ProjectVisual project={p} className={`${i % 3 === 0 ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"} transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]`} />
                <div className="flex items-end justify-between gap-6 p-7 sm:p-9">
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/50">
                      <span style={{ color: p.accent }}>{p.category}</span> · {p.client}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">{p.name}</h2>
                    <p className="mt-2 max-w-xl text-muted">{p.summary}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-red group-hover:bg-red">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Stats />
      <CTA title="Your product could be next." />
    </>
  );
}
