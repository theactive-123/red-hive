import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/sections/Breadcrumbs";
import InsightsList from "@/components/sections/InsightsList";
import TechIcon from "@/components/ui/TechIcon";
import JsonLd from "@/components/seo/JsonLd";
import { authors, posts, type Block } from "@/data/posts";
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

const authorOf = (k?: string) => (k ? authors[k] : undefined);
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
        <blockquote key={i} className="my-10 border-l-2 border-red pl-6 font-display text-2xl leading-snug text-navy">
          {b.text}
        </blockquote>
      );
    case "table":
      return (
        <div key={i} className="overflow-x-auto">
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
          author: authorOf(p.author)
            ? { "@type": "Person", name: authorOf(p.author)!.name, jobTitle: authorOf(p.author)!.role, ...(authorOf(p.author)!.url ? { url: authorOf(p.author)!.url } : {}) }
            : { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.png` } },
          keywords: p.tags.join(", "),
        }}
      />
      <article>
        <header className="wrap pt-32 md:pt-44">
          <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: p.category, path: `/insights/${p.slug}` }]} />
          <p data-reveal className="tag mt-12">
            {p.category} · {fmt(p.date)} · {p.readMinutes} min read
          </p>
          <h1 data-split="hero" className="display-lg mt-6 max-w-[18ch]">
            {p.title}
          </h1>
          <p data-reveal className="lead mt-10 max-w-3xl text-fg/80">
            {p.excerpt}
          </p>
          <p data-reveal className="mt-6 text-sm text-muted">
            By <span className="font-semibold text-fg">{authorOf(p.author)?.name ?? `the ${site.name} team`}</span>
            {authorOf(p.author) && <> · {authorOf(p.author)!.role}</>}
          </p>
        </header>
        <div className="wrap mt-16 grid gap-14 border-t border-line pt-14 pb-24 md:grid-cols-12">
          <aside className="order-2 space-y-10 md:order-1 md:col-span-3 md:sticky md:top-28 md:self-start">
            {service && (
              <div>
                <p className="tag mb-3">Related service</p>
                <Link href={`/services/${service.slug}`} className="link-line text-lg font-medium">
                  {service.short}
                </Link>
              </div>
            )}
            {techs.length > 0 && (
              <div>
                <p className="tag mb-3">Mentioned</p>
                <ul className="space-y-2">
                  {techs.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/technologies/${t.slug}`} className="inline-flex items-center gap-2.5">
                        <TechIcon icon={t.icon} name={t.name} className="h-4 w-4" />
                        <span className="link-line">{t.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
          <div className="prose-rh order-1 md:order-2 md:col-span-8 md:col-start-5">{p.body.map(renderBlock)}</div>
        </div>
      </article>
      <section className="wrap pb-24">
        <p className="tag mb-8">Keep reading</p>
        <InsightsList limit={2} exclude={p.slug} />
      </section>
    </>
  );
}
