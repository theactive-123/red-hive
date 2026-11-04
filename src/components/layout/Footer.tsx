import Image from "next/image";
import Link from "next/link";
import { navCompany, navIndustries, navServices, navTechGroups } from "@/data/nav";
import { site } from "@/data/site";
import Magnetic from "@/components/motion/Magnetic";

export default function Footer() {
  const tech = navTechGroups.flatMap((g) => g.items).slice(0, 12);
  return (
    <footer className="theme-dark relative overflow-hidden">
      {/* Closing CTA */}
      <section className="wrap pb-24 pt-28 md:pt-40">
        <p data-reveal className="tag">Have a project in mind?</p>
        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
          <h2 data-split className="display-xl lg:col-span-9">
            Let’s make it <span className="text-red">real.</span>
          </h2>
          <div data-reveal className="lg:col-span-3 lg:justify-self-end">
            <Magnetic strength={0.35}>
              <Link
                href="/contact"
                data-cursor="Start"
                className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-red text-center text-[1.05rem] font-medium text-white md:h-48 md:w-48"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-700 ease-out-expo group-hover:scale-100" />
                <span className="relative transition-colors duration-500 group-hover:text-ink">
                  Start a<br />project
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
        <div className="mt-20 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
          <ContactLine label="New business" value={site.email} href={`mailto:${site.email}`} />
          {site.phones.map((p) => (
            <ContactLine key={p.href} label={p.label} value={p.display} href={p.href} />
          ))}
        </div>
      </section>

      <div className="wrap grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line py-16 md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <Image src="/logo.png" alt={site.name} width={257} height={58} className="h-9 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            A design and engineering studio building web applications, mobile apps and SaaS products.
          </p>
        </div>
        <Col className="md:col-span-2" title="Services" links={navServices.slice(0, 8).map((s) => [`/services/${s.slug}`, s.name])} />
        <Col className="md:col-span-2" title="Technologies" links={[...tech.map(([s, n]) => [`/technologies/${s}`, n] as const)]} />
        <Col className="md:col-span-2" title="Industries" links={navIndustries.map(([s, n]) => [`/industries/${s}`, n])} />
        <Col className="md:col-span-2" title="Studio" links={[...navCompany]} />
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-line py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {Object.entries(site.social).map(([k, href]) => (
            <li key={k}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="link-line capitalize">
                {k}
              </a>
            </li>
          ))}
          <li>
            <Link href="/privacy-policy" className="link-line">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions" className="link-line">
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function ContactLine({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a href={href} data-reveal className="group block">
      <span className="block text-sm text-muted">{label}</span>
      <span className="mt-2 inline-block text-xl md:text-2xl">
        <span className="link-line">{value}</span>
      </span>
    </a>
  );
}

function Col({ title, links, className = "" }: { title: string; links: readonly (readonly [string, string])[]; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-5 text-sm text-muted">{title}</p>
      <ul className="space-y-2.5">
        {links.map(([href, name]) => (
          <li key={href}>
            <Link href={href} className="link-line text-[0.92rem]">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
