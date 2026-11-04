import Link from "next/link";
import ProjectVisual from "@/components/ui/ProjectVisual";
import type { CaseStudy } from "@/data/work";

export default function ProjectCard({ p, aspect = "aspect-[4/3]" }: { p: CaseStudy; aspect?: string }) {
  return (
    <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
      <div data-clip className={`relative overflow-hidden rounded-xl ${aspect}`}>
        <div data-clip-inner className="absolute inset-0">
          <ProjectVisual project={p} className="h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]" />
        </div>
      </div>
      <div data-reveal className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="display-sm">{p.name}</h3>
          <p className="mt-1.5 text-muted">{p.summary.split(".")[0]}.</p>
        </div>
        <p className="shrink-0 pt-2 text-sm text-muted">
          {p.category} · {p.year}
        </p>
      </div>
    </Link>
  );
}
