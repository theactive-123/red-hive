import { notFound } from "next/navigation";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/sections/PageHero";
import { Checklist, FeatureGrid, LinkCards, Prose, TechChips } from "@/components/sections/Blocks";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import WorkStack from "@/components/sections/WorkStack";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
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
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 6);
  const work = caseStudies.filter((c) => c.service === s.slug);

  return (
    <>
      <JsonLd data={serviceLd(s.name, s.seoDescription, `/services/${s.slug}`)} />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }, { name: s.short, path: `/services/${s.slug}` }]}
        eyebrow={s.short}
        title={s.name}
        text={s.tagline}
        aside={
          <div className="glass relative overflow-hidden rounded-3xl p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red/40 blur-3xl" />
            <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-red text-white">
              <Icon name={s.icon} className="h-8 w-8" />
            </span>
            <p className="relative mt-6 font-display text-xl font-semibold text-white">What you get</p>
            <ul className="relative mt-4 space-y-2 text-sm text-white/75">
              {s.deliverables.slice(0, 4).map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-red-hot">—</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Button href="/contact">Get a free estimate</Button>
        <Button href="/work" variant="ghost">
          See our work
        </Button>
      </PageHero>

      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Overview" title={`Why teams choose us for ${s.short.toLowerCase()}`} />
          <Prose paragraphs={s.intro} lead />
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Capabilities" title="What we deliver" className="mb-12" />
        <FeatureGrid items={s.capabilities} />
      </section>

      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Outcomes" title="Deliverables you can count on" text="Every engagement ends with assets you own and a product that’s ready for real users." />
          <Checklist items={s.deliverables} />
        </div>
      </section>

      <TechChips slugs={s.tech} />
      <Process />

      {work.length > 0 && (
        <section className="container-x py-20">
          <SectionHeading eyebrow="Related work" title="Recent projects" className="mb-12" />
          <WorkStack items={work} limit={2} />
        </section>
      )}

      <FAQ faqs={s.faqs} title={`${s.short}: your questions answered`} />

      <section className="container-x py-20">
        <SectionHeading eyebrow="Explore" title="More services" className="mb-12" />
        <LinkCards
          items={others.map((o) => ({
            href: `/services/${o.slug}`,
            title: o.short,
            text: o.tagline,
            badge: <Icon name={o.icon} className="h-7 w-7 text-red-hot" />,
          }))}
        />
      </section>
      <CTA title={`Let’s talk about your ${s.short.toLowerCase()} project`} />
    </>
  );
}
