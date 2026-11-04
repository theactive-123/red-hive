import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { caseHeroes, caseImages } from "@/data/images";
import type { CaseStudy } from "@/data/work";

export default function ProjectCard({ p, aspect = "aspect-[6/5]", large = false }: { p: CaseStudy; aspect?: string; large?: boolean }) {
  const img = large ? caseHeroes[p.slug] : caseImages[p.slug];
  return (
    <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
      <div className="relative">
        {img && <Photo src={img.src} alt={img.alt} className={aspect} hoverZoom sizes={large ? "100vw" : "(min-width: 768px) 50vw, 100vw"} />}
        <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-xs font-semibold text-navy">{p.category}</span>
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
