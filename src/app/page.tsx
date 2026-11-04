import HomeHero from "@/components/sections/HomeHero";
import ServicesList from "@/components/sections/ServicesList";
import ProjectCard from "@/components/sections/ProjectCard";
import TechIndex from "@/components/sections/TechIndex";
import ProcessSteps from "@/components/sections/ProcessSteps";
import IndustriesList from "@/components/sections/IndustriesList";
import Testimonials from "@/components/sections/Testimonials";
import InsightsList from "@/components/sections/InsightsList";
import FAQ from "@/components/sections/FAQ";
import SectionHead from "@/components/ui/SectionHead";
import { ArrowLink } from "@/components/ui/Button";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${site.name} — Web App, Mobile App & SaaS Development Studio`,
  absoluteTitle: true,
  description:
    "Red Hive Digital designs and builds custom web applications, iOS & Android apps and SaaS products. A senior team working in React, Next.js, Flutter, React Native, Node.js and AI.",
  path: "/",
  keywords: ["custom software development company", "web application development", "mobile app development company", "SaaS development services", "Flutter app development", "React Native development"],
});

const homeFaqs = [
  { q: "What does Red Hive Digital build?", a: "Custom web applications, native and cross-platform mobile apps for iOS and Android, and SaaS products — plus the APIs, cloud infrastructure and AI features behind them. We work with startups launching a first version and with established companies modernizing their software." },
  { q: "How much does a custom app or SaaS product cost?", a: "It depends on scope, platforms and integrations. Focused MVPs typically start in the low tens of thousands of dollars; larger platforms cost more. After a short call we send an estimate broken down by feature, so you can decide what to build first." },
  { q: "How long does it take to launch?", a: "Most MVPs launch in 8–14 weeks. Larger products ship in phases, with working software demoed every two weeks so you can put it in front of users early." },
  { q: "Do I own the source code?", a: "Yes — all of it. Code, designs and infrastructure live in your accounts from the first commit, and we sign an NDA before detailed discussions." },
  { q: "Can you take over an existing project?", a: "Yes. We start with a code and architecture review, fix what’s urgent, add tests and deployment pipelines, then continue development with a clear roadmap." },
];

export default function Home() {
  const featured = caseStudies.slice(0, 4);
  return (
    <>
      <HomeHero />

      {/* Intro */}
      <section className="wrap py-28 md:py-44">
        <div className="grid gap-10 md:grid-cols-12">
          <p data-reveal className="tag md:col-span-3 md:pt-3">
            <span className="text-fg">01</span> Studio
          </p>
          <div className="md:col-span-9">
            <p data-scrub-text className="font-display text-[clamp(1.8rem,3.6vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.03em] [font-stretch:104%]">
              We’re designers and engineers who turn ambitious ideas into fast, secure, well-made software — and stay on to help it grow.
            </p>
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-4">
              {site.stats.map((s) => (
                <div key={s.label} data-reveal>
                  <p className="font-display text-5xl font-semibold tracking-tight [font-stretch:108%] md:text-6xl">
                    <span data-counter={s.value} data-suffix={s.suffix}>
                      {s.value}
                      {s.suffix}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
            <div data-reveal className="mt-12">
              <ArrowLink href="/about">About the studio</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="wrap pb-28 md:pb-40">
        <SectionHead index="02" label="Services" title="What we do" link={{ href: "/services", label: "All services" }} className="mb-14" />
        <ServicesList items={services.map((s) => ({ slug: s.slug, name: s.short, tagline: s.tagline, icon: s.icon, tags: s.capabilities.map((c) => c.title) }))} />
      </section>

      {/* Work */}
      <section className="theme-dark py-28 md:py-40">
        <div className="wrap">
          <SectionHead index="03" label="Selected work" title="Products we’ve shipped" link={{ href: "/work", label: "All projects" }} className="mb-16" />
          <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
            {featured.map((p, i) => (
              <div key={p.slug} className={i % 2 ? "md:mt-40" : ""}>
                <ProjectCard p={p} aspect={i % 2 ? "aspect-[4/5]" : "aspect-[5/4]"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section aria-hidden className="border-b border-line py-10 md:py-14">
        <VelocityMarquee speed={50}>
          {["Web apps", "Mobile apps", "SaaS platforms", "AI products"].map((w) => (
            <span key={w} className="flex items-center whitespace-nowrap font-display text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-none tracking-[-0.045em] [font-stretch:112%]">
              {w}
              <span className="mx-[0.35em] inline-block h-[0.18em] w-[0.18em] rounded-full bg-red" />
            </span>
          ))}
        </VelocityMarquee>
      </section>

      {/* Stack */}
      <section className="wrap py-28 md:py-40">
        <SectionHead
          index="04"
          label="Technology"
          title="A stack chosen for your product"
          text="Proven frameworks, picked for what you’re building — not out of habit. Each one links to how we use it."
          className="mb-14"
        />
        <TechIndex />
      </section>

      {/* Process */}
      <section className="theme-light bg-paper-2 py-28 md:py-40">
        <div className="wrap">
          <SectionHead index="05" label="Process" title="How a project runs" link={{ href: "/process", label: "Our process in detail" }} className="mb-16" />
          <ProcessSteps />
        </div>
      </section>

      {/* Industries */}
      <section className="theme-dark py-28 md:py-40">
        <div className="wrap">
          <SectionHead index="06" label="Industries" title="Where we know the terrain" link={{ href: "/industries", label: "All industries" }} className="mb-14" />
          <IndustriesList />
        </div>
      </section>

      <section className="wrap py-28 md:py-40">
        <Testimonials />
      </section>

      <section className="wrap pb-12">
        <SectionHead index="07" label="Insights" title="Notes from the studio" link={{ href: "/insights", label: "All articles" }} className="mb-14" />
        <InsightsList />
      </section>

      <FAQ faqs={homeFaqs} />

    </>
  );
}
