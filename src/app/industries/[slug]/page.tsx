import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { Intro, TechRow, VisualCards } from "@/components/sections/Blocks";
import StickyStory from "@/components/sections/StickyStory";
import ProjectCard from "@/components/sections/ProjectCard";
import FAQ from "@/components/sections/FAQ";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import LayeredVisual from "@/components/ui/LayeredVisual";
import { industryImages } from "@/data/images";
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
  const work = caseStudies.filter((c) => c.industry === ind.slug);
  const others = industries.filter((x) => x.slug !== ind.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceLd(`${ind.name} Software Development`, ind.seoDescription, `/industries/${ind.slug}`)} />
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }, { name: ind.name, path: `/industries/${ind.slug}` }]}
        title={`${ind.name} software development`}
        text={ind.tagline}
        visual={<LayeredVisual photo={industryImages[ind.slug]} illus={ind.slug} priority />}
        bare
      >
        <Button href="/contact" variant="red">
          Discuss your project
        </Button>
      </PageHero>

      <Intro paragraphs={ind.intro} />

      <StickyStory title="Problems we solve" intro={`What usually gets in the way when building for ${ind.name.toLowerCase()}.`} items={ind.challenges} dark />

      <section className="wrap py-24 md:py-32">
        <SectionHead title="What we build" text="Products we’ve designed and shipped for teams in this space." className="mb-14" />
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ind.solutions.map((s, i) => (
            <li key={s.title} data-reveal className="group bg-bg p-8 transition-colors duration-500 hover:bg-navy hover:text-white">
              <span className="grid h-12 w-12 place-items-center bg-card text-red transition-colors group-hover:bg-red group-hover:text-white">
                <Icon name={ind.icon} className="h-6 w-6" />
              </span>
              <p className="mt-6 text-sm font-semibold text-red group-hover:text-white/60">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted group-hover:text-white/70">{s.text}</p>
            </li>
          ))}
        </ul>
        {ind.compliance.length > 0 && (
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
            <span className="mr-2 font-semibold">Built to support</span>
            {ind.compliance.map((c) => (
              <span key={c} className="cut bg-navy px-4 py-2 text-sm font-semibold text-white [--cut:8px]">
                {c}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="theme-light bg-card py-20">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <h2 data-split className="display-md md:col-span-4">
            Typical stack
          </h2>
          <div className="md:col-span-8">
            <TechRow slugs={ind.tech} />
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section className="wrap py-24">
          <SectionHead title="Work in this space" className="mb-14" />
          <div className="grid gap-10 md:grid-cols-2">
            {work.slice(0, 2).map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <FAQ faqs={ind.faqs} title={`${ind.name} questions`} />

      <section className="wrap pb-28">
        <h2 data-split className="display-md mb-12">
          Other industries
        </h2>
        <VisualCards items={others.map((o) => ({ href: `/industries/${o.slug}`, title: o.name, text: o.tagline, illus: o.slug }))} />
      </section>
    </>
  );
}
