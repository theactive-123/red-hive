import Link from "next/link";
import { industries } from "@/data/industries";

export default function IndustriesList() {
  return (
    <ul className="grid border-b border-line md:grid-cols-2 md:gap-x-12">
      {industries.map((ind) => (
        <li key={ind.slug} data-reveal className="border-t border-line">
          <Link href={`/industries/${ind.slug}`} className="group flex items-center gap-6 py-6">
            <span className="flex-1">
              <span className="block font-display text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-red md:text-[1.9rem]">
                {ind.name}
              </span>
              <span className="mt-1 block text-sm text-muted">{ind.tagline}</span>
            </span>
            <span className="tri text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
