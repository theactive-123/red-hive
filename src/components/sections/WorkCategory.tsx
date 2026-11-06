import Link from "next/link";
import Breadcrumbs from "@/components/sections/Breadcrumbs";
import ProjectCard from "@/components/sections/ProjectCard";
import Phone from "@/components/ui/Phone";
import Button from "@/components/ui/Button";
import { caseStudies, type CaseStudy } from "@/data/work";

export const CATEGORY_PAGES = [
  { href: "/work/mobile-apps", label: "Mobile apps", cat: "Mobile App" as const },
  { href: "/work/web-apps", label: "Web apps", cat: "Web App" as const },
  { href: "/work/saas", label: "SaaS", cat: "SaaS" as const },
];

export function CategoryTabs({ active }: { active?: string }) {
  return (
    <nav aria-label="Work categories" className="flex flex-wrap gap-2">
      {[{ href: "/work", label: "All work" }, ...CATEGORY_PAGES].map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={active === t.href ? "page" : undefined}
          className={`cut inline-flex h-11 items-center px-5 text-sm font-semibold transition-colors [--cut:8px] ${
            active === t.href ? "bg-red text-white" : "bg-card hover:bg-navy hover:text-white"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

/** Every phone screen of a mobile project, in frames. */
export function PhoneGallery({ c }: { c: CaseStudy }) {
  if (!c.phones?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {c.phones.map((cap, i) => (
        <figure key={cap} data-reveal className={i % 2 ? "lg:translate-y-12" : ""}>
          <Phone src={`/images/work/screens/${c.slug}-${i + 1}.webp`} alt={`${c.name}: ${cap}`} className="mx-auto w-full max-w-[250px]" />
          <figcaption className="mt-4 text-center text-sm text-muted">{cap}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function WorkCategory({ href, title, text }: { href: string; title: string; text: string }) {
  const cat = CATEGORY_PAGES.find((c) => c.href === href)!;
  const list = caseStudies.filter((c) => c.category === cat.cat);
  const mobile = cat.cat === "Mobile App";
  const hero = list[0];

  return (
    <>
      <section className={`${mobile ? "theme-dark" : "theme-light"} relative overflow-hidden pb-20 pt-32 md:pt-44`}>
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ name: "Work", path: "/work" }, { name: cat.label, path: href }]} />
            <h1 data-split="hero" className="display-lg mt-10">
              {title}
            </h1>
            <p data-reveal className="lead mt-8 max-w-xl opacity-80">
              {text}
            </p>
            <div data-reveal className="mt-10">
              <CategoryTabs active={href} />
            </div>
          </div>
          {mobile && hero?.phones && (
            <div className="relative flex h-[460px] items-center justify-center md:h-[620px] lg:col-span-6">
              <div className="absolute inset-[15%] rounded-full blur-[90px]" style={{ background: hero.accent, opacity: 0.25 }} />
              <div className="absolute -translate-x-[62%] -rotate-[8deg] translate-y-6">
                <Phone src={`/images/work/screens/${hero.slug}-2.webp`} alt={`${hero.name} app: ${hero.phones[1] ?? "screen"}`} className="w-[170px] md:w-[230px]" />
              </div>
              <div className="absolute translate-x-[62%] rotate-[8deg] translate-y-6">
                <Phone src={`/images/work/screens/${list[1]?.slug ?? hero.slug}-1.webp`} alt={`${list[1]?.name ?? hero.name} app: ${list[1]?.phones?.[0] ?? "home screen"}`} className="w-[170px] md:w-[230px]" />
              </div>
              <div className="relative z-10">
                <Phone src={`/images/work/screens/${hero.slug}-1.webp`} alt={`${hero.name} app: ${hero.phones[0]}`} priority className="w-[200px] md:w-[270px]" />
              </div>
            </div>
          )}
        </div>
      </section>

      {mobile ? (
        list.map((c, i) => (
          <section key={c.slug} className={`${i % 2 ? "theme-light bg-card" : "theme-light"} py-24 md:py-32`}>
            <div className="wrap">
              <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <p className="text-sm font-semibold" style={{ color: c.accent === "#70e000" ? "#3f8f00" : c.accent }}>
                    {c.platforms.join(" + ")} · {c.client}
                  </p>
                  <h2 data-split className="display-lg mt-3">
                    {c.name}
                  </h2>
                </div>
                <div data-reveal className="md:col-span-5">
                  <p className="text-lg leading-relaxed text-muted">{c.summary}</p>
                  <div className="mt-6">
                    <Button href={`/work/${c.slug}`} variant="red">
                      Read the case study
                    </Button>
                  </div>
                </div>
              </div>
              <PhoneGallery c={c} />
            </div>
          </section>
        ))
      ) : (
        <section className="wrap py-20">
          <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
            {list.map((p, i) => (
              <div key={p.slug} className={i % 2 ? "md:mt-32" : ""}>
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="wrap pb-28">
        <div className="flex flex-col gap-6 border-t-2 border-navy pt-10 md:flex-row md:items-center md:justify-between">
          <p className="display-sm max-w-xl">Planning a {cat.label.toLowerCase().replace(/s$/, "")}? Tell us about it and we’ll send a scoped estimate.</p>
          <Button href="/contact" variant="red">
            Start a project
          </Button>
        </div>
      </section>
    </>
  );
}
