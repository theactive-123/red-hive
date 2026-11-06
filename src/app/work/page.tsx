import PageHero from "@/components/sections/PageHero";
import ProjectCard from "@/components/sections/ProjectCard";
import WorkFilter from "@/components/sections/WorkFilter";
import MobileShowcase from "@/components/sections/MobileShowcase";
import { CategoryTabs } from "@/components/sections/WorkCategory";
import { caseStudies } from "@/data/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work: Web App, Mobile App & SaaS Case Studies",
  description: "Case studies of mobile apps, web applications and SaaS platforms designed and built by Red Hive Digital, from streaming apps to healthcare EHRs.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Work", path: "/work" }]} title="Our work" text="Mobile apps, web applications and SaaS platforms we’ve designed and built, from a streaming app and a print marketplace to a behavioural health EHR." />
      <div className="wrap -mt-8 mb-16">
        <CategoryTabs active="/work" />
      </div>
      <MobileShowcase />
      <section className="wrap pb-32 pt-24">
        <WorkFilter categories={caseStudies.map((c) => c.category)}>
          {caseStudies.map((p) => (
            <ProjectCard key={p.slug} p={p} aspect="aspect-[6/5]" />
          ))}
        </WorkFilter>
      </section>
    </>
  );
}
