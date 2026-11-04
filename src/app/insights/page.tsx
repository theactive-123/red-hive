import PageHero from "@/components/sections/PageHero";
import InsightsList from "@/components/sections/InsightsList";
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
        <InsightsList limit={50} />
      </section>
    </>
  );
}
