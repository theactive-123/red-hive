import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/data/work";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { ArrowUpRight } from "@/components/ui/Icon";

/** Sticky stacking project cards (pure CSS sticky; works with Lenis). */
export default function WorkStack({ limit = 4, items }: { limit?: number; items?: CaseStudy[] }) {
  const list = (items ?? caseStudies).slice(0, limit);
  return (
    <div className="relative">
      {list.map((p, i) => (
        <div key={p.slug} className="sticky pb-6" style={{ top: `${96 + i * 22}px` }}>
          <Link
            href={`/work/${p.slug}`}
            data-cursor="View"
            className="group grid overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.8)] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
                  <span className="rounded-full px-3 py-1 text-white" style={{ background: p.accent }}>
                    {p.category}
                  </span>
                  <span className="text-white/50">{p.client}</span>
                </div>
                <h3 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">{p.name}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted">{p.summary}</p>
              </div>
              <div className="flex items-end justify-between gap-6">
                <dl className="flex gap-8">
                  {p.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <dd className="font-display text-3xl font-semibold text-white">{r.value}</dd>
                      <dt className="mt-1 max-w-[9rem] text-xs text-muted">{r.label}</dt>
                    </div>
                  ))}
                </dl>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-red group-hover:bg-red">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </div>
            <ProjectVisual project={p} className="min-h-[300px] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04] lg:min-h-[460px]" />
          </Link>
        </div>
      ))}
    </div>
  );
}
