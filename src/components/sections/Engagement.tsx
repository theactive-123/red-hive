import { engagementModels } from "@/data/process";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/Icon";
import TiltCard from "@/components/ui/TiltCard";

export default function Engagement() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading align="center" eyebrow="Engagement models" title="Flexible ways to work together" text="Pick the model that fits your stage, budget and appetite for change. Switch any time." />
      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {engagementModels.map((m, i) => (
          <div key={m.title} data-reveal="up">
            <TiltCard max={5}>
              <div className={`relative h-full overflow-hidden rounded-3xl border p-8 sm:p-10 ${i === 1 ? "border-red/60 bg-gradient-to-b from-red/20 to-surface" : "border-line bg-surface"}`}>
                {i === 1 && <div className="bg-hex absolute inset-0 opacity-50" />}
                <p className="relative font-mono text-[0.7rem] uppercase tracking-[0.2em] text-red-hot">{m.tag}</p>
                <h3 className="relative mt-4 text-3xl font-semibold text-white">{m.title}</h3>
                <p className="relative mt-4 leading-relaxed text-muted">{m.text}</p>
                <ul className="relative mt-8 space-y-3">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-white/85">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-red/15 text-red-hot">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}
