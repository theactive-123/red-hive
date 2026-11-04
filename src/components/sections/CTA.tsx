import Button from "@/components/ui/Button";
import OrbLazy from "@/components/three/OrbLazy";
import { site } from "@/data/site";

export default function CTA({
  title = "Ready to build your next product?",
  text = "Tell us what you’re building. You’ll get a scoped plan, timeline and estimate within 48 hours — no obligation.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-x py-20">
      <div className="noise relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-[#16030a] via-ink to-ink px-6 py-16 sm:px-14 sm:py-24">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-red/25 blur-[120px]" />
        <OrbLazy className="pointer-events-none absolute -right-24 top-1/2 h-[560px] w-[560px] -translate-y-1/2 opacity-90 sm:right-0" />
        <div className="relative max-w-2xl">
          <p data-reveal="fade" className="eyebrow mb-5">Start a project</p>
          <h2 data-split="words" className="text-[clamp(2.2rem,5vw,4.4rem)] font-semibold text-white">
            {title}
          </h2>
          <p data-reveal="up" className="mt-6 text-lg leading-relaxed text-white/70">
            {text}
          </p>
          <div data-reveal="up" className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact">Get a free estimate</Button>
            <a href={site.phones[0].href} className="font-mono text-sm tracking-wider text-white/70 transition-colors hover:text-white">
              or call {site.phones[0].display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
