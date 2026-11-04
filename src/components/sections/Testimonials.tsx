import { testimonials } from "@/data/testimonials";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const list = [...testimonials, ...testimonials];
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x mb-14">
        <SectionHeading eyebrow="Client voices" title="What it’s like to work with us" />
      </div>
      <div className="group relative flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent sm:w-48" />
        <ul className="flex shrink-0 animate-marquee gap-5 pr-5 group-hover:[animation-play-state:paused]" style={{ ["--marquee-duration" as string]: "55s" }}>
          {list.map((t, i) => (
            <li key={i} aria-hidden={i >= testimonials.length} className="w-[340px] shrink-0 sm:w-[440px]">
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-8">
                <div>
                  <svg viewBox="0 0 32 24" className="h-6 w-8 text-red" aria-hidden>
                    <path fill="currentColor" d="M0 24V14C0 6 4.5 1.3 12 0l1.5 3.4C9 4.8 7 7.6 6.8 11H12v13H0Zm19 0V14c0-8 4.5-12.7 12-14l1.5 3.4c-4.5 1.4-6.5 4.2-6.7 7.6H31v13H19Z" />
                  </svg>
                  <blockquote className="mt-6 text-[1.05rem] leading-relaxed text-white/85">{t.quote}</blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center bg-gradient-to-br from-red to-red-deep font-display font-semibold text-white clip-hex">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span>
                    <span className="block font-medium text-white">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
