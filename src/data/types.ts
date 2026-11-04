export type FAQ = { q: string; a: string };

export type TechCategory =
  | "frontend"
  | "mobile"
  | "backend"
  | "database"
  | "cloud"
  | "ai"
  | "cms";

export type Technology = {
  slug: string;
  name: string;
  category: TechCategory;
  /** Export name from the `simple-icons` package (e.g. "siFlutter"); omit for a monogram badge. */
  icon?: string;
  /** Brand colour used for subtle accents on the tech page. */
  color: string;
  /** Short line under the name on cards (max ~70 chars). */
  tagline: string;
  /** SEO <title> (without brand suffix), ~50-60 chars. */
  seoTitle: string;
  /** SEO meta description, 140-160 chars. */
  seoDescription: string;
  /** 2 paragraphs introducing what we build with it and why. */
  intro: string[];
  /** 6 things we build with this technology. */
  offerings: { title: string; text: string }[];
  /** 4-5 reasons to choose this tech. */
  benefits: { title: string; text: string }[];
  /** Libraries / tools we pair with it (6-10 short names). */
  toolkit: string[];
  /** Typical use cases (4-6 short phrases). */
  useCases: string[];
  /** 4-5 FAQs. */
  faqs: FAQ[];
  /** Slugs of related technologies (3). */
  related: string[];
};

export type Service = {
  slug: string;
  name: string;
  /** Short name for menus. */
  short: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  /** 6 sub-services / capabilities. */
  capabilities: { title: string; text: string }[];
  /** 5 deliverables / outcomes bullets. */
  deliverables: string[];
  /** Slugs of technologies used for this service (6-10). */
  tech: string[];
  faqs: FAQ[];
  /** Icon key, see components/ui/Icon.tsx */
  icon: IconKey;
};

export type Industry = {
  slug: string;
  name: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  /** Pain points we solve (4). */
  challenges: { title: string; text: string }[];
  /** Solutions we build (6 short titles + text). */
  solutions: { title: string; text: string }[];
  /** Compliance / standards mentions (0-4 short strings). */
  compliance: string[];
  tech: string[];
  faqs: FAQ[];
  icon: IconKey;
};

export type IconKey =
  | "web"
  | "mobile"
  | "saas"
  | "design"
  | "mvp"
  | "enterprise"
  | "commerce"
  | "cloud"
  | "ai"
  | "api"
  | "support"
  | "health"
  | "finance"
  | "education"
  | "logistics"
  | "realestate"
  | "delivery"
  | "travel"
  | "media";
