import Image from "next/image";
import Link from "next/link";
import { navCompany, navIndustries, navServices, navTechGroups } from "@/data/nav";
import { site } from "@/data/site";

export default function Footer() {
  const tech = navTechGroups.flatMap((g) => g.items).slice(0, 12);
  return (
    <footer className="theme-dark relative overflow-hidden">
      <section className="wrap pb-20 pt-28 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <h2 data-split className="display-xl md:col-span-8">
            Have a project in mind?
          </h2>
          <div data-reveal className="md:col-span-4">
            <p className="text-lg text-white/70">
              Send us a few lines about what you want to build. We reply within one business day, usually sooner.
            </p>
            <Link
              href="/contact"
              data-cursor="Go"
              className="cut group relative mt-8 flex h-20 items-center justify-between overflow-hidden bg-red px-7 text-xl font-semibold text-white [--cut:20px]"
            >
              <span className="absolute inset-0 -translate-x-[101%] bg-white transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
              <span className="relative transition-colors duration-300 group-hover:text-navy">Start a project</span>
              <span className="tri relative text-base transition-colors group-hover:bg-navy" style={{ background: "currentColor" }} />
            </Link>
          </div>
        </div>
        <div className="mt-20 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
          <ContactLine label="Email" value={site.email} href={`mailto:${site.email}`} />
          {site.phones.map((p) => (
            <ContactLine key={p.href} label={p.label} value={p.display} href={p.href} />
          ))}
        </div>
      </section>

      <div className="wrap grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line py-16 md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <Image src="/logo.png" alt={site.name} width={257} height={58} className="h-10 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">Custom web apps, mobile apps and SaaS products for startups and growing companies.</p>
        </div>
        <Col className="md:col-span-2" title="Services" links={navServices.slice(0, 8).map((s) => [`/services/${s.slug}`, s.name])} />
        <Col className="md:col-span-2" title="Technologies" links={tech.map(([s, n]) => [`/technologies/${s}`, n] as const)} />
        <Col className="md:col-span-2" title="Industries" links={navIndustries.map(([s, n]) => [`/industries/${s}`, n])} />
        <Col className="md:col-span-2" title="Company" links={[...navCompany]} />
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-line py-7 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {Object.entries(site.social).map(([k, href]) => (
            <li key={k}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-white">
                {k}
              </a>
            </li>
          ))}
          <li>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions" className="hover:text-white">
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
    <a href={href} className="group block">
      <span className="block text-sm text-white/55">{label}</span>
      <span className="mt-1.5 block text-xl font-medium transition-colors group-hover:text-red md:text-2xl">{value}</span>
    </a>
  );
}

function Col({ title, links, className = "" }: { title: string; links: readonly (readonly [string, string])[]; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-5 text-sm font-semibold">{title}</p>
      <ul className="space-y-2.5">
        {links.map(([href, name]) => (
          <li key={href}>
            <Link href={href} className="text-[0.92rem] text-white/65 transition-colors hover:text-white">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
