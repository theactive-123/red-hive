import Link from "next/link";
import TechIcon from "@/components/ui/TechIcon";
import { getTechs } from "@/data/technologies";

/** Two-column section: label + title on the left rail, content on the right. */
export function Split({ index, label, title, children, className = "" }: { index?: string; label: string; title?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`wrap py-20 md:py-28 ${className}`}>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p data-reveal className="tag">
            {index && <span className="text-fg">{index}</span>}
            {label}
          </p>
          {title && (
            <h2 data-split className="display-md mt-6 max-w-[12ch]">
              {title}
            </h2>
          )}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <p key={i} data-reveal className={i === 0 ? "lead" : "text-lg leading-relaxed text-muted"}>
          {p}
        </p>
      ))}
    </div>
  );
}

/** Numbered rows — the clean alternative to a card grid. */
export function NumberedList({ items, cols = 2 }: { items: { title: string; text: string }[]; cols?: 1 | 2 }) {
  return (
    <ol className={`grid border-b border-line ${cols === 2 ? "md:grid-cols-2 md:gap-x-12" : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} data-reveal className="flex gap-6 border-t border-line py-8">
          <span className="w-8 shrink-0 pt-1 text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight md:text-[1.4rem]">{it.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{it.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="border-b border-line">
      {items.map((d) => (
        <li key={d} data-reveal className="flex items-start gap-5 border-t border-line py-5 text-lg">
          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-red" />
          {d}
        </li>
      ))}
    </ul>
  );
}

export function TechRow({ slugs }: { slugs: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {getTechs(slugs).map((t) => (
        <li key={t.slug} data-reveal>
          <Link
            href={`/technologies/${t.slug}`}
            className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line pl-3 pr-5 transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
          >
            <TechIcon icon={t.icon} name={t.name} className="h-5 w-5" />
            {t.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Simple list of related links with a title and a one-liner. */
export function LinkRows({ items }: { items: { href: string; title: string; text?: string }[] }) {
  return (
    <ul className="border-b border-line">
      {items.map((it) => (
        <li key={it.href} data-reveal className="border-t border-line">
          <Link href={it.href} className="group flex items-center justify-between gap-6 py-6">
            <span>
              <span className="block text-xl font-semibold tracking-tight transition-colors group-hover:text-red md:text-2xl">{it.title}</span>
              {it.text && <span className="mt-1 block text-muted">{it.text}</span>}
            </span>
            <span className="text-xl text-muted transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-red">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
