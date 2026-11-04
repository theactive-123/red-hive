import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { Checklist, LinkRows, NumberedList, Prose, Split, TechRow } from "@/components/sections/Blocks";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ProjectCard from "@/components/sections/ProjectCard";
import FAQ from "@/components/sections/FAQ";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { pageMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? pageMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/services/${s.slug}` }) : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const work = caseStudies.filter((c) => c.service === s.slug).slice(0, 2);
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 5);

  return (
    <>
      <JsonLd data={serviceLd(s.name, s.seoDescription, `/services/${s.slug}`)} />
      <PageHero crumbs={[{ name: "Services", path: "/services" }, { name: s.short, path: `/services/${s.slug}` }]} label={s.short} title={s.name} text={s.tagline}>
        <Button href="/contact">Get an estimate</Button>
        <Button href="/work" variant="outline">
          See our work
        </Button>
      </PageHero>

      <Split index="01" label="Overview">
        <Prose paragraphs={s.intro} />
      </Split>

      <Split index="02" label="Capabilities" title="What’s included">
        <NumberedList items={s.capabilities} />
      </Split>

      <section className="theme-dark py-24 md:py-32">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 data-split className="display-md max-w-[11ch]">
              What you walk away with
            </h2>
          </div>
          <div className="md:col-span-8">
            <Checklist items={s.deliverables} />
          </div>
        </div>
      </section>

      <Split index="04" label="Technology" title="Tools we use">
        <TechRow slugs={s.tech} />
      </Split>

      <section className="theme-light bg-card py-24 md:py-32">
        <div className="wrap">
          <SectionHead index="05" label="Process" title="How we deliver" className="mb-14" />
          <ProcessSteps />
        </div>
      </section>

      {work.length > 0 && (
        <section className="wrap py-24 md:py-32">
          <SectionHead index="06" label="Related work" title="Recent projects" link={{ href: "/work", label: "All projects" }} className="mb-14" />
          <div className="grid gap-10 md:grid-cols-2">
            {work.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <FAQ faqs={s.faqs} title={`${s.short}: common questions`} />

      <Split label="More services">
        <LinkRows items={others.map((o) => ({ href: `/services/${o.slug}`, title: o.name, text: o.tagline }))} />
      </Split>
    </>
  );
}
