import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/work";
import { posts } from "@/data/posts";

/** Last commit date of the files behind a page, so each URL gets a real lastmod. */
const dateCache = new Map<string, Date>();
function lastChanged(...files: string[]): Date {
  const key = files.join("|");
  const hit = dateCache.get(key);
  if (hit) return hit;
  let d = new Date("2026-11-06");
  try {
    const out = execSync(`git log -1 --format=%cI -- ${files.map((f) => JSON.stringify(f)).join(" ")}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (out) d = new Date(out);
  } catch {}
  dateCache.set(key, d);
  return d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const e = (path: string, priority: number, lastModified: Date, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });
  const page = (dir: string) => `src/app/${dir}/page.tsx`;
  return [
    e("", 1, lastChanged("src/app/page.tsx", "src/data/work.ts"), "weekly"),
    e("/services", 0.9, lastChanged(page("services"), "src/data/services.ts")),
    e("/technologies", 0.9, lastChanged(page("technologies"), "src/data/technologies-1.ts")),
    e("/industries", 0.8, lastChanged(page("industries"), "src/data/industries.ts")),
    e("/work", 0.8, lastChanged(page("work"), "src/data/work.ts")),
    e("/work/mobile-apps", 0.8, lastChanged(page("work/mobile-apps"), "src/data/work.ts")),
    e("/work/web-apps", 0.8, lastChanged(page("work/web-apps"), "src/data/work.ts")),
    e("/work/saas", 0.8, lastChanged(page("work/saas"), "src/data/work.ts")),
    e("/insights", 0.7, new Date(posts[0].date), "weekly"),
    e("/about", 0.7, lastChanged(page("about"))),
    e("/process", 0.6, lastChanged(page("process"))),
    e("/careers", 0.5, lastChanged(page("careers"))),
    e("/contact", 0.8, lastChanged(page("contact"))),
    e("/government-contracts", 0.9, lastChanged(page("government-contracts"), "src/data/government.ts"), "weekly"),
    ...services.map((s) => e(`/services/${s.slug}`, 0.9, lastChanged("src/data/services.ts", "src/app/services/[slug]/page.tsx"))),
    ...technologies.map((t) => e(`/technologies/${t.slug}`, 0.8, lastChanged("src/data/technologies-1.ts", "src/data/technologies-2.ts", "src/data/technologies-3.ts"))),
    ...industries.map((i) => e(`/industries/${i.slug}`, 0.7, lastChanged("src/data/industries.ts", "src/app/industries/[slug]/page.tsx"))),
    ...caseStudies.map((c) => e(`/work/${c.slug}`, 0.6, lastChanged("src/data/work.ts", "src/app/work/[slug]/page.tsx"))),
    ...posts.map((p) => e(`/insights/${p.slug}`, 0.6, new Date(p.date), "yearly")),
    e("/privacy-policy", 0.2, lastChanged(page("privacy-policy")), "yearly"),
    e("/terms-conditions", 0.2, lastChanged(page("terms-conditions")), "yearly"),
  ];
}
