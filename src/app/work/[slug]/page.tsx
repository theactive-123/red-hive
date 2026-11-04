import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/sections/Breadcrumbs";
import { Prose, Split, TechRow } from "@/components/sections/Blocks";
import StickyStory from "@/components/sections/StickyStory";
import ProjectVisual from "@/components/ui/ProjectVisual";
import Photo from "@/components/ui/Photo";
import { caseHeroes, caseImages } from "@/data/images";
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
          {caseHeroes[c.slug] && <Photo src={caseHeroes[c.slug].src} alt={caseHeroes[c.slug].alt} priority className="aspect-[6/5] md:aspect-[2/1]" sizes="100vw" drift={false} />}
        </div>
      </section>

      <Split title="Where they started">
        <Prose paragraphs={c.challenge} />
      </Split>
      <Split title="What we built" className="!pt-0">
        <Prose paragraphs={c.solution} />
      </Split>

      <section className="wrap py-10">
        <div data-clip className="relative aspect-[4/3] overflow-hidden md:aspect-[16/8]">
          <div data-clip-inner className="absolute inset-0">
            <ProjectVisual project={c} className="h-full w-full" />
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">{c.name}: main screen</p>
      </section>

      <StickyStory title="Inside the product" items={c.features} dark />


      <Split title="Under the hood">
        <TechRow slugs={c.tech} />
      </Split>

      <section className="wrap pb-28">
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group block border-t border-line pt-10">
          <p className="text-sm font-semibold text-muted">Next project</p>
          <div className="mt-6 grid items-end gap-10 md:grid-cols-2">
            <p className="display-lg transition-colors duration-500 group-hover:text-red">{next.name}</p>
            <div className="overflow-hidden rounded-xl">
              {caseImages[next.slug] && <Photo src={caseImages[next.slug].src} alt={caseImages[next.slug].alt} className="aspect-[6/5]" hoverZoom drift={false} />}
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
