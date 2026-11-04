import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import ProcessScroller from "@/components/sections/ProcessScroller";
import Engagement from "@/components/sections/Engagement";
import LayeredVisual from "@/components/ui/LayeredVisual";
import Photo from "@/components/ui/Photo";
import { serviceImages, studio } from "@/data/images";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Software Development Services: Web, Mobile, SaaS & AI",
  description:
    "Custom web applications, iOS & Android apps, SaaS products, UI/UX design, MVPs, cloud, AI and ongoing support from Red Hive Digital.",
  path: "/services",
});

export default function ServicesPage() {
  const [a, b, c, ...rest] = services;
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
        title="Services"
        text="Design, engineering and hosting for web and mobile products. Hire us for one piece, like a mobile app or a design refresh, or for the whole thing."
        visual={<LayeredVisual photo={studio.design} illus="ui-ux-design" priority />}
        bare
      >
        <Button href="/contact" variant="red">
          Discuss your project
        </Button>
      </PageHero>

      {/* The three core services, alternating */}
      <section className="wrap space-y-24 py-16 md:space-y-32 md:py-24">
        {[a, b, c].map((s, i) => (
          <Link key={s.slug} href={`/services/${s.slug}`} data-cursor="Open" className="group grid items-center gap-10 md:grid-cols-12">
            <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
              <LayeredVisual photo={serviceImages[s.slug]} illus={s.slug} flip={i % 2 === 1} />
            </div>
            <div className={`md:col-span-5 ${i % 2 ? "md:order-1" : "md:col-start-8"}`}>
              <p className="text-sm font-semibold text-red">0{i + 1}</p>
              <h2 data-split className="display-lg mt-3 transition-colors group-hover:text-red">
                {s.short}
              </h2>
              <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
                {s.intro[0]}
              </p>
              <ul data-reveal className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
                {s.capabilities.slice(0, 4).map((cap) => (
                  <li key={cap.title} className="flex items-center gap-2.5 text-[0.98rem]">
                    <span className="tri text-[0.65rem]" />
                    {cap.title}
                  </li>
                ))}
              </ul>
              <span data-reveal className="mt-8 inline-block font-semibold underline decoration-red decoration-2 underline-offset-[6px]">
                Read more
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Everything else, as a grid of illustrated cards */}
      <section className="theme-dark py-24 md:py-32">
        <div className="wrap">
          <h2 data-split className="display-md max-w-[14ch]">
            Everything around the build
          </h2>
          <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((s) => (
              <li key={s.slug} className="bg-navy">
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-navy-2">
                  <Photo src={serviceImages[s.slug].src} alt={serviceImages[s.slug].alt} className="aspect-[6/5]" hoverZoom drift={false} sizes="(min-width: 1024px) 25vw, 50vw" />
                  <h3 className="display-sm mt-6 transition-colors group-hover:text-red">{s.short}</h3>
                  <p className="mt-2 text-sm text-white/60">{s.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessScroller />
      <Engagement />
    </>
  );
}
