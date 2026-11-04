import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Breadcrumb" data-reveal="fade">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span className="text-red">/</span>}
              {i < all.length - 1 ? (
                <Link href={it.path} className="transition-colors hover:text-white">
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-white/80">
                  {it.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
