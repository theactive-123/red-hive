import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import TechIcon from "@/components/ui/TechIcon";
import TiltCard from "@/components/ui/TiltCard";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { techCategories, technologies } from "@/data/technologies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technologies — React, Next.js, Flutter, React Native, Node.js & More",
  description:
    "The technology stack behind our web, mobile and SaaS products: React, Next.js, Flutter, React Native, Swift, Kotlin, Node.js, Python, Laravel, PostgreSQL, AWS, AI and more.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Technologies", path: "/technologies" }]}
        eyebrow="Technology stack"
        title={<>Modern tools, chosen for your product</>}
        text="We’re framework-fluent, not framework-loyal. Here’s the stack our engineers use to build fast, secure and maintainable software — and when we reach for each piece."
      >
        <Button href="/contact">Hire dedicated developers</Button>
      </PageHero>

      {techCategories.map((c) => {
        const list = technologies.filter((t) => t.category === c.key);
        if (!list.length) return null;
        return (
          <section key={c.key} id={c.key} className="container-x scroll-mt-28 py-16">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
              <SectionHeading eyebrow={`${list.length} technologies`} title={c.label} />
              <p data-reveal="up" className="max-w-sm text-muted">{c.blurb}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((t) => (
                <li key={t.slug} data-reveal="up">
                  <TiltCard>
                    <Link href={`/technologies/${t.slug}`} data-cursor="Explore" className="group relative flex h-full flex-col gap-8 overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-white/25">
                      <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50" style={{ background: t.color }} />
                      <span className="relative grid h-14 w-14 place-items-center bg-white/[0.04] clip-hex">
                        <TechIcon icon={t.icon} name={t.name} className="h-7 w-7 text-white" />
                      </span>
                      <span className="relative">
                        <span className="block font-display text-xl font-semibold text-white">{t.name}</span>
                        <span className="mt-2 block text-sm leading-relaxed text-muted">{t.tagline}</span>
                      </span>
                    </Link>
                  </TiltCard>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <CTA title="Need engineers who know your stack?" />
    </>
  );
}
