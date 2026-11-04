import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import TechIcon from "@/components/ui/TechIcon";
import Button from "@/components/ui/Button";
import CodeWindow from "@/components/ui/CodeWindow";
import { snippets } from "@/data/snippets";
import { techCategories, technologies } from "@/data/technologies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technologies We Use: React, Next.js, Flutter, React Native, Node.js & More",
  description:
    "The stack behind our web, mobile and SaaS products: React, Next.js, Flutter, React Native, Swift, Kotlin, Node.js, Python, Laravel, PostgreSQL, AWS, AI and more.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Technologies", path: "/technologies" }]}
        label="Technologies"
        title="Technologies"
        text="The languages, frameworks and platforms our team works in every week. Each page explains what we build with it and when we’d pick something else."
        visual={<CodeWindow file={snippets.nextjs.file} lang={snippets.nextjs.lang} code={snippets.nextjs.code} />}
      >
        <Button href="/contact">Hire developers</Button>
      </PageHero>

      <div className="wrap pb-28">
        {techCategories.map((c) => {
          const list = technologies.filter((t) => t.category === c.key);
          if (!list.length) return null;
          return (
            <section key={c.key} id={c.key} className="grid scroll-mt-28 gap-8 border-t border-line py-14 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 data-split className="display-md">
                  {c.label}
                </h2>
                <p data-reveal className="mt-4 max-w-xs text-muted">
                  {c.blurb}
                </p>
              </div>
              <ul className="grid gap-x-10 sm:grid-cols-2 md:col-span-8">
                {list.map((t) => (
                  <li key={t.slug} data-reveal className="border-b border-line">
                    <Link href={`/technologies/${t.slug}`} className="group flex items-center gap-5 py-5">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card transition-colors duration-300 group-hover:bg-fg group-hover:text-bg">
                        <TechIcon icon={t.icon} name={t.name} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-semibold tracking-tight">{t.name}</span>
                        <span className="block truncate text-sm text-muted">{t.tagline}</span>
                      </span>
                      <span className="tri text-xs opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
