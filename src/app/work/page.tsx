import PageHero from "@/components/sections/PageHero";
import ProjectCard from "@/components/sections/ProjectCard";
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
      <PageHero crumbs={[{ name: "Work", path: "/work" }]} title="Our work" text="A selection of web apps, mobile apps and SaaS platforms we’ve designed and built, from telehealth to fleet management." />
      <section className="wrap pb-32">
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          {caseStudies.map((p, i) => (
            <div key={p.slug} className={i % 2 ? "md:mt-32" : ""}>
              <ProjectCard p={p} aspect="aspect-[6/5]" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
