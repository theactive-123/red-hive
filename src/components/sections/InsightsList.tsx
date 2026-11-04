import Link from "next/link";
import { posts } from "@/data/posts";

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function InsightsList({ limit = 3, exclude }: { limit?: number; exclude?: string }) {
  const list = posts.filter((p) => p.slug !== exclude).slice(0, limit);
  return (
    <ul className="border-b border-line">
      {list.map((p) => (
        <li key={p.slug} data-reveal className="border-t border-line">
          <Link href={`/insights/${p.slug}`} data-cursor="Read" className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-6">
            <span className="text-sm text-muted md:col-span-2">{fmt(p.date)}</span>
            <span className="text-sm text-muted md:col-span-2">{p.category}</span>
            <span className="display-sm transition-colors duration-300 group-hover:text-red md:col-span-7">{p.title}</span>
            <span className="hidden text-right text-sm text-muted md:col-span-1 md:block">{p.readMinutes} min</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
