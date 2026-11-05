import WorkCategory from "@/components/sections/WorkCategory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Web App Portfolio: Custom Web Applications",
  description: "Custom web apps for healthcare, marketing and personal finance: portals, dashboards and marketplaces that run real businesses.".slice(0, 158),
  path: "/work/web-apps",
});

export default function Page() {
  return <WorkCategory href="/work/web-apps" title="Web applications we’ve built" text="Custom web apps for healthcare, marketing and personal finance: portals, dashboards and marketplaces that run real businesses." />;
}
