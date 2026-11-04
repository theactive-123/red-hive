import PageHero from "@/components/sections/PageHero";
import { VisualCards } from "@/components/sections/Blocks";
import { posts } from "@/data/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights: Guides on Web, Mobile, SaaS & AI Development",
  description: "Practical guides from Red Hive Digital’s engineers: Flutter vs React Native, SaaS MVP costs, Next.js architecture, adding AI features and more.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Insights", path: "/insights" }]} title="Insights" text="Articles on stacks, costs and architecture, written by the people on our team who build these products." />
      <section className="wrap pb-32">
        <VisualCards cols={2} items={posts.map((p) => ({ href: `/insights/${p.slug}`, title: p.title, text: `${p.category} · ${p.readMinutes} min read`, illus: p.relatedService }))} />
      </section>
    </>
  );
}
