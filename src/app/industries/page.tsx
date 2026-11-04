import PageHero from "@/components/sections/PageHero";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import WhyUs from "@/components/sections/WhyUs";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve — Healthcare, Fintech, E-commerce & More",
  description:
    "Custom software for healthcare, fintech, e-commerce, education, logistics, real estate, on-demand and travel businesses — built with compliance and scale in mind.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries"
        title={<>Software that speaks your industry’s language</>}
        text="Regulations, workflows and user expectations differ by sector. We bring patterns that already work — so you spend your budget on what makes you different."
      >
        <Button href="/contact">Talk to a specialist</Button>
      </PageHero>
      <section className="container-x pb-20">
        <IndustriesGrid />
      </section>
      <WhyUs />
      <CTA />
    </>
  );
}
