import Icon from "@/components/ui/Icon";
import PageHero from "@/components/sections/PageHero";
import { LinkCards } from "@/components/sections/Blocks";
import Process from "@/components/sections/Process";
import Engagement from "@/components/sections/Engagement";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Software Development Services — Web, Mobile, SaaS & AI",
  description:
    "Explore Red Hive Digital’s software development services: custom web applications, iOS & Android apps, SaaS products, UI/UX design, MVPs, cloud, AI and ongoing support.",
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
        eyebrow="Services"
        title={<>Everything you need to build, launch &amp; scale software</>}
        text="Strategy, design, engineering and cloud — under one roof. Engage us for a single service or a full product team."
      >
        <Button href="/contact">Discuss your project</Button>
      </PageHero>
      <section className="container-x pb-24">
        <LinkCards
          items={services.map((s) => ({
            href: `/services/${s.slug}`,
            title: s.name,
            text: s.tagline,
            badge: (
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line-strong bg-ink text-red-hot">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
            ),
          }))}
        />
      </section>
      <Process />
      <Engagement />
      <CTA />
    </>
  );
}
