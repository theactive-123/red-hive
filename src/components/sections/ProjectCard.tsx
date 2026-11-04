import Link from "next/link";
import ProjectVisual from "@/components/ui/ProjectVisual";
import type { CaseStudy } from "@/data/work";

export default function ProjectCard({ p, aspect = "aspect-[4/3]", large = false }: { p: CaseStudy; aspect?: string; large?: boolean }) {
  return (
    <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
      <div data-clip className={`relative overflow-hidden ${aspect}`}>
        <div data-clip-inner className="absolute inset-0">
          <ProjectVisual project={p} className="h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.03]" />
        </div>
      </div>
      <div data-reveal className={`mt-5 grid gap-2 ${large ? "md:grid-cols-12 md:items-baseline" : ""}`}>
        <h3 className={`${large ? "display-md md:col-span-5" : "display-sm"} transition-colors duration-300 group-hover:text-red`}>{p.name}</h3>
        <p className={`text-muted ${large ? "md:col-span-6 md:col-start-7" : ""}`}>
          {p.summary.split(". ")[0].replace(/\.$/, "")}. <span className="text-fg">{p.client}.</span>
        </p>
      </div>
    </Link>
  );
}
