import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { FeatureGrid, Prose, TechChips } from "@/components/sections/Blocks";
import CTA from "@/components/sections/CTA";
import ProjectVisual from "@/components/ui/ProjectVisual";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icon";
import { caseStudies } from "@/data/work";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({ title: c.seoTitle, description: c.seoDescription, path: `/work/${c.slug}` });
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const c = caseStudies[idx];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const service = services.find((s) => s.slug === c.service);
  const industry = industries.find((i) => i.slug === c.industry);

  const facts: [string, React.ReactNode][] = [
    ["Client", c.client],
    ["Industry", industry ? <Link href={`/industries/${industry.slug}`} className="underline decoration-red underline-offset-4">{industry.name}</Link> : c.industry],
    ["Service", service ? <Link href={`/services/${service.slug}`} className="underline decoration-red underline-offset-4">{service.short}</Link> : c.service],
    ["Platforms", c.platforms.join(", ")],
    ["Timeline", c.duration],
    ["Year", c.year],
  ];

  return (
    <>
      <PageHero crumbs={[{ name: "Work", path: "/work" }, { name: c.name, path: `/work/${c.slug}` }]} eyebrow={`${c.category} · Case study`} title={c.name} text={c.summary} />

      <section className="container-x">
        <div data-reveal="scale" className="overflow-hidden rounded-[2rem] border border-line">
          <div data-parallax="0.06">
            <ProjectVisual project={c} className="aspect-[16/10] sm:aspect-[21/9]" />
          </div>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 lg:grid-cols-6">
          {facts.map(([k, v]) => (
            <div key={k} className="bg-ink p-6">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">{k}</dt>
              <dd className="mt-2 text-sm text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The challenge" title="Where they started" className="mb-8" />
            <Prose paragraphs={c.challenge} />
          </div>
          <div>
            <SectionHeading eyebrow="The solution" title="What we built" className="mb-8" />
            <Prose paragraphs={c.solution} />
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <SectionHeading eyebrow="Key features" title="Inside the product" className="mb-12" />
        <FeatureGrid items={c.features} />
      </section>

      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-line p-10 sm:p-14" style={{ background: `linear-gradient(135deg, ${c.accent}33, transparent 60%)` }}>
          <p className="eyebrow mb-10">Results</p>
          <dl className="grid gap-10 sm:grid-cols-3">
            {c.results.map((r) => (
              <div key={r.label} data-reveal="up">
                <dd className="font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none text-white">{r.value}</dd>
                <dt className="mt-3 text-muted">{r.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TechChips slugs={c.tech} title="Technology behind it" />

      <section className="container-x py-16">
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group block overflow-hidden rounded-[2rem] border border-line">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-10 sm:p-14">
              <p className="eyebrow">Next case study</p>
              <p className="mt-4 font-display text-5xl font-semibold text-white sm:text-6xl">{next.name}</p>
              <p className="mt-3 max-w-md text-muted">{next.summary}</p>
              <span className="mt-8 inline-grid h-14 w-14 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:bg-red">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            <ProjectVisual project={next} className="aspect-[16/10] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
          </div>
        </Link>
      </section>
      <CTA />
    </>
  );
}
