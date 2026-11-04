import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { LinkRows, NumberedList, Prose, Split, TechRow } from "@/components/sections/Blocks";
import ProjectCard from "@/components/sections/ProjectCard";
import FAQ from "@/components/sections/FAQ";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/work";
import { pageMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = industries.find((x) => x.slug === slug);
  return ind ? pageMetadata({ title: ind.seoTitle, description: ind.seoDescription, path: `/industries/${ind.slug}` }) : {};
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = industries.find((x) => x.slug === slug);
  if (!ind) notFound();
  const work = caseStudies.filter((c) => c.industry === ind.slug).slice(0, 2);
  const others = industries.filter((x) => x.slug !== ind.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={serviceLd(`${ind.name} Software Development`, ind.seoDescription, `/industries/${ind.slug}`)} />
      <PageHero crumbs={[{ name: "Industries", path: "/industries" }, { name: ind.name, path: `/industries/${ind.slug}` }]} label={ind.name} title={`${ind.name} software development`} text={ind.tagline}>
        <Button href="/contact">Discuss your project</Button>
      </PageHero>

      <Split index="01" label="Overview">
        <Prose paragraphs={ind.intro} />
      </Split>

      <section className="theme-dark py-24 md:py-32">
        <div className="wrap">
          <SectionHead index="02" label="Challenges" title="Problems we solve" className="mb-14" />
          <NumberedList items={ind.challenges} />
        </div>
      </section>

      <Split index="03" label="Solutions" title="What we build">
        <NumberedList items={ind.solutions} />
        {ind.compliance.length > 0 && (
          <div data-reveal className="mt-12 flex flex-wrap items-center gap-3">
            <span className="mr-2 text-sm text-muted">Built to support</span>
            {ind.compliance.map((c) => (
              <span key={c} className="rounded-full bg-card px-4 py-2 text-sm">
                {c}
              </span>
            ))}
          </div>
        )}
      </Split>

      <Split index="04" label="Technology" title="Typical stack">
        <TechRow slugs={ind.tech} />
      </Split>

      {work.length > 0 && (
        <section className="wrap py-20">
          <SectionHead index="05" label="Related work" title="Projects in this space" className="mb-14" />
          <div className="grid gap-10 md:grid-cols-2">
            {work.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <FAQ faqs={ind.faqs} title={`${ind.name} questions`} />
      <Split label="Other industries">
        <LinkRows items={others.map((o) => ({ href: `/industries/${o.slug}`, title: o.name, text: o.tagline }))} />
      </Split>
    </>
  );
}
