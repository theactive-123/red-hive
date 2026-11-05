import WorkCategory from "@/components/sections/WorkCategory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mobile App Portfolio: iOS & Android Apps We’ve Built",
  description: "Android and iOS apps for streaming, marketplaces and more, designed and built by our team. Every screen below comes from a real project.".slice(0, 158),
  path: "/work/mobile-apps",
});

export default function Page() {
  return <WorkCategory href="/work/mobile-apps" title="Mobile apps we’ve designed and built" text="Android and iOS apps for streaming, marketplaces and more, designed and built by our team. Every screen below comes from a real project." />;
}
