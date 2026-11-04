import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/sections/Breadcrumbs";
import { NumberedList, Prose, Split, TechRow } from "@/components/sections/Blocks";
import ProjectVisual from "@/components/ui/ProjectVisual";
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
  return c ? pageMetadata({ title: c.seoTitle, description: c.seoDescription, path: `/work/${c.slug}` }) : {};
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
    ["Industry", industry ? <Link href={`/industries/${industry.slug}`} className="link-line">{industry.name}</Link> : c.industry],
    ["Service", service ? <Link href={`/services/${service.slug}`} className="link-line">{service.short}</Link> : c.service],
    ["Platforms", c.platforms.join(", ")],
    ["Timeline", c.duration],
  ];

  return (
    <>
      <section className="pt-32 md:pt-44">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Work", path: "/work" }, { name: c.name, path: `/work/${c.slug}` }]} />
          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <h1 data-split="hero" className="display-xl md:col-span-8">
              {c.name}
            </h1>
            <p data-reveal className="lead text-fg/80 md:col-span-4">
              {c.summary}
            </p>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-5">
            {facts.map(([k, v]) => (
              <div key={k} data-reveal>
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="mt-1.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap pt-14">
          <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[21/10]">
            <div data-clip-inner className="absolute inset-0">
              <ProjectVisual project={c} className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      <Split index="01" label="Challenge" title="Where they started">
        <Prose paragraphs={c.challenge} />
      </Split>
      <Split index="02" label="Solution" title="What we built" className="!pt-0">
        <Prose paragraphs={c.solution} />
      </Split>

      <Split index="03" label="Features" title="Inside the product">
        <NumberedList items={c.features} />
      </Split>

      <section className="theme-dark py-24 md:py-32">
        <div className="wrap">
          <p data-reveal className="tag">
            <span className="text-fg">04</span> Results
          </p>
          <dl className="mt-12 grid gap-12 border-t border-line pt-12 md:grid-cols-3">
            {c.results.map((r) => (
              <div key={r.label} data-reveal>
                <dd className="display-lg" style={{ color: c.accent }}>
                  {r.value}
                </dd>
                <dt className="mt-4 max-w-xs text-muted">{r.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Split index="05" label="Technology" title="Under the hood">
        <TechRow slugs={c.tech} />
      </Split>

      <section className="wrap pb-28">
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group block border-t border-line pt-10">
          <p className="tag">Next project</p>
          <div className="mt-6 grid items-end gap-10 md:grid-cols-2">
            <p className="display-lg transition-colors duration-500 group-hover:text-red">{next.name}</p>
            <div className="overflow-hidden rounded-xl">
              <ProjectVisual project={next} className="aspect-[16/10] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
