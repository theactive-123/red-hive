import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { FeatureGrid, LinkCards, Prose } from "@/components/sections/Blocks";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Process from "@/components/sections/Process";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import TechOrbit from "@/components/ui/TechOrbit";
import TechIcon from "@/components/ui/TechIcon";
import Icon from "@/components/ui/Icon";
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
  if (!t) return {};
  return pageMetadata({ title: t.seoTitle, description: t.seoDescription, path: `/technologies/${t.slug}` });
}

export default async function TechPage({ params }: PageProps<"/technologies/[slug]">) {
  const { slug } = await params;
  const t = technologies.find((x) => x.slug === slug);
  if (!t) notFound();
  const cat = techCategories.find((c) => c.key === t.category);
  const related = getTechs(t.related);
  const relatedServices = services.filter((s) => s.tech.includes(t.slug)).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceLd(`${t.name} Development`, t.seoDescription, `/technologies/${t.slug}`)} />
      <PageHero
        crumbs={[{ name: "Technologies", path: "/technologies" }, { name: t.name, path: `/technologies/${t.slug}` }]}
        eyebrow={`${cat?.label ?? "Technology"} · ${t.name}`}
        title={
          <>
            {t.name} development <span className="text-gradient-red">company</span>
          </>
        }
        text={t.tagline}
        aside={<TechOrbit icon={t.icon} name={t.name} color={t.color} toolkit={t.toolkit} />}
      >
        <Button href="/contact">Hire {t.name} developers</Button>
        <Button href="#offerings" variant="ghost">
          What we build
        </Button>
      </PageHero>

      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Overview" title={`Building with ${t.name}`} />
          <Prose paragraphs={t.intro} lead />
        </div>
      </section>

      <section id="offerings" className="container-x scroll-mt-28 py-20">
        <SectionHeading eyebrow="Services" title={`${t.name} development services`} className="mb-12" />
        <FeatureGrid items={t.offerings} />
      </section>

      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Why it works" title={`Why choose ${t.name}?`} />
            <div data-reveal="up" className="mt-10">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/45">Our {t.name} toolkit</p>
              <ul className="flex flex-wrap gap-2">
                {t.toolkit.map((k) => (
                  <li key={k} className="rounded-full border border-line-strong px-4 py-2 text-sm text-white/80">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ol className="space-y-4">
            {t.benefits.map((b, i) => (
              <li key={b.title} data-reveal="up" className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-8">
                <span className="absolute -right-4 -top-6 font-display text-[7rem] font-bold leading-none text-white/[0.03] transition-colors group-hover:text-red/10">{i + 1}</span>
                <h3 className="relative text-2xl font-semibold text-white">{b.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-14">
          <div className="bg-hex absolute inset-0 opacity-50" />
          <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow="Use cases" title={`What we build with ${t.name}`} />
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.useCases.map((u) => (
                <li key={u} data-reveal="up" className="flex items-center gap-3 rounded-2xl bg-ink/70 p-5 text-white/85">
                  <span className="h-2.5 w-2.5 shrink-0 bg-red clip-hex" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="container-x py-20">
          <SectionHeading eyebrow="Related services" title={`Where ${t.name} fits in`} className="mb-12" />
          <LinkCards items={relatedServices.map((s) => ({ href: `/services/${s.slug}`, title: s.short, text: s.tagline, badge: <Icon name={s.icon} className="h-7 w-7 text-red-hot" /> }))} />
        </section>
      )}

      <Process />
      <FAQ faqs={t.faqs} title={`${t.name} development FAQs`} />

      <section className="container-x py-20">
        <SectionHeading eyebrow="Pairs well with" title="Related technologies" className="mb-12" />
        <ul className="grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} data-reveal="up">
              <Link href={`/technologies/${r.slug}`} className="group flex items-center gap-5 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-red/50">
                <TechIcon icon={r.icon} name={r.name} className="h-10 w-10 shrink-0 text-white" />
                <span>
                  <span className="block font-display text-xl font-semibold text-white">{r.name}</span>
                  <span className="mt-1 line-clamp-1 block text-sm text-muted">{r.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTA title={`Build your next product with ${t.name}`} />
    </>
  );
}
