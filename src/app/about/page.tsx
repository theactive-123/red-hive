import PageHero from "@/components/sections/PageHero";
import { NumberedList, Split } from "@/components/sections/Blocks";
import Testimonials from "@/components/sections/Testimonials";
import TechIndex from "@/components/sections/TechIndex";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import HiveLazy from "@/components/three/HiveLazy";
import { whyUs } from "@/data/process";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "About Us: A Design & Engineering Studio",
  description: "Red Hive Digital is a team of designers and engineers building custom web applications, mobile apps and SaaS products for startups and growing businesses.",
  path: "/about",
});

const values = [
  { title: "Craft over shortcuts", text: "Code we’d be proud to hand over: tested, documented and easy for the next engineer to pick up." },
  { title: "Honest estimates", text: "We say what it really takes, flag risks early and never bury surprises in a change request." },
  { title: "Outcomes, not output", text: "A feature only matters if it moves something. We measure, learn and adjust with you." },
  { title: "Small senior teams", text: "Fewer hand-offs and faster decisions. You talk directly to the people building your product." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        label="About"
        title="About Red Hive Digital"
        text={`${site.name} began as a design agency and grew into a product engineering studio. Today we help founders and companies turn ideas into web apps, mobile apps and SaaS platforms.`}
      >
        <Button href="/contact">Work with us</Button>
        <Button href="/careers" variant="outline">
          Join the team
        </Button>
      </PageHero>

      <section className="wrap">
        <div data-clip className="theme-dark relative h-[60vh] min-h-[420px] overflow-hidden rounded-xl">
          <HiveLazy className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          <p className="pointer-events-none absolute bottom-8 left-8 right-8 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-tight tracking-tight">
            Every cell has a purpose. Together, they build something stronger.
          </p>
        </div>
      </section>

      <Split index="01" label="Our story" title="Why “Red Hive”?">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <p data-reveal className="lead text-fg">
            A hive is one of nature’s most efficient structures: every cell has a job, every member knows its role, and the whole is far stronger than
            its parts.
          </p>
          <p data-reveal>
            That’s how we build software and teams. Designers, engineers, QA and product managers work in small cross-functional pods, and each pod owns a
            product end to end, from the first workshop to launch and the updates after it.
          </p>
          <p data-reveal>
            We started out in logos, illustration and animation, and kept that eye for design as we moved into full-stack product engineering.
          </p>
        </div>
      </Split>

      <section className="theme-dark py-24 md:py-32">
        <div className="wrap">
          <SectionHead index="02" label="Values" title="What we hold ourselves to" className="mb-14" />
          <NumberedList items={values} />
        </div>
      </section>

      <Split index="03" label="Why us" title="What you can count on">
        <NumberedList items={whyUs} />
      </Split>

      <section className="wrap py-20">
        <SectionHead index="04" label="Technology" title="Our stack" className="mb-14" />
        <TechIndex />
      </section>

      <section className="wrap py-28">
        <Testimonials />
      </section>
    </>
  );
}
