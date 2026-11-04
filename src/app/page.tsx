import Link from "next/link";
import HomeHero from "@/components/sections/HomeHero";
import TechMarquee from "@/components/sections/TechMarquee";
import ServicesScroller from "@/components/sections/ServicesScroller";
import Stats from "@/components/sections/Stats";
import TechStack from "@/components/sections/TechStack";
import Process from "@/components/sections/Process";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import WorkStack from "@/components/sections/WorkStack";
import WhyUs from "@/components/sections/WhyUs";
import Engagement from "@/components/sections/Engagement";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: `${site.name} — Custom Web App, Mobile App & SaaS Development Company`,
  absoluteTitle: true,
  description:
    "Red Hive Digital designs and builds custom web applications, iOS & Android apps and SaaS products. Senior engineers in React, Next.js, Flutter, React Native, Node.js & AI. Get a free estimate.",
  path: "/",
  keywords: ["custom software development company", "web application development", "mobile app development company", "SaaS development services", "Flutter app development", "React Native development"],
});

const homeFaqs = [
  { q: "What does Red Hive Digital build?", a: "We design and develop custom web applications, native and cross-platform mobile apps for iOS and Android, and SaaS products — plus the APIs, cloud infrastructure and AI features that power them. We work with startups launching an MVP as well as established companies modernizing their software." },
  { q: "How much does a custom app or SaaS product cost?", a: "It depends on scope, platforms and integrations. Focused MVPs typically start in the low tens of thousands of dollars, while larger platforms with complex workflows cost more. After a short discovery call we send a detailed estimate broken down by feature, so you can prioritize what to build first." },
  { q: "How long does it take to launch?", a: "Most MVPs launch in 8–14 weeks. Larger products are delivered in phases, with working software demoed every two weeks so you can start testing with users early." },
  { q: "Do I own the source code?", a: "Yes. You own 100% of the intellectual property and source code. Everything lives in your repositories and cloud accounts from the first commit, and we sign an NDA before any detailed discussion." },
  { q: "Which technologies do you use?", a: "We pick the stack that fits your product: React and Next.js for the web, Flutter or React Native for cross-platform mobile, Swift and Kotlin for native, Node.js, Python, Laravel or Go on the backend, and AWS, Google Cloud or Azure for infrastructure." },
  { q: "Can you take over an existing project?", a: "Absolutely. We start with a code and architecture audit, fix critical issues, add tests and CI/CD, and then continue development or maintenance with a clear roadmap." },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <TechMarquee />

      <section id="intro" className="container-x py-28 sm:py-40">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <p className="eyebrow pt-3">Who we are</p>
          <div>
            <p data-scrub-text className="font-display text-[clamp(1.8rem,3.8vw,3.4rem)] font-medium leading-[1.15] tracking-tight text-white">
              We’re a product engineering studio that turns ambitious ideas into fast, secure and beautifully crafted software. From the first
              sketch to millions of users, our designers and engineers build the web apps, mobile apps and SaaS platforms that move businesses
              forward.
            </p>
            <div data-reveal="up" className="mt-12 flex flex-wrap gap-4">
              <Button href="/about" variant="ghost">
                More about us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServicesScroller
        items={services.map((s) => ({ slug: s.slug, name: s.name, tagline: s.tagline, icon: s.icon, capabilities: s.capabilities.map((c) => c.title) }))}
      />

      <Stats />

      <section className="container-x py-24 sm:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Technology stack"
            title="The right tools for every layer"
            text="Battle-tested frameworks, chosen for your product — not our habits. Explore how we use each one."
          />
          <Link href="/technologies" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white">
            Full stack →
          </Link>
        </div>
        <TechStack />
      </section>

      <section className="container-x py-24 sm:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Selected work" title="Products we’re proud of" text="A look at the kinds of platforms we design, build and scale." />
          <Link href="/work" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white">
            All case studies →
          </Link>
        </div>
        <WorkStack />
      </section>

      <Process />

      <section className="container-x py-24 sm:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Industries" title="Domain know-how that de-risks delivery" />
          <Link href="/industries" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white">
            All industries →
          </Link>
        </div>
        <IndustriesGrid />
      </section>

      <WhyUs />
      <Engagement />
      <Testimonials />
      <FAQ faqs={homeFaqs} />
      <CTA />
    </>
  );
}
