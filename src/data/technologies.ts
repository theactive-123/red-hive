import { technologiesA } from "./technologies-1";
import { technologiesB } from "./technologies-2";
import { technologiesC } from "./technologies-3";
import type { TechCategory, Technology } from "./types";

export const technologies: Technology[] = [...technologiesA, ...technologiesB, ...technologiesC];

export const techCategories: { key: TechCategory; label: string; blurb: string }[] = [
  { key: "frontend", label: "Frontend", blurb: "Fast, accessible interfaces that feel native in the browser." },
  { key: "mobile", label: "Mobile", blurb: "Native and cross-platform apps for iOS and Android." },
  { key: "backend", label: "Backend", blurb: "APIs and services built for reliability and scale." },
  { key: "database", label: "Data", blurb: "Storage, caching and real-time data layers." },
  { key: "cloud", label: "Cloud & DevOps", blurb: "Infrastructure as code, CI/CD and observability." },
  { key: "ai", label: "AI & LLMs", blurb: "Copilots, agents, RAG and intelligent automation." },
  { key: "cms", label: "Commerce & CMS", blurb: "Storefronts and content platforms your team can run." },
];

const bySlug = new Map(technologies.map((t) => [t.slug, t]));
export const getTech = (slug: string) => bySlug.get(slug);
export const getTechs = (slugs: readonly string[]) => slugs.map((s) => bySlug.get(s)).filter((t): t is Technology => !!t);
