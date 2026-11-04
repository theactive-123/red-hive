import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/sections/Breadcrumbs";
import CTA from "@/components/sections/CTA";
import TechIcon from "@/components/ui/TechIcon";
import JsonLd from "@/components/seo/JsonLd";
import { posts, type Block } from "@/data/posts";
import { getTechs } from "@/data/technologies";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  const base = pageMetadata({ title: p.seoTitle, description: p.seoDescription, path: `/insights/${p.slug}`, keywords: p.tags });
  return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: p.date } };
}

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "p":
      return <p key={i}>{b.text}</p>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i} className="my-10 border-l-2 border-red pl-6 font-display text-2xl leading-snug text-white">
          {b.text}
        </blockquote>
      );
    case "table":
      return (
        <div key={i} className="overflow-x-auto" data-lenis-prevent>
          <table>
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function PostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const techs = getTechs(p.relatedTech);
  const service = services.find((s) => s.slug === p.relatedService);
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.seoDescription,
          datePublished: p.date,
          dateModified: p.date,
          mainEntityOfPage: `${site.url}/insights/${p.slug}`,
          image: `${site.url}/og.png`,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.png` } },
          keywords: p.tags.join(", "),
        }}
      />
      <article>
        <header className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-red/20 blur-[140px]" />
          <div className="container-x relative max-w-4xl">
            <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: p.category, path: `/insights/${p.slug}` }]} />
            <p data-reveal="fade" className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-red-hot">
              {p.category} · {fmt(p.date)} · {p.readMinutes} min read
            </p>
            <h1 data-split="hero" className="mt-6 text-[clamp(2.3rem,5.5vw,4.6rem)] font-semibold text-white">
              {p.title}
            </h1>
            <p data-reveal="up" className="mt-8 text-xl leading-relaxed text-muted">
              {p.excerpt}
            </p>
          </div>
        </header>
        <div className="container-x grid max-w-6xl gap-14 pb-20 lg:grid-cols-[1fr_260px]">
          <div className="prose-rh max-w-3xl">{p.body.map(renderBlock)}</div>
          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            {techs.length > 0 && (
              <div className="rounded-3xl border border-line bg-surface p-6">
                <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/45">Mentioned tech</p>
                <ul className="space-y-3">
                  {techs.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/technologies/${t.slug}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
                        <TechIcon icon={t.icon} name={t.name} className="h-5 w-5" />
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service && (
              <Link href={`/services/${service.slug}`} className="block rounded-3xl border border-red/40 bg-red/10 p-6 transition-colors hover:bg-red/20">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-red-hot">Related service</p>
                <p className="mt-3 font-display text-xl font-semibold text-white">{service.short}</p>
                <p className="mt-2 text-sm text-white/70">{service.tagline}</p>
              </Link>
            )}
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </article>
      <section className="container-x pb-12">
        <p className="eyebrow mb-8">Keep reading</p>
        <ul className="grid gap-6 md:grid-cols-2">
          {more.map((m) => (
            <li key={m.slug}>
              <Link href={`/insights/${m.slug}`} className="group block h-full rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-red/50">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-red-hot">{m.category}</p>
                <p className="mt-3 font-display text-2xl font-semibold text-white">{m.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
