import PageHero from "@/components/sections/PageHero";
import ProjectCard from "@/components/sections/ProjectCard";
import WorkFilter from "@/components/sections/WorkFilter";
import { caseStudies } from "@/data/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work: Web App, Mobile App & SaaS Case Studies",
  description: "Web applications, mobile apps, SaaS platforms and AI products designed and engineered by Red Hive Digital.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Work", path: "/work" }]} title="Our work" text="Web applications and SaaS platforms we’ve designed and built, from a behavioural health EHR to inventory, AI chat and personal finance." />
      <section className="wrap pb-32">
        <WorkFilter categories={caseStudies.map((c) => c.category)}>
          {caseStudies.map((p) => (
            <ProjectCard key={p.slug} p={p} aspect="aspect-[6/5]" />
          ))}
        </WorkFilter>
      </section>
    </>
  );
}
