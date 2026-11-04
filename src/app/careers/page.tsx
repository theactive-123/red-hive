import PageHero from "@/components/sections/PageHero";
import { NumberedList, Split } from "@/components/sections/Blocks";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Careers — Join Our Engineering & Design Team",
  description: "Build web apps, mobile apps and SaaS products with a senior, remote-friendly team. See open roles at Red Hive Digital.",
  path: "/careers",
});

// PLACEHOLDER roles — update to match your actual openings.
const roles = [
  { title: "Senior Full-Stack Engineer", meta: "React · Node.js · Remote" },
  { title: "Flutter Developer", meta: "Mobile · Remote" },
  { title: "React Native Developer", meta: "Mobile · Remote" },
  { title: "Product Designer", meta: "UI/UX · Remote" },
  { title: "QA Automation Engineer", meta: "Contract · Remote" },
];

const perks = [
  { title: "Remote-friendly", text: "Work where you do your best thinking, with overlap hours for collaboration." },
  { title: "Real ownership", text: "Small teams mean your decisions ship — and you see their effect on real users." },
  { title: "Learning budget", text: "Courses, conferences and certifications to keep your skills sharp." },
  { title: "Modern stack", text: "Next.js, Flutter, TypeScript, cloud-native infrastructure and AI tooling." },
  { title: "Sustainable pace", text: "Careful planning instead of permanent crunch." },
  { title: "Room to grow", text: "Clear paths toward tech lead, architect or product leadership." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Careers", path: "/careers" }]} label="Careers" title="Build things you’d want to use" text="We’re always looking for curious engineers and designers who care about craft." />
      <section className="wrap pb-20">
        <ul className="border-b border-line">
          {roles.map((r) => (
            <li key={r.title} data-reveal className="border-t border-line">
              <a href={`mailto:${site.email}?subject=${encodeURIComponent("Application: " + r.title)}`} data-cursor="Apply" className="group grid gap-2 py-8 md:grid-cols-12 md:items-center">
                <span className="display-sm transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:col-span-8">{r.title}</span>
                <span className="text-muted md:col-span-3">{r.meta}</span>
                <span className="hidden text-right text-xl transition-colors group-hover:text-red md:col-span-1 md:block">→</span>
              </a>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-8 text-muted">
          Don’t see your role? Send your portfolio or GitHub to{" "}
          <a className="link-line text-fg" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </section>
      <Split index="01" label="Life here" title="Why you’ll like it">
        <NumberedList items={perks} />
      </Split>
    </>
  );
}
