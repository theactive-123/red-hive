import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { Checklist, Intro, TechRow, VisualCards } from "@/components/sections/Blocks";
import StickyStory from "@/components/sections/StickyStory";
import ProcessScroller from "@/components/sections/ProcessScroller";
import ProjectCard from "@/components/sections/ProjectCard";
import FAQ from "@/components/sections/FAQ";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import CodeWindow from "@/components/ui/CodeWindow";
import ProjectVisual from "@/components/ui/ProjectVisual";
import LayeredVisual from "@/components/ui/LayeredVisual";
import { serviceImages } from "@/data/images";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { snippets } from "@/data/snippets";
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
  const work = caseStudies.filter((c) => c.service === s.slug);
  const shot = work[0] ?? caseStudies[services.indexOf(s) % caseStudies.length];
  const snippet = s.tech.map((t) => snippets[t]).find(Boolean);
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceLd(s.name, s.seoDescription, `/services/${s.slug}`)} />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }, { name: s.short, path: `/services/${s.slug}` }]}
        title={s.name}
        text={s.tagline}
        visual={<LayeredVisual photo={serviceImages[s.slug]} illus={s.slug} priority />}
        bare
      >
        <Button href="/contact" variant="red">
          Get an estimate
        </Button>
        <Button href="/work" variant="outline">
          See our work
        </Button>
      </PageHero>

      <Intro paragraphs={s.intro} />

      <StickyStory title="What’s included" intro="Pick the parts you need. Most projects use all of them." items={s.capabilities} />

      <section className="theme-dark py-24 md:py-32">
        <div className="wrap grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 data-split className="display-md max-w-[11ch]">
              What you walk away with
            </h2>
            <div className="mt-10">
              <Checklist items={s.deliverables} />
            </div>
          </div>
          <div className="md:col-span-7">
            <div data-clip className="relative aspect-[4/3] overflow-hidden">
              <div data-clip-inner className="absolute inset-0">
                <ProjectVisual project={shot} className="h-full w-full" />
              </div>
            </div>
            <p className="mt-3 text-sm text-white/55">
              {shot.name}, {shot.client}
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 data-split className="display-md">
              Tools we use
            </h2>
            <p data-reveal className="mt-6 max-w-md text-lg text-muted">
              We choose per project. These come up most often for {s.short.toLowerCase()} work.
            </p>
            <div className="mt-8">
              <TechRow slugs={s.tech} />
            </div>
          </div>
          {snippet && (
            <div data-reveal className="md:col-span-7">
              <CodeWindow file={snippet.file} lang={snippet.lang} code={snippet.code} />
            </div>
          )}
        </div>
      </section>

      <ProcessScroller />

      {work.length > 0 && (
        <section className="wrap py-24 md:py-32">
          <SectionHead title="Recent projects" link={{ href: "/work", label: "All case studies" }} className="mb-14" />
          <div className="grid gap-10 md:grid-cols-2">
            {work.slice(0, 2).map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <FAQ faqs={s.faqs} title={`${s.short}: common questions`} />

      <section className="wrap pb-28">
        <h2 data-split className="display-md mb-12">
          Related services
        </h2>
        <VisualCards items={others.map((o) => ({ href: `/services/${o.slug}`, title: o.short, text: o.tagline, illus: o.slug }))} />
      </section>
    </>
  );
}
