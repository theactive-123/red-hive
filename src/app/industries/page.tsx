import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Photo from "@/components/ui/Photo";
import Illustration from "@/components/illustrations/Illustration";
import LayeredVisual from "@/components/ui/LayeredVisual";
import { industryImages } from "@/data/images";
import Button from "@/components/ui/Button";
import { industries } from "@/data/industries";
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
        title="Software for the industry you’re in"
        text="Healthcare has HIPAA, fintech has PCI and audits, logistics has drivers on bad mobile signal. We’ve built for these constraints before, so you don’t pay for us to learn them."
        visual={<LayeredVisual photo={industryImages.logistics} illus="logistics" priority />}
        bare
      >
        <Button href="/contact" variant="red">
          Talk to us
        </Button>
      </PageHero>
      <section className="wrap pb-28">
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {industries.map((ind, i) => (
            <li key={ind.slug} data-reveal className={i % 2 ? "md:mt-24" : ""}>
              <Link href={`/industries/${ind.slug}`} data-cursor="Explore" className="group block">
                {industryImages[ind.slug] ? (
                  <Photo src={industryImages[ind.slug]!.src} alt={industryImages[ind.slug]!.alt} className="cut-tl aspect-[6/5] [--cut:36px]" hoverZoom />
                ) : (
                  <div className="cut-tl flex aspect-[6/5] items-center bg-card p-6 [--cut:36px] md:p-10">
                    <Illustration name={ind.slug} className="h-auto w-full" />
                  </div>
                )}
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="display-sm transition-colors group-hover:text-red">{ind.name}</h2>
                    <p className="mt-2 max-w-md text-muted">{ind.tagline}</p>
                  </div>
                  {ind.compliance[0] && <span className="shrink-0 bg-navy px-3 py-1.5 text-xs font-semibold text-white">{ind.compliance[0]}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
