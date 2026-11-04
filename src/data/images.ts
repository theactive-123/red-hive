// PLACEHOLDER PHOTOS (Unsplash License, see public/images/CREDITS.md).
// Swap any path for your own photo; keep roughly the same aspect ratio.
type Img = { src: string; alt: string };
const img = (name: string, alt: string): Img => ({ src: `/images/${name}.webp`, alt });

export const caseImages: Record<string, Img> = {
  "pulsecare-telehealth-app": img("work-pulsecare", "Doctor on a video consultation with a patient"),
  "ledgerly-fintech-saas": img("work-ledgerly", "Analytics dashboard on a laptop"),
  "dashly-delivery-marketplace": img("work-dashly", "Customer browsing an ordering app on a phone"),
  "routewise-fleet-platform": img("work-routewise", "Warehouse with pallets ready for dispatch"),
  "learnloop-elearning-saas": img("work-learnloop", "Student following an online course"),
  "nestmind-ai-real-estate-assistant": img("work-nestmind", "Modern house with a pool"),
};

export const industryImages: Record<string, Img> = {
  healthcare: img("ind-healthcare", "Doctor using a phone"),
  fintech: img("ind-fintech", "Person checking finances on a phone and laptop"),
  "ecommerce-retail": img("ind-retail", "Contactless payment at a card reader"),
  education: img("ind-education", "Students working together on laptops"),
  logistics: img("ind-logistics", "Workers walking through a warehouse aisle"),
  "real-estate": img("ind-realestate", "Modern two-storey home"),
  "on-demand": img("ind-ondemand", "Courier walking in the city"),
  "travel-hospitality": img("ind-travel", "Traveller reading the departures board"),
};

export const serviceImages: Record<string, Img> = {
  "web-application-development": img("svc-web", "Developer working at a desk with two screens"),
  "mobile-app-development": img("svc-mobile", "Phone showing an app dashboard"),
  "saas-development": img("svc-saas", "Laptop and phone showing financial data"),
  "ui-ux-design": img("svc-design", "Designer sketching wireframes on a tablet"),
  "mvp-development": img("svc-mvp", "Two people planning on a whiteboard"),
  "enterprise-software-development": img("svc-enterprise", "Office with large monitors"),
  "ecommerce-development": img("svc-commerce", "Paying online with a card and phone"),
  "cloud-devops": img("svc-cloud", "Network cables in a server rack"),
  "ai-development": img("svc-ai", "Code with syntax highlighting on a dark screen"),
  "api-integration": img("svc-api", "Code editor showing React source"),
  "maintenance-support": img("svc-support", "Two engineers reviewing code"),
};

export const postImages: Record<string, Img> = {
  "adding-ai-to-your-app": serviceImages["ai-development"],
  "nextjs-for-saas": img("post-code", "Laptop showing code"),
  "saas-mvp-cost": serviceImages["saas-development"],
  "flutter-vs-react-native": serviceImages["mobile-app-development"],
};

export const studio = {
  team: img("studio-team", "Team working together around a table"),
  design: img("studio-design", "Design review around a table"),
  sketch: img("studio-sketch", "Wireframe sketches on paper"),
  whiteboard: img("studio-whiteboard", "Planning on a whiteboard"),
  office: img("studio-office", "Open-plan office"),
  ui: img("studio-ui", "Design system on a monitor"),
  travel: img("device-travel", "Travel app on a phone"),
  trading: img("device-trading", "Trading app on a phone"),
};
