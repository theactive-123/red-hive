import Link from "next/link";
import Phone from "@/components/ui/Phone";
import { caseStudies } from "@/data/work";

const apps = caseStudies.filter((c) => c.category === "Mobile App" && c.phones?.length);

/**
 * Mobile app showcase. Static layout (no pinning or scroll-scrubbed transforms) so it
 * scrolls smoothly everywhere; phones fade up once via the global data-reveal.
 */
export default function MobileShowcase({ title = "Mobile apps we’ve shipped", dark = true }: { title?: string; dark?: boolean }) {
  if (!apps.length) return null;
  return (
    <section className={`${dark ? "theme-dark" : "theme-light bg-card"} py-24 md:py-32`} aria-label="Mobile app portfolio">
      <div className="wrap">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <h2 data-split className="display-md max-w-[14ch]">
            {title}
          </h2>
          <Link href="/work/mobile-apps" className="font-semibold underline decoration-red decoration-2 underline-offset-[6px] hover:text-red">
            All mobile work
          </Link>
        </div>

        <div className="space-y-24 md:space-y-32">
          {apps.map((a) => (
            <div key={a.slug} className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="text-sm font-semibold" style={{ color: a.accent }}>
                  {a.platforms.join(" + ")}
                </p>
                <h3 className="display-md mt-2">{a.name}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted">{a.summary}</p>
                <Link
                  href={`/work/${a.slug}`}
                  className="cut mt-7 inline-flex h-12 items-center bg-red px-6 text-sm font-semibold text-white transition-colors [--cut:10px] hover:bg-white hover:text-navy"
                >
                  View case study
                </Link>
              </div>
              <div className="lg:col-span-8">
                <ul className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
                  {a.phones!.slice(0, 4).map((cap, i) => (
                    <li key={cap} data-reveal className={`shrink-0 snap-start ${i % 2 ? "lg:mt-12" : ""}`}>
                      <Phone
                        src={`/images/work/screens/${a.slug}-${i + 1}.webp`}
                        alt={`${a.name}: ${cap}`}
                        className="w-[200px] sm:w-[220px] lg:w-full"
                      />
                      <p className="mt-4 text-center text-sm text-muted">{cap}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
