import PageHero from "@/components/sections/PageHero";
import IndustriesList from "@/components/sections/IndustriesList";
import Button from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Work In: Healthcare, Fintech, E-commerce & More",
  description:
    "Custom software for healthcare, fintech, e-commerce, education, logistics, real estate, on-demand and travel companies, built with compliance and growth in mind.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        label="Industries"
        title="Software for the industry you’re in"
        text="Healthcare has HIPAA, fintech has PCI and audits, logistics has drivers on bad mobile signal. We’ve built for these constraints before, so you don’t pay for us to learn them."
      >
        <Button href="/contact">Talk to us</Button>
      </PageHero>
      <section className="wrap pb-28">
        <IndustriesList />
      </section>
    </>
  );
}
