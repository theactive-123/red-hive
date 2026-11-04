import Link from "next/link";
import Tabs from "@/components/ui/Tabs";
import TechIcon from "@/components/ui/TechIcon";
import TiltCard from "@/components/ui/TiltCard";
import { techCategories, technologies } from "@/data/technologies";

export default function TechStack() {
  const cats = techCategories.filter((c) => technologies.some((t) => t.category === c.key));
  return (
    <Tabs labels={cats.map((c) => c.label)}>
      {cats.map((c) => (
        <div key={c.key}>
          <p className="mb-6 max-w-xl text-muted">{c.blurb}</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {technologies
              .filter((t) => t.category === c.key)
              .map((t) => (
                <li key={t.slug} data-tab-item>
                  <TiltCard>
                    <Link
                      href={`/technologies/${t.slug}`}
                      data-cursor="Explore"
                      className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-white/25"
                    >
                      <span
                        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                        style={{ background: t.color }}
                      />
                      <TechIcon icon={t.icon} name={t.name} className="relative h-9 w-9 text-white/85 transition-colors group-hover:text-white" />
                      <span className="relative">
                        <span className="block font-display text-lg font-semibold text-white">{t.name}</span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted">{t.tagline}</span>
                      </span>
                    </Link>
                  </TiltCard>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </Tabs>
  );
}
