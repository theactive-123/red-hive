import PageHero from "@/components/sections/PageHero";
import ServicesList from "@/components/sections/ServicesList";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Engagement from "@/components/sections/Engagement";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Software Development Services — Web, Mobile, SaaS & AI",
  description:
    "Custom web applications, iOS & Android apps, SaaS products, UI/UX design, MVPs, cloud, AI and ongoing support — Red Hive Digital’s software development services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/services/${s.slug}`, name: s.name })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        label="Services"
        title="Everything it takes to ship great software"
        text="Strategy, design, engineering and cloud under one roof. Bring us in for a single piece or the whole product."
      >
        <Button href="/contact">Discuss your project</Button>
      </PageHero>
      <section className="wrap pb-28">
        <ServicesList items={services.map((s) => ({ slug: s.slug, name: s.name, tagline: s.tagline, icon: s.icon, tags: s.capabilities.map((c) => c.title) }))} />
      </section>
      <section className="theme-light bg-paper-2 py-28 md:py-36">
        <div className="wrap">
          <SectionHead label="Process" title="How a project runs" link={{ href: "/process", label: "Read more" }} className="mb-16" />
          <ProcessSteps />
        </div>
      </section>
      <Engagement />
    </>
  );
}
