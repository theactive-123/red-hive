import Image from "next/image";
import Link from "next/link";
import { navCompany, navIndustries, navServices, navTechGroups } from "@/data/nav";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/Icon";

export default function Footer() {
  const topTech = navTechGroups.flatMap((g) => g.items).slice(0, 14);
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="bg-hex pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative pt-20">
        <div className="grid gap-12 border-b border-line pb-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Have a product in mind?</p>
            <Link href="/contact" data-cursor="Let’s talk" className="group inline-block">
              <span className="block font-display text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-white">
                Let’s build
                <br />
                <span className="text-gradient-red">something real.</span>
              </span>
            </Link>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <a href={`mailto:${site.email}`} className="group flex items-center justify-between border-b border-line pb-4 text-xl text-white transition-colors hover:text-red-hot sm:text-2xl">
              {site.email}
              <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="group flex items-center justify-between border-b border-line pb-4 text-xl text-white transition-colors hover:text-red-hot sm:text-2xl">
                <span>
                  <span className="mr-3 font-mono text-xs uppercase tracking-widest text-muted">{p.label}</span>
                  {p.display}
                </span>
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Image src="/logo.png" alt={site.name} width={257} height={58} className="h-10 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            <div className="mt-6 flex gap-3">
              {Object.entries(site.social).map(([k, href]) => (
                <a key={k} href={href} target="_blank" rel="noopener noreferrer" aria-label={k} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-xs uppercase text-white/70 transition-colors hover:border-red hover:bg-red hover:text-white">
                  {k.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Services" links={navServices.map((s) => [`/services/${s.slug}`, s.name])} />
          <FooterCol title="Technologies" links={[...topTech.map(([s, n]) => [`/technologies/${s}`, n] as const), ["/technologies", "All technologies →"]]} />
          <FooterCol title="Industries" links={navIndustries.map(([s, n]) => [`/industries/${s}`, n])} />
          <FooterCol title="Company" links={[...navCompany, ["/privacy-policy", "Privacy policy"], ["/terms-conditions", "Terms & conditions"]]} />
        </div>
      </div>

      <div className="relative select-none overflow-hidden" aria-hidden>
        <p className="text-outline whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.8] tracking-tighter">RED HIVE</p>
      </div>

      <div className="relative border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-dim sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">Web · Mobile · SaaS · AI</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <p className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/40">{title}</p>
      <ul className="space-y-2.5">
        {links.map(([href, name]) => (
          <li key={href}>
            <Link href={href} className="text-sm text-white/70 transition-colors hover:text-white">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
