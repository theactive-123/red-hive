import Link from "next/link";
import TechIcon from "@/components/ui/TechIcon";
import { technologies } from "@/data/technologies";

export default function TechMarquee() {
  const half = Math.ceil(technologies.length / 2);
  const rows = [technologies.slice(0, half), technologies.slice(half)];
  return (
    <section aria-label="Technologies we use" className="relative overflow-hidden border-y border-line bg-ink-2 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-2 to-transparent" />
      {rows.map((row, ri) => (
        <div key={ri} className="group flex overflow-hidden py-2">
          <ul
            className="flex shrink-0 animate-marquee gap-3 pr-3 group-hover:[animation-play-state:paused]"
            style={{ ["--marquee-duration" as string]: ri ? "70s" : "60s", animationDirection: ri ? "reverse" : "normal" }}
          >
            {[...row, ...row].map((t, i) => (
              <li key={t.slug + i} aria-hidden={i >= row.length}>
                <Link
                  href={`/technologies/${t.slug}`}
                  tabIndex={i >= row.length ? -1 : undefined}
                  className="flex items-center gap-3 rounded-full border border-line bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-red/60 hover:text-white"
                >
                  <TechIcon icon={t.icon} name={t.name} className="h-5 w-5" />
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
