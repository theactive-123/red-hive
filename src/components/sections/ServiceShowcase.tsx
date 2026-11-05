import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { caseImages } from "@/data/images";
import { ArrowLink } from "@/components/ui/Button";
import { getCase } from "@/data/work";

const rows = [
  {
    title: "Web applications",
    href: "/services/web-application-development",
    text: "Customer portals, internal tools, dashboards and marketplaces. Usually React and Next.js on the front, Node.js or Python behind it, Postgres underneath.",
    points: ["Discovery and UX", "Frontend and backend", "Admin panels", "Hosting and monitoring"],
    shot: "sbh-ehr-portal",
  },
  {
    title: "Mobile apps",
    href: "/services/mobile-app-development",
    text: "iOS and Android apps from one Flutter or React Native codebase, or fully native in Swift and Kotlin when the product needs it. We handle store releases as well.",
    points: ["Cross-platform or native", "Offline and push", "Payments and maps", "App Store and Play Store"],
    shot: "spendshift",
  },
  {
    title: "SaaS products",
    href: "/services/saas-development",
    text: "Multi-tenant platforms with sign-up, billing, roles and an admin panel, set up so you can take your first paying customers without a rewrite later.",
    points: ["Accounts and teams", "Stripe billing", "Usage analytics", "Security reviews"],
    shot: "stockflow-pro",
  },
];

export default function ServiceShowcase() {
  return (
    <div className="space-y-24 md:space-y-36">
      {rows.map((r, i) => {
        const shot = getCase(r.shot);
        return (
          <div key={r.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
              <h3 data-split className="display-lg">
                {r.title}
              </h3>
              <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
                {r.text}
              </p>
              <ul data-reveal className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.98rem]">
                {r.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span className="tri text-[0.7rem]" />
                    {p}
                  </li>
                ))}
              </ul>
              <p data-reveal className="mt-9">
                <ArrowLink href={r.href}>More on {r.title.toLowerCase()}</ArrowLink>
              </p>
            </div>
            <Link href={shot ? `/work/${shot.slug}` : r.href} data-cursor="View" className={`group block md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}>
              {shot && <Photo src={caseImages[shot.slug].src} alt={caseImages[shot.slug].alt} className="cut-tl aspect-[6/5] [--cut:40px]" hoverZoom drift={false} sizes="(min-width: 768px) 58vw, 100vw" />}
              {shot && <p className="mt-3 text-sm text-muted">{shot.name}, {shot.client}</p>}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
