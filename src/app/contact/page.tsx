import Breadcrumbs from "@/components/sections/Breadcrumbs";
import ContactForm from "@/components/sections/ContactForm";
import OrbLazy from "@/components/three/OrbLazy";
import { ArrowUpRight } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Contact Us — Get a Free Project Estimate",
  description: "Tell us about your web app, mobile app or SaaS idea. Red Hive Digital replies within one business day with next steps and a free estimate.",
  path: "/contact",
});

const steps = [
  "We reply within one business day",
  "30-minute discovery call with an engineer",
  "Scoped proposal with timeline & estimate",
];

export default function ContactPage() {
  return (
    <section className="noise relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_60%)]" />
      <OrbLazy className="pointer-events-none absolute -left-40 top-40 h-[620px] w-[620px] opacity-60" />
      <div className="container-x relative grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <p data-reveal="fade" className="eyebrow mt-10">Get in touch</p>
          <h1 data-split="hero" className="mt-6 text-[clamp(2.8rem,6vw,5.4rem)] font-semibold text-white">
            Let’s build something great together.
          </h1>
          <ol className="mt-12 space-y-4">
            {steps.map((s, i) => (
              <li key={s} data-reveal="up" className="flex items-center gap-4 text-white/85">
                <span className="grid h-9 w-9 shrink-0 place-items-center bg-red font-mono text-xs text-white clip-hex">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-14 space-y-4">
            <a data-reveal="up" href={`mailto:${site.email}`} className="group flex items-center justify-between rounded-2xl border border-line bg-surface/70 p-5 transition-colors hover:border-red/50">
              <span>
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">Email</span>
                <span className="mt-1 block text-lg text-white">{site.email}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-white/50 transition-transform group-hover:rotate-45 group-hover:text-red-hot" />
            </a>
            {site.phones.map((p) => (
              <a key={p.href} data-reveal="up" href={p.href} className="group flex items-center justify-between rounded-2xl border border-line bg-surface/70 p-5 transition-colors hover:border-red/50">
                <span>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">{p.label}</span>
                  <span className="mt-1 block text-lg text-white">{p.display}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/50 transition-transform group-hover:rotate-45 group-hover:text-red-hot" />
              </a>
            ))}
          </div>
        </div>
        <div data-reveal="up" className="glass rounded-[2rem] p-6 sm:p-10">
          <ContactForm email={site.email} />
        </div>
      </div>
    </section>
  );
}
