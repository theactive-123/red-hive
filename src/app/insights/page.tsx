import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import { ArrowUpRight } from "@/components/ui/Icon";
import { posts } from "@/data/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights — Guides on Web, Mobile, SaaS & AI Development",
  description: "Practical guides from Red Hive Digital’s engineers on Flutter vs React Native, SaaS MVP costs, Next.js architecture, AI features and more.",
  path: "/insights",
});

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function InsightsPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero crumbs={[{ name: "Insights", path: "/insights" }]} eyebrow="Insights" title={<>Notes from the engineering floor</>} text="Straight answers on stacks, costs and architecture — written by the people who ship the code." />
      <section className="container-x pb-24">
        <Link href={`/insights/${lead.slug}`} data-reveal="up" data-cursor="Read" className="group relative block overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-14">
          <div className="bg-hex absolute inset-0 opacity-50" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red/25 blur-[100px] transition-opacity duration-700 group-hover:opacity-100" />
          <div className="relative max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-hot">
              {lead.category} · {fmt(lead.date)} · {lead.readMinutes} min read
            </p>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.8rem)] font-semibold text-white">{lead.title}</h2>
            <p className="mt-5 text-lg text-muted">{lead.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-white">
              Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </span>
          </div>
        </Link>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug} data-reveal="up">
              <Link href={`/insights/${p.slug}`} data-cursor="Read" className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-red/50">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-red-hot">{p.category}</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{p.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                </div>
                <p className="font-mono text-xs text-white/45">
                  {fmt(p.date)} · {p.readMinutes} min
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
