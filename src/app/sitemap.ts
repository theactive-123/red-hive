import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/work";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, freq: "weekly" | "monthly" | "yearly" = "monthly", lastModified: Date = now) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  });
  return [
    entry("", 1, "weekly"),
    entry("/services", 0.9),
    entry("/technologies", 0.9),
    entry("/industries", 0.8),
    entry("/work", 0.8),
    entry("/work/mobile-apps", 0.8),
    entry("/work/web-apps", 0.8),
    entry("/work/saas", 0.8),
    entry("/insights", 0.7, "weekly"),
    entry("/about", 0.7),
    entry("/process", 0.6),
    entry("/careers", 0.5),
    entry("/contact", 0.8),
    entry("/government-contracts", 0.9, "weekly"),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    ...technologies.map((t) => entry(`/technologies/${t.slug}`, 0.8)),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7)),
    ...caseStudies.map((c) => entry(`/work/${c.slug}`, 0.6)),
    ...posts.map((p) => entry(`/insights/${p.slug}`, 0.6, "yearly", new Date(p.date))),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms-conditions", 0.2, "yearly"),
  ];
}
