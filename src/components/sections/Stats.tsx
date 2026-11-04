import { site } from "@/data/site";

export default function Stats() {
  return (
    <section className="container-x py-24">
      <dl data-reveal="up" className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {site.stats.map((s) => (
          <div key={s.label} className="group relative bg-ink p-8 sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-red/0 to-red/0 transition-colors duration-500 group-hover:from-red/15" />
            <dd className="relative font-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-none text-white">
              <span data-counter={s.value} data-suffix={s.suffix}>
                {s.value}
                {s.suffix}
              </span>
            </dd>
            <dt className="relative mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
