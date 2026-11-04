import Link from "next/link";
import TechIcon from "@/components/ui/TechIcon";
import { getTechs } from "@/data/technologies";
import IllustrationSlot from "@/components/illustrations/Illustration";
import Photo from "@/components/ui/Photo";

/** Two-column section: title on the left, content on the right. */
export function Split({ title, children, className = "" }: { index?: string; label?: string; title?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`wrap py-20 md:py-28 ${className}`}>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          {title && (
            <h2 data-split className="display-md max-w-[12ch]">
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

/** Title + text rows in two columns. */
export function NumberedList({ items, cols = 2 }: { items: { title: string; text: string }[]; cols?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-12 gap-y-10 ${cols === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((it) => (
        <li key={it.title} data-reveal>
          <h3 className="flex items-start gap-3 text-xl font-semibold tracking-tight md:text-[1.35rem]">
            <span className="tri mt-[0.35em] shrink-0 text-[0.7rem]" />
            {it.title}
          </h3>
          <p className="mt-3 pl-[1.15rem] leading-relaxed text-muted">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((d) => (
        <li key={d} data-reveal className="flex items-start gap-4 text-lg">
          <span className="tri mt-[0.45em] shrink-0 text-[0.75rem]" />
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
        <li key={t.slug}>
          <Link
            href={`/technologies/${t.slug}`}
            className="inline-flex h-12 items-center gap-2.5 bg-bg pl-4 pr-5 font-medium shadow-[inset_0_0_0_1.5px_var(--line)] transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            <TechIcon icon={t.icon} name={t.name} className="h-5 w-5" />
            {t.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LinkRows({ items }: { items: { href: string; title: string; text?: string }[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} className="group flex items-center justify-between gap-6 py-5">
            <span>
              <span className="block text-xl font-semibold tracking-tight transition-colors group-hover:text-red">{it.title}</span>
              {it.text && <span className="mt-1 block text-muted">{it.text}</span>}
            </span>
            <span className="tri text-sm opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Card with an animated illustration on top. */
export function VisualCards({ items, cols = 3 }: { items: { href: string; title: string; text: string; illus: string; photo?: { src: string; alt: string } }[]; cols?: 2 | 3 }) {
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((it) => (
        <li key={it.href} data-reveal>
          <Link href={it.href} data-cursor="Open" className="group block h-full">
            {it.photo ? (
              <Photo src={it.photo.src} alt={it.photo.alt} className="cut-tl aspect-[6/5] [--cut:32px]" hoverZoom drift={false} />
            ) : (
              <div className="cut-tl relative overflow-hidden bg-card p-6 transition-colors duration-500 [--cut:32px] group-hover:bg-[#ebebef]">
                <IllustrationSlot name={it.illus} className="h-auto w-full" />
              </div>
            )}
            <h3 className="display-sm mt-5 transition-colors group-hover:text-red">{it.title}</h3>
            <p className="mt-2 text-muted">{it.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Intro block: first paragraph lights up as you scroll, the rest sits beside it. */
export function Intro({ paragraphs }: { paragraphs: string[] }) {
  const [first, ...rest] = paragraphs;
  return (
    <section className="wrap py-20 md:py-28">
      <p data-scrub-text className="max-w-5xl font-display text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.3] tracking-[-0.02em]">
        {first}
      </p>
      {rest.length > 0 && (
        <div className="mt-12 grid md:grid-cols-12">
          <div className="space-y-5 text-lg leading-relaxed text-muted md:col-span-6 md:col-start-7">
            {rest.map((p, i) => (
              <p key={i} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
