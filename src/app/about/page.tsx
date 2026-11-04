import PageHero from "@/components/sections/PageHero";
import Stats from "@/components/sections/Stats";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import TechMarquee from "@/components/sections/TechMarquee";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import HexField from "@/components/ui/HexField";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "About Us — A Product Engineering Studio",
  description:
    "Meet Red Hive Digital: a team of designers and engineers building custom web applications, mobile apps and SaaS products for startups and growing businesses.",
  path: "/about",
});

const values = [
  { title: "Craft over shortcuts", text: "We write code we’d be proud to hand over — tested, documented and easy for the next engineer to love." },
  { title: "Honest estimates", text: "We tell you what it really takes, flag risks early and never bury surprises in a change request." },
  { title: "Outcomes, not output", text: "Features matter only if they move a metric. We measure, learn and iterate with you." },
  { title: "Small senior teams", text: "Fewer hand-offs, faster decisions. You talk directly to the people building your product." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Red Hive Digital"
        title={<>A hive of builders, obsessed with shipping great software</>}
        text={`${site.name} started as a design and development agency and grew into a full product engineering studio. Today we help founders and companies turn ideas into web apps, mobile apps and SaaS platforms people love to use.`}
      >
        <Button href="/contact">Work with us</Button>
        <Button href="/careers" variant="ghost">
          Join the team
        </Button>
      </PageHero>

      <section className="container-x py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Why “Red Hive”?" />
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
              <p data-reveal="up">
                A hive is the most efficient structure in nature: every cell has a purpose, every member knows its role, and the whole is far
                stronger than its parts. That’s how we build software — and how we build teams.
              </p>
              <p data-reveal="up">
                Our designers, engineers, QA specialists and product managers work in tight, cross-functional pods. Each pod owns a product
                end-to-end, from discovery workshops through launch and long-term growth.
              </p>
              <p data-reveal="up">
                We’ve evolved from logos, illustration and animation into full-stack product engineering — and kept the eye for design that
                started it all.
              </p>
            </div>
          </div>
          <div data-reveal="scale" className="relative">
            <HexField className="w-full" />
          </div>
        </div>
      </section>

      <Stats />

      <section className="container-x py-24">
        <SectionHeading eyebrow="What we believe" title="Values that shape every sprint" className="mb-14" />
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.title} data-reveal="up" className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-10">
              <span className="absolute -bottom-10 -right-2 font-display text-[9rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-red/15">
                0{i + 1}
              </span>
              <h3 className="relative text-2xl font-semibold text-white">{v.title}</h3>
              <p className="relative mt-4 max-w-md leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <TechMarquee />
      <WhyUs />
      <Testimonials />
      <CTA />
    </>
  );
}
