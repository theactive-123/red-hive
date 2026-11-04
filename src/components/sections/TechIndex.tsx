import Link from "next/link";
import TechIcon from "@/components/ui/TechIcon";
import { techCategories, technologies } from "@/data/technologies";

/** Category rows: name on the left, technologies as links on the right. */
export default function TechIndex() {
  return (
    <div className="border-b border-line">
      {techCategories.map((c) => {
        const list = technologies.filter((t) => t.category === c.key);
        if (!list.length) return null;
        return (
          <div key={c.key} data-reveal className="grid gap-6 border-t border-line py-8 md:grid-cols-12 md:py-10">
            <div className="md:col-span-4">
              <h3 className="display-sm">{c.label}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted">{c.blurb}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-2 md:col-span-8">
              {list.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/technologies/${t.slug}`}
                    className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line pl-3 pr-5 text-[0.95rem] transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
                  >
                    <TechIcon icon={t.icon} name={t.name} className="h-5 w-5" />
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
