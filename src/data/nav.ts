/** Lightweight nav lists (kept separate from full content so the client bundle stays small). */
export const navServices = [
  { slug: "web-application-development", name: "Web App Development", desc: "Scalable, secure web platforms" },
  { slug: "mobile-app-development", name: "Mobile App Development", desc: "iOS, Android & cross-platform" },
  { slug: "saas-development", name: "SaaS Development", desc: "Multi-tenant products that scale" },
  { slug: "ui-ux-design", name: "UI/UX Design", desc: "Research-led product design" },
  { slug: "mvp-development", name: "MVP Development", desc: "Launch in weeks, not months" },
  { slug: "enterprise-software-development", name: "Enterprise Software", desc: "Modernize & automate operations" },
  { slug: "ecommerce-development", name: "E-commerce", desc: "Headless & custom storefronts" },
  { slug: "cloud-devops", name: "Cloud & DevOps", desc: "AWS, GCP, Azure, CI/CD" },
  { slug: "ai-development", name: "AI Development", desc: "LLMs, agents & ML features" },
  { slug: "api-integration", name: "APIs & Integrations", desc: "Connect every system" },
  { slug: "maintenance-support", name: "Maintenance & Support", desc: "Keep products fast & secure" },
] as const;

type Pair = readonly [string, string];
export const navTechGroups: { label: string; items: readonly Pair[] }[] = [
  { label: "Frontend", items: [["react", "React"], ["nextjs", "Next.js"], ["vuejs", "Vue.js"], ["angular", "Angular"], ["typescript", "TypeScript"]] },
  { label: "Mobile", items: [["flutter", "Flutter"], ["react-native", "React Native"], ["swift", "Swift / iOS"], ["kotlin", "Kotlin / Android"], ["ionic", "Ionic"]] },
  { label: "Backend", items: [["nodejs", "Node.js"], ["nestjs", "NestJS"], ["python", "Python"], ["django", "Django"], ["fastapi", "FastAPI"], ["laravel", "Laravel"], ["dotnet", ".NET"], ["golang", "Go"], ["graphql", "GraphQL"]] },
  { label: "Data", items: [["postgresql", "PostgreSQL"], ["mongodb", "MongoDB"], ["mysql", "MySQL"], ["redis", "Redis"], ["firebase", "Firebase"], ["supabase", "Supabase"]] },
  { label: "Cloud & AI", items: [["aws", "AWS"], ["google-cloud", "Google Cloud"], ["azure", "Azure"], ["docker", "Docker"], ["kubernetes", "Kubernetes"], ["openai", "OpenAI & LLMs"], ["langchain", "LangChain"]] },
  { label: "Commerce & CMS", items: [["shopify", "Shopify"], ["wordpress", "WordPress"], ["strapi", "Strapi"]] },
];

export const navIndustries = [
  ["healthcare", "Healthcare"],
  ["fintech", "Fintech & Banking"],
  ["ecommerce-retail", "E-commerce & Retail"],
  ["education", "Education & eLearning"],
  ["logistics", "Logistics"],
  ["real-estate", "Real Estate"],
  ["on-demand", "On-Demand Apps"],
  ["travel-hospitality", "Travel & Hospitality"],
] as const;

export const navCompany = [
  ["/about", "About us"],
  ["/process", "How we work"],
  ["/work", "Case studies"],
  ["/insights", "Insights"],
  ["/careers", "Careers"],
  ["/contact", "Contact"],
] as const;
