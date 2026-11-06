import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { VisualCards } from "@/components/sections/Blocks";
import { posts } from "@/data/posts";
import { postImages } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights: Web, Mobile, SaaS & AI Development Guides",
  description: "Practical guides from Red Hive Digital’s engineers: Flutter vs React Native, SaaS MVP costs, Next.js architecture, adding AI features and more.",
  path: "/insights",
});

const topics = [
  { title: "Choosing a stack", text: "Honest comparisons of frameworks and platforms, including when we would not recommend the popular option.", href: "/technologies" },
  { title: "Budgets and timelines", text: "What drives the cost of an MVP, a mobile app or a SaaS platform, with real ranges and ways to spend less.", href: "/services/mvp-development" },
  { title: "SaaS architecture", text: "Multi-tenancy, authentication, billing, permissions and the infrastructure decisions that are hard to undo later.", href: "/services/saas-development" },
  { title: "AI in real products", text: "Retrieval, agents, evaluation and cost control for teams adding AI features to software people already use.", href: "/services/ai-development" },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        title="Insights"
        text="Articles on stacks, costs and architecture, written by the people on our team who design and build these products."
      />
      <section className="wrap pb-24">
        <VisualCards cols={2} items={posts.map((p) => ({ href: `/insights/${p.slug}`, title: p.title, text: `${p.category} · ${p.readMinutes} min read`, illus: p.relatedService, photo: postImages[p.slug] }))} />
      </section>

      <section className="theme-light bg-card py-24">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 data-split className="display-md">
              What we write about
            </h2>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
              We write when a client question comes up often enough that a proper answer is worth publishing. Every article is based on projects we have
              shipped, not on research done for the article.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 md:col-span-8">
            {topics.map((t) => (
              <li key={t.title} data-reveal className="bg-white p-7">
                <h3 className="text-xl font-bold">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{t.text}</p>
                <Link href={t.href} className="mt-4 inline-block font-semibold underline decoration-red decoration-2 underline-offset-4">
                  Related service
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <p className="display-sm md:col-span-8">Have a question about your own product? Ask us and we’ll answer it directly, and maybe write about it next.</p>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact" className="cut inline-flex h-14 items-center bg-red px-8 font-semibold text-white [--cut:12px] hover:bg-navy">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
