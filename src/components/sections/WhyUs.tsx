import { whyUs } from "@/data/process";
import SectionHeading from "@/components/ui/SectionHeading";

export default function WhyUs() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="Why Red Hive" title="A partner that ships — and sticks around" text="We combine startup speed with enterprise discipline. Here’s what you can count on from day one." />
        <div data-reveal="up" className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {whyUs.map((w, i) => (
            <div key={w.title} className="group bg-ink p-7 transition-colors duration-500 hover:bg-surface">
              <span className="font-mono text-xs text-red-hot">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
