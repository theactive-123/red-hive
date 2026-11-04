"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type Ill = ComponentType<{ className?: string }>;

// Each scene is code-split so a page only downloads the ones it shows.
const map: Record<string, Ill> = {
  "web-application-development": dynamic(() => import("./WebApp")),
  "mobile-app-development": dynamic(() => import("./Mobile")),
  "saas-development": dynamic(() => import("./Saas")),
  "ui-ux-design": dynamic(() => import("./Design")),
  "mvp-development": dynamic(() => import("./Mvp")),
  "enterprise-software-development": dynamic(() => import("./Enterprise")),
  "ecommerce-development": dynamic(() => import("./Commerce")),
  "cloud-devops": dynamic(() => import("./Cloud")),
  "ai-development": dynamic(() => import("./Ai")),
  "api-integration": dynamic(() => import("./Api")),
  "maintenance-support": dynamic(() => import("./Support")),
  healthcare: dynamic(() => import("./industries/Healthcare")),
  fintech: dynamic(() => import("./industries/Fintech")),
  "ecommerce-retail": dynamic(() => import("./industries/Retail")),
  education: dynamic(() => import("./industries/Education")),
  logistics: dynamic(() => import("./industries/Logistics")),
  "real-estate": dynamic(() => import("./industries/RealEstate")),
  "on-demand": dynamic(() => import("./industries/OnDemand")),
  "travel-hospitality": dynamic(() => import("./industries/Travel")),
};

export const hasIllustration = (name: string) => name in map;

export default function Illustration({ name, className = "" }: { name: string; className?: string }) {
  const C = map[name];
  return C ? <C className={className} /> : null;
}
