// PLACEHOLDER MOCKUPS: product shots rendered for sample projects.
// Replace any file in public/images/work/ with your own project shots (same names, same aspect ratio)
// or point these paths at new files.
type Img = { src: string; alt: string };
const w = (name: string, alt: string): Img => ({ src: `/images/work/${name}.webp`, alt });

const cover = {
  pulsecare: w("pulsecare-telehealth-app-cover", "Pulsecare telehealth app screens"),
  ledgerly: w("ledgerly-fintech-saas-cover", "Ledgerly cash-flow dashboard and mobile app"),
  dashly: w("dashly-delivery-marketplace-cover", "Dashly delivery app screens"),
  routewise: w("routewise-fleet-platform-cover", "Routewise fleet map dashboard"),
  learnloop: w("learnloop-elearning-saas-cover", "LearnLoop course player"),
  nestmind: w("nestmind-ai-real-estate-assistant-cover", "Nestmind AI property assistant"),
  shopfront: w("shopfront-cover", "Shopfront retail app screens"),
  wayfarer: w("wayfarer-cover", "Wayfarer travel booking app screens"),
};

export const studio = {
  design: w("studio-design", "Design file with mobile app screens"),
  board: w("studio-board", "Sprint board with tickets in progress"),
  code: w("studio-code", "Code editor with tests passing in the terminal"),
};

export const caseImages: Record<string, Img> = {
  "pulsecare-telehealth-app": cover.pulsecare,
  "ledgerly-fintech-saas": cover.ledgerly,
  "dashly-delivery-marketplace": cover.dashly,
  "routewise-fleet-platform": cover.routewise,
  "learnloop-elearning-saas": cover.learnloop,
  "nestmind-ai-real-estate-assistant": cover.nestmind,
};

/** Wide 2:1 shots for the top of each case study page. */
export const caseHeroes: Record<string, Img> = Object.fromEntries(
  Object.keys(caseImages).map((slug) => [slug, w(`${slug}-hero`, caseImages[slug].alt)]),
);

export const industryImages: Record<string, Img> = {
  healthcare: cover.pulsecare,
  fintech: cover.ledgerly,
  "ecommerce-retail": cover.shopfront,
  education: cover.learnloop,
  logistics: cover.routewise,
  "real-estate": cover.nestmind,
  "on-demand": cover.dashly,
  "travel-hospitality": cover.wayfarer,
};

export const serviceImages: Record<string, Img> = {
  "web-application-development": cover.routewise,
  "mobile-app-development": cover.pulsecare,
  "saas-development": cover.ledgerly,
  "ui-ux-design": studio.design,
  "mvp-development": cover.wayfarer,
  "enterprise-software-development": cover.learnloop,
  "ecommerce-development": cover.shopfront,
  "cloud-devops": studio.code,
  "ai-development": cover.nestmind,
  "api-integration": cover.dashly,
  "maintenance-support": studio.board,
};

export const postImages: Record<string, Img> = {
  "adding-ai-to-your-app": cover.nestmind,
  "nextjs-for-saas": studio.code,
  "saas-mvp-cost": cover.ledgerly,
  "flutter-vs-react-native": cover.pulsecare,
};

export const covers = cover;
