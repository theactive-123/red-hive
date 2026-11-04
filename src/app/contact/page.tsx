import Breadcrumbs from "@/components/sections/Breadcrumbs";
import ContactForm from "@/components/sections/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Contact — Get a Free Project Estimate",
  description: "Tell us about your web app, mobile app or SaaS idea. Red Hive Digital replies within one business day with next steps and a free estimate.",
  path: "/contact",
});

const steps = ["We reply within one business day", "A 30-minute call with an engineer", "A scoped proposal with timeline and estimate"];

export default function ContactPage() {
  return (
    <section className="pb-28 pt-32 md:pt-44">
      <div className="wrap">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <h1 data-split="hero" className="display-xl mt-12 max-w-[10ch]">
          Let’s talk.
        </h1>
        <div className="mt-16 grid gap-16 border-t border-line pt-12 md:grid-cols-12">
          <aside className="space-y-12 md:col-span-4">
            <div data-reveal>
              <p className="tag mb-4">What happens next</p>
              <ol className="space-y-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div data-reveal>
              <p className="tag mb-3">Email</p>
              <a href={`mailto:${site.email}`} className="link-line text-xl">
                {site.email}
              </a>
            </div>
            {site.phones.map((p) => (
              <div key={p.href} data-reveal>
                <p className="tag mb-3">{p.label}</p>
                <a href={p.href} className="link-line text-xl">
                  {p.display}
                </a>
              </div>
            ))}
          </aside>
          <div data-reveal className="md:col-span-8">
            <ContactForm email={site.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
