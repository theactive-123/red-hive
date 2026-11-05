import WorkCategory from "@/components/sections/WorkCategory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SaaS Portfolio: SaaS Products We’ve Built",
  description: "Multi-tenant platforms with subscriptions, roles and analytics, from inventory and POS to AI chat and project management.".slice(0, 158),
  path: "/work/saas",
});

export default function Page() {
  return <WorkCategory href="/work/saas" title="SaaS products we’ve built" text="Multi-tenant platforms with subscriptions, roles and analytics, from inventory and POS to AI chat and project management." />;
}
