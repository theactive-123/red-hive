import PageHero from "@/components/sections/PageHero";
import InsightsList from "@/components/sections/InsightsList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights — Guides on Web, Mobile, SaaS & AI Development",
  description: "Practical guides from Red Hive Digital’s engineers: Flutter vs React Native, SaaS MVP costs, Next.js architecture, adding AI features and more.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Insights", path: "/insights" }]} label="Insights" title="Notes from the studio" text="Straight answers on stacks, costs and architecture — written by the people who ship the code." />
      <section className="wrap pb-32">
        <InsightsList limit={50} />
      </section>
    </>
  );
}
