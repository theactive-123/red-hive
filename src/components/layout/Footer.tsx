import Image from "next/image";
import Link from "next/link";
import { navCompany, navIndustries, navServices, navTechGroups } from "@/data/nav";
import { site } from "@/data/site";
import TechIcon from "@/components/ui/TechIcon";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { BackToTop, Wordmark } from "./FooterBits";

const socials: { key: keyof typeof site.social; label: string; icon?: string }[] = [
  { key: "facebook", label: "Facebook", icon: "siFacebook" },
  { key: "instagram", label: "Instagram", icon: "siInstagram" },
  { key: "linkedin", label: "LinkedIn" },
];

export default function Footer() {
  const tech = navTechGroups.flatMap((g) => g.items).slice(0, 10);
  return (
    <footer className="theme-dark relative overflow-hidden">
      {/* CTA marquee */}
      <Link href="/contact" data-cursor="Let’s talk" className="group block border-b border-line py-10 md:py-14" aria-label="Start a project">
        <VelocityMarquee speed={70}>
          {["Start a project", "Get an estimate", "Book a call"].map((t) => (
            <span key={t} className="flex items-center whitespace-nowrap font-display text-[clamp(2.4rem,6.5vw,6rem)] font-extrabold leading-none tracking-[-0.035em] transition-colors duration-300 group-hover:text-red">
              {t}
              <span className="tri mx-[0.45em] text-[0.42em]" />
            </span>
          ))}
        </VelocityMarquee>
      </Link>

      <div className="wrap grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/logo.png" alt={site.name} width={257} height={58} className="h-11 w-auto" />
          <p className="mt-6 max-w-sm text-lg text-white/70">
            We design and build web apps, mobile apps and SaaS products for startups and growing companies.
          </p>
          <div className="mt-10 space-y-5">
            <FooterContact label="Email us" value={site.email} href={`mailto:${site.email}`} />
            {site.phones.map((p) => (
              <FooterContact key={p.href} label={p.label} value={p.display} href={p.href} />
            ))}
          </div>
          <ul className="mt-10 flex gap-2">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={site.social[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center bg-white/[0.07] transition-colors hover:bg-red"
                >
                  {s.icon ? (
                    <TechIcon icon={s.icon} name={s.label} className="h-4 w-4" color="#fff" />
                  ) : (
                    <span className="text-sm font-bold">in</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-7">
          <Col title="Services" links={navServices.slice(0, 8).map((s) => [`/services/${s.slug}`, s.name])} />
          <Col title="Technologies" links={[...tech.map(([s, n]) => [`/technologies/${s}`, n] as const), ["/technologies", "View all"] as const]} />
          <Col title="Industries" links={navIndustries.map(([s, n]) => [`/industries/${s}`, n])} />
          <Col title="Company" links={[...navCompany]} />
        </div>
      </div>

      <div className="wrap">
        <Wordmark />
      </div>

      <div className="wrap flex flex-col gap-5 border-t border-line py-7 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy policy
          </Link>
          <Link href="/terms-conditions" className="hover:text-white">
            Terms
          </Link>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function FooterContact({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a href={href} className="group flex items-baseline gap-4">
      <span className="w-20 shrink-0 text-sm text-white/50">{label}</span>
      <span className="text-xl font-semibold transition-colors group-hover:text-red">{value}</span>
    </a>
  );
}

function Col({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <p className="mb-5 border-b border-line pb-3 font-display text-lg font-bold">{title}</p>
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
