import { processSteps } from "@/data/process";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="How we work"
            title="A process built for momentum"
            text="Five clear phases, weekly demos and zero surprises. You’ll always know what’s shipping, what’s next and what it costs."
          />
        </div>
        <ol className="relative">
          <span className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-line" aria-hidden />
          <span data-draw="y" className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-red-hot via-red to-red-deep" aria-hidden />
          {processSteps.map((s) => (
            <li key={s.n} data-reveal="up" className="relative pb-14 pl-16 last:pb-0">
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center bg-ink font-mono text-xs text-white clip-hex">
                <span className="absolute inset-0 bg-red clip-hex" />
                <span className="relative">{s.n}</span>
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-hot">{s.time}</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
