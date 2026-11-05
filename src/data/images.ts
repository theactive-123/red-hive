// Portfolio images rendered from Red Hive Digital project screenshots (personal data replaced with samples).
// public/images/work/<slug>-cover.webp (6:5), <slug>-hero.webp (2:1), <slug>-screen-N.webp (gallery).
import { caseStudies } from "./work";

type Img = { src: string; alt: string };
const w = (name: string, alt: string): Img => ({ src: `/images/work/${name}.webp`, alt });

export const caseImages: Record<string, Img> = Object.fromEntries(caseStudies.map((c) => [c.slug, w(`${c.slug}-cover`, `${c.name} screens`)]));
export const caseHeroes: Record<string, Img> = Object.fromEntries(caseStudies.map((c) => [c.slug, w(`${c.slug}-hero`, `${c.name} product screens`)]));
export const caseGallery: Record<string, (Img & { caption: string })[]> = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c.gallery.map((caption, i) => ({ ...w(`${c.slug}-screen-${i + 1}`, `${c.name}: ${caption}`), caption }))]),
);

export const covers = {
  sbh: caseImages["sbh-ehr-portal"],
  stockflow: caseImages["stockflow-pro"],
  chat: caseImages["chat-portal-ai"],
  raheel: caseImages["raheel-tech-pm"],
  spendshift: caseImages["spendshift"],
  videeo: caseImages["videeo"],
  printgraphi: caseImages["printgraphi"],
  flubr: caseImages["flubr"],
};

export const studio = {
  design: w("studio-design", "Design file with mobile app screens"),
  board: w("studio-board", "Sprint board with tickets in progress"),
  code: w("studio-code", "Code editor with tests passing in the terminal"),
};

/** Industries without a matching project fall back to their illustration. */
export const industryImages: Partial<Record<string, Img>> = {
  healthcare: covers.sbh,
  fintech: covers.spendshift,
  "ecommerce-retail": covers.printgraphi,
  "on-demand": covers.printgraphi,
  logistics: covers.stockflow,
};

/** Services without a matching project fall back to their illustration. */
export const serviceImages: Partial<Record<string, Img>> = {
  "web-application-development": covers.flubr,
  "mobile-app-development": covers.videeo,
  "saas-development": covers.stockflow,
  "ui-ux-design": studio.design,
  "mvp-development": covers.spendshift,
  "enterprise-software-development": covers.sbh,
  "ecommerce-development": covers.stockflow,
  "cloud-devops": studio.code,
  "ai-development": covers.chat,
  "api-integration": covers.chat,
  "maintenance-support": covers.raheel,
};

export const postImages: Partial<Record<string, Img>> = {
  "adding-ai-to-your-app": covers.chat,
  "nextjs-for-saas": covers.stockflow,
  "saas-mvp-cost": covers.raheel,
  "flutter-vs-react-native": covers.videeo,
};
