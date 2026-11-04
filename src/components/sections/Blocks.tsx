import Link from "next/link";
import TechIcon from "@/components/ui/TechIcon";
import { Check, ArrowUpRight } from "@/components/ui/Icon";
import { getTechs } from "@/data/technologies";
import SectionHeading from "@/components/ui/SectionHeading";

/** Numbered feature cards. */
export function FeatureGrid({ items, cols = 3 }: { items: { title: string; text: string }[]; cols?: 2 | 3 }) {
  return (
    <ul data-reveal="up" className={`grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} className="group relative overflow-hidden bg-ink p-8 transition-colors duration-500 hover:bg-surface">
          <span className="absolute right-6 top-6 font-mono text-xs text-white/25 transition-colors group-hover:text-red-hot">{String(i + 1).padStart(2, "0")}</span>
          <span className="mb-6 block h-3 w-3 bg-red clip-hex transition-transform duration-500 group-hover:scale-150" />
          <h3 className="text-xl font-semibold text-white">{it.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function Checklist({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((d) => (
        <li key={d} data-reveal="up" className="flex items-start gap-4 rounded-2xl border border-line bg-surface/60 p-5 text-white/85">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
          {d}
        </li>
      ))}
    </ul>
  );
}

/** Technology chips linking to their pages. */
export function TechChips({ slugs, title = "Technologies we use", eyebrow = "Stack" }: { slugs: readonly string[]; title?: string; eyebrow?: string }) {
  const techs = getTechs(slugs);
  return (
    <section className="container-x py-20">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {techs.map((t) => (
          <li key={t.slug} data-reveal="up">
            <Link href={`/technologies/${t.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-red/50">
              <TechIcon icon={t.icon} name={t.name} className="h-7 w-7 shrink-0 text-white/80 group-hover:text-white" />
              <span className="text-sm font-medium text-white">{t.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LinkCards({ items }: { items: { href: string; title: string; text: string; badge?: React.ReactNode }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <li key={it.href} data-reveal="up">
          <Link href={it.href} data-cursor="Open" className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-red/50">
            <span className="absolute inset-0 bg-gradient-to-br from-red/0 to-transparent transition-colors duration-700 group-hover:from-red/15" />
            <span className="relative flex items-start justify-between gap-4">
              {it.badge}
              <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-red-hot" />
            </span>
            <span className="relative">
              <span className="block font-display text-2xl font-semibold text-white">{it.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">{it.text}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Prose({ paragraphs, lead = false }: { paragraphs: string[]; lead?: boolean }) {
  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <p key={i} data-reveal="up" className={i === 0 && lead ? "text-xl leading-relaxed text-white/85" : "text-lg leading-relaxed text-muted"}>
          {p}
        </p>
      ))}
    </div>
  );
}
