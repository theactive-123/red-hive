import HomeHero from "@/components/sections/HomeHero";
import ServiceShowcase from "@/components/sections/ServiceShowcase";
import ProjectCard from "@/components/sections/ProjectCard";
import TechIndex from "@/components/sections/TechIndex";
import MobileShowcase from "@/components/sections/MobileShowcase";
import ProcessScroller from "@/components/sections/ProcessScroller";
import Showreel from "@/components/sections/Showreel";
import IndustriesList from "@/components/sections/IndustriesList";
import Testimonials from "@/components/sections/Testimonials";
import InsightsList from "@/components/sections/InsightsList";
import FAQ from "@/components/sections/FAQ";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/work";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { studio } from "@/data/images";
import { ArrowLink } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: `${site.name} | Web App, Mobile App & SaaS Development Company`,
  absoluteTitle: true,
  description:
    "Red Hive Digital designs and builds custom web applications, iOS and Android apps and SaaS products, using React, Next.js, Flutter, React Native, Node.js and AI.",
  path: "/",
  keywords: ["custom software development company", "web application development", "mobile app development company", "SaaS development services", "Flutter app development", "React Native development"],
});

const homeFaqs = [
  { q: "What does Red Hive Digital build?", a: "Custom web applications, iOS and Android apps, and SaaS products, along with the APIs, cloud setup and AI features behind them. We work with founders building a first version and with companies replacing older software." },
  { q: "How much does a custom app or SaaS product cost?", a: "It depends on scope, platforms and integrations. A focused MVP usually starts in the low tens of thousands of dollars and bigger platforms cost more. After a short call we send an estimate broken down by feature, so you can choose what to build first." },
  { q: "How long until we launch?", a: "Most MVPs launch in 8 to 14 weeks. Bigger products ship in phases. You see working software every two weeks, so you can put it in front of users early." },
  { q: "Do I own the source code?", a: "Yes, all of it. Code, designs and infrastructure sit in your own accounts from the first commit. We're happy to sign an NDA before you share details." },
  { q: "Can you take over an existing project?", a: "Yes. We start with a code and architecture review, fix anything urgent, add tests and a deployment pipeline, and then carry on with a clear plan." },
];

const also = ["ui-ux-design", "mvp-development", "enterprise-software-development", "ecommerce-development", "cloud-devops", "ai-development", "api-integration", "maintenance-support"];

export default function Home() {
  const [lead, ...rest] = caseStudies;
  return (
    <>
      <HomeHero />
      <Showreel />

      <section className="wrap py-28 md:py-40">
        <SectionHead
          title="What we build"
          text="Most of our work falls into three areas. We design it, write the code, ship it and look after it once it's live."
          className="mb-20 md:mb-28"
        />
        <ServiceShowcase />
        <div data-reveal className="mt-24 bg-card p-8 md:mt-32 md:p-12">
          <p className="display-sm">We also help with</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-lg">
            {services
              .filter((s) => also.includes(s.slug))
              .map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link-line font-medium">
                    {s.short}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="theme-dark py-28 md:py-40">
        <div className="wrap">
          <SectionHead title="Recent work" text="Mobile apps, web apps and SaaS we’ve designed and built for media, retail, healthcare and finance teams." link={{ href: "/work", label: "All case studies" }} className="mb-16" />
          <ProjectCard p={lead} aspect="aspect-[6/5] md:aspect-[2/1]" large />
          <div className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-12">
            <div className="md:col-span-7">
              <ProjectCard p={rest[0]} aspect="aspect-[6/5]" />
            </div>
            <div className="md:col-span-5 md:mt-40">
              <ProjectCard p={rest[1]} aspect="aspect-[6/5]" />
            </div>
          </div>
        </div>
      </section>

      <MobileShowcase />

      <section className="wrap py-28 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 md:pt-10">
            <h2 data-split className="display-md max-w-[13ch]">
              A small team. Senior people only.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Every project is run by the people who design and write it. No account managers in between, no hand-off to a junior team after the
              sales call.
            </p>
            <p data-reveal className="mt-8">
              <ArrowLink href="/about">About the studio</ArrowLink>
            </p>
            <Photo src={studio.code.src} alt={studio.code.alt} className="mt-14 hidden aspect-[16/10] md:block" sizes="35vw" />
          </div>
          <div className="grid gap-6 md:col-span-7 md:grid-cols-2">
            <Photo src={studio.design.src} alt={studio.design.alt} className="aspect-[16/10] md:col-span-2" sizes="(min-width: 768px) 55vw, 100vw" />
            <Photo src={studio.board.src} alt={studio.board.alt} className="aspect-[16/10] md:col-span-2" sizes="(min-width: 768px) 55vw, 100vw" />
          </div>
        </div>
      </section>

      <section aria-hidden className="overflow-hidden py-10 md:py-14">
        <VelocityMarquee speed={45}>
          {["Web apps", "Mobile apps", "SaaS products", "AI features"].map((w) => (
            <span key={w} className="flex items-center whitespace-nowrap font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.035em]">
              {w}
              <span className="tri mx-[0.4em] text-[0.45em]" />
            </span>
          ))}
        </VelocityMarquee>
      </section>

      <ProcessScroller />

      <section className="wrap py-28 md:py-36">
        <SectionHead title="Our stack" text="We pick tools for the product in front of us. These are the ones we use most." link={{ href: "/technologies", label: "All technologies" }} className="mb-14" />
        <TechIndex />
      </section>

      <section className="theme-dark py-28 md:py-36">
        <div className="wrap">
          <SectionHead title="Industries we know well" link={{ href: "/industries", label: "All industries" }} className="mb-14" />
          <IndustriesList items={industries.map((i) => ({ slug: i.slug, name: i.name, tagline: i.tagline }))} />
        </div>
      </section>

      <section className="wrap py-28 md:py-36">
        <Testimonials />
      </section>

      <section className="wrap pb-10">
        <SectionHead title="From the blog" link={{ href: "/insights", label: "All articles" }} className="mb-12" />
        <InsightsList />
      </section>

      <FAQ faqs={homeFaqs} />

      <section className="wrap pb-28">
        <div className="flex flex-col gap-8 border-t-2 border-navy pt-10 md:flex-row md:items-center md:justify-between">
          <p className="display-sm max-w-xl">Tell us what you’re building. We’ll reply within one business day with questions and a rough estimate.</p>
          <Button href="/contact" variant="red">
            Start a project
          </Button>
        </div>
      </section>
    </>
  );
}
