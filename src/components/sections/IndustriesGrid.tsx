import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { industries } from "@/data/industries";
import { ArrowUpRight } from "@/components/ui/Icon";

export default function IndustriesGrid() {
  return (
    <ul data-reveal="up" className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((ind) => (
        <li key={ind.slug} className="bg-ink">
          <Link href={`/industries/${ind.slug}`} data-cursor="Explore" className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden p-7">
            <span className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-red/90 to-red-deep/80 transition-all duration-700 ease-out-expo group-hover:h-full" />
            <span className="relative flex items-center justify-between">
              <Icon name={ind.icon} className="h-8 w-8 text-red-hot transition-colors duration-500 group-hover:text-white" />
              <ArrowUpRight className="h-5 w-5 -translate-x-2 translate-y-2 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </span>
            <span className="relative">
              <span className="block font-display text-xl font-semibold text-white">{ind.name}</span>
              <span className="mt-2 line-clamp-2 block text-sm text-muted transition-colors duration-500 group-hover:text-white/85">{ind.tagline}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
