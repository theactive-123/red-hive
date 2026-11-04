import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { FeatureGrid, Prose, TechChips } from "@/components/sections/Blocks";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import WorkStack from "@/components/sections/WorkStack";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
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
  if (!ind) return {};
  return pageMetadata({ title: ind.seoTitle, description: ind.seoDescription, path: `/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = industries.find((x) => x.slug === slug);
  if (!ind) notFound();
  const work = caseStudies.filter((c) => c.industry === ind.slug);

  return (
    <>
      <JsonLd data={serviceLd(`${ind.name} Software Development`, ind.seoDescription, `/industries/${ind.slug}`)} />
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }, { name: ind.name, path: `/industries/${ind.slug}` }]}
        eyebrow={ind.name}
        title={<>{ind.name} software development</>}
        text={ind.tagline}
        aside={
          <div className="relative mx-auto grid aspect-square w-full max-w-[380px] place-items-center">
            <div className="absolute inset-[12%] rounded-full bg-red/30 blur-[80px]" />
            <div className="absolute inset-0 animate-spin-slow bg-gradient-to-br from-red/50 via-transparent to-red-deep/40 clip-hex [animation-duration:30s]" />
            <div className="absolute inset-[3px] bg-ink-2 clip-hex" />
            <div className="bg-hex absolute inset-[3px] opacity-70 clip-hex" />
            <Icon name={ind.icon} className="relative h-1/3 w-1/3 text-red-hot" />
          </div>
        }
      >
        <Button href="/contact">Discuss your project</Button>
      </PageHero>

      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Overview" title={`Building for ${ind.name.toLowerCase()}`} />
          <Prose paragraphs={ind.intro} lead />
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Challenges" title="Problems we solve" className="mb-12" />
        <div className="grid gap-4 md:grid-cols-2">
          {ind.challenges.map((c) => (
            <div key={c.title} data-reveal="up" className="rounded-3xl border border-line bg-surface p-8">
              <h3 className="text-xl font-semibold text-white">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Solutions" title={`${ind.name} solutions we build`} className="mb-12" />
        <FeatureGrid items={ind.solutions} />
      </section>

      {ind.compliance.length > 0 && (
        <section className="container-x py-12">
          <div data-reveal="up" className="flex flex-wrap items-center gap-4 rounded-3xl border border-red/40 bg-red/5 p-8">
            <p className="mr-4 font-display text-xl font-semibold text-white">Built with compliance in mind</p>
            {ind.compliance.map((c) => (
              <span key={c} className="rounded-full border border-line-strong bg-ink px-4 py-2 text-sm text-white/85">
                {c}
              </span>
            ))}
          </div>
        </section>
      )}

      <TechChips slugs={ind.tech} title={`Our ${ind.name.toLowerCase()} tech stack`} />

      {work.length > 0 && (
        <section className="container-x py-20">
          <SectionHeading eyebrow="Related work" title="Projects in this space" className="mb-12" />
          <WorkStack items={work} limit={2} />
        </section>
      )}

      <FAQ faqs={ind.faqs} title={`${ind.name} software FAQs`} />
      <CTA title={`Let’s build your ${ind.name.toLowerCase()} product`} />
    </>
  );
}
