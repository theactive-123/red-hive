import PageHero from "@/components/sections/PageHero";
import IndustriesList from "@/components/sections/IndustriesList";
import Button from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries — Healthcare, Fintech, E-commerce & More",
  description:
    "Custom software for healthcare, fintech, e-commerce, education, logistics, real estate, on-demand and travel businesses — built with compliance and scale in mind.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        label="Industries"
        title="Software that understands your sector"
        text="Regulations, workflows and user expectations differ by industry. We bring patterns that already work, so your budget goes into what makes you different."
      >
        <Button href="/contact">Talk to us</Button>
      </PageHero>
      <section className="wrap pb-28">
        <IndustriesList />
      </section>
    </>
  );
}
