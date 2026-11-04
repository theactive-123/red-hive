import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import SectionHeading from "@/components/ui/SectionHeading";
import { FeatureGrid } from "@/components/sections/Blocks";
import { ArrowUpRight } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Careers — Join Our Engineering & Design Team",
  description: "Build web apps, mobile apps and SaaS products with a senior, remote-friendly team. See open roles at Red Hive Digital.",
  path: "/careers",
});

// PLACEHOLDER roles — update to match your actual openings.
const roles = [
  { title: "Senior Full-Stack Engineer (React / Node.js)", type: "Full-time · Remote" },
  { title: "Flutter Developer", type: "Full-time · Remote" },
  { title: "React Native Developer", type: "Full-time · Remote" },
  { title: "Product Designer (UI/UX)", type: "Full-time · Remote" },
  { title: "QA Automation Engineer", type: "Contract · Remote" },
];

const perks = [
  { title: "Remote-friendly", text: "Work from wherever you do your best thinking, with overlap hours for collaboration." },
  { title: "Real ownership", text: "Small teams mean your decisions ship — and you see their impact on real users." },
  { title: "Learning budget", text: "Courses, conferences and certifications to keep your skills sharp." },
  { title: "Modern stack", text: "Next.js, Flutter, TypeScript, cloud-native infrastructure and AI tooling." },
  { title: "Sane pace", text: "Thoughtful planning instead of permanent crunch. Sustainable pace ships better software." },
  { title: "Growth paths", text: "Clear tracks toward tech lead, architect or product leadership." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Careers", path: "/careers" }]} eyebrow="Careers" title={<>Build the products you’d want to use</>} text="We’re always looking for curious engineers and designers who care about craft and want to work on meaningful products." />
      <section className="container-x py-12">
        <SectionHeading eyebrow="Open roles" title="Current openings" className="mb-10" />
        <ul className="divide-y divide-line border-y border-line">
          {roles.map((r) => (
            <li key={r.title} data-reveal="up">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Application: " + r.title)}`}
                data-cursor="Apply"
                className="group flex flex-wrap items-center justify-between gap-4 py-7 transition-colors hover:text-red-hot"
              >
                <span className="font-display text-2xl font-semibold text-white transition-transform duration-500 group-hover:translate-x-3 sm:text-3xl">{r.title}</span>
                <span className="flex items-center gap-6">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{r.type}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-red group-hover:bg-red group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p data-reveal="up" className="mt-8 text-muted">
          Don’t see your role? Send your portfolio or GitHub to{" "}
          <a className="text-white underline decoration-red underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </section>
      <section className="container-x py-20">
        <SectionHeading eyebrow="Life at Red Hive" title="Why you’ll like it here" className="mb-12" />
        <FeatureGrid items={perks} />
      </section>
      <CTA title="Prefer to hire us instead?" text="If you’re here for a project rather than a job, we’d love to hear about it." />
    </>
  );
}
