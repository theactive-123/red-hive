import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { VisualCards } from "@/components/sections/Blocks";
import StickyStory from "@/components/sections/StickyStory";
import FAQ from "@/components/sections/FAQ";
import Button from "@/components/ui/Button";
import TechBanner from "@/components/ui/TechBanner";
import CodeWindow from "@/components/ui/CodeWindow";
import TechIcon from "@/components/ui/TechIcon";
import JsonLd from "@/components/seo/JsonLd";
import { getTechs, techCategories, technologies } from "@/data/technologies";
import { services } from "@/data/services";
import { snippets } from "@/data/snippets";
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
  const snippet = snippets[t.slug];
  const relatedServices = services.filter((s) => s.tech.includes(t.slug)).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceLd(`${t.name} Development`, t.seoDescription, `/technologies/${t.slug}`)} />
      <PageHero
        crumbs={[{ name: "Technologies", path: "/technologies" }, { name: t.name, path: `/technologies/${t.slug}` }]}
        title={`${t.name} development`}
        text={t.tagline}
        media={<TechBanner icon={t.icon} name={t.name} color={t.color} toolkit={t.toolkit} />}
      >
        <Button href="/contact" variant="red">
          Hire {t.name} developers
        </Button>
      </PageHero>

      <section className="wrap py-20 md:py-28">
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm font-semibold text-red">{cat?.label}</p>
            <h2 data-split className="display-md mt-3">
              Building with {t.name}
            </h2>
            <div className="mt-8 space-y-5">
              {t.intro.map((p, i) => (
                <p key={i} data-reveal className={i === 0 ? "lead" : "text-lg leading-relaxed text-muted"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          {snippet && (
            <div data-reveal className="md:sticky md:top-28 md:col-span-7">
              <CodeWindow file={snippet.file} lang={snippet.lang} code={snippet.code} />
              <p className="mt-3 text-sm text-muted">The kind of {t.name} code our team writes every week.</p>
            </div>
          )}
        </div>
      </section>

      <StickyStory title={`What we build with ${t.name}`} items={t.offerings} dark />

      <section className="wrap py-24 md:py-32">
        <h2 data-split className="display-md max-w-[16ch]">
          Why teams pick {t.name}
        </h2>
        <div className="mt-14 grid gap-px bg-line md:grid-cols-2">
          {t.benefits.map((b, i) => (
            <div key={b.title} data-reveal className="group bg-bg p-8 transition-colors duration-500 hover:bg-card md:p-10">
              <span className="font-display text-5xl font-extrabold text-red/20 transition-colors group-hover:text-red">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display-sm mt-4">{b.title}</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="theme-light bg-card py-24 md:py-28">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 data-split className="display-md">
              Good fits
            </h2>
          </div>
          <ul className="flex flex-wrap content-start gap-3 md:col-span-8">
            {t.useCases.map((u) => (
              <li key={u} data-reveal className="cut bg-white px-6 py-4 text-lg font-medium [--cut:10px]">
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="wrap py-24 md:py-32">
          <h2 data-split className="display-md mb-12">
            Where we use it
          </h2>
          <VisualCards items={relatedServices.map((s) => ({ href: `/services/${s.slug}`, title: s.short, text: s.tagline, illus: s.slug }))} />
        </section>
      )}

      <FAQ faqs={t.faqs} title={`${t.name} questions`} />

      <section className="wrap pb-28">
        <h2 data-split className="display-md mb-10">
          Pairs well with
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {getTechs(t.related).map((r) => (
            <li key={r.slug} data-reveal>
              <Link href={`/technologies/${r.slug}`} className="group flex items-center gap-5 bg-card p-6 transition-colors hover:bg-navy hover:text-white">
                <span className="grid h-14 w-14 shrink-0 place-items-center text-white" style={{ background: r.color }}>
                  <TechIcon icon={r.icon} name={r.name} className="h-7 w-7" color="#fff" />
                </span>
                <span>
                  <span className="block text-xl font-bold">{r.name}</span>
                  <span className="mt-1 line-clamp-1 block text-sm opacity-70">{r.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
