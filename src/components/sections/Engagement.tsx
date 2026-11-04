import { engagementModels } from "@/data/process";
import SectionHead from "@/components/ui/SectionHead";

export default function Engagement() {
  return (
    <section className="wrap py-28 md:py-36">
      <SectionHead label="Engagement" title="Ways to work together" text="Choose what fits your stage and budget — and switch when things change." className="mb-14" />
      <div className="grid border-b border-line md:grid-cols-3">
        {engagementModels.map((m, i) => (
          <div key={m.title} data-reveal className={`border-t border-line py-10 md:px-8 ${i ? "md:border-l" : "md:pl-0"}`}>
            <p className="text-sm text-red">{m.tag}</p>
            <h3 className="display-sm mt-4">{m.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{m.text}</p>
            <ul className="mt-8 space-y-2.5">
              {m.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[0.95rem]">
                  <span className="h-1.5 w-1.5 rounded-full bg-fg" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
