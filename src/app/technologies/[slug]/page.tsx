import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { LinkRows, NumberedList, Prose, Split } from "@/components/sections/Blocks";
import FAQ from "@/components/sections/FAQ";
import ProcessSteps from "@/components/sections/ProcessSteps";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import TechBanner from "@/components/ui/TechBanner";
import JsonLd from "@/components/seo/JsonLd";
import { getTechs, techCategories, technologies } from "@/data/technologies";
import { services } from "@/data/services";
import { pageMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return technologies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/technologies/[slug]">) {
  const { slug } = await params;
  const t = technologies.find((x) => x.slug === slug);
  return t ? pageMetadata({ title: t.seoTitle, description: t.seoDescription, path: `/technologies/${t.slug}` }) : {};
}

export default async function TechPage({ params }: PageProps<"/technologies/[slug]">) {
  const { slug } = await params;
  const t = technologies.find((x) => x.slug === slug);
  if (!t) notFound();
  const cat = techCategories.find((c) => c.key === t.category);
  const relatedServices = services.filter((s) => s.tech.includes(t.slug)).slice(0, 4);

  return (
    <>
      <JsonLd data={serviceLd(`${t.name} Development`, t.seoDescription, `/technologies/${t.slug}`)} />
      <PageHero
        crumbs={[{ name: "Technologies", path: "/technologies" }, { name: t.name, path: `/technologies/${t.slug}` }]}
        label={`${cat?.label ?? "Technology"} · ${t.name}`}
        title={`${t.name} development`}
        text={t.tagline}
        media={<TechBanner icon={t.icon} name={t.name} color={t.color} toolkit={t.toolkit} />}
      >
        <Button href="/contact">Hire {t.name} developers</Button>
      </PageHero>

      <Split index="01" label="Overview">
        <Prose paragraphs={t.intro} />
      </Split>

      <Split index="02" label="Services" title={`What we build with ${t.name}`}>
        <NumberedList items={t.offerings} />
      </Split>

      <section className="theme-dark py-24 md:py-32">
        <div className="wrap">
          <SectionHead index="03" label="Why it works" title={`Why teams choose ${t.name}`} className="mb-14" />
          <div className="grid border-b border-line md:grid-cols-2 md:gap-x-12">
            {t.benefits.map((b) => (
              <div key={b.title} data-reveal className="border-t border-line py-10">
                <h3 className="display-sm">{b.title}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Split index="04" label="Use cases" title="Where it shines">
        <ul className="flex flex-wrap gap-2">
          {t.useCases.map((u) => (
            <li key={u} data-reveal className="rounded-full border border-line px-5 py-3 text-[0.95rem]">
              {u}
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <p data-reveal className="tag mb-5">
            Toolkit
          </p>
          <p data-reveal className="lead">
            {t.toolkit.join(" · ")}
          </p>
        </div>
      </Split>

      <section className="theme-light bg-paper-2 py-24 md:py-32">
        <div className="wrap">
          <SectionHead index="05" label="Process" title="How we deliver" className="mb-14" />
          <ProcessSteps />
        </div>
      </section>

      <FAQ faqs={t.faqs} title={`${t.name} questions`} />

      {relatedServices.length > 0 && (
        <Split label="Related services">
          <LinkRows items={relatedServices.map((s) => ({ href: `/services/${s.slug}`, title: s.name, text: s.tagline }))} />
        </Split>
      )}
      <Split label="Pairs well with" className="!pt-0">
        <LinkRows items={getTechs(t.related).map((r) => ({ href: `/technologies/${r.slug}`, title: r.name, text: r.tagline }))} />
      </Split>
    </>
  );
}
