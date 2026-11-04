/** Canonical technology slugs. Content lives in technologies.ts. */
export const TECH_SLUGS = [
  "react", "nextjs", "vuejs", "angular", "typescript",
  "flutter", "react-native", "swift", "kotlin", "ionic",
  "nodejs", "nestjs", "python", "django", "fastapi", "laravel", "dotnet", "golang",
  "postgresql", "mongodb", "mysql", "redis", "firebase", "supabase", "graphql",
  "aws", "google-cloud", "azure", "docker", "kubernetes",
  "openai", "langchain",
  "shopify", "wordpress", "strapi",
] as const;
export type TechSlug = (typeof TECH_SLUGS)[number];
