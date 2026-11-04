import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Breadcrumb" data-reveal>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {all.map((it, i) => (
            <li key={it.path + i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i < all.length - 1 ? (
                <Link href={it.path} className="link-line">
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-fg">
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
